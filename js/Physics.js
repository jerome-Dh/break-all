"use strict";

/**
 * Physics Class
 *
 * Handle physics engine with Box2D
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

 // Declare all the commonly used Box2D objects as variables for convenience
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2ContactListener = Box2D.Dynamics.b2ContactListener;

var box2d = {

    scale: 30,

    init: function() {
        // Set up the Box2D world that will do most of the physics calculation
        let gravity = new b2Vec2(0, 9.8), // Declare gravity as 9.8 m/s^2 downward
            allowSleep = true; // Allow objects that are at rest to fall asleep and be excluded from calculations

        box2d.world = new b2World(gravity, allowSleep);

        // Activate debug drawing. Comment the line below to disable it.
        // this.setupDebugDraw();

        this.handleCollisions();
    },

    handleCollisions: function() {

        let listener = new b2ContactListener();

        listener.PostSolve = function(contact, impulse) {

            let body1 = contact.GetFixtureA().GetBody(),
                body2 = contact.GetFixtureB().GetBody(),
                entity1 = body1.GetUserData(),
                entity2 = body2.GetUserData(),

                impulseAlongNormal = Math.abs(impulse.normalImpulses[0]);

            // This listener is called a little too often. Filter out very tiny impulses.
            // After trying different values, 5 seems to work well as a threshold
            if (impulseAlongNormal > 5) {

                // If objects have a health, reduce health by the impulse value
                if (entity1.health) {
                    entity1.health -= impulseAlongNormal;
                }

                if (entity2.health) {
                    entity2.health -= impulseAlongNormal;
                }

                // If entities have a bounce sound, play the sound
                if(getFSoundState()) {

                    if (entity1.bounceSound) {
                        entity1.bounceSound.play();
                    }

                    if (entity2.bounceSound) {
                        entity2.bounceSound.play();
                    }
                }
            }
        };

        box2d.world.SetContactListener(listener);
    },

    debugCanvas: undefined,
    setupDebugDraw: function() {

        // Dynamically create a canvas for the debug drawing
        if ( ! box2d.debugCanvas) {

            let canvas = document.createElement("canvas");

            canvas.width = 1024;
            canvas.height = 480;
            document.body.appendChild(canvas);
            canvas.style.top = "80px";
            canvas.style.position = "absolute";
            canvas.style.background = "white";
            box2d.debugCanvas = canvas;
        }

        // Set up debug draw
        let debugContext = box2d.debugCanvas.getContext("2d"),
            debugDraw = new b2DebugDraw();

        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(box2d.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        box2d.world.SetDebugDraw(debugDraw);

    },

    createRectangle: function(entity, definition) {

        let bodyDef = new b2BodyDef();

        if (entity.isStatic) {
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / box2d.scale;
        bodyDef.position.y = entity.y / box2d.scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        let fixtureDef = new b2FixtureDef();

        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(entity.width / 2 / box2d.scale, entity.height / 2 / box2d.scale);

        let body = box2d.world.CreateBody(bodyDef);

        body.SetUserData(entity);
        body.CreateFixture(fixtureDef);

        return body;
    },

    createCircle: function(entity, definition) {

        let bodyDef = new b2BodyDef();

        if (entity.isStatic) {
            bodyDef.type = b2Body.b2_staticBody;
        } else {
            bodyDef.type = b2Body.b2_dynamicBody;
        }

        bodyDef.position.x = entity.x / box2d.scale;
        bodyDef.position.y = entity.y / box2d.scale;

        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }
        let fixtureDef = new b2FixtureDef();

        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new b2CircleShape(entity.radius / box2d.scale);

        let body = box2d.world.CreateBody(bodyDef);

        body.SetUserData(entity);
        body.CreateFixture(fixtureDef);

        return body;
    },

    step: function(timeStep) {
        // As per Box2D docs, if the timeStep is larger than 2 / 60,
        // Box2D can start having problems with collision detection
        // So cap timeStep at 2 / 60

        if (timeStep > 2 / 60) {
            timeStep = 2 / 60;
        }

        // velocity iterations = 8
        // position iterations = 3

        box2d.world.Step(timeStep, 8, 3);
    }

};


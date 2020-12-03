"use strict";

/**
 * Entities Class
 *
 * Define, create and draw entities
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

var entities = {

    definitions: {
        "glass": {
            fullHealth: 100,
            density: 2.4,
            friction: 0.4,
            restitution: 0.15
        },
        "wood": {
            fullHealth: 500,
            density: 0.7,
            friction: 0.4,
            restitution: 0.4
        },
        "dirt": {
            density: 3.0,
            friction: 1.5,
            restitution: 0.2
        },
        "burger": {
            shape: "circle",
            fullHealth: 40,
            radius: 25,
            density: 1,
            friction: 0.5,
            restitution: 0.4
        },
        "sodacan": {
            shape: "rectangle",
            fullHealth: 80,
            width: 40,
            height: 60,
            density: 1,
            friction: 0.5,
            restitution: 0.7
        },
        "fries": {
            shape: "rectangle",
            fullHealth: 50,
            width: 40,
            height: 50,
            density: 1,
            friction: 0.5,
            restitution: 0.6
        },
        "apple": {
            shape: "circle",
            radius: 25,
            density: 1.5,
            friction: 0.5,
            restitution: 0.4
        },
        "orange": {
            shape: "circle",
            radius: 25,
            density: 1.5,
            friction: 0.5,
            restitution: 0.4
        },
        "strawberry": {
            shape: "circle",
            radius: 15,
            density: 2.0,
            friction: 0.5,
            restitution: 0.4
        }
    },

    // take the entity, create a Box2D body, and add it to the world
    create: function(entity) {
        
        let definition = entities.definitions[entity.name];

        if (!definition) {
            console.log("Undefined entity name", entity.name);
            return;
        }

        switch(entity.type) {
            case "block": // simple rectangles
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.shape = "rectangle";
                entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");

                entity.breakSound = game.breakSound[entity.name];

                box2d.createRectangle(entity, definition);
                break;

            case "ground": // simple rectangles
                    // No need for health. These are indestructible
                entity.shape = "rectangle";
                    // No need for sprites. These won't be drawn at all
                box2d.createRectangle(entity, definition);
                break;

            case "hero":    // simple circles
            case "villain": // can be circles or rectangles
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");
                entity.shape = definition.shape;

                entity.bounceSound = game.bounceSound;

                if (definition.shape === "circle") {
                    entity.radius = definition.radius;
                    box2d.createCircle(entity, definition);
                } else if (definition.shape === "rectangle") {
                    entity.width = definition.width;
                    entity.height = definition.height;
                    box2d.createRectangle(entity, definition);
                }
                break;
            default:
                console.log("Undefined entity type", entity.type);
                break;
        }
    },

    // take the entity, its position, and its angle and draw it on the game canvas
    draw: function(entity, position, angle) {

        game.context.translate(position.x * box2d.scale - game.offsetLeft, position.y * box2d.scale);
        game.context.rotate(angle);
        let padding = 1;

        switch (entity.type) {

            case "block":
                game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                            -entity.width / 2 - padding, -entity.height / 2 - padding, entity.width + 2 * padding, entity.height + 2 * padding);
                break;

            case "villain":
            case "hero":
                if (entity.shape === "circle") {
                    game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                            -entity.radius - padding, -entity.radius - padding, entity.radius * 2 + 2 * padding, entity.radius * 2 + 2 * padding);
                } else if (entity.shape === "rectangle") {
                    game.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                            -entity.width / 2 - padding, -entity.height / 2 - padding, entity.width + 2 * padding, entity.height + 2 * padding);
                }
                break;

            case "ground":
                    // do nothing... We draw objects like the ground & slingshot separately
                break;
        }

        game.context.rotate(-angle);
        game.context.translate(-position.x * box2d.scale + game.offsetLeft, -position.y * box2d.scale);
    }

};
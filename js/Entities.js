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

		// Blocks     
        "cover1": {
            density: 1.2,
            friction: 0.7,
            restitution: 0.2
        },
		"dirt": {
            density: 3.0,
            friction: 1.5,
            restitution: 0.2
        },
		"glass": {
            fullHealth: 100,
            density: 2.4,
            friction: 0.4,
            restitution: 0.15
        },
		"table1": {
            density: 2.7,
            friction: 0.5,
            restitution: 0.5
        },
		"table2": {
            density: 2.7,
            friction: 0.5,
            restitution: 0.5
        },
		"wood": {
            fullHealth: 500,
            density: 0.7,
            friction: 0.4,
            restitution: 0.4
        },
		"brown_wood": {
            fullHealth: 600,
            density: 0.9,
            friction: 0.4,
            restitution: 0.3
        },
		"wardrobe_black": {
            density: 2.7,
            friction: 0.5,
            restitution: 0.7
        },
		"wardrobe_red": {
            density: 2.7,
            friction: 0.5,
            restitution: 0.7
        },
		"wardrobe_brown": {
            density: 2.7,
            friction: 0.5,
            restitution: 0.7
        },

		// Villains
		"apple": {
            shape: "circle",
            radius: 25,
            density: 1.5,
            friction: 0.5,
            restitution: 0.4
        },
        "burger": {
            shape: "circle",
            fullHealth: 40,
            radius: 25,
            density: 1,
            friction: 0.5,
            restitution: 0.4
        },
		"bottle1": {
            shape: "rectangle",
            fullHealth: 60,
            width: 24, // 60 * 40 / 100
            height: 102, // 255 * 40 / 100
            density: 1.1,
            friction: 0.5,
            restitution: 0.2
        },
		"bottle2": {
            shape: "rectangle",
            fullHealth: 70,
            width: 24,
            height: 92,
            density: 1.4,
            friction: 0.2,
            restitution: 0.2
        },
		"bottle3": {
            shape: "rectangle",
            fullHealth: 70,
            width: 26, // 64 * 40 / 100
            height: 86, // 214 * 40 / 100
            density: 1.5,
            friction: 0.2,
            restitution: 0.2
        },
		"coca_cola": {
            shape: "rectangle",
            fullHealth: 50,
            width: 37, // 121 * 30 / 100
            height: 66, // 222 * 30 / 100
            density: 1,
            friction: 0.5,
            restitution: 0.2
        },
		"cover2": {
            shape: "rectangle",
            fullHealth: 150,
            width: 60, // 150 * 40 / 100
            height: 76, // 192 * 40 / 100
            density: 1.5,
            friction: 0.2,
            restitution: 0.2
        },
		"flower1": {
            shape: "rectangle",
            fullHealth: 200,
            width: 112, // 186 * 0.60
            height: 122, // 203 * 0.60
            density: 1,
            friction: 0.2,
            restitution: 0.2
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
		"glass1": {
            shape: "rectangle",
            fullHealth: 80,
            width: 45, // 90 * 50 / 100
            height: 54, // 107 * 50 / 100
            density: 1,
            friction: 0.2,
            restitution: 0.2
        },
		"glass2": {
            shape: "rectangle",
            fullHealth: 300,
            width: 45, // 90 * 50 / 100
            height: 62, // 120 * 50 / 100
            density: 2,
            friction: 0.2,
            restitution: 0.2
        },
		"glass4": {
            shape: "rectangle",
            fullHealth: 100,
            width: 30, // 60 * 50 / 100
            height: 72, // 144 * 50 / 100
            density: 2,
            friction: 0.2,
            restitution: 0.1
        },
		"orange": {
            shape: "circle",
            radius: 25,
            density: 1.5,
            friction: 0.5,
            restitution: 0.4
        },
		"pot1": {
            shape: "rectangle",
            fullHealth: 70,
            width: 75, // 150 * 50 / 100
            height: 56, // 111 * 50 / 100
            density: 1,
            friction: 0.2,
            restitution: 0.4
        }, 
		"pot2": {
            shape: "rectangle",
            fullHealth: 80,
            width: 75, // 150 * 50 / 100
            height: 72, // 143 * 50 / 100
            density: 1,
            friction: 0.2,
            restitution: 0.8
        },
        "pot3": {
            shape: "rectangle",
            fullHealth: 30,
            width: 60, // 150 * 40 / 100
            height: 66, // 167 * 40 / 100
            density: 1,
            friction: 0.2,
            restitution: 0.6
        },
		"potion1": {
            shape: "rectangle",
            fullHealth: 50, 
            width: 36, // 90 * 40 / 100
            height: 58, // 145 * 40 / 100
            density: 1,
            friction: 0.5,
            restitution: 0.6
        },
		"potion2": {
            shape: "rectangle",
            fullHealth: 50,
            width: 45, // 90 * 50 / 100
            height: 52, // 103 * 50 / 100
            density: 1,
            friction: 0.5,
            restitution: 0.6
        },
		"phone1": {
            shape: "rectangle",
            fullHealth: 100,
            width: 45, // 150 * 30 / 100
            height: 78, // 259 * 30 / 100
            density: 1,
            friction: 0.5,
            restitution: 0.6
        },
		
       
        "strawberry": {
            shape: "circle",
            radius: 15,
            density: 2.0,
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
		"tv1": {
            shape: "rectangle",
            fullHealth: 300,
            width: 70, // 140 * 50 / 100
            height: 62, // 124 * 50 / 100
            density: 2,
            friction: 0.5,
            restitution: 0.2
        },
		"tv2": {
            shape: "rectangle",
            fullHealth: 300,
            width: 75, // 150 * 50 / 100
            height: 74, // 147 * 50 / 100
            density: 2,
            friction: 0.5,
            restitution: 0.2
        },
		"water1": {
            shape: "rectangle",
            fullHealth: 200,
            width: 31, // 61 * 50 / 100
            height: 104, // 231 * 45 / 100
            density: 1.7,
            friction: 0.2,
            restitution: 0.4
        },
		"water2": {
            shape: "rectangle",
            fullHealth: 200,
            width: 26,
            height: 88,
            density: 1.7,
            friction: 0.2,
            restitution: 0.4
        },
	
        // Heroes
		"viseur1": {
            shape: "circle",
            radius: 20,
            density: 2,
            friction: 1.0,
            restitution: 0.4
        },
        "viseur2": {
            shape: "circle",
            radius: 22,
            density: 2.0,
            friction: 0.5,
            restitution: 0.7
        },
        "viseur3": {
            shape: "circle",
            radius: 25,
            density: 1.5,
            friction: 0.5,
            restitution: 0.5
        },
        "viseur4": {
            shape: "circle",
            radius: 28,
            density: 0.7,
            friction: 1.0,
            restitution: 0.6
        },

    },

    // take the entity, create a Box2D body, and add it to the world
    create: function(entity) {

        let definition = entities.definitions[entity.name];

        if ( ! definition) {
            console.log("Undefined entity name", entity.name);
            return;
        }

        switch(entity.type) {
            case "block": // simple rectangles
                entity.health = definition.fullHealth;
                entity.fullHealth = definition.fullHealth;
                entity.shape = "rectangle";
                entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");

                entity.breakSound = game.contactSound[entity.contactSound];

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

                entity.bounceSound = game.contactSound[entity.contactSound];

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


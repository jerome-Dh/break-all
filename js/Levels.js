"use strict";

/**
 * Levels Class
 *
 * Manage levels
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

var levels = {

    // Level data
    data: [{   // First level
        foreground: "desert-foreground",
        background: "clouds-background",
        entities: [
            // The ground
            { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
            // The slingshot wooden frame
            { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

            { type: "block", name: "wood", x: 500, y: 380, angle: 90, width: 100, height: 25 },
            { type: "block", name: "glass", x: 500, y: 280, angle: 90, width: 100, height: 25 },
            { type: "villain", name: "burger", x: 500, y: 205, calories: 590 },

            { type: "block", name: "wood", x: 800, y: 380, angle: 90, width: 100, height: 25 },
            { type: "block", name: "glass", x: 800, y: 280, angle: 90, width: 100, height: 25 },
            { type: "villain", name: "fries", x: 800, y: 205, calories: 420 },

            { type: "hero", name: "orange", x: 80, y: 405 },
            { type: "hero", name: "apple", x: 140, y: 405 }
        ]
    }, {   // Second level
        foreground: "desert-foreground",
        background: "clouds-background",
        entities: [
            // The ground
            { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
            // The slingshot wooden frame
            { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

            { type: "block", name: "wood", x: 850, y: 380, angle: 90, width: 100, height: 25 },
            { type: "block", name: "wood", x: 700, y: 380, angle: 90, width: 100, height: 25 },
            { type: "block", name: "wood", x: 550, y: 380, angle: 90, width: 100, height: 25 },
            { type: "block", name: "glass", x: 625, y: 316, width: 150, height: 25 },
            { type: "block", name: "glass", x: 775, y: 316, width: 150, height: 25 },

            { type: "block", name: "glass", x: 625, y: 252, angle: 90, width: 100, height: 25 },
            { type: "block", name: "glass", x: 775, y: 252, angle: 90, width: 100, height: 25 },
            { type: "block", name: "wood", x: 700, y: 190, width: 150, height: 25 },

            { type: "villain", name: "burger", x: 700, y: 152, calories: 590 },
            { type: "villain", name: "fries", x: 625, y: 405, calories: 420 },
            { type: "villain", name: "sodacan", x: 775, y: 400, calories: 150 },

            { type: "hero", name: "strawberry", x: 30, y: 415 },
            { type: "hero", name: "orange", x: 80, y: 405 },
            { type: "hero", name: "apple", x: 140, y: 405 }
        ]
    }, {
           // third level
            foreground: "background1",
            background: "foreground1",
            entities: [
                // The ground
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                // The slingshot wooden frame
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },
    
                { type: "block", name: "wood", x: 850, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 700, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 550, y: 380, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 625, y: 316, width: 150, height: 25 },
                { type: "block", name: "glass", x: 775, y: 316, width: 150, height: 25 },
    
                { type: "block", name: "glass", x: 625, y: 252, angle: 90, width: 100, height: 25 },
                { type: "block", name: "glass", x: 775, y: 252, angle: 90, width: 100, height: 25 },
                { type: "block", name: "wood", x: 700, y: 190, width: 150, height: 25 },
    
                { type: "villain", name: "burger", x: 700, y: 152, calories: 590 },
                { type: "villain", name: "fries", x: 625, y: 405, calories: 420 },
                { type: "villain", name: "sodacan", x: 885, y: 400, calories: 150 },
    
                { type: "hero", name: "strawberry", x: 30, y: 415 },
                { type: "hero", name: "orange", x: 80, y: 405 },
                { type: "hero", name: "apple", x: 140, y: 405 }
            ]
    }



    ],

    // Initialize level selection screen
    init: function() {

        let levelSelectScreen = document.getElementById("levels-list");

        // An event handler to call
        let buttonClickHandler = function() {
            game.hideScreen("levelselectscreen");
            levels.load(this.value - 1);// Level label values are 1, 2. Levels are 0, 1
        };

        for (let i = 0; i < levels.data.length; i++) {

            let button = document.createElement("input");

            button.type = "button";
            button.classList.add('level-item-button');
            button.value = (i + 1); // Level labels are 1, 2
            button.addEventListener("click", buttonClickHandler);

            // Block the level if doesn't play the smaller step
            if(i > getBestLevel()) {
                button.disabled = true;
            }

            levelSelectScreen.appendChild(button);
        }

    },

    // Load all data and images for a specific level
    load: function(number) {

        // Initialize Box2D world whenever a level is loaded
        box2d.init();

        // Declare a new currentLevel object
        game.currentLevel = { number: number, hero: [] };
        game.score = 0;

        // Save this level to localStorage
        deblockLevel(number);
        setCurrentLevel(number);

        document.getElementById("score").innerHTML = "Score: " + game.score;
        let level = levels.data[number];

        // Load the background, foreground, and slingshot images
        game.currentLevel.backgroundImage = loader.loadImage("images/backgrounds/" + level.background + ".png");
        game.currentLevel.foregroundImage = loader.loadImage("images/backgrounds/" + level.foreground + ".png");
        game.slingshotImage = loader.loadImage("images/slingshot.png");
        game.slingshotFrontImage = loader.loadImage("images/slingshot-front.png");

        // Load all the entities
        for (let i = level.entities.length - 1; i >= 0; i--) {
            let entity = level.entities[i];
            entities.create(entity);
        }

        // Call game.start() once the assets have loaded
        loader.onload = game.start;

    }
};
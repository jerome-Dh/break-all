"use strict";

/**
 * Levels Class
 *
 * Manage levels
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

var levels = {

    // Levels data
    data: [{
           // 1st level
            foreground: "foreground-level-1",
            background: "background-level-1",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

                { type: "block", name: "table1", x: 750, y: 377, angle: 0, width: 214, height: 106, contactSound: 'gourd', },
                { type: "villain", name: "water2", x: 714, y: 280, calories: 200, contactSound: 'gourd'},
                { type: "villain", name: "potion1", x: 780, y: 295, calories: 306, contactSound: 'glass'},

                { type: "hero", name: "viseur2", x: 50, y: 408, contactSound: 'bounce' },
                { type: "hero", name: "viseur3", x: 105, y: 405, contactSound: 'bounce' },
            ]
	}, {
           // 2nd level
            foreground: "foreground-level-2",
            background: "background-level-2",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "glass", x: 510, y: 370, angle: 90, width: 120, height: 26, contactSound: 'glass',},
				{ type: "block", name: "glass", x: 656, y: 370, angle: 90, width: 120, height: 26, contactSound: 'glass',},
				{ type: "block", name: "wood", x: 583, y: 297, angle: 0, width: 172, height: 26, contactSound: 'wood',},
                { type: "villain", name: "bottle2", x: 583, y: 384, calories: 300, contactSound: 'glass',},
                { type: "villain", name: "glass1", x: 656, y: 257, calories: 270, contactSound: 'glass',},

				// Block 2
                { type: "block", name: "table2", x: 850, y: 362, angle: 0, 
				width: 168, 
				height: 136, 
				contactSound: 'gourd',},
                { type: "villain", name: "flower1", x: 850, y: 233, calories: 300, contactSound: 'glass',},

                { type: "hero", name: "viseur2", x: 30, y: 408, contactSound: 'bounce' },
                { type: "hero", name: "viseur4", x: 87, y: 402, contactSound: 'bounce' }
            ]
	}, {
           // 3rd level
            foreground: "foreground-level-3",
            background: "background-level-3",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "brown_wood", x: 455, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "wood", x: 481, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "glass2", x: 468, y: 279, calories: 330, contactSound: 'glass', isStatic: false},

				// Block 2
				{ type: "block", name: "brown_wood", x: 640, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 640, y: 297, angle: 0, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 640, y: 224, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
                { type: "villain", name: "pot3", x: 640, y: 131, calories: 150, contactSound: 'gourd', isStatic: false},

				// Block 3				
				{ type: "block", name: "table1", x: 857, y: 377, angle: 0, width: 214, height: 106, contactSound: 'gourd', isStatic: false },
                { type: "villain", name: "potion2", x: 857, y: 298, calories: 800, contactSound: 'glass', isStatic: false},

                { type: "hero", name: "viseur1", x: 30, y: 410, contactSound: 'bounce' },
				{ type: "hero", name: "viseur4", x: 85, y: 402, contactSound: 'bounce' },
            ]
	}, {
           // 4th level
            foreground: "foreground-level-4",
            background: "background-level-4",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "wood", x: 570, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 570, y: 250, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "villain", name: "pot2", x: 570, y: 154, calories: 120, contactSound: 'gourd', isStatic: false},

				// Block 2
				{ type: "block", name: "wood", x: 740, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "brown_wood", x: 894, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "bottle3", x: 817, y: 387, calories: 840, contactSound: 'gourd', isStatic: false},

				{ type: "block", name: "glass", x: 817, y: 297, angle: 0, width: 180, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 740, y: 224, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "brown_wood", x: 894, y: 224, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "glass4", x: 817, y: 248, calories: 200, contactSound: 'glass', isStatic: false},

				{ type: "block", name: "glass", x: 817, y: 151, angle: 0, width: 180, height: 26, contactSound: 'glass', isStatic: false},
                { type: "villain", name: "pot1", x: 817, y: 110, calories: 395, contactSound: 'gourd', isStatic: false},

				// Heroes
				{ type: "hero", name: "viseur1", x: 30, y: 410, contactSound: 'bounce' },
                { type: "hero", name: "viseur3", x: 82, y: 402, contactSound: 'bounce' }
            ]
	}, {
           // 5th level
            foreground: "foreground-level-5",
            background: "background-level-5",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "wardrobe_black", x: 540, y: 306, angle: 0, width: 128, // 150  * 85 / 100
				height: 248, // 291 * 85 / 100
				contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "tv1", x: 540, y: 151, calories: 1000, contactSound: 'gourd', isStatic: false},

				// Block 2
				{ type: "block", name: "wood", x: 748, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 748, y: 297, angle: 0, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "villain", name: "potion1", x: 748, y: 255, calories: 320, contactSound: 'glass', isStatic: false},

				// Block 3
                { type: "villain", name: "pot3", x: 878, y: 397, calories: 300, contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "water1", x: 878, y: 312, calories: 180, contactSound: 'gourd', isStatic: false},

				// Heroes
				{ type: "hero", name: "viseur1", x: 30, y: 410, contactSound: 'bounce' },
				{ type: "hero", name: "viseur2", x: 80, y: 408, contactSound: 'bounce' },
				{ type: "hero", name: "viseur3", x: 134, y: 405, contactSound: 'bounce' },
				
			]
	}, {
           // 6th level
            foreground: "foreground-level-6",
            background: "background-level-6",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "wood", x: 500, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 500, y: 250, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "villain", name: "potion2", x: 500, y: 164, calories: 337, contactSound: 'glass', isStatic: false},

				// Block 2
				{ type: "block", name: "table2", x: 640, y: 362, angle: 0, 
				width: 168, // 140 * 1.2
				height: 136, // 113 * 1.2
				contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "phone1", x: 640, y: 255, calories: 500, contactSound: 'gourd', isStatic: false},

				// Block 3
				{ type: "block", name: "cover1", x: 784, y: 381, angle: 0, 
				width: 74, // 124 * 60 / 100
				height: 98, // 165 * 60 / 100
				contactSound: 'gourd', isStatic: false},
                { type: "villain", name: "coca_cola", x: 784, y: 299, calories: 733, contactSound: 'gourd', isStatic: false},

				// Block 4
				{ type: "block", name: "wardrobe_red", x: 908, y: 306, angle: 0, 
				width: 128, // 150  * 85 / 100
				height: 248, // 291 * 85 / 100
				contactSound: 'gourd', isStatic: false},
                { type: "villain", name: "cover2", x: 908, y: 144, calories: 680, contactSound: 'gourd', isStatic: false},

				// Heroes
				{ type: "hero", name: "viseur1", x: 30, y: 410, contactSound: 'bounce' },
				{ type: "hero", name: "viseur3", x: 82, y: 405, contactSound: 'bounce' },
				{ type: "hero", name: "viseur4", x: 142, y: 402, contactSound: 'bounce' },
				
			]
	}, {
           // 7th level
            foreground: "foreground-level-7",
            background: "background-level-7",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "brown_wood", x: 400, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "flower1", x: 405, y: 249, calories: 240, contactSound: 'glass', isStatic: false},

				// Block 2
				{ type: "block", name: "wood", x: 526, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 526, y: 250, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 526, y: 130, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "wardrobe_brown", x: 633, y: 300, angle: 0, 
				width: 135, // 150 * 90 / 100
				height: 260, // 291 * 90 / 100
				contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "glass1", x: 633, y: 143, calories: 670, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 740, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 740, y: 250, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 740, y: 130, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},

				// Block 3
				{ type: "block", name: "wood", x: 810, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "pot1", x: 810, y: 256, calories: 923, contactSound: 'gourd', isStatic: false},
				{ type: "block", name: "wood", x: 847, y: 297, angle: 0, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "bottle1", x: 884, y: 233, calories: 867, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 884, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},

				// Heroes
				{ type: "hero", name: "viseur1", x: 30, y: 410, contactSound: 'bounce' },
				{ type: "hero", name: "viseur2", x: 80, y: 408, contactSound: 'bounce' },
				{ type: "hero", name: "viseur4", x: 137, y: 402, contactSound: 'bounce' },

			]
	}, {
           // 8th level
            foreground: "foreground-level-8",
            background: "background-level-8",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "wood", x: 420, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 420, y: 250, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "villain", name: "potion2", x: 420, y: 164, calories: 375, contactSound: 'glass', isStatic: false},

				// Block 2
				{ type: "block", name: "brown_wood", x: 525, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "wood", x: 525, y: 297, angle: 0, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "pot2", x: 525, y: 248, calories: 635, contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "bottle2", x: 570, y: 384, calories: 515, contactSound: 'glass', isStatic: false},

				// Block 3
				{ type: "block", name: "wardrobe_brown", x: 710, y: 300, angle: 0, 
				width: 135, // 150 * 90 / 100
				height: 260, // 291 * 90 / 100
				contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "tv2", x: 710, y: 133, calories: 1000, contactSound: 'gourd', isStatic: false},

				// Block 4
				{ type: "block", name: "brown_wood", x: 870, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "wood", x: 870, y: 297, angle: 0, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "coca_cola", x: 870, y: 251, calories: 775, contactSound: 'gourd', isStatic: false},

				// Heroes
				{ type: "hero", name: "viseur1", x: 30, y: 410, contactSound: 'bounce' },
				{ type: "hero", name: "viseur2", x: 80, y: 408, contactSound: 'bounce' },
				{ type: "hero", name: "viseur3", x: 134, y: 405, contactSound: 'bounce' },

			]
	}, {
           // 9th level
            foreground: "foreground-level-9",
            background: "background-level-9",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },

				// Block 1
				{ type: "block", name: "brown_wood", x: 400, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "water2", x: 460, y: 386, calories: 490, contactSound: 'gourd', isStatic: false},
				{ type: "block", name: "brown_wood", x: 520, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},

				{ type: "block", name: "glass", x: 460, y: 297, angle: 0, width: 146, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "villain", name: "cover2", x: 460, y: 246, calories: 685, contactSound: 'gourd', isStatic: false},
				{ type: "block", name: "glass", x: 400, y: 224, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "glass", x: 520, y: 224, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "glass", x: 460, y: 151, angle: 0, width: 146, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "villain", name: "glass1", x: 460, y: 111, calories: 107, contactSound: 'glass', isStatic: false},				

				// Block 2
				{ type: "block", name: "brown_wood", x: 620, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "wood", x: 620, y: 250, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "brown_wood", x: 862, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "wood", x: 862, y: 250, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "wood", x: 741, y: 177, angle: 0, width: 268, height: 26, contactSound: 'wood', isStatic: false},

				{ type: "block", name: "table2", x: 741, y: 362, angle: 0, 
				width: 168, // 140 * 1.2
				height: 136, // 113 * 1.2
				contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "phone1", x: 741, y: 255, calories: 1100, contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "glass2", x: 741, y: 133, calories: 830, contactSound: 'glass', isStatic: false},

				// Block 3
				{ type: "block", name: "brown_wood", x: 960, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "glass", x: 960, y: 250, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 960, y: 130, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "potion1", x: 960, y: 41, calories: 1066, contactSound: 'glass', isStatic: false},

				// Heroes
				{ type: "hero", name: "viseur2", x: 30, y: 408, contactSound: 'bounce' },
				{ type: "hero", name: "viseur3", x: 84, y: 405, contactSound: 'bounce' },
				{ type: "hero", name: "viseur4", x: 144, y: 402, contactSound: 'bounce' },

			]
	}, {
           // 10th level
            foreground: "foreground-level-10",
            background: "background-level-10",
            entities: [
                { type: "ground", name: "dirt", x: 500, y: 440, width: 1000, height: 20, isStatic: true },
                { type: "ground", name: "wood", x: 190, y: 390, width: 30, height: 80, isStatic: true },
				
				// Block 1
				{ type: "block", name: "glass", x: 450, y: 370, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "glass", x: 544, y: 370, angle: 90, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 497, y: 297, angle: 0, width: 120, height: 26, contactSound: 'wood', isStatic: false},
                { type: "villain", name: "bottle2", x: 497, y: 384, calories: 570, contactSound: 'glass', isStatic: false},
				{ type: "villain", name: "glass1", x: 497, y: 257, calories: 350, contactSound: 'glass', isStatic: false},

				// Block 2
				{ type: "block", name: "wardrobe_black", x: 640, y: 306, angle: 0, width: 128, // 150  * 85 / 100
				height: 248, // 291 * 85 / 100
				contactSound: 'gourd', isStatic: false},
				{ type: "villain", name: "tv1", x: 640, y: 151, calories: 668, contactSound: 'gourd', isStatic: false},				

				// Block 3
				{ type: "block", name: "wardrobe_red", x: 790, y: 306, angle: 0, 
				width: 128, // 150  * 85 / 100
				height: 248, // 291 * 85 / 100
				contactSound: 'gourd', isStatic: false},
                { type: "villain", name: "tv2", x: 790, y: 145, calories: 870, contactSound: 'gourd', isStatic: false},

				// Block 4
				{ type: "block", name: "wood", x: 885, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "brown_wood", x: 979, y: 370, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "bottle3", x: 932, y: 387, calories: 1234, contactSound: 'gourd', isStatic: false},

				{ type: "block", name: "glass", x: 932, y: 297, angle: 0, width: 120, height: 26, contactSound: 'glass', isStatic: false},
				{ type: "block", name: "wood", x: 885, y: 224, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "block", name: "brown_wood", x: 979, y: 224, angle: 90, width: 120, height: 26, contactSound: 'wood', isStatic: false},
				{ type: "villain", name: "glass4", x: 932, y: 248, calories: 979, contactSound: 'glass', isStatic: false},

				{ type: "block", name: "glass", x: 932, y: 151, angle: 0, width: 120, height: 26, contactSound: 'glass', isStatic: false},
                { type: "villain", name: "potion2", x: 932, y: 112, calories: 676, contactSound: 'glass', isStatic: false},

				// Heroes
				{ type: "hero", name: "viseur1", x: 25, y: 410, contactSound: 'bounce' },
				{ type: "hero", name: "viseur2", x: 72, y: 408, contactSound: 'bounce' },
				{ type: "hero", name: "viseur3", x: 123, y: 405, contactSound: 'bounce' },
				{ type: "hero", name: "viseur4", x: 181, y: 402, contactSound: 'bounce' },

			]
	},

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
        game.slingshotImage = loader.loadImage("images/slingshots/slingshot.png");
        game.slingshotFrontImage = loader.loadImage("images/slingshots/slingshot-front.png");

        // Load all the entities
        for (let i = level.entities.length - 1; i >= 0; i--) {
            let entity = level.entities[i];
            entities.create(entity);
        }

        // Call game.start() once the assets have loaded
        loader.onload = game.start;

    }
};
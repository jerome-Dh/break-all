"use strict";

/**
 * Game Class
 *
 * Manage, draw background, handle the player
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

var game = {

    init: function() {

        game.canvas = document.getElementById("gamecanvas");
        game.context = game.canvas.getContext("2d");

        // Initialize objects
        levels.init();
        loader.init();
        mouse.init();
        setAPIBaseUrl();

        game.loadSounds(function() {
            // game.showStartScreen();
        });
        game.showStartScreen();

    },

    // Play the game
    playGame: function() {

        if (window.wAudio) {
            window.wAudio.playMutedSound();
        }

        game.showLevelScreen();
    },

    scale: 1,

    resize: function() {

        const maxWidth = window.innerWidth,
            maxHeight = window.innerHeight,

            scale = Math.min(maxWidth / 640, maxHeight / 480),

            gameContainer = document.getElementById("gamecontainer");

        gameContainer.style.transform = "translate(-50%, -50%) " + "scale(" + scale + ")";

        // Clamp the value between 640 and 1024
        const width = Math.max(640, Math.min(1024, maxWidth / scale ));

        // Apply this new width to game container and game canvas
        gameContainer.style.width = width + "px";

        const gameCanvas = document.getElementById("gamecanvas");

        gameCanvas.width = width;

        game.scale = scale;
    },

    loadSounds: function(onload) {

        game.backgroundMusic = loader.loadSound("audio/gurdonark-kindergarten");
		game.backgroundMusic.loop = true;
        game.slingshotReleasedSound = loader.loadSound("audio/released");
        game.endedSuccessSound = loader.loadSound("audio/fa");
        game.endedFailureSound = loader.loadSound("audio/woodchime");
        game.contactSound = {
            "bounce": loader.loadSound("audio/bounce"),
            "glass": loader.loadSound("audio/glassbreak"),
            "gourd": loader.loadSound("audio/gourd"),
            "wood": loader.loadSound("audio/woodbreak"),
        };

		game.loadImages();

        loader.onload = onload;
    },

	// Load some images helpers
	loadImages: function() {

		loader.loadImage('images/start-splashscreen.png');
		loader.loadImage('images/icons/play-on.png');
		loader.loadImage('images/icons/play-off.png');
		loader.loadImage('images/icons/level.png');
		loader.loadImage('images/icons/level-on.png');
		loader.loadImage('images/icons/level-empty.png');
		loader.loadImage('images/loader.gif');
	},

    startBackgroundMusic: function() {

        if(getBSoundState()) {
            game.backgroundMusic.play();
            game.setBackgroundMusicButton();
        }
    },

    stopBackgroundMusic: function() {
        game.backgroundMusic.pause();
        // Go to the beginning of the song
        game.backgroundMusic.currentTime = 0;

        game.setBackgroundMusicButton();
    },

    toggleBackgroundMusic: function() {

        if ( ! getBSoundState()) {
            setBSoundState(true);
            game.backgroundMusic.play();
        } else {
            setBSoundState(false);
            game.backgroundMusic.pause();
        }

        game.setBackgroundMusicButton();
    },

    setBackgroundMusicButton: function() {

        const toggleImage = document.getElementById("togglemusic");

        if (game.backgroundMusic.paused) {
            toggleImage.src = "images/icons/volume-mute.png";
        } else {
            toggleImage.src = "images/icons/volume-high.png";
        }
    },

    hideScreens: function() {

        const screens = document.getElementsByClassName("gamelayer");

        for (let i = screens.length - 1; i >= 0; i--) {
            var screen = screens[i];

            screen.style.display = "none";
        }
    },

    hideScreen: function(id) {
        const screen = document.getElementById(id);
        screen.style.display = "none";
    },

    showScreen: function(id) {
        const screen = document.getElementById(id);
        screen.style.display = "block";
    },

    showLevelScreen: function() {
        game.hideScreens();
        game.showScreen("levelselectscreen");

        game.updateLevelScreen();
    },

    showSettingScreen: function() {

        game.stopBackgroundMusic();

        game.hideScreens();
        game.showScreen("settingscreen");
        restaureSettings();
    },

    showAboutScreen: function() {
        game.hideScreens();
        game.showScreen("aboutscreen");
    },

    showAllScoreScreen: function() {
        game.hideScreens();
        game.showScreen("allscorescreen");
        getAllScoreFromServer();
    },

    showStartScreen: function() {
        game.hideScreens();
        game.showScreen("gamestartscreen");
    },

    showHelpScreen: function() {
        game.showScreen('helpscreen');
    },

    closeHelpScreen: function() {
        game.hideScreen('helpscreen');
    },

    restartLevel: function() {
        window.cancelAnimationFrame(game.animationFrame);
        game.lastUpdateTime = undefined;
        levels.load(game.currentLevel.number);
    },

    startNextLevel: function() {
        window.cancelAnimationFrame(game.animationFrame);
        game.lastUpdateTime = undefined;
        levels.load(game.currentLevel.number + 1);
    },

    exitPlaying: function() {
        game.ended = true;
        window.cancelAnimationFrame(game.animationFrame);
        game.lastUpdateTime = undefined;

        game.showLevelScreen();
    },

    continueLeavingLevel: function() {
        game.hideScreen("levelselectscreen");
        levels.load(getBestLevel());
    },

    updateInformationScoreScreen: function() {
        document.getElementById('level-scorescreen').innerHTML = getCurrentLevel() + 1;
        document.getElementById('pseudo-scorescreen').innerHTML = getCurrentPseudo();
    },

    // Show actual game players informations
    updateLevelScreen: function() {

        game.stopBackgroundMusic();

        document.getElementById('label-best-level').innerHTML = getBestLevel() + 1;
        document.getElementById('label-best-score').innerHTML = getBestScore();
        document.getElementById('label-current-pseudo').innerHTML = getCurrentPseudo();
		getBestOnlineScore(document.getElementById('label-best-online-score'));

        // Disabled or enabled level
        enableOrDisableLevelButtons();
    },

    // Store current game state - intro, wait-for-firing, firing, fired, load-next-hero, success, failure
    mode: "intro",

    // X & Y coordinates of the slingshot
    slingshotX: 140,
    slingshotY: 280,

    // X & Y coordinate of point where band is attached to slingshot
    slingshotBandX: 140 + 55,
    slingshotBandY: 280 + 23,

    // Flag to check if the game has ended
    ended: false,

    // The game score
    score: 0,

    // X axis offset for panning the screen from left to right	
    offsetLeft: 0,

    start: function() {

        game.hideScreens();

        // Display the game canvas and score
        game.showScreen("gamecanvas");
        game.showScreen("scorescreen");
        game.updateInformationScoreScreen();

        game.mode = "intro";
        game.currentHero = undefined;

        game.offsetLeft = 0;
        game.ended = false;

        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);

        // Play the background music when the game starts
        game.startBackgroundMusic();
    },

    // Maximum panning speed per frame in pixels
    maxSpeed: 3,

    // Pan the screen so it centers at newCenter
    // (or at least as close as possible)
    panTo: function(newCenter) {

            // Minimum and Maximum panning offset
        const minOffset = 0,
			maxOffset = game.currentLevel.backgroundImage.width - game.canvas.width,

        // The current center of the screen is half the screen width from the left offset
			currentCenter = game.offsetLeft + game.canvas.width / 2;

        // If the distance between new center and current center is > 0 and we have not panned to the min and max offset limits, keep panning
        if (Math.abs(newCenter - currentCenter) > 0 && game.offsetLeft <= maxOffset && game.offsetLeft >= minOffset) {
            // We will travel half the distance from the newCenter to currentCenter in each tick
            // This will allow easing
            let deltaX = (newCenter - currentCenter) / 2;

            // However if deltaX is really high, the screen will pan too fast, so if it is greater than maxSpeed
            if (Math.abs(deltaX) > game.maxSpeed) {
                // Limit delta x to game.maxSpeed (and keep the sign of deltaX)
                deltaX = game.maxSpeed * Math.sign(deltaX);
            }

            // And if we have almost reached the goal, just get to the ending in this turn
            if (Math.abs(deltaX) <= 1) {
                deltaX = (newCenter - currentCenter);
            }

            // Finally add the adjusted deltaX to offsetX so we move the screen by deltaX
            game.offsetLeft += deltaX;

            // And make sure we don't cross the minimum or maximum limits
            if (game.offsetLeft <= minOffset) {
                game.offsetLeft = minOffset;

                // Let calling function know that we have panned as close as possible to the newCenter
                return true;
            } else if (game.offsetLeft >= maxOffset) {
                game.offsetLeft = maxOffset;

                // let calling function know that we have panned as close as possible to the newCenter
                return true;
            }

        } else {
            // let calling function know that we have panned as close as possible to the newCenter
            return true;
        }
    },

    // Go through the heroes and villains still present in the Box2d world and store their Box2D bodies
    heroes: undefined,
    villains: undefined,
    countHeroesAndVillains: function() {
        game.heroes = [];
        game.villains = [];
        for (let body = box2d.world.GetBodyList(); body; body = body.GetNext()) {

            const entity = body.GetUserData();

            if (entity) {
                if (entity.type === "hero") {
                    game.heroes.push(body);
                } else if (entity.type === "villain") {
                    game.villains.push(body);
                }
            }
        }
    },

    handleGameLogic: function() {

        if (game.mode === "intro") {
            if (game.panTo(700)) {
                game.mode = "load-next-hero";
            }
        }

        if (game.mode === "wait-for-firing") {
            if (mouse.dragging) {
                if (game.mouseOnCurrentHero()) {
                    game.mode = "firing";
                } else {
                    game.panTo(mouse.x + game.offsetLeft);
                }
            } else {
                game.panTo(game.slingshotX);
            }
        }

        if (game.mode === "firing") {

            if (mouse.down) {

                game.panTo(game.slingshotX);

                // Limit dragging to maxDragDistance
                let distance = Math.pow(Math.pow(mouse.x - game.slingshotBandX + game.offsetLeft, 2) + Math.pow(mouse.y - game.slingshotBandY, 2), 0.5),
                    angle = Math.atan2(mouse.y - game.slingshotBandY, mouse.x - game.slingshotBandX),

                    minDragDistance = 10,
                    maxDragDistance = 120,
                    maxAngle = Math.PI * 145 / 180;

                if (angle > 0 && angle < maxAngle ) {
                    angle = maxAngle;
                }
                if (angle < 0 && angle > -maxAngle ) {
                    angle = -maxAngle;
                }
                // If hero has been dragged too far, limit movement
                if (distance > maxDragDistance) {
                    distance = maxDragDistance;
                }

                // If the hero has been dragged in the wrong direction, limit movement
                if ((mouse.x + game.offsetLeft > game.slingshotBandX)) {
                    distance = minDragDistance;
                    angle = Math.PI;
                }

                // Position the hero based on the distance and angle calculated earlier
                game.currentHero.SetPosition({ x: (game.slingshotBandX + distance * Math.cos(angle) + game.offsetLeft) / box2d.scale,
                    y: (game.slingshotBandY + distance * Math.sin(angle)) / box2d.scale });

            } else {

                game.mode = "fired";

                const impulseScaleFactor = 0.8,
                    heroPosition = game.currentHero.GetPosition(),
                    heroPositionX = heroPosition.x * box2d.scale,
                    heroPositionY = heroPosition.y * box2d.scale,

                    impulse = new b2Vec2((game.slingshotBandX - heroPositionX) * impulseScaleFactor,
                    (game.slingshotBandY - heroPositionY) * impulseScaleFactor);


                // Apply an impulse to the hero to fire him towards the target
                game.currentHero.ApplyImpulse(impulse, game.currentHero.GetWorldCenter());

                // Make sure the hero can't keep rolling indefinitely
                game.currentHero.SetAngularDamping(2);

                // Play the slingshot released sound
                if(getFSoundState()) {
                    game.slingshotReleasedSound.play();
                }
            }
        }

        if (game.mode === "fired") {

            // Pan to the location of the current hero as he flies
            const heroX = game.currentHero.GetPosition().x * box2d.scale;
            game.panTo(heroX);

            // Wait till the hero stops moving or is out of bounds
            if ( ! game.currentHero.IsAwake() || heroX < 0 || heroX > game.currentLevel.foregroundImage.width) {
                // then remove the hero from the box2d world
                box2d.world.DestroyBody(game.currentHero);
                // clear the current hero
                game.currentHero = undefined;
                // and load next hero
                game.mode = "load-next-hero";
            }
        }

        if (game.mode === "load-next-hero") {

            // First count the heroes and villains and populate their respective arrays
            game.countHeroesAndVillains();

            // Check if any villains are alive, if not, end the level (success)
            if (game.villains.length === 0) {

                game.mode = "level-success";
                return;
            }

            // Check if there are any more heroes left to load, if not end the level (failure)
            if (game.heroes.length === 0) {
                game.mode = "level-failure";
                return;
            }

            // Load the hero and set mode to wait-for-firing
            if ( ! game.currentHero) {

                // Select the last hero in the heroes array
                game.currentHero = game.heroes[game.heroes.length - 1];

                // Starting position for loading the hero
                const heroStartX = 180,
                    heroStartY = 180;

                // And position him in mid-air, slightly above the slingshot
                game.currentHero.SetPosition({ x: heroStartX / box2d.scale, y: heroStartY / box2d.scale });
                game.currentHero.SetLinearVelocity({ x: 0, y: 0 });
                game.currentHero.SetAngularVelocity(0);

                // And since the hero had been sitting on the ground and is "asleep" in Box2D, "wake" him
                game.currentHero.SetAwake(true);
            } else {
                // Wait for hero to stop bouncing on top of the slingshot and fall asleep
                // and then switch to wait-for-firing
                game.panTo(game.slingshotX);
                if ( ! game.currentHero.IsAwake()) {
                    game.mode = "wait-for-firing";
                }
            }
        }

        if (game.mode === "level-success" || game.mode === "level-failure") {
            // First pan all the way back to the left
            if (game.panTo(0)) {
                // Then show the game as ended and show the ending screen
                game.ended = true;
                game.showEndingScreen();
            }
        }
    },

    mouseOnCurrentHero: function() {
        if (!game.currentHero) {
            return false;
        }

        const position = game.currentHero.GetPosition();

        // distance between center of the hero and the mouse cursor
        const distanceSquared = Math.pow(position.x * box2d.scale - mouse.x - game.offsetLeft, 2) +
            Math.pow(position.y * box2d.scale - mouse.y, 2);

        // radius of the hero
        const radiusSquared = Math.pow(game.currentHero.GetUserData().radius, 2);

        // if the distance of mouse from the center is less than the radius, mouse is on the hero
        return (distanceSquared <= radiusSquared);
    },

    animate: function() {

        // Animate the characters
        const currentTime = new Date().getTime();

        if (game.lastUpdateTime) {

            const timeStep = (currentTime - game.lastUpdateTime) / 1000;

            box2d.step(timeStep);

            // Set maxSpeed to roughly 3 pixels if timestep is 1/60
            game.maxSpeed = Math.round(timeStep * 3 * 60);
        }

        game.lastUpdateTime = currentTime;

        // Handle panning, game states and control flow
        game.handleGameLogic();

        // Remove any bodies that died during this animation cycle
        game.removeDeadBodies();

        // Draw the background with parallax scrolling
        // First draw the background image, offset by a fraction of the offsetLeft distance (1/4)
        // The bigger the fraction, the closer the background appears to be
        game.context.drawImage(game.currentLevel.backgroundImage, game.offsetLeft / 4, 0, game.canvas.width, game.canvas.height, 0, 0, game.canvas.width, game.canvas.height);
        // Then draw the foreground image, offset by the entire offsetLeft distance
        game.context.drawImage(game.currentLevel.foregroundImage, game.offsetLeft, 0, game.canvas.width, game.canvas.height, 0, 0, game.canvas.width, game.canvas.height);

        // Draw the base of the slingshot, offset by the entire offsetLeft distance
        game.context.drawImage(game.slingshotImage, game.slingshotX - game.offsetLeft, game.slingshotY);

        // Draw all the bodies
        game.drawAllBodies();

        // Draw the band when we are firing a hero
        if (game.mode === "firing") {
            game.drawSlingshotBand();
        }

        // Draw the front of the slingshot, offset by the entire offsetLeft distance
        game.context.drawImage(game.slingshotFrontImage, game.slingshotX - game.offsetLeft, game.slingshotY);

        if (!game.ended) {
            game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
        }
    },

    drawAllBodies: function() {

        // Draw debug data if a debug canvas has been setup
        if (box2d.debugCanvas) {
            box2d.world.DrawDebugData();
        }

        // Iterate through all the bodies and draw them on the game canvas
        for (let body = box2d.world.GetBodyList(); body; body = body.GetNext()) {

            const entity = body.GetUserData();

            if (entity) {
                entities.draw(entity, body.GetPosition(), body.GetAngle());
            }
        }

    },

    drawSlingshotBand: function() {

        game.context.strokeStyle = "#dcb"; // Dark brown color
        game.context.lineWidth = 12; // Draw a thick line

        // Use angle hero has been dragged and radius to calculate coordinates of edge of hero wrt. hero center
        const radius = game.currentHero.GetUserData().radius + 1, // 1px extra padding
            heroX = game.currentHero.GetPosition().x * box2d.scale,
            heroY = game.currentHero.GetPosition().y * box2d.scale,
            angle = Math.atan2(game.slingshotBandY - heroY, game.slingshotBandX - heroX),

            // This is the X, Y position of the point where the band touches the hero
            heroFarEdgeX = heroX - radius * Math.cos(angle),
            heroFarEdgeY = heroY - radius * Math.sin(angle);

        game.context.beginPath();
        // Start line from top of slingshot (the back side)
        game.context.moveTo(game.slingshotBandX - game.offsetLeft + 3, game.slingshotBandY + 5);

        // Draw line to center of hero
        game.context.lineTo(heroX - game.offsetLeft, heroY);
        game.context.stroke();

        // Draw the hero on the back band
        entities.draw(game.currentHero.GetUserData(), game.currentHero.GetPosition(), game.currentHero.GetAngle());

        game.context.beginPath();
        // Move to edge of hero farthest from slingshot top
        game.context.moveTo(heroFarEdgeX - game.offsetLeft, heroFarEdgeY);

        // Draw line back to top of slingshot (the front side)
        game.context.lineTo(game.slingshotBandX - game.offsetLeft - 40, game.slingshotBandY + 15);
        game.context.stroke();
    },

    removeDeadBodies: function() {

        // Iterate through all the bodies
        for (let body = box2d.world.GetBodyList(); body; body = body.GetNext()) {

            const entity = body.GetUserData();

            if (entity) {

                const entityX = body.GetPosition().x * box2d.scale;

                // If the entity goes out of bounds or its health goes below 0
                if (entityX < 0 || entityX > game.currentLevel.foregroundImage.width ||
                    (entity.health !== undefined && entity.health <= 0)) {

                    // Remove the entity from the box2d world
                    box2d.world.DestroyBody(body);

                    // Update the score if a villain is killed
                    if (entity.type === "villain") {
                        game.score += entity.calories;
                        document.getElementById("score").innerHTML = "Score: " + game.score;
                    }

                    // If entity has a break sound and if Foreground sound is On, play the sound
                    if (entity.breakSound && getFSoundState()) {
                        entity.breakSound.play();
                    }
                }
            }
        }
    },

    showEndingScreen: function() {

        const playNextLevel = document.getElementById("playnextlevel"),
            fail_msg = document.getElementById("fail_level_message"),
            level_msg = document.getElementById("win_level_message"),
            success_msg = document.getElementById("success_all_message");

		fail_msg.style.display = 'none';
		level_msg.style.display = 'none';
		success_msg.style.display = 'none';

        if (game.mode === "level-success") {
			
			if (game.endedSuccessSound && getFSoundState()) {
				game.endedSuccessSound.play();
			}

            if (game.currentLevel.number < levels.data.length - 1) {

				level_msg.style.display = 'block';

                // More levels available. Show the play next level button
                playNextLevel.style.display = "block";

                // Deblock the next level
                deblockLevel(game.currentLevel.number + 1);                

            } else {

				success_msg.style.display = 'block';

				// No more levels. Hide the play next level button
                playNextLevel.style.display = "none";
            }

			// Save the score
            saveNewScore(game.score);

        } else if (game.mode === "level-failure") {
			
			if (game.endedFailureSound && getFSoundState()) {
				game.endedFailureSound.play();
			}

			fail_msg.style.display = 'block';

            // Failed level. Hide the play next level button
            playNextLevel.style.display = "none";
        }

        game.hideScreen("helpscreen");
        game.showScreen("endingscreen");

        // Stop the background music when the game ends
        game.stopBackgroundMusic();
    },
}

"use strict";

/**
 * 
 * Initialisations & Events
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

// Intialize game once page has fully loaded
window.addEventListener("load", function() {
    game.resize();
    game.init();
});

window.addEventListener("resize", function() {
    game.resize();
});

document.addEventListener("touchmove", function(ev) {
    ev.preventDefault();
});
"use strict";

/**
 * Mouse Class
 *
 * Handle mouse manipulations
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

var mouse = {

    x: 0,
    y: 0,
    down: false,
    dragging: false,

    init: function() {
        
        let canvas = document.getElementById("gamecanvas");

        canvas.addEventListener("mousemove", mouse.mousemovehandler, false);
        canvas.addEventListener("mousedown", mouse.mousedownhandler, false);
        canvas.addEventListener("mouseup", mouse.mouseuphandler, false);
        canvas.addEventListener("mouseout", mouse.mouseuphandler, false);

        // Handle touchmove separately
        canvas.addEventListener("touchmove", mouse.touchmovehandler, false);

        // Reuse mouse handlers for touchstart, touchend, touchcancel
        canvas.addEventListener("touchstart", mouse.mousedownhandler, false);
        canvas.addEventListener("touchend", mouse.mouseuphandler, false);
        canvas.addEventListener("touchcancel", mouse.mouseuphandler, false);
    },

    mousemovehandler: function(ev) {
        
        let offset = game.canvas.getBoundingClientRect();

        mouse.x = (ev.clientX - offset.left) / game.scale;
        mouse.y = (ev.clientY - offset.top) / game.scale;

        if (mouse.down) {
            mouse.dragging = true;
        }

        ev.preventDefault();
    },

    touchmovehandler: function(ev) {

        let touch = ev.targetTouches[0],
            offset = game.canvas.getBoundingClientRect();

        mouse.x = (touch.clientX - offset.left) / game.scale;
        mouse.y = (touch.clientY - offset.top) / game.scale;

        if (mouse.down) {
            mouse.dragging = true;
        }

        ev.preventDefault();
    },

    mousedownhandler: function(ev) {
        mouse.down = true;
        ev.preventDefault();
    },

    mouseuphandler: function(ev) {
        mouse.down = false;
        mouse.dragging = false;
        ev.preventDefault();
    }
};
"use strict";

/**
 * Utilities functions
 *
 * Some utilities helpers functions
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

 /**
  * Test if actual platform is a mobile client
  */
 function isMobile()
 {
    let isMob = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(window.navigator && window.navigator.userAgent),
        isTouch = !!(("ontouchend" in window) || (window.navigator && window.navigator.maxTouchPoints > 0) || (window.navigator && window.navigator.msMaxTouchPoints > 0));
 
    return (isMob && isTouch);
}
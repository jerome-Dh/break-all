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

/**
 * Get the current level from localStorage
 */
function getCurrentLevel() {
    let storageLevel = localStorage.getItem('current_level');
    return storageLevel ? parseInt(storageLevel) : 0;
}

/**
 * Set the current level to localStorage
 * @param {*} level 
 */
function setCurrentLevel(level) {
    localStorage.setItem('current_level', level);
}

/**
 * Get the Best level from localStorage
 */
function getBestLevel() {
    let storageBestLevel = localStorage.getItem('best_level');
    return storageBestLevel ? parseInt(storageBestLevel) : 0;
}

/**
 * Set the Best level to localStorage
 * @param {*} level 
 */
function setBestLevel(level) {
    localStorage.setItem('best_level', level);
}

/**
 * Get the current score from localStorage
 */
function getBestScore() {
    let storageScore = localStorage.getItem('current_score');
    return storageScore ? parseInt(storageScore) : 0;
}

/**
 * Set the current score to localStorage
 * @param {*} score 
 */
function setCurrentScore(score) {
    localStorage.setItem('current_score', score);
}

/**
 * Get the current pseudo from localStorage
 */
function getCurrentPseudo() {
    let storagePseudo = localStorage.getItem('current_pseudo');
    return storagePseudo ? storagePseudo : 'Anonyme';
}

/**
 * Set the current pseudo to localStorage
 * @param {*} pseudo 
 */
function setCurrentPseudo(pseudo) {
    localStorage.setItem('current_pseudo', pseudo);
}

/**
 * Get the bsound state from localStorage
 */
function getBSoundState() {
    let storageBSound = localStorage.getItem('bsound');
    return storageBSound ? storageBSound === 'true' : true;
}

/**
 * Set the bsound state to localStorage
 * @param {*} state 
 */
function setBSoundState(state) {
    localStorage.setItem('bsound', state.toString());
}

/**
 * Get the fsound state from localStorage
 */
function getFSoundState() {
    let storageFSound = localStorage.getItem('fsound');
    return storageFSound ? storageFSound === 'true' : true;
}

/**
 * Set the fsound state to localStorage
 * @param {*} state 
 */
function setFSoundState(state) {
    localStorage.setItem('fsound', state.toString());
}

/**
 * Get save online state from localStorage
 */
function getSaveOnlineState() {
    let storageSaveOnline = localStorage.getItem('save_online');
    return storageSaveOnline ? storageSaveOnline === 'true' : true;
}

/**
 * Set save online state to localStorage
 * @param {*} state 
 */
function setSaveOnlineState(state) {
    localStorage.setItem('save_online', state.toString());
}

/**
 * Get the current online best score
 */
function getBestOnlineScore() {
    return getBestScore();
}

/**
 * Save the users settings
 */
function saveSettings() {

    // Get the values
    let pseudo = document.getElementById('pseudo').value,

        bsoundOn = document.getElementById('bsound_on').checked,

        fsoundOn = document.getElementById('fsound_on').checked,

        saveScoreOn = document.getElementById('save-score-online-on').checked;

    setCurrentPseudo(pseudo);
    setBSoundState(bsoundOn);
    setFSoundState(fsoundOn);
    setSaveOnlineState(saveScoreOn);

    let p = document.getElementById('info-setting');

    if( ! p) {
        p = document.createElement('p');
        p.id = 'info-setting';
    }
    p.innerHTML = 'Settings saved successfuly !';
    document.getElementById('save-button').appendChild(p);
    setTimeout(() => {
        p.remove();
    }, 5000);
}

/**
 * Restaure the users settings
 */
function restaureSettings() {

    let storagePseudo = getCurrentPseudo(),
        storageBSound = getBSoundState(),
        storageFSound = getFSoundState(),
        storeOnline = getSaveOnlineState();
    
    // Set the values in form
    document.getElementById('pseudo').value = storagePseudo,

    document.getElementById('bsound_on').checked = storageBSound === true,
    document.getElementById('bsound_off').checked = storageBSound === false,

    document.getElementById('fsound_on').checked = storageFSound === true,
    document.getElementById('fsound_off').checked = storageFSound === false,

    document.getElementById('save-score-online-on').checked = storeOnline === true,
    document.getElementById('save-score-online-off').checked = storeOnline === false;

}

/**
 * Get All scores from server
 */
function getAllScoreFromServer() {

    // Make a Ajax call
}

/**
 * Save the level
 * @param {int} level 
 */
function deblockLevel(level) {

    let saved = getBestLevel();
    if(saved < level) {
        setBestLevel(level);
    }
}

/**
 * Enable or Disable the levels buttons
 */
function enableOrDisableLevelButtons() {

    let levelsButtons = document.getElementsByClassName('level-item-button'),
        currentLevel = getBestLevel();

    if(levelsButtons) {
        for(let i = 0; i < levelsButtons.length; ++i) {
            levelsButtons[i].disabled = i <= currentLevel ? false : true;
        }
    }
}

/**
 * Save the current score
 * @param {int} score 
 */
function saveNewScore(score) {

    if(score > getBestScore()) {
        setCurrentScore(score);
    }
}
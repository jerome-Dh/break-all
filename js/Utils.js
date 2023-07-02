"use strict";

/**
 * Utility functions
 *
 * @author Jerome Dh <jdieuhou@gmail.com>
 */

 /**
  * Check if actual platform is a mobile client
  */
 function isMobile() {
	const isMob = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(window.navigator && window.navigator.userAgent),
		isTouch = !!(("ontouchend" in window) || (window.navigator && window.navigator.maxTouchPoints > 0) || (window.navigator && window.navigator.msMaxTouchPoints > 0));

	return (isMob && isTouch);
}

/**
 * Get the current level from localStorage
 */
function getCurrentLevel() {
	const storageLevel = localStorage.getItem('current_level');
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
	const storageBestLevel = localStorage.getItem('best_level');
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
	const storageScore = localStorage.getItem('current_score');
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
	const storagePseudo = localStorage.getItem('current_pseudo');
	return storagePseudo ? storagePseudo : 'Anonymous';
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
	const storageBSound = localStorage.getItem('bsound');
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
	const storageFSound = localStorage.getItem('fsound');
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
	const storageSaveOnline = localStorage.getItem('save_online');
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
 * Save the level
 * @param {int} level 
 */
function deblockLevel(level) {

	const saved = getBestLevel();
	if(saved < level) {
		setBestLevel(level);
	}
}

/**
 * Save the current score
 * @param {int} score 
 */
function saveNewScore(score) {

	if(score > getBestScore()) {

		setCurrentScore(score);

		if(getSaveOnlineState()) {
			sendPlayerScoreOnline();
		}
	}
}

/**
 * Save the users settings
 */
function saveSettings() {

	const pseudo = document.getElementById('pseudo').value,

		bsoundOn = document.getElementById('bsound_on').checked,

		fsoundOn = document.getElementById('fsound_on').checked,

		saveScoreOn = document.getElementById('save-score-online-on').checked;

	setCurrentPseudo(pseudo);
	setBSoundState(bsoundOn);
	setFSoundState(fsoundOn);
	setSaveOnlineState(saveScoreOn);

	let p = document.getElementById('info-setting');

	if(!p) {
		p = document.createElement('p');
		p.id = 'info-setting';
	}
	p.innerHTML = 'Settings saved successfuly !';
	document.getElementById('save-button').appendChild(p);
	setTimeout(() => p.remove(), 5000);
}

/**
 * Restaure the users settings
 */
function restaureSettings() {

	const storagePseudo = getCurrentPseudo(),
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
 * Get the current online best score
 */
function getBestOnlineScore(node) {

	new BRequest()
		.get()
		.then(json => computeBestOnlineScore(json, node))
		.catch(err => console.error(err));
}

/**
 * find the best online score in players list 
 */
function computeBestOnlineScore(data, node) {

	const playerMax = { score: 0 };
	if(data.content && data.content.length) {

		const players = data.content;
		playerMax = players.reduce((max, item) => Number(item.score) > Number(max.score) ? item : max, players[0]);
	}

	node.innerHTML = playerMax.score;
}

/**
 * Get All scores from server
 */
function getAllScoreFromServer() {

	const info = document.getElementById('info-zone'),
		loader = document.getElementById('loading-score');

	info.style.display = 'none';
	loader.style.display = 'block';

	new BRequest()
		.get()
		.then(json => {
			loader.style.display = 'none';
			displayOnlineScores(json);
		})
		.catch(err => {
			loader.style.display = 'none';
			info.innerHTML = 'An error occurred!';
			info.style.display = 'block';
			console.error(err);
		});
}

/**
 * Display the online scores in page
 */
function displayOnlineScores(data) {

	const info = document.getElementById('info-zone');

	const players = data.content,
		table_scores = document.getElementById('table-scores');

	if(!players.length) {
		info.innerHTML = '!! No score recorded !!';
		info.style.display = 'block';
	}
	else {

		// Remove others
		const already = document.getElementsByClassName('player-score-online');
		for(let i = 0; i < already.length; ++i) {
			table_scores.removeChild(already[i]);
		}

		for (let i = 0; i < players.length; ++i) {

			let tds = '<td>' + players[i].addr + '<br/><small>' + players[i].date + '</small></td>'
					+'<td>' + players[i].pseudo + '</td>'
					+'<td>' + players[i].score + '</td>'
					+'<td>' + players[i].level + '</td>',

			tr = document.createElement('tr');
			tr.classList.add('player-score-online');
			tr.innerHTML = tds;

			table_scores.appendChild(tr);
		}
	}
}

/** Send the player score online */
function sendPlayerScoreOnline() {

	const date = new Date(),
	player = {
		pseudo: getCurrentPseudo(),
		score: getBestScore(),
		date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
		level: (getBestLevel() + 1) // Level number begin at 0
	};

	const userId = localStorage.getItem('userId');
	new BRequest()
		.post(userId ? userId : 0, JSON.stringify(player))
		.then(resp => {
			localStorage.setItem('userId', resp.content);
			console.log(resp)
		})
		.catch(err => console.error(err));
}

/** Enable or Disable the levels buttons */
function enableOrDisableLevelButtons() {

	const levelsButtons = document.getElementsByClassName('level-item-button'),
		currentLevel = getBestLevel();

	if(levelsButtons) {
		for(let i = 0; i < levelsButtons.length; ++i) {
			levelsButtons[i].disabled = i <= currentLevel ? false : true;
		}
	}
}

/** Set the API base url */
function setAPIBaseUrl() {
	new BRequest().setAPIBaseUrl();
}

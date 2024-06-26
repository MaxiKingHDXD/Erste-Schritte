/**
 * Gesamtpunktzahl
 *
 * @var number
 */
var score = 0;
var score63 = 0;

/**
 * Anzahl der getätigten Würfe in dieser Runde
 *
 * @var number
 */
var rolled = 0;

/**
 * Alle aktuellen Würfelwerte
 *
 * @var array
 */
var values = [];

const roll_limit = 3;

/**
 * Alle Würfel werfen
 *
 * @return void
 */
function rollDices() {
	if (rolled >= roll_limit) {
		return;
	}

	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');

	// Die aktuellen Würfelwerte zurücksetzen
	values = [];

	for (var i = 0; i < dices.length; i++) {
		// Eine Zufallszahl zwischen 1 und 6 generieren und dem Würfel zuweisen
		if (!dices[i].hasAttribute("data-hold")) {
			dices[i].value = Math.floor((Math.random() * 6) + 1);
		}

		// Aktuellen Würfelwert merken
		var value = parseInt(dices[i].value);
		values.push(value);
	}

	// Anzahl der getätigten Würfe erhöhen
	rolled++;
}


/**
 *
 */
function addDiceIcon(zahl, element) {
	element.insertAdjacentHTML('beforeend', "<span class='extra-dice' data-value='" + zahl + "'></span>")
}

/**
 * Würfel einem Feld zuweisen
 *
 * @param HTMLElement field
 * @param String type
 * @return void
 */
function assignDices(field, type) {
	if (rolled < 1 || field.classList.contains('filled')) {
		return
	}

	values.forEach(a => {
		addDiceIcon(a, field.previousElementSibling)
	})

	// @TODO Verhindern Sie, dass die Würfel einem Feld mehr als einmal zugewiesen werden können

	// Die zu vergebenden Punkte
	var points = 0;

	// Punkte berechnen
	switch (type) {
		// Einser bis Sechser @TODO Erweitern Sie, damit auch Dreier, Vierer, Fünfer und Sechser berechnet werden
		case 'einser':

			points = getEinserBisSechser(1);
			score63 += points;
			break;
		case 'zweier':

			points = getEinserBisSechser(2);
			score63 += points;
			break;
		case 'dreier':

			points = getEinserBisSechser(3);
			score63 += points;
			break;
		case 'vierer':

			points = getEinserBisSechser(4);
			score63 += points;
			break;
		case 'fünfer':

			points = getEinserBisSechser(5);
			score63 += points;
			break;
		case 'sechser':

			points = getEinserBisSechser(6);
			score63 += points;
			break;
		case 'dreierpasch':

			points = getPasch(3);
			break;
		case 'viererpasch':

			points = getPasch(4);
			break;
		case 'fullhouse':

			points = getFullHouse();
			break;
		case 'kleinestraße':

			points = getStreak(4);
			break;
		case 'großestraße':

			points = getStreak(5);
			break;
		case 'kniffel':

			points = getPasch(5);
			break;
		case 'chance':

			points = getChance();
			break;
	}

	field.classList.add('filled')

	// Punkte zuweisen
	field.innerHTML = points;

	// Gesamtpunktzahl erhöhen und in das HTML Element mit der ID score schreiben
	score += points;
	console.log(score63);
	if (score63 >= 63 && document.getElementById('bonus63').innerHTML == "") {
		score+=35
		document.getElementById('bonus63').innerHTML = '35'
	}

	document.getElementById('score').innerHTML = score;
	document.getElementById('zwischensumme').innerHTML = score63;

	// Runde zurücksetzen
	resetRound();

	rolled	= 0;

}

/**
 * Einser bis Sechser berechnen
 *
 * @return number
 * @param num
 */
function getEinserBisSechser(num) {
	var points = 0;
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
		if (dices[i].value == num) {
			points  = points + num;
		}
	}

	return points;
}

/**
 * Pasch berechnen
 *
 * @param number num
 * @return number
 */
function getPasch(num) {
	var points = 0;
	var arr = [];

	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
		if (dices[i].value != 0){
			arr.push(dices[i].value);
		}
	}

	arr.sort()

	switch(num) {
		case 3:
			for (var x =0; x < arr.length; x++) {
				if (arr[x] == arr[x+1] && arr[x+1] == arr[x+2]) {
					for (var f =0; f < arr.length; f++){
						points += parseInt(arr[f])
					}
					break
				}
			}
			break;
		case 4:
			for (var x =0; x < arr.length; x++) {
				if (arr[x] == arr[x+1] && arr[x+1] == arr[x+2] && arr[x+2] == arr[x+3]) {
					for (var f =0; f < arr.length; f++){
						points += parseInt(arr[f])
					}
					break
				}
			}
			break;
		case 5:
			if (arr.length >= 5) {
				if (arr[0] == arr[1] && arr[1] == arr[2] && arr[2] == arr[3] && arr [3] == arr [4]) {
					points+=50
					break
				}
			}
	}

	return points;
}

/**
 * Full House berechnen
 *
 * @return number
 */
function getFullHouse() {
	var points = 0;
	var arr = [];

	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');
	for (var i = 0; i < dices.length; i++) {
		if (dices[i].value != 0){
			arr.push(dices[i].value);
		}
	}

	arr.sort()

	console.log(arr)

	if (arr.length >= 5 && (arr[0] == arr[1] && arr[1] == arr[2] && arr[3] == arr[4] || arr[0] == arr[1] && arr[2] == arr[3] && arr[3] == arr[4])) {
		points += 25
	}

	// @TODO Berechnen von FullHouse

	return points;
}

/**
 * Straße berechnen
 *
 * @param number num
 * @return number
 */
function getStreak(num) {
	var points = 0;
	var arr = [];

	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
		if (dices[i].value != 0){
			arr.push(dices[i].value);
		}
	}

	arr.sort()
	arr =  [...new Set(arr)];

	switch(num) {
		case 4:
			if(arr.length == 4 && parseInt(arr[0])+1 == arr[1] && parseInt(arr[1])+1 == arr[2] && parseInt(arr[2])+1 == parseInt(arr[3])) {
				points += 30
			}

			break;
		case 5:
			if (arr.length == 5 && parseInt(arr[0])+1 == arr[1] && parseInt(arr[1])+1 == arr[2] && parseInt(arr[2])+1 == arr[3] && parseInt(arr[3])+1 == arr[4]) {
				points += 40
			}
			break;

	}

	return points;
}

/**
 * Chance berechnen
 *
 * @return number
 */
function getChance() {
	var points = 0;

	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');


	for (var f =0; f < dices.length; f++){
		points += parseInt(dices[f].value)
	}

	// @TODO Berechnen Sie eine Chance


	return points;
}

/**
 * Diese Runde zurücksetzen
 *
 * @return void
 */
function resetRound() {
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
		// Alle Würfel loslassen
		dices[i].removeAttribute('data-hold');

		// Alle Würfelwerte zurücksetzen
		dices[i].value = 0;
	}

	// Alle gemerkten Würfelwerte zurücksetzen
	values = [];

	// @TODO Setzen Sie die Anzahl der getätigten Würfe zurück
}

/**
 * Würfel halten oder loslassen
 *
 * @param HTMLElement dice
 * @return void
 */
function toggleDice(dice) {

	if (rolled <= 0) {
		return
	}

	if (dice.getAttribute('data-hold')) {
		// Das HTML Attribut "data-hold" existiert bereits und wird entfernt
		dice.removeAttribute('data-hold');
	} else {
		// Das HTML Attribut "data-hold" existiert noch nicht und wird gesetzt
		dice.setAttribute('data-hold', 1);
	}
	// Refresh the page

	dice.blur();
}

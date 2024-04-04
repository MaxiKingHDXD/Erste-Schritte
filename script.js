/**
 * Gesamtpunktzahl
 *
 * @var number
 */
var score = 0;

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

/**
 * Alle Würfel werfen
 *
 * @return void
 */
function rollDices() {
	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');

	// Die aktuellen Würfelwerte zurücksetzen
	values = [];

	for (var i = 0; i < dices.length; i++) {
		if (dices[i].hasAttribute("data-hold")) {
			continue;
		}

		// Eine Zufallszahl zwischen 1 und 6 generieren und dem Würfel zuweisen
		dices[i].value = Math.floor((Math.random() * 6) + 1);

		// Aktuellen Würfelwert merken
		var value = parseInt(dices[i].value);
		values.push(value);
	}

	// Anzahl der getätigten Würfe erhöhen
	rolled++;
}

/**
 * Würfel einem Feld zuweisen
 *
 * @param HTMLElement field
 * @param String type
 * @return void
 */
function assignDices(field, type) {
	// @TODO Verhindern Sie, dass die Würfel einem Feld mehr als einmal zugewiesen werden können

	// Die zu vergebenden Punkte
	var points = 0;

	console.log(type)

	// Punkte berechnen
	switch (type) {
		// Einser bis Sechser @TODO Erweitern Sie, damit auch Dreier, Vierer, Fünfer und Sechser berechnet werden
		case 'einser':
			points = getEinserBisSechser(1);
			break;
		case 'zweier':
			points = getEinserBisSechser(2);
			break;
		case 'dreier':
			points = getEinserBisSechser(3);
			break;
		case 'vierer':
			points = getEinserBisSechser(4);
			break;
		case 'fünfer':
			points = getEinserBisSechser(5);
			break;
		case 'sechser':
			points = getEinserBisSechser(6);
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
		case 'großsestraße':
			points = getStreak(5);
			break;
		case 'kniffel':
			points = getPasch(5);
			break;
		case 'chance':
			points = getChance();
			break;
	}

	// Punkte zuweisen
	field.innerHTML = points;

	// Gesamtpunktzahl erhöhen und in das HTML Element mit der ID score schreiben
	score += points;
	document.getElementById('score').innerHTML = score;

	// Runde zurücksetzen
	resetRound();

}

/**
 * Einser bis Sechser berechnen
 *
 * @param number num
 * @return number
 */
function getEinserBisSechser(num) {
	var points = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i] == num) {
			points += num;
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

	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
		console.log(dices[i].value)

		// dices[i].value;
	}

	// @TODO Berechnen Sie einen Dreier- und Viererpasch

	return points;
}

/**
 * Full House berechnen
 *
 * @return number
 */
function getFullHouse() {
	var points = 0;

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

	// @TODO Berechnen Sie eine Straße

	return points;
}

/**
 * Chance berechnen
 *
 * @return number
 */
function getChance() {
	var points = 0;

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
	// @TODO Verhindern Sie, dass die Würfel gehalten oder losgelassen werden können, bevor mindestens einmal gewürfelt wurde

	if (dice.getAttribute('data-hold')) {
		// Das HTML Attribut "data-hold" existiert bereits und wird entfernt
		dice.removeAttribute('data-hold');
	} else {
		// Das HTML Attribut "data-hold" existiert noch nicht und wird gesetzt
		dice.setAttribute('data-hold', 1);
	}

	// Fokus auf diesen Würfel entfernen
	dice.blur();
}

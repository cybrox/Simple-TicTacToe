/**
 * Chrome elegant Tic Tac Toe application
 * BUEP - Technische Berufsschule Zürich
 *
 * Code written and copyrighted 2013+ by Sven Marc Gehring
 * Calculating and tactics designed   by Dario Duff
 *
 * Licensed under Creative Commons BY-NC-SA 3.0 license
 * For additional information, please read the respective
 * license deed at the Creative Commons website:
 * >
 */
 

/**
 * Event listener for app startup
 *
 * This function will be called when the
 * application started up to output the
 * intitializing console information and
 * register the button event listener.
 */
$(document).ready(function(){

	/* Write startup comments */
	System.consoleWriteMultiple(1, [
		"Loading game information...",
		"Loading gameboard, 3x3 fields",
		"Game fact: There are 255,168 possible games",
		"Game fact: You can always score a tie.",
		"",
		"Loading player informations...",
		"Player 1 :[X]: Human",
		"Player 2 :[O]: Albatros (AI)",
		"",
		"Claculating player chances...",
		"Your chance to win: 0.000%.",
		"Your chance to score a draw: 78.384%.",
		"Good Luck!!",
		"",
		"Switching log input <Albatros AI>"
	]);
	

	/**
	 * Register difficulty switch
	 */
	$("#difficulty").click(function(){
		
		TicTacToe.albatros.diff = (TicTacToe.albatros.diff == 0) ? 1 : 0;
		
		var buttonText = ["Easy", "Hard"];
		$("#difftext").text(buttonText[TicTacToe.albatros.diff]);
	});
	
	
	/**
	 * Initialize game
	 */
	TicTacToe.game.initialize();
	TicTacToe.game.displayWin("has just started.");
});
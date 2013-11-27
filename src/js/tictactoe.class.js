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
 * @namespace TicTacToe
 * @name TicTacToe
 * @desc TicTacToe Game Class
 */
var TicTacToe = {

	/**
	 * Game configuration
	 */
	config: {
		player1: "X",
		player2: "O",
		blank: "_"
	},
	
	/**
	 * Current game data
	 */
	current: {
		board: new Array(3),
		game:  new Array(3),
		turn:  "X",
		blank: 9
	},
	
	/**
	 * Gamestats
	 */
	stats: {
		played:   0,
		tiegames: 0,
		player1w: 0,
		player2w: 0
	},
	
	
	game: {
		/**
		 * @name Initialize
		 * @desc Initialize TicTacToe game
		 */
		initialize: function(){
			TicTacToe.field.generate();
			TicTacToe.game.reset();
		},
		
		/**
		 * @name game.reset
		 * @desc Reset TicTacToe game
		 */
		reset: function(){
			TicTacToe.stats.played++;
			TicTacToe.field.clear();
			TicTacToe.current.blank = 9;
			TicTacToe.current.turn = TicTacToe.config.player1;
			
			for(i = 0; i < 3; i++){
				for(j = 0; j < 3; j++){
					TicTacToe.current.game[i][j] = TicTacToe.config.blank;
				}
			}
		},
	
		/**
		 * @name checkWin
		 * @desc Check if either player has won and output message
		 * @return {bool} If any player has won yet
		 */
		checkWin: function(){
			var gameWinner = TicTacToe.game.determineWin(TicTacToe.current.game);
			
			if(gameWinner){
				switch(gameWinner){
					case "tie": TicTacToe.stats.tiegames++; break;
					case TicTacToe.config.player1: TicTacToe.stats.player1w++; break;
					case TicTacToe.config.player2: TicTacToe.stats.player2w++; break;
					default: break;
				}
				
				TicTacToe.game.displayWin("has ended");
				TicTacToe.game.reset();
				return true;
			}
			
			return false;
		},
	
		/**
		 * @name determineWin
		 * @desc Determine if either player has won the game
		 * @param {array} gameBoard - The game board to check
		 * @return {string} winners game character, tie or false if no winner was found
		 */
		determineWin: function(gameBoard){
			var blank = TicTacToe.config.blank;
			
			if(gameBoard[0][0] == gameBoard[0][1] && gameBoard[0][1] == gameBoard[0][2] && gameBoard[0][2] != blank) return gameBoard[0][2];
			if(gameBoard[1][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[1][2] && gameBoard[1][2] != blank) return gameBoard[1][2];
			if(gameBoard[2][0] == gameBoard[2][1] && gameBoard[2][1] == gameBoard[2][2] && gameBoard[2][2] != blank) return gameBoard[2][2];
			if(gameBoard[0][0] == gameBoard[1][0] && gameBoard[1][0] == gameBoard[2][0] && gameBoard[2][0] != blank) return gameBoard[2][0];
			if(gameBoard[0][1] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][1] && gameBoard[2][1] != blank) return gameBoard[2][1];
			if(gameBoard[0][2] == gameBoard[1][2] && gameBoard[1][2] == gameBoard[2][2] && gameBoard[2][2] != blank) return gameBoard[2][2];
			if(gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[2][2] != blank) return gameBoard[2][2];
			if(gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[2][0] != blank) return gameBoard[2][0];
			
			if(TicTacToe.current.blank == 0) return "tie";
			
			return false;
		},
		
		/**
		 * @name displayWin
		 * @desc Output the win message to the console
		 * @param {string} message - Win message to display
		 */
		displayWin: function(message){
			System.consoleWriteMultiple(1, [
				"Displaying win message",
				"Displaying player statistics",
				"Reloading game field"
			]);
			
			System.consoleClear(2);
			System.consoleWriteMultiple(2, [
				"============================",
				"",
				"Player ["+TicTacToe.stats.player1w+" : "+TicTacToe.stats.player2w+"] Albatros (AI)",
				"",
				TicTacToe.stats.tiegames+" Tie Games: ",
				"",
				"============================",
				"This round: "+message,
				"Starting round "+TicTacToe.stats.played+" good luck!"
			]);
		}
	},
	
	field: {
		/**
		 * @name field.generate
		 * @desc Generate a new game field and register click handler
		 */
		generate: function(){
			for(i = 0; i < 3; i++){
				TicTacToe.current.board[i] = new Array(3);
				TicTacToe.current.game[i]  = new Array(3);
				for(j = 0; j < 3; j++){
				
					var        newField = "<div class=\"tictactoefield ";
					if(j == 1) newField += "tictactoefieldmid"
					           newField += "\" id=\"tttf_"+i+"_"+j+"\"></div>";
					
					$('#gamefield').append(newField);
					TicTacToe.current.game[i][j] = TicTacToe.config.blank;
				}
			}
			
			$('.tictactoefield').click(function(){
			
				var fieldData = $(this).attr('id').split("_");
				TicTacToe.turn.handle(fieldData[1], fieldData[2]);
				
			});
		},
		
		/**
		 * @name field.clone
		 * @desc Clone game field for the computer
		 */
		clone: function(){
			for(i = 0; i < 3; i++){
				for(j = 0; j < 3; j++){
					TicTacToe.current.board[i][j] = TicTacToe.current.game[i][j];
				}
			}
		},
		
		/**
		 * @name field.write
		 * @desc Write player character to a specific field
		 * @param {string} row - field row
		 * @param {string} col - field col
		 */
		write: function(row, col){
			TicTacToe.current.game[row][col] = TicTacToe.current.turn;
			TicTacToe.current.blank--;
			
			$("#tttf_"+row+"_"+col).text(TicTacToe.current.turn);
			$("#tttf_"+row+"_"+col).addClass("player_"+TicTacToe.current.turn);
		},
		
		/**
		 * @name field.clear
		 * @desc Clear the game field
		 */
		clear: function(){
			$("#gamefield").fadeOut(500, function(){
				$(".tictactoefield").empty();
				$(".tictactoefield").removeClass("player_"+TicTacToe.config.player1);
				$(".tictactoefield").removeClass("player_"+TicTacToe.config.player2);
				$("#gamefield").fadeIn(500);
			});
		}
	},
	
	turn: {
		/**
		 * @name handleClick
		 * @desc Handle the players click on a game field
		 * @param {string} row - Clicked field row
		 * @param {string} col - Clicked field col
		 */
		handle: function(row, col){
			if(TicTacToe.current.game[row][col] != TicTacToe.config.blank) return;
			
			TicTacToe.field.write(row, col);
			if (TicTacToe.game.checkWin()) return;
			
			TicTacToe.turn.swap();
			TicTacToe.albatros.playTurn();
			if (TicTacToe.game.checkWin()) return;
		},
		
		/**
		 * @name turn.swap
		 * @desc Change the active player
		 */
		swap: function(){
			TicTacToe.current.turn = (TicTacToe.current.turn == TicTacToe.config.player1) ?
				TicTacToe.config.player2 : TicTacToe.config.player1;
		}
	},
	
	/**
	 * Albatros AI
	 */
	albatros: {
		turn: "",
		diff: 1,
		calc: 0,
		
		/**
		 * @name albatrosSwapTurn
		 * @desc Swap AI turn
		 */
		swapTurn: function(){
			TicTacToe.albatros.turn = (TicTacToe.albatros.turn == TicTacToe.config.player2) ?
				TicTacToe.config.player1 : TicTacToe.config.player2;
		},
		
		/**
		 * @name albatrosPlayTurn
		 * @desc Play an AI turn
		 */
		playTurn: function(){
			var etaStart = new Date();
			
			if(TicTacToe.albatros.diff == 1){	// Difficulty switch
				System.consoleWriteMultiple(1, [
					"--------------",
					"Initializing Albatros AI",
					"Calculating best turn for "+TicTacToe.current.blank+" fields"
				]);
				
				TicTacToe.albatros.turn = TicTacToe.config.player2;
				
				if(TicTacToe.current.turn != TicTacToe.config.player2) return;
				if(TicTacToe.current.blank == 0) return; 
				
				TicTacToe.field.clone();
				
				var chooseField = -1000;
				
				for(i = 0; i < 3; i++){
					for(j = 0; j < 3; j++){
						if(TicTacToe.current.board[i][j] == TicTacToe.config.blank){
						
							TicTacToe.current.board[i][j] = TicTacToe.albatros.turn;
							TicTacToe.current.blank--;
							TicTacToe.albatros.swapTurn();
							TicTacToe.albatros.calc = 0;
							
							calculatedField = TicTacToe.albatros.calculateField(1);
							System.consoleWrite(1, "Checking Field ( "+i+" | "+j+" ) eq. "+calculatedField+" [x"+TicTacToe.albatros.calc+"]");
							TicTacToe.current.board[i][j] = TicTacToe.config.blank;
							TicTacToe.current.blank++;
							
							if(chooseField == -1000 || calculatedField > chooseField){
								chooseField = calculatedField;
								chooseI = i;
								chooseJ = j;
							}
							
							TicTacToe.albatros.swapTurn();
						}
					}
				}
			} else {
				var maxProtection = 0;
				
				do {
					maxProtection++;
					
					chooseI = Math.floor(3 * Math.random());
					chooseJ = Math.floor(3 * Math.random());
				
				} while(TicTacToe.current.game[chooseI][chooseJ] != TicTacToe.config.blank && maxProtection < 20);
			}
			
			var etaEnd = new Date();
			var endTme = etaEnd - etaStart;
			System.consoleWriteMultiple(1, [
				"Choosing Field ( "+chooseI+" | "+chooseJ+" )",
				"Calculated turn in "+endTme+"ms, ETA "+((100-endTme)*-1)+"ms"
			]);
			
			$("#tttf_")
			TicTacToe.field.write(chooseI, chooseJ);
			TicTacToe.turn.swap();
		},
		
		/**
		 * @name calculateField
		 * @desc Calculate the best field to play
		 * @param {int} level - Game depth level to search
		 * @return {int} chosen field's value
		 */
		calculateField: function(level){
			TicTacToe.albatros.calc++;
			
			var checkWin = TicTacToe.game.determineWin(TicTacToe.current.board);
			
			if     (checkWin == TicTacToe.config.player2) return 100 - level;
			else if(checkWin == TicTacToe.config.player1) return level - 100;
			else if(checkWin == "tie")                    return 0;
			
			var chooseField = -1000;
			var calcdtField;
			
			for(var i = 0 ; i < TicTacToe.current.board.length ; i++){
				for(var j = 0 ; j < TicTacToe.current.board[i].length ; j++){
					if(TicTacToe.current.board[i][j] == TicTacToe.config.blank){
					
						TicTacToe.current.board[i][j] = TicTacToe.albatros.turn;
						TicTacToe.albatros.swapTurn();
						TicTacToe.current.blank--;
						
						calcdtField = TicTacToe.albatros.calculateField(level + 1);
						
						TicTacToe.albatros.swapTurn();
						TicTacToe.current.board[i][j] = TicTacToe.config.blank;
						TicTacToe.current.blank++;
						
						if(chooseField == -1000) chooseField = calcdtField;
						else if(TicTacToe.albatros.turn == TicTacToe.config.player2 && calcdtField > chooseField) chooseField = calcdtField;
						else if(TicTacToe.albatros.turn == TicTacToe.config.player1 && calcdtField < chooseField) chooseField = calcdtField;
					}	
				}
			}
			return chooseField;
		}
	}
}

/**
 * Initialize a new game
 */
TicTacToe.game.initialize();
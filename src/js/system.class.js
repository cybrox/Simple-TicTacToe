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
 * @namespace System
 * @name System
 * @desc System object, contains all not game-related methods
 */
var System = {
	config: {
		"cfg": {
			"delaymsg": 80,
			"delaychr": 7
		},
		
		"messages":   0,
		"totaldelay": 0
	},
	
	
	/**
	 * @name consoleWriteMultiple
	 * @desc Write multiple lines to a System console
	 * @param {int} terminal - ID of the terminal to write on
	 * @param {array} messages - Array with message strings
	 */
	consoleWriteMultiple: function(terminal, messages){
		$.each(messages, function(i, message){
			System.consoleWrite(terminal, message);
		});
	},
	
	
	/**
	 * @name consoleWrite
	 * @desc Write a line to a System console
	 * @param {int} terminal - ID of the terminal to write on
	 * @param {string} message - Message string to write
	 */
	consoleWrite: function(terminal, message){
		
		var currentLog = ++System.config.messages;
		                   System.config.totaldelay += System.config.cfg.delaymsg;
	
		$('#logfield'+terminal).append('<span id="log'+currentLog+'"></span>');
		
		if(System.config.totaldelay >= System.config.cfg.delaymsg){
			setTimeout(function(){
				System.consoleAppend(currentLog, terminal, message);
			}, System.config.totaldelay);
		} else {
			System.consoleAppend(currentLog, terminal, message);
		}
	},
	
	
	/**
	 * @name consoleAppend
	 * @desc Append the given message to the System console
	 * @param {int} currentLog - Number of messages in buffer
	 * @param {int} terminal - ID of the terminal to write on
	 * @param {stinrg} message - String to output un the line
	 */
	consoleAppend: function(currentLog, terminal, message){
		$('#log'+currentLog).append('+ ');
		
		$.each(message.split(''), function(i, letter){
			setTimeout(function(){
				$('#log'+currentLog).append(letter);
			}, (i+1)*System.config.cfg.delaychr);
		});
		
		$('#logfield'+terminal).animate({
			"scrollTop": $('#logfield'+terminal)[0].scrollHeight - $('#logfield'+terminal).height()
		}, 50);
		
		setTimeout(function(){
			System.config.totaldelay -= System.config.cfg.delaymsg;
		}, message.length * System.config.cfg.delaychr);
	},
	
	
	/**
	 * @name consoleClear
	 * @desc Clear a System console
	 * @param {int} terminal - ID of the console to clear
	 */
	consoleClear: function(terminal){
		$('#logfield'+terminal).empty();
	}
}
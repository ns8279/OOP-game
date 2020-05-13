const Player = require ('./Player');
const Enemy = require('./Enemy');
const inquirer = require('inquirer');


function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    //pushing emenies to the enemies array
    this.enemies.push(new Enemy('goblin','sword'));
    this.enemies.push(new Enemy('orc','baseball bat'));
    this.enemies.push(new Enemy('skeleton','axe'));

    //initializing current enemy by passing the 1st index of the array 0
    this.currentEnemy = this.enemies[0];

    //prompt the user for their name
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        //destructure the name from the promt object
        .then(({name}) => {
            this.player = new Player(name);

            //test the onbject creation
            //console.log(this.currentEnemy, this.player);

            //To start a new round of battle
            this.startNewBattle()
        });
};

module.exports = Game;

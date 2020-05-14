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

//Method to start new battle
Game.prototype.startNewBattle = function() {
    if(this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    }else {
        this.isPlayerTurn = false;
    };

    //to get the stats of the player call getStats()from the player js
    console.log('Your Stats are as follows:');
    console.table(this.player.getStats());

    //get enemy description
    console.log(this.currentEnemy.getDescription());

    //to start new round
    this.battle();
}

//battle method
Game.prototype.battle = function() {
    if(this.isPlayerTurn) {
        //player prompts will go here
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name:'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({action}) => {
                if (action === 'Use potion'){
                    //follow up prompt
                    if(!this.player.getInventory()) {
                        console.log('You dont have any potions to use!');
                        return this.checkEndOfBattle(); //End of battle added
                    }
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'action',
                            message: 'Which Potion do you wish to use?',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`) //confusing
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');
                        
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            this.checkEndOfBattle();//End of battle added 
                        });
                }else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage); 

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            });
    }
    else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();  //End of Battle added
    }

}

//To check win/lose to end the battle
Game.prototype.checkEndOfBattle = function() {

    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
//if the player defeats the enemy then add potion and change the round number, if there are no enemies left then start a new battle else player wins
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);
      
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
      
        this.roundNumber++;
      
        if (this.roundNumber < this.enemies.length) {
          this.currentEnemy = this.enemies[this.roundNumber];
          this.startNewBattle();
        } else {
          console.log('You win!');
        }
    }

    //if the player has been defeated
    else {
        console.log("You have been defeated!")
    }

}

module.exports = Game;

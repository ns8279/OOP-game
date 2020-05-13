const Potion = require('../lib/Potion');

function Player (name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];
}

//Method to getstats()
Player.prototype.getStats = function () {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility,
    };
};

//Mrthod to getInventory()
Player.prototype.getInventory = function () {
    if(this.inventory.length) {
        return this.inventory;
    }
    return false;
};

//Method to get player health data
Player.prototype.getHealth = function() {
    return ` ${this.name}'s health is now ${this.health}!`;
};

//Method to check if the Player is alive
Player.prototype.isAlive = function() {
    if(this.health === 0){
        return false;
    }
    return true;
};

//Method to subtract player health
Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    if(this.health < 0) {
        this.health = 0;
    }

}

//Method to get Attack value
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max-min) + min);
};

//Method to add Potion into the player inventory
Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
}

//Method to use Potion
Player.prototype.usePotion = function(index) {
    const potion = this.getInventory().splice(index, 1)[0]; //splice method removes item from an array and returns the removed item as new array

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    };
};




//export the Player Constructor
module.exports = Player;


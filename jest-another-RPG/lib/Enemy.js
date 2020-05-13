const Potion = require('./Potion');

function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();
    console.log(this.potion);

    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);
}

//Method to get enemy health data
Enemy.prototype.getHealth = function() {
    return ` ${this.name}'s health is now ${this.health}!`;
};

//Method to check if the Enemy is alive
Enemy.prototype.isAlive = function() {
    if(this.health === 0){
        return false;
    }
    return true;
};

//Method to subtract enemy health
Enemy.prototype.reduceHealth = function(health) {
    this.health -= health;

    if(this.health < 0) {
        this.health = 0;
    }

}

//Method to get Attack value
Enemy.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max-min) + min);
};

//Method to get description of the weapon type
Enemy.prototype.getDescription = function() {
   return ` A ${this.name} has appeared with a ${this.weapon}! `;
};

module.exports = Enemy;
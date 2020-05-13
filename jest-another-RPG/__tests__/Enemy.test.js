const Enemy  = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

test('creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

//test to get information about enemy's health
test('gets enemy health value', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

//test to check the Enemy Health
test('check if the enemy is alive or not', () =>{
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
});

//test to reduce enemy health
test('subtracts from Enemy health', () => {
    const enemy = new Enemy ('goblin', 'sword');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);

    expect(enemy.health).toBe(0);
});

//test to get attack value
test('to get players attack value', () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
    
});

//test to get the description of the enemy's weapon type
test('gets a description of the weapon when an enemy appears', () => {
    const enemy = new Enemy('goblin','sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});

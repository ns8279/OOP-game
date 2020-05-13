const Player = require('../lib/Player'); //if no file extension is given then Node will assume that its a .js file
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');

//console.log(new Potion()); --> This will always be health = 20 because it will always call the mocked Potion() instead of our main
                                //Potion()

test('creates a player object', () =>{
    const player = new Player ('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    //creating an inventory for Potions
    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

//test to getStats
test("gets player stats as an object", ()=> {
    const player = new Player ('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

//test to getInventory
test("gets inventory from player or return false", ()=> {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

//test to get information about player's health
test('gets player health value', () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

//test to check the Player Health
test('check if the player is alive or not', () =>{
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

//test to reduce player health
test('subtracts from Player health', () => {
    const player = new Player ('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

//test to get attack value
test('to get players attack value', () => {
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
    
})

//test to add potion to the inventory
test('adds a potion to the inventory of player', ()=> {
    const player =new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);

});

//test to use a potion from the inventory
test('uses a potion from the inventory', () => {
    const player =new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
})
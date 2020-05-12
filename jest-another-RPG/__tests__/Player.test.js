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
})
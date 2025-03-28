var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length<2){
        var newName = 'Havester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
    }
    if(harvesters.length == 0){
        var newName = 'Havester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length<2){
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader'}});
    }
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length<2){
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, ATTACK, TOUGH], newName, {memory: {role: 'builder'}});
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    var tower = Game.getObjectById('67e5a1c0d9ec22d6111e997f');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax/30000)
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }

}
var roleUpgrader = {

    run: function(creep) {
        const damaged = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(damaged) {
            creep.moveTo(damaged);
            if(creep.pos.isNearTo(damaged)) {
                creep.heal(damaged);
            }
            else {
                creep.rangedHeal(damaged);
            }
        }
        if(creep.store[RESOURCE_ENERGY] == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};
module.exports = roleUpgrader;
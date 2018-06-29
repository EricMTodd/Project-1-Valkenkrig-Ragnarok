console.log("JavaScript is running...");


// DEVELOPER NOTES //
// Create all units for Falkenrath and Werewolves and balance them.
// Create team selection functions with a unit budget of 300 points. See notebook for budget and population balancing.
// Create combat functions and user interface.
// Create remaining factions and units.
// Add art and styling to game.


// GLOBAL VARIABLES //


// This is the field in which combat actually takes place.
const gameBoard = [ [0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,]
]

for (let i = gameBoard.length - 1; i >= 0; i--) {
	let row = gameBoard[i];
	$(".game-board").append(`<div class="game-row-${i} game-row"></div>`)
	for (let x = 0; x < row.length; x++) {
		$(`.game-row-${i}`).append(`<div class="game-square game-square-${x}-${i}"></div>`)
	}
};


// CLASSES //
// Basic unit class.
class BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility) {
		this.name = name;
		this.gender = gender;
		this.age = age;
		this.faction = faction;
		this.race = race;
		this.hp = hp;
		this.ac = ac;
		this.str = str;
		this.dex = dex;
		this.int = int;
		this.speed = speed;
		this.inventory = [weapon1, weapon2, utility];
	}
	basicAttack() {
		if (this.inventory[0].type === "Melee") {
			return this.inventory[0].damage() + this.strMod();
		} else {
			return this.inventory[0].damage() + this.dexMod();
		} 
	}
	basicSpell() {

	}
	strMod() {
		return Math.floor((this.str - 10)/2);
	}
	dexMod() {
		return Math.floor((this.dex - 10)/2);
	}
	intMod() {
		return Math.floor((this.int - 10)/2);
	}
};

// Undead faction template.
class Undead extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility);
	}
	plagued() {

	}
};

// Ausonia faction template.
class Ausonia extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility);
	}
	holySymbol () {

	}
};

// Falkenrath faction template.
class Falkenrath extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility);
	}
	// This method simulates weapon finesse for all Falkenrath units, maximizing combat damage with all weapon types.
	basicAttack() {
		if (this.str > this.dex) {
			return this.inventory[0].damage() + this.strMod();
		} else {
			return this.inventory[0].damage() + this.dexMod();
		}
	}
};

// Werewolf faction template.
class Werewolf extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility);
	}
	// Werewolves can temporarily shift from human to beast form once per game, buffing strength and hp while nerfing the rest.
	shapeShift() {
		this.hp = this.hp * 2;
		this.ac = 10;
		this.str = this.str * 2;
		return `${this.name} has shifted shape into a werewolf!`;
	}
	// Werewolves' health regenerates over time and can only be cancelled out by silvered weapons.
	regeneration() {
		// Health regenerates 10% of max hp every turn.
	}
};

// Demon faction template.
class Demon extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility);
	}
};


// WEAPONS CLASS //
class Weapon {
	constructor(name, type, range) {
		this.name = name;
		this.type = type;
		this.range = range;
	}
};

// WEAPONS OBJECTS //
const vorpalSword = new Weapon("Vorpal Sword", "Melee",  5);
	vorpalSword.damage = (min, max) => {
		return Math.floor((Math.random() * (11 - 6)) + 6);
	};

const caestus = new Weapon("Caestus", "Melee", 5);
	caestus.damage = (min, max) => {
		return Math.floor((Math.random() * (5 - 2)) + 2)
	};


// FACTION HEROES //
// UNDEAD HERO //
// AUSONIA HERO //

// FALKENRATH HERO //
const falkenrathHero = new Falkenrath("Darian Falkenrath", "Male", "Unknown", "Falkenrath", "Vampire", 14, 32, 10, 24, 14, 40, vorpalSword, "", "");

// WEREWOLF HERO //
const werewolfHero = new Werewolf("Gideon Schrader", "Male", 54, "Werewolf", "Human", 60, 18, 30, 14, 10, 30, caestus, "", "");


// FACTION UNITS //
// UNDEAD UNITS //
// UNDEAD AUXILLARY //
// UNDEAD PRIMARY //

// AUSONIA UNITS //
// AUSONIA AUXILLARY //
// AUSONIA PRIMARY //

// FALKENRATH UNITS //
// FALKENRATH AUXILLARY //
// FALKENRATH PRIMARY //

// WEREWOLF UNITS //
// WEREWOLF AUXILLARY //
// WEREWOLF PRIMARY //

// DEMONS //


























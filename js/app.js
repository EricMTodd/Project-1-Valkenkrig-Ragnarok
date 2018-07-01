console.log("JavaScript is running...");


// DEVELOPER NOTES //
// Create team selection functions with a unit budget of 300 points. See notebook for budget and population balancing.
// Create combat functions and user interface such as rangefinding and targeting. This includes a turn counter that tracks each player's move and adds six seconds to a metaphorical stopwatch.
// Create remaining factions and units.
// Add art and styling to game.
// Crit hit and miss.


// GLOBAL FUNCTIONS AND VARIABLES //
const d20 = (min, max) => {
	return Math.floor((Math.random() * (21 - 0)) + 0);
}; // Don't incorporate until targeting is built.


// This is the field in which combat actually takes place.
const gameBoard = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
]

for (let i = gameBoard.length - 1; i >= 0; i--) {
	let row = gameBoard[i];
	$(".game-board").append(`<div class="game-row-${i} game-row"></div>`)
	for (let x = 0; x < row.length; x++) {
		$(`.game-row-${i}`).append(`<div class="game-square game-square-${x}-${i}"></div>`)
	}
};


// CLASSES //
// Player class.
class Player {
	constructor(name, faction, actionPoints, unitBudget)
};

// Basic unit class.
class BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost) {
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
		this.weapon1 = weapon1;
		this.weapon2 = weapon2; 
		this.utility = utility;
		this.budgetCost = budgetCost;
	}
	primaryAttack() {
		if (this.weapon1.type === "Melee") {
			return this.weapon1.damage() + this.strMod();
		} else if (this.weapon1.type === "Ranged") {
			return this.weapon1.damage() + this.dexMod();
		} 
	}
	secondaryAttack() {
		if (this.weapon2.type === "Melee") {
			return this.weapon2.damage() + this.strMod();
		} else if (this.weapon2.type === "Ranged") {
			return this.weapon2.damage() + this.dexMod();
		}
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
	deathState() {
		if (this.hp <= 0) {
			this.detach();
		}
	}
};

// Undead faction template.
class Undead extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost);
	}
	plagued() {

	}
};

// Ausonia faction template.
class Ausonia extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost);
	}
	holySymbol () {

	}
};

// Falkenrath faction template.
class Falkenrath extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost);
	}
	// This method simulates weapon finesse for all Falkenrath units, maximizing combat damage with all weapon types.
	primaryAttack() {
		if (this.str > this.dex) {
			return this.weapon1.damage() + this.strMod();
		} else {
			return this.weapon1.damage() + this.dexMod();
		}
	}
	secondaryAttack() {
		if (this.str > this.dex) {
			return this.weapon2.damage() + this.strMod();
		} else {
			return this.weapon2.damage() + this.dexMod();
		}
	}
};

// Werewolf faction template.
class Werewolf extends BasicUnit {
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility,);
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
	constructor(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost) {
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost);
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
const brassKnuckles = new Weapon("Brass Knuckles", "Melee", 5);
	brassKnuckles.damage = (min, max) => {
		return Math.floor((Math.random() * (5 - 2)) + 2)
	};

const bite = new Weapon("Bite", "Melee", 5);
	bite.damage = (min, max) => {
		return Math.floor((Math.random() * (9 - 6)) + 6)
	};	

const vorpalSword = new Weapon("Vorpal Sword", "Melee",  5);
	vorpalSword.damage = (min, max) => {
		return Math.floor((Math.random() * (11 - 6)) + 6);
	};

const hawk40 = new Weapon("Hawk .40", "Ranged", 15);
	hawk40.damage = (min, max) => {
		return Math.floor((Math.random() * (7 - 4) + 4));
	}

const falcon1837 = new Weapon("Falcon 1837", "Ranged", 45);
	falcon1837.damage = (min, max) => {
		return Math.floor((Math.random() * (17 - 4)) + 4);
	};	


// FACTION UNITS //
// UNDEAD UNITS //
// UNDEAD HERO //

// UNDEAD AUXILLARY //
// UNDEAD PRIMARY //

// AUSONIA UNITS //
// AUSONIA HERO //

// AUSONIA AUXILLARY //
// AUSONIA PRIMARY //


// FALKENRATH UNITS //
// FALKENRATH HERO //
const falkenrathHero = new Falkenrath("Darian Falkenrath", "Male", "Unknown", "Falkenrath", "Vampire", 32, 26, 21, 46, 14, 60, vorpalSword, "", "", 2, 0);

// FALKENRATH AUXILLARY //
// Falkenrath Enforcer
const falkenrathEnforcer = new Falkenrath("Falkenrath Enforcer", "Male", 42, "Falkenrath", "Human", 24, 20, 14, 26, 12, 30, vorpalSword, "", "", 2, 75)

// Falkenrath Undertaker
const falkenrathUndertaker = new Falkenrath("Falkenrath Undertaker", "Unknown", "Unknown", "Falkenrath", "Unknown", 12, 12, 16, 12, 20, 30, vorpalSword, "", "", 2, 75);

// FALKENRATH PRIMARY //
// Falkenrath Marksman
const falkenrathMarksman = new Falkenrath("Falkenrath Marksman", "Female", 30, "Falkenrath", "Human", 22, 12, 16, 20, 8, 30, falcon1837, "", 30, 50)

// Falkenrath Bailiff
const falkenrathBailiff = new Falkenrath("Falkenrath Bailiff", "Male", 37, "Falkenrath", "Human", 24, 14, 20, 16, 8, 30, vorpalSword, "", "", 2, 50);

// Falkenrath Hound
const falkenrathHound = new BasicUnit("FalkenrathHound", "Male/Female", "Unknown", "Falkenrath", "Hound", 16, 6, 12, 10, 2, 40, bite, "", "", 2, 25);


// WEREWOLF UNITS //
// WEREWOLF HERO //
const werewolfHero = new Werewolf("Gideon Schrader", "Male", 54, "Werewolf", "Human", 60, 18, 46, 16, 12, 30, brassKnuckles, "", "", 2, 0);

// WEREWOLF AUXILLARY //
// Kruin Outlaw/Terror of Kruin's Pass
const kruinOutlaw = new Werewolf("Kruin Outlaw", "Female", 18, "Werewolf", "Human", 18, 21, 15, 24, 13, 30, vorpalSword, "", "", 2, 75)

// Ulvenwald Mystic/Ulvenwald Primordial
const ulvenwaldMystic = new Werewolf("Ulvenwald Mystic", "Female", 60, "Werewolf", "Human", 20, 13, 16, 10, 18, 30, brassKnuckles, "", "", 2, 75);

// WEREWOLF PRIMARY //
// Highland Trapper/Gametrail Ravager
const hihglandTrapper = new Werewolf("Highland Trapper", "Male", 27, "Werewolf", "Human", 23, 13, 18, 16, 12, 30, falcon1837, "", 20, 50 )

// Village Pariah/Relentless Predator
const villagePariah = new Werewolf("Village Pariah", "Male", 26, "Werewolf", "Human", 18, 12, 14, 12, 10, 30, brassKnuckles, "", "", 2, 50);

// Estwald Greatwolf
const estwaldGreatwolf = new BasicUnit("Estwald Greatwolf", "Male/Female", "Unknown", "Werewolf", "Wolf", 14, 8, 10, 10, 2, 40, bite, "", "", 2, 25)


// DEMONS //
























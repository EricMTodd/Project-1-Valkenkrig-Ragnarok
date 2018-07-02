console.log("JavaScript is running...");


// DEVELOPER NOTES //
// Create team selection functions with a unit budget of 300 points. See notebook for budget and population balancing.
// Create combat functions and user interface such as rangefinding and targeting, which will be a function of the unit itself and not the game object. This includes a turn counter that tracks each player's move and adds six seconds to a metaphorical stopwatch.
// Create remaining factions and units.
// Add art and styling to game.
// Crit hit and miss.


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
	constructor(faction, actionPoints, unitBudget) {
		this.faction = faction;
		this.actionPoints = actionPoints;
		this.unitBudget = 300;
		this.chosenUnits = [];
	}
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


// GLOBAL VARIABLES //


// OBJECTS //
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


// PLAYERS //


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
const falkenrathHero = new Falkenrath("Darian Falkenrath", "Male", "Unknown", "Falkenrath", "Vampire", 32, 26, 21, 46, 14, 60, vorpalSword, "", "", 0);

// FALKENRATH AUXILLARY //
// Falkenrath Enforcer
const falkenrathEnforcer = new Falkenrath("Falkenrath Enforcer", "Male", 42, "Falkenrath", "Human", 24, 20, 14, 26, 12, 30, vorpalSword, "", "", 75)

// Falkenrath Undertaker
const falkenrathUndertaker = new Falkenrath("Falkenrath Undertaker", "Unknown", "Unknown", "Falkenrath", "Unknown", 12, 12, 16, 12, 20, 30, vorpalSword, "", "", 75);

// FALKENRATH PRIMARY //
// Falkenrath Marksman
const falkenrathMarksman = new Falkenrath("Falkenrath Marksman", "Female", 30, "Falkenrath", "Human", 22, 12, 16, 20, 8, 30, falcon1837, "", "", 50);

// Falkenrath Bailiff
const falkenrathBailiff = new Falkenrath("Falkenrath Bailiff", "Male", 37, "Falkenrath", "Human", 24, 14, 20, 16, 8, 30, vorpalSword, "", "", 50);

// Falkenrath Hound
const falkenrathHound = new BasicUnit("Falkenrath Hound", "Male/Female", "Unknown", "Falkenrath", "Hound", 16, 6, 12, 10, 2, 40, bite, "", "", 25);


// WEREWOLF UNITS //
// WEREWOLF HERO //
const werewolfHero = new Werewolf("Gideon Schrader", "Male", 54, "Werewolf", "Human", 60, 18, 46, 16, 12, 30, brassKnuckles, "", "", 0);

// WEREWOLF AUXILLARY //
// Kruin Outlaw/Terror of Kruin's Pass
const kruinOutlaw = new Werewolf("Kruin Outlaw", "Female", 18, "Werewolf", "Human", 18, 21, 15, 24, 13, 30, vorpalSword, "", "", 75)

// Ulvenwald Mystic/Ulvenwald Primordial
const ulvenwaldMystic = new Werewolf("Ulvenwald Mystic", "Female", 60, "Werewolf", "Human", 20, 13, 16, 10, 18, 30, brassKnuckles, "", "", 75);

// WEREWOLF PRIMARY //
// Highland Trapper/Gametrail Ravager
const hihglandTrapper = new Werewolf("Highland Trapper", "Male", 27, "Werewolf", "Human", 23, 13, 18, 16, 12, 30, falcon1837, "", 20, 50);

// Village Pariah/Relentless Predator
const villagePariah = new Werewolf("Village Pariah", "Male", 26, "Werewolf", "Human", 18, 12, 14, 12, 10, 30, brassKnuckles, "", "", 50);

// Estwald Greatwolf
const estwaldGreatwolf = new BasicUnit("Estwald Greatwolf", "Male/Female", "Unknown", "Werewolf", "Wolf", 14, 8, 10, 10, 2, 40, bite, "", "", 25)


// DEMONS //


// GAMEPLAY //
// PHASE ONE: TEAM CONSTRUCTION //
const renderUnitList = () => {
	$("#purchased-units").empty();
	for (let i = 0; i < player1.chosenUnits.length; i++) {
		$("#purchased-units").append(`<li>${player1.chosenUnits[i].name}</li>`);
	}
};


const player1 = new Player("Falkenrath", 2, 300);
console.log(player1);

const player2 = new Player("Werewolves", 2, 300);
console.log(player2);

	// Function that displays availale units for a specific faction and allows the player to buy them the appropriate cost.
	// FALKENRATH FACTION CARDS //
const createFaction1 = (e) => {
	// When the function is called, the hero for the corresponding faction is pushed into the player's chosen units array.
	player1.chosenUnits.push(falkenrathHero);

	// This displays the current list of units that the player has bought, as well as their remaining budget.
	$(".team-constructor").append(`<div id="unit-budget">Reamining Unit Budget: ${player1.unitBudget}</div>`);
	$(".team-constructor").append(`<div>Currently purchased units:</div><br>`);
	$(".team-constructor").append(`<div id="purchased-units"><li>${player1.chosenUnits[0].name}</li></div>`);

		
	// This is a button that will clear the built unit list and completely clear it while refunding all budget points.
const refundUnits = () => {
	$("#unit-budget").append(`<button id="refund-units">Refund Units</button>`);
	$("#refund-units").on("click", () => {
		player1.chosenUnits = [];
		player1.unitBudget = 300;
		$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
		player1.chosenUnits.push(falkenrathHero);
		renderUnitList();
		refundUnits();
	});
};

refundUnits();


	// The following are a set of "cards" that display each unit's informatin and a button allowing their purchase.
	// FALKENRATH ENFORCER CARD //
	$(".team-constructor").append(`<br><p>Choose your units:</p>`)
	$(".team-constructor").append(`<div id="enforcer"><button id="enforcer">${falkenrathEnforcer.name}</button></div>`);
	$("#enforcer").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		} else {
			player1.chosenUnits.push(falkenrathEnforcer);
			player1.unitBudget -= falkenrathEnforcer.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		}
	});

	// Budget Cost
	$("#enforcer").append(`<br><br><li>Budget Cost: ${falkenrathEnforcer.budgetCost}</li>`);

	// Description
	$("#enforcer").append(`<p>The ${falkenrathEnforcer.name} acts as the syndicate's loan shark, seeking out unpaid dues and putting hits on those who disobey Falkenrath law.</p>`);

	// Stats
	$("#enforcer").append(`<p>Unit Stats:</p>`);
	$("#enforcer").append(`<li>Hit Points: ${falkenrathEnforcer.hp}</li>`);
	$("#enforcer").append(`<li>Armor Class: ${falkenrathEnforcer.ac}</li>`);
	$("#enforcer").append(`<li>Strength: ${falkenrathEnforcer.str}</li>`);
	$("#enforcer").append(`<li>Dexterity: ${falkenrathEnforcer.dex}</li>`);
	$("#enforcer").append(`<li>Intelligence: ${falkenrathEnforcer.int}</li>`);
	$("#enforcer").append(`<li>Speed: ${falkenrathEnforcer.speed}</li>`);

	// Inventory
	$("#enforcer").append(`<p>Inventory:</p>`);
	$("#enforcer").append(`<li>Primary Weapon: ${falkenrathEnforcer.weapon1.name}</li><br>`);


	// FALKENRATH UNDERTAKER CARD //
	$(".team-constructor").append(`<br><div id="undertaker"><button id="undertaker">${falkenrathUndertaker.name}</button></div>`);
	$("#undertaker").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		} else {
			player1.chosenUnits.push(falkenrathUndertaker);
			player1.unitBudget -= falkenrathUndertaker.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		}
	});

	// Budget Cost
	$("#undertaker").append(`<br><br><li>Budget Cost: ${falkenrathUndertaker.budgetCost}</li>`);

	// Description
	$("#undertaker").append(`<p>The ${falkenrathUndertaker.name} are mysterious entities working for the Falkenrath. No one knows where they come from, or what they look like under their disturbing masks.</p>`);

	// Stats
	$("#undertaker").append(`<p>Unit Stats:</p>`);
	$("#undertaker").append(`<li>Hit Points: ${falkenrathUndertaker.hp}</li>`);
	$("#undertaker").append(`<li>Armor Class: ${falkenrathUndertaker.ac}</li>`);
	$("#undertaker").append(`<li>Strength: ${falkenrathUndertaker.str}</li>`);
	$("#undertaker").append(`<li>Dexterity: ${falkenrathUndertaker.dex}</li>`);
	$("#undertaker").append(`<li>Intelligence: ${falkenrathUndertaker.int}</li>`);
	$("#undertaker").append(`<li>Speed: ${falkenrathUndertaker.speed}</li>`);

	// Inventory
	$("#undertaker").append(`<p>Inventory:</p>`);
	$("#undertaker").append(`<li>Primary Weapon: ${falkenrathUndertaker.weapon1.name}</li>`);


	// FALKENRATH MARKSMAN CARD //
	$(".team-constructor").append(`<br><div id="marksman"><button id="marksman">${falkenrathMarksman.name}</button></div>`);
	$("#marksman").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		} else {
			player1.chosenUnits.push(falkenrathMarksman);
			player1.unitBudget -= falkenrathMarksman.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		}
	});

	// Budget Cost
	$("#marksman").append(`<br><br><li>Budget Cost: ${falkenrathMarksman.budgetCost}</li>`);

	// Description
	$("#marksman").append(`<p>The ${falkenrathMarksman.name} is a role specifically reserved for female members of the Falkenrath Police. Their slight bodies allow them greater maneuverability, making excellent long range assailants.</p>`);

	// Stats
	$("#marksman").append(`<p>Unit Stats:</p>`);
	$("#marksman").append(`<li>Hit Points: ${falkenrathMarksman.hp}</li>`);
	$("#marksman").append(`<li>Armor Class: ${falkenrathMarksman.ac}</li>`);
	$("#marksman").append(`<li>Strength: ${falkenrathMarksman.str}</li>`);
	$("#marksman").append(`<li>Dexterity: ${falkenrathMarksman.dex}</li>`);
	$("#marksman").append(`<li>Intelligence: ${falkenrathMarksman.int}</li>`);
	$("#marksman").append(`<li>Speed: ${falkenrathMarksman.speed}</li>`);

	// Inventory
	$("#marksman").append(`<p>Inventory:</p>`);
	$("#marksman").append(`<li>Primary Weapon: ${falkenrathMarksman.weapon1.name}</li><br>`);


	// FALKENRATH BAILIFF CARD //
	$(".team-constructor").append(`<br><div id="bailiff"><button id="bailiff">${falkenrathBailiff.name}</button></div>`);
		$("#bailiff").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		} else {
			player1.chosenUnits.push(falkenrathBailiff);
			player1.unitBudget -= falkenrathBailiff.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		}
	});

	// Budget Cost
	$("#bailiff").append(`<br><br><li>Budget Cost: ${falkenrathBailiff.budgetCost}</li>`);

	// Description
	$("#bailiff").append(`<p>The ${falkenrathBailiff.name}. These are the bulk of the Falkenrath Police. They are the iconic stone cold faces that instill fear and submissiveness into the subjects of the Falkenrath Syndicate.</p>`);

	// Stats
	$("#bailiff").append(`<p>Unit Stats:</p>`);
	$("#bailiff").append(`<li>Hit Points: ${falkenrathBailiff.hp}</li>`);
	$("#bailiff").append(`<li>Armor Class: ${falkenrathBailiff.ac}</li>`);
	$("#bailiff").append(`<li>Strength: ${falkenrathBailiff.str}</li>`);
	$("#bailiff").append(`<li>Dexterity: ${falkenrathBailiff.dex}</li>`);
	$("#bailiff").append(`<li>Intelligence: ${falkenrathBailiff.int}</li>`);
	$("#bailiff").append(`<li>Speed: ${falkenrathBailiff.speed}</li>`);

	// Inventory
	$("#bailiff").append(`<p>Inventory:</p>`);
	$("#bailiff").append(`<li>Primary Weapon: ${falkenrathBailiff.weapon1.name}</li><br>`);


	// FALKENRATH HOUND CARD //
	$(".team-constructor").append(`<br><div id="hound"><button id="hound">${falkenrathHound.name}</button></div>`);
			$("#hound").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		} else {
			player1.chosenUnits.push(falkenrathHound);
			player1.unitBudget -= falkenrathHound.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
		}
	});

	// Budget Cost
	$("#hound").append(`<br><br><li>Budget Cost: ${falkenrathHound.budgetCost}</li>`);

	// Description
	$("#hound").append(`<p>The ${falkenrathHound.name}s are Gentled German Shepherds. Already being dogs bred for police work, these beasts are truly terrifying to be on the receiving end of their aggression.</p>`);

	// Stats
	$("#hound").append(`<p>Unit Stats:</p>`);
	$("#hound").append(`<li>Hit Points: ${falkenrathHound.hp}</li>`);
	$("#hound").append(`<li>Armor Class: ${falkenrathHound.ac}</li>`);
	$("#hound").append(`<li>Strength: ${falkenrathHound.str}</li>`);
	$("#hound").append(`<li>Dexterity: ${falkenrathHound.dex}</li>`);
	$("#hound").append(`<li>Intelligence: ${falkenrathHound.int}</li>`);
	$("#hound").append(`<li>Speed: ${falkenrathHound.speed}</li>`);

	// Inventory
	$("#hound").append(`<p>Inventory:</p>`);
	$("#hound").append(`<li>Primary Weapon: ${falkenrathHound.weapon1.name}</li><br>`);

};

createFaction1();


// WEREWOLF FACTION CARDS //
const createFaction2 = (e) => {
	player2.chosenUnits.push(werewolfHero);
	$(".team-constructor").append(`<div><button>${kruinOutlaw.name}</button><div>`);
	$(".team-constructor").append(`<div><button>${ulvenwaldMystic.name}</button><div>`);
	$(".team-constructor").append(`<div><button>${hihglandTrapper.name}</button><div>`);
	$(".team-constructor").append(`<div><button>${villagePariah.name}</button><div>`);
	$(".team-constructor").append(`<div><button>${estwaldGreatwolf.name}</button><div>`);
};
























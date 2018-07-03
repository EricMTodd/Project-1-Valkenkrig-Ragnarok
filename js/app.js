console.log("JavaScript is running...");


// DEVELOPER NOTES //
// Create a game object that contains the gameboard, pseudo-clock, and turn tracker.
// Create a function that spawns units from the corner out.
// Create remaining factions and units.
// Add art and styling to game.
// Add factions units into an array, then create a loop to print stats on unit cards.
// Crit hit and miss.


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
		super(name, gender, age, faction, race, hp, ac, str, dex, int, speed, weapon1, weapon2, utility, budgetCost);
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
const falkenrathEnforcer = new Falkenrath("Falkenrath Enforcer", "Male", 42, "Falkenrath", "Human", 24, 20, 14, 26, 12, 30, vorpalSword, "", "", 75);

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
const kruinOutlaw = new Werewolf("Kruin Outlaw", "Female", 18, "Werewolf", "Human", 18, 21, 15, 24, 13, 30, vorpalSword, "", "", 75);

// Ulvenwald Ranger/Ulvenwald Primordial
const ulvenwaldRanger = new Werewolf("Ulvenwald Ranger", "Female", 60, "Werewolf", "Human", 20, 13, 16, 10, 18, 30, brassKnuckles, "", "", 75);

// WEREWOLF PRIMARY //
// Highland Trapper/Gametrail Ravager
const highlandTrapper = new Werewolf("Highland Trapper", "Male", 27, "Werewolf", "Human", 23, 13, 18, 16, 12, 30, falcon1837, "", 20, 50);

// Village Pariah/Relentless Predator
const villagePariah = new Werewolf("Village Pariah", "Male", 26, "Werewolf", "Human", 18, 12, 14, 12, 10, 30, brassKnuckles, "", "", 50);

// Estwald Greatwolf
const estwaldGreatwolf = new BasicUnit("Estwald Greatwolf", "Male/Female", "Unknown", "Werewolf", "Wolf", 14, 8, 10, 10, 2, 40, bite, "", "", 25)


// DEMONS //


// GAMEPLAY //
// PHASE ONE: TEAM CONSTRUCTION //
const player1 = new Player("Falkenrath", 2, 300);

const player2 = new Player("Werewolves", 2, 300);


	// Function that displays availale units for a specific faction and allows the player to buy them the appropriate cost.
	// FALKENRATH FACTION CARDS //
const createFaction1 = (e) => {
	const renderUnitList = () => {
	$("#purchased-units").empty();
	for (let i = 0; i < player1.chosenUnits.length; i++) {
		$("#purchased-units").append(`<li>${player1.chosenUnits[i].name}</li>`);
	}
};
	// When the function is called, the hero for the corresponding faction is pushed into the player's chosen units array.
	player1.chosenUnits.push(falkenrathHero);

	// This displays the current list of units that the player has bought, as well as their remaining budget.
	$("body").append(`<div class="team-constructor"></div>`);
	$(".team-constructor").append(`<div id="unit-budget">Reamining Unit Budget: ${player1.unitBudget}</div>`);
	$(".team-constructor").append(`<div>Falkenrath Units Purchased:</div><br>`);
	$(".team-constructor").append(`<div id="purchased-units"><li>${player1.chosenUnits[0].name}</li></div>`);
	$(".team-constructor").append(`<br><p>Choose your units:</p><br>`);

		
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
		commitUnits();
	});
};

refundUnits();


// This function will accept the current unit selection and change the screen to the next faction's purchase opportunities.
const commitUnits = () => {
	$("#unit-budget").append(`<button id="commit-units">Commit Units</button>`);
	$("#commit-units").on("click", () => {
		$(".team-constructor").remove();
		createFaction2();
	});
};

commitUnits();


	// The following are a set of "cards" that display each unit's informatin and a button allowing their purchase.
	// FALKENRATH ENFORCER CARD //
	$(".team-constructor").append(`<div id="enforcer"><h3>${falkenrathEnforcer.name}</h3></div>`);
	$("#enforcer").append(`<img src="images/unitTokens/Falkenrath Enforcer.png">`);

	$("#enforcer").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player1.chosenUnits.push(falkenrathEnforcer);
			player1.unitBudget -= falkenrathEnforcer.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#enforcer").append(`<li>Budget Cost: ${falkenrathEnforcer.budgetCost}</li>`);

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
	$(".team-constructor").append(`<br><div id="undertaker"><h3>${falkenrathUndertaker.name}</h3></div>`);
	$("#undertaker").append(`<img src="images/unitTokens/Falkenrath Undertaker.png">`);
	$("#undertaker").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player1.chosenUnits.push(falkenrathUndertaker);
			player1.unitBudget -= falkenrathUndertaker.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#undertaker").append(`<li>Budget Cost: ${falkenrathUndertaker.budgetCost}</li>`);

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
	$("#undertaker").append(`<li>Primary Weapon: ${falkenrathUndertaker.weapon1.name}</li><br>`);


	// FALKENRATH MARKSMAN CARD //
	$(".team-constructor").append(`<br><div id="marksman"><h3>${falkenrathMarksman.name}</h3></div>`);
	$("#marksman").append(`<img src="images/unitTokens/Falkenrath Marksman.png">`);
	$("#marksman").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player1.chosenUnits.push(falkenrathMarksman);
			player1.unitBudget -= falkenrathMarksman.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#marksman").append(`<li>Budget Cost: ${falkenrathMarksman.budgetCost}</li>`);

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
	$(".team-constructor").append(`<br><div id="bailiff"><h3>${falkenrathBailiff.name}</h3></div>`);
	$("#bailiff").append(`<img src="images/unitTokens/Falkenrath Bailiff.png">`);
		$("#bailiff").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player1.chosenUnits.push(falkenrathBailiff);
			player1.unitBudget -= falkenrathBailiff.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#bailiff").append(`<li>Budget Cost: ${falkenrathBailiff.budgetCost}</li>`);

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
	$(".team-constructor").append(`<br><div id="hound"><h3>${falkenrathHound.name}<h3></div>`);
	$("#hound").append(`<img src="images/unitTokens/Falkenrath Hound.png">`);
			$("#hound").on("click", () => {
		if (player1.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player1.chosenUnits.push(falkenrathHound);
			player1.unitBudget -= falkenrathHound.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#hound").append(`<li>Budget Cost: ${falkenrathHound.budgetCost}</li>`);

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
	const renderUnitList = () => {
	$("#purchased-units").empty();
	for (let i = 0; i < player2.chosenUnits.length; i++) {
		$("#purchased-units").append(`<li>${player2.chosenUnits[i].name}</li>`);
	}
};
		// When the function is called, the hero for the corresponding faction is pushed into the player's chosen units array.
	player2.chosenUnits.push(werewolfHero);

	// This displays the current list of units that the player has bought, as well as their remaining budget.
	$("body").append(`<div class="team-constructor"></div>`);
	$(".team-constructor").append(`<div id="unit-budget">Reamining Unit Budget: ${player2.unitBudget}</div>`);
	$(".team-constructor").append(`<div>Werewolf Units Purchased:</div><br>`);
	$(".team-constructor").append(`<div id="purchased-units"><li>${player2.chosenUnits[0].name}</li></div>`);
	$(".team-constructor").append(`<br><p>Choose your units:</p><br>`);

		
	// This is a button that will clear the built unit list and completely clear it while refunding all budget points.
const refundUnits = () => {
	$("#unit-budget").append(`<button id="refund-units">Refund Units</button>`);
	$("#refund-units").on("click", () => {
		player2.chosenUnits = [];
		player2.unitBudget = 300;
		$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
		player2.chosenUnits.push(werewolfHero);
		renderUnitList();
		refundUnits();
		commitUnits();
	});
};

refundUnits();


// This function will accept the current unit selection and change the screen to the next faction's purchase opportunities.
const commitUnits = () => {
	$("#unit-budget").append(`<button id="commit-units">Commit Units</button>`);
	$("#commit-units").on("click", () => {
		$(".team-constructor").remove();
		initializeCombat();
	});
};

commitUnits();

	
	// WEREWOLF FACTION CARDS //
	// KRUIN OUTLAW CARD //
	$(".team-constructor").append(`<div id="kruinOutlaw"><h3>${kruinOutlaw.name}</h3><div>`);
	$("#kruinOutlaw").append(`<img src="images/unitTokens/WerewolfF3.png">`);
		$("#kruinOutlaw").on("click", () => {
		if (player2.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player2.chosenUnits.push(kruinOutlaw);
			player2.unitBudget -= kruinOutlaw.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#kruinOutlaw").append(`<li>Budget Cost: ${kruinOutlaw.budgetCost}</li>`);

	// Description
	$("#kruinOutlaw").append(`<p>The ${kruinOutlaw.name} haunts Kruin's pass -- the only way into The Ulvenwald from The Estwald. Survivors call her the siren of the Highlands.</p>`);

	// Stats
	$("#kruinOutlaw").append(`<p>Unit Stats:</p>`);
	$("#kruinOutlaw").append(`<li>Hit Points: ${kruinOutlaw.hp}</li>`);
	$("#kruinOutlaw").append(`<li>Armor Class: ${kruinOutlaw.ac}</li>`);
	$("#kruinOutlaw").append(`<li>Strength: ${kruinOutlaw.str}</li>`);
	$("#kruinOutlaw").append(`<li>Dexterity: ${kruinOutlaw.dex}</li>`);
	$("#kruinOutlaw").append(`<li>Intelligence: ${kruinOutlaw.int}</li>`);
	$("#kruinOutlaw").append(`<li>Speed: ${kruinOutlaw.speed}</li>`);

	// Inventory
	$("#kruinOutlaw").append(`<p>Inventory:</p>`);
	$("#kruinOutlaw").append(`<li>Primary Weapon: ${kruinOutlaw.weapon1.name}</li><br>`);


	// ULVENWALD RANGER CARD //
	$(".team-constructor").append(`<div id="ulvenwaldRanger"><h3>${ulvenwaldRanger.name}</h3><div>`);
	$("#ulvenwaldRanger").append(`<img src="images/unitTokens/WerewolfF2.png">`);
			$("#ulvenwaldRanger").on("click", () => {
		if (player2.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player2.chosenUnits.push(ulvenwaldRanger);
			player2.unitBudget -= ulvenwaldRanger.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#ulvenwaldRanger").append(`<li>Budget Cost: ${ulvenwaldRanger.budgetCost}</li>`);

	// Description
	$("#ulvenwaldRanger").append(`<p>The ${ulvenwaldRanger.name} haunts Kruin's pass -- the only way into The Ulvenwald from The Estwald. Survivors call her the siren of the Highlands.</p>`);

	// Stats
	$("#ulvenwaldRanger").append(`<p>Unit Stats:</p>`);
	$("#ulvenwaldRanger").append(`<li>Hit Points: ${ulvenwaldRanger.hp}</li>`);
	$("#ulvenwaldRanger").append(`<li>Armor Class: ${ulvenwaldRanger.ac}</li>`);
	$("#ulvenwaldRanger").append(`<li>Strength: ${ulvenwaldRanger.str}</li>`);
	$("#ulvenwaldRanger").append(`<li>Dexterity: ${ulvenwaldRanger.dex}</li>`);
	$("#ulvenwaldRanger").append(`<li>Intelligence: ${ulvenwaldRanger.int}</li>`);
	$("#ulvenwaldRanger").append(`<li>Speed: ${ulvenwaldRanger.speed}</li>`);

	// Inventory
	$("#ulvenwaldRanger").append(`<p>Inventory:</p>`);
	$("#ulvenwaldRanger").append(`<li>Primary Weapon: ${ulvenwaldRanger.weapon1.name}</li><br>`);


	// HIGHLAND TRAPPER CARD //
	$(".team-constructor").append(`<div id="highlandTrapper"><h3>${highlandTrapper.name}</h3><div>`);
	$("#highlandTrapper").append(`<img src="images/unitTokens/WerewolfM8.png">`);
			$("#highlandTrapper").on("click", () => {
		if (player2.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player2.chosenUnits.push(highlandTrapper);
			player2.unitBudget -= highlandTrapper.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#highlandTrapper").append(`<li>Budget Cost: ${highlandTrapper.budgetCost}</li>`);

	// Description
	$("#highlandTrapper").append(`<p>The ${highlandTrapper.name} haunts Kruin's pass -- the only way into The Ulvenwald from The Estwald. Survivors call her the siren of the Highlands.</p>`);

	// Stats
	$("#highlandTrapper").append(`<p>Unit Stats:</p>`);
	$("#highlandTrapper").append(`<li>Hit Points: ${highlandTrapper.hp}</li>`);
	$("#highlandTrapper").append(`<li>Armor Class: ${highlandTrapper.ac}</li>`);
	$("#highlandTrapper").append(`<li>Strength: ${highlandTrapper.str}</li>`);
	$("#highlandTrapper").append(`<li>Dexterity: ${highlandTrapper.dex}</li>`);
	$("#highlandTrapper").append(`<li>Intelligence: ${highlandTrapper.int}</li>`);
	$("#highlandTrapper").append(`<li>Speed: ${highlandTrapper.speed}</li>`);

	// Inventory
	$("#highlandTrapper").append(`<p>Inventory:</p>`);
	$("#highlandTrapper").append(`<li>Primary Weapon: ${highlandTrapper.weapon1.name}</li><br>`);


	// VILLAGE PARIAH CARD //
	$(".team-constructor").append(`<div id="villagePariah"><h3>${villagePariah.name}</h3><div>`);
	$("#villagePariah").append(`<img src="images/unitTokens/WerewolfM3.png">`);
			$("#villagePariah").on("click", () => {
		if (player2.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player2.chosenUnits.push(villagePariah);
			player2.unitBudget -= villagePariah.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#villagePariah").append(`<li>Budget Cost: ${villagePariah.budgetCost}</li>`);

	// Description
	$("#villagePariah").append(`<p>The ${villagePariah.name} haunts Kruin's pass -- the only way into The Ulvenwald from The Estwald. Survivors call her the siren of the Highlands.</p>`);

	// Stats
	$("#villagePariah").append(`<p>Unit Stats:</p>`);
	$("#villagePariah").append(`<li>Hit Points: ${villagePariah.hp}</li>`);
	$("#villagePariah").append(`<li>Armor Class: ${villagePariah.ac}</li>`);
	$("#villagePariah").append(`<li>Strength: ${villagePariah.str}</li>`);
	$("#villagePariah").append(`<li>Dexterity: ${villagePariah.dex}</li>`);
	$("#villagePariah").append(`<li>Intelligence: ${villagePariah.int}</li>`);
	$("#villagePariah").append(`<li>Speed: ${villagePariah.speed}</li>`);

	// Inventory
	$("#villagePariah").append(`<p>Inventory:</p>`);
	$("#villagePariah").append(`<li>Primary Weapon: ${villagePariah.weapon1.name}</li><br>`);


	// ESTWALD GREATWOLF CARD //
	$(".team-constructor").append(`<div id="estwaldGreatwolf"><h3>${estwaldGreatwolf.name}<h3><div>`);
	$("#estwaldGreatwolf").append(`<img src="images/unitTokens/Wolf1.png">`);
			$("#estwaldGreatwolf").on("click", () => {
		if (player2.unitBudget === 0) {
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		} else {
			player2.chosenUnits.push(estwaldGreatwolf);
			player2.unitBudget -= estwaldGreatwolf.budgetCost;
			$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
			renderUnitList();
			refundUnits();
			commitUnits();
		}
	});

	// Budget Cost
	$("#estwaldGreatwolf").append(`<li>Budget Cost: ${estwaldGreatwolf.budgetCost}</li>`);

	// Description
	$("#estwaldGreatwolf").append(`<p>The ${estwaldGreatwolf.name} haunts Kruin's pass -- the only way into The Ulvenwald from The Estwald. Survivors call her the siren of the Highlands.</p>`);

	// Stats
	$("#estwaldGreatwolf").append(`<p>Unit Stats:</p>`);
	$("#estwaldGreatwolf").append(`<li>Hit Points: ${estwaldGreatwolf.hp}</li>`);
	$("#estwaldGreatwolf").append(`<li>Armor Class: ${estwaldGreatwolf.ac}</li>`);
	$("#estwaldGreatwolf").append(`<li>Strength: ${estwaldGreatwolf.str}</li>`);
	$("#estwaldGreatwolf").append(`<li>Dexterity: ${estwaldGreatwolf.dex}</li>`);
	$("#estwaldGreatwolf").append(`<li>Intelligence: ${estwaldGreatwolf.int}</li>`);
	$("#estwaldGreatwolf").append(`<li>Speed: ${estwaldGreatwolf.speed}</li>`);

	// Inventory
	$("#estwaldGreatwolf").append(`<p>Inventory:</p>`);
	$("#estwaldGreatwolf").append(`<li>Primary Weapon: ${estwaldGreatwolf.weapon1.name}</li><br>`);
};


// PHASE TWO: COMBAT //
// This is a function that will append all necessary gampelay interaction elements to the document.
const initializeCombat = () => {
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
};































































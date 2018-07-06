console.log("JavaScript is running...");


// DEVELOPER NOTES //
// Create a game object that contains the gameboard, pseudo-clock, and turn tracker.
// Create remaining factions and units.
// Add art and styling to game.
// Add factions units into an array, then create a loop to print stats on unit cards.
// Crit hit and miss.

	const roll20 = (min, max) => {
		return Math.floor((Math.random() * (20 - 1) + 1))	
};

// CLASSES //
// Player class.
class Player {
	constructor(faction, actionPoints, unitBudget) {
		this.faction = faction;
		this.actionPoints = actionPoints;
		this.unitBudget = 150;
		this.chosenUnits = [];
	}
};

// Basic unit class.
class BasicUnit {
	constructor(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork) {
		this.id = id;
		this.name = name;
		this.gender = gender;
		this.faction = faction;
		this.race = race;
		this.hp = hp;
		this.ac = ac;
		this.str = str;
		this.dex = dex;
		this.int = int;
		this.speed = speed;
		this.defaultSpeed = defaultSpeed;
		this.weapon1 = weapon1;
		this.weapon2 = weapon2; 
		this.utility = utility;
		this.budgetCost = budgetCost;
		this.artwork = artwork;
	}
	resetSpeed() {
		this.speed = this.defaultSpeed;
		console.log(`${this.name} defaultSpeed is ${this.defaultSpeed}`);
		console.log(`${this.name} speed is now ${this.speed}`);
		return `${this.defaultSpeed}`
	}
	reduceActionPoint() {
		if (this.faction === "Falkenrath") {
			player1.actionPoints -= 1;
			this.actionCheck();
		} else if (this.faction === "Werewolf") {
			player2.actionPoints -= 1;
			this.actionCheck();
		} else {
			return "if check failed."
		}
	}
	actionCheck() {
		if (this.faction === "Falkenrath") {
			if (player1.actionPoints <= 0) {
				return console.log("No valid moves left.")
			} else {
				return console.log(`${player1.actionPoints}`);
			}
		} else if (this.faction === "Werewolf") {
			if (player2.actionPoints <= 0) {
				return console.log("No valid moves left.")
			} else {
				return console.log(`${player2.actionPoints}`);
			}
		}
	}
	placeUnit(x, y) {
		this.xCoordinate = x;
		this.yCoordinate = y;
	}
	render() {
		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).attr("id", `${this.id}`).css("background-image", `url(${this.artwork})`);
	}
	moveUp() {
		this.speed -= 5;
		let maxSpeed = this.speed/5;
		console.log(`${maxSpeed} moves left.`);
		if (this.speed <= 0) {
			 this.reduceActionPoint();
		} else {
			if (this.yCoordinate < 15) {
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).css("background-image", "").removeAttr("id", `${this.id}`);
				this.yCoordinate += 1;
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).attr("id", `${this.id}`);
			for (i = 0; i < game.activePlayer.chosenUnits.length; i++) {
			let unit = game.activePlayer.chosenUnits[i];
				unit.render();
			}
		}
	}
}
	moveRight() {
		this.speed -= 5;
		let maxSpeed = this.speed/5;
		console.log(`${maxSpeed} moves left.`);
		if (this.speed <= 0) {
			 this.reduceActionPoint();
		} else {
			if (this.xCoordinate < 15) {
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).css("background-image", "").removeAttr("id", `${this.id}`);
				this.xCoordinate += 1;
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).attr("id", `${this.id}`);
			for (i = 0; i < game.activePlayer.chosenUnits.length; i++) {
			let unit = game.activePlayer.chosenUnits[i];
				unit.render();
			}
		}
	}
}
	moveDown() {
		this.speed -= 5;
		let maxSpeed = this.speed/5;
		console.log(`${maxSpeed} moves left.`);
		if (this.speed <= 0) {
			 this.reduceActionPoint();
		} else {
			if (this.yCoordinate > 0) {
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).css("background-image", "").removeAttr("id");
				this.yCoordinate -= 1;
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).attr("id", `${this.id}`);
			for (i = 0; i < game.activePlayer.chosenUnits.length; i++) {
			let unit = game.activePlayer.chosenUnits[i];
				unit.render();
			}
		}
	}
}
	moveLeft() {
		this.speed -= 5;
		let maxSpeed = this.speed/5;
		console.log(`${maxSpeed} moves left.`);
		if (this.speed <= 0) {
			 this.reduceActionPoint();
		} else {
			if (this.xCoordinate > 0) {
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).css("background-image", "").removeAttr("id");
				this.xCoordinate -= 1;
				$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).attr("id", `${this.id}`);
			for (i = 0; i < game.activePlayer.chosenUnits.length; i++) {
			let unit = game.activePlayer.chosenUnits[i];
				unit.render();
			}
		}
	}
}	
	deterimineHit() {
		if (this.weapon1.type === "Melee") {
			if (roll20() + this.strMod() > game.targetedUnit.ac) {
				console.log("Hit!");
				game.targetedUnit.hp = this.weapon1.damage() + this.strMod() - game.targetedUnit.hp;
				return game.targetedUnit.deathState();
			} else {
				return "Miss!";
			}
		} else if (this.weapon1.type === "Ranged") {
			if (roll20() + this.dexMod() > game.targetedUnit.ac) {
				console.log("Hit!");
				game.targetedUnit.hp = this.weapon1.damage() + this.dexMod() - game.targetedUnit.hp;
				return game.targetedUnit.deathState();
			} else {
				return "Miss!";
			}
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
			$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).removeAttr("id").css("background-image", "none");
			return `${this.name} has died`;
		} else {
			return `${this.hp}`;
		}
	}
};

// Undead faction template.
class Undead extends BasicUnit {
	constructor(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork) {
		super(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork);
	}
	plagued() {

	}
};

// Ausonia faction template.
class Ausonia extends BasicUnit {
	constructor(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork) {
		super(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork);
	}
	holySymbol () {

	}
};

// Falkenrath faction template.
class Falkenrath extends BasicUnit {
	constructor(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork) {
		super(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork);
	}
};

// Werewolf faction template.
class Werewolf extends BasicUnit {
	constructor(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork, shapeShiftId) {
		super(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork);
		this.shapeShiftId = shapeShiftId;
	}
	// Werewolves can temporarily shift from human to beast form once per game, buffing strength and hp while nerfing the rest.
	shapeShift() {
		console.log(`${this.name} is shifting shape into ${this.shapeShiftId.name}!`);

		this.shapeShiftId.placeUnit(`${this.xCoordinate}`, `${this.yCoordinate}`);
		this.shapeShiftId.render();
		game.selectedUnit = this.shapeShiftId;
		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).click();
		return "Transformation Complete";
	}
	// Werewolves' health regenerates over time and can only be cancelled out by silvered weapons.
	regeneration() {
		// Health regenerates 10% of max hp every turn.
	}
};

// Demon faction template.
class Demon extends BasicUnit {
	constructor(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork) {
		super(id, name, gender, faction, race, hp, ac, str, dex, int, speed, defaultSpeed, weapon1, weapon2, utility, budgetCost, artwork);
	}
};


// WEAPONS CLASS //
class Weapon {
	constructor(id, name, type, range) {
		this.name = name;
		this.type = type;
		this.range = range;
	}
};


// OBJECTS //
// PLAYER OBJECTS //
const player1 = new Player("Falkenrath", 2);

const player2 = new Player("Werewolf", 2);

// GAME OBJECT //
const game = {	
	activePlayer: player1,
	inactivePlayer: player2,
	};

// WEAPONS OBJECTS //
// MELEE //
const brassKnuckles = new Weapon("brassKnuckles", "Brass Knuckles", "Melee", 5);
	brassKnuckles.damage = (min, max) => {
		return Math.floor((Math.random() * (5 - 2)) + 2)
	};

const bite = new Weapon("bite","Bite", "Melee", 5);
	bite.damage = (min, max) => {
		return Math.floor((Math.random() * (9 - 6)) + 6)
	};

const claws = new Weapon("claws", "Claws", "Melee", 5);
	claws.damage = (min, max) => {
		return Math.floor((Math.random() * (9 - 6)) + 6)
	};	

const vorpalSword = new Weapon("vorpalSword", "Vorpal Sword", "Melee",  5);
	vorpalSword.damage = (min, max) => {
		return Math.floor((Math.random() * (11 - 6)) + 6);
	};


// RANGED //
const hawk40 = new Weapon("hawk40", "Hawk .40", "Ranged", 15);
	hawk40.damage = (min, max) => {
		return Math.floor((Math.random() * (7 - 4) + 4));
	}

const falcon1837 = new Weapon("falcon1837", "Falcon 1837", "Ranged", 40);
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
const darianFalkenrath = new Falkenrath("darianFalkenrath", "Darian Falkenrath", "Male", "Falkenrath", "Vampire", 32, 26, 21, 46, 14, 60, 60, vorpalSword, "", "", 0, "images/unitTokens/Darian_Falkenrath.png");

// Falkenrath Enforcer
const falkenrathEnforcer = new Falkenrath("falkenrathEnforcer", "Falkenrath Enforcer", "Male", "Falkenrath", "Human", 24, 20, 14, 26, 12, 30, 30, vorpalSword, "", "", 75, "images/UnitTokens/Falkenrath_Enforcer.png");

// Falkenrath Undertaker
const falkenrathUndertaker = new Falkenrath("falkenrathUndertaker", "Falkenrath Undertaker", "Unknown", "Falkenrath", "Unknown", 12, 12, 16, 12, 20, 30, 30, vorpalSword, "", "", 75, "images/unitTokens/Falkenrath_Undertaker.png");

// Falkenrath Marksman
const falkenrathMarksman = new Falkenrath("falkenrathMarksman", "Falkenrath Marksman", "Female", "Falkenrath", "Human", 22, 12, 16, 20, 8, 30, 30, falcon1837, "", "", 50, "images/unitTokens/Falkenrath_Marksman.png");

// Falkenrath Bailiff
const falkenrathBailiff = new Falkenrath("falkenrathBailiff", "Falkenrath Bailiff", "Male", "Falkenrath", "Human", 24, 14, 20, 16, 8, 30, 30, vorpalSword, "", "", 50, "images/unitTokens/Falkenrath_Bailiff.png");

// Falkenrath Hound
const falkenrathHound = new BasicUnit("falkenrathHound", "Falkenrath Hound", "Male/Female", "Falkenrath", "Hound", 16, 6, 12, 10, 2, 40, 40, bite, "", "", 25, "images/unitTokens/Falkenrath_Hound.png");


// WEREWOLF UNITS //
// WEREWOLF HERO //
const gideonSchraderHowlpackAlpha = [
gideonSchrader = new Werewolf("gideonSchrader", "Gideon Schrader", "Male", "Werewolf", "Human", 60, 18, 23, 16, 12, 30, 30, brassKnuckles, "", "", 0, "images/unitTokens/Gideon_Schrader.png"),
howlpackAlpha = new Werewolf("howlpackAlpha", "Howlpack Alpha", "Male", "Werewolf", "Werewolf", 120, 12, 46, 12, 12, 60, 60, bite, claws, "", 0, "images/unitTokens/WerewolfB3.png"),
	howlpackAlpha.multiAttack = () => {
		console.log(howlpackAlpha.secondaryAttack());
		return howlpackAlpha.secondaryAttack();
	}];
	gideonSchrader.shapeShiftId = howlpackAlpha;
	howlpackAlpha.shapeShiftId = gideonSchrader;

// Kruin Outlaw/Terror of Kruin's Pass
const kruinOutlawTerrorOfKruinsPass = [
kruinOutlaw = new Werewolf("kruinOutlaw", "Kruin Outlaw", "Female", "Werewolf", "Human", 18, 21, 15, 24, 13, 30, 30, vorpalSword, "", "", 75, "images/unitTokens/WerewolfF3.png",),
terrorOfKruinsPass = new Werewolf("terrorOfKruinsPass", "Terror of Kruin's Pass", "Female", "Werewolf", "Werewolf", 36, 14, 30, 12, 13, 60, 60, bite, claws, "", 0, "images/unitTokens/WerewolfB9.png"),
	terrorOfKruinsPass.multiAttack = () => {
		console.log(terrorOfKruinsPass.secondaryAttack());
		return terrorOfKruinsPass.secondaryAttack();
	}];
	kruinOutlaw.shapeShiftId = terrorOfKruinsPass;
	terrorOfKruinsPass.shapeShiftId = kruinOutlaw;

const ulvenwaldRangerUlvenwaldPrimordial = [
ulvenwaldRanger = new Werewolf("ulvenwaldRanger", "Ulvenwald Ranger", "Female", "Werewolf", "Human", 20, 13, 16, 10, 18, 30, 30, brassKnuckles, "", "", 75, "images/unitTokens/WerewolfF2.png"),
ulvenwaldPrimordial = new Werewolf("ulvenwaldPrimordial", "Ulvenwald Primordial", "Female", "Werewolf", "Werewolf", 40, 10, 32, 10, 18, 60, 60, bite, claws, "", 0, "images/unitTokens/WerewolfB6.png"),
	ulvenwaldPrimordial.multiAttack = () => {
		console.log(ulvenwaldPrimordial.secondaryAttack());
		return ulvenwaldPrimordial.secondaryAttack();
	}];
	ulvenwaldRanger.shapeShiftId = ulvenwaldPrimordial;
	ulvenwaldPrimordial.shapeShiftId = ulvenwaldRanger;
	

// Highland Trapper/Gametrail Ravager
const highlandTrapperGametrailRavager = [
highlandTrapper = new Werewolf("highlandTrapper", "Highland Trapper", "Male", "Werewolf", "Human", 23, 13, 18, 16, 12, 30, 30, falcon1837, "", 20, 100, "images/unitTokens/WerewolfM8.png"),
gametrailRavager = new Werewolf("gametrailRavager", "Gametrail Ravager", "Male", "Werewolf", "Werewolf", 46, 13, 36, 14, 12, 60, 60, bite, claws, "", 0, "images/unitTokens/WerewolfB5.png"),
	gametrailRavager.multiAttack = () => {
		console.log(gametrailRavager.secondaryAttack());
		return gametrailRavager.secondaryAttack();
	}];
	highlandTrapper.shapeShiftId = gametrailRavager;
	gametrailRavager.shapeShiftId = highlandTrapper;

// Village Pariah/Relentless Predator
const villagePariahRelentlessPredator = [
villagePariah = new Werewolf("villagePariah", "Village Pariah", "Male", "Werewolf", "Human", 18, 12, 14, 12, 10, 30, 30, brassKnuckles, "", "", 50, "images/unitTokens/WerewolfM3.png"),
relentlessPredator = new Werewolf("relentlessPredator", "Relentless Predator", "Male", "Werewolf", "Werewolf", 36, 12, 28, 12, 10, 60, 60, bite, claws, "", 0, "images/unitTokens/WerewolfB8.png"),
	relentlessPredator.multiAttack = () => {
		console.log(relentlessPredator.secondaryAttack());
		return relentlessPredator.secondaryAttack();
	}];
	villagePariah.shapeShiftId = relentlessPredator;
	relentlessPredator.shapeShiftId = villagePariah;

// Estwald Greatwolf
const estwaldGreatwolf = new BasicUnit("estwaldGreatwolf", "Estwald Greatwolf", "Male/Female", "Werewolf", "Wolf", 14, 8, 10, 10, 2, 40, 40, bite, "", "", 25, "images/unitTokens/Wolf1.png");


// DEMONS //


// GAMEPLAY //
// PHASE ONE: TEAM CONSTRUCTION //

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
	player1.chosenUnits.push(darianFalkenrath);

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
		player1.unitBudget = 150;
		$("#unit-budget").text(`Reamining Unit Budget: ${player1.unitBudget}`);
		player1.chosenUnits.push(darianFalkenrath);
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
	$(".team-constructor").append(`<div id="falkenrathEnforcer"><h1>${falkenrathEnforcer.name}</h1></div>`);
	$("#falkenrathEnforcer").append(`<img src="${falkenrathEnforcer.artwork}">`);

	$("#falkenrathEnforcer").on("click", () => {
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
			$(`#falkenrathEnforcer`).remove();
		}
	});

	// Budget Cost
	$("#falkenrathEnforcer").append(`<li>Budget Cost: ${falkenrathEnforcer.budgetCost}</li>`);

	// Description
	$("#falkenrathEnforcer").append(`<p>The ${falkenrathEnforcer.name} acts as the syndicate's loan shark, seeking out unpaid dues and putting hits on those who disobey Falkenrath law.</p>`);

	// Stats
	$("#falkenrathEnforcer").append(`<p>Unit Stats:</p>`);
	$("#falkenrathEnforcer").append(`<li>Hit Points: ${falkenrathEnforcer.hp}</li>`);
	$("#falkenrathEnforcer").append(`<li>Armor Class: ${falkenrathEnforcer.ac}</li>`);
	$("#falkenrathEnforcer").append(`<li>Strength: ${falkenrathEnforcer.str}</li>`);
	$("#falkenrathEnforcer").append(`<li>Dexterity: ${falkenrathEnforcer.dex}</li>`);
	$("#falkenrathEnforcer").append(`<li>Intelligence: ${falkenrathEnforcer.int}</li>`);
	$("#falkenrathEnforcer").append(`<li>Speed: ${falkenrathEnforcer.speed}</li>`);

	// Inventory
	$("#falkenrathEnforcer").append(`<p>Inventory:</p>`);
	$("#falkenrathEnforcer").append(`<li>Primary Weapon: ${falkenrathEnforcer.weapon1.name}</li><br>`);


	// FALKENRATH UNDERTAKER CARD //
	$(".team-constructor").append(`<br><div id="falkenrathUndertaker"><h1>${falkenrathUndertaker.name}</h1></div>`);
	$("#falkenrathUndertaker").append(`<img src="${falkenrathUndertaker.artwork}">`);
	$("#falkenrathUndertaker").on("click", () => {
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
			$(`#falkenrathUndertaker`).remove();
		}
	});

	// Budget Cost
	$("#falkenrathUndertaker").append(`<li>Budget Cost: ${falkenrathUndertaker.budgetCost}</li>`);

	// Description
	$("#falkenrathUndertaker").append(`<p>The ${falkenrathUndertaker.name} are mysterious entities working for the Falkenrath. No one knows where they come from, or what they look like under their disturbing masks.</p>`);

	// Stats
	$("#falkenrathUndertaker").append(`<p>Unit Stats:</p>`);
	$("#falkenrathUndertaker").append(`<li>Hit Points: ${falkenrathUndertaker.hp}</li>`);
	$("#falkenrathUndertaker").append(`<li>Armor Class: ${falkenrathUndertaker.ac}</li>`);
	$("#falkenrathUndertaker").append(`<li>Strength: ${falkenrathUndertaker.str}</li>`);
	$("#falkenrathUndertaker").append(`<li>Dexterity: ${falkenrathUndertaker.dex}</li>`);
	$("#falkenrathUndertaker").append(`<li>Intelligence: ${falkenrathUndertaker.int}</li>`);
	$("#falkenrathUndertaker").append(`<li>Speed: ${falkenrathUndertaker.speed}</li>`);

	// Inventory
	$("#falkenrathUndertaker").append(`<p>Inventory:</p>`);
	$("#falkenrathUndertaker").append(`<li>Primary Weapon: ${falkenrathUndertaker.weapon1.name}</li><br>`);


	// FALKENRATH MARKSMAN CARD //
	$(".team-constructor").append(`<br><div id="falkenrathMarksman"><h1>${falkenrathMarksman.name}</h1></div>`);
	$("#falkenrathMarksman").append(`<img src="${falkenrathMarksman.artwork}">`);
	$("#falkenrathMarksman").on("click", () => {
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
			$(`#falkenrathMarksman`).remove();
		}
	});

	// Budget Cost
	$("#falkenrathMarksman").append(`<li>Budget Cost: ${falkenrathMarksman.budgetCost}</li>`);

	// Description
	$("#falkenrathMarksman").append(`<p>The ${falkenrathMarksman.name} is a role specifically reserved for female members of the Falkenrath Police. Their slight bodies allow them greater maneuverability, making excellent long range assailants.</p>`);

	// Stats
	$("#falkenrathMarksman").append(`<p>Unit Stats:</p>`);
	$("#falkenrathMarksman").append(`<li>Hit Points: ${falkenrathMarksman.hp}</li>`);
	$("#falkenrathMarksman").append(`<li>Armor Class: ${falkenrathMarksman.ac}</li>`);
	$("#falkenrathMarksman").append(`<li>Strength: ${falkenrathMarksman.str}</li>`);
	$("#falkenrathMarksman").append(`<li>Dexterity: ${falkenrathMarksman.dex}</li>`);
	$("#falkenrathMarksman").append(`<li>Intelligence: ${falkenrathMarksman.int}</li>`);
	$("#falkenrathMarksman").append(`<li>Speed: ${falkenrathMarksman.speed}</li>`);

	// Inventory
	$("#falkenrathMarksman").append(`<p>Inventory:</p>`);
	$("#falkenrathMarksman").append(`<li>Primary Weapon: ${falkenrathMarksman.weapon1.name}</li><br>`);


	// FALKENRATH BAILIFF CARD //
	$(".team-constructor").append(`<br><div id="falkenrathBailiff"><h1>${falkenrathBailiff.name}</h1></div>`);
	$("#falkenrathBailiff").append(`<img src="${falkenrathBailiff.artwork}">`);
		$("#falkenrathBailiff").on("click", () => {
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
			$(`#falkenrathBailiff`).remove();
		}
	});

	// Budget Cost
	$("#falkenrathBailiff").append(`<li>Budget Cost: ${falkenrathBailiff.budgetCost}</li>`);

	// Description
	$("#falkenrathBailiff").append(`<p>The ${falkenrathBailiff.name}. These are the bulk of the Falkenrath Police. They are the iconic stone cold faces that instill fear and submissiveness into the subjects of the Falkenrath Syndicate.</p>`);

	// Stats
	$("#falkenrathBailiff").append(`<p>Unit Stats:</p>`);
	$("#falkenrathBailiff").append(`<li>Hit Points: ${falkenrathBailiff.hp}</li>`);
	$("#falkenrathBailiff").append(`<li>Armor Class: ${falkenrathBailiff.ac}</li>`);
	$("#falkenrathBailiff").append(`<li>Strength: ${falkenrathBailiff.str}</li>`);
	$("#falkenrathBailiff").append(`<li>Dexterity: ${falkenrathBailiff.dex}</li>`);
	$("#falkenrathBailiff").append(`<li>Intelligence: ${falkenrathBailiff.int}</li>`);
	$("#falkenrathBailiff").append(`<li>Speed: ${falkenrathBailiff.speed}</li>`);

	// Inventory
	$("#falkenrathBailiff").append(`<p>Inventory:</p>`);
	$("#falkenrathBailiff").append(`<li>Primary Weapon: ${falkenrathBailiff.weapon1.name}</li><br>`);


	// FALKENRATH HOUND CARD //
	$(".team-constructor").append(`<br><div id="falkenrathHound"><h1>${falkenrathHound.name}<h1></div>`);
	$("#falkenrathHound").append(`<img src="${falkenrathHound.artwork}">`);
			$("#falkenrathHound").on("click", () => {
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
			$(`#falkenrathHound`).remove();
		}
	});

	// Budget Cost
	$("#falkenrathHound").append(`<li>Budget Cost: ${falkenrathHound.budgetCost}</li>`);

	// Description
	$("#falkenrathHound").append(`<p>The ${falkenrathHound.name}s are Gentled German Shepherds. Already being dogs bred for police work, these beasts are truly terrifying to be on the receiving end of their aggression.</p>`);

	// Stats
	$("#falkenrathHound").append(`<p>Unit Stats:</p>`);
	$("#falkenrathHound").append(`<li>Hit Points: ${falkenrathHound.hp}</li>`);
	$("#falkenrathHound").append(`<li>Armor Class: ${falkenrathHound.ac}</li>`);
	$("#falkenrathHound").append(`<li>Strength: ${falkenrathHound.str}</li>`);
	$("#falkenrathHound").append(`<li>Dexterity: ${falkenrathHound.dex}</li>`);
	$("#falkenrathHound").append(`<li>Intelligence: ${falkenrathHound.int}</li>`);
	$("#falkenrathHound").append(`<li>Speed: ${falkenrathHound.speed}</li>`);

	// Inventory
	$("#falkenrathHound").append(`<p>Inventory:</p>`);
	$("#falkenrathHound").append(`<li>Primary Weapon: ${falkenrathHound.weapon1.name}</li><br>`);

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
	player2.chosenUnits.push(gideonSchrader);

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
		player2.unitBudget = 150;
		$("#unit-budget").text(`Reamining Unit Budget: ${player2.unitBudget}`);
		player2.chosenUnits.push(gideonSchrader);
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
	// HIGHLAND TRAPPER CARD //
	$(".team-constructor").append(`<div id="highlandTrapper"><h1>${highlandTrapper.name}</h1><div>`);
	$("#highlandTrapper").append(`<img src="${highlandTrapper.artwork}">`);
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
			$(`#highlandTrapper`).remove();
		}
	});

	// Budget Cost
	$("#highlandTrapper").append(`<li>Budget Cost: ${highlandTrapper.budgetCost}</li>`);

	// Description
	$("#highlandTrapper").append(`<p>The ${highlandTrapper.name} is a seasoned tracker and hunter, native to the foothills of Kruin's Pass.</p>`);

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


	// KRUIN OUTLAW CARD //
	$(".team-constructor").append(`<div id="kruinOutlaw"><h1>${kruinOutlaw.name}</h1><div>`);
	$("#kruinOutlaw").append(`<img src="${kruinOutlaw.artwork}">`);
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
			$(`#kruinOutlaw`).remove();
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
	$(".team-constructor").append(`<div id="ulvenwaldRanger"><h1>${ulvenwaldRanger.name}</h1><div>`);
	$("#ulvenwaldRanger").append(`<img src="${ulvenwaldRanger.artwork}">`);
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
			$(`#ulvenwaldRanger`).remove();
		}
	});

	// Budget Cost
	$("#ulvenwaldRanger").append(`<li>Budget Cost: ${ulvenwaldRanger.budgetCost}</li>`);

	// Description
	$("#ulvenwaldRanger").append(`<p>The ${ulvenwaldRanger.name} estranged from her village at a young age, she has honed her skills to be a lethal hunter. She ensures the safety and balance between warring tribes of werewolves as game populations drastically decline.</p>`);

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


	// VILLAGE PARIAH CARD //
	$(".team-constructor").append(`<div id="villagePariah"><h1>${villagePariah.name}</h1><div>`);
	$("#villagePariah").append(`<img src="${villagePariah.artwork}">`);
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
			$(`#villagePariah`).remove();
		}
	});

	// Budget Cost
	$("#villagePariah").append(`<li>Budget Cost: ${villagePariah.budgetCost}</li>`);

	// Description
	$("#villagePariah").append(`<p>The ${villagePariah.name} the local punching bag is out looking for trouble.</p>`);

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
	$(".team-constructor").append(`<div id="estwaldGreatwolf"><h1>${estwaldGreatwolf.name}<h1><div>`);
	$("#estwaldGreatwolf").append(`<img src="${estwaldGreatwolf.artwork}">`);
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
			$(`#estwaldGreatwolf`).remove();
		}
	});

	// Budget Cost
	$("#estwaldGreatwolf").append(`<li>Budget Cost: ${estwaldGreatwolf.budgetCost}</li>`);

	// Description
	$("#estwaldGreatwolf").append(`<p>The ${estwaldGreatwolf.name} is a native predator of Valkenkrig. With the expansion of Falkenrath influence, they have been forced to lurk in shadows of the western forests.</p>`);

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
// This function places the Falkenrath units chosen by the player in the last phase.
const falkenrathStart = () => {
		if (player1.chosenUnits.length === 7) {
			player1.chosenUnits[0].placeUnit(15, 15);
			player1.chosenUnits[0].render();
			player1.chosenUnits[1].placeUnit(14, 15);
			player1.chosenUnits[1].render();
			player1.chosenUnits[2].placeUnit(15, 14);
			player1.chosenUnits[2].render();
			player1.chosenUnits[3].placeUnit(14, 14);
			player1.chosenUnits[3].render();
			player1.chosenUnits[4].placeUnit(13, 15);
			player1.chosenUnits[4].render();
			player1.chosenUnits[5].placeUnit(15, 13);
			player1.chosenUnits[5].render();
			player1.chosenUnits[6].placeUnit(13, 13);
			player1.chosenUnits[6].render();
		} else if (player1.chosenUnits.length === 6) {
			player1.chosenUnits[0].placeUnit(15, 15);
			player1.chosenUnits[0].render();
			player1.chosenUnits[1].placeUnit(14, 15);
			player1.chosenUnits[1].render();
			player1.chosenUnits[2].placeUnit(15, 14);
			player1.chosenUnits[2].render();
			player1.chosenUnits[3].placeUnit(14, 14);
			player1.chosenUnits[3].render();
			player1.chosenUnits[4].placeUnit(13, 15);
			player1.chosenUnits[4].render();
			player1.chosenUnits[5].placeUnit(15, 13);
			player1.chosenUnits[5].render();
		} else if (player1.chosenUnits.length === 5) {
			player1.chosenUnits[0].placeUnit(15, 15);
			player1.chosenUnits[0].render();
			player1.chosenUnits[1].placeUnit(14, 15);
			player1.chosenUnits[1].render();
			player1.chosenUnits[2].placeUnit(15, 14);
			player1.chosenUnits[2].render();
			player1.chosenUnits[3].placeUnit(14, 14);
			player1.chosenUnits[3].render();
			player1.chosenUnits[4].placeUnit(13, 15);
			player1.chosenUnits[4].render();
		} else if (player1.chosenUnits.length === 4) {
			player1.chosenUnits[0].placeUnit(15, 15);
			player1.chosenUnits[0].render();
			player1.chosenUnits[1].placeUnit(14, 15);
			player1.chosenUnits[1].render();
			player1.chosenUnits[2].placeUnit(15, 14);
			player1.chosenUnits[2].render();
			player1.chosenUnits[3].placeUnit(14, 14);
			player1.chosenUnits[3].render();
		} else if (player1.chosenUnits.length === 3) {
			player1.chosenUnits[0].placeUnit(15, 15);
			player1.chosenUnits[0].render();
			player1.chosenUnits[1].placeUnit(14, 15);
			player1.chosenUnits[1].render();
			player1.chosenUnits[2].placeUnit(15, 14);
			player1.chosenUnits[2].render();
		} else if (player1.chosenUnits.length === 2) {
			player1.chosenUnits[0].placeUnit(15, 15);
			player1.chosenUnits[0].render();
			player1.chosenUnits[1].placeUnit(14, 15);
			player1.chosenUnits[1].render();
		} else if (player1.chosenUnits.length === 1) {
			player1.chosenUnits[0].placeUnit(15, 15);
			player1.chosenUnits[0].render();
		} else {
			console.log("units placed");
		}
};

// This function places the Werewolf units chosen by the player in the last phase.
const werewolfStart = () => {
		if (player2.chosenUnits.length === 7) {
			player2.chosenUnits[0].placeUnit(0, 0);
			player2.chosenUnits[0].render();
			player2.chosenUnits[1].placeUnit(1, 0);
			player2.chosenUnits[1].render();
			player2.chosenUnits[2].placeUnit(0, 1);
			player2.chosenUnits[2].render();
			player2.chosenUnits[3].placeUnit(1, 1);
			player2.chosenUnits[3].render();
			player2.chosenUnits[4].placeUnit(2, 0);
			player2.chosenUnits[4].render();
			player2.chosenUnits[5].placeUnit(0, 2);
			player2.chosenUnits[5].render();
			player2.chosenUnits[6].placeUnit(2, 2);
			player2.chosenUnits[6].render();
		} else if (player2.chosenUnits.length === 6) {
			player2.chosenUnits[0].placeUnit(0, 0);
			player2.chosenUnits[0].render();
			player2.chosenUnits[1].placeUnit(1, 0);
			player2.chosenUnits[1].render();
			player2.chosenUnits[2].placeUnit(0, 1);
			player2.chosenUnits[2].render();
			player2.chosenUnits[3].placeUnit(1, 1);
			player2.chosenUnits[3].render();
			player2.chosenUnits[4].placeUnit(2, 0);
			player2.chosenUnits[4].render();
			player2.chosenUnits[5].placeUnit(0, 2);
			player2.chosenUnits[5].render();
		} else if (player2.chosenUnits.length === 5) {
			player2.chosenUnits[0].placeUnit(0, 0);
			player2.chosenUnits[0].render();
			player2.chosenUnits[1].placeUnit(1, 0);
			player2.chosenUnits[1].render();
			player2.chosenUnits[2].placeUnit(0, 1);
			player2.chosenUnits[2].render();
			player2.chosenUnits[3].placeUnit(1, 1);
			player2.chosenUnits[3].render();
			player2.chosenUnits[4].placeUnit(2, 0);
			player2.chosenUnits[4].render();
		} else if (player2.chosenUnits.length === 4) {
			player2.chosenUnits[0].placeUnit(0, 0);
			player2.chosenUnits[0].render();
			player2.chosenUnits[1].placeUnit(1, 0);
			player2.chosenUnits[1].render();
			player2.chosenUnits[2].placeUnit(0, 1);
			player2.chosenUnits[2].render();
			player2.chosenUnits[3].placeUnit(1, 1);
			player2.chosenUnits[3].render();
		} else if (player2.chosenUnits.length === 3) {
			player2.chosenUnits[0].placeUnit(0, 0);
			player2.chosenUnits[0].render();
			player2.chosenUnits[1].placeUnit(1, 0);
			player2.chosenUnits[1].render();
			player2.chosenUnits[2].placeUnit(0, 1);
			player2.chosenUnits[2].render();
		} else if (player2.chosenUnits.length === 2) {
			player2.chosenUnits[0].placeUnit(0, 0);
			player2.chosenUnits[0].render();
			player2.chosenUnits[1].placeUnit(1, 0);
			player2.chosenUnits[1].render();
		} else if (player2.chosenUnits.length === 1) {
			player2.chosenUnits[0].placeUnit(0, 0);
			player2.chosenUnits[0].render();
		} else {
			console.log("units placed");
		}
};

// This is a function that will append all necessary gampelay interaction elements to the document.
const initializeCombat = () => {
	$(".currentFactionTurn").text(`Current Faction's Turn: ${game.activePlayer.faction}`);
	$(".selectedUnit").text(`Selected Unit:`);
	$(".targetedUnit").text(`Targeted Unit:`);
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

	for (let y = gameBoard.length - 1; y >= 0; y--) {
		let row = gameBoard[y];
		$(".game-board").append(`<div class="game-row-${y} game-row"></div>`)
		for (let x = 0; x < row.length; x++) {
			$(`.game-row-${y}`).append(`<div class="game-square game-square-${x}-${y}" data-x="${x}" data-y="${y}"></div>`)
		}
	};
	falkenrathStart();
	werewolfStart();

	$("body").append(`<button id="endTurn">End Turn</button>`);
	$(`#endTurn`).on("click", (e) => {
		game.selectedUnit.resetSpeed();
		if (game.activePlayer === player1) {
		$("#primaryAttackButton").remove();
		$("#moveUpButton").remove();
		$("#moveRightButton").remove();
		$("#moveDownButton").remove();
		$("#moveLeftButton").remove();
			game.selectedUnit = "";
			game.targetedUnit= "";
			game.activePlayer = player2;
			game.inactivePlayer = player1;
			player1.actionPoints = 2;
			$(".currentFactionTurn").text(`Current Faction's Turn: ${game.activePlayer.faction}`);
			$(".selectedUnit").text(`Selected Unit:`);
			$(".targetedUnit").text(`Targeted Unit:`);
		} else {
		game.selectedUnit.resetSpeed();
		$("#primaryAttackButton").remove();
		$("#moveUpButton").remove();
		$("#moveRightButton").remove();
		$("#moveDownButton").remove();
		$("#moveLeftButton").remove();
			game.selectedUnit = "";
			game.targetedUnit= "";
			game.activePlayer = player1;
			game.inactivePlayer = player2;
			player2.actionPoints = 2;
			$(".currentFactionTurn").text(`Current Faction's Turn: ${game.activePlayer.faction}`);
			$(".selectedUnit").text(`Selected Unit:`);
			$(".targetedUnit").text(`Targeted Unit:`);
		}
	});

	const displayUnitFunctions = () => {
		$("#primaryAttackButton").remove();
		$("#moveUpButton").remove();
		$("#moveRightButton").remove();
		$("#moveDownButton").remove();
		$("#moveLeftButton").remove();
		$("body").append(`<button id="primaryAttackButton">${game.selectedUnit.name} Primary Attack</button>`);
		$("#primaryAttackButton").on("click", (e) => {
			$(`.alerts`).text(`${game.selectedUnit.name} is attacking ${game.targetedUnit.name}`);
			$(`.alerts`).text(`${game.selectedUnit.deterimineHit()}`);
		});
			$("body").append(`<button id="moveUpButton">Move ${game.selectedUnit.name} up</button>`);
	$("#moveUpButton").on("click", (e) => {
		game.selectedUnit.moveUp();
	});

	$("body").append(`<button id="moveRightButton">Move ${game.selectedUnit.name} right</button>`);
		$("#moveRightButton").on("click", (e) => {
		game.selectedUnit.moveRight();
	});

	$("body").append(`<button id="moveDownButton">Move ${game.selectedUnit.name} down</button>`);
		$("#moveDownButton").on("click", (e) => {
		game.selectedUnit.moveDown();
	});

	$("body").append(`<button id="moveLeftButton">Move ${game.selectedUnit.name} left</button>`);
		$("#moveLeftButton").on("click", (e) => {
		game.selectedUnit.moveLeft();
	});
	};

	$(".game-square").on("click", (e) => {
		let clickedX = $(e.currentTarget).data("x");
		let clickedY = $(e.currentTarget).data("y");
		for (i = 0; i < game.activePlayer.chosenUnits.length; i++) {
			let unit = game.activePlayer.chosenUnits[i];
			if (unit.xCoordinate === clickedX && unit.yCoordinate === clickedY) {
				console.log(`${unit.name} has been selected.`);
				game.selectedUnit = unit;
				console.log(game.selectedUnit);
				$(".selectedUnit").text(`Selected Unit: ${game.selectedUnit.name}`);
				displayUnitFunctions();
			}
		}	
	});

	$(".game-square").on("click", (e) => {
		let clickedX = $(e.currentTarget).data("x");
		let clickedY = $(e.currentTarget).data("y");
		for (i = 0; i < game.inactivePlayer.chosenUnits.length; i++) {
			let unit = game.inactivePlayer.chosenUnits[i];
			if (unit.xCoordinate === clickedX && unit.yCoordinate === clickedY) {
				console.log(`${unit.name} has been targeted.`);
				game.targetedUnit = unit;
				$(".targetedUnit").text(`Targeted Unit: ${game.targetedUnit.name}`);
				console.log(game.targetedUnit);
			}
		}	
	});
};



























































let nanobotsCount = 0;
let collectionInterval;
let nanobotsPerClick = 1;
let nanobotsPerSecond = 0;
let exponentialModifier = 0.05;
let worldBiomassKg = 550000000000000; // wikipedia, based solely on carbon
let nanobotBiomassKg = 1.0e-17;
let endgame = false;

let nfObject = new Intl.NumberFormat("en-US"); // for commas in numbers

let automaticUpgrades = {
  gradStudents: {
    price: 100,
    quantity: 0,
    multiplier: 15
  },
  nanobotMutations: {
    price: 100000, // Godmode: 10
    quantity: 0,
    multiplier: 1
  }
};

let clickUpgrades = {
  drones: {
    price: 20,
    quantity: 0,
    multiplier: 5
  },
  spaceLabs: {
    price: 1000,
    quantity: 0,
    multiplier: 100
  }
};

function buyDrone() {
  if (nanobotsCount >= clickUpgrades.drones.price) {
    clickUpgrades.drones.quantity += 1;
    // nanobotsPerClick += 1;
    nanobotsCount -= clickUpgrades.drones.price;
    clickUpgrades.drones.price *= 2;
    // console.log("drone purchased");
    collectClickUpgrades();
    update();
  }
}

function buySpaceLab() {
  if (nanobotsCount >= clickUpgrades.spaceLabs.price) {
    clickUpgrades.spaceLabs.quantity += 1;
    // nanobotsPerClick += 100;
    nanobotsCount -= clickUpgrades.spaceLabs.price;
    clickUpgrades.spaceLabs.price *= 2;
    collectClickUpgrades();
    update();
  }
}

function buyGradStudent() {
  if (nanobotsCount >= automaticUpgrades.gradStudents.price) {
    automaticUpgrades.gradStudents.quantity += 1;
    // nanobotsPerSecond += 1;
    nanobotsCount -= automaticUpgrades.gradStudents.price;
    automaticUpgrades.gradStudents.price *= 2;
    // collectSecondUpgrades();
    update();
  }
}

function buyNanobotMutation() {
  if (nanobotsCount >= automaticUpgrades.nanobotMutations.price) {
    automaticUpgrades.nanobotMutations.quantity += 1;
    automaticUpgrades.nanobotMutations.multiplier += exponentialModifier;
    // nanobotsPerSecond += 50;
    nanobotsCount -= automaticUpgrades.nanobotMutations.price;
    automaticUpgrades.nanobotMutations.price *= 2;
    // collectSecondUpgrades();
    update();
  }
}

function mine() {
  nanobotsCount +=
    1 +
    clickUpgrades.drones.quantity * clickUpgrades.drones.multiplier +
    clickUpgrades.spaceLabs.quantity * clickUpgrades.spaceLabs.multiplier;
  // buyDrone(); //  delete this once built out
  update();
}

function collectClickUpgrades() {
  // stepping through like auto updates didn't work and I couldn't debug it soooo wet code it is
  nanobotsPerClick =
    1 +
    clickUpgrades.drones.quantity * clickUpgrades.drones.multiplier +
    clickUpgrades.spaceLabs.quantity * clickUpgrades.spaceLabs.multiplier;
}

// Depreciated
// function collectSecondUpgrades() {
//   for (var key in automaticUpgrades) {
//     let upgrade = automaticUpgrades[key];
//     // add exponential modifier for mutation
//     nanobotsPerSecond += upgrade.quantity * upgrade.multiplier;
//   }
// }

function update() {
  document.querySelector(
    "#click-modifier-display"
  ).innerHTML = `Current NB per click:  ${nanobotsPerClick.toLocaleString(
    "en-US"
  )}`;
  // didn't work: ${nfObject.format(nanobotsPerClick)}. above doesn't work either. Why?? I was looking at the wrong field lol

  document.querySelector(
    "#automatic-modifier-display"
  ).innerHTML = `Current NB per second: ${nfObject.format(nanobotsPerSecond)}
  <br /> Current exponential growth modifier (x in NB^x): ${nfObject.format(
    automaticUpgrades.nanobotMutations.multiplier
  )}`;

  document.querySelector(
    "#nanobots-count" //
  ).innerHTML = `<h1>Nanobots (NB): <br />${nfObject.format(
    Math.floor(nanobotsCount)
  )}</h1>
  <br />
  <p>Biomass of carbon in the world: ${nfObject.format(worldBiomassKg)} kg</p>
  <br />
  <p>Estimated mass of a single nanobot (based on a large virus): 0.00000000000000001 kg</p>
  <br />
  <p>Mass of nanobots: ${(nanobotsCount * nanobotBiomassKg).toFixed(17)} kg</p>
  <br />
  <p>Percent biomass converted to nanobots: ${nfObject.format(
    ((nanobotBiomassKg * nanobotsCount) / worldBiomassKg) * 100
  )}%</p>`;

  // document.querySelector( // Will cause crash if this isn't commented but the referenced id is. weird. I guess it is javascript.
  //   "#drones-count"
  // ).innerHTML = `<p>Drones: ${clickUpgrades.drones.quantity}</p>`;

  // REVIEW is there a way to make this code below drier?

  document.querySelector(
    "#drone-info"
  ).innerHTML = `<p><b>Delivery Drones:</b> ${nfObject.format(
    clickUpgrades.drones.quantity
  )}</p>
  <p>Delivery Drone price: ${nfObject.format(clickUpgrades.drones.price)} NB</p>
  <p>Description: adds ${nfObject.format(
    clickUpgrades.drones.multiplier
  )} NB per click</p>`;

  document.querySelector(
    "#spacelabs-info"
  ).innerHTML = `<p><b>Orbital Space Labs:</b> ${nfObject.format(
    clickUpgrades.spaceLabs.quantity
  )}</p>
  <p>Oribtal Space Lab price: ${nfObject.format(
    clickUpgrades.spaceLabs.price
  )} NB</p>
  <p>Description: adds ${nfObject.format(
    clickUpgrades.spaceLabs.multiplier
  )} NB per click</p>`;

  document.querySelector(
    "#gradstudents-info"
  ).innerHTML = `<p><b>Unpaid Grad Students:</b> ${nfObject.format(
    automaticUpgrades.gradStudents.quantity
  )}</p>
  <p>Unpaid Grad Student price: ${nfObject.format(
    automaticUpgrades.gradStudents.price
  )} NB</p>
  <p>Description: adds ${nfObject.format(
    automaticUpgrades.gradStudents.multiplier
  )} NB per second</p>`;

  document.querySelector(
    "#nanobotMutations-info"
  ).innerHTML = `<p><b>Nanobot Self-Replication:</b> ${nfObject.format(
    automaticUpgrades.nanobotMutations.quantity
  )}</p>
  <p>Nanobot Self-Replication price: ${nfObject.format(
    automaticUpgrades.nanobotMutations.price
  )} NB</p>
  <p>Description: Increments the exponential growth of NBs by ${exponentialModifier}</p>`;

  // document.querySelector(
  //   "#spacelabs-count"
  // ).innerHTML = `<p>Spacelabs: ${clickUpgrades.spaceLabs.quantity}</p>`;

  // document.querySelector(
  //   "#gradstudents-count"
  // ).innerHTML = `<p>Grad Students: ${automaticUpgrades.gradStudents.quantity}</p>`;

  // document.querySelector(
  //   "#nanobotmutations-count"
  // ).innerHTML = `<p>Nanobot Mutations: ${automaticUpgrades.nanobotMutations.quantity}</p>`;
  // <br>
  // <p>Grad Students: ${automaticUpgrades.gradStudents.quantity}</p><br>
  // <p>Drones: ${clickUpgrades.drones.quantity}</p><br>`;
}

function collectAutoUpgrades() {
  // nanobotsCount += nanobotsPerSecond;

  //Hard Code solution // mark's comments
  //nano += gradstudens.quatintity * gradstudents.multiplier

  //Dynamic solution
  //for( var key in automatic upgrades)
  // let upgrade = upgrades[key]

  // Stop if all life is consumed //
  if (nanobotsCount * nanobotBiomassKg < worldBiomassKg) {
    let beforeAutoUpgrade = nanobotsCount;

    for (var key in automaticUpgrades) {
      let upgrade = automaticUpgrades[key];
      // nanobotsCount += upgrade.quantity * upgrade.multiplier;
      nanobotsCount += upgrade.quantity * upgrade.multiplier;
    }

    let afterAutoUpgrade = nanobotsCount;
    // changes variable for display // REVIEW should I put this after the below? Which is more accurate?
    nanobotsPerSecond = afterAutoUpgrade - beforeAutoUpgrade;

    // world-ending math
    if (automaticUpgrades.nanobotMutations.quantity) {
      nanobotsCount = Math.pow(
        nanobotsCount,
        automaticUpgrades.nanobotMutations.multiplier // EXPONENTIAL POWER
      );
    }

    update();
  } else {
    //alert("You destroyed all life. Congrats!");
    // document.querySelector(
    //   "#modal-on-end"
    // ).innerHTML = `$("#exampleModal").modal()`;
    document.getElementById("myBtn").click();
    endgame = true;
    stopInterval();
  }
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 1000);
}

function stopInterval() {
  clearInterval(collectionInterval);
}

// setInterval(collectAutoUpgrades, 1000);

startInterval();
update();

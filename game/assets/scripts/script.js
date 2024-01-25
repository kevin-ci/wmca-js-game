let playerTurn = true;

let hero = {
  name: "Luke Skywalker",
  health: 100,
  attacks: {
    strike: ["lightsaber strike", "light.mp3"],
    push: ["force push", "push.mp3"],
    kick: ["kick", "punch.mp3"]
  },
  attack(name) {
    let attack = this.attacks[name];
    playSound(attack[1]);
    let damage = Math.ceil(Math.random() * 20);
    let statusDiv = document.getElementById("fight-status");
    statusDiv.innerText = `${this.name} used his ${attack[0]} attack and dealt ${damage} damage!`;
    return damage;
  },
  displayHealth() {
    let heroHealthDiv = document.getElementById("hero-health");
    heroHealthDiv.innerText = this.health;
  },
};
hero.displayHealth();

let villain = {
  name: "Darth Vader",
  health: 100,
  attacks: [
    ["lightsaber slash", "light.mp3"],
    ["force choke", "choke.mp3"], 
    ["double-handed strike", "dhstrike.mp3"]
  ],
  attack() {
    let rand = Math.floor(Math.random() * this.attacks.length);
    let attack = this.attacks[rand];
    playSound(attack[1]);
    let damage = Math.ceil(Math.random() * 20);
    let statusDiv = document.getElementById("fight-status");
    statusDiv.innerText = `${this.name} used his ${attack[0]} attack and dealt ${damage} damage!`;
    return damage;
  },
  displayHealth() {
    let villainHealthDiv = document.getElementById("villain-health");
    villainHealthDiv.innerText = this.health;
  },
};
villain.displayHealth();

function handleButtonClick(event) {
  if (playerTurn) {
    let attackId = event.target.dataset.attack;
    let damageToVillain = hero.attack(attackId);
    villain.health -= damageToVillain;
    villain.displayHealth();
    playerTurn = false;
    setTimeout(villainAttack, 5000);
  }
}

let allButtons = document.querySelectorAll("button");
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", handleButtonClick);
}

function villainAttack() {
    let damageToHero = villain.attack();
    hero.health -= damageToHero;
    hero.displayHealth();
    playerTurn = true;
    checkEnd();
}

function checkEnd() {
    let statusDiv = document.getElementById("fight-status");
    if (hero.health <= 0) {
        statusDiv.innerText = `${hero.name} has been slain!`;
        playerTurn = false;
    }
    else if (villain.health <= 0) {
        statusDiv.innerText = `${villain.name} has been slain!`;
        playerTurn = false;
    }
}

function playSound(audio) {
    let path = 'assets/sounds/';
    let sound = new Audio(path + audio);
    sound.play();
}
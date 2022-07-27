import {getDiceRollArray, getDicePlaceholderHtml, getPercentage} from "./utils.js"


class Character {
    constructor(data){
    Object.assign(this,data)

    this.maxHealth = this.health

    this.diceHtml = getDicePlaceholderHtml(this.diceCount)
    }

    setDiceHtml = function(){
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map(num => 
            `<div class="dice">${num}</div>`).join("")
        }

    takeDamage = function(attackScoreArray){
        const totalAttackScore =  attackScoreArray.reduce((num, currentNum) => num + currentNum)
        this.health -= totalAttackScore
        if(this.health <= 0){
            this.health = 0
            this.dead = true
        }
    }

    getHealthbarHtml(){
        const percent = getPercentage(this.health, this.maxHealth)

        return `<div class="health-bar-outer">
        <div class="health-bar-inner ${percent <= 25 ? 'danger': ''} " 
            style="width: ${percent}%;">
        </div>
    </div>`
    }

    getCharacterHtml(){
        const { name, avatar, health, diceHtml} = this
        const healthBar = this.getHealthbarHtml()
        console.log(healthBar)
        return `
        <div class="character-card">
            <h4 class="name">${name}</h4>
            <img class="avatar" src= "${avatar}" />
            <p class="health">health: <b> ${health} </b></p>
            ${healthBar}
            <div class="dice-container">${diceHtml}</div>
        </div>
`
    }
}


export default Character
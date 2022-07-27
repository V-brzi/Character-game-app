import characterData from "./data.js"
import Character from "./Character.js"

let monstersArray = ["orc", "demon", "goblin"]
const btn = document.getElementById("attack-button")

btn.disabled = !btn.disabled

function attack(){
    wizard.setDiceHtml()
    monster.setDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    if(wizard.dead){
        endGame()
    }
    else if(monster.dead){
        btn.disabled = !btn.disabled
        if(monstersArray.length > 0){
            setTimeout(() => {
                monster = getNewMonster()
                renderCharacters()
                btn.disabled = !btn.disabled
            }, 1500)
        }
        else endGame()
    }
renderCharacters()
}

function getNewMonster(){
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {} 
}

function endGame(){
    setTimeout(function(){
    const endMessage = monster.dead && wizard.dead ? 'No victors - all creatures are dead'
    : wizard.health > 0 ? 'The wizard wins!'
    :'The monsters are victorious!' 
    const endEmoji =wizard.health > 0 ? '🔮':'☠️'

    document.getElementById('container').innerHTML = `<div class="end-game">
    <h2>Game Over</h2>
    <h3>${endMessage}</h3>
    <p class="end-emoji">${endEmoji}</p>
</div>`
}, 1500)}

function renderCharacters(){
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

btn.addEventListener("click", attack)

const wizard = new Character(characterData.hero)
let monster = getNewMonster()

renderCharacters()


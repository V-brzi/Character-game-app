

function getDiceRollArray(diceCount){
    return new Array(diceCount).fill(0).map(function(){
        return Math.floor(Math.random()*6)+1
    })
}

function getDicePlaceholderHtml(diceCount){
    return new Array(diceCount).fill(0).map(() => 
    `<div class="placeholder-dice"></div>`
).join("")
}

const getPercentage = (health, maxHealth) => (100*health)/maxHealth

export {getDiceRollArray, getDicePlaceholderHtml, getPercentage}

let flashCards = localStorage.getItem("cards")? JSON.parse(localStorage.getItem("cards")): {"demoset":{
        "bottle":"pullo",
        "station":"asema",
        "shelf":"hylly",
        "bar":"baari"

    },
    
    "demoset2":{
        "bottle2":"pullo2",
        "station2":"asema2",
        "shelf2":"hylly2",
        "bar2":"baari2"

    }
};


let scores = {};

if(localStorage.getItem('scores')){
    scores = JSON.parse(localStorage.getItem('scores'));
}
else{
    let keys = Object.keys(flashCards);

    for(let i = 0; i<keys.length; i++){
        console.log(keys[i])
        scores[keys[i]] = '-';
    }
}
console.log('scores');
console.log(scores);

console.log(flashCards);
console.log(flashCards);
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

let archive = localStorage.getItem("archive")? JSON.parse(localStorage.getItem("archive")): {};

let scores = localStorage.getItem('scores')? JSON.parse(localStorage.getItem('scores')):{};

// If no scores are available then populate with blanks
let keys = Object.keys(flashCards);

for(let i = 0; i<keys.length; i++){
    scores[keys[i]] = scores[keys[i]]? scores[keys[i]]:'-';
    console.log(keys[i])
};

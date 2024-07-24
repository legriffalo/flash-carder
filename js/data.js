let flashCards = localStorage.getItem("cards")? JSON.parse(localStorage.getItem("cards")): {
    "demoset":{
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

console.log('check your data')


console.log(flashCards)
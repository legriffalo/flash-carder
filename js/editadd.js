let selectedSet = 'demoset';
let tempData = '';
// let demoZone = document.getElementById('demo_zone');


//function that build shows flashcard sets for editting/preview
const buildMatchemPreview = (target,data)=>{
    
    let qs = data;
    //ensures blank flash cards don't get shown
    delete qs[''];
    // get the question and answer pairs
    let questions = Object.keys(qs);
    let answers = Object.values(qs);

    //cycle through and render in demo_zone
    for(let i = 0; i<questions.length;i++){
        let question = questions[i];
        let answer = answers[i];
        // console.log(question,answer);
        document.getElementById(target).innerHTML+=`<div class = "matchem_row">
        <div class = "selectable question " data-type="">${question}</div>
        <div class = "selectable answer " data-type="">${answer}</div>
        </div>`;
    }
    return 1
};

const discardChanges = ()=>{
    hideShow('set_select');
    hideShow('set_name');
    hideShow('discard');
    changeButton();
    delete flashCards[selectedSet];
}

// const toggleDeleteMode = ()=>{}

// const delete = ()=>{}


// build set selection drop-down options
let sets = Object.keys(flashCards);
document.getElementById('set_select').innerHTML+='<option value="" disabled selected hidden>Choose a flash card set...</option>'
for(i=0;i<sets.length;i++){
    document.getElementById('set_select').innerHTML+=`<option value="${sets[i]}">${sets[i]}</option>`;
}
document.getElementById('set_select').innerHTML+=`<option >new</option>`;



//listener to add the flash card to the gui and data object
addButton.addEventListener('pointerdown',()=>{
    if(selectedSet){
        console.log(selectedSet)
        // console.log(flashCards[selectedSet]);
        let question = document.getElementById('question').value;
        let answer = document.getElementById('answer').value;
        //handle unnamed set fix me 07/07/24
        let set = flashCards[selectedSet];
        set[question]= answer;
        console.log(set);
        clear('demo_zone')
        buildMatchemPreview('demo_zone',set)
    }

    else if(document.getElementById('set_name').value){
        selectedSet = document.getElementById('set_name').value;
        
        let question = document.getElementById('question').value;
        let answer = document.getElementById('answer').value;

        flashCards[selectedSet]={};
        flashCards[selectedSet][question] = answer;
        clear('demo_zone');

        buildMatchemPreview('demo_zone',flashCards[selectedSet])
    }

    
    else{
        console.log(selectedSet)
        document.getElementById('set_name').value? document.getElementById('set_name').value : window.alert('name your set to make changes');
    }
});


let selecter = document.getElementById("set_select");
let discard = document.getElementById("discard");

function handleChange(e){
    selectedSet = e.target.value;
    if(selectedSet!='new'){
        clear('demo_zone');
        clear('show_zone');
        buildMatchemPreview('demo_zone', flashCards[`${e.target.value}`]);
        buildMatchem('show_zone', flashCards[`${e.target.value}`]);
        console.log(`selected set is ${selectedSet}`)
    }
    else{
        console.log('new flashcard set started')
        clear('demo_zone');
        clear('show_zone');
        //change here 
        practiceButton.innerHTML = 'Use cards';
        document.getElementById('add_sets').classList.remove('hidden');
        document.getElementById('practice').classList.add('hidden');
        hideShow('set_select');
        hideShow('set_name');
        hideShow('discard');
        selectedSet = '';
    }
    
};


function removeMode(){
    console.log('activating remove mode');
    
    els = document.getElementById('demo_zone').getElementsByClassName('matchem_row');
    console.log(els.length)
    for(let i = 0; i<els.length; i++){
        els[i].innerHTML += '<button class ="remove">X</button>';
    }

    let rems = document.getElementsByClassName('remove');
    
    for(let i = 0; i<rems.length;i++){
        rems[i].addEventListener('pointerdown',(e)=>{
            console.log(e.target.parentElement)
            let q = e.target.parentElement.getElementsByClassName('question')[0];
             console.log(q)
             console.log(q.innerHTML)
            
            e.target.parentElement.remove()

            console.log(flashCards[selectedSet])
            delete flashCards[selectedSet][q.innerHTML]

            console.log(flashCards[selectedSet])

        })
    }
};

selecter.addEventListener('change',handleChange)
discard.addEventListener('pointerdown',discardChanges)

















let selectedSet = '';
let tempData = '';
let removeFlag = 0;

// Function that build shows flashcard sets for editting/preview
const buildMatchemPreview = (target,data,archive)=>{
    
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
        // removed selectable class
        document.getElementById(target).innerHTML+=`<div class = "matchem_row">
        <div class = "unselectable question " data-type="">${question}</div>
        <div class = "unselectable answer " data-type="">${answer}</div>
        </div>`;
    }
    if(archive){
    document.getElementById(target).innerHTML+= "<div id = 'send_to_archive'> <i class='fas fa-archive'></i> </div>"
    document.getElementById('send_to_archive').addEventListener("pointerdown",(e)=>{
        archiveData(e)
    })}
    return 1
};
// discard current new set
const discardChanges = ()=>{
// explicit hide and show functions?
    document.getElementById('set_name').value='';
    document.getElementById('set_select').value='';
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
    clear('demo_zone');
    delete flashCards[selectedSet];
};
// Use to redraw the available sets when things change
function setChanges(){
    document.getElementById('set_select').innerHTML = '';
    // build set selection drop-down options
    let sets = Object.keys(flashCards);
    document.getElementById('set_select').innerHTML+='<option value="" disabled selected hidden>Choose a flash card set...</option>'
    for(i=0;i<sets.length;i++){
        document.getElementById('set_select').innerHTML+=`<option value="${sets[i]}"> ${sets[i]} (${scores[sets[i]]})</option>`;
    }
    document.getElementById('set_select').innerHTML+=`<option >new</option>`;
};
// Change GUI based on which quiz set is chosen by user
function handleChange(e){
    selectedSet = e.target.value;
    if(selectedSet!='new'){
        clear('demo_zone');
        clear('show_zone');
        buildMatchemPreview('demo_zone', flashCards[`${e.target.value}`],true);
        buildMatchem('show_zone', flashCards[`${e.target.value}`]);
        console.log(`selected set is ${selectedSet}`);
    }
// explicit hide and show functions?
    else{
        console.log('new flashcard set started')
        // console.log(selectedSet)
        clear('demo_zone');
        clear('show_zone');
        // practiceButton.innerHTML = 'Use cards';
        document.getElementById('add_sets').classList.remove('hidden');
        document.getElementById('practice').classList.add('hidden');
        hide('set_select');
        show('set_name');
        practiceButton.innerHTML= 'Go back';
        // changeButton();
        show('discard');
        selectedSet = '';
    }
    
};
// Toggle element removal when editting mode is on
function removeMode(){

    if(removeFlag ==0){
        removeFlag = 1;
        console.log('activating remove mode');
                //change button text 
        document.getElementById('remove_button').innerHTML = 'Done';

        els = document.getElementById('demo_zone').getElementsByClassName('matchem_row');
        console.log(els.length)
        for(let i = 0; i<els.length; i++){
            els[i].innerHTML += '<button class ="remove"><i class="fas fa-trash-alt"></i></button>';
        }

        let rems = document.getElementsByClassName('remove');
        
        for(let i = 0; i<rems.length;i++){
            rems[i].addEventListener('pointerdown',(e)=>{
                console.log(e.target.parentElement)
                let q = e.target.parentElement.parentElement.getElementsByClassName('question')[0];
                console.log(q)
                console.log(q.innerHTML)
                
                e.target.parentElement.parentElement.remove()

                console.log(flashCards[selectedSet])
                delete flashCards[selectedSet][q.innerHTML]

                console.log(flashCards[selectedSet])

            })
        }
    }
    else{
        //change button text 
        document.getElementById('remove_button').innerHTML = 'remove mode';

        console.log('deactivating remove mode');
        removeFlag = 0;
        let els = document.getElementsByClassName('remove');
        console.log(els.length);
        while(els[0]){els[0].remove();
        }
    }
};
// Sen data to the archive
archiveData = (e)=>{
    console.log("ITS gonna ARCHIVE BRO!!!",e.target.parentNode.parentNode);
    console.log(selectedSet)
    archive[selectedSet]= flashCards[selectedSet];
    localStorage.setItem('archive', JSON.stringify(archive));
    delete flashCards[selectedSet];
    clear('demo_zone');
    saveData()
}
// Show elements in the archive and set up restore options
showArchive = ()=>{
    let keys=Object.keys(archive);
    console.log(keys);
    let addstr = ''
    for(let i =0;i<keys.length;i++){
        addstr+=`<div class = 'archived' data-source = '${keys[i]}'>
        <div><p>name: ${keys[i]}</p>
        <p>number of cards: ${Object.keys(archive[keys[i]]).length}</p>
        <p><span>previous score:${scores[keys[i]]}</span></p></div>
        <div><i class="fas fa-trash-restore"></i></div></div>
        `
    }
    
    return addstr
};

// add listeners
let selecter = document.getElementById("set_select");
let discard = document.getElementById("discard");
selecter.addEventListener('change',handleChange)
discard.addEventListener('pointerdown',discardChanges)
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
        clear('demo_zone');
        buildMatchemPreview('demo_zone',set,true);
        clear('show_zone')
        buildMatchem('show_zone',set);
    }

    else if(document.getElementById('set_name').value){
        selectedSet = document.getElementById('set_name').value;
        
        let question = document.getElementById('question').value;
        let answer = document.getElementById('answer').value;

        flashCards[selectedSet]={};
        flashCards[selectedSet][question] = answer;
        clear('demo_zone');

        buildMatchemPreview('demo_zone',flashCards[selectedSet],false);
    }

    
    else{
        console.log(selectedSet)
        document.getElementById('set_name').value? document.getElementById('set_name').value : window.alert('name your set to make changes');
    }
});
setChanges();


// Build set selection drop-down options
// let sets = Object.keys(flashCards);
// document.getElementById('set_select').innerHTML+='<option value="" disabled selected hidden>Choose a flash card set...</option>'
// for(i=0;i<sets.length;i++){
//     document.getElementById('set_select').innerHTML+=`<option value="${sets[i]}"> ${sets[i]} (${scores[sets[i]]})</option>`;
// }
// document.getElementById('set_select').innerHTML+=`<option >new</option>`;











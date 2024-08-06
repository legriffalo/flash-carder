//hide/show content
function hideShow(target){
    document.getElementById(target).classList.toggle('hidden');
}
function toggleActive(target){
    document.getElementById(target).classList.toggle('active_button');
};

// clear a target of innerHTML
const clear = (target)=>{
    document.getElementById(target).innerHTML = '';
}

// insert special characters in to the textboxes
function insertText(text){
    console.log(document.activeElement.id);
    let textField = document.activeElement.classList.contains('inputs')? document.activeElement:active;
    active = textField;
    let cursorPosition = textField.selectionStart;
    let value = textField.value;
    console.log(value);
    textField.value = (value.slice(0, cursorPosition)+ text + value.slice(cursorPosition));
}

function saveData(){
    localStorage.setItem("cards",JSON.stringify(flashCards));
    localStorage.setItem('scores',JSON.stringify(scores));
    location.reload();

}
// set variables and add listeners for main page.
function changeButton(){
    practiceButton.innerHTML=='make/edit cards'? practiceButton.innerHTML = 'Use cards':practiceButton.innerHTML = 'make/edit cards';
}
//tracks which input box is active
let active ='';

// getting the core elements of the page to add listeners
let practiceButton = document.getElementById('use_cards'); 
let buildButton = document.getElementById('make_cards');
let aButton = document.getElementById('a_button');
let oButton = document.getElementById('o_button');
let addButton = document.getElementById('add_button');
let saveButton = document.getElementById('save_button');
let removeButton = document.getElementById('remove_button');
let advanced = document.getElementById('advanced');

// add all event listeners
practiceButton.addEventListener('pointerdown',()=>{hideShow('add_sets');hideShow('practice');hideShow('scores');changeButton()});
aButton.addEventListener('pointerdown',()=>{insertText("ä")});
oButton.addEventListener('pointerdown',()=>{insertText('ö')});
saveButton.addEventListener('pointerdown',()=>{saveData()})
removeButton.addEventListener('pointerdown',()=>{removeMode()});
advanced.addEventListener('pointerdown', ()=>{hideShow('additional_options'); toggleActive('advanced')});
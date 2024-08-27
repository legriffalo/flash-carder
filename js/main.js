// detect device type using ternary operator
const detectDeviceType = () =>
    /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)
      ? 'Mobile'
      : 'Desktop';
// if device is mobile device then remove the special character buttons
if(detectDeviceType()== 'Mobile'){
    console.log(detectDeviceType())
    hideShow('a_button');
    hideShow('o_button');
};
//original toggle function - causd some issues so changed but still used in
function hideShow(target){
    document.getElementById(target).classList.toggle('hidden');
};
function hideAll(){
    hide("set_select");
    hide("set_name");
    hide("add_sets");
    hide("practice");
    // hide("");

}
//hide elements
function hide(target){
    document.getElementById(target).classList.add('hidden');
};
// show elements
function show(target){
    document.getElementById(target).classList.remove('hidden');
};
function toggleActive(target){
    document.getElementById(target).classList.toggle('active_button');
};
// clear a target of innerHTML
const clear = (target)=>{
    document.getElementById(target).innerHTML = '';
};
// insert special characters in to the textboxes
function insertText(text){
    console.log(document.activeElement.id);
    let textField = document.activeElement.classList.contains('inputs')? document.activeElement:active;
    active = textField;
    let cursorPosition = textField.selectionStart;
    let value = textField.value;
    console.log(value);
    textField.value = (value.slice(0, cursorPosition)+ text + value.slice(cursorPosition));
};
function saveData(){
    localStorage.setItem("cards",JSON.stringify(flashCards));
    localStorage.setItem('scores',JSON.stringify(scores));
    localStorage.setItem('archive', JSON.stringify(archive))
    location.reload();

};
// set variables and add listeners for main page.
function changeButton(){
    practiceButton.innerHTML=='make/edit'? practiceButton.innerHTML = 'Use':practiceButton.innerHTML = 'make/edit';
};
// check screenstatus 
function checkScreen(){
    console.log(selectedSet)
    changeButton();

    if(!selectedSet){
        console.log("falsey selectedSet");
        // reset selected set to 
        hideAll();
        show('practice')
        show('set_select')
        set_select.value = '';
        // selectedSet = 'none'

        // changeButton();
    }
    else if(set_name.value){
        discardChanges();
        hideAll();
        show('practice')
        show('set_select')
        set_select.value = '';
    }
    else
    {
        hide('set_name');
        hideShow('add_sets');
        hideShow('practice');
        hide('discard')
        // changeButton();

    }
    // else if(selectedSet=='new'){
    //     // hide('add_sets')
    // }
    // else{
    //     hide('set_select');
    //     show('set_name')
    // }
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
let archiveAccessButton = document.getElementById('access_archive');

// add all event listeners
document.addEventListener('pointerdown',()=>{document.getElementById('logo').classList.add('hidden')});
practiceButton.addEventListener('pointerdown',()=>{checkScreen();});
aButton.addEventListener('pointerdown',()=>{insertText("ä")});
oButton.addEventListener('pointerdown',()=>{insertText('ö')});
saveButton.addEventListener('pointerdown',()=>{saveData()})
removeButton.addEventListener('pointerdown',()=>{removeMode()});
advanced.addEventListener('pointerdown', ()=>{hideShow('additional_options'); toggleActive('advanced')});
archiveAccessButton.addEventListener('pointerdown',()=>{archiveAccess()})
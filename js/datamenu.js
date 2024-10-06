let textShown = 0;
// Open the import data window
function startImportData(){
    hideShow('data_window_input');
    // document.getElementById('text_area_input').value = '';
    hideShow('submit_button');

    document.getElementById('copy_button').classList.add('hidden');
    document.getElementById('data_window_output').classList.add('hidden');
    document.getElementById('archive_window').classList.add('hidden');
};
// Open the data export window
function prepExportData(){
    
    hideShow('data_window_output');
    document.getElementById('text_area_output').value = '';
    document.getElementById('text_area_output').value = JSON.stringify(flashCards);
    console.log('steal data')
    hideShow('copy_button');
    console.log('all ran?')

    document.getElementById('data_window_input').classList.add('hidden');
    document.getElementById('submit_button').classList.add('hidden');
    document.getElementById('archive_window').classList.add('hidden');

};
// Open the data archive window
archiveAccess = ()=>{
    hideShow('archive_window');
    document.getElementById('archive_window').innerHTML = showArchive();

     // add restore listeners
     let els = document.getElementsByClassName("archived")
     for(let i=0;i<els.length;i++){
         els[i].addEventListener('pointerdown',(e)=>{
            //  console.log(e.target.parentNode.parentNode);
             let parent = e.target.parentNode.parentNode
            //  console.log(parent)
             let name = parent.dataset.source; 
             console.log(name)
             flashCards[name] = archive[name];
             delete archive[name];
             console.log(flashCards);
             console.log(archive)
             parent.remove();
             setChanges();
         })
     }
    
    document.getElementById('copy_button').classList.add('hidden');
    document.getElementById('submit_button').classList.add('hidden');

    document.getElementById('data_window_input').classList.add('hidden');
    document.getElementById('data_window_output').classList.add('hidden');

};
// Hard reset all data
function resetData(){
    // hideShow('full_reset');
   if( window.confirm('if you do this all your cards will be cleared!')){
        localStorage.removeItem('scores');
        localStorage.removeItem('cards');
        localStorage.removeItem('archive');
        location.reload();
   }

    
 
};
// Check input sata foe JSON integrity
function dataCheck(data){
    try {
        let upload = JSON.parse(data);
        let keys = Object.keys(upload);

        for(let i = 0;i<keys.length;i++){
            let name = keys[i]
            flashCards[name] = upload[name];
        }
    }
    catch {
        console.log("data must be in JSON format")
    }


};

//Add event listeners
document.getElementById('export_button').addEventListener('pointerdown',()=>{
    prepExportData();
});

document.getElementById('import_button').addEventListener('pointerdown',()=>{
    startImportData();
});

document.getElementById('reset_button').addEventListener('pointerdown',()=>{
    resetData();
});

document.getElementById('copy_button').addEventListener('pointerdown',()=>{
    var text_to_copy = document.getElementById("text_area_output").value;

    if (!navigator.clipboard){
        // use old commandExec() way
    } else{
        navigator.clipboard.writeText(text_to_copy).then(
            function(){
                console.log("yeah!"); // success 
            })
        .catch(
            function() {
                console.log("err"); // error
        });
    } 
});

document.getElementById('submit_button').addEventListener('pointerdown',()=>{
    
    let data = document.getElementById('text_area_input').value;
    console.log(data)
    dataCheck(data)
    // document.getElementById('text_area_input').value = '';
    console.log('ready for data drop');
});
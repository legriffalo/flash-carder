
let textShown = 0;

function startImportData(){
    hideShow('data_window_input');
    // document.getElementById('text_area_input').value = '';
    hideShow('submit_button');

    document.getElementById('copy_button').classList.add('hidden');
    document.getElementById('data_window_output').classList.add('hidden');
};

function prepExportData(){
    
    hideShow('data_window_output');
    document.getElementById('text_area_output').value = '';
    document.getElementById('text_area_output').value = JSON.stringify(flashCards);
    console.log('steal data')
    hideShow('copy_button');
    console.log('all ran?')

    document.getElementById('data_window_input').classList.add('hidden');
    document.getElementById('submit_button').classList.add('hidden');
};

function resetData(){
    // hideShow('full_reset');
   if( window.confirm('if you do this all your cards will be cleared!')){
        localStorage.removeItem('scores');
        localStorage.removeItem('cards');
        location.reload();
   }

    
 
};


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


}

document.getElementById('export_button').addEventListener('pointerdown',()=>{
    prepExportData();
});

document.getElementById('import_button').addEventListener('pointerdown',()=>{
    startImportData();
})

document.getElementById('reset_button').addEventListener('pointerdown',()=>{
    resetData();
})


document.getElementById('copy_button').addEventListener('pointerdown',()=>{
    var text_to_copy = document.getElementById("text_area_output").value;

    if (!navigator.clipboard){
        // use old commandExec() way
    } else{
        navigator.clipboard.writeText(text_to_copy).then(
            function(){
                alert("yeah!"); // success 
            })
        .catch(
            function() {
                alert("err"); // error
        });
    } 
});

document.getElementById('submit_button').addEventListener('pointerdown',()=>{
    
    let data = document.getElementById('text_area_input').value;
    console.log(data)
    dataCheck(data)
    // document.getElementById('text_area_input').value = '';
    console.log('ready for data drop');
})
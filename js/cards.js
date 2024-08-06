selected = {"question":0,"answer":0};
previousSelection = '';
let score = 0;
let wrong = 0;
// function to jumble lists for matching activities
const randomise = (x)=>{
    let y = []
    while(x.length>0){
        y.push(String(x.splice(Math.floor(Math.random()*x.length-1),1)));
    }
    return y
};

//function that build matching activities
const buildMatchem= (target,data)=>{

    let qs = data;

    console.log(qs)

    let questions = Object.keys(qs);
    let answers = Object.values(qs);

    let randans = randomise(answers);

    for(let i = 0; i<questions.length;i++){
        let question = questions[i];
        let answer = randans[i];
    
        console.log(question,answer)
        
        document.getElementById(target).innerHTML+=`<div class = "matchem_row">
        <div class = "selectable question " data-type="">${question}</div>
        <div class = "selectable answer " data-type="">${answer}</div>
        </div>`;
    }
    activateListeners();
    score = 0;
    return 1
}



// use two elements to check if they match
const checkMatch = (newSelection,selected)=>{
    console.log('adding picked')

    // add the picked class to the picked element
    newSelection.classList.add("picked");
    
    // clear out selected to ensure wrong is wrong!
    selected["question"]!=0 & newSelection.classList.contains("question")? selected["answer"] = 0:null;
    selected["answer"]!=0 & newSelection.classList.contains("answer")? selected["question"] = 0:null;
    console.log(selected);

    // fill in the selected variable
    newSelection.classList.contains("question")? selected["question"]= newSelection.innerHTML:0;
    newSelection.classList.contains("answer")? selected["answer"]= newSelection.innerHTML:0;
    console.log(selected)
  




    // set variables for comparison
    let question = selected["question"];
    let answer = selected["answer"]
    let scorePanel = document.getElementById('score');
    // let type = selected["eword"].dataset.type;
    // console.log(question,answer)

    if(flashCards[selectedSet][`${selected["question"]}`] ==  answer ){
        
        console.log("MATCH MATCH MATCH");

        // change style to correct
        newSelection.classList.add("correct");
        previousSelection.classList.add("correct");
        
        //reset the selected variable and remove other class
        newSelection.classList.remove('picked')
        previousSelection.classList.remove('picked')
        newSelection = ''
        previousSelection = ''
        score+=1;

    }
    else{
        console.log(newSelection);
        console.log(previousSelection);

        // duplicate variables to avoid losing before set Timeout processes
        const a = newSelection;
        const b = previousSelection; 
        if(newSelection != '' & previousSelection !=''){
            wrong+=1;

            console.log('setting timer')
            setTimeout(function (){

            
            console.log(a,b)
            a.classList.remove('picked');
            b.classList.remove('picked');
            newSelection = '';
            previousSelection = '';
            
            }
            ,500);
            console.log('remove picked')
        }
    
    previousSelection = newSelection;
    console.log(selected)
    }

    console.log(score);
    console.log(wrong)
    scorePanel.innerHTML = `${score}/${Object.keys(flashCards[selectedSet]).length + wrong}`
    console.log(selected)

    // check all are completed and update scores
    let corrects = document.getElementsByClassName('correct');
    let selectables = document.getElementsByClassName('selectable')
    console.log(corrects.length);
    console.log(selectables.length)
    if(corrects.length == selectables.length){
        console.log('all questions completed!!!!\n\n\n\n\n');
        scores[selectedSet] = `${score}/${Object.keys(flashCards[selectedSet]).length + wrong}`;
    }
    else{}
}



//activate eventListeners for matching 

const activateListeners = ()=>{
    console.log('adding listeners')

    let selectables = document.getElementById('practice').getElementsByClassName("selectable");
    for(let i = 0;i<selectables.length;i++){
        selectables[i].addEventListener("pointerdown",(e)=>{
        checkMatch(e.target,selected)
        })
    }
} 

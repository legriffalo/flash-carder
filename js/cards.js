selected = { question: 0, answer: 0 };
previousSelection = "";
let score = 0;
let wrong = 0;
// function to jumble lists for matching activities
const randomise = (x) => {
  let y = [];
  while (x.length > 0) {
    y.push(String(x.splice(Math.floor(Math.random() * x.length - 1), 1)));
  }
  return y;
};

// set up basic flashcards roll
const buildFlashCards = (target, data) => {
  console.log("chose flashes");

  let qs = data;

  console.log(qs);

  let questions = Object.keys(qs);
  let answers = Object.values(qs);

  document.getElementById(target).innerHTML += `<div id = "flash-control">
                        <div id = "flash-left"><--</div>
                       <div id = "flash-right">--></div>
                       <div id = "flash-back">Back</div>
                       </div>`;

  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let answer = answers[i];
    let card_no = i;

    console.log(question, answer);

    document.getElementById(target).innerHTML +=
      `<div class = "flashcard" data-cardno = "card_no${card_no}">
        <div class = "flippable flash-question">${question}</div>
        <div class = "flippable flash-answer hidden" >${answer}</div>
        </div>`;
  }

  activateListeners("practice");
  card_number = 1;
  return 1;
};

// set up basic flashcards roll
const buildFlashList = (target, data) => {
  console.log("chose flashes");

  let qs = data;

  console.log(qs);

  let questions = Object.keys(qs);
  let answers = Object.values(qs);

  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let answer = answers[i];
    let card_no = i;

    console.log(question, answer);

    document.getElementById(target).innerHTML +=
      `<div class = "flashcard" data-cardno = "card_no${card_no}">
        <div class = "flippable flash-question " data-type="">${question}</div>
        <div class = "flippable flash-answer hidden" data-type="">${answer}</div>
        </div>`;
  }

  activateListeners("practice");
  card_number = 1;
  return 1;
};

//function that build matching activities
const buildMatchem = (target, data) => {
  let qs = data;

  console.log(qs);

  let questions = Object.keys(qs);
  let answers = Object.values(qs);

  let randans = randomise(answers);

  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let answer = randans[i];

    console.log(question, answer);

    document.getElementById(target).innerHTML += `<div class = "matchem_row">
        <div class = "selectable question " data-type="">${question}</div>
        <div class = "selectable answer " data-type="">${answer}</div>
        </div>`;
  }
  activateListeners("practice");
  score = 0;
  return 1;
};

// const one_to_four = (target, data, dir) => {
//   console.log("chose 124");
// };

// const typingTask = (target, data, dir) => {
//   console.log("chose type");
// };

function buildTask(e) {
  actions = {
    bb: () => hideShow("task_menu"),
    flashcard: () => buildFlashCards("show_zone", flashCards[`${selectedSet}`]),
    flashlist: () => buildFlashList("show_zone", flashCards[`${selectedSet}`]),
    matchems: () => buildMatchem("show_zone", flashCards[`${selectedSet}`]),
    onetofour: () =>
      buildOneToFour("show_zone", flashCards[`${selectedSet}`], 1),
    onetofour2: () =>
      buildOneToFour("show_zone", flashCards[`${selectedSet}`], 0),
    type: () => buildOneToFour("show_zone", flashCards[`${selectedSet}`], 0),
    type2: () => buildOneToFour("show_zone", flashCards[`${selectedSet}`], 0),
  };

  actions[e.target.id]();
  console.log("picked", e.target.id);
  hideShow("task_menu");
}

// use two elements to check if they match
const checkMatch = (newSelection, selected) => {
  console.log("adding picked");

  // add the picked class to the picked element
  newSelection.classList.add("picked");

  // clear out selected to ensure wrong is wrong!
  (selected["question"] != 0) & newSelection.classList.contains("question")
    ? (selected["answer"] = 0)
    : null;
  (selected["answer"] != 0) & newSelection.classList.contains("answer")
    ? (selected["question"] = 0)
    : null;
  console.log(selected);

  // fill in the selected variable
  newSelection.classList.contains("question")
    ? (selected["question"] = newSelection.innerHTML)
    : 0;
  newSelection.classList.contains("answer")
    ? (selected["answer"] = newSelection.innerHTML)
    : 0;
  console.log(selected);

  // set variables for comparison
  let question = selected["question"];
  let answer = selected["answer"];
  let scorePanel = document.getElementById("score");
  // let type = selected["eword"].dataset.type;
  // console.log(question,answer)

  if (flashCards[selectedSet][`${selected["question"]}`] == answer) {
    console.log("MATCH MATCH MATCH");

    // change style to correct
    newSelection.classList.add("correct");
    previousSelection.classList.add("correct");

    //reset the selected variable and remove other class
    newSelection.classList.remove("picked");
    previousSelection.classList.remove("picked");
    newSelection = "";
    previousSelection = "";
    score += 1;
  } else {
    console.log(newSelection);
    console.log(previousSelection);

    // duplicate variables to avoid losing before set Timeout processes
    const a = newSelection;
    const b = previousSelection;
    if ((newSelection != "") & (previousSelection != "")) {
      wrong += 1;

      console.log("setting timer");
      setTimeout(function () {
        console.log(a, b);
        a.classList.remove("picked");
        b.classList.remove("picked");
        newSelection = "";
        previousSelection = "";
      }, 500);
      console.log("remove picked");
    }

    previousSelection = newSelection;
    console.log(selected);
  }

  console.log(score);
  console.log(wrong);
  scorePanel.innerHTML = `${score}/${Object.keys(flashCards[selectedSet]).length + wrong}`;
  console.log(selected);

  // check all are completed and update scores
  let corrects = document.getElementsByClassName("correct");
  let selectables = document.getElementsByClassName("selectable");
  console.log(corrects.length);
  console.log(selectables.length);
  if (corrects.length == selectables.length) {
    console.log("all questions completed!!!!\n\n\n\n\n");
    scores[selectedSet] =
      `${score}/${Object.keys(flashCards[selectedSet]).length + wrong}`;
  } else {
  }
};
//activate eventListeners for matching
const activateListeners = (target) => {
  console.log("adding listeners");
  // Add listeners to make basic flashcards work
  let flippables = document
    .getElementById(target)
    .getElementsByClassName("flippable");

  for (let i = 0; i < flippables.length; i++) {
    flippables[i].addEventListener("pointerdown", (e) => {
      const siblings = [...e.currentTarget.parentElement.children];
      siblings.forEach((el) => el.classList.toggle("hidden"));
    });
  }

  // Add listeners to operate matchems
  let selectables = document
    .getElementById(target)
    .getElementsByClassName("selectable");
  for (let i = 0; i < selectables.length; i++) {
    selectables[i].addEventListener("pointerdown", (e) => {
      checkMatch(e.target, selected);
    });
  }
};

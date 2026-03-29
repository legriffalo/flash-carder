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

function getRandomValues(data, count = 3) {
  const values = Object.values(data);
  return values.sort(() => 0.5 - Math.random()).slice(0, count);
}

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
                       </div>`;

  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let answer = answers[i];
    let card_no = i;

    console.log(question, answer);

    document.getElementById(target).innerHTML +=
      `<div class = "flashcard ${i == 0 ? "" : "hidden"}" data-cardno = "card_no${card_no}">
        <div class = "flippable flash-question">${question}</div>
        <div class = "flippable flash-answer hidden" >${answer}</div>
        </div>`;
  }

  activateListeners("practice");

  return 1;
};

function changeflashcard(dir) {
  const cards = Array.from(document.querySelectorAll(".flashcard"));
  const currentIndex = cards.findIndex(
    (card) => !card.classList.contains("hidden"),
  );
  const nextIndex = (currentIndex + dir + cards.length) % cards.length;
  cards.forEach((card, index) => {
    card.classList.toggle("hidden", index !== nextIndex);
  });
}

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
      `<div class = "flashlist" data-cardno = "card_no${card_no}">
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

const buildOneToFour = (target, data, dir) => {
  const [questions, answers] =
    dir === 1
      ? [Object.keys(data), Object.values(data)]
      : [Object.values(data), Object.keys(data)];

  let new_data = Object.fromEntries(
    questions.map((question, index) => [question, answers[index]]),
  );

  const target_el = document.getElementById(target);
  // now we build the set up
  questions.forEach((question) => {
    let i = questions.indexOf(question);
    options = "";
    true_answer = new_data[question];
    let data_copy = { ...new_data };
    delete data_copy[question];
    let answers = getRandomValues(data_copy, 3);
    answers.push(true_answer);
    answers = randomise(answers);

    answers.forEach((answer) => {
      options += `<div class = "one-to-four-option ${answer == new_data[question] ? "correct-choice" : "not"}"> ${answer} </div>`;
    });

    target_el.innerHTML += `<div class = "one-to-four ${i == 0 ? "" : "hidden"}">
                              <div class = "one-to-four-question">${question}</div>
                              <div class = "one-to-four-answer">
                                ${options}
                              </div>
                            </div>`;
  });
  activateListeners("practice");
  score = 0;
  return 1;
};

const buildTypingTask = (target, data, dir) => {
  const target_el = document.getElementById(target);
  console.log("chose type typing");
  const [questions, answers] =
    dir === 1
      ? [Object.keys(data), Object.values(data)]
      : [Object.values(data), Object.keys(data)];

  let new_data = Object.fromEntries(
    questions.map((question, index) => [question, answers[index]]),
  );
  questions.forEach((question) => {
    let i = questions.indexOf(question);
    target_el.innerHTML += `<div class = "typing-task ${i == 0 ? "" : "hidden"}">
                              <div id = "question-window" class = "typing-questions">${question}</div>
                              
                              <div class = "hidden correct-answer-typing">${new_data[question]}</div>`;
  });

  target_el.innerHTML += `<div class = "typing-input">
                                <input id = "answer-input" type="text" placeholder="answer"></input>
                              </div>
                          <div id = "submit_writing" class = "typing-submit">check</div>`;

  activateListeners("practice");
  score = 0;
  return 1;
};

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
    typing: () => buildTypingTask("show_zone", flashCards[`${selectedSet}`], 1),
    typing2: () =>
      buildTypingTask("show_zone", flashCards[`${selectedSet}`], 0),
  };

  actions[e.target.id]();
  console.log("picked", e.target.id);
  hideShow("task_menu");
}

// check 1-2-4 is correct
const checkOneToFourCorrect = (el) => {
  el.classList.contains("correct-choice")
    ? showNextOneToFourquestion()
    : (wrong += 1);
  console.log(score, wrong);
};

const showNextOneToFourquestion = () => {
  score += 1;
  const questions = Array.from(document.querySelectorAll(".one-to-four"));
  const currentIndex = questions.findIndex(
    (question) => !question.classList.contains("hidden"),
  );
  const nextIndex = currentIndex + 1;
  console.log(nextIndex, questions.length);
  nextIndex == questions.length
    ? (() => {
        scores[selectedSet] =
          `${score}/${Object.keys(flashCards[selectedSet]).length + wrong}`;
        saveData();
      })()
    : questions.forEach((card, index) => {
        card.classList.toggle("hidden", index !== nextIndex);
      });
};

// check if type task is correct
const checkTypingTask = () => {
  const selectedQuestion = [
    ...document.querySelectorAll(".typing-task"),
  ].filter((el) => !el.classList.contains("hidden"))[0];

  let correctAnswer = selectedQuestion.getElementsByClassName(
    "correct-answer-typing",
  )[0].textContent;
  inputAnswer = document.getElementById("answer-input").value;
  console.log(inputAnswer, correctAnswer);
  // let check = inputAnswer == correctAnswer ? true : false;
  return inputAnswer == correctAnswer;
};

const showNextTypingQuestion = () => {
  score += 1;
  document.getElementById("answer-input").value = "";
  const questions = Array.from(document.querySelectorAll(".typing-task"));
  const currentIndex = questions.findIndex(
    (question) => !question.classList.contains("hidden"),
  );
  const nextIndex = currentIndex + 1;
  console.log(nextIndex, questions.length);
  nextIndex == questions.length
    ? (() => {
        scores[selectedSet] =
          `${score}/${Object.keys(flashCards[selectedSet]).length + wrong}`;
        saveData();
      })()
    : questions.forEach((card, index) => {
        card.classList.toggle("hidden", index !== nextIndex);
      });
};

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
    saveData();
  } else {
  }
};
//activate eventListeners for tasks
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

  const left = document.getElementById("flash-left");
  const right = document.getElementById("flash-right");

  left?.addEventListener("pointerdown", () => {
    changeflashcard(-1);
  });
  right?.addEventListener("pointerdown", () => {
    changeflashcard(-1);
  });

  // Add listeners to operate matchems
  let selectables = document
    .getElementById(target)
    .getElementsByClassName("selectable");
  for (let i = 0; i < selectables.length; i++) {
    selectables[i].addEventListener("pointerdown", (e) => {
      checkMatch(e.target, selected);
    });
  }

  // Add listeners to handle 1 to 4
  let answer_options = document
    .getElementById(target)
    .getElementsByClassName("one-to-four-option");

  for (let i = 0; i < answer_options.length; i++) {
    answer_options[i].addEventListener("pointerdown", (e) => {
      checkOneToFourCorrect(e.target);
    });
  }

  // Add listeners for spelling task
  let submitButton = document.getElementById("submit_writing");

  if (submitButton) {
    submitButton.addEventListener("pointerdown", (e) => {
      console.log(checkTypingTask());

      checkTypingTask()
        ? (() => {
            console.log("GOT TRUE");
            showNextTypingQuestion();
          })()
        : (wrong += 1);
    });
  }
  console.log("All listeners added");
};

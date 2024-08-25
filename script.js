const checkBoxList = document.querySelectorAll('.check-box');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const progressLabel = document.querySelector('.progress-label');
const downQuotes = document.querySelector('.quote');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');

const allQuotes = [
  'Raise the bar by completing your goals!',
  'well begun is half done!',
  'Just a step away, keep going!',
  'Good! keep doing! 😉',
  'Whoa! You just completed all the goals, time for chill 😀',
];

const allDownQuotes = [
  '"Move one step ahead, today!"',
  'You doing great job!!!',
  'Keep going! you are making great progress (•_•)',
  'Just a step away, keep going! ⁂',
  'Whoa! You just completed all the goals, time for chill 😀',
];

// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// };

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];
downQuotes.innerText = allDownQuotes[completedGoalsCount];
errorLabel.innerText = `Please set all the ${inputFields.length} goals!`;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const goalValue = [...inputFields].every((input) => {
      return input.value;
    });
    if (goalValue) {
      checkbox.parentElement.classList.toggle('completed');
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      downQuotes.innerText = allDownQuotes[completedGoalsCount];
      errorLabel.innerText = `Please set all the ${inputFields.length} goals!`;
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
    } else {
      progressBar.classList.add('show-error');
    }
  });
});

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed');
    }
  }

  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error');
  });

  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }
    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
});

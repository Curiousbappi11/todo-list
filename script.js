let createButton = document.querySelector('#create-button');
let inputTask = document.querySelector('#input-task');
let form = document.querySelector('form');
let editLi = null;
let count = 0;
let progressCount = document.querySelector('#progress-count');
let ul = document.querySelector('.ul');
let progressBar = document.querySelector('#myBar');
let percentage = 0;
const clapSound = new Audio('https://www.soundjay.com/human/applause-8.mp3');

function saveToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.ul li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('li-completed')
        });
    });
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('todoTasks');
    if (!saved) return;

    const tasks = JSON.parse(saved);
    tasks.forEach(task => {
        inputTask.value = task.text;
        addOrEditList(); // this adds the task

        // set as completed if needed
        if (task.completed) {
            const lastLi = ul.lastElementChild;
            const checkBox = lastLi.querySelector('.check-mark');
            checkBox.click(); // simulate click to apply toggle logic
        }
    });
    inputTask.value = '';
}

function updateProgressCount() {
    let total = ul.childElementCount;
    let taskCompleted = ul.querySelectorAll('.li-completed').length;
    progressCount.innerText = `${taskCompleted}/${total}`;
    percentage = (taskCompleted / total) * 100;
    if (percentage === 0) {
        progressBar.style = `width : 4%`;
    } else {
        progressBar.style = `width : ${percentage}%`;
    }
    if (percentage === 100) {
        hurray();
        clapSound.play();
    }
}

function addOrEditList() {
    let inputText = inputTask.value.trim();
    if (!inputText) {
        form.reset();
        return;
    }
    if (editLi) {

        editLi.querySelector('span').innerText = inputText;

        const checkBox = editLi.querySelector('.check-mark');
        checkBox.classList.add('fa-circle');
        checkBox.classList.remove('fa-circle-check');

        const text = editLi.querySelector('span');
        text.classList.remove('text-completed');

        editLi.classList.add('li-pending')
        editLi.classList.remove('li-completed')

        editLi = null;
        saveToLocalStorage();

    } else {

        let list = document.createElement('li');
        list.classList.add('li-pending');
        let ul = document.querySelector('.ul');
        ul.appendChild(list);

        let checkBox = document.createElement('i');
        checkBox.classList.add('check-mark', 'fa-regular', 'fa-circle');
        list.appendChild(checkBox);

        let text = document.createElement('span');
        text.innerText = inputText;
        list.appendChild(text);

        let editButton = document.createElement('i');
        editButton.classList.add('edit-button', 'fa-regular', 'fa-pen-to-square');
        list.appendChild(editButton);

        let deleteButton = document.createElement('i');
        deleteButton.classList.add('delete-button', 'fa-regular', 'fa-circle-xmark');
        list.appendChild(deleteButton);

        checkBox.addEventListener('click', () => {
            checkBox.classList.toggle('fa-circle');
            checkBox.classList.toggle('fa-circle-check');
            text.classList.toggle('text-completed');
            list.classList.toggle('li-completed')
            list.classList.toggle('li-pending')
            updateProgressCount();
            saveToLocalStorage();
        });

        editButton.addEventListener('click', () => {
            inputTask.value = text.innerText;
            editLi = list;
        });

        deleteButton.addEventListener('click', () => {
            list.remove(); // Remove the parent <li> element
            updateProgressCount();
            saveToLocalStorage();
        });

    }
    form.reset();
    updateProgressCount();
    saveToLocalStorage();
}

createButton.addEventListener('click', () => {
    addOrEditList();
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    addOrEditList();
});

loadFromLocalStorage();

function hurray() {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

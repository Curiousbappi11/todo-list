let createButton = document.querySelector('#create-button');
let inputTask = document.querySelector('#input-task');
let form = document.querySelector('form');
let editLi = null;

function addOrEditList() {
    let inputText = inputTask.value.trim();
    if (!inputText) {
        form.reset();
        return;
    }
    if (editLi) {

        editLi.querySelector('span').innerText = inputText;

        
        
            // editLi.classList.remove('li-completed');
            // editLi.classList.add('li-pending');
        
            // const checkBox = editLi.querySelector('.check-mark');
            // checkBox.classList.remove('fa-circle-check');
            // checkBox.classList.add('fa-circle');
        
            // editLi.querySelector('span').classList.remove('text-completed');
        
            // editLi = null;
        
        
        const checkBox = editLi.querySelector('.check-mark');
        checkBox.classList.add('fa-circle');
        checkBox.classList.remove('fa-circle-check');
        
        const text = editLi.querySelector('span');
        text.classList.remove('text-completed');
        
        editLi.classList.add('li-pending')
        editLi.classList.remove('li-completed')
        
        editLi = null;
        
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
        });

        editButton.addEventListener('click', () => {
            inputTask.value = text.innerText;
            editLi = list;
        });

        deleteButton.addEventListener('click', () => {
            list.remove(); // Remove the parent <li> element
        });

    }
    form.reset();
}

createButton.addEventListener('click', () => {
    addOrEditList();
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    addOrEditList();
});



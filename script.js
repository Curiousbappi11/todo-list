let createButton = document.querySelector('#create-button');
let flag = true;

function addList() {
    let inputText = document.querySelector('#input-task').value.trim();
    if (inputText) {

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
            console.log(checkBox);
        });

        editButton.addEventListener('click', () => {
            flag = false;
            document.querySelector('#input-task').value = text.innerHTML;
            createButton.addEventListener('click', () => {
                let updatedText = document.querySelector('#input-task').value.trim();
                text.innerHTML = updatedText;
                console.log(updatedText);
                flag = true;
            })
            document.querySelector('#input-task').value = text.innerHTML;
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                let updatedText = document.querySelector('#input-task').value.trim();
                text.innerHTML = updatedText;
                console.log(updatedText);
                flag = true;
            })
        });

        deleteButton.addEventListener('click', () => {
            list.remove(); // Remove the parent <li> element
        });

    }
}


createButton.addEventListener('click', () => {
    if (flag) {
        addList();
        form.reset();
    }
});

let form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (flag) {
        addList();
        form.reset();
    }
})

let form = document.querySelector('form')
let inputTask = document.querySelector('#input-task');
let createButton = document.querySelector('#create-button');
let allList = document.querySelector('.all-lists');
let ulList = allList.children[0];

function addList() {
    if (inputTask.value == '') {

    } else {
        let list = document.createElement('li');
        list.innerHTML = `
        <i class="check-mark fa-regular fa-circle-check"></i>
        <span>${inputTask.value}</span>
        <i class="edit-button fa-regular fa-pen-to-square"></i>
        <i class="delete-button fa-regular fa-circle-xmark"></i>
    `;
        ulList.appendChild(list);
    }
    form.reset();
}

createButton.addEventListener('click', () => {
    addList();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addList()
});
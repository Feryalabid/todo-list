const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

function addTodo(event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const newTodo = {
            text: todoText,
            done: false
        };

        todos.push(newTodo);
        todoInput.value = '';
        displayTodos();
    }
}

function displayTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (todo.done) {
            todoItem.classList.add('done');
        }

        todoItem.innerHTML = `
            <div>
                <input type="checkbox" ${todo.done ? 'checked' : ''} data-index="${index}">
                <span>${todo.text}</span>
            </div>
            <div class="actions">
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </div>
        `;

        todoList.appendChild(todoItem);
    });
}

todoList.addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
        const index = event.target.dataset.index;
        todos[index].done = event.target.checked;
        displayTodos();
    }
});

todoList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        const index = event.target.dataset.index;
        todos.splice(index, 1);
        displayTodos();
    }

    if (event.target.classList.contains('edit')) {
        const index = event.target.dataset.index;
        const todo = todos[index];

        todoInput.value = todo.text;

        todos.splice(index, 1);
        displayTodos();

        todoForm.querySelector('button').textContent = 'Save Todo';

        todoForm.removeEventListener('submit', addTodo);
        todoForm.addEventListener('submit', function saveEditedTodo(event) {
            event.preventDefault();

            const updatedText = todoInput.value.trim();
            if (updatedText !== '') {
                todo.text = updatedText;
                todoForm.querySelector('button').textContent = 'Add Todo';
                todoForm.removeEventListener('submit', saveEditedTodo);
                todoForm.addEventListener('submit', addTodo);
                displayTodos();
            }
        });
    }
});

todoForm.addEventListener('submit', addTodo);

displayTodos();
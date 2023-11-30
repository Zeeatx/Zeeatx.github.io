let tasks = [];
let editIndex = -1;

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;

    if (taskName && taskDescription) {
        if (editIndex === -1) {
            const task = {
                name: taskName,
                description: taskDescription
            };
            tasks.push(task);
        } else {
            tasks[editIndex].name = taskName;
            tasks[editIndex].description = taskDescription;
            editIndex = -1; 
        }

        displayTasks();
        clearForm();
    }
}

function displayTasks() {
    const taskListContainer = document.getElementById('taskList');
    taskListContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        if (index === editIndex) {
            taskElement.classList.add('editing');
        }

        taskElement.innerHTML = `
            <div>
                <strong>${task.name}</strong>
                <p>${task.description}</p>
            </div>
            <div>
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;
        taskListContainer.appendChild(taskElement);
    });

    const addButton = document.getElementById('addButton');
    addButton.textContent = editIndex === -1 ? 'Agregar Tarea' : 'Aceptar Cambios';
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;
    editIndex = index;
    displayTasks(); 
}

function deleteTask(index) {
    tasks.splice(index, 1);
    if (index === editIndex) {
        editIndex = -1;
    }

    displayTasks();
    clearForm();
}

function clearForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
}
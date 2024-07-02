let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const allTasksContainer = document.getElementById('allTasks');
    const activeTasksContainer = document.getElementById('activeTasks');
    const completedTasksContainer = document.getElementById('completedTasks');

    allTasksContainer.innerHTML = '';
    activeTasksContainer.innerHTML = '';
    completedTasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
                <label class="form-check-label" for="task${index}">
                    ${task.name}
                </label>
            </div>
        `;

        if (!task.completed) {
            allTasksContainer.innerHTML += taskElement;
            activeTasksContainer.innerHTML += taskElement;
        } else {
            allTasksContainer.innerHTML += taskElement;
            completedTasksContainer.innerHTML += taskElement;
        }
    });
}

function addTask() {
    const newTaskInput = document.getElementById('newTaskInput');
    const taskName = newTaskInput.value.trim();

    if (taskName !== '') {
        const newTask = {
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        newTaskInput.value = '';
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function deleteAll() {
    tasks = [];
    saveTasks();
    renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

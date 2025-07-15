let newTask = document.getElementById('newTask');
let taskInput = document.getElementById('taskInput');
let taskList = document.querySelector('.tasklist');
let progressBar = document.getElementById('progress');
let numbers = document.getElementById('numbers');


let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const stored = localStorage.getItem('tasks');
    if(stored){
        tasks = JSON.parse(stored);
        updateTaskList();
        updateStats();
    }
}
 
taskList.classList.add('hide');

const addTask = () => {

    const text = taskInput.value.trim();

    if(text){
        tasks.push({text: text, completed: false})
        taskInput.value = '';
        updateTaskList();
        updateStats();
        saveTasks();
    }
    
}

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const editTask = (index)=> {
    taskInput.value = tasks [index].text;
    tasks.splice(index, 1); 
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = () => {

    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;

    progressBar.style.width = `${progress}%`;

    numbers.innerText = `${completeTasks} / ${totalTasks}`;

}

const updateTaskList = () => {
    taskList.innerHTML = '';

    if(tasks.length === 0){
        taskList.classList.add('hide');
    }
    else{
        taskList.classList.remove('hide');
    }

    tasks.forEach((task , index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed':''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked':''}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <button id="editBtn" class="editBtn"><img src="edit.png"/></button>
                <button id="deleteBtn" class="deleteBtn"><img src="delete.png"/></button>
            </div>
        </div>
        `;
        
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));

        const editBtn = listItem.querySelector('.editBtn');
        editBtn.addEventListener('click', () => editTask(index));

        const deleteBtn = listItem.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => deleteTask(index));
        
        taskList.appendChild(listItem);
    })
}

newTask.addEventListener('click', function(e){
    e.preventDefault();
    addTask();
})

window.onload = loadTasks;
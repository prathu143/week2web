let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    tasks = savedTasks;
  }
  renderTasks();
}

// Render tasks in the task list
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '<h2>Your Tasks</h2>'; // Reset list

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task', task.priority);
    if (task.completed) {
      taskDiv.classList.add('completed');
    }
    if (task.commitment) {
      taskDiv.classList.add('commitment');
    }

    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Due:</strong> ${task.dueDate}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      
      <div class="task-actions">
        <button class="action-btn" onclick="toggleCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="action-btn" onclick="editTask(${index})">Edit</button>
        <button class="action-btn" onclick="deleteTask(${index})">Delete</button>
        <button class="commitment-btn" onclick="toggleCommitment(${index})">${task.commitment ? 'Uncommit' : 'Commit'}</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Add a new task
function addTask() {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const dueDate = document.getElementById('task-date').value;
  const priority = document.getElementById('task-priority').value;

  if (!title || !description || !dueDate || !priority) {
    alert('Please fill in all fields');
    return;
  }

  const newTask = {
    title,
    description,
    dueDate,
    priority,
    completed: false,
    commitment: false,
  };

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();

  // Reset form
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('task-priority').value = 'low';
}

// Toggle task completion
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Edit task
function editTask(index) {
  const task = tasks[index];
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-desc').value = task.description;
  document.getElementById('task-date').value = task.dueDate;
  document.getElementById('task-priority').value = task.priority;

  deleteTask(index); // Delete the task after loading its data for editing
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Toggle commitment
function toggleCommitment(index) {
  tasks[index].commitment = !tasks[index].commitment;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Search tasks
function searchTasks() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
  );
  renderFilteredTasks(filteredTasks);
}

// Render filtered tasks
function renderFilteredTasks(filteredTasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '<h2>Your Tasks</h2>'; // Reset list

  filteredTasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task', task.priority);
    if (task.completed) {
      taskDiv.classList.add('completed');
    }
    if (task.commitment) {
      taskDiv.classList.add('commitment');
    }

    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Due:</strong> ${task.dueDate}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      
      <div class="task-actions">
        <button class="action-btn" onclick="toggleCompletion(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="action-btn" onclick="editTask(${index})">Edit</button>
        <button class="action-btn" onclick="deleteTask(${index})">Delete</button>
        <button class="commitment-btn" onclick="toggleCommitment(${index})">${task.commitment ? 'Uncommit' : 'Commit'}</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Load tasks on page load
window.onload = loadTasks;


const taskName = document.getElementById('taskName').value;
const taskDifficulty = document.getElementById('taskDifficulty').value;
const taskImportance = document.getElementById('taskImportance').value;

const form = document.getElementById('taskForm');
const saveBtn = document.getElementById('saveBtn');
const taskList = document.getElementById('taskList')

form.addEventListener("submit", function(e) {
    e.preventDefault();
    fetch("/tasks", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: taskName,
        difficulty: taskDifficulty,
        importance: taskImportance
    })
})

});

async function loadTasks() {
    const res = await fetch("/tasks");
    const tasks = await res.json();
    const container = document.getElementById("taskList");

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.name} | Difficulty: ${task.difficulty} | Importance: ${task.importance}`;
        container.appendChild(li);
    });
}

loadTasks();
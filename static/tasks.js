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


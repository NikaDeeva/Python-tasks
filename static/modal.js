function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function saveTask() {
    const title = document.getElementById("modalTaskInput").value;

    fetch("/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title})
    }).then(() => {
        closeModal();
        loadTasks();
    });
}

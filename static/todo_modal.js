

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    saveBtn: document.getElementById('save-btn'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

   refs.saveBtn.addEventListener('click', toggleModal);

  refs.modal.addEventListener('click', function (event) {
    if (event.target === refs.modal) {
      toggleModal();
    }
  });

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
  }
})();



// async function loadTasks() {
//     const res = await fetch("/tasks");
//     const tasks = await res.json();
//     const container = document.getElementById("taskList");

//     tasks.forEach(task => {
//         const li = document.createElement("li");
//         li.textContent = `${task.name} | Difficulty: ${task.difficulty} | Importance: ${task.importance}`;
//         container.appendChild(li);
//     });
// }

// loadTasks();

// document.getElementById('saveTaskBtn').addEventListener('click', async () => {
// const taskName = document.getElementById('taksName').value;
// const taskDifficulty = document.getElementById('taksDifficulty').value;
// const taskImportance = document.getElementById('taksImportance').value;

// await fetch("/tasks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, difficulty, importance })
//     });
//     loadTasks();
// });
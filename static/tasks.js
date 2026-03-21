document.addEventListener("DOMContentLoaded", () => {
    const refs = {
        openModalBtn: document.querySelector('[data-modal-open]'),
        closeModalBtn: document.querySelector('[data-modal-close]'),
        saveBtn: document.getElementById('saveTaskBtn'), // зверни увагу на правильний id
        modal: document.querySelector('[data-modal]'),
    };

    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);
    refs.saveBtn.addEventListener('click', toggleModal)

    const form = document.getElementById('taskForm');

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const taskName = document.getElementById('taskName').value;
        const taskDifficulty = document.getElementById('taskDifficulty').value;
        const taskImportance = document.getElementById('taskImportance').value;

        fetch("/add_task", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: taskName,
                difficulty: taskDifficulty,
                importance: taskImportance
            })
        })
        .then(res => res.json())
        .then(data => {
            addTaskToList(taskName, data.id, data.completed);
            toggleModal();
            form.reset();
        });
    });

    function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
        document.body.classList.toggle('no-scroll');
    }

    function addTaskToList(name, id, completed) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.className = 'task__item'
        li.innerHTML = `
            <p class="task__name">${name}</p>
             <div class="task__btn-wrap">
        <button class="task__completed">Completed</button>
         <button class="task__delete">Delete</button>
    </div>
        `;
        li.setAttribute('data-id', id);
         li.querySelector(".task__delete").addEventListener("click", () => {
        const taskId = li.getAttribute("data-id");
        fetch(`/delete_task/${taskId}`, { method: "DELETE" })
            .then(() => li.remove());
    });
    li.setAttribute('data-completed', completed);
   li.querySelector(".task__completed").addEventListener("click", () => {
    const taskId = li.getAttribute("data-id"); 
    fetch(`/complete_task/${taskId}`, { method: "PATCH" })
        .then(res => res.json())
        .then(() => {
            li.classList.add("done"); 
            li.setAttribute('data-completed', true); 
        });
});
        taskList.appendChild(li);
    }
});

const impSortBtn = document.getElementById('impSortBtn');
const difSortBtn = document.getElementById('difSortBtn');

// function sortByImportance(){
// fetch('/get_tasks', method='GET')
// .then(res => res.json())
// .then(data => ())
// }
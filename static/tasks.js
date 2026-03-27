document.addEventListener("DOMContentLoaded", () => {
   const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    saveBtn: document.getElementById('saveTaskBtn'),
    modal: document.querySelector('[data-modal]')
};

// Відкриття модалки
refs.openModalBtn.addEventListener('click', toggleModal);

// Закриття модалки по хрестику
refs.closeModalBtn.addEventListener('click', toggleModal);

// Закриття модалки по кнопці Save
refs.saveBtn.addEventListener('click', toggleModal);

// Закриття модалки по кліку на фон (backdrop)
refs.modal.addEventListener('click', (e) => {
    if (e.target === refs.modal) { // перевіряємо, що клік саме на фон
        toggleModal();
    }
});

// Форма додавання задачі
const form = document.getElementById('taskForm');
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDifficulty = document.getElementById('taskDifficulty').value;
    const taskImportance = document.getElementById('taskImportance').value;

    if(taskName !== '' | taskDifficulty !== '' | taskImportance !== ''){
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
        toggleModal(); // закриваємо модалку після додавання задачі
        form.reset();
    });
    }

   else{
    alert('Please, fill all the gaps');
   }
});

// Функція відкриття/закриття модалки
function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
}

    function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
        document.body.classList.toggle('no-scroll');
    }


    function addTaskToList(name, id, completed) {
        const tasksNum = document.getElementById('tasksNum');
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.className = 'task__item';
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
            .then(() => li.remove())
            .then(() => getTasksNum().then(num => tasksNum.textContent = num))
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
if (name){
taskList.appendChild(li);
getTasksNum().then(num => tasksNum.textContent = num);
}
        else{
            alert('Please, enter a task')
        }

    };
async function getTasksNum() {
    const tasks = await fetch('/get_tasks');
    const data = await tasks.json();
    return data.length;
    
}

    const impSortBtn = document.getElementById('impSortBtn');
const difSortBtn = document.getElementById('difSortBtn');

function sortByImportance(){
    fetch('/get_tasks')
    .then(res => res.json())
    .then(data => {
        data.sort((a, b) => b.importance - a.importance);
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ""; 
        data.forEach(task => {
            addTaskToList(task.name, task.id, task.completed);
        });
    });
};

impSortBtn.addEventListener('click', sortByImportance)

function sortByDifficulty(){
    fetch('/get_tasks')
    .then(res => res.json())
    .then(data => {
        data.sort((a, b) => b.difficulty - a.difficulty);
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = "";
        data.forEach(task => {
            addTaskToList(task.name, task.id, task.completed);
        });
    });
};

difSortBtn.addEventListener('click', sortByDifficulty);

fetch('/get_tasks')
.then(res => res.json())
.then(data => {
    data.forEach(task => {
        addTaskToList(task.name, task.id, task.completed);
    });
});
});


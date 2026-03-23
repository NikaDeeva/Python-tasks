document.addEventListener("DOMContentLoaded", () => {
const refs = {
        openModalBtn: document.querySelector('[data-modalHabit-open]'),
        closeModalBtn: document.querySelector('[data-modalHabit-close]'),
        modal: document.querySelector('[data-modalHabit]'),
        saveBtn: document.querySelector('[data-modalHabit-save]')
    };

    // Відкриття модалки
    refs.openModalBtn.addEventListener('click', toggleModal);

    // Закриття модалки по хрестику
    refs.closeModalBtn.addEventListener('click', toggleModal);

    // Закриття модалки по кліку на фон (backdrop)
    refs.modal.addEventListener('click', (e) => {
        if (e.target === refs.modal) { // перевіряємо, що клік саме на фон
            toggleModal();
        }
    });

    const form = document.getElementById('habitForm');

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const habitName = document.getElementById('habitName').value;
        const habitCathegory = document.getElementById('habitCategory').value;

        fetch("/add_habit", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: habitName,
                cathegory: habitCathegory
            })
        })
        .then(res => res.json())
        .then(data => {
            addHabitToList(habitName, data.id, data.completed, habitCathegory);
            toggleModal(); // закриваємо модалку після додавання
            form.reset();
        });
    });

    function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
        document.body.classList.toggle('no-scroll');
    }
});


const cathegories = {
  health: document.getElementById('healthHabList'),
  study: document.getElementById('studyHabList'),
  personalGrowth: document.getElementById('growthHabList'),  
  dailyRoutine: document.getElementById('routineHabList'),
  hobbies: document.getElementById('hobbiesHabList'),          
  productivity: document.getElementById('productivityHabList')
};

   

function addHabitToList(name, id, completed, cathegory){

const li = document.createElement('li');
li.className = 'habits__item'
li.innerHTML = `<p class="habit__name">${name}</p>
 <div class="habit__btn-wrap">
        <button class="habit__completed">Completed</button>
         <button class="habit__delete">Delete</button>
    </div>`;
      li.setAttribute('data-id', id);
         li.querySelector(".habit__delete").addEventListener("click", () => {
        const habitId = li.getAttribute("data-id");
        fetch(`/delete_habit/${habitId}`, { method: "DELETE" })
            .then(() => li.remove());
    });
    li.setAttribute('data-completed', completed);
   li.querySelector(".habit__completed").addEventListener("click", () => {
    const habitId = li.getAttribute("data-id"); 
    fetch(`/complete_habit/${habitId}`, { method: "PATCH" })
        .then(res => res.json())
        .then(() => {
            li.classList.add("done"); 
            li.setAttribute('data-completed', true); 
        });
});
const list = cathegories[cathegory]; 
if (list) {                         
    list.appendChild(li);            
} 

}



fetch('/get_habits')
.then(res => res.json())
.then(data => {
    data.forEach(habit => {
        addHabitToList(habit.name, habit.id, habit.completed, habit.cathegory);
    });
});

document.addEventListener("DOMContentLoaded", () => {
 const refs = {
    openModalBtn: document.querySelector('[data-modalHabit-open]'),
    closeModalBtn: document.querySelector('[data-modalHabit-close]'),
    modal: document.querySelector('[data-modalHabit]'),
    saveBtn: document.querySelector('[data-modalHabit-save]')
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

})
 
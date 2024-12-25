// Seleciona os elementos
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal-btn');


closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('active');
  }
});

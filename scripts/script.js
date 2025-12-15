const registrationBtn = document.querySelector('.registrationBtn');
const modal = document.querySelector('.modal');
const modalInner = document.querySelector('.modalInner');
const closeBtn = document.querySelector('.closeBtn');
const cancelBtn = document.querySelector('.cancelBtn');

const toggleModalWindow = () => {
  modal.classList.toggle('hiddenModal');
}

registrationBtn.addEventListener('click', toggleModalWindow);
modal.addEventListener('click', toggleModalWindow);
closeBtn.addEventListener('click', toggleModalWindow);
cancelBtn.addEventListener('click', toggleModalWindow);
modalInner.addEventListener('click', (e) => e.stopPropagation());

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    toggleModalWindow();
  }
});
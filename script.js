const checkboxes = [...document.querySelectorAll('.done-toggle input')];
const progressCount = document.querySelector('#progress-count');
const progressFill = document.querySelector('#progress-fill');

function updateProgress() {
  const completed = checkboxes.filter((checkbox) => checkbox.checked).length;
  progressCount.textContent = `${completed} / ${checkboxes.length}`;
  progressFill.style.width = `${(completed / checkboxes.length) * 100}%`;
  checkboxes.forEach((checkbox) => {
    checkbox.closest('.step-card').classList.toggle('complete', checkbox.checked);
  });
  localStorage.setItem('mpc3503-progress', JSON.stringify(checkboxes.map((checkbox) => checkbox.checked)));
}

try {
  const savedProgress = JSON.parse(localStorage.getItem('mpc3503-progress') || '[]');
  checkboxes.forEach((checkbox, index) => { checkbox.checked = Boolean(savedProgress[index]); });
} catch {
  // If browser storage is unavailable or malformed, the guide still works without saved progress.
}

checkboxes.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));
document.querySelector('#year').textContent = new Date().getFullYear();
updateProgress();

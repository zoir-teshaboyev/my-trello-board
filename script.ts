
const columns = document.querySelectorAll('.column');
const cards = document.querySelectorAll('.card');
const modal = document.getElementById('modal') as HTMLDivElement;
const newTaskInput = document.getElementById('new-task-text') as HTMLInputElement;
let currentColumn: HTMLElement | null = null;


let dragged: HTMLElement | null = null;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => {
    setupDragEvents(card as HTMLElement);
  });

  columns.forEach(column => {
    column.addEventListener('dragover', e => {
      e.preventDefault();
    });

    column.addEventListener('drop', e => {
      e.preventDefault();
      if (dragged) {
        column.appendChild(dragged);
        dragged = null;
      }
    });
  });
});

function addCard(onclick){
    
}
























function setupDragEvents(card: HTMLElement) {
  card.addEventListener('dragstart', () => {
    dragged = card;
    card.style.opacity = '0.5';
  });

  card.addEventListener('dragend', () => {
    card.style.opacity = '1';
  });
}

// Modal functions
function openModal(columnName: string) {
  modal.classList.remove('hidden');
  currentColumn = document.querySelector(`[data-column="${columnName}"]`);
  newTaskInput.value = '';
}

function closeModal() {
  modal.classList.add('hidden');
  currentColumn = null;
}

function addCard() {
  const value = newTaskInput.value.trim();
  if (value && currentColumn) {
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.draggable = true;
    newCard.textContent = value;
    setupDragEvents(newCard);
    currentColumn.insertBefore(newCard, currentColumn.querySelector('button'));
    closeModal();
  }
}

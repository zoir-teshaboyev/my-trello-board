/* script.ts */
var columns = document.querySelectorAll('.column');
var cards = document.querySelectorAll('.card');
var modal = document.getElementById('modal');
var newTaskInput = document.getElementById('new-task-text');
var currentColumn = null;
// Drag events
var dragged = null;
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card').forEach(function (card) {
        setupDragEvents(card);
    });
    columns.forEach(function (column) {
        column.addEventListener('dragover', function (e) {
            e.preventDefault();
        });
        column.addEventListener('drop', function (e) {
            e.preventDefault();
            if (dragged) {
                column.appendChild(dragged);
                dragged = null;
            }
        });
    });
});
function setupDragEvents(card) {
    card.addEventListener('dragstart', function () {
        dragged = card;
        card.style.opacity = '0.5';
    });
    card.addEventListener('dragend', function () {
        card.style.opacity = '1';
    });
}
// Modal functions
function openModal(columnName) {
    modal.classList.remove('hidden');
    currentColumn = document.querySelector("[data-column=\"".concat(columnName, "\"]"));
    newTaskInput.value = '';
}
function closeModal() {
    modal.classList.add('hidden');
    currentColumn = null;
}
function addCard() {
    var value = newTaskInput.value.trim();
    if (value && currentColumn) {
        var newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.draggable = true;
        newCard.textContent = value;
        setupDragEvents(newCard);
        currentColumn.insertBefore(newCard, currentColumn.querySelector('button'));
        closeModal();
    }
}

// --- VARIABLES BASE ---
const searchForm = document.forms[0];
const addForm = document.forms["add-ex"];
const list = document.querySelector('#ex-list ul');
const popup = document.querySelector('.popup');

let carpetaDestino = list; // Por defecto, la raíz

// --- BORRAR ---
list.addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    e.target.parentElement.remove();
  }
});

// --- FUNCIÓN DE OCULTAR ---
function activarOcultar(hideBox) {
  hideBox.addEventListener('change', function() {
    let subList;
    const carpetaLi = hideBox.closest('li');
    if (carpetaLi) {
      subList = carpetaLi.querySelector('ul');
    } else {
      subList = document.querySelector('#ex-list > ul');
    }
    if (subList) subList.style.display = hideBox.checked ? 'none' : 'initial';
  });
}

// Activar los existentes
document.querySelectorAll('.hide').forEach(activarOcultar);

// --- POPUP ---
// Cuando se hace clic en el "+"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('plusBtn')) {
    const carpetaLi = e.target.closest('li');
    if (carpetaLi) {
      carpetaDestino = carpetaLi.querySelector('ul'); // ul interno de esa carpeta
    } else {
      carpetaDestino = list; // raíz
    }
    popup.style.display = 'flex';
  }
});

// Cerrar popup
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target === popup) popup.style.display = 'none';
});

// --- AÑADIR ARCHIVO / CARPETA ---
addForm.querySelector("button").addEventListener('click', function(e) {
  e.preventDefault();

  const value = addForm.querySelector('input[type="text"]').value.trim();
  if (!value) return;

  const li = document.createElement('li');

  if (value.includes(".")) {
    // Archivo
    const ExName = document.createElement('span');
    const deleteBtn = document.createElement('span');
    ExName.textContent = value;
    deleteBtn.textContent = 'borrar';
    ExName.classList.add('name');
    deleteBtn.classList.add('delete');
    li.append(ExName, deleteBtn);
  } else {
    // Carpeta
    const carpetaDiv = document.createElement('div');
    carpetaDiv.classList.add('carpeta');

    const img = document.createElement('img');
    img.src = "carpeta.png";
    img.alt = "carpeta";
    img.width = 50;

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = value;

    const plus = document.createElement('h1');
    plus.classList.add('plusBtn');
    plus.textContent = "+";

    const label = document.createElement('label');
    label.textContent = "Ocultar carpetas";

    const hide = document.createElement('input');
    hide.type = "checkbox";
    hide.classList.add('hide');

    carpetaDiv.append(img, title, plus, label, hide);
    li.appendChild(carpetaDiv);

    const innerUl = document.createElement('ul');
    li.appendChild(innerUl);

    activarOcultar(hide);
  }

  // 🔥 Agregar al destino actual (carpeta donde se hizo clic)
  carpetaDestino.appendChild(li);

  // Reset del popup
  addForm.querySelector('input[type="text"]').value = "";
  popup.style.display = 'none';
});

// --- BUSCAR ---
const searchBar = document.forms['search-ex'].querySelector('input');
searchBar.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase();
  const exercises = list.getElementsByTagName('li');
  Array.from(exercises).forEach(exer => {
    const title = exer.firstElementChild.textContent.toLowerCase();
    exer.style.display = title.includes(term) ? 'block' : 'none';
  });
});

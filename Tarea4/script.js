// --- VARIABLES BASE ---
const searchForm = document.forms[0];
const addForm = document.forms["add-ex"];
const list = document.querySelector('#ex-list ul');
const popup = document.querySelector('.popup');

let carpetaDestino = list; // Por defecto, la raíz

// --- BORRAR ---
list.addEventListener('click', (e) => {
  // Verifica si se hizo clic en el botón de borrar
  if (e.target.classList.contains('delete')) {
    const item = e.target.closest('li'); // El <li> que contiene el elemento a borrar

    // Si no hay <li> (por ejemplo, carpeta raíz), no hacer nada
    if (!item) return;

    // Busca si tiene una sublista (<ul>) dentro
    const subList = item.querySelector('ul');

    // Caso 1: Es un archivo (no tiene <ul>)
    if (!subList) {
      item.remove();
      return;
    }

    // Caso 2: Es una carpeta vacía (tiene <ul> pero sin hijos <li>)
    if (subList.children.length == 0) {
      item.remove();
      return;
    }

    // Caso 3: Carpeta con contenido
    alert("No puedes borrar porque la carpeta no está vacía");
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

// Añadir archivo o carpeta
addForm.querySelector("button").addEventListener('click', function(e) {
  e.preventDefault();

  const value = addForm.querySelector('input[type="text"]').value.trim();
  if (!value) return;

  const li = document.createElement('li');

  if (value.includes(".")) {
    // Archivo
    const img = document.createElement('img');
    img.src = "archivo.png";
    img.width = 30;

    const ExName = document.createElement('span');
    ExName.textContent = value;
    ExName.classList.add('name');

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'borrar';
    deleteBtn.classList.add('delete');
    
    li.append(img, ExName, deleteBtn);
  } else {
    
    // Carpeta
    const carpetaDiv = document.createElement('div');
    carpetaDiv.classList.add('carpeta');

    const img = document.createElement('img');
    img.src = "carpeta.png";
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

    const deleteBtn = document.createElement('span'); 
    deleteBtn.textContent = 'borrar';
    deleteBtn.classList.add('delete');

    carpetaDiv.append(img, title, plus, label, hide, deleteBtn);
    li.appendChild(carpetaDiv);

    const innerUl = document.createElement('ul');
    li.appendChild(innerUl);

    activarOcultar(hide);
  }

  // Agregar al destino actual (carpeta donde se hizo clic)
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

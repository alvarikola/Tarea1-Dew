const searchForm = document.forms[0];
const addForm = document.forms["add-ex"];
const list = document.querySelector('#ex-list ul');
const popup = document.querySelector('.popup');

let carpetaDestino = list; // Por defecto, la raíz

// Borrar
list.addEventListener('click', (e) => {
  // Verifica si se hizo clic en el botón de borrar
  if (e.target.classList.contains('delete')) {
    const item = e.target.closest('li'); // El <li> que contiene el elemento a borrar

    // Si no hay <li> no hacer nada
    if (!item) return;

    // Busca si tiene una sublista (<ul>) dentro
    const subList = item.querySelector('ul');

    // Si es un archivo (no tiene <ul>)
    if (!subList) {
      item.remove();
      return;
    }

    // Si es una carpeta vacía (tiene <ul> pero sin hijos <li>)
    if (subList.children.length == 0) {
      item.remove();
      return;
    }

    // Si es una carpeta con contenido
    alert("No puedes borrar porque la carpeta no está vacía");
  }
});

// Ocultar
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

// Cuando se hace clic en el "+" (popup)
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
    const archivos = document.getElementsByClassName

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

  // Borrar datos del popup
  addForm.querySelector('input[type="text"]').value = "";
  popup.style.display = 'none';
});

// Buscar
const searchBar = document.forms['search-ex'].querySelector('input');

searchBar.addEventListener('input', (e) => {
  const term = e.target.value.trim().toLowerCase();

  const allLi = document.querySelectorAll('#ex-list ul li');
  allLi.forEach(li => {
    const titleEl = li.querySelector('.title'); // carpeta
    const nameEl = li.querySelector('.name'); // archivo

    let nombre = '';
    if (titleEl) {
      nombre = titleEl.textContent.toLowerCase();
    } 
    else if (nameEl) {
      nombre = nameEl.textContent.toLowerCase();
    }
    if (nombre.includes(term)) {
      // mostrar el elemento coincidente
      li.style.display = '';

      let parent = li.parentElement;
      while (parent && parent.tagName === 'UL') {
        parent.style.display = '';
        const parentLi = parent.parentElement;
        if (parentLi && parentLi.tagName === 'LI') parentLi.style.display = '';
        parent = parentLi ? parentLi.parentElement : null;
      }
    } else {
      // ocultar los que no coinciden
      li.style.display = 'none';
    }
  });
});


// Получаем все блоки tags на странице
const tags = document.querySelectorAll('.tags');
tags.forEach((tag) => {
	const plusBtn = tag.querySelector('.tags__plus');
	const popup = tag.querySelector('.tags__popup');
	const textarea = tag.querySelector('.tags__textarea');
	const count = tag.querySelector('.tags__count');
	const list = tag.querySelector('.tags__content-list');

	let tagsCount = 0;

	// Обработчик клика на кнопку tags__plus
	plusBtn.addEventListener('click', () => {
		popup.classList.toggle('show');
		const textarea = popup.querySelector('.tags__textarea');
		textarea.value = '';
	});

	// Обработчик ввода текста в textarea
	textarea.addEventListener('input', (e) => {
		const text = e.target.value.trim();
		const addBlock = popup.querySelector('.tags__content-add');
		if (!addBlock) {
			// Если блока tags__content-add еще нет, то создаем его
			const addBlock = document.createElement('div');
			addBlock.classList.add('tags__content-add');
			const addBtn = document.createElement('button');
			addBtn.classList.add('tags__name-add');
			addBtn.innerHTML = '+';
			const nameBlock = document.createElement('span');
			nameBlock.classList.add('tags__name');
			addBlock.appendChild(addBtn);
			addBlock.appendChild(nameBlock);
			popup.querySelector('.tags__content').appendChild(addBlock);
		}
		// Вставляем текст из textarea в блок tags__name
		const nameBlock = addBlock.querySelector('.tags__name');
		if(nameBlock){
			nameBlock.textContent = text;
		}

		// Обработчик клика на кнопку tags__name-add
		const nameAddBtn = popup.querySelector('.tags__name-add');
		if(nameAddBtn){
			nameAddBtn.addEventListener('click', () => {
				const addBlock = popup.querySelector('.tags__content-add');
				if (addBlock) {
					// Создаем новый блок tags__item и добавляем его в tags__content-list
					const itemBlock = document.createElement('button');
					itemBlock.classList.add('tags__item');
					const itemNameBlock = document.createElement('span');
					itemNameBlock.classList.add('tags__item-name');
					itemNameBlock.textContent = addBlock.querySelector('.tags__name').textContent;
					const dotsBlock = document.createElement('span');
					dotsBlock.classList.add('dots');
					dotsBlock.textContent = '+';
					itemBlock.appendChild(itemNameBlock);
					itemBlock.appendChild(dotsBlock);
					const listBlock = popup.querySelector('.tags__content-list');
					listBlock.appendChild(itemBlock);
					
					// Удаляем блок tags__content-add
					addBlock.remove();
				}
			});
		}
	});
	
  // Обработчик клика на документе
  document.addEventListener('click', (e) => {
    // Если клик был сделан за пределами блока tags
    if (!tag.contains(e.target)) {
      // Скрываем блок tags__popup
      popup.classList.remove('show');
    }
  });
});











// получаем элементы со страницы
const inputs = document.querySelectorAll('.tags-select__item-name');
const tagsSelect = document.querySelector('.tags-select');
const chooseBtn = tagsSelect.querySelector('.tags-select__choose');
const list = tagsSelect.querySelector('.tags-select__list');
const itemColors = tagsSelect.querySelectorAll('.tags-select__item-color');
const editBtns = tagsSelect.querySelectorAll('.tags-select__item-edit');
const acceptBtns = tagsSelect.querySelectorAll('.tags-select__item-accept');

// функция, которая Делает все интпуты не редактируемыми

function inputsDisabled(inputs) {
  inputs.forEach(input => {
    input.disabled = true;
  });
}


// функция, которая скрывает/показывает список
function toggleList() {
  list.classList.toggle('_active');
  chooseBtn.classList.toggle('_active');
}
// функция, которая скрывает список
function hideList() {
  list.classList.remove('_active');
  chooseBtn.classList.remove('_active');
}

// функция, которая переключает класс _active при клике на цветной элемент
function toggleActive(e) {
  const target = e.currentTarget;
  target.classList.toggle('_active');
}

// функция, которая делает input редактируемым и переключает кнопки
function makeEditable(e) {
	inputsDisabled(inputs);

  const target = e.currentTarget;
  const item = target.parentNode;
  const input = item.querySelector('.tags-select__item-name');
  input.disabled = false;
  input.focus();
  input.selectionStart = input.selectionEnd = input.value.length;
	editBtns.forEach(edit => edit.classList.remove('_hidden'));
	acceptBtns.forEach(edit => edit.classList.add('_hidden'));
  target.classList.add('_hidden');
  item.querySelector('.tags-select__item-accept').classList.remove('_hidden');
}

// функция, которая делает input нередактируемым и переключает кнопки
function makeUneditable(e) {
  const target = e.currentTarget;
  const item = target.parentNode;
  const input = item.querySelector('.tags-select__item-name');
  input.disabled = true;
  target.classList.add('_hidden');
  item.querySelector('.tags-select__item-edit').classList.remove('_hidden');
}

// добавляем обработчики событий на элементы
document.addEventListener('DOMContentLoaded', function() {
  inputsDisabled(inputs);
});

//Закрываем окно выбора тега если клик вне елемента
document.addEventListener('click', function(e) {
  const target = e.target;
  if (!list.contains(e.target) && !target.classList.contains('tags-select__choose')) {
    hideList();
  }
});


chooseBtn.addEventListener('click', toggleList);
itemColors.forEach(color => color.addEventListener('click', toggleActive));
editBtns.forEach(edit => edit.addEventListener('click', makeEditable));
acceptBtns.forEach(accept => accept.addEventListener('click', makeUneditable));









// Получите все элементы с классом tags-add
const tagsAdd = document.querySelectorAll(".tags-add");
const itemAddItems = document.querySelectorAll('.tags-add__item');

// Переберите все элементы и добавьте обработчик клика
tagsAdd.forEach(function (tagsAdd) {
  // Найдите кнопку с классом tags-add__plus внутри текущего элемента tags-add
  const button = tagsAdd.querySelector(".tags-add__plus");

  // Найдите элемент списка с классом tags-add__list внутри текущего элемента tags-add
  const list = tagsAdd.querySelector(".tags-add__list");

  // Добавьте обработчик клика кнопке
  button.addEventListener("click", function () {
    // Переключите класс _active для элемента списка
    list.classList.toggle("_active");
    button.classList.toggle("_active");
  });
});


// функция, которая переключает класс _active при клике на цветной элемент
function toggleActiveColor(e) {
  const target = e.currentTarget;
  target.querySelector(".tags-add__item-color").classList.toggle('_active');
}
itemAddItems.forEach(itemAdd => itemAdd.addEventListener('click', toggleActiveColor));
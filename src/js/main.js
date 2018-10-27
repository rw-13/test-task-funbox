// ---------MAIN.JS----------
document.addEventListener('DOMContentLoaded', function() {
	var targetBlocks = document.getElementsByClassName('banner');
	var targetLinks = document.getElementsByClassName('index__banner-order');

	// Клик по блоку banner
	for (var i = 0; i < targetBlocks.length; i++) {
		targetBlocks[i].addEventListener('click', function() {
			var attrValue = '';
			var blockDesc = this.parentElement.querySelector('.index__banner-desc');
			// parentContainer - index-item
			var parentContainer = this.parentElement;

			// Вешаем селектор на родителя активного элемента
			containerToggler(parentContainer);
			// Переключатель активность элемента
			this.classList.toggle('banner_active');
			// Показать описание элемента
			showDescription(parentContainer, attrValue);
		})
	}

	// Клик по ссылке под banner
	for (var i = 0; i < targetLinks.length; i++) {
		var targetLink = (targetLinks[i].getElementsByTagName('a')[0] !== 'undefined') ? targetLinks[i].getElementsByTagName('a')[0] : false;

		if (targetLink) {
			targetLink.addEventListener('click', function(event) {
				event.preventDefault();
				// Контейнер (index-item) элемента
				var parentContainer = event.target;
				var attrValue = '';

				do {
					var temp = parentContainer.parentElement;
					parentContainer = temp;
				} while ( !parentContainer.classList.contains('index__item') || !parentContainer.tagName.toLowerCase() === "body");
				containerToggler(parentContainer);
				parentContainer.firstElementChild.classList.toggle('banner_active');
				showDescription(parentContainer, attrValue);
			});
		}
	}

});

// Селектор родителя активного элемента
// elem - index__item
function containerToggler(elem) {
	if (elem.firstElementChild.classList.contains('banner_active'))
		elem.classList.remove('index__item_active');
	else
		elem.classList.add('index__item_active');
}

// Отобразить описание выбранного элемента
// elem - index__item
function showDescription(elem, value) {
	var blockDesc = elem.querySelector('.index__banner-desc');

	if (blockDesc && blockDesc.innerText === '') {
		attrValue = elem.firstElementChild.getAttribute('data-target') ? elem.firstElementChild.getAttribute('data-target') : 'Описание отсутствует';
		blockDesc.innerText = attrValue;
	}
}

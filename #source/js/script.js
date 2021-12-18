var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }

	if (location.hash) {
		var hsh = location.hash.replace('#', '');
		if ($('.popup-' + hsh).length > 0) {
			popupOpen(hsh);
		} else if ($('div.' + hsh).length > 0) {
			$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
		}
	}
	$('.wrapper').addClass('loaded');

	var act = "click";
	if (isMobile.iOS()) {
		var act = "touchstart";
	}

	let iconMenu = document.querySelector(".icon-menu");
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".menu__body");
	if (iconMenu) {
		iconMenu.addEventListener("click", function () {
			iconMenu.classList.toggle("active");
			body.classList.toggle("lock");
			menuBody.classList.toggle("active");
		});
	}

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}



//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});
function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.menu__body').hasClass('active')) {
		//$('body').data('scroll',$(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.menu__body').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			//$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});






//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});


$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});





$(function() {
       $("#ui-datepicker-div").wrap('<div style="position:absolute;top:0px;"></div>');

});

//Date picker
$( ".datepicker" ).datepicker({
	dateFormat: 'mm-dd-yy',
	constrainInput: false
});




/*динамический адаптив*/
if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) { },
		onHide: function ($element) { },
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}
$('.packageInt__item').hide();
$('.packageInt__item.f_'+1).show();
$('.packageInt__list').click(function(event) {
	var i=$(this).data('filter');
	$('.packageInt__item').hide();
	$('.packageInt__item.f_'+i).show();
	$('.packageInt__list').removeClass('active');
	$(this).addClass('active');
	return false;
});

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(params) {
		for (let index = 0; index < animItems.length; index++){
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			}else{
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');

				}
			}
		}
	}
	function offset(el){
		const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
		
	}
	setTimeout(() => {
		animOnScroll();
	}, 100);
}

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());


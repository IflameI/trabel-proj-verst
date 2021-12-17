//SLIDERS
if($('.cutsomize-why-client__slider').length>0){
	$('.cutsomize-why-client__slider').slick({
		//autoplay: true,
		//infinite: false,
		dots: false,
		arrows: false,
		accessibility:false,
		slidesToShow:2,
		autoplaySpeed: 3000,
		centerMode: true,
		centerPadding: '200px',
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 991.98,
			settings: {
				slidesToShow:1,
				centerPadding: '0',
			}
		}]
	});
}

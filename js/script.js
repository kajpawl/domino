'use strict'; 

// Dropdown mobile menu

var navbarMenu = document.getElementById('nav-menu');
var dropdownMenu = document.querySelector('#nav-menu ul');
var dropdownIcon = document.getElementById('dropdown-button');
var menuItems = document.querySelectorAll('#nav-menu li a');
var dropdownClasses = dropdownMenu.classList;
var menuClasses = navbarMenu.classList;

dropdownIcon.addEventListener('click', function() {
	overlay.classList.toggle('active');
	dropdownClasses.toggle('show');
});


menuItems.forEach(function(item) {
	item.addEventListener('click', function() {
		if (dropdownClasses.contains('show')) {
			overlay.classList.remove('active');
			dropdownClasses.remove('show');
		};
	});
});

// Scrolling functions

window.onscroll = function() {
	fixNavbar();
	loadSections();
	loadImages();
};

// Fixing the navbar

var fixedNavPosition = navbarMenu.offsetTop;
var fixNavbar = function() {
	var NAV_HEIGHT_DIFFERENCE = 60;
	if (window.pageYOffset > (fixedNavPosition + NAV_HEIGHT_DIFFERENCE)) {
		menuClasses.add('fixed');
	} else {
		menuClasses.remove('fixed');
	};
};

// Hero parralax

var background = document.querySelector('.scroll-background');
window.addEventListener('scroll', function() {
	var SCROLLSPEED = .5;
	background.style.top = (window.pageYOffset * SCROLLSPEED) + 'px';
});

// Hero 3d transform

var slogan = document.querySelector('header .slogan .translation-wrapper');
var backgroundListeners = [background, navbarMenu, document.querySelector('header .btn-primary')];

var runHeroTransform = function(item) {
	var SLOGAN_X_OFFSET = .013;
	var SLOGAN_Y_OFFSET = .013;
	var BG_X_ROTATE = .0013;
	var BG_Y_ROTATE = .0013;
	var BG_SCALE = 1.02;

	item.addEventListener('mousemove', function(event) {
		var pointerOffsetX = (window.innerWidth * .5) - event.pageX;
		var pointerOffsetY = (window.innerHeight * .5) - event.pageY;
		slogan.style.transform = 'translate(' + (-pointerOffsetX * SLOGAN_X_OFFSET) + 'px, '+ (-pointerOffsetY * SLOGAN_Y_OFFSET) + 'px)';
		background.style.transform = 'scale(' + BG_SCALE + ') rotateY(' + (-pointerOffsetX * BG_Y_ROTATE) + 'deg) rotateX(' + (pointerOffsetY * BG_X_ROTATE) + 'deg)';
	});
};

backgroundListeners.forEach(function(item) {
	runHeroTransform(item);
});

// Section fade-ins

var pageSections = document.querySelectorAll('section');
var loadSections = function() {
	if (document.documentElement.clientWidth > 768) {
		pageSections.forEach(function(item) {
			if ((window.pageYOffset + window.innerHeight) > item.offsetTop) {
				item.classList.add('visible');
			} else {
				item.classList.remove('visible');
			}
		});
	};
};

// Expand gallery

var expandGalleryButton = document.getElementById('show-more-button');
var expandedGallery = document.getElementById('expanded-gallery');

var checkIfGalleryIsExpanded = function() {
	if (expandedGallery.classList.contains('active')) {
		expandGalleryButton.innerHTML = 'Zobacz mniej ';
		expandGalleryButton.classList.add('arrow-upwards');
		loadImages();
	} 
	else {
		expandGalleryButton.innerHTML = 'Zobacz więcej ';
		expandGalleryButton.classList.remove('arrow-upwards');
	};
};

expandGalleryButton.addEventListener('click', function(event) {
	event.preventDefault();
	expandedGallery.classList.toggle('active');
	checkIfGalleryIsExpanded();
});

// Gallery fade-ins

var loadImages = function() {
	var DELAY_TIME = .17;
	var EXTENDED_GALLERY_LENGTH = 5;
	var galleryImgWrappers = document.querySelectorAll('.active .image-container');
	if ((window.pageYOffset + window.innerHeight) > document.getElementById('gallery').offsetTop) {
		for (var i = 0; (i < galleryImgWrappers.length); i++) {
			if (expandedGallery.classList.contains('active')) {
				galleryImgWrappers[i].style.animation = "handle-opacity 1.4s " + ((i - EXTENDED_GALLERY_LENGTH) * DELAY_TIME) + "s forwards";
			} else {
				galleryImgWrappers[i].style.animation = "handle-opacity 1.4s " + (i * DELAY_TIME) + "s forwards";
			};
		};
	};
};

// Switch gallery sections

var gallerySwitchButtons = document.querySelectorAll('.gallery-button');
var gallerySections = document.getElementsByClassName('gallery-section');
var buttonWrapperStyle = document.querySelector('#gallery .button-wrapper').style;

var removeActiveFromAll = function() {
	for (var i = 0; i < gallerySwitchButtons.length; i++) {
		gallerySwitchButtons[i].classList.remove('active');
		gallerySections[i].classList.remove('active');
	};
};

for (let i = 0; i < gallerySwitchButtons.length; i++) {
	let index = i;
	gallerySwitchButtons[i].addEventListener('click', function(event) {
		event.preventDefault();
		removeActiveFromAll();
		this.classList.add('active');
		gallerySections[index].classList.add('active');
		loadImages();

		if (!gallerySwitchButtons[0].classList.contains('active')) {
			expandedGallery.classList.remove('active');
			buttonWrapperStyle.display = 'none';
		} else {
			buttonWrapperStyle.display = 'block';
		};
		checkIfGalleryIsExpanded();
	});
};

// Show gallery items

var galleryItems = document.querySelectorAll('#gallery .image-container img');
var galleryModal = document.getElementById('gallery-modal');
var galleryModalContent = document.querySelector('#gallery-modal .modal-content')
var overlay = document.getElementById('modal-layer');
var modalCloseButton = document.querySelector('.modal-close-button');

var showGalleryModal = function() {
	overlay.classList.add('active');
	galleryModal.classList.add('active');
	galleryModalContent.innerHTML = '<img src="' + this.src + '" alt="Gallery photo">' + '<div class="caption">' + this.alt + '</div>';
};

galleryItems.forEach(function(item) {
	item.addEventListener('click', showGalleryModal);
});

// Close gallery modal

var closeGalleryModal = function() {
	overlay.classList.remove('active');
	galleryModal.classList.remove('active');
	dropdownMenu.classList.remove('show');
};

overlay.addEventListener('click', closeGalleryModal);
modalCloseButton.addEventListener('click', function(event) {
	event.preventDefault();
	closeGalleryModal();
});

document.onkeydown = function(event) {
	var ESC_KEY_CODE = 27;
	if (galleryModal.classList.contains('active') && (event.keyCode == ESC_KEY_CODE)) {
		closeGalleryModal();
	};
};

// Expand Facebook plugin

document.querySelector('.facebook-plugin .fb-tab').addEventListener('click', function() {
	document.querySelector('.facebook-plugin').classList.toggle('active');
});
'use strict'; 

// Dropdown mobile menu

var dropdownMenu = document.getElementById('nav-menu');
var dropdownIcon = document.getElementById('dropdown-button');
var menuItems = document.querySelectorAll('#nav-menu li a');

dropdownIcon.addEventListener('click', function() {
	dropdownMenu.classList.toggle('show');
	overlay.classList.toggle('active');
});

menuItems.forEach(function(item) {
	item.addEventListener('click', function() {
		if (dropdownMenu.classList.contains('show')) {
			dropdownMenu.classList.remove('show');
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

var fixedNavPosition = dropdownMenu.offsetTop;
var fixNavbar = function() {
	if (window.pageYOffset > (fixedNavPosition + 60)) {
		dropdownMenu.classList.add('fixed');
	} else {
		dropdownMenu.classList.remove('fixed');
	};
};

// Hero parralax

window.addEventListener('scroll', function() {
	var background = document.querySelector('.scroll-background');
	background.style.top = (window.pageYOffset * 0.5) + 'px';
});

// Section fade-ins

var pageSections = document.querySelectorAll('section');
var loadSections = function() {
	pageSections.forEach(function(item) {
		if ((window.pageYOffset + window.innerHeight) > item.offsetTop) {
			item.classList.add('visible');
		} else {
			item.classList.remove('visible');
		}
	});
};

// Expand gallery

var expandGalleryButton = document.getElementById('show-more-button');
var expandedGallery = document.getElementById('expanded-gallery');

expandGalleryButton.addEventListener('click', function(event) {
	event.preventDefault();
	expandedGallery.classList.toggle('active');
	expandGalleryButton.classList.toggle('arrow-upwards');
	if (expandedGallery.classList.contains('active')) {
		expandGalleryButton.innerHTML = 'Zobacz mniej ';
		loadImages();
	} 
	else {
		expandGalleryButton.innerHTML = 'Zobacz więcej ';
	};
});

// Gallery fade-ins

var loadImages = function() {
	var galleryImgWrappers = document.querySelectorAll('.active .image-container');
	if ((window.pageYOffset + window.innerHeight) > document.getElementById('gallery').offsetTop) {
		for (var i = 0; (i < galleryImgWrappers.length); i++) {
			if (expandedGallery.classList.contains('active')) {
				galleryImgWrappers[i].style.animation = "handle-opacity 1.4s " + ((i - 5) * .17) + "s forwards";
			} else {
				galleryImgWrappers[i].style.animation = "handle-opacity 1.4s " + (i * .17) + "s forwards";
			}
		};
	};
};

// Switch gallery sections

var gallerySwitchButtons = document.querySelectorAll('.gallery-button');
var gallerySections = document.getElementsByClassName('gallery-section');

for (let i = 0; i < gallerySwitchButtons.length; i++) {
	let index = i;
	gallerySwitchButtons[i].addEventListener('click', function() {
		event.preventDefault();
		this.classList.add('active');
		gallerySections[index].classList.add('active');

		for (var i = 0; i < gallerySwitchButtons.length; i++) {
			if (gallerySwitchButtons[i].classList.contains('active') && gallerySwitchButtons[i] != gallerySwitchButtons[index]) {
				gallerySwitchButtons[i].classList.remove('active');
				gallerySections[i].classList.remove('active');
				loadImages();
			};
			if (!gallerySwitchButtons[0].classList.contains('active')) {
				expandedGallery.classList.remove('active');
				document.querySelector('#gallery .button-wrapper').style.display = 'none';
			} else {
				document.querySelector('#gallery .button-wrapper').style.display = 'block';
			}
		};
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
modalCloseButton.addEventListener('click', function() {
	event.preventDefault();
	closeGalleryModal();
});

document.onkeydown = function(event) {
    if (galleryModal.classList.contains('active') && (event.keyCode == 27)) {
		closeGalleryModal();
    };
};
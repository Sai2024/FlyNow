'use strict';

/**
 * navbar
 */


const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const elemArray = [navCloseBtn, overlay, navOpenBtn];

for (let i = 0; i < elemArray.length; i++) {
	elemArray[i].addEventListener("click", function () {
		navbar.classList.toggle("active");
		overlay.classList.toggle("active");
	});
}


/** 
 * toggle navbar & overlay when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-navbar-link]");

for (let i = 0; i < navbarLinks.length; i++) {
	navbarLinks[i].addEventListener("click", function () {
		navbar.classList.toggle("active");
		overlay.classList.toggle("active");
	});
}


/**
 * Swiper
 */



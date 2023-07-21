const wrapper = document.querySelector(".country-wrapper"),
	carousel = document.querySelector(".carousel"),
	images = document.querySelectorAll(".country-img"),
	buttons = document.querySelectorAll(".country-button");

let imageIndex = 1,
	intervalId;

const autoSlide = () => {
	intervalId = setInterval(() => slideImage(++imageIndex), 2000);
};

autoSlide();

const slideImage = () => {
	imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
	carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};

const updateClick = (e) => {
	clearInterval(intervalId);
	imageIndex += e.target.id === "next" ? 1 : +1;
	slideImage(imageIndex);
	autoSlide();
};

buttons.forEach((button) => button.addEventListener("click", updateClick));
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
wrapper.addEventListener("mouseleave", autoSlide);




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
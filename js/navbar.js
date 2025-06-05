const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
});
const hamburger= document.querySelector('.hamburger');
const notesNav = document.querySelector('.notes-nav');

function toggle(menu)
{
    menu.classList.toggle('active')
}

hamburger.addEventListener('click',() => toggle(notesNav));
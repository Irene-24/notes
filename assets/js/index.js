const formWrap = document.querySelector('.form-container');
const closeBtns = document.querySelectorAll('.close-btn');
let activeForm;

const signInBtn = document.querySelector('#signin-btn');
const signUpBtn = document.querySelector('#signup-btn');

const signInBtn2 = document.querySelector('.signin');
const signUpBtn2 = document.querySelector('.signup');

signInBtn.addEventListener('click',() => showForm('#sign-in'));
signUpBtn.addEventListener('click',() => showForm('#sign-up'));

signInBtn2.addEventListener('click',() => showForm('#sign-in'));
signUpBtn2.addEventListener('click',() => showForm('#sign-up'));

closeBtns.forEach( btn => 
    {
        btn.addEventListener('click',closeForm);
    });



function showForm(formId)
{
    window.scrollTo(0,0);
    if(activeForm)
    {
        activeForm.classList.add('hidden');
    }
  
   formWrap.classList.remove('hidden');
   activeForm = document.querySelector(formId);
   activeForm.reset();
   activeForm.classList.remove('hidden');
}

function closeForm()
{
    window.scrollTo(0,0);
    formWrap.classList.add('hidden');
    activeForm.classList.add('hidden');
}

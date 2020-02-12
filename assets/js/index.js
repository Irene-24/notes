const formWrap = document.querySelector('.form-container');
const closeBtns = document.querySelectorAll('.close-btn');
let activeForm;

const signInBtn = document.querySelector('#signin-btn');
const signUpBtn = document.querySelector('#signup-btn');

const signInBtn2 = document.querySelector('.signin');
const signUpBtn2 = document.querySelector('.signup');

assignEvent(signInBtn,'click',showForm,'#sign-in');
assignEvent(signUpBtn,'click',showForm,'#sign-up');
assignEvent(signInBtn2,'click',showForm,'#sign-in');
assignEvent(signUpBtn2,'click',showForm,'#sign-up');
assignEvent(formWrap,'click',closeForm);


closeBtns.forEach( btn => assignEvent(btn,'click',closeForm));


function assignEvent(target,eventName,callback,arg=null)
{
    
    if(arg)
    {
        target.addEventListener(eventName,() => callback(arg));
    }
    else
    {
        target.addEventListener(eventName,callback);
    }
}


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
    if(event.target.classList.contains("form-container") || event.target.classList.contains("close-btn") )
    {
        window.scrollTo(0,0);
        formWrap.classList.add('hidden');
        activeForm.classList.add('hidden');
    }
    
  
}

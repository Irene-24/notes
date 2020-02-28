const hamburger= document.querySelector('.hamburger');
const notesNav = document.querySelector('.notes-nav'); 
const leftNav  = document.querySelector('.left-nav'); 
const plusMinus = document.querySelector('.plus-minus'); 
const rightNav = document.querySelector('.right-nav'); 
const colectionCtrl = document.querySelector('.vertical-dots');
const collection  = document.querySelector('.collection'); 

const createBtn = document.querySelector('.create-btn');
const editBtn = document.querySelector('.edit-btn');
const delBtn = document.querySelector('.del-btn');

const closeBtns = document.querySelectorAll('.close-btn');

const notesOpts = document.querySelector('.note-options');



let oldTarget = null;
let activeNoteIndex;


const main = document.querySelector('.full-note');
let data = null;

const now = new Date().getTime();

function showForm(formId)
{

  const container = document.querySelector(`.form-container`); 
  const form = container.querySelector(`#${formId}`);  

   container.classList.remove('hidden');
   form.classList.remove('hidden');


}

function hideForm()
{
    const btn = event.target;
    const form = btn.closest('.modal');
    const container = btn.closest('.form-container');

    container.classList.add('hidden');
    form.classList.add('hidden');   

    
}

function toggle(menu)
{
    menu.classList.toggle('active')
}

function formatBreaks(content)
{
    return  content.replace( /\n/g , "<br />" );
}

function formatContent(content)
{
   if(content.length > 187)
   {
     content = content.substr(0,187);
     content+=" ..."
   } 

   return formatBreaks(content);   

}

function getTime(time)
{
   
  const distance = now - time;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  switch (true) 
  {
    case days >= 1 :
        return `${days} day${ days===1 ? "" : "s"} ago`;

     case hours >=1 :
        return `${ hours } hour${ hours ===1 ? "" : "s"} ago`;
      
      case minutes >=1 :
        return `${ minutes} min${ minutes===1 ? "" : "s"} ago`;
  
      default:         
        return `${ seconds} sec${ seconds===1 ? "" : "s"} ago`
  }
  

}

function createNote(noteObj,index)
{
    const note = document.createElement('div');
    const title = document.createElement('h4');
    const content = document.createElement('p');

    note.setAttribute("data-index",index);
    
    const details = document.createElement('div');
    const tag = document.createElement('span');    
    const time = document.createElement('span');   
    const ctrl = document.createElement('span');

    ctrl.setAttribute("data-index",index)

    ctrl.innerHTML = ` <svg class="icon">
    <use xlink:href="#ellipses" />
  </svg>`;

    
    note.classList.add('note');
    title.classList.add('note-title');
    content.classList.add('note-content');
    details.classList.add('note-details');
    time.classList.add('note-time');    
    tag.classList.add('note-tag');
       
    ctrl.classList.add('note-ctrl');
    title.addEventListener('click', () => showFull(index));
    ctrl.addEventListener('click', showOptions);

    title.textContent = noteObj.title;
    tag.textContent = noteObj.tag;
    content.innerHTML = formatContent(noteObj.content) ;
    time.textContent = getTime(noteObj.lastTime);

    note.append(title);
    note.append(content);

    details.append(tag);
    details.append(time);
    details.append(ctrl);
    
    note.append(details);

    return note;
    
    

}

async function populateData()
{
    const resp = await (await fetch("./assets/data.json")).json();

    data = resp;

    const frag = document.createDocumentFragment();


    data.notes.forEach( (n,i) => 
        {
            frag.append(createNote(n,i))
         } );

    collection.append(frag);

    showFull(3);
    
}

function showFull(index)
{
  
    const title = document.querySelector('.full-note-title');
    const content = document.querySelector('.full-note-content');
    ;

    notes = document.querySelectorAll('.note');

    notes.forEach( n => n.classList.remove('active'));

    notes[index].classList.add('active');


    title.textContent = data.notes[index].title;
    content.innerHTML = formatBreaks( data.notes[index].content);

    activeNoteIndex = index;

 
}

function showOptions()
{

    const menu = event.target;

    if(menu.classList.contains('note-ctrl'))
    {
        const index = +menu.dataset.index
        notesOpts.setAttribute('data-index',index);
    }
    else
    {
      notesOpts.setAttribute('data-index',activeNoteIndex)
    }
    

    if(oldTarget === menu)
    {
      notesOpts.classList.remove('active');
      oldTarget = null;
    }
    else
    {
      oldTarget = menu;
      const dim = menu.getBoundingClientRect();
      const screenW = window.innerWidth;   
      
    
      notesOpts.style.top = `${dim.top  +10}px`; 
      
      if(screenW < 425)
      {
        notesOpts.style.left = `${20}px`; 
      }
      else if(screenW < 768)
      {
        notesOpts.style.left = `${dim.left}px`; 
      }
      else
      {
        notesOpts.style.left = `${dim.left - 150}px`; 
      }

      notesOpts.classList.add('active');

    }
    
}

function editNote()
{
    

}

function deleteNote()
{

}

hamburger.addEventListener('click',() => toggle(notesNav));

colectionCtrl.addEventListener('click',() => 
{
  toggle(collection);
  toggle(leftNav);  
  toggle(plusMinus);
  toggle(rightNav );
  notesOpts.classList.remove('active');
  oldTarget = null;

}
);

closeBtns.forEach( btn => btn.addEventListener('click', hideForm ) );
createBtn.addEventListener('click', () => showForm("create") );
rightNav.addEventListener('click', showOptions);
window.addEventListener( "load" , populateData );

window.addEventListener('resize', () =>
{
  notesOpts.classList.remove('active');
  oldTarget = null;
});




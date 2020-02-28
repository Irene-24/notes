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
const addNewBtn = document.querySelector('.add');

const cancelBtns = document.querySelectorAll('.cancel');

const editConfirmBtn = document.querySelector('.edit-confirm');

const delConfirmBtn = document.querySelector('.del-confirm');

const closeBtns = document.querySelectorAll('.close-btn');

const notesOpts = document.querySelector('.note-options');





let oldTarget = null;
let activeNoteIndex;

document.querySelectorAll('form').forEach( form =>
  {
      form.addEventListener('submit', () => event.preventDefault());
  } );


const main = document.querySelector('.full-note');

let data = null;



function showForm(formId)
{

  window.scrollTo(0,0);

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
  const now = new Date().getTime();
   
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

function hideOptions()
{
  notesOpts.classList.remove('active');
}


async function populateData()
{
    const resp = await (await fetch("./assets/data.json")).json();

    data = resp;

    fillNotes(data);
    showFull(3);
    
}

function fillNotes(data)
{
  
  collection.textContent = "";
  

  if(data.notes.length > 0)
  {
     const frag = document.createDocumentFragment();
    data.notes.forEach( (n,i) => 
    {
        frag.append(createNote(n,i))
     } );

  collection.append(frag);
  }
  else
  {
    collection.innerHTML = "<h2 class='empty'>You have no notes yet</h2>"

  }


}

function showFull(index)
{
  
    const title = document.querySelector('.full-note-title');
    const content = document.querySelector('.full-note-content');

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
       hideOptions()
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

function addNote()
{

  const form = event.target.closest('.modal');

  const note = 
  {
    
      title:form["title"].value,
      tag:form["tag"].value,
      content:form["note-body"].value,
      lastTime:new Date().getTime() 
  }

  if(validateNote(note))
  {
     data.notes.push(note); 
     collection.append( createNote(note,data.notes.length-1));

     collection.removeChild(collection.firstElementChild);
    
  }
  
  hideForm();
  
  form.reset();
}

function validateNote(note)
{
  let isValid = true;
  for (const key in note) 
  {
    note[key] = note[key].toString().trim();
    isValid = isValid && (note[key].length > 0);
  }

  return isValid;
}

function editNote()
{  
  
  const form = event.target.closest('.modal');
  const index = +notesOpts.dataset.index;
  const note = 
  {
    
      title:form["edit-title"].value,
      tag:form["edit-tag"].value,
      content:form["edit-note-body"].value,
      lastTime:new Date().getTime() 
  }  
  

  if(validateNote(note))
  {
     data.notes[index] = note; 
     fillNotes(data);   
    
  }

   
  if(index === activeNoteIndex)
  {
     showFull(index);
  }
  
  hideForm();  
  form.reset();


}

function populateEdit()
{
    const form = document.querySelector('#edit');
    const note  = data.notes[+notesOpts.dataset.index];  
    
    form["edit-title"].value = note["title"];
    form["edit-tag"].value =  note["tag"];
    form["edit-note-body"].value = note["content"];
}

function deleteNote()
{

   const index = +notesOpts.dataset.index;

   data.notes.splice(index,1);

   fillNotes(data);

   if(data.notes.length < 1)
   {
      document.querySelector('.full-note').classList.add('hidden')
   }
   else if (index === activeNoteIndex)
   {
      activeNoteIndex = 0;
      showFull(activeNoteIndex);
   }



   hideForm();


}

hamburger.addEventListener('click',() => {
  toggle(notesNav);
  hideOptions();
  collection.classList.remove('active');
  leftNav.classList.remove('active'); 
  rightNav.classList.remove('active');  
  plusMinus.classList.remove('active');

});

colectionCtrl.addEventListener('click',() => 
{
  toggle(collection);
  toggle(leftNav);  
  toggle(plusMinus);
  toggle(rightNav );
  notesNav.classList.remove('active');
  hideOptions()
  oldTarget = null;

}
);

closeBtns.forEach( btn => btn.addEventListener('click', hideForm ) );
cancelBtns.forEach( btn => btn.addEventListener('click', hideForm ) );
createBtn.addEventListener('click', () => showForm("create") );
delBtn.addEventListener('click', () => showForm("delete") );
editBtn.addEventListener('click', () =>
{
   showForm("edit");
   populateEdit();
 } );
rightNav.addEventListener('click', showOptions);
window.addEventListener( "load" , populateData );
addNewBtn.addEventListener( "click" , addNote );
delConfirmBtn.addEventListener( "click" , deleteNote);
editConfirmBtn.addEventListener( "click" , editNote);
notesOpts.addEventListener( "click" , () => 
{
   hideOptions()
  oldTarget = null;
 } );

window.addEventListener('resize', () =>
{
   hideOptions()
  oldTarget = null;
});




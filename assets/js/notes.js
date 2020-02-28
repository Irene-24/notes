const hamburger= document.querySelector('.hamburger');
const notesNav = document.querySelector('.notes-nav'); 
const leftNav  = document.querySelector('.left-nav'); 
const plusMinus = document.querySelector('.plus-minus'); 
const rightNav = document.querySelector('.right-nav'); 
const colectionCtrl = document.querySelector('.vertical-dots');
const collection  = document.querySelector('.collection'); 
const main = document.querySelector('.full-note');
let data = null;

const now = new Date().getTime();

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

    note.setAttribute("data-index",index)
    
    const details = document.createElement('div');
    const tag = document.createElement('span');    
    const time = document.createElement('span');   
    const ctrl = document.createElement('span');

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

    
}

function showFull(index)
{
    const title = document.createElement('h1');
    const content = document.createElement('p');
}

hamburger.addEventListener('click',() => toggle(notesNav));
colectionCtrl.addEventListener('click',() => 
{
  toggle(collection);
  toggle(leftNav);  
  toggle(plusMinus);
  toggle(rightNav );

}
);


window.addEventListener( "load" , populateData );

const currentTicketLbl = document.querySelector('#lbl-new-ticket');
const createTicketBtn  = document.querySelector('button');

async function getLastTicket(){

  const lastTicket = await fetch('/api/ticket/last').then(res => res.json());
  currentTicketLbl.innerHTML = lastTicket;
}

async function createTicket(){
  const newTicket = await fetch('/api/ticket', {
    method: 'POST',
  }).then(res => res.json());

  currentTicketLbl.innerHTML = newTicket.number;
}

createTicketBtn.addEventListener('click', createTicket);

getLastTicket();




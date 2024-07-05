
function renderTickets(tickets = []){

  for (let index = 0; index < tickets.length; index++) {
    
    if(index >= 4) break;

    const ticket = tickets[index];

    if(!ticket) continue;

    const lblTicket = document.querySelector(`#lbl-ticket-0${index + 1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${index + 1}`);

    lblTicket.innerHTML = `Ticket ${ticket.number}`;
    lblDesk.innerHTML = ticket.handleAtDesk;
  }

}

async function loadCurrentTickets(){

  const tickets = await fetch('/api/ticket/working-on').then(res => res.json());

  renderTickets(tickets);

}

// WS

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    const { type, payload } = JSON.parse(event.data);

    if(type !== 'on-working-changed') return;
    
    renderTickets(payload);
  };

  socket.onclose = ( event ) => {
    setTimeout( () => {
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

loadCurrentTickets();
connectToWebSockets();
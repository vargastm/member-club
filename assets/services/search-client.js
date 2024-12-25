import { setProgress } from "./progress-bar.js";

async function fetchClientData() {
  const response = await fetch('./clients.json');
  const data = await response.json();
  return data.clients;
}

async function searchClient({ id }) {
  try {
    const clients = await fetchClientData();
    const client = clients.find(client => client.id === id);
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');

    if (!client) {
      modal.classList.add('active');
      modalText.textContent = "ID inválido, cartão não encontrado.";
      return;
    }

    const { name, avatar, clientSince, appointmentHistory, loyaltyCard } = client;

    const totalCuts = loyaltyCard.totalCuts

    document.getElementById('avatar-img').src = avatar;
    document.getElementById('username').textContent = name;
    document.getElementById('client-since').textContent = clientSince;
    document.getElementById('card-number').textContent = `ID: ${id}`;
    document.getElementById('cuts-remaining').textContent = loyaltyCard.cutsRemaining;
    document.getElementById('total-cuts').textContent = totalCuts;
    document.getElementById('total-cuts-progress').textContent = `${totalCuts} de 10`;
    setProgress({ totalCuts });
    document.getElementById('content').classList.add('active');

    const historyDatesContainer = document.getElementById('history-dates');
    historyDatesContainer.innerHTML = '';
    appointmentHistory.forEach(appointment => {
      const appointmentElement = document.createElement('div');
      appointmentElement.innerHTML = `
        <div>
          <p class="date">${appointment.date}</p>
          <p class="hour">${appointment.time}</p>
        </div>
        <div class="verify-image">
          <img src="assets/images/check.svg" alt="Check icon">
        </div>
      `;
      historyDatesContainer.appendChild(appointmentElement);
    });

     const row1 = document.querySelector('.row-1');
     const row2 = document.querySelector('.row-2');
     const totalSlots = 10;
 
     row1.innerHTML = '';
     row2.innerHTML = '';
 
     for (let i = 0; i < totalSlots; i++) {
       const div = document.createElement('div');
       if (i < totalCuts) {
         div.classList.add('checked');
       }
       if (i < 5) {
         row1.appendChild(div);
       } else {
         row2.appendChild(div);
       }
     }

    if (totalCuts < 10) {
      const lastElement = row2.lastElementChild;
      if (lastElement) {
        lastElement.classList.add('gift-icon');
      }
    } else {
      modal.classList.add('active');
      modalText.textContent = "Parabéns! Seu próximo corte é gratuito!";
    }
  } catch (error) {
    console.error("Erro ao buscar cliente:", error.message);
  }
}

document.getElementById('card-id').addEventListener('input', (event) => {
  const inputField = event.target; 
  const submitButton = document.getElementById('submit-button');
  
  let value = inputField.value.trim();
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4');

  // Atualiza o valor do campo de input
  inputField.value = value.slice(0, 15);

  if (value.length >= 15) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

document.getElementById('search-id').addEventListener('submit', (event) => {
  event.preventDefault(); 

  const clientId = document.getElementById('card-id').value.trim();

  if (clientId) {
    searchClient({ id: clientId }); 
    document.getElementById('card-id').value = '';
  }
});
import { apiConfig } from "./api-config.js";

export async function searchClient({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/clients/${id}`);

    if (!response.ok) {
      alert("ID inválido, cartão não encontrado.");
    }

    const clientData = await response.json();
    console.log("Dados do cliente:", clientData);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error.message);
  }
}

document.getElementById('card-id').addEventListener('input', (event) => {
  const clientId = event.target.value.trim();
  const submitButton = document.getElementById('submit-button');

  if (clientId) {
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
  }
});
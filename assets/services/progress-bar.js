// script.js

// Exemplo de JSON com o valor de totalCuts
const data = {
  "totalCuts": 7
};

// Função para calcular e definir o progresso ao carregar a página
function setProgress() {
  const progressBar = document.getElementById('progress-bar');
  const totalCuts = data.totalCuts;

  // Calculando o progresso de 0 a 10
  const progress = (totalCuts / 10) * 100; // Converte de 0-10 para 0-100%

  // Atualizando a largura da barra de progresso
  progressBar.style.width = `${progress}%`;
}

// Chama a função automaticamente ao carregar a página
window.onload = setProgress;
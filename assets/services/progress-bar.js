export function setProgress({ totalCuts }) {
  const progressBar = document.getElementById('progress-bar');

  const progress = (totalCuts / 10) * 100;

  progressBar.style.width = `${progress}%`;
}

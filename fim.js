/* Tela final: começa com 5 estrelas e apaga 1 por erro (mínimo 3) */

let erros = 0;
try { erros = parseInt(sessionStorage.getItem('floresta-erros'), 10) || 0; } catch (e) {}

const estrelas = Math.max(3, 5 - erros);
const icones = document.querySelectorAll('#estrelas svg');

icones.forEach((icone, i) => {
  if (i >= estrelas) icone.classList.add('apagada');
});
document.getElementById('estrelas').setAttribute('aria-label', `${estrelas} de 5 estrelas`);

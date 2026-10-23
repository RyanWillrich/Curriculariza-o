/* Usado em todas as páginas de pergunta.
   O botão com o atributo data-correta é a resposta certa. */

const acerto = document.getElementById('acerto');
const erro = document.getElementById('erro');

/* Contagem de erros do nível, guardada enquanto a aba estiver aberta */
function lerErros() {
  try { return parseInt(sessionStorage.getItem('floresta-erros'), 10) || 0; } catch (e) { return 0; }
}
function salvarErros(n) {
  try { sessionStorage.setItem('floresta-erros', n); } catch (e) {}
}

/* Na primeira pergunta do nível, zera os erros */
if (document.querySelector('main').hasAttribute('data-primeira')) salvarErros(0);

/* Sons simples */
let audio;
function som(notas) {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const t = audio.currentTime;
    notas.forEach((freq, i) => {
      const osc = audio.createOscillator(), vol = audio.createGain(), inicio = t + i * 0.12;
      osc.frequency.value = freq;
      vol.gain.setValueAtTime(0.0001, inicio);
      vol.gain.exponentialRampToValueAtTime(0.16, inicio + 0.02);
      vol.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.3);
      osc.connect(vol).connect(audio.destination);
      osc.start(inicio);
      osc.stop(inicio + 0.32);
    });
  } catch (e) {}
}

/* Clique numa resposta */
document.querySelectorAll('.ans').forEach(botao => {
  botao.addEventListener('click', () => {
    if (botao.hasAttribute('data-correta')) {
      som([523, 659, 784]);
      acerto.hidden = false;
      acerto.querySelector('.btn').focus();
    } else {
      salvarErros(lerErros() + 1);
      som([392, 311]);
      botao.classList.remove('shake');
      void botao.offsetWidth;
      botao.classList.add('shake');
      erro.hidden = false;
      document.getElementById('btnTentar').focus();
    }
  });
});

/* Fecha o pop-up de erro */
document.getElementById('btnTentar').addEventListener('click', () => {
  erro.hidden = true;
});

/* Lê a pergunta em voz alta */
document.getElementById('btnSom').addEventListener('click', () => {
  try {
    speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(document.getElementById('pergunta').textContent);
    fala.lang = 'pt-BR';
    fala.rate = 0.9;
    speechSynthesis.speak(fala);
  } catch (e) {}
});

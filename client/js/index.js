import WebSpeech from './speech'

let socket = io();

socket.on('point', function(msg){
  console.log(msg);
  $('#result').append($('<li>').text(msg));
});

let btn = document.querySelector('#play-btn');
let speech = new WebSpeech();

speech.on('data', (value) => {
  socket.emit('text', value);
  $('#result').append($('<li>').text(value))
})

btn.addEventListener('click', (el) => {
  if (speech.nowRecognition) {
    speech.stop();
    el.target.textContent = 'スタート';
  } else {
    speech.start();
    el.target.textContent = 'ストップ';
  }
})


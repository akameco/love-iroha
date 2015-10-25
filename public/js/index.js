"use strict";

let socket = io();

socket.on('point', function(msg){
  console.log(msg);
  $('#result').append($('<li>').text(msg));
});

let recognition;
let nowRecognition = false;

function start () {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.onresult = (e) => {
    if (e.results.length > 0) {
      let value = e.results[0][0].transcript;
      console.log(value);
      socket.emit('text', value);
      $('#result').append($('<li>').text(value))
    }
  }
  recognition.start();
  nowRecognition = true;
}

function stop () {
  recognition.stop();
  nowRecognition = false;
}

let btn = document.querySelector('.btn');
btn.addEventListener('click', (el) => {
  if (nowRecognition) {
    stop();
    el.target.textContent = 'スタート';
  } else {
    start();
    el.target.textContent = 'ストップ';
  }
})


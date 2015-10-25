import {EventEmitter} from 'events';

export default class WebSpeech extends EventEmitter {
  constructor() {
    super();
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'ja-JP';
    this.nowRecognition = false;
  }

  start() {
    this.recognition.onresult = (e) => {
      if (e.results.length > 0) {
        let value = e.results[0][0].transcript;
        this.emit('data', value);
      }
    }
    this.recognition.start();
    this.nowRecognition = true;
  }

  stop() {
    this.recognition.stop();
    this.nowRecognition = false;
  }
}


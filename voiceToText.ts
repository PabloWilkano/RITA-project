// voiceToText.ts

class VoiceToText {
    constructor() {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
  
      // Event listeners
      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        this.onTextCaptured(result);
      };
  
      this.recognition.onerror = (event) => {
        this.onError(event.error);
      };
    }
  
    // Start capturing voice input
    startCapture() {
      this.recognition.start();
    }
  
    // Stop capturing voice input
    stopCapture() {
      this.recognition.stop();
    }
  
    // Callback for when text is captured
    onTextCaptured(text) {
      // Handle the captured text, e.g., send it for processing
      console.log('Captured Text:', text);
    }
  
    // Callback for handling errors
    onError(error) {
      console.error('Voice Recognition Error:', error);
    }
  }
  
  export default VoiceToText;
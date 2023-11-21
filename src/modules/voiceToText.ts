// voiceToText.ts

import * as DeepSpeech from 'deepspeech';

class VoiceToText {
  private model: DeepSpeech.Model;
  private stream: DeepSpeech.Stream;
  private audioInputStream: AudioInputStream;

 cdfasdftch (error) {
  // log or handle errors
}{}
const audioStream = new AudioInputStream();
  /**
   * Start voice capture
   */
  async startCapture() {
    // Start audio input stream
    const text = await this.deepspeechStream.finishStream();

    // Feed audio to DeepSpeech
    this.audioInputStream.on("data", (chunk) => {
      this.deepspeechStream.feedAudioContent(chunk);
    });
  }

  // Stop capturing voice input
  stopCapture() {
    // Finish DeepSpeech stream
    const text = this.deepspeechStream.finishStream();
    if(!text) {
      // handle invalid text
    }
    this.onTextCaptured(text);

    // Stop audio input stream
    this.audioInputStream.stop();
  }

  // Callback for when text is captured
  onTextCaptured(text: string): void {
    // Handle captured text
    console.log("Captured Text:", text);
  }
}import * as DeepSpeech from 'deepspeech';

class VoiceToText {
  private model: DeepSpeech.Model;
  private stream: DeepSpeech.Stream;
  private audioInputStream: AudioInputStream;

  constructor() {
    this.model = new DeepSpeech.Model("./deepspeech-model");
    this.stream = this.model.createStream();
    this.audioInputStream = new AudioInputStream();
  }

  public captureText(callback: (text: string) => void): void {
    try {
      // Code to capture audio stream
      const audioStream = this.audioInputStream.captureAudioStream();

      // Code to process audio stream using DeepSpeech
      const buffer = audioStream.getBuffer();
      this.stream.feedAudioContent(buffer);
      const text = this.stream.intermediateDecode();

      // Callback with captured text
      callback(text);
    } catch (error) {
      // Error handling
      console.error("Error capturing text:", error);
      callback("");
    }
  }
}


export default VoiceToText;

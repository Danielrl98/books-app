import * as Speech from "expo-speech";

export class ExpoSpechLib {
  public speech;
  public velocity = 5.0;

  constructor() {
    this.speech = Speech;
  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  public speakText(text: string) {
    this.speech.speak(text, {
        language: 'pt-br',
        rate: this.velocity
      });
  }
}

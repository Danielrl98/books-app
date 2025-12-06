import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ExpoSpechLib } from "@/shared/external-libs";
import { ButtonAudio, ButtonText } from "./styled";

const speech = new ExpoSpechLib();

export function AudioCommonComponent({ text }: { text: string }) {
  function getAudio() {
    speech.speakText(text);
  }

  return (
    <View>
      <ThemedText style={{textAlign: 'center'}}>
        <ButtonAudio onPress={getAudio}>
          <ButtonText>audio</ButtonText>
        </ButtonAudio>
      </ThemedText>
      <ThemedText style={{textAlign: 'center'}}>{text}</ThemedText>
    </View>
  );
}

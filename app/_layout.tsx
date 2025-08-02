import { ContainerPagination } from "@/components/styled/books/list";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GutembergApi } from "@/shared/api/";
import { ExpoSpechLib } from "@/shared/external-libs";
import { Button } from "@react-navigation/elements";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import "react-native-reanimated";

const gutembergApi = new GutembergApi();
const speech = new ExpoSpechLib();

export interface IBooks {
  title: string;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [books, setBookies] = useState<IBooks[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [page, setPage] = useState(1);

  function testando() {
    speech.speakText("Olá, isso é um exemplo com expo-speech!");
  }

  const getListBooks = async () => {
    const list = await gutembergApi.getListBooks(page);

    if (list?.results) setBookies(list.results as IBooks[]);
  };

  const setPagination = (newpage: number) => {
    if(newpage && newpage !== page) {
      setBookies([]);
      setPage(newpage);
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getListBooks();
  }, [page]);

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <ScrollView style={{padding: 12}}>
        <ThemedView style={{ backgroundColor: "#fff" }}>
          <ThemedText style={{color: 'black'}}>Lista de Livros</ThemedText>
          <View>
            {books.length
              ? books.map((e, index) => <Text key={index}>{e.title}</Text>)
              : <Text></Text>}
          </View>
          <ContainerPagination>
            <Text>
              Página:{" "}
              <TextInput
                onChange={(e: any) => setPagination(e.target.value)}
                defaultValue="1"
              ></TextInput>
            </Text>
          </ContainerPagination>
        </ThemedView>
      </ScrollView>
    </ThemeProvider>
  );
}

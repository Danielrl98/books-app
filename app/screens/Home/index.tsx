import { AudioCommonComponent } from "@/components/common/audio";
import { ContainerPagination } from "@/components/styled/books/list";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { themeColors, themeDefault } from "@/constants/Colors";
import { pages } from "@/constants/pages";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useScreenNavigator } from "@/hooks/useScreenNavigator";
import { GutembergApi } from "@/shared/api/";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Linking,
  ScrollView,
  TextInput,
} from "react-native";
import "react-native-reanimated";

const gutembergApi = new GutembergApi();

export interface IBooks {
  title: string;
  formats: {
    "image/jpeg": string;
    "application/pdf": string;
    "text/plain; charset=utf-8": string
  };
}

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const navigate = useScreenNavigator();
  const [books, setBookies] = useState<IBooks[]>([]);
  const [page, setPage] = useState(1);
  const [inpurSearch, setInputSearch] = useState<string>("");
  const [load, setLoaded] = useState(false);

  const getListBooks = async () => {
    setLoaded(false);
    setBookies([]);

    try {
      const list = await gutembergApi.getListBooks(page);
      if (list?.results) setBookies(list.results as IBooks[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded(true);
    }
  };

  const setPagination = (newpage: number) => {
    if (newpage && newpage !== page) {
      setBookies([]);
      setPage(newpage);
    }
  };

  const openPDF = (url: any) => {
    Linking.openURL(url["application/pdf"]);
  };

  const searchByBook = async () => {
    if (!inpurSearch) return;

    setLoaded(false);
    setBookies([]);

    try {
      const list = await gutembergApi.getBook(inpurSearch);
      if (list?.results) setBookies(list.results as IBooks[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded(true);
    }
  };

  function navitagatorBook(url: string) {
    navigate.navigate(pages.Book, {
      url,
    });
  }

  useEffect(() => {
    getListBooks();
  }, [page]);

  return (
    <ThemeProvider
      value={colorScheme === themeDefault ? DarkTheme : DefaultTheme}
    >
      <ScrollView
        style={{
          padding: 12
        }}
      >
        <ThemedView>
          <ThemedText
            style={{
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ThemedText>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: themeColors.text,
                  padding: 4,
                  width: "100%",
                }}
                onChange={(e) => setInputSearch((e.target as any).value)}
                placeholder="Digite o nome do livro"
              />
            </ThemedText>
            <Button onPress={searchByBook} title="pesquisar"></Button>
          </ThemedText>

          <ThemedView>
            {books.length ? (
              books.map((e, index) => (
                <ThemedView
                  key={index}
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: themeColors.text,
                    display: "flex",
                    alignItems: "center",
                   
                  }}
                >
                  <Image
                    source={{ uri: e?.formats["image/jpeg"] }}
                    style={{ width: 200, height: 310 }}
                    resizeMode="contain"
                    width={40}
                  ></Image>
                  <AudioCommonComponent text={e.title} />

                  <ThemedView style={{ marginTop: 15, gap: "5px" }}>
                    <Button
                      onPress={() => navitagatorBook(e.formats['text/plain; charset=utf-8'])}
                      title="Ler"
                    ></Button>

                    <Button
                      onPress={() => openPDF(e.formats)}
                      title="Abrir em PDF"
                    ></Button>
                  </ThemedView>
                </ThemedView>
              ))
            ) : (
              <ThemedView>
                {load ? (
                  <ThemedView>
                    <ThemedText>Nenhum resultado encontrado</ThemedText>
                    <Button onPress={getListBooks} title="voltar"></Button>
                  </ThemedView>
                ) : (
                  <ThemedText>Buscando...</ThemedText>
                )}
              </ThemedView>
            )}
          </ThemedView>
          <ContainerPagination>
            <ThemedText>
              {page > 1 ? (
                <Button
                  onPress={() => setPagination(page - 1)}
                  title="Anterior"
                ></Button>
              ) : (
                ""
              )}
              Página: {page}
              <Button
                onPress={() => setPagination(page + 1)}
                title="Próximo"
              ></Button>
            </ThemedText>
          </ContainerPagination>
        </ThemedView>
      </ScrollView>
    </ThemeProvider>
  );
}

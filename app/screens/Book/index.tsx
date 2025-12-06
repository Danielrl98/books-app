"use client"

import { ThemedView } from "@/components/ThemedView";
import { Colors, themeDefault } from "@/constants/Colors";
import { GutembergApi } from "@/shared/api";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, useColorScheme } from "react-native";

const gutembergApi = new GutembergApi();

export default function BookScreen({ route }: any) {
  const routes = route.params;

  const [bookText, setBookieText] = useState("")
  const [load, setLoaded] = useState(false)

  const colorScheme = useColorScheme();

  async function getBookie() {
    setLoaded(false);
    setBookieText("");

    try {
      const text = await fetch(routes.url)
      console.log(text)
    } catch (error) {
      console.error(error);
    } 
  }
  

  useEffect(() => {
    getBookie()
  }, []);

  return (
    <ThemeProvider
      value={colorScheme === themeDefault ? DarkTheme : DefaultTheme}
    >
      <ThemedView>
        <ScrollView
          style={{
            padding: 12,
            backgroundColor: Colors[themeDefault].background,
          }}
        >
          <div>book</div>
        </ScrollView>
      </ThemedView>
    </ThemeProvider>
  );
}

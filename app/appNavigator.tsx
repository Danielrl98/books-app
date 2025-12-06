import { pages } from "@/constants/pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookScreen from "./screens/Book";
import HomeScreen from "./screens/Home";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={pages.home} component={HomeScreen} />
      <Stack.Screen name={pages.Book} component={BookScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;

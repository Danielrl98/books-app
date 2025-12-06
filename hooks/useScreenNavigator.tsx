import { useNavigation } from "expo-router";

export function useScreenNavigator() {

    const navigation = useNavigation();

    return {
        navigate: (page: string, details: any = {}) => {
            // @ts-ignore
            navigation.navigate(page, details);
        }
    }
}
import { View, type ViewProps } from 'react-native';
import { themeColors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {

  return <View style={[{ backgroundColor: themeColors.background }, style]} {...otherProps} />;
}

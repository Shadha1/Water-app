import { StyleSheet, Text, type TextProps } from 'react-native';


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = '#27598E';//useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 24, // antes 16
    lineHeight: 24, //tal vez 32
    fontFamily: 'serif',   // esto hace que sea tipo Jacques François
  },
  defaultSemiBold: {
    fontSize: 24, //antes 16
    lineHeight: 24, //tal vez 32
    fontWeight: '600',
    fontFamily: 'serif',   // esto hace que sea tipo Jacques François
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32, //tal vez 40
    fontFamily: 'serif',   // esto hace que sea tipo Jacques François
  },
  subtitle: {
    fontSize: 24, //antes 20
    fontWeight: 'bold',
    fontFamily: 'serif',   // esto hace que sea tipo Jacques François
  },
  link: {
    lineHeight: 24, //antes 30
    fontSize: 16, //tal vez 32
    color: '#0a7ea4',
    fontFamily: 'serif',   // esto hace que sea tipo Jacques François
  },
});

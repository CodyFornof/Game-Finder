import { ThemedView } from '@/components/themed-view';
import { splash } from '@/constants/Styles';
import { Image } from 'expo-image';
import { ImageSourcePropType, View } from 'react-native';

const screenLogo: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/Logo/gpt_trans_logo.png"),
};

export default function splashScreen() {

  return (
    <View style={splash.noTouch}>
      <ThemedView style={splash.splashContainer}>
      <Image
        source={screenLogo.logo}
        style={[splash.logo]}
      />
    </ThemedView>
    </View>
  );
}

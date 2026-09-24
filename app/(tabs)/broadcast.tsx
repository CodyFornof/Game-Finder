// This is your explore tab
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { activeGameCard, gameCard, headerStyles } from '@/constants/Styles';
import { useAppData } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function FinderScreen() {
//Used to open Game Details screen
const router = useRouter();
// Gets the loaded Games and leagues for the league bar and game scroll view - Gets this data from the Splash screen
const {games, leagues, currentLeague, setLeague} = useAppData();
const currentGameDetails = games[currentLeague];

  return (
    //Must be the parent view so the parallax Scroll View is the entire screen with the parameter of the logo (headerImage) and fixedHeader(League bar)
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      } // fixedHeader is so we can add code that sticks to the top, not apart of the scroll. Specifically here, we have the bar that shows the leagues of games today. 
      >
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});

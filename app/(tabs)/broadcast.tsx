// This is your explore tab
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Checkbox } from '@/components/checkbox';
import { IconSymbol } from '@/components/ui/icon-symbol';
import channels from '@/data/channels.json';
import streamingServices from '@/data/streaming-services.json';
import addOns from '@/data/add-ons.json';
import providers from '@/data/providers.json';
import { broadcastStyles } from '@/constants/Styles';
import { useAppData } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import { ChannelRow, ProviderRow, StreamingRow, AddOnRow } from '@/components/channel-rows';
import { useSelectionStore } from '@/data/channel-selection-store'
import { Image, Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';

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
      <ThemedView>
        <ThemedText style={broadcastStyles.title}>Streaming Services</ThemedText>
        {streamingServices?.map((item: any) => (
          <StreamingRow key={item.id} id={item.id} name={item.name}/>
      ))}
      <ThemedText style={broadcastStyles.title}>Add-Ons</ThemedText>
        {addOns?.map((item: any) => (
          <AddOnRow key={item.id} id={item.id} name={item.name}/>
      ))}
      </ThemedView>
      <ThemedText style={broadcastStyles.title}>TV Providers</ThemedText>
        {providers?.map((item: any) => (
          <ProviderRow key={item.id} providerId={item.id}/>
      ))}
      <ThemedText style={broadcastStyles.title}>Channels</ThemedText>
        {channels?.map((item: any) => (
          <ChannelRow key={item.id} channelId={item.id}/>
      ))}
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

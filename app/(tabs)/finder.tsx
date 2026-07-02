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
      fixedHeader={
        <ThemedView style={headerStyles.leagueContainer}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={headerStyles.leagueScroll}> 
          {leagues.map((league: any) => (
            <Pressable key={league}
            onPress={() => setLeague(league.toLowerCase())}
          >
            <View key={league} style={headerStyles.leagueButton}>
            <ThemedText style={[headerStyles.leagueText, league.toLowerCase() === currentLeague && headerStyles.leagueTextActive]}>
              {league}
            </ThemedText>
          </View>
          </Pressable>
          ))}
          </ScrollView>
        </ThemedView>
      }>
          {currentGameDetails?.map((item: any) => ( //We map each gabelow with gameData
  Object.entries(item).map(([gameKey, gameData]: [string, any]) => (
    <Pressable key={gameKey} // it runs before set state sets it to currently be nba, and it tries the abbreviations
      onPress={() => router.push({ // Each game can be pressed and that games data is sent to game Details - Params sends those variables
        pathname: '/game-details',
        params: {gameInfo: JSON.stringify(gameData), gameLeague: currentLeague, gameBroadcast: JSON.stringify(gameData.broadcast)}
      })}
      style={({ pressed }) => [
        activeGameCard(1.00, 0.20, 'column'),
        {
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopColor: '#D2D1D1',
          borderBottomColor: '#D2D1D1',
          opacity: pressed ? 0.7 : 1,
        }
      ]}>
      {/* MAIN GAME CARD CONTAINER */}
      <View style={[activeGameCard(1.00, 0.10, 'row'), {justifyContent: 'center',}]}>
      {/* UPPER CONTAINER */}
          <View style={[activeGameCard(0.74, 0.10, 'column')]}>
          {/* TEAM AND SCORE CONTAINER */}
              <View style={[activeGameCard(0.60, 0.05, 'row'), {justifyContent: 'space-between', padding: 8,}]}>
              {/* TEAM ONE CONTAINER */}
                  <View style={[activeGameCard(0.55, 0.05, 'row'), {justifyContent: 'flex-start',}]}>
                  {/* TEAM ONE LOGO AND NAME CONTAINER */}
                      <Image
                        source={{uri: `https://a.espncdn.com/i/teamlogos/${currentLeague}/500/${gameData.teamOneAbr}.png`}}
                        style={[gameCard.teamLogo]}
                      />
                      <ThemedText
                        style={gameCard.teamName}>
                        {gameData.teamOneName}
                      </ThemedText>
                  </View>
                  <View style={activeGameCard(0.07, 0.05, 'row')}>
                  {/* TEAM ONE SCORE CONTAINER */}
                    <ThemedText
                      style={[gameCard.teamName, {margin: 0}]}>
                      {gameData.teamOneScore}
                    </ThemedText>
                  </View>
              </View>
              <View style={[activeGameCard(0.60, 0.05, 'row'), {justifyContent: 'space-between', padding: 8,}]}>
              {/* TEAM TWO CONTAINER */}
                  <View style={[activeGameCard(0.55, 0.05, 'row'), {justifyContent: 'flex-start',}]}>
                  {/* TEAM TWO LOGO AND NAME CONTAINER */}
                      <Image
                        source={{uri: `https://a.espncdn.com/i/teamlogos/${currentLeague}/500/${gameData.teamTwoAbr}.png`}}
                        style={[gameCard.teamLogo]}
                      />
                      <ThemedText
                        style={gameCard.teamName}>
                        {gameData.teamTwoName}
                      </ThemedText>
                  </View>
                  <View style={activeGameCard(0.07, 0.05, 'row')}>
                  {/* TEAM TWO SCORE CONTAINER */}
                    <ThemedText
                      style={[gameCard.teamName, {margin: 0}]}>
                      {gameData.teamTwoScore}
                    </ThemedText>
                  </View>
              </View>
          </View>
          <View style={[activeGameCard(0.30, 0.10, 'column')]}>
          {/* BOTTOM CONTAINER */}
              <View style={[activeGameCard(0.23, 0.03, 'row')]}>
              {/* QUARTER CONTAINER */}
                  <ThemedText
                    style={gameCard.quarterTime}>
                    {gameData.quarter}
                  </ThemedText>
              </View>
              <View style={[activeGameCard(0.23, 0.03, 'row')]}>
              {/* TIME CONTAINER */}
                  <ThemedText
                    style={gameCard.quarterTime}>
                    {gameData.time}
                  </ThemedText>
              </View>
          </View>
      </View>
      <View style={[activeGameCard(1.00, 0.10, 'row'), {padding: 8, justifyContent: 'flex-start', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#3D3D3D', flexWrap: 'wrap',}]}>
      {/* BOTTOM CONTAINER */}
          <ThemedText
            style={gameCard.networkName}>
            {gameData.broadcast}
          </ThemedText>
      </View>
    </Pressable>
  ))
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

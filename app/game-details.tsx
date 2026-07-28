// This is your explore tab
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { activeGameCard, gameCard, gameDetails, headerStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import { useColorScheme } from 'react-native';

export default function FinderScreen() {
const colorScheme = useColorScheme();
const router = useRouter();

// Get the game Data from the home screen for the specific game that was pressed
const { gameInfo, gameLeague } = useLocalSearchParams();
const gameInfoObj = JSON.parse(Array.isArray(gameInfo) ? gameInfo[0] : gameInfo);
const gameBroadcast = gameInfoObj?.broadcast ?? null;

console.log("gameInfoObj:", gameInfoObj);

if (!gameInfoObj) {
  return ( // Just displays loading if there is no gameInfoObj loaded - Good for the half second where the variable isn't loaded yet - prevents crash
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}
  return (
      <ThemedView style={gameDetails.gameDetailContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <ThemedView style={[activeGameCard(0.80, 0.60, 'column'), gameDetails.gameDetails, {justifyContent: 'flex-start',}]}>
        {/* MAIN GAME CARD CONTAINER */}
            <ThemedView style={[activeGameCard(0.80, 0.12, 'row'), { borderRadius: 30,}]}>
            {/* TOP LEAGUE CONTAINER */}
              <ThemedView style={[activeGameCard(0.20, 0.10, 'row'), { alignItems: 'center',}]}>
              {/*  LEAGUE NAME CONTAINER */}
                  <ThemedText style={[headerStyles.leagueText, {fontSize: 30, lineHeight: 36}]}>
                    {(gameLeague as string).toUpperCase()}
                  </ThemedText>
              </ThemedView>
              {/* <View style={[activeGameCard(0.15, 0.08, 'row'), {backgroundColor: 'red', alignItems: 'flex-end', position: 'absolute', right: 0}]}> */}
              {/*  X BUTTON CONTAINER */}
                  <Pressable 
                    onPress={() => router.back()}
                    //onPress={() => router.replace('/finder')}
                    style={({ pressed }) => [
                      activeGameCard(0.15, 0.08, 'row'),
                      {
                        alignItems: 'center', position: 'absolute', right: 0, justifyContent: 'center', borderRadius: 30,
                        opacity: pressed ? 0.7 : 1,  // Visual feedback when pressed
                      }
                    ]}>
                    <Ionicons
                      name="close"
                      size={30}
                      color={colorScheme === 'dark' ? '#fff' : '#000'}
                      style={gameDetails.exitButton}
                      />
                  </Pressable>
            </ThemedView>
            <ThemedView style={[activeGameCard(0.80, 0.16, 'row'), {justifyContent: 'center',}]}>
            {/* MIDDLE SCORE CONTAINER */}
                <ThemedView style={activeGameCard(0.20, 0.16, 'column')}>
                {/* TEAM 1 SCORE CONTAINER */}
                    <Image
                      source={{uri: `https://a.espncdn.com/i/teamlogos/${gameLeague}/500/${gameInfoObj.teamOneAbr}.png`}}
                      style={[gameDetails.teamLogo]}
                    />
                    <ThemedText style={gameDetails.teamScore}>
                      {gameInfoObj.teamOneScore}
                    </ThemedText>
                </ThemedView>
                <ThemedView style={[activeGameCard(0.20, 0.16, 'column'), {justifyContent: 'flex-start',}]}>
                {/* MIDDLE SCORE CONTAINER */}
                    <ThemedText style={gameDetails.teamScore}>
                      {gameInfoObj.quarter}
                    </ThemedText>
                    <ThemedText style={gameDetails.teamScore}>
                      {gameInfoObj.time}
                    </ThemedText>
                </ThemedView> 
                <ThemedView style={activeGameCard(0.20, 0.16, 'column')}>
                {/* TEAM 2 SCORE CONTAINER */}
                    <Image
                      source={{uri: `https://a.espncdn.com/i/teamlogos/${gameLeague}/500/${gameInfoObj.teamTwoAbr}.png`}}
                      style={[gameDetails.teamLogo]}
                    />
                    <ThemedText style={gameDetails.teamScore}>
                      {gameInfoObj.teamTwoScore}
                    </ThemedText>
                </ThemedView>     
            </ThemedView>
            <ScrollView 
              style={gameDetails.networksScrollView}  // Remove alignItems and justifyContent from here
              contentContainerStyle={{  // Add them here instead
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
                {gameBroadcast && gameBroadcast.split(',').map((network: any) => (
                  <ThemedView style={gameDetails.networkContainer}>
                    <Text style={gameCard.networkName}>
                      {network.trim()}
                    </Text>
                  </ThemedView>
                ))}
            </ScrollView>
        </ThemedView>
      </ThemedView>
  );
}



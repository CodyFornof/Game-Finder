// This is your explore tab
import { ThemedView } from '@/components/themed-view';
import { activeGameCard, gameDetails, headerStyles } from '@/constants/Styles';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function FinderScreen() {
const router = useRouter();

const { gameInfo } = useLocalSearchParams();
const gameInfoObj = JSON.parse(Array.isArray(gameInfo) ? gameInfo[0] : gameInfo);

  return (
      <ThemedView style={gameDetails.gameDetailContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={[activeGameCard(0.80, 0.60, 'column'), gameDetails.gameDetails, {justifyContent: 'flex-start',}]}>
        {/* MAIN GAME CARD CONTAINER */}
            <View style={[activeGameCard(0.80, 0.08, 'row'), { borderRadius: 30,}]}>
            {/* TOP LEAGUE CONTAINER */}
              <View style={[activeGameCard(0.20, 0.08, 'row'), { alignItems: 'center',}]}>
              {/*  LEAGUE NAME CONTAINER */}
                  <Text style={[headerStyles.leagueText, {fontSize: 30,}]}>
                    {gameInfoObj.teamOne.name}
                  </Text>
              </View>
              {/* <View style={[activeGameCard(0.15, 0.08, 'row'), {backgroundColor: 'red', alignItems: 'flex-end', position: 'absolute', right: 0}]}> */}
              {/*  X BUTTON CONTAINER */}
                  <Pressable 
                    onPress={() => router.replace('/finder')}
                    style={({ pressed }) => [
                      activeGameCard(0.15, 0.08, 'row'),
                      {
                        alignItems: 'center', position: 'absolute', right: 0, justifyContent: 'center', borderRadius: 30,
                        opacity: pressed ? 0.7 : 1,  // Visual feedback when pressed
                      }
                    ]}>
                    <Image
                      source={require('@/components/ui/exit_button.png')}
                      style={[gameDetails.exitButton]}
                    />
                  </Pressable>
            </View>
            <View style={[activeGameCard(0.80, 0.16, 'row'), {justifyContent: 'center',}]}>
            {/* MIDDLE SCORE CONTAINER */}
                <View style={activeGameCard(0.20, 0.16, 'column')}>
                {/* TEAM 1 SCORE CONTAINER */}
                    <Image
                      source={require('@/assets/Logo/Denver_Nuggets.png')}
                      style={[gameDetails.teamLogo]}
                    />
                    <Text style={gameDetails.teamScore}>
                      {gameInfoObj.teamOne.score}
                    </Text>
                </View>
                <View style={[activeGameCard(0.20, 0.16, 'column'), {justifyContent: 'flex-start',}]}>
                {/* MIDDLE SCORE CONTAINER */}
                    <Text style={gameDetails.teamScore}>
                      {gameInfoObj.quarter}
                    </Text>
                    <Text style={gameDetails.teamScore}>
                      {gameInfoObj.time}
                    </Text>
                </View> 
                <View style={activeGameCard(0.20, 0.16, 'column')}>
                {/* TEAM 2 SCORE CONTAINER */}
                    <Image
                      source={require('@/assets/Logo/Indiana_Pacers.png')}
                      style={[gameDetails.teamLogo]}
                    />
                    <Text style={gameDetails.teamScore}>
                      {gameInfoObj.teamTwo.score}
                    </Text>
                </View>     
            </View>
            <ScrollView 
              style={gameDetails.networksScrollView}  // Remove alignItems and justifyContent from here
              contentContainerStyle={{  // Add them here instead
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <View style={gameDetails.networkContainer}>
                  <Text style={gameDetails.teamScore}>
                    NBA League Pass
                  </Text>
              </View>
              <View style={gameDetails.networkContainer}>
                  <Text style={gameDetails.teamScore}>
                    NBCSB
                  </Text>
              </View>
              <View style={gameDetails.networkContainer}>
                  <Text style={gameDetails.teamScore}>
                    YES
                  </Text>
              </View>
              <View style={gameDetails.networkContainer}>
                  <Text style={gameDetails.teamScore}>
                    NBA TV Canada
                  </Text>
              </View>
            </ScrollView>
        </View>
      </ThemedView>
  );
}



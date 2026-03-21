// This is your explore tab
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { activeGameCard, gameCard, headerStyles } from '@/constants/Styles';
import { TextStyles } from '@/constants/theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageSourcePropType, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function FinderScreen() {
const router = useRouter();

const leagues = ["NBA", "NFL", "MLB", "NHL", "MLS", "AHL"];

type GameData = {
  quarter: string;
  time: string;
  broadcasts: string;
  teamOne: {
    logo: string;
    name: string;
    score: string;
  };
  teamTwo: {
    logo: string;
    name: string;
    score: string;
  };
};

const teamLogos: Record<string, ImageSourcePropType> = {
  Nuggets: require("@/assets/Logo/Denver_Nuggets.png"),
  Pacers: require("@/assets/Logo/Indiana_Pacers.png"),
};

const scores: Record<string, GameData> = {
  game1: {
    quarter: "Final",
    time: "",
    broadcasts: "NBA League Pass, NBCSB, YES, NBA TV Canada",
    teamOne: {
      logo: "Nuggets",
      name: "Saint Louis",
      score: "72",
    },
    teamTwo: {
      logo: "Pacers",
      name: "Michigan",
      score: "95",
    }
  },
  game2: {
    quarter: "H1",
    time: "12:17",
    broadcasts: "NBA League Pass, NBCSB, YES, NBA TV Canada",
    teamOne: {
      logo: "Nuggets",
      name: "Louisville",
      score: "12",
    },
    teamTwo: {
      logo: "Pacers",
      name: "MI State",
      score: "19",
    }
  },
  game3: {
    quarter: "Today",
    time: "2:15PM",
    broadcasts: "NBA League Pass, NBCSB, YES, NBA TV Canada",
    teamOne: {
      logo: "Nuggets",
      name: "TCU",
      score: "",
    },
    teamTwo: {
      logo: "Pacers",
      name: "Duke",
      score: "",
    }
  },
  game4: {
    quarter: "Today",
    time: "3:10PM",
    broadcasts: "NBA League Pass, NBCSB, YES, NBA TV Canada",
    teamOne: {
      logo: "Nuggets",
      name: "Texas A&M",
      score: "",
    },
    teamTwo: {
      logo: "Pacers",
      name: "Houston",
      score: "",
    }
  },
};

const [currentLeague, setLeague] = useState('NBA')

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
      fixedHeader={
        <ThemedView style={headerStyles.leagueContainer}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={headerStyles.leagueScroll}>
          {leagues.map((league) => (
            <Pressable key={league}
            onPress={() => setLeague(league)}
          >
            <View key={league} style={headerStyles.leagueButton}>
            <ThemedText style={[headerStyles.leagueText, league === currentLeague && headerStyles.leagueTextActive]}>
              {league}
            </ThemedText>
          </View>
          </Pressable>
          ))}
          </ScrollView>
        </ThemedView>
      }>
      <ThemedView style={headerStyles.titleContainer}>
        <ThemedText
          type="title"
          style={TextStyles.day}>
          Today
        </ThemedText>
      </ThemedView>
          {Object.entries(scores).map(([key, value]) => (
            <Pressable key={key}
            onPress={() => router.replace({
              pathname: '/game-details', 
              params: {gameInfo: JSON.stringify(value)}
            })}
            style={({ pressed }) => [
              activeGameCard(1.00, 0.20, 'column'),
              {
                borderTopWidth: 1, 
                borderBottomWidth: 1, 
                borderTopColor: '#D2D1D1', 
                borderBottomColor: '#D2D1D1',
                opacity: pressed ? 0.7 : 1,  // Visual feedback when pressed
              }
            ]}
          >

              {/* MAIN GAME CARD CONTAINER */}
                          <View style={[activeGameCard(1.00, 0.10, 'row'), {justifyContent: 'center',}]}>
                          {/* UPPER CONTAINER */}
                              <View style={[activeGameCard(0.70, 0.10, 'column')]}>
                              {/* TEAM AND SCORE CONTAINER */}
                                  <View style={[activeGameCard(0.60, 0.05, 'row'), {justifyContent: 'space-between', padding: 8,}]}>
                                  {/* TEAM ONE CONTAINER */}
                                      <View style={[activeGameCard(0.45, 0.05, 'row'), {justifyContent: 'flex-start',}]}>
                                      {/* TEAM ONE LOGO AND NAME CONTAINER */}
                                          <Image
                                            source={teamLogos[value.teamOne.logo]}
                                            style={[gameCard.teamLogo]}
                                          />
                                          <ThemedText
                                            style={gameCard.teamName}>
                                            {value.teamOne.name}
                                          </ThemedText>
                                      </View>
                                      <View style={activeGameCard(0.15, 0.05, 'row')}>
                                      {/* TEAM ONE SCORE CONTAINER */}
                                        <ThemedText
                                          style={[gameCard.teamName, {margin: 0}]}>
                                          {value.teamOne.score}
                                        </ThemedText>
                                      </View>
                                  </View>
                                  <View style={[activeGameCard(0.60, 0.05, 'row'), {justifyContent: 'space-between', padding: 8,}]}>
                                  {/* TEAM TWO CONTAINER */}
                                      <View style={[activeGameCard(0.45, 0.05, 'row'), {justifyContent: 'flex-start',}]}>
                                      {/* TEAM TWO LOGO AND NAME CONTAINER */}
                                          <Image
                                            source={teamLogos[value.teamTwo.logo]}
                                            style={[gameCard.teamLogo]}
                                          />
                                          <ThemedText
                                            style={gameCard.teamName}>
                                            {value.teamTwo.name}
                                          </ThemedText>
                                      </View>
                                      <View style={activeGameCard(0.15, 0.05, 'row')}>
                                      {/* TEAM TWO SCORE CONTAINER */}
                                        <ThemedText
                                          style={[gameCard.teamName, {margin: 0}]}>
                                          {value.teamTwo.score}
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
                                        {value.quarter}
                                      </ThemedText>
                                  </View>
                                  <View style={[activeGameCard(0.23, 0.03, 'row')]}>
                                  {/* TIME CONTAINER */}
                                      <ThemedText
                                        style={gameCard.quarterTime}>
                                        {value.time}
                                      </ThemedText>
                                  </View>
                              </View>
                          </View>
                          <View style={[activeGameCard(1.00, 0.10, 'row'), {padding: 8, justifyContent: 'flex-start', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#3D3D3D', flexWrap: 'wrap',}]}>
                          {/* BOTTOM CONTAINER */}
                              <ThemedText
                                style={gameCard.networkName}>
                                {value.broadcasts}
                              </ThemedText>
                          </View>


            </Pressable>
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

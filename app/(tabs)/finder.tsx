// This is your explore tab
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { activeGameCard, gameCard, headerStyles } from '@/constants/Styles';
import { Fonts, TextStyles } from '@/constants/theme';
import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function FinderScreen() {
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
          <View style={headerStyles.leagueButton}>
            <Text style={headerStyles.leagueText}>
              NBA
            </Text>
          </View>
          <View style={headerStyles.leagueButton}>
            <Text style={headerStyles.leagueText}>
              NFL
            </Text>
          </View>
          <View style={headerStyles.leagueButton}>
            <Text style={headerStyles.leagueText}>
              NHL
            </Text>
          </View>
          <View style={headerStyles.leagueButton}>
            <Text style={headerStyles.leagueText}>
              MLB
            </Text>
          </View>
        </ThemedView>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={TextStyles.day}>
          Today
        </ThemedText>
      </ThemedView>
        <View style={[activeGameCard(1.00, 0.16, 'column'), {borderWidth: 2,}]}> 
        {/* MAIN GAME CARD CONTAINER */}
            <View style={[activeGameCard(1.00, 0.10, 'row'), {borderWidth: 2,}]}>
            {/* UPPER CONTAINER */}
                <View style={[activeGameCard(0.80, 0.10, 'column'), {borderWidth: 2, alignItems: 'flex-start',}]}>
                {/* TEAM AND SCORE CONTAINER */}
                    <View style={[activeGameCard(0.70, 0.05, 'row'), {borderWidth: 2, justifyContent: 'space-between', padding: 8,}]}>
                    {/* TEAM ONE CONTAINER */}
                        <View style={[activeGameCard(0.45, 0.05, 'row'), {borderWidth: 2, justifyContent: 'flex-start'}]}>
                        {/* TEAM ONE LOGO AND NAME CONTAINER */}
                            <Image
                              source={require('@/assets/Logo/Denver_Nuggets.png')}
                              style={[gameCard.teamLogo]}
                            />
                            <ThemedText
                              style={gameCard.teamName}>
                              Nuggets
                            </ThemedText>
                        </View>
                        <View style={[activeGameCard(0.10, 0.05, 'row'), {borderWidth: 2, justifyContent: 'flex-end'}]}>
                        {/* TEAM TWO SCORE CONTAINER */}
                          <ThemedText
                            style={[gameCard.teamName, {marginLeft: 12}]}>
                            72
                          </ThemedText>
                        </View>
                    </View>
                    <View style={[activeGameCard(0.70, 0.05, 'row'), {borderWidth: 2, justifyContent: 'space-between', padding: 8,}]}>
                    {/* TEAM TWO CONTAINER */}
                        <View style={[activeGameCard(0.45, 0.05, 'row'), {borderWidth: 2, justifyContent: 'flex-start'}]}>
                        {/* TEAM TWO LOGO AND NAME CONTAINER */}
                            <Image
                              source={require('@/assets/Logo/Indiana_Pacers.png')}
                              style={[gameCard.teamLogo]}
                            />
                            <ThemedText
                              style={gameCard.teamName}>
                              Timberwolves
                            </ThemedText>
                        </View>
                        <View style={[activeGameCard(0.15, 0.05, 'row'), {borderWidth: 6}]}>
                        {/* TEAM TWO SCORE CONTAINER */}
                          <ThemedText
                            style={[gameCard.teamName, {margin: 0}]}>
                            64
                          </ThemedText>
                        </View>
                    </View>
                </View>
                <View style={[activeGameCard(0.20, 0.10, 'row'), {borderWidth: 2,}]}>
                {/* QUARTER AND TIMER CONTAINER */}
                </View>
            </View>
            <View style={[activeGameCard(1.00, 0.06, 'row'), {borderWidth: 2,}]}>
            {/* BOTTOM CONTAINER */}
            </View>
        </View>
      <Collapsible title="File-based routing">
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Base style with common properties
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Layout = {
  // Screen dimensions (if you need responsive layouts)
  window: {
    width,
    height,
  },
  
  // Breakpoints for truly responsive designs (optional)
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 768,
  isLargeDevice: width >= 768,
};

export const headerStyles = StyleSheet.create({
  topHeaderContainer: {
    height: Layout.window.height * 0.08,  // 15% of screen height
    //justifyContent: 'center',
    alignItems: 'center',
    //width: Layout.window.width,
    borderBottomWidth: 2,
    borderBottomColor: '#BCBCBC'
  },
  leagueContainer: {
    height: Layout.window.height * 0.06,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    position: 'relative',
  },
  leagueButton: {
    height: Layout.window.height * 0.10,
    width: Layout.window.width * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    paddingVertical: 12,
  },
  leagueText: {
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 24,
    //color: '#000',
  },
  titleContainer: {
    flexDirection: 'row',
    margin: 8,
  },
  leagueTextActive: {
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 24,
    color: '#22c55e', // Green color when active
  },
  leagueScroll: {
    height: 100,
    marginVertical: 20,
  },
  leagueUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '25%', // Since there are 4 leagues
    backgroundColor: '#22c55e',
    borderRadius: 2,
  },
  leaguePressable: { // OUT OF USE, NEED TO IMPLEMENT THIS INTO CODE
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderTopColor: '#D2D1D1', 
    borderBottomColor: '#D2D1D1',
    // opacity: pressed ? 0.7 : 1,  // Visual feedback when pressed
  }
});

export const gameCard = StyleSheet.create({
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  teamLogo: {
    width: 28,
    height: 28,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
    fontFamily: 'Arial',
  },
  quarterTime: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'right',
  },
  networkName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    color: '#0EAD00',
    alignSelf: 'center',
  },
});

export const gameDetails = StyleSheet.create({
  gameDetailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  gameDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    flexDirection: 'column',
  },
  exitButton: {
    width: 30,
    height: 30,
  },
  teamLogo: {
    height: 60,
    width: 60,
  },
  teamScore: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 8,
    fontFamily: 'Arial',
    color: '#000',
  },
  networksScrollView: {
    width: Layout.window.width * 0.80,
    height: Layout.window.height * 0.36,
    flexDirection: 'column',
  },
  networkContainer: {
    borderTopWidth: 1,
    borderTopColor: '#3D3D3D',
    borderBottomWidth: 1,
    borderBottomColor: '#3D3D3D',
    width: Layout.window.width * 0.80,
    height: Layout.window.height * 0.08,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
});

export const activeGameCard = (
  widthMultiplier: number,
  heightMultiplier: number,
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse' = 'column'
) => ({
  ...styles.centeredContainer,
  width: Layout.window.width * widthMultiplier,
  height: Layout.window.height * heightMultiplier,
  flexDirection,
});


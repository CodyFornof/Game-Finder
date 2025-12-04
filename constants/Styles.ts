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
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    position: 'sticky',
  },
  leagueButton: {
    height: Layout.window.height * 0.05,
    width: Layout.window.width * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  leagueText: {
    fontWeight: 'bold',
    fontFamily: 'sans',
    fontSize: 24,
    color: 'white'
  },
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


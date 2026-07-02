import { ThemedView } from '@/components/themed-view';
import { headerStyles } from '@/constants/Styles';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { PropsWithChildren, ReactElement } from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollOffset } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 0;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  fixedHeader?: ReactElement;
}>;

const screenLogo: Record<string, ImageSourcePropType> = {
  logo: require("@/assets/Logo/gpt_trans_logo.png"),
};

export default function ParallaxScrollView({
  children,
  fixedHeader,
}: Props) {
 // Resolves the background colow light/dark mode
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  // Reference used by reanimated to track scroll position
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  // Shared value representing the current vertical scroll offset
  const scrollOffset = useScrollOffset(scrollRef);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={['top']}>
      {/* Fixed logo bar — always pinned to the top, outside the ScrollView,
          so it never scrolls with content. */}
      <ThemedView style={headerStyles.topHeaderContainer}>
        <Image
          source={screenLogo.logo}
          style={[headerStyles.appLogo]}
        />
      </ThemedView> 
      {/* Fixed Header (conditional, passed as prop) stays at the top, sits right below the logo bar */}
      {fixedHeader}
      <Animated.ScrollView
        ref={scrollRef}
        style={{ backgroundColor, flex: 1 }}
        scrollEventThrottle={16}>
          {/* Scrolls with content but animates its position based on scroll offset */}
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: '#07FF00' },
            //{ backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
        </Animated.View>
        {/* Main scrollable page content */}
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    //gap: 16,
    overflow: 'hidden',
  },
});

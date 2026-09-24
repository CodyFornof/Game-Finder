import { Image } from 'expo-image';

type navbarIcon = {
    focused: boolean,
    activeIcon: number,
    inactiveIcon: number,
    size?: number,
};

export function NavigationIcon({focused, activeIcon, inactiveIcon, size=28}: navbarIcon) {
    return<Image style={{width:size, height: size}} source={focused ? activeIcon : inactiveIcon} contentFit="contain"/>
}  

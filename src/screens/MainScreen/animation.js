import { Animated } from 'react-native';
const Animation = new Animated.Value(0);

export const animationAction = () =>
    Animated.loop(
        Animated.timing(Animation, {
            toValue: 1,
            duration: 2000,
        }),
    ).start();

export const animationStyles = {
    transform: [
        {
            translateY: Animation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, -10, 0],
            }),
        },
    ],
};

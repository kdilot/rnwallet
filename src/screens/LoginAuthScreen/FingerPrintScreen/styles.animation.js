import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Text } from 'react-native';

class ShakingText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shakedValue: new Animated.Value(0),
        };
    }

    get animatedStyle() {
        return {
            transform: [
                {
                    translateX: this.state.shakedValue.interpolate({
                        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        outputRange: [0, 4, 0, -4, 0, 4, 0, -4, 0, 4, 0],
                    }),
                },
            ],
        };
    }

    shake = () => {
        Animated.spring(this.state.shakedValue, {
            toValue: 1,
            friction: 10,
            tension: 10,
        }).start(() => this.state.shakedValue.setValue(0));
    };

    render() {
        return <Animated.Text {...this.props} style={[this.animatedStyle, this.props.style]} />;
    }
}

ShakingText.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    style: Text.propTypes.style,
};

export default ShakingText;

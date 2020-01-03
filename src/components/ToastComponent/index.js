import React, { PureComponent } from 'react';
import { Text, Dimensions, Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class ToastComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Toast Message',
            animation: new Animated.Value(-100),
        };
    }

    showToast = (message = 'Toast Message', timer = 1500) => {
        const { animation } = this.state;

        this.setState({ message });

        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
        }).start();

        setTimeout(() => {
            this.hideToast();
        }, timer);
    };

    hideToast = () => {
        const { animation } = this.state;
        Animated.timing(animation, {
            toValue: -100,
            duration: 500,
        }).start();
    };

    render() {
        const { animation, message } = this.state;
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        width: Dimensions.get('window').width,
                        bottom: animation,
                    },
                ]}>
                <Text style={styles.textStyle}>{message}</Text>
            </Animated.View>
        );
    }
}

ToastComponent.propTypes = {
    message: PropTypes.string,
    animation: PropTypes.string,
    timer: PropTypes.number,
    showToast: PropTypes.func,
    hideToast: PropTypes.func,
};

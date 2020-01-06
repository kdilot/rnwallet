import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import icon from './Icon';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Icon extends PureComponent {
    static defaultProps = {
        size: 50,
        style: {},
        iconStyle: {},
        name: 'roz',
    };

    render() {
        const { size, iconStyle, style, name } = this.props;
        return (
            <View style={style}>
                <Image source={icon[name]} style={[styles.size(size), iconStyle]} />
            </View>
        );
    }
}

Icon.propTypes = {
    size: PropTypes.number,
    name: PropTypes.string,
    style: PropTypes.object,
    iconStyle: PropTypes.object,
};

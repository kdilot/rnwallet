import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import { IconComponent } from 'components';
import S from './styles';
import PropTypes from 'prop-types';

const WIDTH = Dimensions.get('screen').width * 0.65;

export default class OverlayComponent extends Component {
    static defaultProps = {
        text: 'Overlay Text',
        isVisible: false,
    };
    render() {
        const { isVisible, text } = this.props;
        return (
            <Overlay isVisible={isVisible} height={WIDTH} overlayStyle={S.OverlayView}>
                <View style={S.ContainerView}>
                    <View style={S.MessageView}>
                        <Text style={S.MessageText}>{text}</Text>
                    </View>
                    <View style={S.IconView}>
                        <IconComponent name={'img_loading'} size={80} />
                    </View>
                </View>
            </Overlay>
        );
    }
}

OverlayComponent.propTypes = {
    text: PropTypes.string,
    isVisible: PropTypes.bool,
};

import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import S from './styles';

export default class LoadComponent extends PureComponent {
    static defaultProps = {
        isLoad: false,
    };
    render() {
        const { isLoad } = this.props;
        return (
            <View style={S.IsEmptyView}>
                <Text>{isLoad ? 'NO DATA' : 'Loading...'}</Text>
            </View>
        );
    }
}

LoadComponent.propTypes = {
    isLoad: PropTypes.bool,
};

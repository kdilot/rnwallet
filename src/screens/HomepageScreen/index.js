import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class HomePageScreen extends Component {
    render() {
        return (
            <WebView
                source={{ uri: 'https://rozeus.io/' }}
                style={[styles.container, { width: WIDTH }]}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={[styles.loadingLayout, { width: WIDTH, height: HEIGHT }]}>
                        <Text>Loading</Text>
                    </View>
                )}
            />
        );
    }
}

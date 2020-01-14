import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';

const WIDTH = Dimensions.get('window').width;

export default class HomePageScreen extends Component {
    render() {
        return <WebView source={{ uri: 'https://rozeus.io/' }} style={[styles.container, { width: WIDTH }]} />;
    }
}

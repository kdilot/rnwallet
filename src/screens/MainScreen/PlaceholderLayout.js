import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Placeholder, PlaceholderLine, Shine } from 'rn-placeholder';

export default class Placeholderlayout extends Component {
    render() {
        return (
            <Placeholder style={styles.container} Animation={Shine}>
                <PlaceholderLine style={styles.line} />
            </Placeholder>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    line: { width: '100%', height: 200, borderRadius: 10 },
});

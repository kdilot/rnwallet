import React, { Component } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import AddressBookComponent from 'components/AddressBookComponent';
import PropTypes from 'prop-types';
import styles from './styles';
import sampleData from './sampleData.json';

export default class AddressBookScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            data: sampleData,
        };
    }

    render() {
        // const { page } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.itemListLayout}>
                    <FlatList
                        data={sampleData}
                        renderItem={({ item }) => <AddressBookComponent nickname={item.nickname} address={item.address} />}
                        keyExtractor={(item, index) => index.toString()}
                        // refreshing={refreshing}
                        // onRefresh={() => {
                        //     this.onRefresh();
                        // }}
                        // onEndReached={() => {
                        //     this.getData(page);
                        // }}
                        onEndReachedThreshold={0.2}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

AddressBookScreen.proptpes = {
    page: PropTypes.number,
    data: PropTypes.array,
};

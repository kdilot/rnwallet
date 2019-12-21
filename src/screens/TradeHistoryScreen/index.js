import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import WalletHistoryComponent from 'components/WalletHistoryComponent';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';
import styles from './styles';

import sampleData from './sampleData.json';

export default class TradeHistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            data: sampleData,
            extraData: [],
            itemType: 0,
            refreshing: false,
        };
    }

    onRefresh = () => {
        this.setState({
            refreshing: true,
            page: 1,
        });
        this.getData();
    };

    getData = page => {
        const { data } = this.state;
        if (!page) {
            // 데이터 초기화
            this.setState({
                data: sampleData,
                refreshing: false,
                page: 1,
            });
        } else {
            // 데이터 추가
            this.setState({
                data: data.concat(sampleData),
                refreshing: false,
                page: page + 1,
            });
        }
    };

    setType = type => {
        this.setState({
            itemType: type,
        });
        this.getData(0);
    };

    render() {
        const { page, refreshing, data, itemType } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.itemTypeLayout}>
                    <CardView cardElevation={5} cornerRadius={10} style={styles.typeLayout}>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === 0 && styles.typeSelected]}
                            onPress={() => {
                                this.setType(0);
                            }}>
                            <Text style={[styles.textStyle, itemType === 0 && styles.typeSelectedText]}>전체</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === 1 && styles.typeSelected]}
                            onPress={() => {
                                this.setType(1);
                            }}>
                            <Text style={[styles.textStyle, itemType === 1 && styles.typeSelectedText]}>ROZ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === 2 && styles.typeSelected]}
                            onPress={() => {
                                this.setType(2);
                            }}>
                            <Text style={[styles.textStyle, itemType === 2 && styles.typeSelectedText]}>주소록</Text>
                        </TouchableOpacity>
                    </CardView>
                </View>
                <View style={styles.itemListLayout}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <WalletHistoryComponent send={item.send} status={item.status} date={item.date} value={item.value} />}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        refreshing={refreshing}
                        onRefresh={() => {
                            this.onRefresh();
                        }}
                        onEndReached={() => {
                            this.getData(page);
                        }}
                        onEndReachedThreshold={0.2}
                    />
                </View>
            </View>
        );
    }
}

TradeHistoryScreen.proptpes = {
    data: PropTypes.array,
    extraData: PropTypes.array,
    refreshing: PropTypes.bool,
    page: PropTypes.number,
    onRefresh: PropTypes.func,
    getData: PropTypes.func,
    setType: PropTypes.func,
};

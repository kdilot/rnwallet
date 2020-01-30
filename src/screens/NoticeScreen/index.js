import React, { PureComponent } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import S from './styles';

const arr = new Array(10);
class ListLayout extends PureComponent {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView>
                <FlatList
                    data={arr}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={S.NoticeListView} onPress={() => navigation.push('Notice', { selected: index })}>
                            <Text>공지사항 제목</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={S.DividerView} />}
                    ListFooterComponent={() => arr && <View style={S.DividerView} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }
}

export default class NoticeScreen extends PureComponent {
    render() {
        const { params } = this.props.navigation.state;
        return params ? (
            <SafeAreaView>
                <View style={S.NoticeHeaderView}>
                    <Text>공지사항 제목</Text>
                </View>
                <ScrollView style={S.NoticeContentView}>
                    <Text>공지사항 내용</Text>
                </ScrollView>
            </SafeAreaView>
        ) : (
            <ListLayout {...this.props} />
        );
    }
}

import React, { PureComponent } from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';
import { getNoticeList } from 'api/Notice/NoticeApi';
import { NoticeComponent, LoadComponent } from 'components';
import AsyncStorage from '@react-native-community/async-storage';

export default class NoticeScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOnNoticeDetail: false,
            isOnNotice: {
                title: '',
                contents: '',
                inDt: '',
            },
            noticeList: [],
            noticeDetail: {
                no: 1,
                title: '',
                inDt: '',
                contents: '',
                isNew: true,
            },
            isLoad: false,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { params } = this.props.navigation.state;

        if (params && params.isOnNoticeDetail) {
            this.setState({
                isOnNoticeDetail: true,
                noticeDetail: params.noticeDetail,
            });
            return;
        }

        this.focusListener = navigation.addListener('didFocus', async payload => {
            this.getNoticeList();
        });
    }

    getNoticeList = async () => {
        let noticeList = [];
        noticeList = await getNoticeList();

        let noticeRead = await this.getNoticeRead();
        for (let i = 0; i < noticeList.length; i++) {
            if (!noticeRead[noticeList[i].no]) {
                noticeList[i].isNew = true;
            } else {
                noticeList[i].isNew = false;
            }
        }

        this.setState({ noticeList: noticeList, isLoad: true });
    };

    getNoticeRead = async () => {
        let noticeRead = await AsyncStorage.getItem('notice');

        if (noticeRead) {
            noticeRead = JSON.parse(noticeRead);
        } else {
            noticeRead = {};
        }

        return noticeRead;
    };

    setNoticeRead = async noticeNo => {
        let noticeRead = await this.getNoticeRead('notice');
        noticeRead[noticeNo] = true;
        AsyncStorage.setItem('notice', JSON.stringify(noticeRead));
    };

    pressNotice = noticeDetail => {
        this.props.navigation.push('Notice', { isOnNoticeDetail: true, noticeDetail: noticeDetail });
        this.setNoticeRead(noticeDetail.no);
    };

    render() {
        const { noticeList, noticeDetail, isLoad } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isOnNoticeDetail ? (
                    <View style={styles.noticeDetail}>
                        <View style={styles.noticeDetail__titleBox}>
                            <Text style={styles.noticeDetail__title}>{noticeDetail.title}</Text>
                            <Text style={styles.noticeDetail__inDt}>{noticeDetail.inDt}</Text>
                        </View>
                        <View style={styles.noticeDetail__contentsBox}>
                            <Text style={styles.noticeDetail__contents}>{noticeDetail.contents}</Text>
                        </View>
                    </View>
                ) : isLoad ? (
                    <FlatList data={noticeList} renderItem={({ item }) => <NoticeComponent notice={item} pressNotice={this.pressNotice} />} keyExtractor={(item, index) => String(index)} />
                ) : (
                    <LoadComponent isLoad={isLoad} />
                )}
            </SafeAreaView>
        );
    }
}

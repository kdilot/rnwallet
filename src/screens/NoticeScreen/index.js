import React, { PureComponent } from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';
import { getNoticeList } from 'api/Notice/NoticeApi';
import { NoticeComponent, LoadComponent } from 'components';

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
            },
            isLoad: false,
        };
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        if (params && params.isOnNoticeDetail) {
            this.setState({
                isOnNoticeDetail: true,
                noticeDetail: params.noticeDetail,
            });
            return;
        }

        this.getNoticeList();
    }

    getNoticeList = async () => {
        let noticeList = [];
        noticeList = await getNoticeList();

        this.setState({ noticeList: noticeList, isLoad: true });
    };

    pressNotice = noticeDetail => {
        this.props.navigation.push('Notice', { isOnNoticeDetail: true, noticeDetail: noticeDetail });
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

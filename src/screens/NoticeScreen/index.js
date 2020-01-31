import React, { PureComponent } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { getNoticeList } from 'api/Notice/NoticeApi';
import NoticeComponent from 'components/NoticeComponent';

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

        this.setState({ noticeList: noticeList });
    };

    pressNotice = noticeDetail => {
        this.props.navigation.push('Notice', { isOnNoticeDetail: true, noticeDetail: noticeDetail });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.isOnNoticeDetail ? (
                    <View style={styles.noticeDetail}>
                        <View style={styles.noticeDetail__titleBox}>
                            <Text style={styles.noticeDetail__title}>{this.state.noticeDetail.title}</Text>
                            <Text style={styles.noticeDetail__inDt}>{this.state.noticeDetail.inDt}</Text>
                        </View>
                        <View style={styles.noticeDetail__contentsBox}>
                            <Text style={styles.noticeDetail__contents}>{this.state.noticeDetail.contents}</Text>
                        </View>
                    </View>
                ) : (
                    <FlatList data={this.state.noticeList} renderItem={({ item }) => <NoticeComponent notice={item} pressNotice={this.pressNotice} />} keyExtractor={(item, index) => String(index)} />
                )}
            </View>
        );
    }
}

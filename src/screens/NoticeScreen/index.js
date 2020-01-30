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
		};
	}

	componentDidMount() {
		this.getNoticeList();
	}

	getNoticeList = async () => {
		let noticeList = [];
		noticeList = await getNoticeList();

		this.setState({ noticeList: noticeList });
	};

	render() {
		const { params } = this.props.navigation.state;
		return (
			<View style={styles.container}>
				{this.state.isOnNoticeDetail ? (
					<View style={noticeDetail}>
						<View style={styles.noticeDetail__titleBox}>
							<Text style={styles.noticeDetail__title}>{this.state.title}</Text>
							<Text style={styles.noticeDetail__inDt}>{this.state.inDt}</Text>
						</View>
						<View style={styles.noticeDetail__contentsBox}>
							<Text style={styles.noticeDetail__contents}>{this.state.contents}</Text>
						</View>
					</View>
				) : (
					<FlatList data={this.state.noticeList} renderItem={({ item }) => <NoticeComponent notice={item} />} keyExtractor={(item, index) => String(index)} />
				)}
			</View>
		);
	}
}

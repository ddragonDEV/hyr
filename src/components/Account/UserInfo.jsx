import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserInfo = (props) => {
	const { user } = props;
	//console.log(user)
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bienvenido, </Text>
			<Text style={styles.titleName}>
				{user.name && user.lastname ? `${user.name} ${user.lastname}, ${user.rol}` : user.email}
			</Text>
		</View>
	);
};

export default UserInfo;

const styles = StyleSheet.create({
	container: {
		height: 100,
		justifyContent: 'center',
		padding: 20
	},
	title: {
		fontSize: 20
	},
	titleName: {
		fontSize: 20,
		fontWeight: 'bold'
	}
});

import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { map } from 'lodash';
import colors from '../../styles/colors';
import { deleteOperarioApi } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const OperarioList = (props) => {
	const { auth } = useAuth();
	const { users, setReloadAddress } = props;
	const navigation = useNavigation();

	const deleteAddressAlert = (user) => {
		Alert.alert(
			'Eliminando operario',
			`¿Estás seguro que quieres eliminar el operario ${user.username}`,
			[
				{
					text: 'NO'
				},
				{
					text: 'SI',
					onPress: () => deleteOperario(user.id)
				}
			],
			{ cancelable: false }
		);
	};

	const deleteOperario = async (idOperario) => {
		try {
			await deleteOperarioApi(auth, idOperario);
			setReloadAddress(true);
		} catch (error) {
			console.log(error);
		}
	};

	const goToUpdateOperario = (idOperario) => {
		navigation.navigate('add-operario', { idOperario });
	};

	return (
		<View style={styles.container}>
			{map(users, (user) => (
				<View key={user.id} style={styles.address}>
					<Text style={styles.title}>
						{user.name} {user.lastname}
					</Text>
					<Text>{user.email}</Text>
					<Text>{user.username}</Text>

					<View style={styles.actions}>
						<Button mode="contained" color={colors.primary} onPress={() => goToUpdateOperario(user.id)}>
							Editar
						</Button>
						<Button mode="contained" color={colors.primary} onPress={() => deleteAddressAlert(user)}>
							Eliminar
						</Button>
					</View>
				</View>
			))}
		</View>
	);
};

export default OperarioList;

const styles = StyleSheet.create({
	container: {
		marginTop: 50
	},
	address: {
		borderWidth: 0.9,
		borderRadius: 5,
		borderColor: '#ddd',
		paddingHorizontal: 15,
		paddingVertical: 15,
		marginBottom: 15
	},
	title: {
		fontWeight: 'bold',
		paddingBottom: 5,
		color: '#262626'
	},
	blockLine: {
		flexDirection: 'row'
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 30
	}
});

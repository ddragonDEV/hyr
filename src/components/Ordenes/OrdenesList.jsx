import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { map } from 'lodash';
import colors from '../../styles/colors';
import { deteleOTapi } from '../../api/orders';
import { getOrdersApi } from '../../api/orders';

import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const OrdenesList = (props) => {
	const { auth } = useAuth();
	const { users, setReloadAddress } = props;
	const navigation = useNavigation();

	const deleteAddressAlert = (user) => {
		Alert.alert(
			'Eliminando OT',
			`¿Estás seguro que quieres eliminar la OT ${user.motivoFaena} de la empresa ${user.empresa.nombreEmpresa}`,
			[
				{
					text: 'NO'
				},
				{
					text: 'SI',
					onPress: () => deleteAddress(user.id)
				}
			],
			{ cancelable: false }
		);
	};

	const deleteAddress = async (idOrden) => {
		try {
			await deteleOTapi(auth, idOrden);
			setReloadAddress(true);
		} catch (error) {
			console.log(error);
		}
	};

	const goToUpdateAddress = (idOrden) => {
		navigation.navigate('add-ordenes', { idOrden });
	};

	return (
		<View style={styles.container}>
			{map(users, (user) => (
				<View key={user.id} style={styles.address}>
					<Text style={styles.title}>{user.empresa.nombreEmpresa}</Text>
					<Text>{user.empresa.giroEmpresa}</Text>
					<Text>{user.empresa.rutEmpresa}</Text>
					<Text>{user.empresa.email}</Text>
					<Text>
						Estado del Pago: <Text style={{ fontWeight: 'bold', color: 'tomato' }}>{user.estadoPago}</Text>
					</Text>

					<View style={styles.actions}>
						<Button mode="contained" color={colors.primary} onPress={() => goToUpdateAddress(user.id)}>
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

export default OrdenesList;

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

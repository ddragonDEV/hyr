import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { map } from 'lodash';

const Saldos = () => {
	const [ responseSaldos, setResponseSaldos ] = useState();

	useEffect(() => {
		getSaldosPendientesApi();
	}, []);

	console.log(responseSaldos);

	async function getSaldosPendientesApi() {
		try {
			const url = `http://dev.love.cl:1337/ots?estadoPago=Pendiente`;
			const params = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const response = await fetch(url, params);
			const result = await response.json();
			setResponseSaldos(result);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	return (
        <>
                    <View style={{ 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20}}>
            <Text style={{ fontSize: 20, paddingTop: 20, color: '#000029', fontWeight: 'bold'  }}>
                Saldos Pendientes
            </Text>
            </View>





		<View style={styles.container}>
        {map(responseSaldos, (saldos) => (
			<View key={saldos.id} style={styles.address}>
            <Text style={{ color:'#000029' }}>ID:<Text style={styles.title}>{saldos.id}</Text></Text>
            <Text style={{ color:'#000029' }}>Nombre Empresa:<Text style={styles.title}>{saldos.empresa.nombreEmpresa}</Text></Text>
            <Text style={{ color:'#000029' }}>Giro:<Text style={styles.title}>{saldos.empresa.giroEmpresa}</Text></Text>
            <Text style={{ color:'#000029' }}>Rut Empresa:<Text style={styles.title}>{saldos.empresa.rutEmpresa}</Text></Text>
            <Text style={{ color:'#000029' }}>Correo:<Text style={styles.title}>{saldos.empresa.email}</Text></Text>
            <Text style={{ color:'#000029' }}>Teléfono::<Text style={styles.title}>{saldos.empresa.telefonoEmpresa}</Text></Text>
            <Text style={{ color:'#000029' }}>Dirección Empresa:<Text style={styles.title}>{saldos.empresa.direccionEmpresa}</Text></Text>

            <Text style={{ color:'#000029' }}>Total Proyecto:<Text style={styles.title}>${saldos.total}</Text></Text>
            <Text style={{ color:'#000029' }}>Motivo Faena:<Text style={styles.title}>{saldos.motivoFaena}</Text></Text>

            <Text></Text>
            <Text style={{ fontSize: 18 }}> 
                Estado del Pago: <Text style={{ fontWeight: 'bold', color: 'tomato' }}>{saldos.estadoPago}</Text>
            </Text>
        </View>


            ))}
		</View>
        </>
	);
};

export default Saldos;

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		padding: 20
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

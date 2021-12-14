import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyle } from '../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { update } from 'lodash';
import { getEmpresaApi, registerOrdenTrabajoApi, updateOrdenApi, getOrdenApi } from '../../api/orders';
import { validate, clean, format, getCheckDigit } from 'rut.js';
import { map } from 'lodash';
import { Picker } from '@react-native-picker/picker';



const AddOrden = (props) => {
	const { route: { params } } = props;
	const [ loading, setLoading ] = useState(false);
	const [ newAddress, setNewAddress ] = useState(true);
	const { auth } = useAuth();
	const navigation = useNavigation();
	const [ selectedValue, setSelectedValue ] = useState('java');
	const [ empresas, setEmpresas ] = useState(null);
	const [ reloadEmpresa, setReloadEmpresa ] = useState(false);
	const [ selectedEmpresa, setSelectedEmpresa ] = useState();
	const [ date, setDate ] = useState(new Date());
	const [ totalOT, setTotalOT ] = useState('');
	const [ netoOT, setNetoOT ] = useState('');
	const [selectedState, setSelectedState] = useState();

	console.log('total', totalOT)
	



	useEffect(() => {
        (async () => {
            if(params?.idOrden){
                setNewAddress(false)
                navigation.setOptions({ title: "Actualizar OT"})
                const response = await getOrdenApi(auth, params.idOrden)
				setSelectedEmpresa(response.empresa.id)
				await formik.setFieldValue('motivoFaena', response.motivoFaena)
				await formik.setFieldValue('Transporte', response.Transporte)
				await formik.setFieldValue('condicionPago', response.condicionPago)
				//await formik.setFieldValue('estadoPago', response.estadoPago)
				setSelectedState(response.estadoPago)
				//await formik.setFieldValue('neto', response.neto)
				await formik.setFieldValue('observaciones', response.observaciones)
				await formik.setFieldValue('aceptadoPor', response.aceptadoPor)
				await formik.setFieldValue('rutAceptador', response.rutAceptador)
            }

        })()
    }, [params])




	useFocusEffect(
		useCallback(
			() => {
				setEmpresas(null);

				(async () => {
					const response = await getEmpresaApi(auth);
					setEmpresas(response);
					//console.log('respuesta empresa', response);
					setReloadEmpresa(false);
				})();
			},
			[ reloadEmpresa ]
		)
	);

	function sacarIVA(montoNeto) {
		return parseInt(montoNeto / 100 * 19);
	}

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);

			try {
				if (newAddress)  await registerOrdenTrabajoApi(auth, formData, selectedEmpresa, selectedState, totalOT);
				else await updateOrdenApi(auth, params.idOrden, formData, selectedEmpresa, totalOT)
				console.log(formData)
				navigation.goBack();
			} catch (error) {
				console.log(error);
				setLoading(false);
				Toast.show('Error al crear OT', {
					position: Toast.positions.CENTER
				});
			}
		}
	});

	return (
		<KeyboardAwareScrollView extraScrollHeight={25}>
			<View style={styles.container}>
				<Text style={styles.title}> {newAddress ? 'Nueva OT' : 'Editar OT'}</Text>
				<View
					style={{
						width: '100%',
						marginTop: 15,
						marginLeft: 20,
						marginRight: 20,
						marginBottom: 20,
						borderColor: '#262626',
						borderWidth: 1,
						borderRadius: 5,
						alignSelf: 'center'
					}}
				>
					<Picker
						mode="dialog"
						selectedValue={selectedEmpresa}
						onValueChange={(itemValue, itemIndex) => setSelectedEmpresa(itemValue)}
						itemStyle={{ fontWeight: 'bold', color: '#ff0000' }}
						style={{ height: 50, width: '100%' }}
					>
						<Picker.Item label="Selecciona una empresa..." value="0" />

						{map(empresas, (empresa) => (
							<Picker.Item key={empresa.id} label={`${empresa.nombreEmpresa}`} value={empresa.id} />
						))}
					</Picker>
				</View>
				<TextInput
					label="Motivo Faena"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('motivoFaena', text)}
					value={formik.values.motivoFaena}
					error={formik.errors.motivoFaena}
					theme={{
						colors: {
							text: '#262626',
							primary: '#FE9100',
							underlineColor: '#FE9100',
							background: 'white'
						}
					}}
				/>
				<TextInput
					label="Transporte"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('Transporte', text)}
					value={formik.values.Transporte}
					error={formik.errors.Transporte}
					theme={{
						colors: {
							text: '#262626',
							primary: '#FE9100',
							underlineColor: '#FE9100',
							background: 'white'
						}
					}}
				/>
				<TextInput
					label="Condición de Pago"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('condicionPago', text)}
					value={formik.values.condicionPago}
					error={formik.errors.condicionPago}
					theme={{
						colors: {
							text: '#262626',
							primary: '#FE9100',
							underlineColor: '#FE9100',
							background: 'white'
						}
					}}
				/>
				<View
					style={{
						width: '100%',
						marginTop: 15,
						marginLeft: 20,
						marginRight: 20,
						marginBottom: 20,
						borderColor: '#262626',
						borderWidth: 1,
						borderRadius: 5,
						alignSelf: 'center'
					}}
				>
					<Picker
						mode="dialog"
						selectedValue={selectedState}
						onValueChange={(itemValue, itemIndex) => setSelectedState(itemValue)}
						itemStyle={{ fontWeight: 'bold', color: '#ff0000' }}
						style={{ height: 50, width: '100%' }}
					>
						<Picker.Item label="Estado de Pago" value="Error" />
						<Picker.Item label="Completado" value="Completado" />
						<Picker.Item label="Pendiente" value="Pendiente" />
					</Picker>
				</View>

				<TextInput
					label="Total"
					mode="outlined"
					keyboardType="numeric"
					style={formStyle.input}
					onChangeText={(text) => {
						
						setTotalOT(parseInt(text))
					}}
					error={formik.errors.neto}
					theme={{
						colors: {
							text: '#262626',
							primary: '#FE9100',
							underlineColor: '#FE9100',
							background: 'white'
						}
					}}
				/>


				<TextInput
					label="Observaciones"
					mode="outlined"
					multiline={true}
					numberOfLines={4}
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('observaciones', text)}
					value={formik.values.observaciones}
					error={formik.errors.observaciones}
					theme={{
						colors: {
							text: '#262626',
							primary: '#FE9100',
							underlineColor: '#FE9100',
							background: 'white'
						}
					}}
				/>
				<TextInput
					label="Aceptado Por"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('aceptadoPor', text)}
					value={formik.values.aceptadoPor}
					error={formik.errors.aceptadoPor}
					theme={{
						colors: {
							text: '#262626',
							primary: '#FE9100',
							underlineColor: '#FE9100',
							background: 'white'
						}
					}}
				/>
				<TextInput
					label="Rut de Aceptador"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('rutAceptador', format(text))}
					value={formik.values.rutAceptador}
					error={formik.errors.rutAceptador}
					theme={{
						colors: {
							text: '#262626',
							primary: '#FE9100',
							underlineColor: '#FE9100',
							background: 'white'
						}
					}}
				/>
				<Button
					mode="contained"
					style={[ formStyle.btnSuccess, styles.btnSuccess ]}
					loading={loading}
					onPress={formik.handleSubmit}
				>
					{newAddress ? "Crear Nueva OT" : "Editar OT"}
				</Button>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default AddOrden;

function initialValues() {
	return {
		motivoFaena: '',
		Transporte: '',
		horaSalidaBodega: '2021-03-04T15:00:00.000Z',
		horaLlegadaBodega: '2021-03-04T15:00:00.000Z',
		horaTerminoTrabajo: '2021-03-04T15:00:00.000Z',
		condicionPago: '',
		observaciones: '',
		aceptadoPor: '',
		rutAceptador: '',
		fechaAceptacion: '2021-03-04T15:00:00.000Z'
	};
}

function validationSchema() {
	return {
		motivoFaena: Yup.string().required(true),
		Transporte: Yup.string().required(true),
		condicionPago: Yup.string().required(true),
		observaciones: Yup.string().required(true),
		aceptadoPor: Yup.string().required(true),
		rutAceptador: Yup.string().required(true).test('Rutificator', 'Rut inválido', (value) => validate(value))
	};
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},
	title: {
		fontSize: 20,
		paddingVertical: 20
	},
	btnSuccess: {
		marginBottom: 20
	}
});

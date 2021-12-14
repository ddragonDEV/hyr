import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formStyle } from '../../styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { update } from 'lodash';
import { registerApi, updateOperarioApi, getOperarioApi } from '../../api/user';
import { validate, clean, format, getCheckDigit } from 'rut.js';

const AddOperario = (props) => {
	const { route:  { params } } = props
	const [ loading, setLoading ] = useState(false);
	const [ newAddress, setNewAddress ] = useState(true);
	const { auth } = useAuth();
	const navigation = useNavigation();

	useEffect(() => {
        (async () => {
            if(params?.idOperario){
                setNewAddress(false)
                navigation.setOptions({ title: "Actualizar operario"})
                const response = await getOperarioApi(auth, params.idOperario)
                await formik.setFieldValue('email', response.email)
                await formik.setFieldValue('username', response.username)
				await formik.setFieldValue('password', response.password)
				await formik.setFieldValue('repeatPassword', response.repeatPassword)

            }

        })()
    }, [params])



	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);

			try {
				if (newAddress) await registerApi(formData);
				else await updateOperarioApi(auth, formData)
                navigation.goBack()
			} catch (error) {
				console.log(error);
				setLoading(false);
				Toast.show('Error al registrar el usuario', {
					position: Toast.positions.CENTER
				});
			}
		}
	});

	return (
		<KeyboardAwareScrollView extraScrollHeight={25}>
			<View style={styles.container}>
				<Text style={styles.title}>                    {
                        newAddress ? "Nuevo Operario" : "Editando Operario"
                    }</Text>

				<TextInput
					label="Email"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('email', text)}
					value={formik.values.email}
					error={formik.errors.email}
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
					label="Rut"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('username', format(text))}
					value={formik.values.username}
					error={formik.errors.username}
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
					label="Contraseña"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('password', text)}
					value={formik.values.password}
					error={formik.errors.password}
					secureTextEntry
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
					label="Repetir Contraseña"
					mode="outlined"
					style={formStyle.input}
					onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
					value={formik.values.repeatPassword}
					error={formik.errors.repeatPassword}
					secureTextEntry
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
					                    {
                        newAddress ? "Crear Operario" : "Actualizar Operario"
                    }
				</Button>
			</View>
		</KeyboardAwareScrollView>
	)
}

export default AddOperario

function initialValues() {
	return {
		email: '',
		username: '',
		password: '',
		repeatPassword: '',
		rol: 'Operador'
	};
}

function validationSchema() {
	return {
		email: Yup.string().email(true).required(true),
		username: Yup.string().required(true).test('Rutificator', 'Rut inválido', (value) => validate(value)),
		password: Yup.string().required(true),
		repeatPassword: Yup.string().required(true).oneOf([ Yup.ref('password') ], true)
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

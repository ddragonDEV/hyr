import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { formStyle } from '../../styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { update } from 'lodash'
import {  registerEmpresa  } from '../../api/orders'
import {  validate, clean, format, getCheckDigit } from 'rut.js'





const AddEmpresa = () => {

    const [loading, setLoading] = useState(false)
    const [newAddress, setNewAddress] = useState(true)
    const { auth } = useAuth()
    const navigation = useNavigation()




    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)

            try {
                await registerEmpresa(auth, formData)
                navigation.goBack()
            } catch (error) {
                console.log(error)
                setLoading(false)
                Toast.show('Error al registrar la empresa', {
                    position: Toast.positions.CENTER,
                })
            }

        }


    })



    return (
        <KeyboardAwareScrollView extraScrollHeight={25}> 
            <View style={styles.container}>
                <Text style={styles.title}>Nueva Empresa</Text>

                <TextInput 
                    label="Rut Empresa"
                    mode="outlined"
                    style={formStyle.input} 
                    onChangeText={(text) => formik.setFieldValue('rutEmpresa', format(text))}
                    value={formik.values.rutEmpresa} 
                    error={formik.errors.rutEmpresa} 
                    theme={{
                        colors: {
                                   text: '#262626', primary: '#FE9100',
                                   underlineColor: '#FE9100', background: 'white'
                           }
                     }}
                />

                <TextInput 
                    label="Nombre Empresa" 
                    mode="outlined"
                    style={formStyle.input}
                    onChangeText={(text) => formik.setFieldValue('nombreEmpresa', text)}
                    value={formik.values.nombreEmpresa}
                    error={formik.errors.nombreEmpresa} 
                    theme={{
                        colors: {
                                   text: '#262626', primary: '#FE9100',
                                   underlineColor: '#FE9100', background: 'white'
                           }
                     }}
                />

                <TextInput 
                    label="Dirección Empresa" 
                    mode="outlined"
                    style={formStyle.input} 
                    onChangeText={(text) => formik.setFieldValue('direccionEmpresa', text)} 
                    value={formik.values.direccionEmpresa} 
                    error={formik.errors.direccionEmpresa} 
                    theme={{
                        colors: {
                                   text: '#262626', primary: '#FE9100',
                                   underlineColor: '#FE9100', background: 'white'
                           }
                     }}
                />

                <TextInput 
                    label="Comuna Empresa" 
                    mode="outlined"
                    style={formStyle.input} 
                    onChangeText={(text) => formik.setFieldValue('comunaEmpresa', text)} 
                    value={formik.values.comunaEmpresa} 
                    error={formik.errors.comunaEmpresa} 
                    theme={{
                        colors: {
                                   text: '#262626', primary: '#FE9100',
                                   underlineColor: '#FE9100', background: 'white'
                           }
                     }}
                />

                <TextInput 
                    label="Giro Empresa" 
                    mode="outlined"
                    style={formStyle.input} 
                    onChangeText={(text) => formik.setFieldValue('giroEmpresa', text)} 
                    value={formik.values.giroEmpresa} 
                    error={formik.errors.giroEmpresa} 
                    theme={{
                        colors: {
                                   text: '#262626', primary: '#FE9100',
                                   underlineColor: '#FE9100', background: 'white'
                           }
                     }}
                />
                <TextInput 
                    label="Teléfono Empresa" 
                    mode="outlined"
                    style={formStyle.input} 
                    onChangeText={(text) => formik.setFieldValue('telefonoEmpresa', text)} 
                    value={formik.values.telefonoEmpresa} 
                    error={formik.errors.telefonoEmpresa} 
                    theme={{
                        colors: {
                                   text: '#262626', primary: '#FE9100',
                                   underlineColor: '#FE9100', background: 'white'
                           }
                     }}
                />

                <Button mode="contained" style={[formStyle.btnSuccess, styles.btnSuccess]} loading={loading} onPress={formik.handleSubmit}>
                    Crear nueva empresa
                </Button>




            </View>
        </KeyboardAwareScrollView>
    )
}

export default AddEmpresa






function initialValues() {
    return {
        rutEmpresa: '',
        nombreEmpresa: '',
        direccionEmpresa: '',
        comunaEmpresa: '',
        giroEmpresa: '',
        telefonoEmpresa: ''
    }
}

function validationSchema() {
    return {
        rutEmpresa: Yup
        .string()
        .required(true)
        .test('Rutificator',
             'Rut inválido',
              value=>validate(value)
            )
        ,
        
        nombreEmpresa: Yup.string().required(true),
        direccionEmpresa: Yup.string().required(true),
        comunaEmpresa: Yup.string().required(true),
        giroEmpresa: Yup.string().required(true),
        telefonoEmpresa: Yup.string().required(true)

    }
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        paddingVertical: 20
    },
    btnSuccess: {
        marginBottom: 20,
    }

})

import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyle } from '../../styles'
import {  useFormik  } from 'formik'
import * as Yup from 'yup'
import { loginApi } from '../../api/user'
import Toast from 'react-native-root-toast'
import useAuth from '../../hooks/useAuth'


const LoginForm = (props) => {
    const { changeForm } = props
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()



    const Formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit:   async (formData) => {
            setLoading(true)
            try {
                const response = await loginApi(formData)
                if (response.statusCode) throw 'Error en el usuario o contraseña'
                login(response)
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER
                })
                setLoading(false)

            }

        }
    })

    return (
        <View>
            <TextInput 
                label='Email o Username'
                mode="outlined"
                style={formStyle.input} 
                onChangeText={(text) => Formik.setFieldValue('identifier', text)} 
                value={Formik.values.identifier} 
                error={Formik.errors.identifier}
                left={<TextInput.Icon name="account" color="#262626"/>}
                theme={{
                    colors: {
                               text: '#262626', primary: '#FE9100',
                               underlineColor: '#FE9100', background: 'white'
                       }
                 }}
            />
            <TextInput 
                label='Contraseña'
                mode="outlined"
                style={formStyle.input} 
                onChangeText={(text) => Formik.setFieldValue('password', text)} 
                value={Formik.values.password} 
                error={Formik.errors.password}
                secureTextEntry
                left={<TextInput.Icon name="key" color="#262626"/>}
                theme={{
                    colors: {
                               text: '#262626', primary: '#FE9100',
                               underlineColor: '#FE9100', background: 'white'
                       }
                 }}
            />
            <Button mode="contained" style={formStyle.btnSuccess}   onPress={Formik.handleSubmit} loading={loading}>Ingresar</Button>
           {/*  <Button mode="text" style={formStyle.btnText} labelStyle={formStyle.btnTextLabel} onPress={changeForm}>Registrarse</Button> */}
        </View>
    )
}

export default LoginForm


function initialValues() {
    return {
        identifier: '',
        password: ''
    }
} 

function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}
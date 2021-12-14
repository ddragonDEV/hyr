import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {  TextInput, Button  } from 'react-native-paper'
import { formStyle } from '../../styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {  useFocusEffect, useNavigation  } from '@react-navigation/native'
import {  getMeApi, updateUserApi  } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast'

const ChangeName = () => {
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()
    const navigation = useNavigation()

    useFocusEffect(
            useCallback(() => {

         (async () => {
            const response = await getMeApi(auth.token)

            response.name && await formik.setFieldValue('name', response.name)
            response.lastname && await formik.setFieldValue('lastname', response.lastname)
         })()

        }, [])
    )


    const formik = useFormik({

        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                await updateUserApi(auth, formData)
                navigation.goBack()
            } catch (error) {
                Toast.show('Error al actualizar los datos', {
                    position: Toast.positions.CENTER,
                })
                setLoading(false)
            }

            
        }


    })

    return (
        <View style={styles.container}>
            <TextInput 
                label="Nombre"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue('name', text)}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <TextInput 
                label="Apellidos"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue('lastname', text)}
                value={formik.values.lastname}
                error={formik.errors.lastname}

            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar Nombres y Apellidos
            </Button>
        </View>
    )
}

export default ChangeName


function initialValues() {
    return {
        name : "",
        lastname : ""
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true)
    }
}

const styles = StyleSheet.create({

    container: {
        padding:20
    }

})


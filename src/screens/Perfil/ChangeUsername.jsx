import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { formStyle } from '../../styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import { getMeApi, updateUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'



const ChangeUsername = () => {

    const { auth } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()



    useFocusEffect(
    useCallback(() => {
            
        
        (async () => {
            const response = await getMeApi(auth.token)
            await formik.setFieldValue('username', response.username)
        })()

        },[])
        )


        const formik = useFormik({
            initialValues:initialValues(),
            validationSchema: Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true)
                    try {
                        const response = await updateUserApi(auth, formData)
                        if (response.statusCode) throw 'El nombre de usuario ya existe'
                        navigation.goBack()
                    } catch (error) {
                        Toast.show(error, {
                            position: Toast.positions.CENTER
                        })
                        formik.setFieldError('username', true)
                    }
                setLoading(false)
            }
        })



    return (
        <View style={styles.container}>
            <TextInput
                label="Nombre de usuario"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar nombre de usuario
            </Button>
        </View>
    )
}

export default ChangeUsername


function initialValues() {

    return {
        username: ''
    }

}

function validationSchema() {
    return {
        username: Yup.string().min(4, true).required(true)
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 20
    }

})

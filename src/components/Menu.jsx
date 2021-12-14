import React, { useState, useEffect} from 'react'
import { Alert } from 'react-native'
import {  List  } from 'react-native-paper'
import {  useNavigation  } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import {getMeApi} from '../api/user'


const Menu = () => {

    const [rol, setRol] = useState(null)
    const [user, setUser] = useState(null)
    const { auth } = useAuth()

        useEffect(() => {
            (async () => {
                const response = await getMeApi(auth.token)
                setUser(response)
				setRol(response.rol)
            })()
        }, [])

    const navigation = useNavigation()
    const {logout} = useAuth()

    const logoutAccount = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que quieres salir de tu cuenta?",
            [
                {
                    text: 'NO',
                },
                {
                    text: 'SI',
                    onPress: logout,
                }
            ],
            {cancelable: false}
        )
    }

    return (
        <>
        <List.Section>
            <List.Subheader>Mi cuenta</List.Subheader>
            <List.Item  
                title="Cambiar nombre"
                description="Cambiar el nombre de tu cuenta"
                left={(props) => <List.Icon {...props} icon="face" />}
                onPress={() => navigation.navigate("change-name")}
            />
            <List.Item  
                title="Cambiar Email"
                description="Cambiar el email de tu cuenta"
                left={(props) => <List.Icon {...props} icon="at" />}
                onPress={() => navigation.navigate('change-email')}
            />

            <List.Item  
                title="Cambiar username"
                description="Cambiar el nombre de usuario de tu cuenta"
                left={(props) => <List.Icon {...props} icon="sim" />}
                onPress={() => navigation.navigate('change-username')}
            />
            <List.Item  
                title="Cambiar Contraseña"
                description="Cambia la contraseña de tu cuenta"
                left={(props) => <List.Icon {...props} icon="key" />}
                onPress={() => navigation.navigate('change-password')}
            />
{    /*        <List.Item  
                title="Mis Direcciones"
                description="Administra tus direcciones de envio"
                left={(props) => <List.Icon {...props} icon="map" />}
                onPress={() => navigation.navigate('adresses')}
/> */}

            
        </List.Section>
        <List.Section>
            <List.Subheader>App</List.Subheader>

            {
					rol == 'Administrador' ? (            <List.Item  
                        title="Operarios"
                        description="Puedes ver o crear los operarios"
                        left={(props) => <List.Icon {...props} icon="account-details-outline" />}
                        onPress={() => navigation.navigate('operario')}
                    />) : (null)
            }

           {/*
            <List.Item  
                title="Lista de deseos"
                description="Listado de todos los productos que quieres"
                left={(props) => <List.Icon {...props} icon="heart" />}
                onPress={() => console.log('ir a mis favoritos')}
            />
           */}
            <List.Item  
                title="Ordenes"
                description="Listado de todas las ordenes"
                left={(props) => <List.Icon {...props} icon="clipboard-list" />}
                onPress={() => navigation.navigate('ordenes')}
            />
            <List.Item  
                title="Cerrar sesión"
                description="Cierra tu sesión"
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={logoutAccount}
            />
        </List.Section>
        </>
    )
}

export default Menu


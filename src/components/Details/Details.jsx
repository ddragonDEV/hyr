import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import colors from '../../styles/colors'
import {  useFocusEffect  } from '@react-navigation/native'
import Search from '../../components/Search/' 
import StatusBar from '../../components/StatusBar'
import useAuth from '../../hooks/useAuth'
import ScreenLoading from '../../components/ScreenLoading'
import UserInfo from '../../components/Account/UserInfo'
import {getMeApi} from '../../api/user'
import profilePicture from '../../../assets/logo.png'
import { Avatar } from 'react-native-paper';



const Details = () => {

    const [user, setUser] = useState(null)
    const { auth } = useAuth()

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token)
                setUser(response)
                console.log(response)
            })()
        }, [])
    )

    //console.log(user)

    String.prototype.getInitials = function(glue){
        if (typeof glue == "undefined") {
            var glue = true;
        }
    
        var initials = this.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
        
        if (glue) {
            return initials.join('');
        }
    
        return  initials;
    };
    
    String.prototype.capitalize = function(){
        return this.toLowerCase().replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
    };

    //console.log(user)

    const nombreCompleto = user.name+' '+user.lastname
    const initialsUser = nombreCompleto.getInitials(false)
    const firstInitial = initialsUser[0]+initialsUser[1]
    

    //console.log(firstInitial)

    return (
        <>
                <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />

                {
            !user ? (<ScreenLoading size="large" text="Cargando...." />) : 
            (
            <>
        <View style={styles.container}>
            
        <Avatar.Text size={60} label={firstInitial} style={{ backgroundColor:'orange' }} color={colors.bgDark} />
            <Text style={styles.title}>{user.name} {user.lastname}{"\n"}{user.rol}</Text> 
        </View>
  
            </>
            )
        }

        </>
    )
}

export default Details

const styles = StyleSheet.create({

    container:{
        backgroundColor: colors.bgDark,
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection:'row',
        alignItems:'center',

    },
    title: {
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 15,
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold'
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "white"
    }

})

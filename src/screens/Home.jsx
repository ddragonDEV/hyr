import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import Details from '../components/Details'
import StatusBarCustom from '../components/StatusBar'
import colors from '../styles/colors'
import { FlatGrid } from 'react-native-super-grid';

import { useNavigation } from '@react-navigation/native';
import { upperCase } from 'lodash'
import { getSaldosPendientesApi } from '../api/orders'




const Home = () => {
	
    const navigation = useNavigation();
    const [responseSaldos, setResponseSaldos ] = useState()

    async function getSaldosPendientesApi() {

      try {
          const url = `http://dev.love.cl:1337/ots?estadoPago=Pendiente`
          const params = {
              headers: {
                  'Content-Type' : 'application/json',
              }
          }
  
          const response = await fetch(url, params)
          const result = await response.json()
          setResponseSaldos(result.length)
          return result
  
      } catch (error) {
          console.log(error)
          return null
      }
  }




  useEffect(() => {

    getSaldosPendientesApi()

  }, [])




    const [items, setItems] = React.useState([
        { name: 'USUARIOS', code: '#FE9100', navigate: 'operario', describe: 'Crear y editar operarios' },
        { name: 'ADMINISTRAR OT', code: '#000029', navigate: 'ordenes', describe: 'Crear y editar Ordenes de trabajo' },
        { name: 'REPORTES', code: '#FE9100', navigate: 'reports', describe: 'Ver y descargar reportes' },

      ]);
    


    return (
        <>
        <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content"/>
        <View style={{ 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20}}>
            <Text>
                Bienvenido a HYR
            </Text>


            {

            responseSaldos >= 1? (
              <>

            <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            backgroundColor: '#000029',
            width: '100%',
            marginTop: 40,
            height: 100,
            borderRadius: 50
           }}>
                           <TouchableOpacity   onPress={ () => navigation.navigate('saldos') } >

            <Text style={{  color: 'white', fontWeight: 'bold'  }}>HAY <Text style={{ color:'#FE9100' }}>{ responseSaldos }</Text> SALDOS PENDIENTES</Text>
            </TouchableOpacity>

            </View>

            </>
            ) : (null)


            }
            




            
        </View>






        <View style={styles.container}>
        <FlatGrid
      itemDimension={300}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity   onPress={ () => navigation.navigate(item.navigate) } style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.describe}</Text>
        </TouchableOpacity >
      )}
    />
        </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20

      },
      fixedRatio: {
        backgroundColor: 'rebeccapurple',
        flex: 1,
        aspectRatio: 16 / 6,
        borderRadius: 20
      },
      title: {
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          display: 'flex',
          fontSize: 20
      },
      gridView: {
        marginTop: 10,
        flex: 1,
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
      itemCode: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
      },
    
})

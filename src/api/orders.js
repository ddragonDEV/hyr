import {  API_URL  } from '../utils/constants'

export async function getEmpresaApi(auth) {

    try {
        const url = `${API_URL}/empresas`
        const params = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${auth.token}`
            }
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getOrdersApi(auth) {

    try {
        const url = `${API_URL}/ots`
        const params = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${auth.token}`
            }
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }
}




export async function registerEmpresa(auth, formData) {
    try {
        
        const url = `${API_URL}/empresas`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type' :'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify(formData),
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result 

    } catch (error) {
        console.log(error)
        return null
    }
}


export async function registerOrdenTrabajoApi(auth, orders, selectedEmpresa, selectedState, totalOT) {
    try {
        
        const url = `${API_URL}/ots`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type' :'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({operador: auth.idUser, rutOperador: auth.username, empresa: selectedEmpresa, estadoPago: selectedState,  total: totalOT, ...orders}),
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result 

    } catch (error) {
        console.log(error)
        return null
    }
}


export async function deteleOTapi(auth, idOrden) {

    try {
        
        const url = `${API_URL}/ots/${idOrden}`
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${auth.token}`
            }
        }
        const response = await fetch (url, params)
        const result = await response.json()
        return result
        
    } catch (error) {
        console.log(error)
        return null
    }
}


export async function updateOrdenApi(auth, idOrden, formData, selectedEmpresa, totalOT) {

    try {
        
        const url = `${API_URL}/ots/${idOrden}`
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${auth.token}`
            },
            body: JSON.stringify({empresa: selectedEmpresa, total: totalOT, ...formData})
        }
        const response = await fetch(url, params)
        const result = await response.json()
        console.log(result)
        return result


    } catch (error) {
        console.log(error)
        return null
    }


}


export async function getOrdenApi(auth, idOrden) {

    try {
        const url = `${API_URL}/ots/${idOrden}`
        const params = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${auth.token}`
            }
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }
}


export async function getSaldosPendientesApi() {

    try {
        const url = `${API_URL}/ots?estadoPago=Pendiente`
        const params = {
            headers: {
                'Content-Type' : 'application/json',
            }
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }
}
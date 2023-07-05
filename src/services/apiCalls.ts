import axios from "axios"

const URL = 'https://express-api-basic.vercel.app'
const RM_URL = 'https://rickandmortyapi.com/api'

interface LoginData {
    email: string,
    password: string
}

export const logUser = async (body:LoginData) => {
    let res = await axios.post(`${URL}/auth/login`, body)

    return res.data
}

export const getCharacters = async () => {
    let {data} = await axios.get(`${RM_URL}/character`)

    return data.results
}

export const getOneCharacter = async(id:string)=> {
    let {data} = await axios.get(`${RM_URL}/character/${id}`)

    return data
}

export const getCharacterByName = async(name:string)=>{
    let {data} = await axios.get(`${RM_URL}/character/?name=${name}`)

    return data.results
}
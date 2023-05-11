import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000/'
  })


export const cadastroUsuario = async(url:any,dados:any,setDado:any) =>{
    const resposta = await http.post(url,dados)
    setDado(resposta.data)
}

export const login = async(url:any,dados:any,setDado:any) => {
    const resposta = await http.post(url,dados)
    setDado(resposta.data.token)
}

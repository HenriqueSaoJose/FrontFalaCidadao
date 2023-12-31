import { BACKEND_URL_PROD } from "@/shared/componentes/constants/constants";
import api from "@/shared/componentes/utils/my-axios";
import axios from "axios";

interface usuarios{
    cpf: null,
    nome: null,
    telefone: null,
    idade:null,
    email: null,
    senha: null,
}

interface conta {
    email: null,
    senha:null,
}

export const criarUsers = async (users : usuarios) : Promise<any> => {
    const {cpf, nome, telefone, idade, email, senha} = users
    const usuarios = {
        cpf : cpf,
        nome : nome,
        telefone : telefone,
        idade : idade,
        email : email,
        senha : senha,
        funcao : "cidadao",        
    }

    const res = await api.post(`/auth/sign-up`,usuarios)
    const data = res;
    return data;
}



export const login = async (users : usuarios) => {
    const {email, senha} = users
    console.log(email,senha)
    const usuarios = {
        email : email,
        senha : senha,        
    } 
    const res = await api.post(`/auth/login`,usuarios)
    console.log(res)
    localStorage.setItem('token',res.data.response.token);
    return res
}




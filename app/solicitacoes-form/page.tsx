'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import  'app/solicitacoes-form/components/solicitacao-form.css';
import { Navbar2 } from '@/shared/componentes/navbar2';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { solicitar } from '../api/solicitacoesApi';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { SolicitacaoDto } from '@/shared/types/types';
import axios from 'axios';
import { Router } from 'next/router';
import api from '@/shared/componentes/utils/my-axios';
import { Navbar3 } from '@/shared/componentes/navbar3';



export default function solicitacoesForm() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const token = localStorage.getItem('token')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    
    const objectSolicitar  = {
        
        bairro: '',
        pontoref:'',
        lougradouro:'',
        numero: '',
        descricao: '',
    };

    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [solicitacao, setSolicitacao] = useState(objectSolicitar);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [categoria, setCategoria] = useState<String|null>('')

    function onchange (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
       const {name,value} = e.target;
       setSolicitacao({...solicitacao, [name]: value});
    }

    const enviar = async () => {
        try {
            
            const input = document.getElementById("file");
            const file = input?.files[0];
            const formData = new FormData();
            formData.append('file',file)
            formData.append("filesolicictação","teste")

            api.post("/solicitacao/upload/image",formData,{
                headers: {
                    "Content-type": "application/form-data",
                    "Authorization":`Bearer ${token}`,
                },
                }).then(async(responses)=>{
                    
                    const pathImage = responses.data.response
                    console.log(pathImage)
                    const response = await solicitar(solicitacao,pathImage);
                    if(response.status == 200){
                        Swal.fire({
                            icon: 'success',
                            title: `Solicitação cadastrada com sucesso !`,
                          });
                          router.push('/consulta')
        
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title:`erro ao cadastrar solicitação`,	
                          });
                        
                    }
                })
            
           
            
        } catch (error) {
            console.error(error);
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      }, []);

    return (
        <>
            <Navbar3 />
            <h1>Formulário de solicitações</h1>
            <form>
                <h4>Endereço</h4>
                <div className="mb-3">
                    <label className="form-label">Bairro:</label>
                    <input onChange={onchange} type="text" className="form-control" name='bairro' />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rua:</label>
                    <input onChange={onchange} type="text" className="form-control" name='lougradouro'/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Número:</label>
                    <input onChange={onchange} type="number" className="form-control" name='numero'/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ponto de referência:</label>
                    <input onChange={onchange} type="text" className="form-control" name='pontoref'/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição:</label>
                    <input onChange={onchange} type="text" className="form-control" name='descricao'/>
                </div>
                                        
                <h4>Fotos</h4>
                <div>
                    <label htmlFor="formFileLg" className="form-label">Adicione aqui fotos que você tirou do problema que deseja fazer uma solicitação</label>
                    <input className="form-control form-control-lg" id="file" type="file" name="file"/>
                </div>
            </form>

            <button onClick={() => {enviar()}} type="submit" className="btn btn-warning btn-lg">Enviar</button>

        </>
    );
}
import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import BuscaCobertura from '../buscaCobertura/BuscaCobertura'
import http from "../../services/Service";
import './itemProposta.css';

function itemProposta(props){
    const idCobertura = props.info.cobertura
    const [coberturas, setCoberturas] = useState([])
    const [nomeCobertura, setNomeCobertura] = useState('')

    useEffect(()=>{
        const getCoberturas =async () => {
            try {
                const {data} = await http.get('coberturas')
                setCoberturas(data);

            } catch (error) {
                console.error(error)
            }
        };

        getCoberturas()
        getNomeCobertura()
    },[])

    function getNomeCobertura(){
        coberturas.map((item) =>{
            return idCobertura === item._id ?
            setNomeCobertura(item.nome):
            console.error('error get nome')
        })
    }

    const dataFormat = (data) =>{
        let dataObjeto = new Date(data);
        return `${dataObjeto.getDate()}/${dataObjeto.getMonth()}/${dataObjeto.getFullYear()}`
    }

    return(
        <Paper className="item-proposta">
            <div className="campo-proposta">
                <p>Número da proposta:</p>
                <p className="valor-proposta">
                    {props.info.n_proposta}
                </p>
            </div>
            <div className="campo-proposta">
                <p>CPF:</p>
                <p className="valor-proposta">
                    {props.info.cpf}
                </p>
            </div>
            <div className="campo-proposta">
                <p>Início da vigência do seguro:</p>
                <p className="valor-proposta">
                    {dataFormat(props.info.inicioVigencia)}
                </p>
            </div>
            <div className="campo-proposta">
                <p>Término da vigência do seguro:</p>
                <p className="valor-proposta">
                    {dataFormat(props.info.terminoVigencia)}
                </p>
            </div>
            <div className="campo-proposta">
                <p>Valor de Risco:</p>
                <p className="valor-proposta">
                    R${props.info.valorRisco}
                </p>
            </div>

            <BuscaCobertura info={props.info.cobertura}/>
        </Paper>
    )
}

export default itemProposta;
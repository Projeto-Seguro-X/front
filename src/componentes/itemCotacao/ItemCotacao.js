import { Container, Paper, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import BuscaCobertura from '../buscaCobertura/BuscaCobertura'
import http from "../../services/Service";
import './ItemCotacao.css'

function ItemCotacao(props){
    const [coberturas, setCoberturas] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getCoberturas = async () =>{
            try {
                const{data} = await http.get('coberturas')
                setCoberturas(data)
                setLoading(false
                    )
            } catch (error) {
                console.error(error)
            }
        };

        getCoberturas
    },[])

    const dataFormat = (data) =>{
        let dataObjeto = new Date(data);
        return `${dataObjeto.getDate()}/${dataObjeto.getMonth()+1}/${dataObjeto.getFullYear()}`
    }

    if(loading){
        return(
            <Container maxWidth='lg'>
                <>
                <Typography component='h1' variant="h5" textAlign='center'>
                    Carregando..
                </Typography>
                </>
            </Container>
        )
    }

    return(
        <Paper>
            <div className="item-cotacao">
                <p>Número da cotação:</p>
                <p className="campo-cotacao">
                    {props.info.n_cotacao}
                </p>
            </div>
            <div className="item-cotacao">
                <p>Nome:</p>
                <p className="campo-cotacao">
                    {props.info.nome}
                </p>
            </div>
            <div className="item-cotacao">
                <p>CPF:</p>
                <p className="campo-cotacao">
                    {props.info.cpf}
                </p>
            </div>
            <div className="item-cotacao">
                <p>Ínicio da vigência:</p>
                <p className="campo-cotacao">
                    {dataFormat(props.info.inicioVigencia)}
                </p>
            </div>
            <div className="item-cotacao">
                <p>Término da vigência:</p>
                <p className="campo-cotacao">
                    {dataFormat(props.info.terminoVigencia)}
                </p>
            </div>
            <div className="item-cotacao">
                <p>Valor de risco:</p>
                <p className="campo-cotacao">
                    R${props.info.valorRisco}
                </p>
            </div>

            <BuscaCobertura info={props.info.cobertura._id}/>
        </Paper>
    );
}

export default ItemCotacao;

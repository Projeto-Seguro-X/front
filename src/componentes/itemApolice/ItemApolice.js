import { Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BuscaCobertura from '../componentes/buscaCobertura'
import http from '../servicos/http.js'
import './ItemApolice.css'

function ItemApolice(props){
    const[coberturas, setCoberturas] = useState([])
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        const getCoberturas = async() =>{
            try {
                const {data} = await http.get('coberturas')
                setCoberturas(data);
                setLoading(false)

            } catch (error) {
                console.error(error)
            }
        };
        getCoberturas()
    },[])

    function calcValorParcela(){
        const valor = props.info.valorPago / props.info.qtParcelas
        return valor.toFixed(2)
    }

    const dataFormat = (data) =>{
        let dataObj = new Date(data);
        return `${dataObj.getDate()} / ${dataObj.getMonth()+1} / ${dataObj.getFullYear()}`
    }

    if(loading){
        return(
            <Container maxWitdh='lg'> 
                <>
                <Typography component='h1' variant='h5' textAling='center'>
                    Carregando...
                </Typography>
                </>
            </Container>
        )
    }

    return(
        <Paper className='item-cotacoes'>
            <div className="campo-cotacao">
                <p>Número Cotação</p>
                <p className="valor-cotacao">
                    {props.info.n_apolice}
                </p>
            </div>
            <div className="campo-cotacao">
                <p>Código da apólice:</p>
                <p className="valor-cotacao">
                    {props.info.hash}
                </p>
            </div>
            <div className="campo-cotacao">
                <p>Nome:</p>
                <p className="valor-cotacao">
                    {props.info.nome}
                </p>
            </div>
            <div className="campo-cotacao">
                <p>CPF:</p>
                <p className="valor-cotacao">
                    {props.info.cpf}
                </p>
            </div>
            <div className="campo-cotacao">
                <p>Início da vigência:</p>
                <p className="valor-cotacao">
                    {dataFormat(props.info.inicioVigencia)}
                </p>
            </div>
            <div className="campo-cotacao">
                <p>Término da vigência:</p>
                <p className="valor-cotacao">
                    {dataFormat(props.info.terminoVigencia)}
                </p>
            </div>
            <div className="campo-cotacao">
                <p>Valor do risco:</p>
                <p className="valor-cotacao">
                    R${props.info.valorRisco}
                </p>
            </div>
            <div className="campo-cotacao">
                <p>Valor a ser pago:</p>
                <p className="valor-cotacao">
                    R${props.info.valorPago}
                </p>
            </div>
            <div className="campo-cotacao">
            <p>Forma de pagamento:</p>
          {props.info.qtParcelas === 0 ?
            <p className="valor-cotacao"> À vista </p> :

            <p className="valo-cotacao"> {props.info.qtParcelas} parcelas de R${calcValorParcela()} </p> 
          }

        <BuscaCobertura info={props.info.cobertura} />
            </div>
        </Paper>
    );
        }

        export default ItemApolice;

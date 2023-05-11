import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../services/Service";
import './BuscaCobertura.css';

function ItemApolice(props){
    const idCobertura = props.info
    const [coberturas, setCoberturas] = useState([])
    const [nomeCobertura, setNomeCobertura] = useState('')
    const [descricaoCobertura, setDescricaoCobertura] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getCoberturas = async ()=>{
            try {
                const{data} = await http.get('coberturas')
                setCoberturas(data);
                getNomeCoberturas()
                setDescricaoCobertura()
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        };

        getCoberturas()
    },[loading])

    function getNomeCoberturas(){
        coberturas.map((item) =>{
            return idCobertura === item._id?
            setDescricaoCobertura(item.descricao):
            ''
        })
    }

    if(loading){
        return(
            <Container maxWidth='lg'>
            <>
            <Typography component='h1' variant="h5" textAlign='center'>
                Carregando...
            </Typography>
            </>
        </Container>
        )}

        return(
            <>
            <div className="campo-cobertura">
                <p>Tipo de cobertura:</p>
                <p className="valor-cobertura">
                    {nomeCobertura}
                </p>
            </div>
            <p>
                {descricaoCobertura}
            </p>
            </>
        );
}

export default ItemApolice;
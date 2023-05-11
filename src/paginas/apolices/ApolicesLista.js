import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import http from '../servicos/http.js'
import ItemApolice from "../itemApolice/ItemApolice.js";

function Cotacoes(){
    const[apolices, setApolices] = useState([])
    const[loading, setLoading] = useState(true)
    const[semApolice, setSemApolice] = useState(true)

    const getApolices = async() =>{
        try {
            const {data} = await http.get('apolices/')
            setApolices(data)
            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    }

    getApolices()
}

useEffect(() =>{
    getData()
},[])

const itemCotacao = apolices.map((item) => <ItemApolice key={item.n_apolice} info={item}/>).reverse()

if(loading){
    return(
        <Container maxWidht='lg'>
            <Paper>
                <Typography component='h1' variant='h5' textAling='center'>
                    Carregando...
                </Typography>
            </Paper>
        </Container>
    );
}

return(
    <Container maxWidht='lg'>
        <Paper>
            <Typography component='h1' variant='h5' textAling='center'>
                Lista de Apólices
            </Typography>
            <div className="lista-cotacoes">
                <div className="item-cotacoes">
                    {itemCotacao}
                    {itemCotacao.length === 0 && <p>Você ainda não tem apólices para exibir!!</p>}
                </div>
            </div>
        </Paper>
    </Container>
)

export default Cotacoes;
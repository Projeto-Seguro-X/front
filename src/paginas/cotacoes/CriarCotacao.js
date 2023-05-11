import { Container, Typography } from "@mui/material";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import http from "../../services/Service";
import "./CotacoesLista.css"

function CriarCotacao(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [coberturas, setCoberturas] = useState([])
    const [minMaxVigencia, setMinMaxVigencia] = useState({})
    const [temCpf, setTemCpf] = useState(false)
    const [permiteEnvio, setPermiteEnvio] = useState(false)

    const[cotacao, setCotacao] = useState({
        n_cotacao: undefined,
        nome: '',
        cpf: '',
        inicioVigencia: '',
        terminoVigencia: '',
        valorRisco: null,
        cobertura: ''
    })

    useEffect(()=>{
        const getCoberturas =  async ()=>{
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

    useEffect(()=>{
        function dataVigencia(){
            var novaData = new Date();
            var nextDay = new Date(novaData);
            nextDay.setDate(novaData.getDate()+1);

            const date = nextDay.getDate()
            const month = nextDay.getMonth()
            const year = nextDay.getFullYear()
            return `${date}/${month}/${year}`
        }

        const getNumCotacao = async () =>{
            try {
                const {data} = await http.get('contadores')
                setContador(data[0].n_cotacao);
                setCotacao({
                    ...cotacao,
                    n_cotacao: data[0].n_cotacao,
                    inicioVigencia: dataVigencia(),
                })

            } catch (error) {
                console.log(error)
            }
        };
        getNumCotacao()
    }, [])

    useEffect(() =>{
        function dataVigencia(){
            var now = new Date();
            const min = new Date(now.getFullYear()+5, now.getMonth(), now.getDate()+1)
            const max = new Date(now.getFullYear()+10, now.getMonth(), now.getDate()+1)
            const minDate = `${min.getFullYear()}-${String(min.getMonth()).padStart(2,'0')}-${String(min.getDate()).padStart(2,'0')}`
            const maxDate = `${min.getFullYear()}-${String(min.getMonth()).padStart(2,'0')}-${String(min.getDate()).padStart(2,'0')}`
            setMinMaxVigencia({
                min: minDate,
                max: maxDate
            })
        }
        dataVigencia()
    },[])

    useEffect(()=>{
        validateForm()
        existeCpf()
    },[cotacao.cobertura, cotacao.cpf])

    useEffect(()=>{
        validateForm()
    },[cotacao, temCpf])

    function editCotcao(){
        const novoContador = contador +1
        http.put(`/contadores/630671a2b3dfa66834b7a2f2/`, {
            n_cotacao: novoContador,
        })
    }

    function existeCpf(){
        const getCpf = async ()=>{
            try {
                const {data} = await http.get(`apolices/cpf/?cpf=${cotacao.cpf}`)
                if(data.length !== 0){
                    setTemCpf(true)
                }else{
                    setTemCpf(false)
                }

            } catch (error) {
                console.error(error)
            }
        };
        getCpf()
        validateForm()
    }

    function validateForm(){
        if(
            cotacao.nome !== '' &&
            temCpf === false &&
            cotacao.cpf.length === 11 &&
            cotacao.inicioVigencia !== '' &&
            cotacao.terminoVigencia !== '' &&
            cotacao.valorRisco !== '' &&
            cotacao.cobertura !== '' 
          ){
            setPermiteEnvio(true)
          }else{
            setPermiteEnvio(false)
          }
        }

        const coberturaMap = coberturas.map((item) => {
            return <option key={item._id} value={item._id} > {item.nome}</option>
          })

          function setIDCobertura(evento){
            const coberturaID = evento
            coberturas.map((item)=> coberturaID === item._id ? setCotacao({...cotacao, nomeCobertura: item.nome, cobertura: coberturaID}): "")
          }

          function descricaoCobertura(id){
            const coberturaID = id
            let desc = ''
            coberturas.map((item)=>coberturaID === item._id ?
            desc = item.descricao: '')
            return desc
          }

          function postCotacao(){
            http.post('/cotacoes/',{
                nome: cotacao.nome,
                n_cotacao: cotacao.n_cotacao,
                cpf: cotacao.cpf,
                terminoVigencia: cotacao.terminoVigencia,
                valorRisco: cotacao.valorRisco,
                cobertura: cotacao.cobertura
            })
            .then(()=>navigate(`/propostas/?${cotacao.n_cotacao}`));
          }

          function setCpf(event){
            const somenteNumeros = event.target.value.replace(/[^0-9]/g,'')
            setCotacao({
                ...cotacao,
                cpf: somenteNumeros
            })
          }

          function saveLocalStorage(){
            localStorage.setItem('n_cotacao', JSON.stringify(cotacao.n_cotacao))
          }

          function enviarForm(event){
            event.preventDefault()
            existeCpf()
            saveLocalStorage()
            editCotcao()
            postCotacao()
          }

          if(loading){
            return(
                <Container maxWidth='lg'>
                    <>
                    <Typography component='h1' variant='h5' textAling='center'> 
                        Carregando...
                    </Typography>
                    </>
                </Container>
            )
          }

          return(
            <Container maxWidth='lg'>
                <>
                <Typography component='h1' variant='h5' textAling='center'>
                    Formulário de Cotação
                </Typography>

                <form className="form" onSubmit={enviarForm}>
                <fieldset id='cotacao-fieldset' className="cotacao-fieldset">
                    <legend>Dados para Cotação:</legend>

                    <div className="numero-cotacao">
                        <p className="numero-cotacao-paragrafo">Número da Cotação:</p>
                        <span className="cotacao-span">
                            {cotacao.n_cotacao}
                        </span>
                    </div>

                    <label className="nome-label" htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        className="input-cotacao"
                        placeholder="ex:Luffy D. Monkey"
                        value={cotacao.nome}
                        onChange={(event)=>setCotacao({...cotacao, nome:event.target.value})}
                        required
                    />

                    <label htmlFor="cpf" className="cpf-label">CPF</label>

                    <input
                        type="text"
                        minLength={11}
                        maxLength={11}
                        onChange={(evento)=> setCpf(evento)}
                        className="input-cotacao"
                        placeholder="ex: 123.456.789-12"
                        required
                    />
                    {temCpf && <span className="cpf-aviso">CPF já cadastrado!!</span>}

                    <label htmlFor="inicioVigencia" className="label-vigencia">Ínico da Vigência:</label>
                    <input
                        type="date"
                        className="input-vigencia"
                        value={cotacao.terminoVigencia}
                        onChange={(event)=>setCotacao({...cotacao, terminoVigencia: event.target.value})}
                        min={minMaxVigencia.min}
                        max={minMaxVigencia.max}
                        required
                    />

                    <label htmlFor="valorRisco" className="label-risco">Valor de Risco</label>
                    <input
                        type="number"
                        name="valorRisco"
                        value={cotacao.valorRisco == null ? '': cotacao.valorRisco}
                        onChange={(event)=> setCotacao({...cotacao, valorRisco:event.target.value})}
                        className="input-risco"
                        min='5000.00'
                        max='1000000.00'
                        step='1'
                        placeholder="ex:R$6.666,66"
                        required
                    />

                    <label htmlFor="cobertura" className="label-cobertura">Tipo de Cobertura:</label>
                    <select className="select-cobertura"
                        value={cotacao.cobertura}
                        onChange={(e)=> setIDCobertura(e.target.value)}
                        required>
                    <option>Selecione Cobertura:</option>
                    {coberturaMap}
                    </select>
                    <p className="descricao-cobertura">
                        {descricaoCobertura(cotacao.cobertura)}
                    </p>

                    <div>
                    {
                       permiteEnvio ?
                         <button className="botao-elaborar" id="botao-elaborar" type="submit" >Elaborar proposta</button>
                         :
                          <button className="botao-elaborar" id="botao-elaborar" disabled  >Elaborar proposta</button>

                     }
                    </div>
                </fieldset>
                </form>
                </>
            </Container>
          )
};

export default CriarCotacao
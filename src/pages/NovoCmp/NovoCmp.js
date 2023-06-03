import React from 'react';
import { TelaFull, TopoFer, Button, Image, Inputs } from '../../components';
import { LogoCmp, Img1, Logo } from '../../assets';
import { Camp1 } from '../../assets/camps';
import urlRootNode from '../../confgs'
import { useNavigate } from 'react-router-dom';
import styles from './styles';

export default function NovoCmp(){

  const navigate = useNavigate();
  const [regras, setRegras] = React.useState('Respeitar o árbitro');
  const [local, setLocal]   = React.useState('Bagé - RS');
  const [nome, setNome]     = React.useState('1º Copa Veteranos Bagé - RS');
  const [data, setData]     = React.useState('08/06/2023');
  const [hora, setHora]     = React.useState('18:00');
  const [desc, setDesc]     = React.useState('');
  
  React.useEffect(() => {
   
  }, []);

  const bloco = {
    local   : "Bagé - RS",
    regras  : "",
    nome    : "1º Copa Veteranos Bagé - RS",
    data    : "08/06/2023",
    hora    : "18:00",
    desc    : "Evento Volta às Aulas 2023",
    imagem  : Logo
  }

  async function NovoCmp(){
    console.log("Novo campeonato");
    const reqs = await fetch(urlRootNode + 'novo-cmp', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bloco)
      /*body: JSON.stringify({
        local : local,
        regras: regras,
        nome  : nome,
        data  : data,
        hora  : hora,
        desc  : desc,
        image : Camp1
      */
    });
    const resp = await reqs.json();
    console.log("Resposta",resp);
    localStorage.setItem("campSel", JSON.stringify(resp.cmp));
    navigate("/desktop/main-campeonato");
  }

  return (
    <TelaFull>
      <TopoFer label = {"Novo Campeonato"}/>
      <div style = {styles.divInf}>
        <div style = {styles.divImg}>
          <Image
            className = {"imgCmp"}
            src       = {Logo}
          />
        </div>
        <form style = {styles.divInputs}>
          <Inputs
            className = {"inputsForm"}
            place     = {"Nome do Campeonato"}
            type      = {"text"}
            name      = {"nome"}
            value     = {nome}
            onChange  = {(e) => {setNome(e.target.value)}}
          />
          <Inputs
            className = {"inputsForm"}
            place     = {"Local do Campeonato"}
            type      = {"text"}
            name      = {"local"}
            value     = {local}
            onChange  = {(e) => {setLocal(e.target.value)}}
          />
          <div style = {styles.divLinha}>
            <Inputs
              className = {"inputsLin"}
              type      = {"text"}
              place     = {"Data"}
              name      = {"data"}
              value     = {data}
              onChange  = {(e) => {setData(e.target.value)}}
            />
            <Inputs
              className = {"inputsLin"}
              place     = {"Hora"}
              type      = {"text"}
              name      = {"hora"}
              value     = {hora}
              onChange  = {(e) => {setHora(e.target.value)}}
            />
          </div>
          <Inputs
            onChange  = {(e) => {setDesc(e.target.value)}}
            className = {"inputsForm"}
            place     = {"Descrição"}
            type      = {"text"}
            name      = {"descrição"}
            value     = {desc}
          />
          <Inputs
            onChange  = {(e) => {setRegras(e.target.value)}}
            className = {"inputsArea"}
            place     = {"Regras"}
            type      = {"text"}
            name      = {"regras"}
            value     = {regras}
          />
          <Button
            className = {"btt2"}
            text      = {"Criar Campeonato"}
            onClick   = {async() => {await NovoCmp()}}
          />
        </form>
        <div style = {styles.divImgL}>
          <Image
            className = {"imgFundo"}
            src       = {Img1}
          />
        </div>
      </div>
    </TelaFull>
  );
}

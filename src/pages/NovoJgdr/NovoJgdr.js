import React from "react";
import { TelaFull, TopoCmp, Button, Image, Inputs } from "../../components";
import { Img3, UserP } from "../../assets";
import urlRootNode from "../../confgs";
import lista_teste from "./Teste";
import styles from "./styles";

export default function NovoJgdr() {

  const [cmp, setCmp]       = React.useState(JSON.parse(localStorage.getItem("campSel")));
  const [jgdrs, setJgdrs]   = React.useState(JSON.parse(localStorage.getItem("jgdrs")) );
  const [nome, setNome]     = React.useState("");
  const [local, setLocal]   = React.useState("");
  const [idade, setIdade]   = React.useState("");
  const [posicao, setPos]   = React.useState("");
  const [altura, setAltura] = React.useState("");
  const [peso, setPeso]     = React.useState("");
  const [img, setImg]       = React.useState(UserP);

  React.useEffect(() => {
    const cmpSel = JSON.parse(localStorage.getItem("campSel"));
    const jgdrsB = JSON.parse(localStorage.getItem("jgdrs"));
    setCmp(cmpSel);
    jgdrsB && setJgdrs(jgdrsB);
  }, []);

  async function CadastrarJgdr(val){
    const reqs = await fetch(urlRootNode + "cadastra-jgdr",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(val)
      /*body: JSON.stringify({
        nome    : nome,
        local   : local,
        idade   : idade,
        posicao : posicao,
        altura  : altura,
        peso    : peso,
        imagem  : img
      })*/
    })
    const resp = await reqs.json();
    console.log(resp);
    jgdrs.push(resp.jgd);
    setJgdrs(jgdrs);
    localStorage.setItem("jgdrs", JSON.stringify(jgdrs));
    return true;
    //alert("Jogador cadastrado com sucesso!", resp.status);
  }

  return(
    <TelaFull>
      <TopoCmp imagem = {cmp.imagem} label = "Novo Jogador"/>
      <div style ={styles.divInf}>
        <div style = {styles.divImg}>
          <Image
            className = {"imgCmp"}
            src       = {img}
          />
        </div>
        <div style={styles.divInputs}>
          <Inputs
            place = "Nome do Jogador"
            value = {nome}
            className = "inputsForm"
            onChange = {(e) => {setNome(e.target.value)}}
          />
          <Inputs
            place = "Local"
            value = {local}
            className = "inputsForm"
            onChange = {(e) => {setLocal(e.target.value)}}
          />
          <Inputs
            place = "Idade"
            value = {idade}
            className = "inputsForm"
            onChange = {(e) => {setIdade(e.target.value)}}
          />
          <Inputs
            place = "Posição"
            value = {posicao}
            className = "inputsForm"
            onChange = {(e) => {setPos(e.target.value)}}
          />
          <Inputs
            place = "Altura"
            value = {altura}
            className = "inputsForm"
            onChange = {(e) => {setAltura(e.target.value)}}
          />
          <Inputs
            place = "Peso"
            value = {peso}
            className = "inputsForm"
            onChange = {(e) => {setPeso(e.target.value)}}
          />
          <Button
            text = "Salvar"
            className = "btt2"
            onClick = {async () => {
              for(let us of lista_teste) await CadastrarJgdr(us);
            }}
          />
        </div>
        <div style = {styles.divImgL}>
          <Image
            className = {"imgFundo"}
            src       = {Img3}
          />
        </div>
      </div>
    </TelaFull>
  );
}
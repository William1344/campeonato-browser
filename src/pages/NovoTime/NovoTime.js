import React from "react";
import { TelaFull, TopoCmp, Button, CmpJgdr, Inputs } from "../../components";
import styles from "./styles";
import urlRootNode from "../../confgs";

export default function NovoTime(props) {

  const [state, setStt]       = React.useState(false);
  const [cmp, setCmp]         = React.useState(JSON.parse(localStorage.getItem("campSel")));
  const [jgdrSel, setJgdrSel] = React.useState([]);
  const [jgdrs, setJgdrs]     = React.useState(VerificarTimes());
  const [nome, setNome]       = React.useState("Girls");
  const [local, setLocal]     = React.useState("Bagé");
  
  React.useEffect(() => {
    
  }, []);

  async function CadastrarTime(){
    const reqs = await fetch(urlRootNode + "novo-time",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome      : nome,
        local     : local,
        jogadores : jgdrSel,
        camp      : cmp
      })
    });
    const resp = await reqs.json();
    //receber novo camp e salvar no localstorage
    if(resp.status == 200){
      localStorage.setItem("campSel", JSON.stringify(resp.camp));
      //alert("Time cadastrado com sucesso!");
      window.location.href = "/desktop/main-campeonato";
    }
  }

  function VerificarTimes(){
    const jgdrs = JSON.parse(localStorage.getItem("jgdrs"));
    const camp = JSON.parse(localStorage.getItem("campSel"));
    if(camp.times.length > 0){
      /*Deve verificar os jogadores que já fazem parte do time 
       e remove-los da lista de jogadores disponíveis
       para que não sejam selecionados novamente
      */
      for(const tm of camp.times)
        for(const jgd of tm.users)
          for(const user of jgdrs)
            if(jgd.index == user.index)
              jgdrs.splice(jgdrs.indexOf(user), 1);
      console.log("Jogadores Verificados!\n",jgdrs);
      return jgdrs;
    }else return jgdrs;
  }

  function AdicionaJgdr(jgdr, index){
    console.log("clicou em: ", jgdr);
    jgdrSel.push(jgdr);
    jgdrs.splice(index,1);
    setJgdrs(jgdrs);
    setJgdrSel(jgdrSel);
    console.log("jgdrs: \n", jgdrs);
    console.log("jgdrSel: \n", jgdrSel);
    //atualizar página
    setStt(!state);
  }
  function RemoveJgdr(jgdr, index){
    jgdrs.push(jgdr);
    jgdrSel.splice(index,1);
    setJgdrs(jgdrs);
    setJgdrSel(jgdrSel);
    console.log("jgdrs: \n", jgdrs);
    console.log("jgdrSel: \n", jgdrSel);
    //atualizar página
    setStt(!state);
  }

  return(
    <TelaFull>
      <TopoCmp imagem = {cmp.imagem} label = "Novo Time"/>
      <div style ={styles.divInf}>
        <div style={styles.divInputs}>
          <label style={styles.label}>Selecione os jogadores</label>
          <Inputs
            place = "Nome do Time"
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
          <Button
            text = "Novo jogador"
            className = "btt2"
            onClick = {() => {
              window.location.href = "/desktop/novo-jgdr";
            }}
          />
          <Button
            text = "Salvar"
            className = "btt2"
            onClick = {() => {CadastrarTime()}}
          />
          <div style={styles.divJgdrs}>
            {jgdrSel.map((jgd, index) => {
              return(
                <div style={styles.divJgdrSel} key = {index}>
                  <img
                    onClick={() => {RemoveJgdr(jgd, index)}}
                    style = {styles.img}
                    src = {jgd.imagem}
                    key = {index}
                  />
                  <h1 style={styles.imgLb}>{jgd.nome}</h1>
                </div>
              );
            })}
          </div>
        </div>
        <div style={styles.divFlat}>
          <label style={styles.label}>Jogadores</label>
          <div style={styles.flat}>
            {jgdrs.map((jgd,index) => {
              return (
                <CmpJgdr
                  jgdr = {jgd}
                  key = {index}
                  onClick = {() => {
                    AdicionaJgdr(jgd,index)
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </TelaFull>
  );
}


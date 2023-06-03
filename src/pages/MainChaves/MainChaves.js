import React from "react";
import { TelaFull, TopoCmp, Button, CmpJogo, CmpTime } from "../../components";
import urlRootNode from "../../confgs";
import styles from "./styles";

export default function MainChave(){
  const [camp, setCamp]         = React.useState(JSON.parse(localStorage.getItem("campSel")));
  const [txtJgsChv, setTxtJC]   = React.useState("Jogos da Chave A");
  const [txtChv, setTxtChv]     = React.useState("Chave A");
  const [jgsFim, setJgsF]       = React.useState([]);
  const [stt, setStt]           = React.useState(true); 
  
  React.useEffect(() => {
    
    console.log("MainChave: ", camp);
  }, []);

  async function SalvarJogos(){
    for(let i = 0 ; i < jgsFim.length ; i++) jgsFim[i].index = i;
    camp.jogos = jgsFim;
    const req = await fetch(urlRootNode + "salve-camp",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(camp)
    });
    const res = await req.json();
    if(res.status == 200){
      camp.mode = "chv";
      console.log("SalvarJogos: ", res);
      localStorage.setItem("campSel", JSON.stringify(res.camp));
      setCamp(camp);
      window.location.href = "/desktop/main-campeonato";
    }
  }

  function DefineHora(init, vzs){
    // definir horário do jogo
    const vet = init.split(":");
    const hora = parseInt(vet[0]);
    const min = parseInt(vet[1]);
    const interval = 20
    const minF = min + (interval * vzs);
    const horaF = hora + Math.floor(minF / 60);
    const minFF = minF % 60;
    return horaF + ":" + minFF;   
  }

  function handleChave(){
    if(txtChv == "Chave A"){
      setTxtChv("Chave B");
      setTxtJC("Jogos da Chave B");
    } else {
      setTxtChv("Chave A");
      setTxtJC("Jogos da Chave A");
    }
  }
  
  function AddJogo(idx){
    if(!jgsFim.length){
      camp.jogos[idx].hora = camp.hora;
      camp.jogos[idx].rotulo = "" + camp.jogos[idx].rotulo + (jgsFim.length+1);
      jgsFim.push(camp.jogos[idx]);
      setJgsF(jgsFim);
    } else {
      const vzs = jgsFim.length;
      camp.jogos[idx].hora = DefineHora(camp.hora, vzs);
      camp.jogos[idx].rotulo = "" + camp.jogos[idx].rotulo + (jgsFim.length+1);
      jgsFim.push(camp.jogos[idx]);
    }
    handleChave();
    setCamp(camp);
    setStt(!stt);
  }
  function RemovJogo(idx){
    jgsFim.splice(idx, 1);
    setJgsF(jgsFim);
  }
  
  
  return (
    <TelaFull>
      <TopoCmp 
        imagem = {camp.imagem}
        label = {camp.nome}
      />
      <div style = {styles.divInf}>
        <div style={styles.divFlat}>
          <label style={styles.label}>Jogos</label>
          <div style={{...styles.flat, height: '75%'}}>
            {
              jgsFim.map((jg, index) => {
                return (
                  <CmpJogo
                    onClick =   {() => RemovJogo(index)}
                    key     =   {index}
                    index   =   {index}
                    jogo    =   {jg}
                  />
                );
              })
            }
          </div>
          <Button
            className = {"btt2"}
            text = "Salvar"
            onClick = {() => {SalvarJogos()}}
          />
        </div>
        <div style={styles.divFlat}>
          <label style={styles.label}>{txtJgsChv}</label>
          <div style={styles.flat}>
            {
              camp.jogos.map((jg,index) => {
                if(jg.tipo == "chaveA" && txtChv === "Chave A"){
                  console.log("Jogo Chave A ", index);
                  return (
                    <CmpJogo
                      onClick = {() => AddJogo(index)}
                      key     = {index}
                      index   = {index}
                      jogo    = {jg}
                    />
                  );
                } else if(jg.tipo == "chaveB" && txtChv == "Chave B"){
                  console.log("Jogo Chave B ", index);
                  return (
                    <CmpJogo
                      onClick = {() => AddJogo(index)}
                      key     = {index}
                      index   = {index}
                      jogo    = {jg}
                    />
                  );
                }
              })
            }
          </div>
        </div>
        <div style={styles.divFlat}>
          <Button
            text = {txtChv}
            className = {"btt2"}
            onClick = {() => {
              handleChave();
            }}
          />
          <div style={styles.flat}>
            {
              camp.times.map((tm, index) => {
                if(tm.tipo == "chaveA" && txtChv == "Chave A"){
                  return (
                    <CmpTime 
                      key   = {index}
                      index = {index}
                      time  = {tm}
                    />
                  );
                } else if(tm.tipo == "chaveB" && txtChv == "Chave B"){
                  return (
                    <CmpTime 
                      key   = {index}
                      index = {index}
                      time  = {tm}
                    />
                  );
                }
              }) 
            }
          </div>
        </div>
      </div>
    </TelaFull>
  );
}
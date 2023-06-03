import React from "react";
import { TelaFull, TopoCmp, Button, CmpJogo, CmpTime } from "../../components";
import urlRootNode from "../../confgs";
import styles from "./styles";

export default function MainCmp(props) {

  const [jgdrsArray,  setJgdrsA] = React.useState(JSON.parse(localStorage.getItem("jgdrs")));
  const [label,       setLabel]  = React.useState("Times");
  const [cmp,         setCmp]    = React.useState(JSON.parse(localStorage.getItem("campSel")));
  const [chave,       setChave]  = React.useState(0); // 0 -> Times, 1 -> Chave A, 2 -> Chave B

  React.useEffect(() => {
    console.log("MainCmp entrou!", cmp);
  }, []);

  async function SortearChaves(){
    // quem vai sortear é o servidor!
    // enviar campeonato para o servidor
    if(cmp.chaves.chaveA.length == 0){
      console.log("SortearChaves: ");
      const reqs = await fetch(urlRootNode + "montar-chaves",{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cmp)
      })
      const ress = await reqs.json();
      if(ress.status == 200){
        console.log("SortearChaves: ", ress);
        setCmp(ress.camp);
        const reqs2 = await fetch(urlRootNode + "definir-jogos",{
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ress.camp)
        })
        const ress2 = await reqs2.json();
        if(ress2.status == 200){
          console.log("DefinirJogos: ", ress2.camp);
          // atualizar o localStorage
          localStorage.setItem("campSel", JSON.stringify(ress2.camp));
          setCmp(ress2.camp);
        }
      }      
    }
    window.location.href = "/desktop/main-chave";
  }

  async function IniciarJogo(index){
    cmp.jogos[index].status = 1;
    setCmp(cmp);
    const reqs = await fetch(urlRootNode + "salve-camp",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cmp)
    });
    const ress = await reqs.json();
    if(ress.status == 200){
      console.log("IniciarJogo: ", ress);
      // atualizar o localStorage
      localStorage.setItem("jogoSelIdx",  JSON.stringify(index));
      localStorage.setItem("campSel",     JSON.stringify(ress.camp));
      localStorage.setItem("jogoSel",     JSON.stringify(ress.camp.jogos[index]));
      window.location.href = "/desktop/load-game";
    }
  }
  
  async function DefineMataMata(){
    console.log("Definindo Mata-Mata");
    const reqs = await fetch(urlRootNode + "define-mata", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cmp)
    });
    const ress = await reqs.json();
    if(ress.status === 200){
      console.log("DefineMataMata: ", ress);
      // atualizar o localStorage
      localStorage.setItem("campSel", JSON.stringify(ress.camp));
      setCmp(ress.camp);
    }
  }

  function RenderTimes(){
    if(chave == 0)
      return (
        <>
          {cmp.times.map((tm,index) => {
            return (
              <CmpTime 
                key   = {index}
                index = {index}
                time  = {tm}
              />
            );
          })}
        </>
      );
    else if(chave == 1)
      return (
        <>
          {cmp.chaves.chaveA.map((val,index) => {
            return (
              <CmpTime 
                key   = {index}
                index = {index}
                time  = {cmp.times[val]}
              />
            );
          })}
        </>
      );
    else if(chave == 2)
      return (
        <>
          {cmp.chaves.chaveB.map((val,index) => {
            return (
              <CmpTime 
                key   = {index}
                index = {index}
                time  = {cmp.times[val]}
              />
            );
          })}
        </>
      );
  }
      
  return(
    <TelaFull>
      <TopoCmp imagem = {cmp.imagem} label = {cmp.nome}/>
      <div style ={styles.divInf}>
        <div style={styles.divBtts}>
          <Button
            text = "Ranking"
            className = {"btt1"}
            onClick = {() => {
              window.location.href = "/desktop/ranking";
            }}
          />
          <Button
            text = "Cadastrar"
            className = {"btt1"}
            onClick = {() => {
              localStorage.setItem("jgdrs", JSON.stringify(jgdrsArray));
              window.location.href = "/desktop/novo-time";
            }}
          />
          <Button
            text = "Times"
            className = {"btt1"}
            onClick = {() => {}}
          />
          <Button
            text = "Chaves"
            className = {"btt1"}
            onClick = {() => {
              SortearChaves();
            }}
          />
          <Button
            text = "Mata-Mata"
            className = {"btt1"}
            onClick = {() => {
              DefineMataMata();
            }}
          />
        </div>
        <div style={styles.divFlat}>
          <label style={styles.label}>Jogos</label>
          <div style={styles.flat}>
            {cmp.jogos.map((jg,index) => {
              return (
                <CmpJogo 
                  onClick = {() => IniciarJogo(index)}
                  key     = {index}
                  index   = {index}
                  jogo    = {jg}
                />
              );
            })}
          </div>
        </div>
        <div style={styles.divFlat}>
          <Button
            onClick = {() => {
              if(chave == 0) {setLabel("Chave A"); setChave(1);}
              else if(chave == 1) {setLabel("Chave B"); setChave(2);}
              else if(chave == 2) {setLabel("Times"); setChave(0);}
            }}
            text = {label}
            className = {"btt2"}
          />
          <div style={styles.flat}>
            {RenderTimes()}
          </div>
        </div>
      </div>
    </TelaFull>
  );
}
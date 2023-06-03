import React from "react";
import { TelaFull, TopoFer, Button, CmpJgdr, CmpCamp } from "../../components";
import urlRootNode from "../../confgs";
import styles from "./styles";

export default function Home(){
  const [jgdrs, setJgdrs] = React.useState([]);
  const [cmps, setCmps]   = React.useState([]);
  
  React.useEffect(() => {
    BuscaDados();
    console.log("cmps: ", cmps);
  }, []);

  async function BuscaDados(){
    const reqs = await fetch(urlRootNode + "home-page",{
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    const resp = await reqs.json();
    if(resp.status == 200){
      console.log("Resposta: ", resp);
      setJgdrs(resp.jgdrs);
      setCmps(resp.cmps);
      //alert("Dados carregados com sucesso!");
    }else{
      alert("Erro ao buscar dados");
    }
  }

  function SelecionaCamp(cmp,index){
    localStorage.setItem("campSel", JSON.stringify(cmp));
    localStorage.setItem("campSelIndex", index);
    localStorage.setItem("jgdrs", JSON.stringify(jgdrs));
    window.location.href = "/desktop/main-campeonato";
  }

  function SelecionaJgdr(jgdr,index){
    localStorage.setItem("jgdrSel", JSON.stringify(jgdr));
    localStorage.setItem("jgdrSelIndex", index);
    // fazer tela que mostra o perfil do jogador no desktop!
  }

  return (
    <TelaFull>
      <TopoFer label = {"Campeonato de Basquete 3x3"}/>
      <div style = {styles.containInf}>
        <div style = {styles.containBtts}>
          <Button
            text = "Ranking"
            className = {"btt1"}
            onClick = {() => {}}
          />
          <Button
            text = "Novo Campeonato"
            className = {"btt1"}
            onClick = {() => {
              window.location.href = "/desktop/novo-campeonato";
            }}
          />
          <Button
            text = "Campeonatos"
            className = {"btt1"}
            onClick = {() => {}}
          />
          <Button
            text = "Times"
            className = {"btt1"}
            onClick = {() => {}}
          />
          <Button
            text = "Configs"
            className = {"btt1"}
            onClick = {() => {}}
          />
          

        </div>
        <div style = {styles.containFlat}>
          <label style={styles.label}>Campeonatos</label>
          <div style={styles.flat}>
            {cmps.map((cmp,index) => {
              return (
                <CmpCamp 
                  index = {index}
                  cmp   = {cmp}
                  onClick = {() => SelecionaCamp(cmp,index)}
                  key = {index}
                />
              );
            })}
          </div>
        </div>
        <div style = {styles.containFlat}>
          <label style={styles.label}>Jogador</label>
          <div style={styles.flat}>
            {jgdrs.map((jgd,index) => {
              return (
                <CmpJgdr 
                  index = {index}
                  jgdr   = {jgd}
                  onClick = {() => SelecionaJgdr(jgd,index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </TelaFull>
  );
}

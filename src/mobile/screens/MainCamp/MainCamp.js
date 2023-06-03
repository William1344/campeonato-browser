import React        from "react";
import urlRootNode  from "../../../confgs";
import { TelaFull, CompCamp, Button, CompUser, CompJgs, CompTms } from "../../components/";
import styles       from "./styles";
import { Logo }     from "../../../assets";

export default function MainCamp() {
  const protot = {
    imagem: Logo, 
    nome: "Campeonato 3x3 etapa Bagé", 
    data: "11/12/22", 
    times: [],
    jogos: [],
    chaves: {chaveA: [], chaveB: []},
  }
  const [camps, setCamps] = React.useState(protot);
  const [mod, setMod]     = React.useState("Jogos");
  const [stt, setStt]     = React.useState(false);
  const [users, setUsers] = React.useState([]);
  
  React.useEffect(() => {
    RetornaCamps();
    setStt(!stt);
  }, []);

  React.useEffect(() => {
    CarregaUsers()
    console.log("Camp", camps);
    setStt(!stt);
  }, [mod]);

  async function RetornaCamps() {
    const reqs = await fetch(urlRootNode + "camps-de-hoje", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    });
    const ress = await reqs.json();
    if (ress.status === 200) {
      localStorage.setItem("campsHoje", JSON.stringify(ress.camps));
      setCamps(ress.camps);
      setStt(!stt);
    }
  }
  async function CarregaUsers() {
    let array = [];
    for(let tm of camps.times)
      for(let us of tm.users)
        array.push(us);
    
    const reqs = await fetch(urlRootNode+"users-do-camp", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({usG: array})
    })
    const ress = await reqs.json();
    if(ress.status === 200){
      console.log("users do camp", ress.users);
      localStorage.setItem("usersCamp", JSON.stringify(ress.users));
      setUsers(ress.users);
    }
  }

  function DefineComp(){
    if(mod === "Jogos") setMod("Times");
    else if(mod === "Times") setMod("Atletas");
    else if(mod === "Atletas") setMod("Chave A");
    else if(mod === "Chave A") setMod("Chave B");
    else if(mod === "Chave B") setMod("Jogos");
  }
  function RenderComp(){
    if(mod === "Jogos" )
      return RenderJogos();
    else if(mod === "Times")
      return RenderTimes();
    else if(mod === "Atletas")
      return RenderJgdrs();
    else if(mod === "Chave A")
      return RenderChaveA();
    else if(mod === "Chave B")
      return RenderChaveB();
  }
  function RenderJogos(){
    return (
      <div style={styles.divComps}>
        {
          camps.jogos.map((jogo, index) => {
            return (
              <CompJgs key={index} jogo={jogo} 
                onClick={() => {
                  localStorage.setItem("game", JSON.stringify(jogo));
                  window.location.href = "/campeonato/view-game";
                }}
              />
            )
          })
        }
      </div>
    )
  }
  function RenderTimes(){
    return (
      <div style={styles.divComps}>
        {
          camps.times.map((tm, idx) => {
            return (
              <CompTms 
                key = {idx} time = {tm} 
                onClick = {() => {
                  console.log("Clicou aqui!");
                  localStorage.setItem("time", JSON.stringify(tm));
                  window.location.href = "/campeonato/view-time";
                }}
              />
            )
          })
        }
      </div>
    )
  }
  function RenderJgdrs(){
    return (
      <div style={styles.divComps}>
        {
          users.map((us, index) => {
            return (
              <CompUser
                key     ={index}
                user    ={us}
                onClick ={() => {
                  localStorage.setItem("user", JSON.stringify(us));
                  window.location.href = "/campeonato/view-user";
                }}
              />
            )
          })
        }
      </div>
    )
  }
  function RenderChaveA(){
    return (
      <div style={styles.divComps}>
        {
          camps.times.map((tm, idx) => {
            if(tm.index %2 == 0)
              return (
                <CompTms 
                  key = {idx} time = {tm} 
                  onClick = {() => {
                    console.log("Clicou aqui!");
                    localStorage.setItem("time", JSON.stringify(tm));
                    window.location.href = "/campeonato/view-time";
                  }}
                />
              );
          })
        }
      </div>
    )
  }
  function RenderChaveB(){
    return (
      <div style={styles.divComps}>
        {
          camps.times.map((tm, idx) => {
            if(tm.index %2 != 0)
              return (
                <CompTms 
                  key = {idx} time = {tm} 
                  onClick = {() => {
                    console.log("Clicou aqui!");
                    localStorage.setItem("time", JSON.stringify(tm));
                    window.location.href = "/campeonato/view-time";
                  }}
                />
              );
          })
        }
      </div>
    )
  }

  return (
    <TelaFull>
      <CompCamp camps = {camps}/>
      <div style={styles.divInf}>
        <div style={styles.divBtts}>
          <Button
            text={mod}
            onClick={() => DefineComp()}
          />
          <Button
            text={"Ranking"}
            onClick={() => {
              // selecionar os jogadores do camp e ir para o ranking
              window.location.href = "/campeonato/ranking";
            }}
          />
        </div>
        {RenderComp()}
      </div>
    </TelaFull>
  );
}
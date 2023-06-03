import React from "react";
import { TelaFull, Button } from "../../components";
import styles from "./styles"

export default function RankingMob() {

  const [users, setUsers]   =   React.useState(JSON.parse(localStorage.getItem("usersCamp")));
  const [camp, setCamp]     =   React.useState(JSON.parse(localStorage.getItem("campsHoje")));
  const [bttS, setBttS]     =   React.useState({bG : "red", bS : "blue", bM : "blue"});

  React.useEffect(() => {
    console.log("UsersCamp",users);

  }, []);

  function Celula({txt}){
    return (
      <div style={styles.celula}>
        <h1 style={styles.txt}>
          {txt}
        </h1>
      </div>
    );
  }

  function CompCab(){
    if(bttS.bG === "red"){
      return (
        <div style={styles.divCab}>
          <div style={{...styles.celula, width: "40%"}}>
            <h1 style={styles.txt}>
              Nome
            </h1>
          </div>
          {ReturnCompCab()}
        </div>
      );
    } else {
      return (
        <div style={styles.divCab}>
          <div style={{...styles.celula, width: "30%"}}>
            <h1 style={styles.txt}>
              Nome
            </h1>
          </div>
          {ReturnCompCab()}
        </div>
      );
    }
  }
  function ReturnCompCab(){
    if(bttS.bG === "red")
      return (
        <>
          <Celula txt="Jgs"/>
          <Celula txt="Vit"/>
          <Celula txt="FG%"/>
          <Celula txt="Clt"/>
          <Celula txt="TP"/>
        </>
      ); 
    else if(bttS.bS === "red")
      return (
        <>
          <Celula txt="2 Pts"/>
          <Celula txt="3 Pts"/>
          <Celula txt="Reb"/>
          <Celula txt="Asst"/>
          <Celula txt="Blk"/>
          <Celula txt="Stl"/>
          <Celula txt="AirB"/>
        </>
      );
    else if(bttS.bM === "red")
      return (
        <>
          <Celula txt="TPG"/>
          <Celula txt="2PG"/>
          <Celula txt="3PG"/>
          <Celula txt="RPG"/>
          <Celula txt="APG"/>
          <Celula txt="BPG"/>
          <Celula txt="SPG"/>
          <Celula txt="ABPG"/>
        </>
      );
  }
  function CompGerais(user){
    return (
      <div style={styles.divCompRkg}>
        
        <div style={{...styles.celulaG, width: "40%"}}>
          <img
            style = {styles.imagem}
            src = {user.imagem}
          />
          <h1 style={styles.txt}>
            {user.nome}
          </h1>
        </div>
        <Celula txt = {user.scorsTC.jogos}/>
        <Celula txt = {user.scorsTC.vit}/>
        <Celula txt = {user.scorsTC.aFG}/>
        <Celula txt = {user.scorsTC.cluth}/>
        <Celula txt = {user.scorsTC.totalPts}/>
      </div>
    );
  }
  function CompScors(user){
    return (
      <div style={styles.divCompRkg}>
        <div style={{...styles.celula, width: "30%"}}>
          <h1 style={styles.txt}>
            {user.nome}
          </h1>
        </div>
        <Celula txt = {user.scorsTC.a2pts}/>
        <Celula txt = {user.scorsTC.a3pts}/>
        <Celula txt = {user.scorsTC.rebotes}/>
        <Celula txt = {user.scorsTC.assts}/>
        <Celula txt = {user.scorsTC.block}/>
        <Celula txt = {user.scorsTC.roubo}/>
        <Celula txt = {user.scorsTC.airBall}/>
      </div>
    );
  }
  function CompMedia(user){
    return (
      <div style={styles.divCompRkg}>
        <div style={{...styles.celula, width: "30%"}}>
          <h1 style={styles.txt}>
            {user.nome}
          </h1>
        </div>
        <Celula txt = {user.scorsTC.totalPPG}/>
        <Celula txt = {user.scorsTC.a2PG}/>
        <Celula txt = {user.scorsTC.a3PG}/>
        <Celula txt = {user.scorsTC.RPG}/>
        <Celula txt = {user.scorsTC.APG}/>
        <Celula txt = {user.scorsTC.BPG}/>
        <Celula txt = {user.scorsTC.RouPG}/>
        <Celula txt = {user.scorsTC.AirPG}/>
      </div>
    );
  }

  return (
    <TelaFull>
      <div style = {styles.divSup}>
        <img 
          style =   {styles.imgCamp}
          src   =   {camp.imagem}
          alt   =   {camp.nome}
        />
        <div style = {styles.divCamp}>
          <h2 style = {styles.title}>{camp.nome}</h2>
          <button
            style = {{...styles.btt, backgroundColor: bttS.bG}}
            onClick = {() => setBttS({bG : "red", bS : "blue", bM : "blue"})}
          >Gerais</button>
          <button
            style = {{...styles.btt, backgroundColor: bttS.bS}}
            onClick = {() => setBttS({bG : "blue", bS : "red", bM : "blue"})}
          >Scores</button>
          <button
            style = {{...styles.btt, backgroundColor: bttS.bM}}
            onClick = {() => setBttS({bG : "blue", bS : "blue", bM : "red"})}
          >Médias</button>
        </div>
      </div>
      <CompCab/>
      <div style = {styles.divInf}>
        {
          users.map((user, idx) => {
                 if(bttS.bG === "red") return CompGerais(user);
            else if(bttS.bS === "red") return CompScors(user);
            else if(bttS.bM === "red") return CompMedia(user);
          })
        }
      </div>
    </TelaFull>
  );
}
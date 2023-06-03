export default function CompTms({time, onClick}) {
  //console.log("CompTms", time);
  return(
    <div 
      className = "cmpTimeMob"
      onClick = {onClick}  
    >
      <h1>{time.nome} | Chave {time.index %2 === 0 ? " A":" B"}</h1> 
      <div style={styles.divTime}>
        <div style={styles.divUsers}>
          {
            time.users.map((us, idx) => {
              return (
                <div key = {idx} style={styles.divUser}>
                  <img src = {us.imagem} alt = {us.nome} style={styles.imgUser}/>
                  <h2 style = {styles.txtUser}> {us.nome}</h2>
                </div>
              );
            })
          }
        </div>
        <div style = {styles.divInfos}>
          <h2 style = {styles.txtInf}>Jogos: {time.jogos}</h2>
          <h2 style = {styles.txtInf}>Vitórias: {time.vitorias}</h2>
          <h2 style = {styles.txtInf}>FG%: {time.aFG}</h2>
        </div>
      </div>
    </div>
  );
}

const styles = {
  divTime:{
    display           :   "flex",
    flexDirection     :   "row",
    justifyContent    :   "space-around",
    alignItems        :   "center",
    height            :   "180px",
    width             :   "95%",
  },
    divUsers:{
      display         : "flex",
      flexDirection   : "column",
      justifyContent  : "space-around",
      alignItems      : "center",
      height          : "100%",
      width           : "48%",
    },
      divUser : {
        display       : "flex",
        flexDirection : "row",
        justifyContent: "flex-start",
        alignItems    : "center",
        height        : "50px",
        width         : "100%",
      },
        imgUser : {
          height      : "50px",
          width       : "50px",
          borderRadius: "50%",
          border      : "1px solid aqua",
        },
        txtUser : {
          fontSize    : "18px",
          color       : "white",
          textAlign   : "left",
          marginLeft  : "10px",
        },
    divInfos:{
      display         : "flex",
      flexDirection   : "column",
      justifyContent  : "space-around",
      alignItems      : "flex-start",
      height          : "100%",
      width           : "40%",
    },
      txtInf : {
        fontSize      : "18px",
        color         : "white",
        textAlign     : "left",
        marginLeft    : "10px",
      }
}
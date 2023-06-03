export default function CompJgs(props){

  return (
    <div className="cmpJogoMob"
      onClick={props.onClick}
    >
      <h1>{props.jogo.rotulo}</h1>
      <div>
        <h2>{props.jogo.timeA.nome}</h2>
        <h2>{props.jogo.plcA}</h2>
        <h2>Vs.</h2>
        <h2>{props.jogo.plcB}</h2>
        <h2>{props.jogo.timeB.nome}</h2>
      </div>
    </div>
  );
}
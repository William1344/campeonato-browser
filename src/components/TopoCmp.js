export default function TopoCmp(props) {
  return(
    <div className = "containTopoCmp">
      <img 
        src = {props.imagem}
        className = "imgCmpLogo"
      />
      <h1>{props.label}</h1>
    </div>
  );
}
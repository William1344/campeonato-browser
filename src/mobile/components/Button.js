export default function Button(props){
  return (
    <button className="bttMob" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
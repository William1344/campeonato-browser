export default function Inputs(props) {

  return(
    <input
      placeholder = {props.place}
      className   = {props.className}
      onChange    = {props.onChange}
      type        = {props.type}
      name        = {props.name}
      value       = {props.value}

    />
     
    
  );
}
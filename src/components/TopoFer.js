import React from "react";
import { Logo } from "../assets";

export default function TopoFer(props) {
  return (
    <div className = "containTopoCmp">
      <img src = {Logo}/>
      <h1>{props.label}</h1>
    </div>
  );
}
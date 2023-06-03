const styles = {
  // Componente TelaFull
  telaFull: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "black",
  },
  // Componente CompCamp
  compCamp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "25%",
    width: "100%",
    backgroundColor: "red",
  }
} ; export default styles;

const cors = {
  Aquamarine      :       "#7FFFD4",
  Black           :       "#000",
  Blue            :       "#076CC9",
  Cinza           :       "#363636",
  CinzaDark       :       "#2F4F4F",
  DarkBlue        :       "#00008B",
  DarkCyan        :       "#008B8B",
  DarkGray        :       "#A9A9A9",
  DarkGreen       :       "#006400",
  DeepPink        :       "#FF1493",
  DarkRed         :       "#8B0000",
  MidnightBlue    :       "#191970",
  Red             :       "#FF0000",
  RoyalBlue       :	      "#4169E1",
  Thistle         :       "#D8BFD8",
  White           :       "#FFF",
  Yellow          :       "#FFFF00",
}

const ligth = {
  pri         :   cors.Aquamarine,
  sec         :   cors.Black,
  ter         :   cors.CinzaDark,
  font        :   cors.Black,
  fontSec     :   cors.White,
  border      :   cors.Black,
  button      :   cors.Blue,
  buttonSel   :   cors.Red,
  buttonFont  :   cors.White,
  buttonBorder:   cors.Blue,
  iconsColor  :   cors.Black,
  input       :   cors.White,
  inputBorder :   cors.Black,
  inputFont   :   cors.Black,
  pickerBack  :   cors.Aquamarine,
  iconPicker  :   cors.Black,
  statusBar   :   "light-content",
}

const dark = {
  pri         :   cors.Black,
  sec         :   cors.White,
  ter         :   cors.CinzaDark,
  font        :   cors.White,
  fontSec     :   cors.Black,
  border      :   cors.Aquamarine,
  button      :   cors.Blue,
  buttonSel   :   cors.DarkRed,
  buttonFont  :   cors.White,
  buttonBorder:   cors.Blue,
  iconsColor  :   cors.White,
  input       :   cors.White,
  inputBorder :   cors.White,
  inputFont   :   cors.Black,
  pickerBack  :   cors.Black,
  iconPicker  :   cors.White,
  statusBar   :   "dark-content",
}
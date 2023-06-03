const styles = {
  containInf: {
    display         : "flex",
    justifyContent  : "space-around",
    alignItems      : "center",
    flexDirection   : "row",
    width           : "100%",
    height          : "70%",
  },
    containBtts: {
      display         : "flex",
      flexDirection   : "column",
      justifyContent  : "space-evenly",
      alignItems      : "center",
      height          : "100%",
      width           : "20%",
    },
    containFlat: {
      display         : "flex",
      flexDirection   : "column",
      justifyContent  : "space-around",
      alignItems      : "center",
      height          : "100%",
      width           : "38%",
    },
      label: {
        margin      : "2%",
        height      : "10%",
        fontSize    : "26px",
        fontWeight  : "bold",
        color       : "#fff",

      },
      flat: {
        display         : "flex",
        justifyContent  : "flex-start",
        alignItems      : "center",
        flexDirection   : "column",
        width           : "100%",
        height          : "90%",
        overflow        : "auto",
      }

}; export default styles;
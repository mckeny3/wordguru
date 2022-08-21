export const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    //backgroundColor: "indigo",
    flex: 1,
  },
  game_cell: {},
  game_row: {},
  game_cell: {
    height: 20,
    width: 20,
    backgroundColor: "red",
  },
  game_wrapper: {
    backgroundColor: "grey",
    alignSelf: "stretch",
    flex: 1,
  },

  word_selected: {
    backgroundColor: "#61dafb",
    color: "white",
    height: 32,
    width: 32,
    /*   color: white;
    background-color: #61dafb;
    border-radius: 0.50rem;
  
    height: 2.4rem;
    width: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;*/
    fontWeight: "900",
    fontSize: 20,
  },
});

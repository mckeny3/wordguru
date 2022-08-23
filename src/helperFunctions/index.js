export const getStringArray = (array) => {
  let len = array.length;
  let string = "";
  for (let i = 0; i < len; i++) {
    string += array[i].value;
  }
  return string;
};

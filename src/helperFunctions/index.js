export const getStringArray = (array) => {
  let len = array.length;
  let string = "";
  for (let i = 0; i < len; i++) {
    string += array[i].value;
  }
  return string;
};
// /////get percentage

export const getPercentage = (num1, num2) => {
  if (num1 === 0 && num2 === 0) return 0;

  const per = (num1 / num2) * 100;
  return Math.floor(per);
};

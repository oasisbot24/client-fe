function numberToComma(number: number, fit = false) {
  if (number === undefined || number === null) return '';
  number = parseFloat(number.toString());
  let number_str = '';
  if (fit) number_str = number.toFixed(0);
  else number_str = (Math.round(number * 1000) / 1000).toFixed(3);
  return number_str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default numberToComma;

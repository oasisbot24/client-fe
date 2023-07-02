import numberToComma from '@function/numberToComma';

function numberToKorean(number: number) {
  if (number < 0) return '';
  let inputNumber = number;
  let unitWords = ['', '만 ', '억 '];
  let splitUnit = 10000;
  let splitCount = unitWords.length;
  let resultArray = [];
  let resultString = '';

  for (let i = 0; i < splitCount; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var i = resultArray.length - 2; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString =
      numberToComma(resultArray[i], true) + unitWords[i] + resultString;
  }
  if (resultArray.length === 1 && inputNumber % 1 > 0)
    resultString += (inputNumber % 1).toFixed(1).toString().substring(1);

  return resultString;
}

export default numberToKorean;

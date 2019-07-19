export function formatCurrency(input, digits = 4) {

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
  });

  return formatter.format(input); /* $2,500.00 */

}

export function checkExchangeable(amount, balance) {
  return parseFloat(amount) > 0 && amount <= balance
}

export function formatDisplay(num) {
  if ( num === "") { return "0"}
  if ( /\.$/.test(num)) {return num.replace(/^0+/, '')}
  //if ( /\.$/.test(num)) {return num}
  if (num % 1 === 0){
    return parseFloat(num).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else if ( /\.\d{1}$/.test(num)) {
    return parseFloat(num).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
}

export function formatInput(num) {
  if (num === "" || num === 0.00 || num === 0 || num === "0.00" || !num) { return "0"; }
  return num;
}

expiryDate = document.getElementById("expiryDate");
cvv = document.getElementById("cvv");

function expiryDateControl() {
  expdate = expiryDate.value;
  const expDateFormatter =
    expdate.replace(/\//g, "").substring(0, 2) +
    (expdate.length >= 2 ? "/" : "") +
    expdate.replace(/\//g, "").substring(2, 4);

    expiryDate.value = expDateFormatter
}

function clickPwBtn() {
  const txtPass = document.getElementById("textPassword");
  const pwCheck = document.getElementById("passwordView");
  if (pwCheck.checked) {
    txtPass.type = "text";
  } else {
    txtPass.type = "password";
  }
}
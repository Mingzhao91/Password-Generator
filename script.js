// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  "."
];

// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

// Function to prompt user for password options
function getPasswordOptions() {
  // this object will return if all inputs are valid, otherwise, null is returned.
  let optionsObj = {
    lengthRequirement: {
      passwordLength: null
    },
    charactersRequirements: {
      hasLowercase: false,
      hasUppercase: false,
      hasNumeric: false,
      hasSpecialCharacters: false
    }
  };

  // get the user input for characters length from prompt
  const inputPasswordLength = prompt(`
  How many characters do you want have for the password?
  Note: A password should at least have 10 characters but no more than 64 characters.
  `);

  // check if the user input for password length is valid
  const isInputPwdLengthValid = isLengthInputValid(inputPasswordLength, 10, 64);

  if (isInputPwdLengthValid) {
    // convert valid user input to a number and store it in the object
    optionsObj.lengthRequirement.passwordLength = Number(inputPasswordLength);
  } else {
    // if user input isn't valid, show an alert to tell user what he should type in.
    handleError(`
    Invalid Input!
    You need to provide a number between 10 and 64 for a password length.
    Please try again!
    `);
    return null;
  }

  console.log("isInputPwdLengthValid: ", isInputPwdLengthValid);
}

// Function for getting a random element from an array
function getRandom(arr) {}

// Function to generate password with user input
function generatePassword() {
  const passwordOptions = getPasswordOptions();
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// ------------------------- Utility Functions -----------------------//

// check if the password length input is valid
function isLengthInputValid(input, minLength, maxLength) {
  // check if the user clicks on cancel button or press 'Esc' to close the dialog
  const isNull = input === null;
  // check if the user clicks on okay button without typing in any characters.
  const isLengthEqualTo0 = typeof input === "string" && input.length === 0;
  // check if the user input is not a number.
  const isNotNumber = isNaN(input);
  // check if the user input is an integer(float is not allowed).
  const isNotInteger = !isNaN(input) && !Number.isInteger(Number(input));
  // check if the user input is out of range
  const isOutOfRange =
    !isNaN(input) &&
    Number.isInteger(Number(input)) &&
    (Number(input) < minLength || Number(input) > maxLength);

  return !(
    isNull ||
    isLengthEqualTo0 ||
    isNotNumber ||
    isNotInteger ||
    isOutOfRange
  );
}

// handle any errors when generating a password
function handleError(message) {
  // show an alert to tell user what goes wrong
  alert(message);
}

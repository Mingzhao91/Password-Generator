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
      haveLowercaseCharacters: false,
      haveUppercaseCharacters: false,
      haveNumericCharacters: false,
      haveSpecialCharacters: false
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
    // return null if user input isn't valid
    return null;
  }

  // console.log("isInputPwdLengthValid: ", isInputPwdLengthValid);

  // show a series of prompts for character types
  for (let option in optionsObj.charactersRequirements) {
    // console.log("option: ", option);

    // add space to separate lowercase character and uppercase character.
    // 'haveLowercaseCharacters' -> 'have Lowercase Characters'
    let wordsInString = option.replace(/([A-Z])/g, " $1");
    // console.log("wordsInString: ", wordsInString);

    // convert all words to lowercase
    // 'have Lowercase Characters' -> 'have lowercase characters'
    wordsInString = wordsInString.toLocaleLowerCase();
    optionsObj.charactersRequirements[option] = confirm(`
    Do you want to ${wordsInString} in your password?
    Click 'Okay' button for 'Yes'
    Click 'Cancel' button for 'No'
    `);
  }

  // console.log("optionsObj: ", optionsObj);

  // loop throught the value of properties in optionsObj.charactersRequirements object and
  // check if it's at least one value is true
  const isAtLeastOneTypeSelected = Object.values(
    optionsObj.charactersRequirements
  ).some((isTypeSelected) => isTypeSelected);

  // console.log("isAtLeastOneTypeSelected: ", isAtLeastOneTypeSelected);

  // if the user doesn't select any character types, inform the user that he/she needs to
  // select at least one character type
  if (!isAtLeastOneTypeSelected) {
    handleError(`
    Invalid Input!
    You need to select at least 1 character type to generate a password.
    Please try again!
    `);
    // return null if no character type is selected
    return null;
  }

  return optionsObj;
}

// Function for getting a random element from an array
function getRandom(arr) {
  // immediately return if argument is not an array or the argument array is empty
  if (!Array.isArray(arr) || (arr && arr.length === 0)) return;
  // get a random element from an argument array
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  // ensure at least 1 character to have in password depending on requirement
  let leastCharactersToHave = [];
  // store all characters for password generation
  let passwordChars = [];
  // all characters that is used to generate a password from
  let charactersArr = [];
  const passwordOptions = getPasswordOptions();

  // generate a password only if the user requirements are specified
  if (passwordOptions) {
    // if lowercase character is required, we have at least one lowercase character in the password
    // and add all lowercase characters in to charactersArr that is used to generate a password from
    if (passwordOptions.charactersRequirements.haveLowercaseCharacters) {
      leastCharactersToHave.push(getRandom(lowerCasedCharacters));
      // using spread operactor to support immutability
      charactersArr = [...charactersArr, ...lowerCasedCharacters];
    }
    // if uppercase character is required, we have at least one uppercase character in the password
    // add all uppercase characters in to charactersArr that is used to generate a password from
    if (passwordOptions.charactersRequirements.haveUppercaseCharacters) {
      leastCharactersToHave.push(getRandom(upperCasedCharacters));
      charactersArr = [...charactersArr, ...upperCasedCharacters];
    }
    // if numeric character is required, we have at least one numeric character in the password
    // add all numeric characters in to charactersArr that is used to generate a password from
    if (passwordOptions.charactersRequirements.haveNumericCharacters) {
      leastCharactersToHave.push(getRandom(numericCharacters));
      charactersArr = [...charactersArr, ...numericCharacters];
    }
    // if special character is required, we have at least one special character in the password
    // add all special characters in to charactersArr that is used to generate a password from
    if (passwordOptions.charactersRequirements.haveSpecialCharacters) {
      leastCharactersToHave.push(getRandom(specialCharacters));
      charactersArr = [...charactersArr, ...specialCharacters];
    }

    // get the remaining number of characters that we need to generate a password
    const remainingNumOfChars =
      passwordOptions.lengthRequirement.passwordLength -
      leastCharactersToHave.length;
    // console.log("passwordChars: ", passwordChars);
    // console.log("charactersArr: ", charactersArr);
    // console.log("remainingNumOfChars: ", remainingNumOfChars);

    // randomly select characters for the remainings
    for (let i = 0; i < remainingNumOfChars; i++) {
      passwordChars.push(getRandom(charactersArr));
    }

    // randomly insert characters back to passwordChars from leastCharactersToHave array
    for (let i = 0; i < leastCharactersToHave.length; i++) {
      const randomPosition = Math.floor(Math.random() * passwordChars.length);
      passwordChars.splice(randomPosition, 0, leastCharactersToHave[i]);
    }

    // console.log("passwordChars: ", passwordChars);
    // console.log("passwordChars.length: ", passwordChars.length);
  }

  // show password in an alert
  if (passwordChars.length > 0) alert(`${passwordChars.join("")}`);

  return passwordChars.join("");
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

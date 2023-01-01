
// This first section of code handles the drop down list and button
// It will determine which code version was selected and pass that
//   to the getValues function via an argument.

const btn = document.querySelector('#btnSubmit');
const sb = document.querySelector('#inputGroupSelect');
btn.onclick = (event) => {
  let codeVersion = "";
    event.preventDefault();
    // show the selected index
    switch (sb.value){
      case "1":{
        codeVersion = "generateResults";
        break;
      }
      case "2": {
        codeVersion = "generateResultsSwitch";
        break;
      }
      case "3": {
        codeVersion = "generateResultsTern";
        break;
      }
      default :{
        codeVersion = "generateResults";
        break;
      }
    }
    getValues(codeVersion);
};

// Get the values from the page.
function getValues(codeVersion) {
  let startValue = document.getElementById("startValue").value;
  let endValue = document.getElementById("endValue").value;
  let firstWord = document.getElementById("firstWord").value;
  let secondWord = document.getElementById("secondWord").value;
  let roundValue = document.getElementById("roundValue").value;
  let aboutValue = document.getElementById("aboutValue").value;

  // Change the values of the number fields to integers and round them to whole numbers.
  startValue = Math.round(parseInt(startValue));
  endValue = Math.round(parseInt(endValue));
  roundValue = Math.round(parseInt(roundValue));
  aboutValue = Math.round(parseInt(aboutValue));

  // Check to see if the numbers ar between 1 and 100 and not a negative number
  if ((startValue < 1 && startValue > 100) || Math.sign(startValue) === -1) {
    alert("Please choose a starting number between 1 and 100");

  } else if ((endValue < 1 && endValue > 100) || Math.sign(endValue) === -1) {
    alert("Please choose an ending number between 1 and 100");
    
  }else if ((roundValue < 1 && roundValue > 100) || Math.sign(roundValue) === -1) {
    alert("Please choose a round number between 1 and 100");

  } else if ((aboutValue < 1 && aboutValue > 100) || Math.sign(aboutValue) === -1) {
    alert("Please choose an about number between 1 and 100");

  // Check to make sure the ending number is larger than the starting number.
  } else if (startValue >= endValue) {
    alert("The starting number has to be smaller than the ending number");
    
  // Check to make sure the word fields are filled out.
  } else if(!firstWord){
    alert("Please enter the first word");
  } else if(!secondWord){
    alert("Please enter the second word");
  } else {
    // Call the generateResults function with all the values
    //    passed via the arguments and assign it to the results variable.
    // Note that the version of the code you chose will insert the appropriate function name.
    let results = eval(codeVersion)(startValue, endValue, firstWord, secondWord, roundValue, aboutValue);

    // Call the displayResults function and pass the results arguments to it.
    displayResults(results, firstWord, secondWord, roundValue, aboutValue);
  }
}

// The If/Then/Else version of the generate results function (default)
// This function generates the number series in between the number values and assigns them to an array.
//     Then it will switch the multiples of the number fields to the word fields.
function generateResults(sValue, eValue, fWord, sWord, rValue, aValue) {
  let raValue = rValue * aValue;
  let results = [];
  for (let i = sValue; i <= eValue; i++) {
    if(i % raValue === 0){
      results.push(fWord + sWord);
    }else if(i % rValue === 0){
      results.push(fWord);
    }else if(i % aValue === 0){
      results.push(sWord);
    }else{
    results.push(i);
    }
  }
  return results;
}

// Ternary version of the generate results function
function generateResultsTern(sValue, eValue, fWord, sWord, rValue, aValue){
  let results = [];
  for (let i = sValue; i <= eValue; i++) {
    let value = ((i % rValue === 0 ? "Round" : "") + (i % aValue === 0 ? "About" : "") || i);
    results.push(value);
  }
  return results;
}

// Switch case version of the generate results function
function generateResultsSwitch(sValue, eValue, fWord, sWord, rValue, aValue){
  let raValue = rValue * aValue;
  let results = [];
  let RoundAbout = false;
  let Round = false;
  let About = false;

  for (let i = sValue; i <= eValue; i++) {
    RoundAbout = i % raValue === 0;
    Round = i % rValue === 0;
    About = i % aValue === 0;

    switch(true){
      case RoundAbout:{
        results.push("RoundAbout");
        break;
      }
      case Round:{
        results.push("Round");
        break;
      }
      case About:{
        results.push("About")
        break;
      }
      default:{
        results.push(i);
        break;
      }
    }
  }
  return results;
}

// This function will write the results to the html page.
function displayResults(results, fWord, sWord) {
  let templateRows = "";

  // The for loop iterates through the results array,
  //     then assigns a css class to words respectively.
  for (let i = 0; i <= results.length-1; i++) {
    let className = "even";
    let result = results[i];
    let fizbuz = fWord + sWord;
    if (result === fizbuz) {
      className = "roundabout";
    }else if(result === fWord){
      className = "round-value";
    }else if(result === sWord){
      className = "about-value";
    } else {
      className = "font-normal";
    }

    // The line below puts the above result in some html markup.
  templateRows = templateRows + `<tr><td class="${className}">${result}</td></tr>`;
  }
  // The next line inserts the html into the html page.
  document.getElementById("results").innerHTML = templateRows;

  let codeLink = document.getElementById("codeLink");
  codeLink.innerHTML = '<a href="code.html">See The Code</a>'
}

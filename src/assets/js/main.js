// The event listener for the button.
document.getElementById("btnSubmit").addEventListener("click", getValues);

// Get the values from the page.
function getValues() {
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
  } else if (endValue > startValue) {
    alert("The starting number has to be smaller than the ending number");

  } else {
    // Call the generateResults function with all the values
    //     passed via the arguments and assign it to the results variable.
    let results = generateResults(startValue, endValue, firstWord, secondWord, roundValue, aboutValue);

    // Call the displayResults function and pass the results arguments to it.
    displayResults(results, firstWord, secondWord, roundValue, aboutValue);
  }
}

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

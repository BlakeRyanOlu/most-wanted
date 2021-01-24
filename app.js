"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      // TODO: search by traits
      searchResults = searchByTrait(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// People Array that hold object with each individuals First and Last name
let people = data.map(function (el) {
  return el;
});

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt(
    "Found " +
      person.firstName +
      " " +
      person.lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'"
  );

  switch (displayOption) {
    case "info":
      // TODO: get person's info
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let found = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person using the name they entered
  let foundPerson = found[0];
  return foundPerson;
}

function searchByTrait(people) {
  let traitsToCompare = traitValue();
  let checker = true;
  let result = people.filter(function (person) {
    let traitKey = Object.keys(traitsToCompare);
    for (let i = 0; i < traitKey.length; i++) {
      if (person[traitKey[i]] !== traitsToCompare[traitKey[i]]) {
        checker = false;
        break;
      } else {
        checker = true;
      }
    }
    if (checker) {
      return true;
    } else {
      return false;
    }
  });
  return result;
}

// function to get specific trait criteria to search for. Example: Gender can be male or female
function traitValue() {
  let returnedTraitCriteria = traitSearchCriteria();
  let traitObj = {};

  let traits = returnedTraitCriteria.map(function (el) {
    let res;
    switch (el) {
      case "gender":
        res = promptFor(
          "Enter the gender you are searching for? male 👱🏼‍♂️ or female 👱🏼‍♀️",
          chars
        );
        // return { gender: res };
        return (traitObj.gender = res);
      case "dob":
        res = promptFor(
          "Enter the date of birth you're searching for 🗓. Use this format:\n1/31/1900 or 12/31/1900",
          chars
        );
        return (traitObj.dob = res);
      case "height":
        res = Number(
          promptFor("Enter the height you're searching for ⾼", chars)
        );
        return (traitObj.height = res);
      case "weight":
        res = Number(
          promptFor("Enter the weight you're searching for 𐄷", chars)
        );
        return (traitObj.weight = res);
      case "eyeColor":
        res = promptFor(
          "Enter the eye-color you're searching for. Use standard color names like green, red...NOT potatoe-brown or golden-yellow 👁",
          chars
        );
        return (traitObj.eyeColor = res);
      default:
        break;
    }
  });
  // return single object containing users trait search criteria
  return traitObj;
}

// function to get trait(s) attribute to search for
function traitSearchCriteria() {
  let traits = ["gender", "dob", "height", "weight", "eyeColor"];
  let result = [];

  let traitToSearchFor = promptFor(
    "What trait would you like to search for?\n\nEnter:\n1 For Gender 👱🏼‍♂️👱🏼‍♀️\n2 Date of Birth 🗓\n3 For Height ⾼\n4 For Weight 𐄷\n5 For Eye Color 👁\n\nYou can search with multiple criteria seperated by comma like this: 1,3,5",
    chars
  ).split(",");

  for (let i = 0; i < traitToSearchFor.length; i++) {
    result.push(traits[traitToSearchFor[i] - 1]);
  }
  return result; // result in an array
}

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}

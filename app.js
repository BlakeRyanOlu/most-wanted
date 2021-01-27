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
      // TODO: search by traits --DONE
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
      // TODO: get person's info - done
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family -done
      displayFamily(person);
      break;
    case "descendants":
      // TODO: get person's descendants -- use recursion
      findDescendants(person);
      displayPeople(descendants);
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
  // TODO: find the person using the name they entered -DONE
  let foundPerson = found[0];
  return foundPerson;
}

/*******************TRAIT FUNCTIONALITY BEGINS HERE *********/
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
  let foundPerson = displaySearchByTraitResult(result);
  return foundPerson;
}

// function that dislays search by trait results usinig the prompt/alert
function displaySearchByTraitResult(result) {
  let printResult = "";
  let searchResult;
  if (result.length === 0) {
    alert(
      "There are no results based on your search criteria. Please refine your search criteria. Try Again!"
    );
    searchByTrait(people);
  } else {
    for (let i = 0; i < result.length; i++) {
      printResult +=
        "[" +
        (i + 1) +
        "] " +
        result[i].firstName +
        " " +
        result[i].lastName +
        "\n";
    }
  }
  searchResult = promptFor(
    "Your search criteria returned the following result(s):\n" +
      printResult +
      "\nWould you like to get more information? If yes, type in the number index from the search result above",
    chars
  );
  return result[searchResult - 1];
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
      case "occupation":
        res = promptFor("Enter the occupation you're searching for 🏢", chars);
        return (traitObj.occupation = res);
      case "restart":
        app(people);
        break;
      case "quit":
        return;
      default:
        traitSearchCriteria();
    }
  });
  // return single object containing users trait search criteria
  return traitObj;
}

// function to get trait(s) attribute to search for
function traitSearchCriteria() {
  let traits = ["gender", "dob", "height", "weight", "eyeColor", "occupation"];
  let result = [];

  let traitToSearchFor = promptFor(
    "What trait would you like to search for? Enter:\n1 For Gender 👱🏼‍♂️👱🏼‍♀️\n2 Date of Birth 🗓\n3 For Height ⾼\n4 For Weight 𐄷\n5 For Eye Color 👁\n6 For Occupation 🏢\nYou can search with multiple criteria seperated by comma like this: 1,3,5",
    chars
  ).split(",");

  if (traitToSearchFor === null) {
    app(people);
  }

  for (let i = 0; i < traitToSearchFor.length; i++) {
    result.push(traits[traitToSearchFor[i] - 1]);
  }

  return result; // result in an array
}
/*******************TRAIT FUNCTIONALITY ENDS HERE *********/

/****************** FAMILY FUNCTION STARTS HERE ***********/
// function to display found persons family: spouse, parent, siblings
function displayFamily(person) {
  let spouse = findSpouse(person);
  let children = findChildren(person);
  let parent = findParent(person);
  let sibling = findSiblings(person);
  let familyInfo =
    person.firstName + " " + person.lastName + "'s Family Info:\n\n";
  familyInfo += spouse + "\n";
  familyInfo += children + "\n";
  familyInfo += sibling + "\n";
  familyInfo += parent + "\n";
  alert(familyInfo);
}

// find spouse
function findSpouse(person) {
  // get current spouse
  let spouseName;
  let spouseID = person.currentSpouse;
  if (!spouseID) {
    spouseName = "Unknown";
  } else {
    let spouse = people.filter(function (el) {
      // el represents each element/objects been checked
      if (el.id === spouseID) {
        return true;
      } else {
        return false;
      }
    });
    spouseName = spouse[0].firstName + " " + spouse[0].lastName;
  }
  return "Current Spouse: " + spouseName;
}

// find parent or parents
function findParent(person) {
  //get person's parent
  let parentsName = "";
  let parentsID = person.parents; // this is an array
  if (parentsID.length === 0) {
    // if array is emply, means parent is unknown
    parentsName = "Parent: Unknown";
  } else {
    let parentType;
    for (let i = 0; i < parentsID.length; i++) {
      let parent = people.filter(function (el) {
        if (el.id === parentsID[i]) {
          return true;
        } else {
          return false;
        }
      });
      parentType = parent[0].gender === "male" ? "Father" : "Mother";
      parentsName +=
        parentType +
        ": " +
        parent[0].firstName +
        " " +
        parent[0].lastName +
        "\n";
    }
  }
  return parentsName;
}

// find siblings
function findSiblings(person) {
  // The single unifying factor for all siblings is that they share same parent or parents
  let siblingsName = "";
  let parentsID = person.parents;

  if (parentsID.length === 0) {
    siblingsName = "Unknown";
  } else {
    for (let i = 0; i < parentsID.length; i++) {
      let sibling = people.filter(function (el) {
        if (el.parents[i] === parentsID[i] && el.id !== person.id) {
          return true;
        } else {
          return false;
        }
      });
      siblingsName = sibling.map(function (obj) {
        return obj.firstName + " " + obj.lastName;
      });
    }
    siblingsName = siblingsName.join(", ");
  }
  return "Sibling(s): " + siblingsName;
}

function findChildren(person) {
  let children = "";
  let child = people
    .filter(function (el) {
      if (person.id === el.parents[0] || person.id === el.parents[1]) {
        return true;
      } else {
        return false;
      }
    })
    .map(function (el) {
      return el.firstName + " " + el.lastName;
    });
  if (child.length === 0) {
    return "Children: No Child Found";
  } else {
    children = child.join(", ");
    return "Children: " + children;
  }
}
/****************** FAMILY FUNCTION ENDS HERE **********/

/****************** DESCENDANT FUNCTION STARTSS HERE **********/
function displayDescendants(person) {
  let descendants = findDescendants(person);
  alert(descendants);
}

let descendants = [];
let counter = 0;
let i;
function findDescendants(person) {
  let immediateDescendant = people.filter(function (el) {
    if (person.id === el.parents[0] || person.id === el.parents[1]) {
      descendants.push(el);
      return true;
    } else {
      return false;
    }
  });
  for (i = counter; i < descendants.length; i++) {
    counter++;
    findDescendants(descendants[i]);
  }
}

/****************** DESCENDANT FUNCTION ENDS HERE **********/

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
  // Calculate age based on Date of Birth in person object
  let yearOfBirth = person.dob.split("/")[2];
  person.age = 2021 - yearOfBirth;

  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
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

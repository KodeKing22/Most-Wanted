/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
                searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;

        case "test":
            searchByoccupation(people)
            console.log("This is for the test")
            

        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */

    // alert(
        
    //         .map(function (person) {
    //             return;
    //         })
    //         .join("\n")
    // );

// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */

    function displayPerson(person) {
        let personInfo = "";
        for (let property in person) {
            if(property === "parents" || property === "currentSpouse"){
                continue
            }
            `${person.firstName} ${person.lastName} + \n`;
        }
        return personInfo;
    }
      
    // let personInfo = `First Name: ${person.firstName}\n`;
    // personInfo += `Last Name: ${person.lastName}\n`;
    // //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    // alert(personInfo);

// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

/**
 * 
 * @param {Array} people   A collection of people objects
 * @returns {Array}        A collection of people objects
 */
function searchByTraits(people){
    let userInput = prompt("Please enter what specific trait you would liket to search by:\ngender\ndob\nheight\nweight\neyeColor\noccupation.");
    switch (userInput) {
        case "gender":
            results = searchByGender(people)
            break;

        case "dob":
            results = searchByDob(people)
            break;

        case "height":
            results = searchByHeight(people)
            break;

        case "weight":
            results = searchByWeight(people)
            break;

        case "eyeColor":
            results = searchByeyeColor(people)
            break;

        case "occupation":
            results = searchByoccupation(people)
            break;
            
        default:
            return searchByName(people)
            break;
    }

    let results = people.filter(
        function(person){
            return true
        }
    );
    return results;
}
/**
 * This funchtion takes in a collection of people-objects
 * inside an array and returns a collection of people-objects
 * that match the requested gender by the user.
 * @param {Array} people A collection of people objects
 * @returns {Array}      A collection of people objects
 */
function searchByGender(people){
    let userInput = prompt("Please select a gender to search by:\nMale\nFemale");
    let results = people.filter(
        function(person){
            if(userInput === person.gender){
                return true
            }
        } 
    )  
        connsole.log(results);
        return results;
}

function searchByDob(people){
    let userInput = prompt("Please enter a DOB to search for in MM/DD/YYYY format:");
    let results = people.filter(
        function(person){
            if (userInput === person.dob){
                return true
            }
        }
    )
        console.log(results);
        return results;
}

function searchByHeight(people){
    let userInput = prompt("Please enter the height in inches:");
    let searchHeight = parseInt(userInput)
    let results = people.filter(
        function(person){
            if(searchHeight === person.height){
                return true
            }
        }
    )
        console.log(results);
        return results;
}

function searchByWeight(people){
    let userInput = prompt("Please enter weight:");
    let searchWeight = parseInt(userInput)
    let results = people.filter(
        function(person){
            if(searchWeight === person.weight){
                return true
            }
        }
    )
        console.log(results);
        return results;
}

function searchByeyeColor(people){
    let userInput = prompt("Please enter eye color:");
    let results = people.filter(
        function(person){
            if(userInput === person.eyeColor){
                return true
            }
        }
    )
        console.log(results);
        return results;
}

function searchByoccupation(people){
    let userInput = prompt("Please enter occupation:");
    let results = people.filter(
        function(person){
            if(userInput === person.occupation){
                return true
            }
        }
    )
        console.log(results);
        return results;
}
/**
 * 
 * @param {*} people 
 * @returns 
 */
// function searchByUserDefinedTrait(people){
//     let userInputProp = prompt("Please enter what specific trait you would like to search by:");
//     let userInputVal = prompt("please enter the value you'd like to search for.")
//     let results = people.filter(
//         function(person){
//             if(person[userInputProp] === userInputVal || +userInputVal === person[userInputProp]){
//                 return true;
//             }
//         }
//     );
//     return results;
// }

// While (user is not done)
// tempPeople = data  
// prompt for trait [searchByUserDefied] = choice
//  If choice is Gender
//      tempPeople = searchbyGender(tempPeople)  // Filter out selected Gender
// else if choice is eyeColor
//      tempPeople = searchByeyeColor(tempPeople) // Filter by selected eyeColor

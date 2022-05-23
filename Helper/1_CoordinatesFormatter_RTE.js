// Constants
import input from 'readline-sync';
import clipboard from 'clipboardy';
const RTEPT_OPEN_LAT_OPEN =
    `<rtept lat="`;
const LAT_CLOSE_LON_OPEN =
    `" lon="`;
const LON_CLOSE_RTEPT_CLOSE =
    `"></rtept>`;
const EMPTY_SPACE_REGEX = /\s/g;
const LETTER_REGEX = /[a-zA-Z]/g;

// Variables
var coordinates; // Expecting 2 decimals, separated with commas.
var coordinates_array; // The above variable, in an array
var latitude; // The first value of the array
var longitude; // The second value of the array
var finalString; // It's the final string now

console.log("Welcome to the coordinate formatter! - RTE edition");
do {
    coordinates = input.question("What are the coordinates? (Enter STOP or press Ctrl+C to quit the program) ");

    function error() {
        console.error("That is not a valid coordinate!");
    }

    function main() {
        coordinates_array = coordinates.split(",");
        if (coordinates_array.length === 2) { // Check if the array has a length of 2
            latitude = +coordinates_array[0]; // Set the latitude as a number by adding a + in front 
            longitude = +coordinates_array[1]; // Set the longitude as a number by adding a + in front

            if (latitude > 90 || latitude < -90 || LETTER_REGEX.test(latitude) || longitude > 180 || longitude < -180 || LETTER_REGEX.test(longitude)) {
                // console.error("Line 35: Out of bounds for latitude and/or longitude or latitude and/or longitude contains letters")
                error();
            } else {
                // console.log("Line 38: Values accepted");
                finalString = RTEPT_OPEN_LAT_OPEN + latitude + LAT_CLOSE_LON_OPEN + longitude + LON_CLOSE_RTEPT_CLOSE + "\n\t";
                clipboard.writeSync(finalString);
                console.log("The text below has been copied to your clipboard, feel free to paste it to the GPX file :D ");
                console.log(finalString);
            }
        } else {
            // console.error("Line 45: More than 2 values inside coordinates_array");
            error();
        }
    } // End of main()

    if (coordinates.includes(",")) {
        if (EMPTY_SPACE_REGEX.test(coordinates)) {
            coordinates = coordinates.replace(EMPTY_SPACE_REGEX, "") // Replace all spaces with nothing
            main();
        } else {
            1, 2
            main();
        }
    } else if (coordinates === "STOP") {
        // End program
        console.log("Thank you for using the program, goodbye. You may use 2_CoordinatesFormatter_WPT.js to make the waypoints!");
        process.exit(1);
    } else {
        // console.log("Line 62: Does not contain comma, not a coordinate");
        error();
    }
} while (coordinates !== "STOP")
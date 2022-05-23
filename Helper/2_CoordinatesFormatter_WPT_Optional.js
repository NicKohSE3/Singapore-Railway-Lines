// Constants
import input from 'readline-sync';
import clipboard from 'clipboardy';
const WPT_OPEN_LAT_OPEN =
    `<wpt lat="`;
const LAT_CLOSE_LON_OPEN =
    `" lon="`;
const LON_CLOSE_WPT_CLOSE =
    `">
        <name>`;

const NAME_CLOSE_WPT_CLOSE =
    `</name>
    </wpt>`
const EMPTY_SPACE_REGEX = /\s/g;
const LETTER_REGEX = /[a-zA-Z]/g;
const ALL_REGEX = /./g;
// Variables
var coordinates; // Expecting 2 decimals, separated with commas.
var coordinates_array; // The above variable, in an array
var latitude; // The first value of the array
var longitude; // The second value of the array
var stationName; // The name of the station
var finalString; // It's the final string now

console.log("Welcome to the coordinate formatter! - WPT Edition");
do {
    coordinates = input.question("What are the coordinates? (Enter STOP or press Ctrl+C to quit the program) ");

    function coordinateError() {
        console.error("That is not a valid coordinate!");
    }

    function main() {
        coordinates_array = coordinates.split(",");
        if (coordinates_array.length === 2) { // Check if the array has a length of 2
            latitude = +coordinates_array[0]; // Set the latitude as a number by adding a + in front 
            longitude = +coordinates_array[1]; // Set the longitude as a number by adding a + in front

            if (latitude > 90 || latitude < -90 || LETTER_REGEX.test(latitude) || longitude > 180 || longitude < -180 || LETTER_REGEX.test(longitude)) {
                // console.error("Line 33: Out of bounds for latitude and/or longitude or latitude and/or longitude contains letters")
                coordinateError();
            } else {
                stationName = input.question("What is the station name? (Your input may not be shown properly so you may need to paste it again later) ");
                finalString = WPT_OPEN_LAT_OPEN + latitude + LAT_CLOSE_LON_OPEN + longitude + LON_CLOSE_WPT_CLOSE + stationName + NAME_CLOSE_WPT_CLOSE;
                clipboard.writeSync(finalString);
                console.log("The text below has been copied to your clipboard, feel free to paste it to the GPX file :D ");
                console.log(finalString);
            }
        } else {
            // console.error("Line 40: More than 2 values inside coordinates_array");
            coordinateError();
        }
    } // End of main()

    if (coordinates.includes(",")) {
        if (EMPTY_SPACE_REGEX.test(coordinates)) {
            coordinates = coordinates.replace(EMPTY_SPACE_REGEX, "") // Replace all spaces with nothing
            main();
        } else {
            main();
        }
    } else if (coordinates === "STOP") {
        // End program
        console.log("Thank you for using the program, goodbye!");
        process.exit(1);
    } else {
        // console.log("Line 57: Does not contain comma, not a coordinate");
        coordinateError();
    }
} while (coordinates !== "STOP")
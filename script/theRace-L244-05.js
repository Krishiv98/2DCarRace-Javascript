"use strict"

/*
 Filename:    theRace.js
 Student:     Krishiv Soni (cst140)
 Course:      CWEB 190 (Internet Programming/Web Applications 1)
 Instructor:  Michael Grzesina
 Date:        24/02/2022
 Purpose:     Main JavaScript file for running the race and displaying the appropriate buttons for the Assignment 2
*/

window.onload = function() {
    document.body.style.zoom = "70%";
    const cars = [
        new Car("Classic", "images/car1.png", 150),
        new Car("Bug", "images/car2.png", 350),
        new Car("Hatchback", "images/car3.png", 550),
        new Car("Sedan", "images/car4.png", 750)
    ];

    const pixel500 = new Race(cars);
    pixel500.drawCars();

    //disable the reset button when webpage loads
    document.getElementById("Reset").disabled = "true";


    /**
     * This functions is called when the start race button is pressed ans it starts the race by moving each car
     * every 30ms and drawing the cars each time for the visual representation of the movement of car until the
     * race is over. This function also disables the StartRace and the ViewStat button while the race is running.
     */
    function moveThoseCars() {
        document.getElementById("Reset").disabled = false;
        document.getElementById("StartRace").disabled = true;
        document.getElementById("ViewStat").disabled = true;
        pixel500.drawCars();
        pixel500.moveCars();

        if (pixel500.raceOver === false) {
            setTimeout(moveThoseCars, 10);

        }
        if (pixel500.raceOver === true)
        {
            document.getElementById("StartRace").disabled = true;
            document.getElementById("ViewStat").disabled = false;
            document.getElementById("Reset").disabled = false;
        }

    }

    /**
     * This function is called when the reset button is pressed to reset the race and draws them again. It also changes
     * the state of the button as needed
     */
    function resetThoseCars(){

        pixel500.resetCars();
        pixel500.drawCars();
        document.getElementById("StartRace").disabled = false;
        document.getElementById("ViewStat").disabled = false;
        document.getElementById("Reset").disabled = true;

    }

    /**
     * This function displays stats of each car in the given array of cars
     */
    function displayStatsOfThoseCars(){
        pixel500.displayStats();
    }

    /**
     * Event handlers
     * @type {moveThoseCars}
     */
    document.getElementById("StartRace").onclick = moveThoseCars;
    document.getElementById("Reset").onclick = resetThoseCars;
    document.getElementById("ViewStat").onclick = displayStatsOfThoseCars;

}
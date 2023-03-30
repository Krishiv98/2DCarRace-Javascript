"use strict"


/*
 Filename:    assign2objects.js
 Student:     Krishiv Soni (cst140)
 Course:      CWEB 190 (Internet Programming/Web Applications 1)
 Instructor:  Michael Grzesina
 Date:        24/02/2022
 Purpose:     JavaScript file for defining the Car and the Race object for the Assignment 2
*/

const nFinishLine = 1550;


/**
 * This is a object which defines what a car is, its properties and its methods
 * @param id
 * @param image
 * @param vPos
 * @param hPos
 * @param finishedRace
 * @param wins
 * @constructor
 */
    function Car(id, image, vPos, hPos = 0,  finishedRace = false, wins = 0){

        this.id = id;
        this.image = image;
        this.hPosition = hPos;
        this.vPosition = vPos;
        this.initialVPosition = vPos;
        this.finishedRace = finishedRace;
        this.wins = wins;
    }

/**
 * This method resets the hPosition, finishedRace and vPosition of the Car object
 */
Car.prototype.resetCar=  function(){
        this.hPosition = 0;
        this.vPosition = this.initialVPosition;
        this.finishedRace = false;
    }

/**
 * This method returns an img tag for the car object and sets the style for the img
 */

Car.prototype.draw= function(){

        let sImg = document.createElement("img");
        sImg.src = this.image;

        sImg.style.position = "absolute";

        sImg.style.left = `${this.hPosition}px`;

        sImg.style.top = `${this.vPosition}px`;


        return sImg;
    }
/**
 * This method adds random amount to hPosition and checks if the race is finished for a car object
 */
    Car.prototype.move = function(){
        let nRandomInt = Math.floor(Math.random() * 100);

        this.hPosition += nRandomInt;

        if(this.hPosition >= nFinishLine){
            this.finishedRace = true;
        }
    }


/**
 * This function defines a Race object and can create instance of the Race object when called using "new" word.
 * This function initiates the properties of the Race object
 * @param carArray
 * @param raceOver
 * @param standings
 * @param numCarsDone
 * @param totalRaces
 * @constructor
 */
    function Race(carArray =[new Car()], raceOver = false, standings =[], numCarsDone = 0, totalRaces = 0) {
        this.carArray = carArray;
        this.raceOver = raceOver;
        this.standings = standings;
        this.numCarsDone = numCarsDone;
        this.totalRaces = totalRaces;


    }

/**
 * This method returns the Array of car objects which was initially passed to the constructor
 * @returns {Car[]}
 */
Race.prototype.getCarrArray = function (){
        return this.carArray;
    }
/**
 * This function increases the number of races completed
 */
Race.prototype.increaseTotalRace = function (){
        this.totalRaces++;
    }
/**
 * This method resets HTML and calls draw function for each car object in the Array and appends it to
 * the p element in the html page to display the images
 *
 */
Race.prototype.drawCars = function (){
        document.getElementById("imgHere").innerHTML = "";

        for (let carObj of this.carArray) {
            document.getElementById("imgHere").appendChild(carObj.draw());
        }
    }
/**
 * This method adds car to standings if it hasn’t been added already
 * @param carObj
 */
Race.prototype.addToStandings = function(carObj){

        if(this.standings.includes(carObj) === false) {
            this.standings.push(carObj);
        }
    }

/**
 * This method moves each car object , adds to standings, checks for race over in a array of Car object
 */
Race.prototype.moveCars = function (){

    //Going through each car object in the given array and calling its move function until
    // that car object has finished the race, i.e hPosition of the car object is more than equal to 1550px
        for (let i = 0; i < this.carArray.length; i++) {
            if (this.carArray[i].hPosition <= nFinishLine) {

                this.carArray[i].move();
            }

            //Once the car has completed the race it is added to the standings
            else {
                this.carArray[i].finishedRace = true;
                this.addToStandings(this.carArray[i]);
                this.numCarsDone++;
            }
        }
        //When all the cars have completed the race the Race is considered over and the car which came first
        // wins and total number of races completed is also incremented.
        //Lastly the user is alerted of the current standings
        if(this.standings.length === 4) {
            this.raceOver = true;
            this.standings[0].wins++;
            this.increaseTotalRace();//Calling increase method to increase the total number of races completed
            window.alert(this.standingsToString()); //Alerting the current standings to the user when the race is over

        }
    }

/**
 * This method returns a string containing the wins and id of each car object in a array and the current standing
 * @returns {string}
 */
Race.prototype.standingsToString = function (){
        let sReturn;
        let j = 0;
        sReturn = "STANDINGS\n";

        for(let carObj of this.standings) {
            sReturn += `Position ${++j}: ${carObj.id}\n`;
        }
        return sReturn;
    }

/**
 * This methd when called displays wins for each car and total number of races completed
 */
Race.prototype.displayStats = function (){
        let sReturn;
        sReturn = `Out of ${this.totalRaces}, the number of wins are as follows:\n`;

        //Going through each car object and addings its wins and id to the return string
        for (const carObj of this.getCarrArray()) {
            sReturn += `${carObj.id}: ${carObj.wins}\n`;
        }
        window.alert(sReturn);

    }

/**
 * This method resets each car and race settings including the current standings
 */
Race.prototype.resetCars = function (){
        for(let carObj of this.carArray) {


            carObj.resetCar();
            this.raceOver = false;

            this.standings.length = 0; // resetting the current standings by making the length of the this.standing array to zero

        }
    }







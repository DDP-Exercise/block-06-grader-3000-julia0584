"use strict";

import { showOverallGrade } from "./view.grader.js";
import { checkInput } from "./view.grader.js";
import { showMaxValue } from "./view.grader.js";
import { checkAttendance } from "./view.grader.js";
import { worstAssignment } from "./view.grader.js";
import { MODEL } from "./model.grader.js";

let calcNewOutput = function(event){
    showMaxValue(event);
    checkInput(event);
    checkAttendance(event);

    let inputs = document.querySelectorAll("#grades input");
    MODEL.gradeAssignment(inputs);

    let input = document.querySelector("#test input");
    MODEL.gradeTest(input);

    let attendance = document.querySelector("#attendance input").value;
    let testPoints = document.querySelector("#test input").value;
    MODEL.calcGrade(attendance, testPoints);

    worstAssignment(MODEL.assignment_grades);
}

let makeGradeChange = function(event){
    showOverallGrade(event);
}

document.addEventListener("input",calcNewOutput);
document.addEventListener("grader:sendOverallGrade", makeGradeChange);


"use strict";

let ValueInputs = function(idField,idPlace) {
    let assignment = document.createElement("input");
    let gradeDiv = document.getElementById(idPlace);
    gradeDiv.appendChild(assignment);
    assignment.id=idField;
    assignment.min = "0";
    assignment.max = "100";
    assignment.value = "0";
    assignment.classList.add("inputField");
}

export let worstAssignment = function(grades){
    let worstAssignment = Math.min(...grades);
    let index = grades.indexOf(worstAssignment);

    let inputs = document.querySelectorAll("#grades input");
    for(let i = 0; i < inputs.length; i++){
        inputs[i].classList.remove("worstAssignment");
    }
    inputs[index].classList.add("worstAssignment");
}

export let checkAttendance = function(event){
    let field = event.target;
    if(field.parentElement.id === "attendance"){
        if(field.value<80){
            field.classList.add("negativeOutcome");
        }
        else{
            field.classList.remove("negativeOutcome");
        }
    }
}

export let showMaxValue = function(event){
    let points = event.target;
    if(parseInt(points.value) > parseInt(points.max)){
        alert("Für jede Übung gibt es maximal 100 Punkte!");
        event.target.value = 0;
    }
}

export let checkInput = function(event){
    let field = event.target;
    if((field.parentElement.id === "test" ||  field.parentElement.id === "grades") && field.value<=50){
        field.classList.add("negativeOutcome");
    }
    else{
        field.classList.remove("negativeOutcome");
    }
}

export let showOverallGrade = function(event){
    let result = document.getElementById("overallGrade");
    result.textContent = event.detail.overallGrade;
}


ValueInputs("assignmentOne","grades");
ValueInputs("assignmentTwo","grades");
ValueInputs("assignmentThree","grades");
ValueInputs("assignmentFour","grades");
ValueInputs("assignmentFive","grades");
ValueInputs("assignmentSix","grades");
ValueInputs("assignmentSeven","grades");
ValueInputs("assignmentEight","grades");
ValueInputs("test","test");
ValueInputs("attendance","attendance");




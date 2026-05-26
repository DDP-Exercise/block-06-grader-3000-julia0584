"use strict";

export const MODEL = {
    assignment_grades: [],
    test_grade: [],
    positive: true,
    attendance: true,

    sendOverallGrade(grade) {
        const CUSTOMEVENT = new CustomEvent("grader:sendOverallGrade", {
            detail: {
                overallGrade: grade
            }
        });
        document.dispatchEvent(CUSTOMEVENT);
    },

    checkPoints(points) {
        if(points > 50){
            this.positive = true;
        }
        else{
            this.positive = false;
        }
    },

    gradeAssignment(inputs) {
        this.assignment_grades = [];

        for(let i = 0; i < inputs.length; i++) {
            this.checkPoints(inputs[i].value);
            this.assignment_grades.push(parseInt(inputs[i].value));
        }
    },

    gradeTest(input) {
        this.test_grade = [];

        this.checkPoints(input.value);

        this.test_grade.push(parseInt(input.value));
    },


    gradeAttendance(attendance) {
        if(attendance >= 80){
            this.attendance = true;
        }
        else{
            this.attendance = false;
        }
    },

    calcAssignmentGrade(){
        let worstAssignment = Math.min(...this.assignment_grades);
        let index = this.assignment_grades.indexOf(worstAssignment);

        let CopyAssignments = this.assignment_grades.slice();
        CopyAssignments.splice(index, 1);

        let sumPoints = 0;
        for(let i = 0; i < CopyAssignments.length; i++){
            sumPoints = sumPoints+CopyAssignments[i];
        }

        let maxPoints = 700;

        let percent = sumPoints / maxPoints * 100;

        let counterPositive = 0;
        for(let j = 0; j < CopyAssignments.length; j++){
            this.checkPoints(CopyAssignments[j]);
            if(this.positive===true){
                counterPositive+=1;
            }
        }

        let positiveAssignmentsPercent = 100/8*counterPositive;

        if(positiveAssignmentsPercent>=75){
            this.positive = true;
            return percent;
        }
        else{
            this.positive = false;
            return 0;
        }
     },

    calcGrade(attendance, testPoints){
        this.checkPoints(testPoints);

        let positiveTest = this.positive;

        let assignmentGradePart = this.calcAssignmentGrade() * 0.6;
        let testGradePart = testPoints * 0.4;
        let gradeOverall = testGradePart + assignmentGradePart;

        this.gradeAttendance(attendance);
        if(positiveTest === true && this.positive === true && this.attendance===true){
            if(gradeOverall<=50){
                this.sendOverallGrade("Nicht genügend");
                return "Nicht genügend";
            }
            else if(gradeOverall>50 && gradeOverall<=61){
                this.sendOverallGrade("Genügend");
                return "Genügend";
            }
            else if(gradeOverall>61 && gradeOverall<=74){
                this.sendOverallGrade("Befriedigend");
                return "Befriedigend";
            }
            else if(gradeOverall>74 && gradeOverall<=86){
                this.sendOverallGrade("Gut");
                return "Gut";
            }
            else if(gradeOverall>86 && gradeOverall<=100){
                this.sendOverallGrade("Sehr gut");
                return "Sehr gut";
            }
        }
        else{
            if(positiveTest === false){
                this.sendOverallGrade("Nicht genügend da deine Klausur negativ ist!");
                return "Nicht genügend da deine Klausur negativ ist!";
            }
            else if(this.attendance === false){
                this.sendOverallGrade("Nicht genügend da deine Anwesenheit unter 80% liegt!");
                return "Nicht genügend da deine Anwesenheit unter 80% liegt!";
            }
            else if(this.positive === false){
                this.sendOverallGrade("Nicht genügend da du zu wenig positive Übungen hast!");
                return "Nicht genügend da du zu wenig positive Übungen hast!";
            }
        }
    }
}


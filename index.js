"use strict";


class BankBranch {

    #branchInfo;            // Define properties as private to prevent direct access

    constructor(branchInfo){
        // Check if dynamically created property does not exist
        if (BankBranch.singleton === undefined){

            // Init instance with variables
            this.#branchInfo = branchInfo;

            // Dynamically assign property to class definition -> Set as this newly created instance.
            // Freeze this object to prevent any modifications at runtime.
            BankBranch.singleton = Object.freeze(this);

            // In addition, freeze the BankBranch class itself, so that
            // it may not be tampered with eg.
            // reassigning the "singleton" property.
            Object.freeze(BankBranch);
        }

        // Override the default return value of the constructor function
        // (which is the newly created "this" object)
        // and return our dynamically assigned property
        // (the first and only instance of this class)
        return BankBranch.singleton;
    }

    getBranchInfo(){
        return this.#branchInfo;
    }
}


console.log("Attempting to create branch 'New York'");
const branchA = new BankBranch("New York");
console.log("This is branch A:", branchA.getBranchInfo());


console.log("Attempting to create branch 'Amsterdam'");
const branchB = new BankBranch("Amsterdam");
console.log("This is branch B:", branchB.getBranchInfo());

console.log();
console.log("Branch A is the same as Branch B", branchA===branchB);
console.log("There is only BankBranch object in this program environment", branchA===branchB);
console.log("We have successfully implemented a Singleton pattern", branchA===branchB);

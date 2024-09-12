"use strict";


class BankBranch {

    // Define properties as private to prevent direct access.
    // The advantage of this approach is that we are still able to
    // modify properties even after the object is "frozen",
    // but only with functions defined on the class itself - 
    // it cannot be changed or tampered with from outside at runtime.
    #branchName;
    #branchTel;

    constructor(branchName, branchTel){
        // Check if dynamically created property does not exist
        if (BankBranch.singleton === undefined){

            // Init instance with variables
            this.#branchName = branchName;
            this.#branchTel = branchTel;

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
        return {name: this.#branchName, tel: this.#branchTel};
    }

    updateTel(newTel, isAuth=false){
        if (isAuth) { this.#branchTel = newTel; }
        else { console.log("Error - Security Warning: Current user not authed to update Tel info.") };
    }
}


// Attempt to create multiple instances
console.log("\n\n", "----- Attempt to create multiple instances -----");
console.log("Attempting to create branch 'New York' with Tel: 555-5000");
const branchA = new BankBranch("New York", "555-5000");
console.log("This is branch A:", branchA.getBranchInfo());

console.log("Attempting to create branch 'Amsterdam' with Tel: 420-6969");
const branchB = new BankBranch("Amsterdam", "420-6969");
console.log("This is branch B:", branchB.getBranchInfo());


// Test Branch Identities
console.log("\n\n", "----- Test Branch Identities -----");
console.log("Branch A is the same as Branch B", branchA===branchB);
console.log("There is only BankBranch object in this program environment", branchA===branchB);
console.log("We have successfully implemented a Singleton pattern", branchA===branchB);


// Attempt to directly modify data
console.log("\n\n", "----- Attempt to directly modify data -----");
console.log("Branch details before direct modification attempts:", branchA.getBranchInfo());
try {
    branchA.branchName = "Haha, hacked your name.";
} catch (error){ console.log(error); };

try {
    branchA.branchTel = "Oops, new number";
} catch (error){ console.log(error); };

console.log("Branch details after direct modification attempts:", branchA.getBranchInfo());


// Modify data through defined functions
console.log("\n\n", "----- Modify data through defined functions -----");
console.log("Branch details before unauthorized mod attempt:", branchA.getBranchInfo());
let auth = false;
console.log("User is authenticated:", auth);
branchA.updateTel("777-7000", auth);
console.log("Branch details after unauthorized mod attempt:", branchA.getBranchInfo());

console.log();
auth = true;
console.log("User is authenticated:", auth);
branchA.updateTel("777-7000", auth);
console.log("Branch details after authorized mod attempt:", branchA.getBranchInfo());
console.log("branchA is still same as branchB after update:", branchA===branchB);
console.log("See for yourself:", branchB.getBranchInfo());


// Finally, see if object really is frozen, preventing modifications
console.log("\n\n", "----- Finally, see if object really is frozen, preventing modifications -----");
console.log("Object branchA isFrozen:", Object.isFrozen(branchB));
console.log("Object branchB isFrozen:", Object.isFrozen(branchA));
console.log("Object BankBranch isFrozen:", Object.isFrozen(BankBranch));

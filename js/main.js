document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    window.addEventListener('resize', () => {
        document.querySelector('main').style.height = 
        window.innerHeight -
        document.querySelector('header').scrollHeight
        + "px";
    });
    
    add(0, 'head');
    function getUserInput(parentNode) {
        let inputs = parentNode.getElementsByTagName('input');
        let userInput = {};
        if (inputs.length === 1) {
            if (inputs[0].placeholder === "Data")
                userInput.data = inputs[0].valueAsNumber;
            else
                userInput.index = inputs[0].valueAsNumber;
            return userInput;
        }
        userInput.index = inputs[0].valueAsNumber;
        userInput.data = inputs[1].valueAsNumber;
        return userInput;
    }

    // Add end Button

    document.getElementById('add-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        add(nodes.length, userInput.data);
        document.getElementById("value").innerHTML="Node Inserted At the End";
    });

    // Add beginning Button

    document.getElementById('set-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        add(1, userInput.data);
        document.getElementById("value").innerHTML="Node Inserted At the Beginning";
    });

    // Insert at position Button

    document.getElementById('insert-btn').addEventListener('click', function() {
        let userInput = getUserInput(this.parentNode);
        add(userInput.index, userInput.data);
        if(userInput.index == 1){
        document.getElementById("value").innerHTML="Node Inserted at " + userInput.index + "st Position";} 
        else if(userInput.index == 2){
            document.getElementById("value").innerHTML="Node Inserted at " + userInput.index + "nd Position";}
        else if(userInput.index == 3){
            document.getElementById("value").innerHTML="Node Inserted at " + userInput.index + "rd Position";}
        else{
                document.getElementById("value").innerHTML="Node Inserted at " + userInput.index + "th Position";}

    });

    


});

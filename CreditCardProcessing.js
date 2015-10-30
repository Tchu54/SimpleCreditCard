#! /usr/bin/env node
var fs = require('fs'),
    CreditCardAccount = require('./CreditCard');
var userArgs = process.argv.slice(2)
var fileName = userArgs[0]
var memoryData = {}
var namesArray = []

fs.readFile(fileName, 'utf8', function (err, data) {
    if (err){
        console.log("Cannot find testcase in current directory. Please make sure spelling of testcase is correct.")
        return
    }
    var commands = data.split("\n")
    commandsProcessing(commands)
    printOutput()
});

function commandsProcessing(commands){
    for (var i = 0; i < commands.length; i++){
        commandArguments = commands[i].split(" ")
        command = commandArguments[0]
        name = commandArguments[1]

        switch (command){
            case "Add":
                cardNumber = commandArguments[2]
                limit = commandArguments[3]
                if (!(name in memoryData)){
                    var creditCardAccount = new CreditCardAccount(name, cardNumber, limit)
                    memoryData[name] = creditCardAccount
                    namesArray.push(name)
                }
                break
            case "Charge":
                amount = commandArguments[2]
                if (name in memoryData){
                    memoryData[name].charge(amount)
                }
                break
            case "Credit":
                amount = commandArguments[2]
                if (name in memoryData){
                    memoryData[name].credit(amount)
                }
                break
        }
    }
}

function printOutput(){
    namesArray = namesArray.sort(function (x, y) {
        return x.toLowerCase().localeCompare(y.toLowerCase());
    })
    for (var i = 0; i < namesArray.length; i++){
        console.log(namesArray[i] + ": " + memoryData[namesArray[i]].balance)
    }
}
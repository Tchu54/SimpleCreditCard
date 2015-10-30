/**
 * Created by timothychu on 10/25/15.
 */

function CreditCard(name, cardNumber, limit) {
    this.name = name
    this.balance = 0
    this.cardNumber = cardNumber
    this.limit = Number(limit.substr(1,limit.length-1))

    if (!isLuhn10Valid(cardNumber)){
        this.balance = 'error'
    }
}

CreditCard.prototype.charge = function(amount){
    if (this.balance == 'error'){
        return
    }
    amount =  Number(amount.substr(1,amount.length-1))
    if (this.balance + amount <= this.limit){
        this.balance += amount
    }
}

CreditCard.prototype.credit = function(amount){
    if (this.balance == 'error'){
        return
    }
    amount =  Number(amount.substr(1,amount.length-1))
    this.balance -= amount
}

function isLuhn10Valid(cardNumber){
    var totalSum = 0
    var everySecondDigit = false
    for (i = cardNumber.length - 1; i >= 0; i--){
        numDigit = Number(cardNumber[i])
        if (everySecondDigit){
            if (numDigit * 2 > 9) {
                stringDigit = String(numDigit * 2)
                numDigit = Number(stringDigit[0]) + Number(stringDigit[1])
            }
            else{
                numDigit *= 2
            }
        }
        everySecondDigit = !everySecondDigit
        totalSum += numDigit
    }
    return totalSum % 10 == 0
}

module.exports = CreditCard

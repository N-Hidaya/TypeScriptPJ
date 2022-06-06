import { formatDate } from "./utils"

const formattedDate = formatDate(new Date())
console.log(formattedDate)

interface Customer {
    //saves the customer somewhere
    save(): void

}

class Customer {}

const customer = new Customer()
customer.save = function() {}

const myVar = window.MY_VAR
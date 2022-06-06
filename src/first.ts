
//Command to install typescript: npm install typescript -g

//Commands to add jquery type. Search in npm site for commands
//npm install --save @types/jquery

//to define variables
let x: number
let y: string
let b: any
let z: Date

b = "Hello"
z = 34 as any 

interface Address {
    line1?: string;
    line2?: string;
    province?: string;
    region?: string;
    postalCode?: string;
}
interface Contact extends Address{
    id: number;
    name: ContactName;
    status?: ContactStatus
}
//use question marks when not required/optional

//enum solves typo issues
//every value in enum must be same type
enum ContactStatus {
    Active = "active",
    Inactive = "inactive",
    New = "new" 
}

let primaryContact: Contact = {
    //birthDate: new Date("28-01-1996"),
    id: 142,
    name: "Lala",           
    postalCode: 783822 as any,
    status: ContactStatus.Active
    
}

type ContactName = string
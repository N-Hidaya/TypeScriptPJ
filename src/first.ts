
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
    status?: ContactStatus;
    birthDate?: ContactBirthDate;
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
//COMBINING MULTIPLE TYPES WITH UNION TYPES
type ContactBirthDate = Date | number | string
interface Contact {
    id: number;
    name: string;
    birthDate?: ContactBirthDate;
}

function getBirthDate(contact: Contact) {
    if (typeof contact.birthDate === "number") {
        return new Date(contact.birthDate);
    }
    else if (typeof contact.birthDate === "string") {
        return Date.parse(contact.birthDate)
    }
    else {
        return contact.birthDate            
    }
}
function clone<T1, T2>(source: T1): T2 {
    return Object.apply({}, source);
}

const ori: Contact = {id: 123, name: "Homer Simpson"};
const fake = clone<Contact, Date>(ori)

//COMBINING MULTIPLE TYPES WITH UNION TYPES
type ContactBirthDate = Date | number | string

//use & to combine and create new type
type AddressableContact = Contact & Address

//keyof operator
type ContactFields = keyof Contact

//const field: ContactFields = ""

//typeof
function toContact(nameOrContact: string | Contact): Contact {
    if (typeof nameOrContact === "object") {
        return {
            id: nameOrContact.id,
            name: nameOrContact.name,
            status: nameOrContact.status
        }
    }else {
        return {
            id: 0,
            name: nameOrContact,
            status: ContactStatus.Active
        }
    }
}

const myType = {min:1, max:200}
function save(source: typeof myType) {}

//indexed access type
type Awesome = Contact["postalCode"] 

interface ContactEvent {
    contactId: Contact["id"];
}

interface ContactDeletedEvent extends ContactEvent {}

interface ContactStatusChangedEvent extends ContactEvent {
    oldStatus: Contact["status"];
    newStatus: ContactStatus;
}

interface ContactEvents {
    deleted: ContactDeletedEvent;
    statusChanged: ContactStatusChangedEvent;
}

function getValue<T, U extends keyof T>(source: T, propertyName: U){
    return source[propertyName];
}

function handleEvent<T extends keyof ContactEvents> (
    eventName: T,
    handler: (evt: ContactEvents[T]) => void
){
    if(eventName === "statusChanged") {
        handler({ contactId: 1, oldStatus: ContactStatus.Active, newStatus: ContactStatus.Inactive } )
    }
}

handleEvent("statusChanged", evt => evt)

//Dynamic but limited types with records
let test: Record<string, string | number | boolean | Function> = {name: "Wruce Bayne"}
test.number = 1234
test.active = true
test.log = () => console.log("awesome!")

interface Query{
    sort?: 'asc' | 'desc';
    matches(val): boolean;
}

const filteredContacts = searchContacts(
    [/*contacts*/],
    {
        id: {matches: (id) => id === 123},
        name: {matches: (name) => name === "Carol Weaver"},
    }
);

//Extending and modifying existing types
type ContactQuery = Omit<Partial<Record<keyof Contact, Query>>, "address">
//Partial makes all variables optional. 
//Omit variable need to state such as "address"

type ContactQuery2 = Partial<Pick<Record<keyof Contact, Query>, "id" | "name">>
//Pick variables need to state

type RequiredContactQuery = Required<ContactQuery>

//Extracting metada from existing types
interface Querying<TProp> {
    sort?: 'asc' | 'desc';
    matches(val: TProp): boolean;
}
type ContactQuery3 = {
    [TProp in keyof Contact]?: Querying<Contact[TProp]>
}

function searchContacts(contacts: Contact[], query: ContactQuery3){
    return contacts.filter(contact => {
        for (const property of Object.keys(contact)){
            //get query object for this property
            const propertyQuery = query[property] as Querying<Contact[keyof Contact]>;
            //check to see if it matches
            if (propertyQuery && propertyQuery.matches(contact[property])) {
                return true;
            }
        }
        return false;
    })
}

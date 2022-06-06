//Decorators to eliminate logging statements
const currentUser = {
    id: 1234,
    roles: ["ContactEditor"],
    isAuthenticated(): boolean {
        return true
    },
    isInRole(role: string): boolean {
        return this.roles.contains(role);
    }
}



//method decorator
function authorize(role: string){
    return function authorizeDecorator(target: any, property:string, descriptor: PropertyDescriptor){
        const wrapped = descriptor.value

        descriptor.value = function () {
            if(!currentUser.isAuthenticated()) {
                throw Error("User is not authenticated");
            }
            if(!currentUser.isInRole(role)) {
                throw Error(`User not in role ${role}`);
            }
    
            try {
                return wrapped.apply(this, arguments);
            } catch (ex) {
                //TODO
                throw ex;
            }
            
        }
    }
    /*return {
        //...any changes here
    } as PropertyDescriptor*/
}

//class decorator
function freeze(constructor: Function) {
    //to freeze the constructor so that it cannot be modified
    Object.freeze(constructor)
    Object.freeze(constructor.prototype)
}

//class decorator
function singleton<T extends { new(...args: any[]): {} }>(constructor: T){
    return class Singleton extends constructor {
        static _instance = null;

        constructor(...args) {
            super(...args);
            if(Singleton._instance){
                throw Error("Duplicate instance")
            }

            Singleton._instance = this 
        }
    }
}

//PROPERTY DECORATOR
function auditable(target: object, key: string | symbol) {
    //get the initial value, before the decorator is applied
    let val = target[key];

    //then overwrite the property with a custom getter and setter
    Object.defineProperty(target, key, {
        get: () => val,
        set: (newVal) => {
            console.log(`${key.toString()} changed: `, newVal);
            val = newVal;
        },
        enumerable: true,
        configurable: true
    })
}


@freeze
@singleton
class ContactRepository{
    @auditable
    private contacts: Contact[] = [];

    @authorize("ContactViewer")
    getContactById(id: number): Contact | null {
        if (!currentUser.isInRole("ContactViewer")) {
            throw Error("User not authorized to execute this action");
        }

        const contact = this.contacts.find(x => x.id === id);
        return contact;
    }
    @authorize("ContactEditor")
    save(contact: Contact): void {
        if (!currentUser.isInRole("ContactEditor")) {
            throw Error("User not authorized to execute this action");
        }

        const existing = this.getContactById(contact.id);
        if (existing) {
            Object.assign(existing, contact);
        }else {
            this.contacts.push(contact);
        }
    }
}
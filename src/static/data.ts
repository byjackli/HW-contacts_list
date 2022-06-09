export type Contact = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    icon?: { art: string, title: string }
}

let db: Record<string, Contact> = {
    "001": {
        firstName: "Jack",
        lastName: "Li",
        phoneNumber: "3474764944",
        emailAddress: "Jack7598@gmail.com"
    },
    "002": {
        firstName: "Max",
        lastName: "Mayfield",
        phoneNumber: "2120042002",
        emailAddress: "maxMayfield@strangerThings.com",
        icon: { art: "star", title: "favorite contact" }
    },
    "003": {
        firstName: "Mike",
        lastName: "Wheeler",
        phoneNumber: "212-012-2002",
        emailAddress: "mike@strangerThings.com",
        icon: { art: "eco", title: "new contact" }
    },
    "004": {
        firstName: "VISA",
        lastName: "",
        phoneNumber: "18008472911",
        emailAddress: "contact@visa.com",
        icon: { art: "store", title: "verified business" }
    },
    "005": {
        firstName: "Placeholder",
        lastName: "Value",
        phoneNumber: "0000000000",
        emailAddress: "placeholder@value.com"
    },
    "006": {
        firstName: "Nancy",
        lastName: "Wheeler",
        phoneNumber: "2120011995",
        emailAddress: "nancyw@strangerThings.com",
        icon: { art: "emergency", title: "emergency contact" }
    },
    "007": {
        firstName: "Emergency",
        lastName: "",
        phoneNumber: "911",
        emailAddress: "911@us.gov",
        icon: { art: "emergency", title: "emergency contact" }
    }
}

export function del(id: string): void {
    if (!db[id]) throw new Error(`Delete failed, contact with id of ${id} does not exist!`)
    delete db[id]
}

export function add(): string {
    const newId = uuidV4()
    db[newId] = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailAddress: "",
        icon: { art: "eco", title: "new" }
    }

    return newId
}

export function edit(id: string, data: Contact): void {
    if (!db[id]) throw new Error(`Editing Failed, contact with id of ${id} does not exist!`)
    db[id] = data
}

// generate uuid (version 4)
function uuidV4(): string {
    let time = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        time += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let random = (time + Math.random() * 16) % 16 | 0;
        time = Math.floor(time / 16);
        return (c === 'x' ? random : ((random & 0x3) | 0x8)).toString(16);
    });
}

export default db
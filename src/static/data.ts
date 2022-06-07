const db: Record<string, {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    icon?: { art: string, title: string }
}> = {
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
        icon: { art: "star", title: "favorite" }
    },
    "003": {
        firstName: "Mike",
        lastName: "Wheeler",
        phoneNumber: "212-012-2002",
        emailAddress: "mike@strangerThings.com",
        icon: { art: "eco", title: "new" }
    },
    "004": {
        firstName: "VISA",
        lastName: "",
        phoneNumber: "18008472911",
        emailAddress: "contact@visa.com",
        icon: { art: "store", title: "new" }
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
        icon: { art: "emergency", title: "emergency" }
    },
    "007": {
        firstName: "Emergency",
        lastName: "",
        phoneNumber: "911",
        emailAddress: "911@us.gov",
        icon: { art: "emergency", title: "emergency" }
    }
}

export default db
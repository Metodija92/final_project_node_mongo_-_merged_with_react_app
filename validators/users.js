const createUser =  {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password: "required|string|minLength:4",
    birthday: "required|date",
    telephone: "required|string",
    country: "required|string",
}

const updateUser = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    birthday: "required|date",
    telephone: "required|string",
    country: "required|string",
}

module.exports = {
    createUser,
    updateUser
}
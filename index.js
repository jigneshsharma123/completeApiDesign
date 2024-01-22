import express from 'express';// taking the express framework inside the project
import env from 'dotenv'; // requiring the the dotenv file for the environment variable
env.config(); // configuring the env file 
import { db } from './config/db.js'; // requireing the db file for the connection with db.
const port  = process.env.PORT || 3000; // creating a port number 
const app = express(); // initiating the express app;
// this is a dummy data for testing the api
const mockUsers = [
    { id: 1, username: "js", displayName: "js" },
    { id: 2, username: "sandeep", displayName: "sandeep" },
    { id: 3, username: "ravi", displayName: "ravi" },
    { id: 4, username: "sanni", displayName: "sanni" },
    { id: 8, username: "js", displayName: "js" },
    { id: 7, username: "vipin", displayName: "vipin" },
    { id: 6, username: "tabrej", displayName: "tabrej" },
    { id: 5, username: "kumar", displayName: "kumar" },


]
// simple get request to print hello world on the home screen;
app.get("/", (req, res) => {
    res.status(200).end("hello world");
});
// making a api urer route so that we can see all the users.
app.get("/api/users/", (req, res) => {
    const { filter, value } = req.query;
    // Validate the filter parameter if needed

    const filteredUsers = filter && value
        ? mockUsers.filter((user) => user[filter]?.includes(value))
        : mockUsers;

    res.send(filteredUsers);
});
// taking out the single user based on the user id 
app.get('/api/users/:id', (req, res) => {
    const parsedId = parseInt(req.params.id);

    if (isNaN(parsedId)) {
        return res.status(400).send({ error: "Bad request. Invalid ID." });
    }

    try {
        const findUser = mockUsers.find((user) => user.id === parsedId);

        if (!findUser) {
            return res.status(404).send({ error: "User ID not found" });
        }

        return res.send(findUser);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
});
// api for fetching the prodcut of the ecomerce project
app.get('/api/products', (req, res) => {
    res.send([{ id: 123, name: 'kurta', price: '342' },])
});





// enabling the app to listen the port number so that we can communication over the http;
app.listen(port, (err ) => {
    if (err) {
        console.log("error in running the server:", err);
    }
    console.log("server is running on the port:", port);
}); 
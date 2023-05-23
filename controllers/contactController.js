const asynchHandler = require("express-async-handler");

const Contact = require("../models/contactModel");


const getContacts = asynchHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});


const createContact = asynchHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are empty!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(200).json(contact);
});


const getContact = asynchHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
}); 


const updateContact = asynchHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});


const deleteContact = asynchHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
    }
    
    await Contact.remove();

    res.status(200).json(contact);
});


module.exports = { 
    getContacts, createContact, getContact, updateContact, deleteContact
}; 
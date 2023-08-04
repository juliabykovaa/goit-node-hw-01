import contactService from "./db/contacts.js";
import { program } from "commander";
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.log("all contacts", allContacts);

    case "get":
      const oneContact = await contactService.getContactById(id);
      return console.log("one contact", oneContact);

    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log("add contact", newContact);

    case "remove":
      const removedContact = await contactService.removeContact(id);
      return console.log("remove contact", removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);


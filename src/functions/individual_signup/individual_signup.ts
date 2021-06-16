import { getDatabaseIDs } from "../utils";

const { Client } = require('@notionhq/client');
import SendgridEmailService from "../../mail/SendgridEmailService";
import { ISignupEmailService } from "../../mail/ISignupEmailService";

type FormResponseType = {
    formTitle: string;
    name: string;
    email: string;
    heardAbout: string;
}

type EventType = {
    body: FormResponseType;
}

export default async (event: EventType): Promise<any> => {
    const { PEOPLE_DB_ID } = getDatabaseIDs(event.body)

    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    const { name, email } = event.body;

    // Check if the user is already in the database
    const peopleQuery = await notion.databases.query({
        database_id: PEOPLE_DB_ID,
        filter: {
            property: 'Email',
            text: {
                equals: email,
            },
        }
    });

    // If the person already exists in the db, do nothing
    if (peopleQuery.length > 0) {
        return;
    }

    // Create a new person page with given name and email
    const newPerson = await notion.pages.create({
        parent: {
          database_id: '',
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          Email: {
            text: [
              {
                text: {
                  content: email,
                },
              },
            ],
          }
        }
    });

    
    // Get the person notion page url
    const newPersonPageID = newPerson.id;

    // Send them mail chimp email with given params
    // sendIndividualConfirmation(name, email, notionPersonalPageURL)

}

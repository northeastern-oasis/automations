type FormResponseType = {
    name: string;
    email: string;
    heardAbout: string;
}

type EventType = {
    body: FormResponseType;
}

const PEOPLE_DB_ID = 'a58fd4c21e2b49a1958e4cdc003fdea8';

export default async (event: EventType): Promise<any> => {
    const { Client } = require('@notionhq/client');
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    const { name, email, heardAbout } = event.body;

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

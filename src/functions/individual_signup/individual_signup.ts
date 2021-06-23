import { getDatabaseIDs } from "../utils";
import { Client } from '@notionhq/client';
import OasisSendgridEmailService from "../../mail/OasisSendgridEmailService";
import { ISignupEmailService } from "../../mail/ISignupEmailService";
import { validateEnvironment } from "../utils";

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

    validateEnvironment();

    //
    // // Check if the user is already in the database
    // const peopleQuery = await notion.databases.query({
    //     database_id: PEOPLE_DB_ID,
    //     filter: {
    //         property: 'Email',
    //         text: {
    //             equals: email,
    //         },
    //     }
    // });
    //
    // // If the person already exists in the db, do nothing
    // if (peopleQuery.length > 0) {
    //     return;
    // }
    //
    // // Create a new person page with given name and email
    // const newPerson = await notion.pages.create({
    //     parent: {
    //       database_id: '',
    //     },
    //     properties: {
    //       Name: {
    //         title: [
    //           {
    //             text: {
    //               content: name,
    //             },
    //           },
    //         ],
    //       },
    //       Email: {
    //         text: [
    //           {
    //             text: {
    //               content: email,
    //             },
    //           },
    //         ],
    //       }
    //     }
    // });


    // TODO: Add team info to payload
    // Create project with the name projectName

    const peopleQuery = await notion.databases.query({
        database_id: PEOPLE_DB_ID,
        filter: {
            property: 'Email',
            text: {
                equals: email,
            },
        }
    });

    let person;
    if (peopleQuery.results.length > 0) {
        person = peopleQuery.results[0];
    }
    else {
        // Create a new person page with given name and email
        // @ts-ignore
        person = await notion.pages.create({
            parent: {
                database_id: PEOPLE_DB_ID,
            },
            properties: {
                Name: {
                    type: 'title',
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                Email: {
                    type: 'email',
                    email: email
                },
            }
        })
    }


    // @ts-ignore
    const mailService: ISignupEmailService = new OasisSendgridEmailService(
        // @ts-ignore
        process.env.SENDGRID_API_KEY,
        process.env.BASE_TEMPLATE_ID,
        process.env.SLACK_JOIN_LINK,
        process.env.OASIS_COHORT_SITE_LINK,
        process.env.OASIS_COHORT_PEOPLE_LINK,
    );
    await mailService.sendIndividualConfirmationEmail(
        name,
        email,
    )

}

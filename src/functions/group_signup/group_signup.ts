import { Client } from '@notionhq/client';

type TeamMember = {
    name: string;
    email: string;
}

type FormResponseType = {
    name: string;
    email: string;
    heardAbout: string;
    projectName: string;
    teamMembers: TeamMember[];
}

type EventType = {
    body: FormResponseType;
}

const PEOPLE_DB_ID = 'a58fd4c21e2b49a1958e4cdc003fdea8';
const PROJECT_DB_ID = 'ac431d060979450193eca35ac0e4871d';


const updateOrCreatePerson = (name, email) => {

};

export default async (event: EventType): Promise<any> => {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    // TODO: Add team info to payload
    const { name, email, projectName, teamMembers } = event.body;

    // Create project with the name projectName
    let project = await notion.pages.create({
        parent: {
            database_id: PROJECT_DB_ID,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: projectName,
                        },
                ],
            },
        }
    });


    // Create the full team
    const fullTeam: TeamMember[] = [{name, email}, ...teamMembers];

    // For each person, including the team creator
    Promise.all(fullTeam.map(async ({ name, email }) => {
        // Check if the user already exists so we don't accidentally make a duplicate entry
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
            person = await notion.pages.create({
                parent: {
                    database_id: PEOPLE_DB_ID,
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
                    },
                    Project: {
                        relation: [
                            {
                              id: project.id
                            }
                          ]
                    }
                }
            }))
        });
    }
    

    // Get or create person pages with given names and emails for each teamMember in teamMembers

    // Get the notion page url for the project

    // Share the notion page with all of the team members

    // Send submitter mail chimp email with given params
    // sendProjectCreatorConfirmation(name, email, notionProjectPageURL, notionPersonalPageURL)

    // Send team members mail chimp email with given params
    // sendTeamMemberConfirmation(name, email, notionProjectPageURL, notionPersonalPageURL)
    //  * "You've been added to this team"
    //  * "Here's your page, here's the team page"

    // Check if the user is already in the database
    // const peopleQuery = await notion.databases.query({
    //     database_id: PEOPLE_DB_ID,
    //     filter: {
    //         property: 'Email',
    //         text: {
    //             equals: email,
    //         },
    //     }
    // });

    // TODO: Filter semesters db by checkbox.

   

    // Get the person notion page url
    const newPersonPageID = newPerson.id;


    // upon filling out team signup form:
    // does the project page exist?
    //   if so, let project = the existing project page id
    //   if not, let project = newly created project page id
    // for each person (including person who filled out form)
    //   updateOrCreatePerson:
    //     does this person exist?
    //       update their page with project_id = project
    //     does this person not exist?
    //       create a new page with project_id = project
}

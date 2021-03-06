import { Client } from '@notionhq/client';
import { getDatabaseIDs } from '../utils';
import OasisSendgridEmailService from "../../mail/OasisSendgridEmailService";
import { validateEnvironment } from "../utils";

type TeamMember = {
    name: string;
    email: string;
}

type FormResponseType = {
    formTitle: string;
    name: string;
    email: string;
    projectName: string;
    teamMembers: TeamMember[];
}

type EventType = {
    body: FormResponseType;
}

const MOCK_DATA: EventType = {
    body: {
        formTitle: 'Test form',
        name: 'Sam Xifaras',
        email: 'xifaras.s@northeastern.edu',
        projectName: 'Project 1',
        teamMembers: [
            {
                name: 'Will Stenzel',
                email: 'stenzel.w@northeastern.edu',
            }
        ],
    }
};


const updateOrCreatePerson = (name: string, email: string) => {

};

const handler = async (event: EventType): Promise<any> => {
    const { PEOPLE_DB_ID, PROJECT_DB_ID } = getDatabaseIDs(event.body);
    validateEnvironment();
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    // TODO: Add team info to payload
    const { name, email, projectName, teamMembers } = event.body;

    // Create project with the name projectName
    // @ts-ignore
    let project = await notion.pages.create({
        parent: {
            database_id: PROJECT_DB_ID,
        },
        properties: {
            Name: {
                type: 'title',
                title: [
                    {
                        type: 'text',
                        text: {
                            content: projectName,
                        },
                    }
                ],
            },
        }
    });

    // Create the full team
    const fullTeam: TeamMember[] = [{name, email}, ...teamMembers];

    // For each person, including the team creator
    await Promise.all(fullTeam.map(async ({ name, email }) => {
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

        notion.pages.update({
            page_id: person.id,
            properties: {
                Project: {
                    // @ts-ignore
                    type: 'relation',
                    relation: [
                        {
                            id: project.id,
                        }
                    ]
                }
            }
        })

        return person;
    }));

    const mailService = new OasisSendgridEmailService(
        // @ts-ignore
        process.env.SENDGRID_API_KEY,
        process.env.BASE_TEMPLATE_ID,
        process.env.SLACK_JOIN_LINK,
        process.env.OASIS_COHORT_SITE_LINK,
        process.env.OASIS_COHORT_PEOPLE_LINK,
    );
    await mailService.sendProjectCreatorConfirmation(
        name,
        email,
    )
    for (let teamMember of teamMembers) {
        await mailService.sendTeamMemberConfirmation(
            teamMember.name,
            teamMember.email,
            name,
        )
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
    // const newPersonPageID = newPerson.id;


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

handler(MOCK_DATA);

export default handler;

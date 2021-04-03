

type TeamMember = {
    name: string;
    email: string;
}

type ResponseType = {
    name: string;
    email: string;
    heardAbout: string;
    projectName: string;
    teamMembers: TeamMember[];
}

export default async (event: any = {}): Promise<any> => {
    const response = JSON.stringify(event, null, 2);

    // TODO: Add team info to payload
    const { name, email, heardAbout, projectName, teamMembers } = event.data as ResponseType;

    // let project = get or create project with the name projectName

    // Check that the user does not already exist, if they already exist, call replaceTeamMembers(teamMembers, project)

    // Get or create person pages with given names and emails for each teamMember in teamMembers

    // Get the notion page url for the project

    // Share the notion page with all of the team members

    // Send submitter mail chimp email with given params
    // sendProjectCreatorConfirmation(name, email, notionProjectPageURL, notionPersonalPageURL)

    // Send team members mail chimp email with given params
    // sendTeamMemberConfirmation(name, email, notionProjectPageURL, notionPersonalPageURL)
    //  * "You've been added to this team"
    //  * "Here's your page, here's the team page"

    return response;
}

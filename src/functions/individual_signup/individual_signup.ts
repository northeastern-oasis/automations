type FormResponseType = {
    name: string;
    email: string;
    heardAbout: string;
}

type EventType = {
    body: FormResponseType;
}

export default async (event: EventType): Promise<any> => {
    const response = JSON.stringify(event, null, 2);
    console.log(event);

    const { name, email, heardAbout } = event.body;

    // Check that the user does not already exist, if they already exist, do nothing

    // Create a new person page with given name and email

    // Get the person notion page url

    // Share the notion page with the given person

    // Send them mail chimp email with given params
    // sendIndividualConfirmation(name, email, notionPersonalPageURL)
    
    return response;
}

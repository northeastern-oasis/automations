
type ResponseType = {
    name: string;
    email: string;
    heardAbout: string;
}

export const handler = async (event: any = {}): Promise<any> => {
    const response = JSON.stringify(event, null, 2);

    const { name, email, heardAbout } = event.data as ResponseType;
    
    // Check that the user does not already exist, if they already exist, do nothing

    // Create a new person page with given name and email

    // Get the notion page url

    // Share the notion page with the given person

    // Send them mail chimp email with given params
    // sendEmail(name, email, notionPageURL)
    
    return response;
}

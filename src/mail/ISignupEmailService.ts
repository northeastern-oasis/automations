export interface ISignupEmailService {
    /**
     * Sends a confirmation email addressed to an individual signup
     * @param name The name of the individual who signed up
     * @param email The email of the individual
     * @param notionPersonalPageURL The URL of the newly created personal page on Notion
     */
    sendIndividualConfirmationEmail(
        name: string,
        email: string,
        notionPersonalPageURL: string
    ): Promise<boolean>;

    /**
     * Sends a confirmation email addressed to a project creator
     * @param name The name of the project creator
     * @param email The email of the project creator
     * @param notionProjectPageURL The URL of the newly created project page on Notion
     * @param notionPersonalPageURL The URL of the newly created personal page on Notion
     */
    sendProjectCreatorConfirmation(
        name: string,
        email: string,
        notionProjectPageURL: string,
        notionPersonalPageURL: string
    ): Promise<boolean>;

    /**
     * Sends a confirmation email addressed to a project team member
     * @param name The name of the team member
     * @param email The email of the team member
     * @param notionProjectPageURL The URL of the newly created project page on Notion
     * @param notionPersonalPageURL The URL of the newly created personal page on Notion
     */
    sendTeamMemberConfirmation(
        name: string,
        email: string,
        notionProjectPageURL: string,
        notionPersonalPageURL: string
    ): Promise<boolean>;
}
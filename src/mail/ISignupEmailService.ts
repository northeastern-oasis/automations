export interface ISignupEmailService {
    /**
     * Sends a confirmation email addressed to an individual signup
     * @param name The name of the individual who signed up
     * @param email The email of the individual
     */
    sendIndividualConfirmationEmail(
        name: string,
        email: string,
    ): Promise<boolean>;

    /**
     * Sends a confirmation email addressed to a project creator
     * @param name The name of the project creator
     * @param email The email of the project creator
     */
    sendProjectCreatorConfirmation(
        name: string,
        email: string,
    ): Promise<boolean>;

    /**
     * Sends a confirmation email addressed to a project team member
     * @param name The name of the team member
     * @param email The email of the team member
     */
    sendTeamMemberConfirmation(
        name: string,
        email: string,
        teamCreatorName: string,
    ): Promise<boolean>;
}
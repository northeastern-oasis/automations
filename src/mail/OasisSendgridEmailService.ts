import sgMail from '@sendgrid/mail';
import { ISignupEmailService } from 'src/mail/ISignupEmailService';

class OasisSendgridEmailService implements ISignupEmailService {
    private readonly baseTemplateId: string;
    private readonly slackJoinLink: string;
    private readonly cohortSiteLink: string;
    private readonly cohortPeopleLink: string;

    constructor(
        apiKey: string,
        baseTemplateId: string,
        slackJoinLink: string,
        cohortSiteLink: string,
        cohortPeopleLink: string,
    ) {
        sgMail.setApiKey(apiKey);
        this.baseTemplateId = baseTemplateId;
        this.slackJoinLink = slackJoinLink;
        this.cohortSiteLink = cohortSiteLink;
        this.cohortPeopleLink = cohortPeopleLink;
    }

    /**
     * Sends an email with the given template name
     * @param templateName
     * @param toEmail
     * @param content An object containing the content of the email
     */
    private async _sendEmail(subject: string, bodyHTML: string, toEmail: string): Promise<boolean> { //templateName: string, toEmail: string, content: object): boolean {
        const msg = {
            to: toEmail, // Change to your recipient
            from: 'info@oasisneu.com', // Change to your verified sender
            //subject: subject,
            //text: 'Plaintext', // TODO: Strip HTML tags from bodyHTML to generate plaintext
            html: '<html><body>Placeholder</body></html>',
            template_id: this.baseTemplateId,
            dynamic_template_data: {
                body: bodyHTML,
            }
        }
        try {
            const response = await sgMail.send(msg)
            return true;
        } catch (e) {
            console.dir(e.response.body.errors);
            return false;
        }
    }

    async sendIndividualConfirmationEmail(name: string, email: string): Promise<boolean> {
        return await this._sendEmail(
            'Welcome to Oasis!',
            `
            <p>Hi ${name}!</p>
            <p>
                Thank you for signing up for Oasis! Your spot has been locked in.
                See the people in Oasis <a href='${this.cohortPeopleLink}'>here</a>!
            </p>
            <p>
                Make sure to join our slack with 
                <a href='${this.slackJoinLink}'>
                this link
                </a> 
                so you can stay up to date! If you have any questions, 
                feel free to respond to this email and let us know.
            </p>
            <p>
            Best,<br/>
            Oasis Team
            </p>
            `,
            email,
        );
    }

    async sendProjectCreatorConfirmation(name: string, email: string): Promise<boolean> {
        return await this._sendEmail(
            'Welcome to Oasis!',
            `
            <p>Hi ${name}!</p>
            <p>
                Thanks for signing up for Oasis as a team! Shortly we will be creating a project page for you where 
                you can share the project idea on our <a href='${this.cohortSiteLink}'>Cohort site</a>. 
                We’ve also locked in the spots for you and your teammates.
            </p>
            <p>
                Make sure to join our slack with 
                <a href='${this.slackJoinLink}'>
                this link
                </a> 
                so you can stay up to date! If you have any questions, 
                feel free to respond to this email and let us know.
            </p>
            <p>
            Best,<br/>
            Oasis Team
            </p>
            `,
            email,
        );
    }

    async sendTeamMemberConfirmation(
        name: string,
        email: string,
        teamCreatorName: string,
    ): Promise<boolean> {
        return await this._sendEmail(
            'Welcome to Oasis!',
            `
            <p>Hi ${name}!</p>
            <p>
                We wanted to let you know that ${teamCreatorName} signed up for Oasis and added you to their team. 
                Your spot has been reserved. If you think this was a mistake and do not want to be a part of Oasis, 
                please respond to this email and let us know.
            </p>
            <p>
                Make sure to join our slack with 
                <a href='${this.slackJoinLink}'>
                this link
                </a> 
                so you can stay up to date!
            </p>
            <p>
            Best,<br/>
            Oasis Team
            </p>
            `,
            email,
        );
    }
}

export default OasisSendgridEmailService;

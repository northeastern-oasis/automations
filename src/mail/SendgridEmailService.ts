import sgMail from '@sendgrid/mail';
import { ISignupEmailService } from 'src/mail/ISignupEmailService';

class SendgridEmailService implements ISignupEmailService {
    constructor(
        apiKey: string,
    ) {
        sgMail.setApiKey(apiKey);
    }

    /**
     * Sends an email with the given template name
     * @param templateName
     * @param toEmail
     * @param content An object containing the content of the email
     */
    private async _sendEmail() { //templateName: string, toEmail: string, content: object): boolean {
        const msg = {
            to: 'xifaras.s@northeastern.edu', // Change to your recipient
            from: 'info@oasisneu.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'Plaintext',
            html: '',
            templateId: 'd-c8569e9ec3d14cf9a640515d2fedc11b',
            dynamic_template_data: {
                body: `
                <div>
                    <p>
                        
                    </p>
                </div>                
                `
            }
        }
        const response = await sgMail.send(msg)
        console.log('email sent!');
    }

    async sendIndividualConfirmationEmail(name: string, email: string, notionPersonalPageURL: string): Promise<boolean> {
        await this._sendEmail();
        return false;
    }

    async sendProjectCreatorConfirmation(name: string, email: string, notionProjectPageURL: string, notionPersonalPageURL: string): Promise<boolean> {
        return false;
    }

    async sendTeamMemberConfirmation(name: string, email: string, notionProjectPageURL: string, notionPersonalPageURL: string): Promise<boolean> {
        return false;
    }

}

export default SendgridEmailService;
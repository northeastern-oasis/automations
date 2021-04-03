import { ISignupEmailService } from 'src/mail/ISignupEmailService';

class MailchimpSignupEmailService implements ISignupEmailService {
    sendIndividualConfirmationEmail(name: string, email: string, notionPersonalPageURL: string): boolean {
        return false;
    }

    sendProjectCreatorConfirmation(name: string, email: string, notionProjectPageURL: string, notionPersonalPageURL: string): boolean {
        return false;
    }

    sendTeamMemberConfirmation(name: string, email: string, notionProjectPageURL: string, notionPersonalPageURL: string): boolean {
        return false;
    }

}

export default MailchimpSignupEmailService;
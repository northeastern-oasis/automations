
type FormBody = {
    formTitle: string;
}

const PROD_PROJECT_DB_ID = '6a2f4b9cb2114c21b6594f5d1535d033';
const PROD_PEOPLE_DB_ID = '416e10a026984ffc8b447d478f851b19';

const DEMO_PROJECT_DB_ID = 'ac431d060979450193eca35ac0e4871d';
const DEMO_PEOPLE_DB_ID = 'a58fd4c21e2b49a1958e4cdc003fdea8';

export const getDatabaseIDs = (body: FormBody) => {
    if (body.formTitle.includes("Demo")) {
        return { PROJECT_DB_ID: DEMO_PROJECT_DB_ID, PEOPLE_DB_ID: DEMO_PEOPLE_DB_ID }
    } else {
        return { PROJECT_DB_ID: PROD_PROJECT_DB_ID, PEOPLE_DB_ID: PROD_PEOPLE_DB_ID }
    }
}

/**
 * Throws an exception if required environment variables are missing
 */
export function validateEnvironment(): void {
    if (!process.env.NOTION_API_KEY) {
        throw new Error('Environment variable NOTION_API_KEY must be defined')
    }
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('Environment variable SENDGRID_API_KEY must be defined')
    }
    if (!process.env.BASE_TEMPLATE_ID) {
        throw new Error('Environment variable BASE_TEMPLATE_ID must be defined')
    }
    if (!process.env.SLACK_JOIN_LINK) {
        throw new Error('Environment variable SLACK_JOIN_LINK must be defined')
    }
    if (!process.env.OASIS_COHORT_SITE_LINK) {
        throw new Error('Environment variable OASIS_COHORT_SITE_LINK must be defined')
    }
    if (!process.env.OASIS_COHORT_PEOPLE_LINK) {
        throw new Error('Environment variable OASIS_COHORT_PEOPLE_LINK must be defined')
    }
}

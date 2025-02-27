export interface SignupFormData {
    accountType: AccountType;

    name?: string;
    email?: string;
    proficiency?: string;
    country?: string;
    age?: string;
    experience?: string;
    // Company fields
    companyName?: string;
    industry?: string;
    businessType?: string;
    companySize?: string;
    // Common fields
    password: string;
    confirmPassword: string;
}

export type AccountType = 'professional' | 'company';

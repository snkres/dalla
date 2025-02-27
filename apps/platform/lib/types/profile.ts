export interface ProfileFormData {
    avatar: string;
    fullName: string;
    displayName: string;
    title: string;
    companyName: string;
    location: string;
    website: string;
    bio: string;
    expertise: string[];
    languages: string[];
    timezone: string;
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}
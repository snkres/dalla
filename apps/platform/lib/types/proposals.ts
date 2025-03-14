export interface PerformanceCardProps { icon: React.ReactNode; label: string; value: React.ReactNode; badge?: React.ReactNode; subtext: string; }
export type ProposalStatus = 'In review' | 'Interviewing' | 'Submitted' | 'Viewed';

export interface OverviewProps {
    totalProposals: number;
    totalConversions: number;
    conversionRate: number;
    averageResponseTime: number;
    averageConversionTime: number;
}


export interface Proposal {
    id: number;
    date: string;
    timeAgo: string;
    hasBoosted: boolean;
    title: string;
    profile: string;
    amount: string;
    status: ProposalStatus;
    clientName: string;
    clientLocation: string;
    bidAmount: number;
    coverLetter: string;
    skills: string[];
    lastActivity: string;
    projectDuration: string;
    proposalViews: number;
    competingProposals: number;
    interviewRate: string | null;
    clientRating: number;
    clientSpend: string;
    clientHires: number;
    viewedByClient?: boolean;
}


export interface StatusBadgeProps { status: ProposalStatus }

export interface ProposalCardProps { proposal: Proposal; isSelected: boolean; onClick: () => void; }

export interface ExpandableSectionProps { title: string; icon: React.ReactNode; isExpanded: boolean; onToggle: () => void; children: React.ReactNode; }

export interface ClientSectionProps { proposal: Proposal; isExpanded: boolean; onToggle: () => void; }

export interface CoverLetterSectionProps { proposal: Proposal; isExpanded: boolean; onToggle: () => void; }

export interface SkillsSectionProps { proposal: Proposal; isExpanded: boolean; onToggle: () => void; }

export interface InsightsSectionProps { proposal: Proposal; isExpanded: boolean; onToggle: () => void; }


export interface ProposalDetailsProps { proposal: Proposal | null; isMobile: boolean; onClose: () => void; }

export interface ProposalListProps {
    proposals: Proposal[];
    selectedProposal: Proposal | null;
    onSelectProposal: (proposal: Proposal) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}


export interface TabContainerProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    activeProposals: Proposal[];
    submittedProposals: Proposal[];
    isMobile: boolean;
    isDetailOpen: boolean;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: 'date' | 'amount' | 'title';
    sortOrder: 'asc' | 'desc';
    onSort: (field: 'date' | 'amount' | 'title') => void;
    viewType: 'professional' | 'company';
}

export interface SearchFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortBy: 'date' | 'amount' | 'title';
    sortOrder: 'asc' | 'desc';
    onSort: (field: 'date' | 'amount' | 'title') => void;
}

export interface ProposalSample {
    id: string;
    consultant: {
        id: string;
        name: string;
        role: string;
        avatar: string;
        rating: number;
        location: string;
        experience: number;
        skills: string[];
        completedProjects: number;
    };
    matchScore: number;
    coverLetter: string;
    price: string;
    deliveryTime: string;
    proposalDate: string;
    status: string;
}
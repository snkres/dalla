export const en = {
  login: {
    title: 'Login',
    welcome: 'Welcome back',
    description: 'Sign in to your Dalla Solutions account',
    emailLabel: 'Email address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signInButton: 'Sign in',
    signingInButton: 'Signing in...',
    continueWith: 'Or continue with',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign up',
    termsAgreement: 'By signing in, you agree to our',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    errorTitle: 'Sign-In Error',
    errorGoogleAuthFailed: 'Google authentication failed. Please try again.',
    errorMissingCode: 'Missing authorization code from Google.',
    errorTokenExchangeFailed:
      'Failed to process Google authentication. Please try again.',
    errorInternal: 'An internal error occurred. Please try again later.',
    errorInvalidModeTitle: 'Invalid Mode',
    errorInvalidModeDescription:
      'Please select the correct mode of your account.',
    errorInvalidCredentialsTitle: 'Invalid credentials',
    errorInvalidCredentialsDescription:
      'Please check your email and password and try again.',
    validationEmailInvalid: 'Invalid email address',
    validationPasswordMinLength: 'Password must be at least 8 characters long',
  },
  signup: {
    title: 'Create your account',
    description: 'Join Dalla Solutions and start your journey',
    emailLabel: 'Email address',
    emailPlaceholder: 'Enter your email',
    nameLabel: 'Name',
    namePlaceholder: 'Enter your name',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Enter your username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter password',
    createAccountButton: 'Create account',
    creatingAccountButton: 'Creating account...',
    continueWith: 'Or continue with',
    alreadyHaveAccount: 'Already have an account?',
    signInLink: 'Sign in',
    termsAgreement: 'By creating an account, you agree to our',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    errorTitle: 'Error',
    errorUnknown: 'An unknown error occurred',
    validationNameMinLength: 'Name must be at least 2 characters long',
    validationEmailInvalid: 'Invalid email address',
    validationPasswordMinLength: 'Password must be at least 8 characters long',
    validationUsernameMinLength: 'Username must be at least 2 characters long',
  },
  verify: {
    title: 'Check your email',
    description: "We've sent a verification code to your email",
    label: 'Enter verification code',
    buttonBack: 'Back',
    buttonVerify: 'Verify email',
    // Error messages
    errorInvalidCodeTitle: 'Invalid code',
    errorInvalidCodeDescription: 'Please enter a 4-digit verification code',
    errorVerificationFailedTitle: 'Verification failed',
    errorVerificationFailedDescription: 'Please try again',
  },
  forgotPassword: {
    title: 'Reset your password',
    description:
      "Enter your email and we'll send you instructions to reset your password.",
    descriptionSuccess:
      "We've sent you an email with a link to reset your password.",
    emailLabel: 'Email address',
    emailPlaceholder: 'Enter your email address',
    buttonSend: 'Send reset link',
    buttonSending: 'Sending...',
    buttonTryDifferentEmail: 'Try different email',
    backToLogin: 'Back to login',
    successMessage: 'Password reset link has been sent to', // Email will be appended dynamically
    // Error messages
    errorEmailRequiredTitle: 'Email required',
    errorEmailRequiredDescription: 'Please enter your email address',
    errorRequestFailedTitle: 'Request failed',
    errorRequestFailedDescription:
      'Double check your email and mode then try again. If the issue persists, contact support.',
    // Success Toast
    successToastTitle: 'Password reset email sent',
    successToastDescription:
      'Please check your email for password reset instructions',
  },
  resetPassword: {
    title: 'Set new password',
    description: 'Create a new password for your account', // Email appended dynamically in code
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Enter new password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm new password',
    passwordHint: 'Password must be at least 8 characters long',
    buttonReset: 'Reset password',
    buttonResetting: 'Resetting password...',
    // Success state
    successTitle: 'Password Reset Complete',
    successDescription:
      "Your password has been reset successfully. You'll be redirected to the login page in a moment.",
    buttonGoToLogin: 'Go to login',
    // Error state (Invalid link)
    errorInvalidLinkTitle: 'Invalid Reset Link',
    errorInvalidLinkDescription:
      'Invalid reset link. Please request a new password reset.', // From state
    buttonRequestNewLink: 'Request new reset link',
    // Validation/API errors
    errorValidationPasswordLength:
      'Password must be at least 8 characters long',
    errorValidationPasswordMatchTitle: 'Passwords do not match',
    errorValidationPasswordMatchDescription:
      'Please make sure both passwords match',
    errorResetFailedTitle: 'Password reset failed',
    errorResetFailedDescription:
      'Unable to reset your password. Please try again or request a new reset link.',
    // Success Toast
    successToastTitle: 'Password reset successful',
    successToastDescription: 'Your password has been successfully reset.',
  },
  onboarding: {
    // General
    buttonSubmit: 'Submit',
    buttonProceed: 'Proceed',
    buttonSkip: 'Skip',
    buttonBack: 'Back',
    requiredField: 'Required',
    requiredFieldsNote: 'Fields marked with * are required',
    validationError: 'Please make sure all fields are filled.',

    // Completion Dialog
    completionDialog: {
      title: 'All Set and Ready!',
      description:
        'Your goals are locked in. Time to discover opportunities that match your aspirations.',
      button: 'View Opportunities',
    },

    // Company Step 1: Profile
    companyStep1: {
      title: 'Complete your profile',
      description: 'This information will help us personalize your experience',
      avatarLabel: 'Company Logo', // Assuming from AvatarUpload usage
      basicInfoLabel: 'Basic Information',
      headlinePlaceholder: 'Headline',
      industryPlaceholder: 'Industry',
      companySizePlaceholder: 'Company size',
      companyDetailsLabel: 'Company Details',
      phoneLabel: 'Phone Number', // Assuming from PhoneInput usage
      websitePlaceholder: 'Website',
      locationLabel: 'Location', // Assuming from LocationSelector usage
      locationCountryPlaceholder: 'Select country',
      locationCityPlaceholder: 'Select city',
      preferencesLabel: 'Preferences',
      targetIndustriesLabel: 'Target Industries',
      targetIndustriesLimit: 'Maximum 5 industries allowed {count}/5',
      bioLabel: 'Bio',
      bioPlaceholder: 'Tell us about the company...',
    },

    // Company Step 2: Focus Areas
    companyStep2: {
      title: 'Choose Your Focus Areas',
      description:
        'Select the key areas that align with your company goals and expertise',
      selectedCount: '{count} area{plural} selected {maximum}', // plural: 's' or '', maximum: '(maximum)' or '(maximum 3)'
      selectionPrompt: 'Select 1-3 focus areas to continue',
    },

    // Company Step 3: Goals
    companyStep3: {
      title: 'What are your Company Goals?',
      description: 'Select up to 3 Goals that align with your Company Goals',
      // Uses GoalCard, likely doesn't have unique text here beyond title/desc
    },

    // Professional Step 1: Profile & CV/LinkedIn Import
    proStep1: {
      title: 'Finalize Your Profile',
      description:
        "Whether you're a professional or a company, Dalla connects you to endless opportunities in consulting and collaboration.",
      avatarLabel: 'Profile Picture', // Assuming from AvatarUpload usage
      uploadCVLabel: 'Upload Your CV',
      uploadCVProcessing: 'Processing CV...',
      uploadCVSuccess: 'CV Uploaded Successfully',
      uploadCVHelpText: 'or drag and drop',
      uploadCVFormat: 'PDF (max. 2MB)',
      uploadCVExtracted: "Extracted details from {name}'s CV",
      importLinkedInLabel: 'Import from LinkedIn',
      importLinkedInProcessing: 'Processing LinkedIn PDF...',
      importLinkedInSuccess: 'LinkedIn Profile Imported',
      importLinkedInHelpText: 'Download and upload your LinkedIn profile',
      importLinkedInExtracted: "Imported details from {name}'s LinkedIn",
      headlineLabel: 'Headline',
      headlinePlaceholder: 'Headline',
      locationLabel: 'Location',
      locationCountryPlaceholder: 'Country',
      locationCityPlaceholder: 'City',
      genderLabel: 'Gender',
      genderPlaceholder: 'Select Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      bioLabel: 'Bio',
      bioPlaceholder: 'Tell us about yourself...',
      // LinkedIn Import Dialog
      linkedInDialog: {
        title: 'Import LinkedIn Profile',
        description: 'Follow these steps to import your LinkedIn profile data',
        downloadStepTitle: 'Download your profile from LinkedIn',
        downloadStep1: 'Go to your LinkedIn profile',
        downloadStep2: 'Click the "Resources" button below your profile header',
        downloadStep3: 'Select "Save to PDF"',
        downloadStep4: 'Save the PDF file to your computer',
        goToLinkedInButton: 'Go to LinkedIn',
        uploadStepTitle: 'Upload your LinkedIn PDF',
        uploadStepDescription:
          'Upload the PDF to automatically fill your profile information',
        uploadButton: 'Upload LinkedIn PDF',
        tipTitle: 'Tip:',
        tipDescription:
          'LinkedIn PDFs contain your complete professional history including education and experience details.',
        closeButton: 'Close',
      },
    },

    // Professional Step 2: Details
    proStep2: {
      title: 'Professional Details',
      skillsLabel: 'Skills',
      skillsError: 'Please add at least one skill',
      yearsExperienceLabel: 'Years of Experience',
      yearsExperiencePlaceholder: 'Years of Experience',
      yearsExperienceError: 'Please enter your years of experience',
      portfolioLabel: 'Portfolio',
      portfolioPlaceholder: 'Portfolio URL',
      phoneLabel: 'Phone Number',
      phoneErrorInvalid: 'Invalid phone number', // Example error, actual might vary
      phoneErrorRequired: 'Please enter your phone number',
    },

    // Professional Step 3: Experience
    proStep3: {
      title: 'Add Experience',
      description: 'Share your work history on your profile.',
      addExperienceButton: 'Add Experience',
      addAnotherExperienceButton: 'Add another Experience',
      experienceCardLocationSeparator: '•',
      editButton: 'Edit',
      // Experience Form (Shared Modal)
      experienceForm: {
        title: 'Add experience',
        description: "Share where you've worked on your profile.",
        jobTitleLabel: 'Job Title',
        jobTitlePlaceholder: 'What is your job title?',
        companyLabel: 'Company',
        companyPlaceholder: 'Search for company',
        locationLabel: 'Location',
        locationCountryPlaceholder: 'Select country',
        locationCityPlaceholder: "Select city or 'Remote'",
        employmentTypeLabel: 'Employment Type',
        employmentTypePlaceholder: 'Select employment type',
        employmentTypeFullTime: 'Full-time',
        employmentTypePartTime: 'Part-time',
        employmentTypeSelfEmployed: 'Self-employed',
        employmentTypeFreelance: 'Freelance',
        employmentTypeContract: 'Contract',
        employmentTypeInternship: 'Internship',
        employmentTypeApprenticeship: 'Apprenticeship',
        employmentTypeSeasonal: 'Seasonal',
        skillsLabel: 'Tools & Skills',
        skillsPlaceholder: 'Add tools or skills, separated by comma',
        responsibilitiesLabel: 'Responsibilities',
        responsibilitiesPlaceholder:
          "e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints.",
        achievementsLabel: 'Achievements',
        achievementsPlaceholder:
          'e.g. Increased customer satisfaction by 25% through implementing a new onboarding process.',
        currentlyWorkingLabel: "I'm currently still working here",
        startDateLabel: 'Start Date',
        endDateLabel: 'End Date',
        cancelButton: 'Cancel',
        addButton: 'Add experience',
        updateButton: 'Update experience',
        validationAlert: 'Please fill in all required fields',
      },
    },

    // Professional Step 4: Education
    proStep4: {
      title: 'Add Education',
      description:
        'Share your educational background to complete your profile.',
      addEducationButton: 'Add Education',
      addAnotherEducationButton: 'Add another Education',
      // Education Form (Shared Modal)
      educationForm: {
        title: 'Add education',
        description: 'Share your educational background on your profile.',
        schoolLabel: 'School',
        schoolPlaceholder: 'School name',
        degreeLabel: 'Degree',
        degreePlaceholder: 'Select degree type',
        degreeTypeBachelors: "Bachelor's",
        degreeTypeMasters: "Master's",
        degreeTypePhd: 'Ph.D.',
        degreeTypeAssociate: 'Associate',
        degreeTypeDiploma: 'Diploma',
        degreeTypeCertificate: 'Certificate',
        degreeTypeHighSchool: 'High School',
        degreeTypeOther: 'Other',
        fieldLabel: 'Field of Study',
        fieldPlaceholder: 'e.g. Computer Science, Business Administration',
        descriptionLabel: 'Description',
        descriptionPlaceholder:
          'e.g. Activities, societies, achievements, or relevant coursework',
        currentlyStudyingLabel: "I'm currently studying here",
        startDateLabel: 'Start Date',
        endDateLabel: 'End Date',
        cancelButton: 'Cancel',
        addButton: 'Add education',
        updateButton: 'Update education',
        validationAlert: 'Please fill in all required fields', // Duplicate, maybe make generic?
      },
    },
  },
  dashboard: {
    shared: {
      filters: 'Filters',
      clearFilters: 'Clear Filters',
      previous: 'Previous',
      next: 'Next',
      close: 'Close',
      skills: 'Skills',
      loading: 'Loading...', // Generic loading text
      showingResultsFor: 'Showing results for "{searchQuery}".',
      noResultsFound: 'No results found matching your criteria.',
      tryAdjustingFilters: 'Try adjusting your search or filters.',
      filtersApplied: 'Filters applied.',
      errorLoading: 'Error loading data. Please try again.',
    },
    companyHome: {
      // Filter options
      filterAllConsultants: 'All Consultants',
      filterAvailableNow: 'Available Now',
      filterTopRated: 'Top Rated',
      filterRecentlyActive: 'Recently Active',
      filterSavedProfiles: 'Saved Profiles',
      // Header
      findProfessionalsTitle: 'Find Professionals',
      findProfessionalsDescription:
        'Discover and connect with top talent for your projects',
      startProjectButton: 'Start a Project',
      searchInputPlaceholder: 'Search by skill, expertise, or location...',
      // Empty state
      noProfessionalsFound: 'No professionals found matching your criteria.',
      // Professional Card
      viewProfileButton: 'View Profile',
      connectButton: 'Connect',
      hireButton: 'Hire',
      // Professional Detail
      experienceTitle: 'Experience',
      educationTitle: 'Education',
      reviewsTitle: 'Reviews',
      aboutTitle: 'About',
      contactTitle: 'Contact',
      sendMessageButton: 'Send Message',
      viewFullProfileButton: 'View Full Profile',
    },
    professionalHome: {
      // Filter categories
      filterAllProjects: 'All Projects',
      filterRecommended: 'Recommended For You',
      filterRecentlyViewed: 'Recently Viewed',
      filterSavedProjects: 'Saved Projects',
      filterMyApplications: 'My Applications',
      // Header/Search
      searchProjectsTitle: 'Search Projects', // Assuming this text exists implicitly
      searchInputPlaceholder: 'Search by title, skill, or company...',
      // Sort options
      sortByLabel: 'Sort by:',
      sortNewest: 'Newest',
      sortBudgetHighLow: 'Budget: High to Low',
      sortBudgetLowHigh: 'Budget: Low to High',
      // Actions
      refreshResultsButton: 'Refresh Results',
      // Empty state
      noProjectsFound: 'No projects found.',
      noProjectsFoundDescription:
        'Try adjusting your search or filters, or check back later for new opportunities.',
      // Toasts
      alreadyAppliedToastTitle: 'Already Applied',
      alreadyAppliedToastDescription:
        "You've already submitted a proposal for this project.",
      proposalSuccessToastTitle: 'Proposal submitted successfully!',
      proposalSuccessToastDescription:
        'Your proposal has been sent to the client.',
      proposalErrorToastTitle: 'Error submitting proposal',
      proposalErrorToastDescription: 'Please try again later.',
      // Project Card
      applyNowButton: 'Apply Now',
      viewProjectButton: 'View Project',
      saveButton: 'Save',
      savedButton: 'Saved',
      // Project Detail
      projectDetailsTitle: 'Project Details',
      skillsRequiredTitle: 'Skills Required',
      budgetTitle: 'Budget',
      durationTitle: 'Duration',
      locationTitle: 'Location',
      aboutProjectTitle: 'About the Project',
      aboutCompanyTitle: 'About the Company',
      applyToProjectButton: 'Apply to this Project',
      // Proposal Form
      submitProposalTitle: 'Submit Proposal',
      coverLetterLabel: 'Cover Letter',
      proposedRateLabel: 'Proposed Rate/Budget',
      estimatedTimelineLabel: 'Estimated Timeline',
      attachFilesLabel: 'Attach Files (Optional)',
      submitApplicationButton: 'Submit Application',
      submittingButton: 'Submitting...',
      cancelButton: 'Cancel',
      backToDetailsButton: 'Back to Project Details',
      // Filter Panel
      budgetRangeLabel: 'Budget Range',
      projectDurationLabel: 'Project Duration',
      locationTypeLabel: 'Location Type',
      requiredSkillsLabel: 'Required Skills',
      applyFiltersButton: 'Apply Filters',
      resetFiltersButton: 'Reset Filters',
    },
    // Add keys for company child components
    companyComponents: {
      projectsOverview: {
        title: 'Projects Overview',
        badgeHired: 'Consultant Hired',
        badgeReceivedProposals: 'Received Proposals',
        badgeNoProposals: 'No Proposals Yet',
        badgeNotApproved: 'Not Approved Yet',
        postedDatePrefix: 'Posted:',
        proposalsCountBadge: '{count} Proposals',
        viewProposalsButton: 'View Proposals',
      },
      professionalCard: {
        availabilityNA: 'N/A',
        hourlyRateSuffix: '/hr',
        yearsExperienceSuffix: 'years exp.',
        matchSuffix: '% match',
        hireButton: 'Hire Professional',
      },
      // Add placeholders for other components if needed
      professionalDetail: {
        modalTitle: 'Professional Profile',
        yearsExperienceSuffix: 'yrs',
        showLessSkillsButton: 'Show less',
        matchScorePrefix: 'Match score:',
        matchScoreSuffix: '%',
        matchScoreRequirementText: 'for your project requirements',
        aboutTitle: 'About',
        workHistoryTitle: 'Work History',
        endDatePresent: 'Present',
        noWorkHistory: 'No work history available',
        portfolioTitle: 'Portfolio & Projects',
        viewAllButton: 'View all',
        hireButton: 'Hire',
        sendMessageButton: 'Send Message',
        saveProfileButton: 'Save Profile',
      },
      addProject: {
        modalTitle: 'Start a Project',
        requiredFieldsInfo:
          'Fill in the project details below. Fields marked with * are required.',
        projectTitleLabel: 'Project Title*',
        projectTitlePlaceholder: 'Enter project title',
        jobTitleLabel: 'Job Title',
        jobTitlePlaceholder: 'e.g. Frontend Developer',
        descriptionLabel: 'Project Description*',
        descriptionPlaceholder: 'Describe the project in detail',
        scopeLabel: 'Project Scope (Optional)',
        scopePlaceholder: 'Outline the scope of the project',
        deliverablesLabel: 'Deliverables (Optional)',
        deliverablesPlaceholder: 'List the expected deliverables',
        skillsLabel: 'Required Skills*',
        budgetLabel: 'Budget (SAR)*',
        budgetPlaceholder: 'Enter budget amount',
        timelineLabel: 'Estimated Timeline*',
        timelineUnitDays: 'Days',
        timelineUnitWeeks: 'Weeks',
        timelineUnitMonths: 'Months',
        mediaLabel: 'Project Media (Optional)',
        mediaHelpText:
          'Upload images or documents relevant to the project (max 5 files)',
        cancelButton: 'Cancel',
        createButton: 'Create Project',
        creatingButton: 'Creating Project...',
        // Toasts
        toastMissingFieldTitle: 'Missing required field',
        toastMissingFieldDescription: 'Please fill in the {field} field.',
        toastSkillsRequiredTitle: 'Skills required',
        toastSkillsRequiredDescription:
          'Please add at least one skill for the project.',
        toastSuccessTitle: 'Project created successfully',
        toastSuccessDescription: 'Your new project has been created.',
        toastErrorTitle: 'Error creating project',
        toastErrorDescription:
          'There was an error creating your project. Please try again.',
      },
      activeProjectView: {
        projectIdPrefix: 'Project ID:',
        dashboardButton: 'Project Dashboard',
        timelineTitle: 'Timeline',
        durationLabel: 'Duration',
        budgetTitle: 'Budget',
        totalLabel: 'Total',
        spentLabel: 'Spent',
        inEscrowBadge: '(In Escrow)',
        assignedConsultantTitle: 'Assigned Consultant',
        viewProfileButton: 'View Profile',
        messageButton: 'Message',
      },
      projectProposalsView: {
        // This component seems to be a switcher, keys likely in children
      },
      proposalsOverview: {
        modalTitle: 'Proposals for {projectTitle}',
        proposalsCountBadge: '{count} Proposals',
        forProjectText: 'for {projectTitle}',
        sortByPrefix: 'Sort by:',
        sortBestMatch: 'Best Match',
        sortNewest: 'Newest',
        sortLowestPrice: 'Lowest Price',
        sortNewestFirst: 'Newest First',
        matchBadgeSuffix: '% Match',
        fallbackHeadline: 'Consultant',
        fallbackLocation: 'Remote',
      },
      proposalDetails: {
        modalTitle: 'Proposal Details',
        matchSuffix: '% Match',
        textNA: 'N/A',
        yearsExperienceSuffix: 'yrs',
        coverLetterTitle: 'Cover Letter',
        noCoverLetter: 'No cover letter provided.',
        timelineTitle: 'Proposed Timeline',
        rateTitle: 'Proposed Rate',
        attachmentsTitle: 'Attachments',
        downloadAttachmentButton: 'Download Attachment',
        noAttachments: 'No attachments provided.',
        actionsTitle: 'Actions',
        hireButton: 'Hire Professional',
        messageButton: 'Message Professional',
        declineButton: 'Decline Proposal',
        viewProfileButton: 'View Profile',
        // Hire Dialog
        hireDialogTitle: 'Confirm Hire',
        hireDialogDescription:
          'Are you sure you want to hire this professional for {price}?',
        cancelButton: 'Cancel',
        confirmHireButton: 'Confirm Hire',
        hiringButton: 'Hiring...',
        // Decline Dialog
        declineDialogTitle: 'Confirm Decline',
        declineDialogDescription:
          'Are you sure you want to decline this proposal? This action cannot be undone.',
        confirmDeclineButton: 'Confirm Decline',
        decliningButton: 'Declining...',
        // View Profile section
        viewProfileButtonDescription:
          "See this consultant's complete work history, portfolio, and reviews.",
        // Toasts
        toastHireSuccessTitle: 'Proposal accepted',
        toastHireSuccessDescription:
          'You have successfully hired this professional.',
        toastHireErrorTitle: 'Error accepting proposal',
        toastDeclineSuccessTitle: 'Proposal declined',
        toastDeclineSuccessDescription: 'You have declined this proposal.',
        toastDeclineErrorTitle: 'Error declining proposal',
        toastGenericErrorDescription: 'An unknown error occurred',
        statusTitle: 'Status',
        statusRejected: 'Rejected',
        statusAccepted: 'Accepted',
        statusPending: 'Pending Review',
      },
      emptyProjectView: {
        title: 'No active projects',
        description:
          "You don't have any active projects yet. Start by posting a job or hiring a consultant to kick-off your first project.",
        postJobCardTitle: 'Post a Job',
        postJobCardDescription:
          'Create a job listing to find the perfect consultant for your project needs.',
        postJobCardButton: 'Start a Project',
        hireCardTitle: 'Hire Professionals',
        hireCardDescription:
          'Browse our talent pool and hire professionals directly for your projects.',
        hireCardButton: 'Find Professionals',
      },
      projectCard: {
        progressLabel: 'Progress',
        progressSuffix: '%',
        teamSuffix: 'consultants',
      },
      projectDetail: {
        postedDate: 'Posted {postedDate}',
        projectTypeLabel: 'Project Type',
        fixedPriceBadge: 'Fixed-Price',
        customProfileInfoStart: 'Create a',
        customProfileInfoLink: 'custom profile',
        customProfileInfoEnd:
          'to highlight your expertise for this type of work.',
        budgetLabel: 'Budget',
        experienceLevelLabel: 'Experience Level',
        experienceLevelValue: 'Intermediate',
        experienceLevelDescription: 'Mix of experience and value',
        durationLabel: 'Project Duration',
        attachmentsTitle: 'Attachments ({count})',
        skillsTitle: 'Skills and Expertise',
        skillCategoryFrontendLang: 'Front-End Development Languages',
        skillCategoryFrontendDeliverables: 'Front-End Development Deliverables',
        skillCategoryOther: 'Other',
        skillCategoryRequired: 'Required Skills',
        aboutClientTitle: 'About the client',
        paymentVerified: 'Payment method verified',
        paymentNotVerified: 'Payment method not verified',
        clientStatHireRate: 'Hire rate:',
        clientStatOpenJobs: 'Open jobs:',
        clientStatMemberSince: 'Member since:',
        activityTitle: 'Activity on this job',
        activityProposals: 'Proposals:',
        activityProposalsValue: 'Less than 5',
        activityLastViewed: 'Last viewed by client:',
        activityLastViewedValue: '{time} ago',
        activityInterviewing: 'Interviewing:',
        activityInvitesSent: 'Invites sent:',
        activityUnansweredInvites: 'Unanswered invites:',
        applyButton: 'Apply Now',
        saveButton: 'Save Job',
        flagLink: 'Flag as inappropriate',
      },
      sidebar: {
        activeProjects: 'Active Projects',
        hiredProfessionals: 'Hired Professionals',
        viewProfileButton: 'View Profile',
        quickActionsTitle: 'Quick Actions',
        startProjectLink: 'Start a Project',
        notificationsLink: 'Notifications',
        helpCenterLink: 'Help Center',
      },
    },
  },
}

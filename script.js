/**
 * EduTrack – Smart Student Academic Performance Monitoring System
 * Central Client-Side Architecture, Data Store, Auth, Charts,
 * Multilingual Engine (English, Gujarati, Hindi) & Global Doubt Drawer
 */

// Global Configurable Performance Thresholds
const DEFAULT_THRESHOLDS = {
  excellent: 75, // 75% - 100% (Green)
  average: 40    // 40% - 74% (Yellow), Below 40% (Red)
};

// Storage Keys
const STORAGE_KEYS = {
  DATA: 'edutrack_students_v1',
  AUTH: 'edutrack_auth_session',
  ADVICE: 'edutrack_coordinator_advice_v1',
  DOUBTS: 'edutrack_parent_doubts_v1',
  THRESHOLDS: 'edutrack_thresholds_v1',
  LANG: 'edutrack_lang'
};

// ==========================================================================
// Comprehensive Multilingual Translation Dictionaries (English, Gujarati, Hindi)
// ==========================================================================
const I18N_DICTIONARY = {
  en: {
    // Brand & Common
    appTitle: "EduTrack",
    appSubtitle: "Smart Performance Monitoring",
    portalTag: "Primary & Middle Academic Portal",
    backToRoles: "Back to Roles",
    logout: "Logout",
    currentSelection: "Current Selection:",
    continueToLogin: "Continue to Login",
    secSignIn: "Secure Sign In",
    viewDetails: "View Details",
    askTeacherBtn: "Ask a Question",
    allClasses: "All Classes (School Overview)",
    home: "Home",
    homeBreadcrumb: "Home",
    chooseDiffRole: "Choose Different Role",
    teacherPortal: "Teacher Analytics Portal",
    principalPortal: "Principal Administration Portal",
    coordPortal: "Block Resource Coordinator (BRC) Portal",
    parentPortal: "Parent & Guardian Portal",
    teacherAuthPortal: "Teacher Authentication Portal",
    principalAuthPortal: "School Principal Authentication Portal",
    coordAuthPortal: "Block Resource Coordinator Portal",
    parentAuthPortal: "Parent & Guardian Authentication Portal",
    
    // Performance Statuses
    statusExcellent: "Excellent",
    statusAverage: "Average",
    statusNeedsHelp: "Needs More Improvement",
    legendGreen: "Green • Excellent (75% – 100%)",
    legendYellow: "Yellow • Average (40% – 74%)",
    legendRed: "Red • Needs More Improvement (Below 40%)",
    
    // Landing Page
    landingBadge: "Multi-Stakeholder Educational Intelligence Platform",
    landingHeading: "EduTrack",
    landingSubtitle: "Identify student learning gaps, monitor classroom outcomes, evaluate assigned school blocks, and foster transparent, joyful communication between teachers and parents.",
    selectPortalHeading: "Select Your Portal to Continue",
    selectPortalSubtitle: "Choose your role below to access customized dashboards, student analytics, and reporting tools.",
    
    // Role Cards
    roleTeacherTitle: "Teachers",
    roleTeacherDesc: "Subject-specific mastery evaluation, granular topic strength and weakness diagnosis, and live mark entry.",
    roleTeacherFeat1: "5 Subjects & Topic breakdown",
    roleTeacherFeat2: "Mark entry & diagnostic remarks",
    roleTeacherFeat3: "Configurable performance alerts",
    
    rolePrincipalTitle: "School Principals",
    rolePrincipalDesc: "Macro school health, classroom-wise comparisons, longitudinal academic trends, and policy suggestions.",
    rolePrincipalFeat1: "School-wise performance ledger",
    rolePrincipalFeat2: "Drill-down by Class 1 to 8",
    rolePrincipalFeat3: "FLN & Excellence distributions",
    
    roleCoordTitle: "Block Coordinators",
    roleCoordDesc: "Cluster review for assigned classrooms, identifying recurring learning gaps, and issuing saved pedagogical advice.",
    roleCoordFeat1: "Secure access to assigned classes only",
    roleCoordFeat2: "Learning gap clustering analysis",
    roleCoordFeat3: "Editable advice & intervention log",
    
    roleParentTitle: "Parents",
    roleParentDesc: "Welcoming progress cards for your child, data-backed home practice recommendations, and direct teacher queries.",
    roleParentFeat1: "Authorized linked child access",
    roleParentFeat2: "Plain-language progress cards",
    roleParentFeat3: "10-minute home practice games",
    
    // Login
    loginWelcome: "Welcome Back",
    loginSub: "Sign in to access your authorized student records and analytics",
    loginEmailLabel: "Email or Username:",
    loginEmailPlaceholder: "e.g. teacher@edutrack.edu",
    loginPassLabel: "Password:",
    loginPassPlaceholder: "Enter your password",
    loginDemoHeader: "Quick Demo Credentials:",
    loginDisclaimer: "Demo environment with role-based session simulation. In production, requests authenticate via secure JWT & server-side RBAC.",
    
    // Teacher Dashboard
    teacherBreadcrumb: "Teacher Dashboard",
    teacherHeaderTitle: "Class Academic Performance & Diagnostic Ledger",
    teacherHeaderSub: "Continuous classroom evaluation, topic-level gap analysis, and tailored remedial recommendations",
    classSectionPrimary: "Class 4 - Section A (Primary)",
    activeRoster: "Class 4-A Active Roster",
    fiveDiagnosticTopics: "5 Diagnostic Topics",
    subjectSelectorTitle: "Select Subject to Inspect",
    subjectSelectorSub: "Choose any of the five primary subjects to view topic-wise diagnostic breakdowns:",
    btnConfigThresh: "Configure Thresholds",
    statStudentsEvaluated: "Students Evaluated",
    statSubjectAvg: "Subject Average",
    statExcPerformers: "Excellent Performers",
    statNeedsImprovement: "Needs More Improvement",
    searchPlaceholder: "Search by student name or roll...",
    colStudentDetails: "Student Details",
    colClassRoll: "Class & Roll",
    colTotalMarks: "Total Marks",
    colStatus: "Performance Status",
    colStrengths: "Key Strengths",
    colWeaknesses: "Areas for Improvement",
    colActionRec: "Recommended Action",
    colAction: "Action",
    topicMasteryRate: "Topic-Wise Class Mastery Rate",
    topicMasterySub: "Breakdown across the 5 primary topics in",
    perfDistribution: "Performance Distribution",
    perfDistributionSub: "Student breakdown by mastery bands in this subject",
    studentPerfLedger: "Student Performance & Diagnostic Ledger:",
    edit: "Edit",
    cancel: "Cancel",
    close: "Close",
    saveRecalculate: "Save & Recalculate",
    updateMarksRemarks: "Update Marks & Remarks",
    topicLevelMarks: "Topic-Level Marks (out of 100):",
    calculatedOverallMarks: "Calculated Overall Subject Marks (%):",
    teacherRemarksLabel: "Teacher Remarks & Personalized Observations:",
    teacherRemarksPlaceholder: "Enter teacher feedback...",
    masteryBand: "Mastery",
    developing: "Developing",
    noCriticalGaps: "No critical gaps",
    remedialRequired: "Remedial plan required in",
    maintainEnrichment: "Maintain steady enrichment routines",
    
    // Principal Dashboard
    principalBreadcrumb: "Principal Dashboard",
    principalHeaderTitle: "School-Wide Academic Oversight & Classroom Monitoring",
    principalHeaderSub: "Comprehensive institutional metrics, class comparisons, and targeted quality improvement interventions",
    filterClassLabel: "Filter Class:",
    statSchoolEnrollment: "Total Students Tracked",
    statSchoolAvg: "Overall School Average",
    statSchoolExc: "Performing Excellently",
    statSchoolSupport: "Requiring Support",
    suggestionsTitle: "Suggestions for Improving Classroom Performance",
    acrossSections: "Across 16 Active Sections",
    termTrend: "+3.8% Term-over-Term",
    masteryStandard: "≥75% Mastery Standard",
    learningGapTag: "<40% Learning Gap",
    classComparisonTitle: "Classroom-Wise Academic Comparison",
    classComparisonSub: "Comparative average score across Class 1 to Class 8",
    subjComparisonTitle: "Subject-Wise Mastery Comparison",
    subjComparisonSub: "Average performance across all 5 core primary subjects",
    schoolWideLedger: "School-Wide Performance Ledger & Students Flagged for Support",
    schoolWideLedgerSub: "Displaying representative multi-class student cohort for administrative intervention",
    colStudentNameId: "Student Name & ID",
    colOverallAvg: "Overall Average",
    colStrongestSubj: "Strongest Subject",
    colWeakestSubj: "Weakest Subject",
    colInstAction: "Institutional Action Recommended",
    targetRemedialHour: "Target Remedial Hour",
    targetRemedialHourDesc: "Assign 35 minutes every Tuesday and Thursday for small-group remedial instruction in foundational numeracy and Hindi matras.",
    flnPush: "Foundational Literacy Push (FLN)",
    flnPushDesc: "Organize daily 15-minute Barakhadi choral reading and sight word flashcard games in Class 3 and 4 language sessions.",
    parentWorkshops: "Parent Engagement Workshops",
    parentWorkshopsDesc: "Hold monthly weekend demonstration sessions teaching parents how to use household counting games to strengthen place value.",
    
    // Coordinator Dashboard
    coordBreadcrumb: "Coordinator Dashboard",
    coordHeaderTitle: "Assigned Classroom Learning Gap Review & Pedagogical Interventions",
    coordHeaderSub: "Academic audit, foundational topic weaknesses, and cluster intervention logs",
    coordAuthBanner: "Cluster Authorization: Block 02 Assigned Classrooms",
    coordAuthDesc: "Role-Based Access Control Active: You are strictly authorized to inspect assigned classrooms: Class 4, Class 5, and Class 6. Unassigned classes are restricted.",
    coordAssignedLabel: "Assigned Class:",
    coordAdviceTitle: "Coordinator Practical Advice & Teaching Interventions",
    coordAdviceSub: "Direct actionable guidance issued to the class teacher and school leadership:",
    coordSaveBtn: "Save & Issue Directive",
    coordHistoryTitle: "Previously Saved Recommendations & Directives Log:",
    officialDirective: "Official BRC Directive",
    btnAdditionalPractice: "+ Additional Practice",
    btnVisualAids: "+ Visual Learning Aids",
    btnRemedialSessions: "+ Remedial Sessions",
    btnIndividualAttention: "+ Individual Attention",
    writeDirectiveFor: "Write Directive / Pedagogical Advice for",
    advicePlaceholder: "Enter practical advice, teaching strategies, or remedial schedules for teachers...",
    subjMasteryInClass: "Subject-Wise Mastery in Selected Class",
    subjMasteryInClassSub: "Average marks across 5 primary subjects",
    progressVsPrev: "Progress vs Previous Assessments",
    progressVsPrevSub: "Score trajectory: Baseline → Unit 1 → Unit 2 → Midterm",
    commonGapsTitle: "Common Learning Gaps & Academic Difficulties",
    commonGapsSub: "Identified conceptual bottlenecks requiring cluster-level instructional adjustments:",
    gapMathTitle: "Critical Deficit: Math Multiplication Tables & Division",
    gapMathDesc: "Students in the bottom quartile rely on finger-counting for tables 6 through 9 and fail to grasp division as repeated subtraction.",
    gapMathRec: "Recommended: Daily 10-minute dot array matrix drills + abacus kit practice.",
    gapLangTitle: "Language Gap: Matra Confusion (હ્રસ્વ 'િ' vs દીર્ઘ 'ી')",
    gapLangDesc: "Gujarati and Hindi writing shows persistent vowel matra swaps altering word meanings (e.g. દિન vs દીન).",
    gapLangRec: "Recommended: Barakhadi audio rhymes and tactile sandpaper letter tracing.",
    gapEvsTitle: "Commendable Mastery: EVS Plant & Living World",
    gapEvsDesc: "High student engagement in plant photosynthesis and community helper roles (Class mastery exceeds 82%).",
    gapEvsRec: "Recommended: Leverage nature projects to cross-teach vocabulary and measurements.",
    
    // Parent Dashboard
    parentBreadcrumb: "Parent Portal",
    parentBannerTag: "Student Academic Summary",
    parentColorExplTitle: "Understanding Your Child's Assessment Colors:",
    parentSubjResultsTitle: "Subject-Wise Results & Details",
    parentSubjResultsSub: "Click 'View Topic Details' on any subject card to inspect specific strengths and areas for revision",
    parentSuggestionsTitle: "Data-Backed Home Practice Suggestions",
    parentSuggestionsSub: "Practical 10-minute activities formulated specifically from your child's assessment evidence:",
    parentTeacherRemarksTitle: "Teacher Remarks:",
    childSelectorLabel: "Child:",
    attendanceLabel: "Attendance:",
    overallPerf: "Overall Performance",
    askTeacherQuestion: "Ask Teacher a Question",
    progressOverTime: "Progress Over Time",
    scoreTrajectory: "Score trajectory across term assessments",
    coreStrengths: "Core Strengths & Focus Areas",
    pedagogicalObs: "Pedagogical observations compiled by class teachers",
    strongestDomain: "Strongest Academic Domain:",
    weakestDomain: "Domain Requiring Active Practice:",
    howHelpAtHome: "How you can help at home:",
    defaultHomeAdvice: "Focus on topics marked in yellow or red with relaxed, 10-minute daily practice sessions.",
    askTeacherAboutThis: "Ask Teacher About This",
    
    // Global Doubt Drawer
    drawerTitle: "Parent Doubt & School Query",
    drawerDisclaimer: "Direct School Communication: Submit academic doubts, marks clarifications, or attendance queries. Messages are saved persistently.",
    drawerChildLabel: "Linked Child / Student:",
    drawerSubjLabel: "Subject:",
    drawerCategoryLabel: "Message Category:",
    drawerQuestionLabel: "Your Question or Doubt:",
    drawerQuestionPlaceholder: "Explain your question or concern in detail...",
    drawerSubmitBtn: "Send Question to Teacher",
    drawerHistoryTitle: "Submitted Questions History",
    
    // Subjects
    subjMath: "Mathematics",
    subjEng: "English",
    subjGuj: "Gujarati",
    subjHin: "Hindi",
    subjEvs: "EVS (Environmental Studies)"
  },

  gu: {
    // Brand & Common
    appTitle: "એજ્યુટ્રેક (EduTrack)",
    appSubtitle: "સ્માર્ટ પ્રદર્શન મોનિટરિંગ પ્રણાલી",
    portalTag: "પ્રાથમિક અને માધ્યમિક શૈક્ષણિક પોર્ટલ",
    backToRoles: "પોર્ટલ પસંદગી પર પાછા જાઓ",
    logout: "લૉગ આઉટ",
    currentSelection: "હાલની પસંદગી:",
    continueToLogin: "લોગિન કરવા આગળ વધો",
    secSignIn: "સુરક્ષિત સાઇન ઇન",
    viewDetails: "વિગતો જુઓ",
    askTeacherBtn: "શિક્ષકને પ્રશ્ન પૂછો",
    allClasses: "તમામ વર્ગો (સમગ્ર શાળા વિહંગાવલોકન)",
    home: "મુખ્ય પૃષ્ઠ",
    homeBreadcrumb: "મુખ્ય પૃષ્ઠ",
    chooseDiffRole: "અન્ય ભૂમિકા પસંદ કરો",
    teacherPortal: "શિક્ષક વિશ્લેષણ પોર્ટલ",
    principalPortal: "આચાર્ય વહીવટી પોર્ટલ",
    coordPortal: "બ્લોક સંસાધન સંયોજક (BRC) પોર્ટલ",
    parentPortal: "વાલી પોર્ટલ",
    teacherAuthPortal: "શિક્ષક પ્રમાણીકરણ પોર્ટલ",
    principalAuthPortal: "શાળા આચાર્ય પ્રમાણીકરણ પોર્ટલ",
    coordAuthPortal: "બ્લોક સંસાધન સંયોજક પોર્ટલ",
    parentAuthPortal: "વાલી પ્રમાણીકરણ પોર્ટલ",
    
    // Performance Statuses
    statusExcellent: "ઉત્કૃષ્ટ",
    statusAverage: "મધ્યમ / વિકાસશીલ",
    statusNeedsHelp: "વધુ સુધારણા જરૂરી",
    legendGreen: "લીલો • ઉત્કૃષ્ટ (૭૫% – ૧૦૦%)",
    legendYellow: "પીળો • મધ્યમ (૪૦% – ૭૪%)",
    legendRed: "લાલ • વધુ સુધારણા જરૂરી (૪૦% થી ઓછું)",
    
    // Landing Page
    landingBadge: "શૈક્ષણિક વિશ્લેષણ અને પ્રગતિ મૂલ્યાંકન પ્લેટફોર્મ",
    landingHeading: "એડ્યુટ્રેક",
    landingSubtitle: "વિદ્યાર્થીઓની અધ્યયન ખામીઓની ઓળખ કરો, વર્ગખંડના પરિણામોનું નિરીક્ષણ કરો, સોંપેલ વર્ગોની સમીક્ષા કરો અને શિક્ષકો તથા વાલીઓ વચ્ચે પારદર્શક સંવાદ સાધો.",
    selectPortalHeading: "આગળ વધવા માટે તમારું પોર્ટલ પસંદ કરો",
    selectPortalSubtitle: "કસ્ટમાઇઝ્ડ ડેશબોર્ડ, વિદ્યાર્થી એનાલિટિક્સ અને રિપોર્ટિંગ ટૂલ્સ મેળવવા માટે નીચે તમારી ભૂમિકા પસંદ કરો.",
    
    // Role Cards
    roleTeacherTitle: "શિક્ષકો (Teachers)",
    roleTeacherDesc: "વિષયવાર પ્રદર્શન મૂલ્યાંકન, ચોક્કસ મુદ્દાવાર શક્તિઓ અને ખામીઓનું નિદાન અને લાઈવ ગુણ એન્ટ્રી.",
    roleTeacherFeat1: "૫ વિષયો અને મુદ્દાવાર વિશ્લેષણ",
    roleTeacherFeat2: "ગુણ એન્ટ્રી અને નિદાન નોંધણી",
    roleTeacherFeat3: "રૂપરેખાંકિત પ્રદર્શન ચેતવણીઓ",
    
    rolePrincipalTitle: "શાળા આચાર્ય (Principals)",
    rolePrincipalDesc: "સમગ્ર શાળાનું શૈક્ષણિક સ્તર, વર્ગવાર તુલનાત્મક પરિણામો, શૈક્ષણિક પ્રગતિના વલણો અને માર્ગદર્શન.",
    rolePrincipalFeat1: "સમગ્ર શાળાનું પ્રદર્શન રજિસ્ટર",
    rolePrincipalFeat2: "ધોરણ ૧ થી ૮ સુધીનું વિશ્લેષણ",
    rolePrincipalFeat3: "FLN અને ગુણવત્તા વિતરણ",
    
    roleCoordTitle: "બ્લોક સંયોજક (Coordinators)",
    roleCoordDesc: "સોંપાયેલા વર્ગોની ક્લસ્ટર સમીક્ષા, સતત અધ્યયન ખામીઓની ઓળખ અને વ્યવહારુ શિક્ષણ સલાહ.",
    roleCoordFeat1: "માત્ર સોંપાયેલા વર્ગોનું અધિકૃત એક્સેસ",
    roleCoordFeat2: "અધ્યયન ખામી ક્લસ્ટરિંગ વિશ્લેષણ",
    roleCoordFeat3: "સંપાદનક્ષમ સલાહ અને નિર્દેશ લોગ",
    
    roleParentTitle: "વાલીઓ (Parents)",
    roleParentDesc: "બાળકનું પ્રોત્સાહક પ્રગતિ પત્રક, ડેટા આધારિત ઘરેલુ પ્રવૃત્તિઓ અને શિક્ષક સાથે સીધો પ્રશ્નોત્તરી સંવાદ.",
    roleParentFeat1: "માત્ર પોતાના બાળકના રેકોર્ડની સુરક્ષા",
    roleParentFeat2: "સરળ ભાષામાં પ્રગતિ કાર્ડ",
    roleParentFeat3: "૧૦ મિનિટની રમૂજી ઘરેલુ રમતો",
    
    // Login
    loginWelcome: "પુનઃ સ્વાગત છે",
    loginSub: "તમારા અધિકૃત વિદ્યાર્થી રેકોર્ડ અને એનાલિટિક્સ જોવા માટે સાઇન ઇન કરો",
    loginEmailLabel: "ઈમેલ અથવા વપરાશકર્તા નામ:",
    loginEmailPlaceholder: "દા.ત. teacher@edutrack.edu",
    loginPassLabel: "પાસવર્ડ:",
    loginPassPlaceholder: "તમારો ગુપ્ત પાસવર્ડ દાખલ કરો",
    loginDemoHeader: "ઝડપી ડેમો ઓળખપત્ર:",
    loginDisclaimer: "રોલ-આધારિત સત્ર સિમ્યુલેશન સાથેનું ડેમો વાતાવરણ. પ્રોડક્શનમાં સુરક્ષિત JWT અને સર્વર પ્રમાણીકરણ વપરાય છે.",
    
    // Teacher Dashboard
    teacherBreadcrumb: "શિક્ષક ડેશબોર્ડ",
    teacherHeaderTitle: "વર્ગ શૈક્ષણિક પ્રદર્શન અને નિદાન પત્રક",
    teacherHeaderSub: "સતત વર્ગખંડ મૂલ્યાંકન, મુદ્દાવાર ખામી વિશ્લેષણ અને લક્ષિત ઉપચારાત્મક ભલામણો",
    classSectionPrimary: "ધોરણ ૪ - વર્ગ અ (પ્રાથમિક)",
    activeRoster: "ધોરણ ૪-અ સક્રિય વિદ્યાર્થી યાદી",
    fiveDiagnosticTopics: "૫ નિદાનાત્મક મુદ્દાઓ",
    subjectSelectorTitle: "નિરીક્ષણ માટે વિષય પસંદ કરો",
    subjectSelectorSub: "મુદ્દાવાર નિદાન વિશ્લેષણ જોવા માટે કોઈપણ વિષય પસંદ કરો:",
    btnConfigThresh: "થ્રેશોલ્ડ રૂપરેખાંકિત કરો",
    statStudentsEvaluated: "મૂલ્યાંકન કરેલ વિદ્યાર્થીઓ",
    statSubjectAvg: "વિષય સરેરાશ પ્રદર્શન",
    statExcPerformers: "ઉત્કૃષ્ટ વિદ્યાર્થીઓ",
    statNeedsImprovement: "વધુ સુધારણા જરૂરી",
    searchPlaceholder: "વિદ્યાર્થીના નામ અથવા રોલ નંબર દ્વારા શોધો...",
    colStudentDetails: "વિદ્યાર્થી વિગત",
    colClassRoll: "વર્ગ અને રોલ",
    colTotalMarks: "કુલ ગુણ",
    colStatus: "પ્રદર્શન સ્થિતિ",
    colStrengths: "મુખ્ય શક્તિઓ",
    colWeaknesses: "સુધારણા ક્ષેત્ર",
    colActionRec: "ભલામણ કરેલ પગલાં",
    colAction: "કાર્ય",
    topicMasteryRate: "વર્ગનો મુદ્દાવાર પ્રાવીણ્ય દર",
    topicMasterySub: "૫ મુખ્ય વિષય મુદ્દાઓનું વિશ્લેષણ:",
    perfDistribution: "પ્રદર્શન વિતરણ",
    perfDistributionSub: "આ વિષયમાં પ્રાવીણ્ય જૂથ મુજબ વિદ્યાર્થી વિભાજન",
    studentPerfLedger: "વિદ્યાર્થી પ્રદર્શન અને નિદાન પત્રક:",
    edit: "સંપાદિત કરો",
    cancel: "રદ કરો",
    close: "બંધ કરો",
    saveRecalculate: "સાચવો અને પુનર્ગણના કરો",
    updateMarksRemarks: "ગુણ અને શિક્ષક નોંધ અપડેટ કરો",
    topicLevelMarks: "મુદ્દાવાર ગુણ (૧૦૦ માંથી):",
    calculatedOverallMarks: "ગણતરી કરેલ કુલ વિષય ગુણ (%):",
    teacherRemarksLabel: "શિક્ષકની વિશેષ નોંધ અને વ્યક્તિગત અવલોકન:",
    teacherRemarksPlaceholder: "શિક્ષકનો પ્રતિભાવ અહીં લખો...",
    masteryBand: "પ્રાવીણ્ય",
    developing: "વિકાસશીલ",
    noCriticalGaps: "કોઈ ગંભીર ખામી નથી",
    remedialRequired: "માં ઉપચારાત્મક યોજના જરૂરી",
    maintainEnrichment: "નિયમિત સંવર્ધન અભ્યાસ ચાલુ રાખો",
    
    // Principal Dashboard
    principalBreadcrumb: "આચાર્ય ડેશબોર્ડ",
    principalHeaderTitle: "સમગ્ર શાળા શૈક્ષણિક દેખરેખ અને વર્ગખંડ મોનિટરિંગ",
    principalHeaderSub: "સર્વાંગી સંસ્થાકીય મેટ્રિક્સ, વર્ગવાર તુલના અને ગુણવત્તા સુધારણા હસ્તક્ષેપ",
    filterClassLabel: "વર્ગ પસંદ કરો:",
    statSchoolEnrollment: "કુલ નોંધાયેલ વિદ્યાર્થીઓ",
    statSchoolAvg: "સમગ્ર શાળા સરેરાશ",
    statSchoolExc: "ઉત્કૃષ્ટ પ્રદર્શન દર",
    statSchoolSupport: "સહાયતા અપેક્ષિત",
    suggestionsTitle: "વર્ગખંડ પ્રદર્શન સુધારવા માટે વહીવટી સૂચનો",
    acrossSections: "૧૬ સક્રિય વર્ગખંડોમાં",
    termTrend: "+૩.૮% સત્ર-દર-સત્ર સુધારો",
    masteryStandard: "≥૭૫% પ્રાવીણ્ય ધોરણ",
    learningGapTag: "<૪૦% અધ્યયન ખામી",
    classComparisonTitle: "વર્ગખંડવાર શૈક્ષણિક સરખામણી",
    classComparisonSub: "ધોરણ ૧ થી ૮ સુધીના સરેરાશ ગુણની સરખામણી",
    subjComparisonTitle: "વિષયવાર પ્રાવીણ્ય સરખામણી",
    subjComparisonSub: "૫ મુખ્ય પ્રાથમિક વિષયોમાં સરેરાશ પ્રદર્શન",
    schoolWideLedger: "સમગ્ર શાળા પ્રદર્શન રજિસ્ટર અને સહાય અપેક્ષિત વિદ્યાર્થીઓ",
    schoolWideLedgerSub: "વહીવટી માર્ગદર્શન માટે બહુ-વર્ગ વિદ્યાર્થી જૂથનું પ્રદર્શન",
    colStudentNameId: "વિદ્યાર્થીનું નામ અને ID",
    colOverallAvg: "સમગ્ર સરેરાશ",
    colStrongestSubj: "સૌથી મજબૂત વિષય",
    colWeakestSubj: "સુધારણા અપેક્ષિત વિષય",
    colInstAction: "સંસ્થાકીય ભલામણ કરેલ પગલાં",
    targetRemedialHour: "લક્ષિત ઉપચારાત્મક તાસ",
    targetRemedialHourDesc: "પાયાની ગણતરી અને હિન્દી માત્રાઓમાં નાના જૂથ ઉપચારાત્મક શિક્ષણ માટે દર મંગળવાર અને ગુરુવારે ૩૫ મિનિટ ફાળવો.",
    flnPush: "પાયાની સાક્ષરતા પ્રોત્સાહન (FLN)",
    flnPushDesc: "ધોરણ ૩ અને ૪ માં દરરોજ ૧૫ મિનિટ બારાખડી સમૂહ વાચન અને ફ્લેશકાર્ડ રમતોનું આયોજન કરો.",
    parentWorkshops: "વાલી જાગૃતિ વર્કશોપ",
    parentWorkshopsDesc: "સ્થાન કિંમત દ્રઢ કરવા માટે ઘરેલુ ગણતરીની રમતોનો ઉપયોગ શીખવતી માસિક સપ્તાહિક પ્રદર્શન બેઠકો યોજો.",
    
    // Coordinator Dashboard
    coordBreadcrumb: "બ્લોક સંયોજક ડેશબોર્ડ",
    coordHeaderTitle: "સોંપાયેલ વર્ગ અધ્યયન ખામી સમીક્ષા અને શિક્ષણ હસ્તક્ષેપ",
    coordHeaderSub: "શૈક્ષણિક ઓડિટ, પાયાની નબળાઈઓ અને ક્લસ્ટર નિર્દેશ લોગ",
    coordAuthBanner: "ક્લસ્ટર અધિકૃતતા: બ્લોક ૦૨ સોંપાયેલા વર્ગખંડો",
    coordAuthDesc: "ભૂમિકા-આધારિત એક્સેસ સક્રિય: તમે ફક્ત સોંપાયેલા વર્ગો (ધોરણ ૪, ૫, ૬) જોવા માટે અધિકૃત છો. અન્ય વર્ગો પ્રતિબંધિત છે.",
    coordAssignedLabel: "સોંપાયેલ વર્ગ:",
    coordAdviceTitle: "સંયોજક વ્યવહારુ સલાહ અને શિક્ષણ નિર્દેશો",
    coordAdviceSub: "વર્ગ શિક્ષક અને શાળા નેતૃત્વને જારી કરાયેલ સીધું માર્ગદર્શન:",
    coordSaveBtn: "સાચવો અને નિર્દેશ જારી કરો",
    coordHistoryTitle: "અગાઉ નોંધાયેલ ભલામણો અને નિર્દેશોનો ઇતિહાસ:",
    officialDirective: "સત્તાવાર BRC નિર્દેશ",
    btnAdditionalPractice: "+ વધારાની પ્રેક્ટિસ",
    btnVisualAids: "+ દ્રશ્ય-શ્રાવ્ય સાધનો",
    btnRemedialSessions: "+ ઉપચારાત્મક વર્ગ",
    btnIndividualAttention: "+ વ્યક્તિગત ધ્યાન",
    writeDirectiveFor: "માટે શિક્ષણ નિર્દેશ / વ્યવહારુ સલાહ લખો:",
    advicePlaceholder: "શિક્ષકો માટે વ્યવહારુ સલાહ, શિક્ષણ પદ્ધતિઓ અથવા ઉપચારાત્મક સમયપત્રક લખો...",
    subjMasteryInClass: "પસંદ કરેલ વર્ગમાં વિષયવાર પ્રાવીણ્ય",
    subjMasteryInClassSub: "૫ મુખ્ય વિષયોમાં સરેરાશ ગુણ",
    progressVsPrev: "અગાઉના મૂલ્યાંકનો સાથે પ્રગતિ સરખામણી",
    progressVsPrevSub: "ગુણ પ્રગતિ: પ્રારંભિક → એકમ કસોટી ૧ → એકમ કસોટી ૨ → મધ્યસત્ર",
    commonGapsTitle: "સામાન્ય અધ્યયન ખામીઓ અને શૈક્ષણિક મુશ્કેલીઓ",
    commonGapsSub: "ક્લસ્ટર સ્તરે શૈક્ષણિક સુધારાની જરૂરિયાત ધરાવતી ખ્યાલાત્મક ખામીઓ:",
    gapMathTitle: "ગંભીર ખામી: ગણિત ઘડિયા અને ભાગાકાર",
    gapMathDesc: "નીચલા વર્ગના વિદ્યાર્થીઓ ૬ થી ૯ ના ઘડિયા માટે આંગળીઓની ગણતરી પર નિર્ભર છે અને ભાગાકારને વારંવારની બાદબાકી તરીકે સમજવામાં અસમર્થ છે.",
    gapMathRec: "ભલામણ: દરરોજ ૧૦ મિનિટ બિંદુ રચના મેટ્રિક્સ ડ્રિલ + એબેકસ કીટ પ્રેક્ટિસ.",
    gapLangTitle: "ભાષા ખામી: માત્રા મૂંઝવણ (હ્રસ્વ 'િ' વિરુદ્ધ દીર્ઘ 'ી')",
    gapLangDesc: "ગુજરાતી અને હિન્દી લેખનમાં સતત સ્વર માત્રાઓ બદલાઈ જવાથી શબ્દના અર્થ બદલાય છે (દા.ત. દિન વિ. દીન).",
    gapLangRec: "ભલામણ: બારાખડી ઓડિયો જોડકણાં અને રેતીવાળા કાગળ પર અક્ષર ઘૂંટણ.",
    gapEvsTitle: "સરાહનીય પ્રાવીણ્ય: પર્યાવરણ વનસ્પતિ અને જીવસૃષ્ટિ",
    gapEvsDesc: "વનસ્પતિ પ્રકાશસંશ્લેષણ અને સમાજ સેવકોની ભૂમિકામાં વિદ્યાર્થીઓની ઊંચી રુચિ (વર્ગ પ્રાવીણ્ય ૮૨% થી વધુ).",
    gapEvsRec: "ભલામણ: શબ્દભંડોળ અને માપન શીખવવા માટે પ્રકૃતિ પ્રોજેક્ટનો ઉપયોગ કરો.",
    
    // Parent Dashboard
    parentBreadcrumb: "વાલી પોર્ટલ",
    parentBannerTag: "વિદ્યાર્થી શૈક્ષણિક પ્રગતિ સારાંશ",
    parentColorExplTitle: "તમારા બાળકના મૂલ્યાંકન રંગોને સમજો:",
    parentSubjResultsTitle: "વિષયવાર પરિણામો અને વિગત",
    parentSubjResultsSub: "મુદ્દાવાર શક્તિઓ અને પુનરાવર્તનના ક્ષેત્રો જોવા માટે વિષય કાર્ડ પર 'વિગતો જુઓ' ક્લિક કરો",
    parentSuggestionsTitle: "ડેટા-સમર્થિત ઘરેલુ અભ્યાસ સૂચનો",
    parentSuggestionsSub: "તમારા બાળકના વાસ્તવિક મૂલ્યાંકન પરથી તૈયાર કરાયેલી ૧૦ મિનિટની વ્યવહારુ પ્રવૃત્તિઓ:",
    parentTeacherRemarksTitle: "શિક્ષકની વિશેષ નોંધ:",
    childSelectorLabel: "બાળક:",
    attendanceLabel: "હાજરી:",
    overallPerf: "સમગ્ર પ્રદર્શન",
    askTeacherQuestion: "શિક્ષકને પ્રશ્ન પૂછો",
    progressOverTime: "સમય સાથે શૈક્ષણિક પ્રગતિ",
    scoreTrajectory: "સત્ર પરીક્ષાઓ દરમિયાન પ્રગતિ આલેખ",
    coreStrengths: "મુખ્ય શક્તિઓ અને ધ્યાન કેન્દ્રિત કરવાના ક્ષેત્રો",
    pedagogicalObs: "વર્ગ શિક્ષક દ્વારા નોંધાયેલ શૈક્ષણિક અવલોકનો",
    strongestDomain: "સૌથી મજબૂત શૈક્ષણિક વિષય:",
    weakestDomain: "નિયમિત પ્રેક્ટિસ જરૂરી હોય તેવો વિષય:",
    howHelpAtHome: "તમે ઘરે કેવી રીતે મદદ કરી શકો:",
    defaultHomeAdvice: "પીળા કે લાલ રંગવાળા મુદ્દાઓ પર દરરોજ ૧૦ મિનિટ હળવાશથી પ્રેક્ટિસ કરાવો.",
    askTeacherAboutThis: "આ અંગે શિક્ષકને પૂછો",
    
    // Global Doubt Drawer
    drawerTitle: "વાલી પ્રશ્નોત્તરી અને શાળા સંવાદ",
    drawerDisclaimer: "સીધો શાળા સંવાદ: શૈક્ષણિક શંકાઓ, ગુણ સ્પષ્ટતા અથવા હાજરી સંબંધી પ્રશ્નો સબમિટ કરો. સંદેશાઓ સુરક્ષિત રીતે સંગ્રહિત થાય છે.",
    drawerChildLabel: "સંબંધિત બાળક / વિદ્યાર્થી:",
    drawerSubjLabel: "વિષય:",
    drawerCategoryLabel: "સંદેશ શ્રેણી:",
    drawerQuestionLabel: "તમારો પ્રશ્ન અથવા શંકા:",
    drawerQuestionPlaceholder: "તમારી શંકા અથવા પ્રશ્ન વિગતવાર અહીં લખો...",
    drawerSubmitBtn: "શિક્ષકને પ્રશ્ન મોકલો",
    drawerHistoryTitle: "પૂછાયેલા પ્રશ્નોનો ઇતિહાસ",
    
    // Subjects
    subjMath: "ગણિત (Mathematics)",
    subjEng: "અંગ્રેજી (English)",
    subjGuj: "ગુજરાતી (Gujarati)",
    subjHin: "હિન્દી (Hindi)",
    subjEvs: "પર્યાવરણ (EVS)"
  },

  hi: {
    // Brand & Common
    appTitle: "एड्यूट्रेक (EduTrack)",
    appSubtitle: "स्मार्ट शैक्षणिक प्रदर्शन निगरानी प्रणाली",
    portalTag: "प्राथमिक एवं माध्यमिक शैक्षणिक पोर्टल",
    backToRoles: "भूमिकाओं पर वापस जाएं",
    logout: "लॉग आउट",
    currentSelection: "वर्तमान चयन:",
    continueToLogin: "लॉगिन के लिए आगे बढ़ें",
    secSignIn: "सुरक्षित साइन इन",
    viewDetails: "विवरण देखें",
    askTeacherBtn: "शिक्षक से प्रश्न पूछें",
    allClasses: "सभी कक्षाएं (विद्यालय समग्र अवलोकन)",
    home: "होम",
    homeBreadcrumb: "होम",
    chooseDiffRole: "अन्य भूमिका चुनें",
    teacherPortal: "शिक्षक विश्लेषण पोर्टल",
    principalPortal: "प्रधानाचार्य प्रशासनिक पोर्टल",
    coordPortal: "ब्लॉक संसाधन समन्वयक (BRC) पोर्टल",
    parentPortal: "अभिभावक पोर्टल",
    teacherAuthPortal: "शिक्षक प्रमाणीकरण पोर्टल",
    principalAuthPortal: "प्रधानाचार्य प्रमाणीकरण पोर्टल",
    coordAuthPortal: "ब्लॉक संसाधन समन्वयक पोर्टल",
    parentAuthPortal: "अभिभावक प्रमाणीकरण पोर्टल",
    
    // Performance Statuses
    statusExcellent: "उत्कृष्ट",
    statusAverage: "औसत / प्रगतिशील",
    statusNeedsHelp: "अधिक सुधार अपेक्षित",
    legendGreen: "हरा • उत्कृष्ट (75% – 100%)",
    legendYellow: "पीला • औसत (40% – 74%)",
    legendRed: "लाल • अधिक सुधार अपेक्षित (40% से कम)",
    
    // Landing Page
    landingBadge: "बहु-हितधारक शैक्षणिक विश्लेषण मंच",
    landingHeading: "एडुट्रैक",
    landingSubtitle: "विद्यार्थियों के अध्ययन अंतराल की पहचान करें, कक्षा परिणामों की निगरानी करें, आवंटित ब्लॉकों की समीक्षा करें और शिक्षकों एवं अभिभावकों के बीच पारदर्शी संवाद स्थापित करें।",
    selectPortalHeading: "आगे बढ़ने के लिए अपना पोर्टल चुनें",
    selectPortalSubtitle: "अनुकूलित डैशबोर्ड, छात्र विश्लेषण और रिपोर्टिंग टूल तक पहुँचने के लिए नीचे अपनी भूमिका चुनें।",
    
    // Role Cards
    roleTeacherTitle: "शिक्षक (Teachers)",
    roleTeacherDesc: "विषय-विशिष्ट दक्षता मूल्यांकन, विषयवार क्षमता एवं कमजोरी का निदान और अंक प्रविष्टि।",
    roleTeacherFeat1: "5 विषय एवं बिंदुवार विश्लेषण",
    roleTeacherFeat2: "अंक प्रविष्टि एवं निदान टिप्पणी",
    roleTeacherFeat3: "कॉन्फ़िगर करने योग्य प्रदर्शन अलर्ट",
    
    rolePrincipalTitle: "प्रधानाचार्य (Principals)",
    rolePrincipalDesc: "समग्र विद्यालय स्वास्थ्य, कक्षावार तुलना, शैक्षणिक सुधार के रुझान और प्रशासनिक सुझाव।",
    rolePrincipalFeat1: "विद्यालय-स्तरीय प्रदर्शन रजिस्टर",
    rolePrincipalFeat2: "कक्षा 1 से 8 तक विस्तृत विश्लेषण",
    rolePrincipalFeat3: "FLN और उत्कृष्टता वितरण",
    
    roleCoordTitle: "ब्लॉक समन्वयक (Coordinators)",
    roleCoordDesc: "आवंटित कक्षाओं की क्लस्टर समीक्षा, सामान्य शिक्षण अंतरालों की पहचान और व्यावहारिक शैक्षणिक सलाह।",
    roleCoordFeat1: "केवल आवंटित कक्षाओं के लिए सुरक्षित पहुंच",
    roleCoordFeat2: "अध्ययन अंतराल क्लस्टरिंग विश्लेषण",
    roleCoordFeat3: "संपादन योग्य सलाह एवं निर्देश लॉग",
    
    roleParentTitle: "अभिभावक (Parents)",
    roleParentDesc: "अपने बच्चे का उत्साहवर्धक प्रगति पत्रक, डेटा-आधारित घरेलू अभ्यास सुझाव और शिक्षक से सीधा संवाद।",
    roleParentFeat1: "अधिकृत लिंक्ड बच्चे के रिकॉर्ड तक पहुंच",
    roleParentFeat2: "सरल भाषा में प्रगति रिपोर्ट",
    roleParentFeat3: "10-मिनट के ज्ञानवर्धक घरेलू खेल",
    
    // Login
    loginWelcome: "पुनः स्वागत है",
    loginSub: "अपने अधिकृत छात्र रिकॉर्ड और विश्लेषण तक पहुँचने के लिए साइन इन करें",
    loginEmailLabel: "ईमेल या उपयोगकर्ता नाम:",
    loginEmailPlaceholder: "उदा. teacher@edutrack.edu",
    loginPassLabel: "पासवर्ड:",
    loginPassPlaceholder: "अपना पासवर्ड दर्ज करें",
    loginDemoHeader: "त्वरित डेमो क्रेडेंशियल्स:",
    loginDisclaimer: "भूमिका-आधारित सत्र सिमुलेशन के साथ डेमो वातावरण। उत्पादन में सुरक्षित JWT एवं सर्वर प्रमाणीकरण प्रयुक्त होता है।",
    
    // Teacher Dashboard
    teacherBreadcrumb: "शिक्षक डैशबोर्ड",
    teacherHeaderTitle: "कक्षा शैक्षणिक प्रदर्शन एवं नैदानिक ​​लेज़र",
    teacherHeaderSub: "निरंतर कक्षा मूल्यांकन, विषयवार अंतराल विश्लेषण और लक्षित उपचारात्मक सिफारिशें",
    classSectionPrimary: "कक्षा 4 - अनुभाग अ (प्राथमिक)",
    activeRoster: "कक्षा 4-अ सक्रिय छात्र सूची",
    fiveDiagnosticTopics: "5 नैदानिक विषय बिंदु",
    subjectSelectorTitle: "निरीक्षण के लिए विषय चुनें",
    subjectSelectorSub: "बिंदुवार नैदानिक विवरण देखने के लिए किसी भी विषय का चयन करें:",
    btnConfigThresh: "थ्रेशोल्ड कॉन्फ़िगर करें",
    statStudentsEvaluated: "मूल्यांकित विद्यार्थी",
    statSubjectAvg: "विषय औसत प्रदर्शन",
    statExcPerformers: "उत्कृष्ट प्रदर्शनकर्ता",
    statNeedsImprovement: "अधिक सुधार अपेक्षित",
    searchPlaceholder: "छात्र के नाम या रोल नंबर द्वारा खोजें...",
    colStudentDetails: "विद्यार्थी विवरण",
    colClassRoll: "कक्षा एवं रोल",
    colTotalMarks: "कुल अंक",
    colStatus: "प्रदर्शन स्थिति",
    colStrengths: "मुख्य क्षमताएं",
    colWeaknesses: "सुधार के क्षेत्र",
    colActionRec: "अनुशंसित कार्रवाई",
    colAction: "कार्रवाई",
    topicMasteryRate: "कक्षा की बिंदुवार दक्षता दर",
    topicMasterySub: "5 मुख्य विषय बिंदुओं का विश्लेषण:",
    perfDistribution: "प्रदर्शन वितरण",
    perfDistributionSub: "इस विषय में दक्षता स्तर अनुसार छात्र वितरण",
    studentPerfLedger: "विद्यार्थी प्रदर्शन एवं नैदानिक ​​लेज़र:",
    edit: "संपादित करें",
    cancel: "रद्द करें",
    close: "बंद करें",
    saveRecalculate: "सहेजें और पुनर्गणना करें",
    updateMarksRemarks: "अंक एवं शिक्षक टिप्पणी अपडेट करें",
    topicLevelMarks: "बिंदुवार अंक (100 में से):",
    calculatedOverallMarks: "परिकलित कुल विषय अंक (%):",
    teacherRemarksLabel: "शिक्षक की विशेष टिप्पणी एवं व्यक्तिगत अवलोकन:",
    teacherRemarksPlaceholder: "शिक्षक का फीडबैक यहाँ लिखें...",
    masteryBand: "दक्षता",
    developing: "प्रगतिशील",
    noCriticalGaps: "कोई गंभीर कमी नहीं",
    remedialRequired: "में उपचारात्मक योजना आवश्यक",
    maintainEnrichment: "नियमित संवर्धन अभ्यास जारी रखें",
    
    // Principal Dashboard
    principalBreadcrumb: "प्रधानाचार्य डैशबोर्ड",
    principalHeaderTitle: "विद्यालय-व्यापी शैक्षणिक पर्यवेक्षण एवं कक्षा निगरानी",
    principalHeaderSub: "व्यापक संस्थागत मेट्रिक्स, कक्षावार तुलना और लक्षित गुणवत्ता सुधार हस्तक्षेप",
    filterClassLabel: "कक्षा चुनें:",
    statSchoolEnrollment: "कुल ट्रैक किए गए विद्यार्थी",
    statSchoolAvg: "समग्र विद्यालय औसत",
    statSchoolExc: "उत्कृष्ट प्रदर्शन दर",
    statSchoolSupport: "अतिरिक्त सहयोग की आवश्यकता",
    suggestionsTitle: "कक्षा प्रदर्शन सुधारने हेतु प्रशासनिक सुझाव",
    acrossSections: "16 सक्रिय अनुभागों में",
    termTrend: "+3.8% सत्र-दर-सत्र सुधार",
    masteryStandard: "≥75% दक्षता मानक",
    learningGapTag: "<40% अध्ययन अंतराल",
    classComparisonTitle: "कक्षावार शैक्षणिक तुलना",
    classComparisonSub: "कक्षा 1 से 8 तक औसत अंकों की तुलना",
    subjComparisonTitle: "विषयवार दक्षता तुलना",
    subjComparisonSub: "सभी 5 प्रमुख प्राथमिक विषयों में औसत प्रदर्शन",
    schoolWideLedger: "विद्यालय-स्तरीय प्रदर्शन रजिस्टर एवं सहयोग अपेक्षित विद्यार्थी",
    schoolWideLedgerSub: "प्रशासनिक मार्गदर्शन हेतु बहु-कक्षा छात्र समूह का प्रदर्शन",
    colStudentNameId: "विद्यार्थी का नाम एवं ID",
    colOverallAvg: "समग्र औसत",
    colStrongestSubj: "सर्वश्रेष्ठ विषय",
    colWeakestSubj: "सुधार योग्य विषय",
    colInstAction: "संस्थागत अनुशंसित कार्रवाई",
    targetRemedialHour: "लक्षित उपचारात्मक सत्र",
    targetRemedialHourDesc: "बुनियादी संख्याज्ञान और हिंदी मात्राओं में छोटे समूह के उपचारात्मक शिक्षण के लिए प्रत्येक मंगलवार और गुरुवार को 35 मिनट निर्धारित करें।",
    flnPush: "बुनियादी साक्षरता प्रोत्साहन (FLN)",
    flnPushDesc: "कक्षा 3 और 4 में प्रतिदिन 15 मिनट बारहखड़ी सामूहिक वाचन और फ्लैशकार्ड खेलों का आयोजन करें।",
    parentWorkshops: "अभिभावक सहभागिता कार्यशाला",
    parentWorkshopsDesc: "स्थानीय मान सुदृढ़ करने हेतु घरेलू गिनती खेलों का उपयोग सिखाने के लिए मासिक सप्ताहांत प्रदर्शन सत्र आयोजित करें।",
    
    // Coordinator Dashboard
    coordBreadcrumb: "समन्वयक डैशबोर्ड",
    coordHeaderTitle: "आवंटित कक्षा अध्ययन अंतराल समीक्षा एवं शिक्षण हस्तक्षेप",
    coordHeaderSub: "शैक्षणिक ऑडिट, मूलभूत कमजोरियां और क्लस्टर निर्देश लॉग",
    coordAuthBanner: "क्लस्टर प्राधिकरण: ब्लॉक 02 आवंटित कक्षाएं",
    coordAuthDesc: "भूमिका-आधारित पहुंच सक्रिय: आप केवल आवंटित कक्षाओं (कक्षा 4, 5, 6) का निरीक्षण करने के लिए अधिकृत हैं। अन्य कक्षाएं प्रतिबंधित हैं।",
    coordAssignedLabel: "आवंटित कक्षा:",
    coordAdviceTitle: "समन्वयक व्यावहारिक सलाह एवं शिक्षण निर्देश",
    coordAdviceSub: "कक्षा शिक्षक एवं विद्यालय नेतृत्व को जारी किया गया प्रत्यक्ष मार्गदर्शन:",
    coordSaveBtn: "सहेजें और निर्देश जारी करें",
    coordHistoryTitle: "पूर्व सहेजी गई सिफारिशों एवं निर्देशों का लॉग:",
    officialDirective: "आधिकारिक BRC निर्देश",
    btnAdditionalPractice: "+ अतिरिक्त अभ्यास",
    btnVisualAids: "+ दृश्य शिक्षण साधन",
    btnRemedialSessions: "+ उपचारात्मक सत्र",
    btnIndividualAttention: "+ व्यक्तिगत ध्यान",
    writeDirectiveFor: "के लिए शिक्षण निर्देश / व्यावहारिक सलाह लिखें:",
    advicePlaceholder: "शिक्षकों के लिए व्यावहारिक सलाह, शिक्षण रणनीतियाँ या उपचारात्मक समय सारिणी लिखें...",
    subjMasteryInClass: "चयनित कक्षा में विषयवार दक्षता",
    subjMasteryInClassSub: "5 मुख्य विषयों में औसत अंक",
    progressVsPrev: "पूर्व मूल्यांकनों के साथ प्रगति तुलना",
    progressVsPrevSub: "अंक प्रक्षेपवक्र: आधारभूत → इकाई परीक्षा 1 → इकाई परीक्षा 2 → मध्यावधि",
    commonGapsTitle: "सामान्य शिक्षण अंतराल एवं शैक्षणिक कठिनाइयाँ",
    commonGapsSub: "क्लस्टर स्तर पर शैक्षणिक समायोजन की आवश्यकता वाले मूलभूत वैचारिक अवरोध:",
    gapMathTitle: "गंभीर कमी: गणित पहाड़े और भाग",
    gapMathDesc: "निचले चतुर्थक के छात्र 6 से 9 के पहाड़ों के लिए उंगलियों पर निर्भर हैं और भाग को निरंतर घटाव के रूप में समझने में कठिनाई महसूस करते हैं।",
    gapMathRec: "अनुशंसा: प्रतिदिन 10 मिनट डॉट ऐरे मैट्रिक्स ड्रिल + अबैकस किट अभ्यास।",
    gapLangTitle: "भाषा अंतराल: मात्रा भ्रम (ह्रस्व 'ि' बनाम दीर्घ 'ी')",
    gapLangDesc: "गुजराती और हिंदी लेखन में लगातार स्वर मात्रा परिवर्तन से शब्दों के अर्थ बदलते हैं (उदा. दिन बनाम दीन)।",
    gapLangRec: "अनुशंसा: बारहखड़ी ऑडियो तुकबंदी और सैंडपेपर अक्षरों पर उंगली फेरने का अभ्यास।",
    gapEvsTitle: "सराहनीय दक्षता: पर्यावरण पादप एवं जीव जगत",
    gapEvsDesc: "पादप प्रकाश संश्लेषण और सामुदायिक सहायकों की भूमिका में छात्रों की उच्च रुचि (कक्षा दक्षता 82% से अधिक)।",
    gapEvsRec: "अनुशंसा: शब्दावली और माप सिखाने के लिए प्रकृति आधारित परियोजनाओं का उपयोग करें।",
    
    // Parent Dashboard
    parentBreadcrumb: "अभिभावक पोर्टल",
    parentBannerTag: "विद्यार्थी शैक्षणिक प्रगति सारांश",
    parentColorExplTitle: "अपने बच्चे के मूल्यांकन रंगों को समझें:",
    parentSubjResultsTitle: "विषयवार परिणाम एवं विवरण",
    parentSubjResultsSub: "विशिष्ट दक्षताओं और संशोधन क्षेत्रों का निरीक्षण करने के लिए किसी भी विषय कार्ड पर 'विवरण देखें' पर क्लिक करें",
    parentSuggestionsTitle: "डेटा-समर्थित घरेलू अभ्यास सुझाव",
    parentSuggestionsSub: "आपके बच्चे के वास्तविक मूल्यांकन प्रमाणों से विशेष रूप से तैयार की गई व्यावहारिक 10-मिनट की गतिविधियाँ:",
    parentTeacherRemarksTitle: "शिक्षक की विशेष टिप्पणी:",
    childSelectorLabel: "बच्चा:",
    attendanceLabel: "उपस्थिति:",
    overallPerf: "समग्र प्रदर्शन",
    askTeacherQuestion: "शिक्षक से प्रश्न पूछें",
    progressOverTime: "समय के साथ शैक्षणिक प्रगति",
    scoreTrajectory: "सत्र परीक्षाओं के दौरान प्रगति आलेख",
    coreStrengths: "प्रमुख क्षमताएं एवं ध्यान केंद्रित करने योग्य क्षेत्र",
    pedagogicalObs: "कक्षा शिक्षक द्वारा संकलित शैक्षणिक अवलोकन",
    strongestDomain: "सर्वोत्तम शैक्षणिक विषय:",
    weakestDomain: "सक्रिय अभ्यास की आवश्यकता वाला विषय:",
    howHelpAtHome: "आप घर पर कैसे मदद कर सकते हैं:",
    defaultHomeAdvice: "पीले या लाल रंग वाले विषयों पर प्रतिदिन 10 मिनट सहजता से अभ्यास कराएं।",
    askTeacherAboutThis: "इसके बारे में शिक्षक से पूछें",
    
    // Global Doubt Drawer
    drawerTitle: "अभिभावक प्रश्न एवं विद्यालय संवाद",
    drawerDisclaimer: "प्रत्यक्ष विद्यालय संवाद: शैक्षणिक संदेह, अंक स्पष्टीकरण या उपस्थिति संबंधी प्रश्न सबमिट करें। संदेश सुरक्षित रूप से सहेजे जाते हैं।",
    drawerChildLabel: "लिंक्ड बच्चा / छात्र:",
    drawerSubjLabel: "विषय:",
    drawerCategoryLabel: "संदेश श्रेणी:",
    drawerQuestionLabel: "आपका प्रश्न या शंका:",
    drawerQuestionPlaceholder: "अपनी शंका या प्रश्न का विस्तार से वर्णन करें...",
    drawerSubmitBtn: "शिक्षक को प्रश्न भेजें",
    drawerHistoryTitle: "पूछे गए प्रश्नों का इतिहास",
    
    // Subjects
    subjMath: "गणित (Mathematics)",
    subjEng: "अंग्रेजी (English)",
    subjGuj: "गुजराती (Gujarati)",
    subjHin: "हिन्दी (Hindi)",
    subjEvs: "पर्यावरण (EVS)"
  }
};

/**
 * Internationalization Manager
 */
class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem(STORAGE_KEYS.LANG) || 'en';
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (!I18N_DICTIONARY[lang]) return;
    this.currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch (e) {}

    // Synchronize all language selectors on the page
    document.querySelectorAll('.site-lang-select').forEach(sel => {
      sel.value = lang;
    });

    this.applyTranslations();

    // Notify any active page listener (e.g. to re-render charts & tables)
    if (typeof window.onLanguageChanged === 'function') {
      window.onLanguageChanged(lang);
    }
  }

  t(key) {
    const dict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY.en;
    return dict[key] || I18N_DICTIONARY.en[key] || key;
  }

  tSubject(subject) {
    if (!subject) return '';
    const s = subject.toLowerCase();
    if (s.includes('math')) return this.t('subjMath');
    if (s.includes('eng')) return this.t('subjEng');
    if (s.includes('guj')) return this.t('subjGuj');
    if (s.includes('hin')) return this.t('subjHin');
    if (s.includes('evs')) return this.t('subjEvs');
    return subject;
  }

  tRole(role) {
    if (role === 'teacher') return this.t('roleTeacherTitle');
    if (role === 'principal') return this.t('rolePrincipalTitle');
    if (role === 'coordinator') return this.t('roleCoordTitle');
    if (role === 'parent') return this.t('roleParentTitle');
    return role;
  }

  applyTranslations() {
    // 1. Text elements
    document.querySelectorAll('[data-i18n]').forEach(elem => {
      const key = elem.getAttribute('data-i18n');
      const val = this.t(key);
      if (val) {
        elem.textContent = val;
      }
    });

    // 2. HTML elements (with bold/icons)
    document.querySelectorAll('[data-i18n-html]').forEach(elem => {
      const key = elem.getAttribute('data-i18n-html');
      const val = this.t(key);
      if (val) {
        elem.innerHTML = val;
      }
    });

    // 3. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
      const key = elem.getAttribute('data-i18n-placeholder');
      const val = this.t(key);
      if (val) {
        elem.placeholder = val;
      }
    });
  }
}

window.i18n = new I18nManager();

// Standard Subject & Topic Map
const SUBJECT_TOPICS = {
  "Mathematics": [
    "Fractions & Decimals",
    "Multiplication & Tables",
    "Division & Remainders",
    "Geometry & Shapes",
    "Word Problems & Logic"
  ],
  "English": [
    "Grammar & Tenses",
    "Vocabulary & Synonyms",
    "Reading Comprehension",
    "Spelling & Phonics",
    "Sentence Formation"
  ],
  "Gujarati": [
    "Kakko & Barakhadi",
    "Matra Identification & Usage",
    "Sentence Reading (વાક્ય વાચન)",
    "Vocabulary & Opposites (શબ્દ ભંડોળ)",
    "Paragraph Comprehension (પરિચ્છેદ સમજ)"
  ],
  "Hindi": [
    "Varnamala (स्वर एवं व्यंजन)",
    "Matra Application (मात्रा ज्ञान)",
    "Word Formation (शब्द निर्माण)",
    "Poem Recitation & Meaning",
    "Sentence Completion (वाक्य पूर्ति)"
  ],
  "EVS (Environmental Studies)": [
    "Plant Parts & Photosynthesis",
    "Water Cycle & Conservation",
    "Living vs Non-Living",
    "Community Helpers & Roles",
    "Food, Nutrition & Healthy Habits"
  ]
};

// Initial Realistic Student Dataset for Primary / Middle School
const INITIAL_STUDENTS = [
  {
    id: "ET-2026-401",
    name: "Aarav Patel",
    class: "Class 4",
    section: "A",
    rollNo: "01",
    parentName: "Kishorbhai Patel",
    parentEmail: "parent@edutrack.edu",
    attendance: 94,
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    remarks: "Good curiosity in class activities. Extra daily practice required in multiplication tables.",
    subjects: {
      "Mathematics": {
        total: 100, marks: 58,
        topics: {
          "Fractions & Decimals": 65,
          "Multiplication & Tables": 38, // Weak
          "Division & Remainders": 45,
          "Geometry & Shapes": 82,       // Strong
          "Word Problems & Logic": 60
        }
      },
      "English": {
        total: 100, marks: 76,
        topics: {
          "Grammar & Tenses": 62,
          "Vocabulary & Synonyms": 88,    // Strong
          "Reading Comprehension": 74,
          "Spelling & Phonics": 80,       // Strong
          "Sentence Formation": 76
        }
      },
      "Gujarati": {
        total: 100, marks: 54,
        topics: {
          "Kakko & Barakhadi": 78,
          "Matra Identification & Usage": 36, // Weak
          "Sentence Reading (વાક્ય વાચન)": 62,
          "Vocabulary & Opposites (શબ્દ ભંડોળ)": 50,
          "Paragraph Comprehension (પરિચ્છેદ સમજ)": 44
        }
      },
      "Hindi": {
        total: 100, marks: 66,
        topics: {
          "Varnamala (स्वर एवं व्यंजन)": 80,
          "Matra Application (मात्रा ज्ञान)": 52,
          "Word Formation (शब्द निर्माण)": 68,
          "Poem Recitation & Meaning": 82,
          "Sentence Completion (वाक्य पूर्ति)": 48
        }
      },
      "EVS (Environmental Studies)": {
        total: 100, marks: 84,
        topics: {
          "Plant Parts & Photosynthesis": 88,
          "Water Cycle & Conservation": 80,
          "Living vs Non-Living": 92,
          "Community Helpers & Roles": 85,
          "Food, Nutrition & Healthy Habits": 75
        }
      }
    }
  },
  {
    id: "ET-2026-402",
    name: "Diya Shah",
    class: "Class 4",
    section: "A",
    rollNo: "02",
    parentName: "Mehulbhai Shah",
    parentEmail: "mehul.shah@example.com",
    attendance: 98,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    remarks: "Consistently excellent performance across all competencies. Very disciplined and supportive.",
    subjects: {
      "Mathematics": {
        total: 100, marks: 88,
        topics: {
          "Fractions & Decimals": 85,
          "Multiplication & Tables": 92,
          "Division & Remainders": 86,
          "Geometry & Shapes": 94,
          "Word Problems & Logic": 83
        }
      },
      "English": {
        total: 100, marks: 86,
        topics: {
          "Grammar & Tenses": 84,
          "Vocabulary & Synonyms": 90,
          "Reading Comprehension": 88,
          "Spelling & Phonics": 88,
          "Sentence Formation": 80
        }
      },
      "Gujarati": {
        total: 100, marks: 85,
        topics: {
          "Kakko & Barakhadi": 92,
          "Matra Identification & Usage": 84,
          "Sentence Reading (વાક્ય વાચન)": 86,
          "Vocabulary & Opposites (શબ્દ ભંડોળ)": 82,
          "Paragraph Comprehension (પરિચ્છેદ સમજ)": 81
        }
      },
      "Hindi": {
        total: 100, marks: 82,
        topics: {
          "Varnamala (स्वर एवं व्यंजन)": 88,
          "Matra Application (मात्रा ज्ञान)": 80,
          "Word Formation (शब्द निर्माण)": 84,
          "Poem Recitation & Meaning": 82,
          "Sentence Completion (वाक्य पूर्ति)": 76
        }
      },
      "EVS (Environmental Studies)": {
        total: 100, marks: 90,
        topics: {
          "Plant Parts & Photosynthesis": 94,
          "Water Cycle & Conservation": 88,
          "Living vs Non-Living": 95,
          "Community Helpers & Roles": 92,
          "Food, Nutrition & Healthy Habits": 81
        }
      }
    }
  },
  {
    id: "ET-2026-403",
    name: "Jayesh Parmar",
    class: "Class 4",
    section: "A",
    rollNo: "03",
    parentName: "Sureshbhai Parmar",
    parentEmail: "suresh.parmar@example.com",
    attendance: 88,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    remarks: "Good effort in physical and oral activities. Struggles with division and sentence formation.",
    subjects: {
      "Mathematics": {
        total: 100, marks: 52,
        topics: {
          "Fractions & Decimals": 45,
          "Multiplication & Tables": 50,
          "Division & Remainders": 32, // Weak
          "Geometry & Shapes": 75,
          "Word Problems & Logic": 58
        }
      },
      "English": {
        total: 100, marks: 58,
        topics: {
          "Grammar & Tenses": 48,
          "Vocabulary & Synonyms": 65,
          "Reading Comprehension": 55,
          "Spelling & Phonics": 70,
          "Sentence Formation": 52
        }
      },
      "Gujarati": {
        total: 100, marks: 68,
        topics: {
          "Kakko & Barakhadi": 82,
          "Matra Identification & Usage": 64,
          "Sentence Reading (વાક્ય વાચન)": 72,
          "Vocabulary & Opposites (શબ્દ ભંડોળ)": 65,
          "Paragraph Comprehension (પરિચ્છેદ સમજ)": 57
        }
      },
      "Hindi": {
        total: 100, marks: 62,
        topics: {
          "Varnamala (स्वर एवं व्यंजन)": 75,
          "Matra Application (मात्रा ज्ञान)": 54,
          "Word Formation (शब्द निर्माण)": 66,
          "Poem Recitation & Meaning": 70,
          "Sentence Completion (वाक्य पूर्ति)": 45
        }
      },
      "EVS (Environmental Studies)": {
        total: 100, marks: 70,
        topics: {
          "Plant Parts & Photosynthesis": 74,
          "Water Cycle & Conservation": 68,
          "Living vs Non-Living": 78,
          "Community Helpers & Roles": 72,
          "Food, Nutrition & Healthy Habits": 58
        }
      }
    }
  },
  {
    id: "ET-2026-404",
    name: "Meera Solanki",
    class: "Class 4",
    section: "A",
    rollNo: "04",
    parentName: "Dineshbhai Solanki",
    parentEmail: "dinesh.solanki@example.com",
    attendance: 92,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    remarks: "Progressing well. Shows high interest in Environmental Studies and creative writing.",
    subjects: {
      "Mathematics": {
        total: 100, marks: 74,
        topics: {
          "Fractions & Decimals": 72,
          "Multiplication & Tables": 78,
          "Division & Remainders": 68,
          "Geometry & Shapes": 82,
          "Word Problems & Logic": 70
        }
      },
      "English": {
        total: 100, marks: 78,
        topics: {
          "Grammar & Tenses": 74,
          "Vocabulary & Synonyms": 82,
          "Reading Comprehension": 78,
          "Spelling & Phonics": 80,
          "Sentence Formation": 76
        }
      },
      "Gujarati": {
        total: 100, marks: 72,
        topics: {
          "Kakko & Barakhadi": 84,
          "Matra Identification & Usage": 70,
          "Sentence Reading (વાક્ય વાચન)": 75,
          "Vocabulary & Opposites (શબ્દ ભંડોળ)": 68,
          "Paragraph Comprehension (પરિચ્છેદ સમજ)": 63
        }
      },
      "Hindi": {
        total: 100, marks: 70,
        topics: {
          "Varnamala (स्वर एवं व्यंजन)": 80,
          "Matra Application (मात्रा ज्ञान)": 65,
          "Word Formation (शब्द निर्माण)": 72,
          "Poem Recitation & Meaning": 75,
          "Sentence Completion (वाक्य पूर्ति)": 58
        }
      },
      "EVS (Environmental Studies)": {
        total: 100, marks: 86,
        topics: {
          "Plant Parts & Photosynthesis": 90,
          "Water Cycle & Conservation": 84,
          "Living vs Non-Living": 88,
          "Community Helpers & Roles": 88,
          "Food, Nutrition & Healthy Habits": 80
        }
      }
    }
  },
  {
    id: "ET-2026-405",
    name: "Rohan Vaghela",
    class: "Class 4",
    section: "A",
    rollNo: "05",
    parentName: "Bharatbhai Vaghela",
    parentEmail: "bharat.vaghela@example.com",
    attendance: 84,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    remarks: "Urgent remedial attention needed in foundational numeracy and Hindi matras.",
    subjects: {
      "Mathematics": {
        total: 100, marks: 36, // Red (<40%)
        topics: {
          "Fractions & Decimals": 30, // Weak
          "Multiplication & Tables": 28, // Weak
          "Division & Remainders": 32, // Weak
          "Geometry & Shapes": 52,
          "Word Problems & Logic": 38  // Weak
        }
      },
      "English": {
        total: 100, marks: 52,
        topics: {
          "Grammar & Tenses": 42,
          "Vocabulary & Synonyms": 60,
          "Reading Comprehension": 48,
          "Spelling & Phonics": 56,
          "Sentence Formation": 54
        }
      },
      "Gujarati": {
        total: 100, marks: 48,
        topics: {
          "Kakko & Barakhadi": 62,
          "Matra Identification & Usage": 38, // Weak
          "Sentence Reading (વાક્ય વાચન)": 50,
          "Vocabulary & Opposites (શબ્દ ભંડોળ)": 48,
          "Paragraph Comprehension (પરિચ્છેદ સમજ)": 42
        }
      },
      "Hindi": {
        total: 100, marks: 38, // Red (<40%)
        topics: {
          "Varnamala (स्वर एवं व्यंजन)": 55,
          "Matra Application (मात्रा ज्ञान)": 28, // Weak
          "Word Formation (शब्द निर्माण)": 34, // Weak
          "Poem Recitation & Meaning": 45,
          "Sentence Completion (वाक्य पूर्ति)": 28  // Weak
        }
      },
      "EVS (Environmental Studies)": {
        total: 100, marks: 62,
        topics: {
          "Plant Parts & Photosynthesis": 65,
          "Water Cycle & Conservation": 58,
          "Living vs Non-Living": 66,
          "Community Helpers & Roles": 64,
          "Food, Nutrition & Healthy Habits": 57
        }
      }
    }
  },
  {
    id: "ET-2026-501",
    name: "Pooja Patel",
    class: "Class 5",
    section: "A",
    rollNo: "01",
    parentName: "Kishorbhai Patel",
    parentEmail: "parent@edutrack.edu", // Second child linked to same demo parent
    attendance: 96,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    remarks: "Diligent student with strong language comprehension. Shows great focus in science projects.",
    subjects: {
      "Mathematics": {
        total: 100, marks: 78,
        topics: {
          "Fractions & Decimals": 75,
          "Multiplication & Tables": 82,
          "Division & Remainders": 70,
          "Geometry & Shapes": 86,
          "Word Problems & Logic": 77
        }
      },
      "English": {
        total: 100, marks: 84,
        topics: {
          "Grammar & Tenses": 80,
          "Vocabulary & Synonyms": 86,
          "Reading Comprehension": 85,
          "Spelling & Phonics": 88,
          "Sentence Formation": 81
        }
      },
      "Gujarati": {
        total: 100, marks: 80,
        topics: {
          "Kakko & Barakhadi": 88,
          "Matra Identification & Usage": 78,
          "Sentence Reading (વાક્ય વાચન)": 84,
          "Vocabulary & Opposites (શબ્દ ભંડોળ)": 78,
          "Paragraph Comprehension (પરિચ્છેદ સમજ)": 72
        }
      },
      "Hindi": {
        total: 100, marks: 76,
        topics: {
          "Varnamala (स्वर एवं व्यंजन)": 84,
          "Matra Application (मात्रा ज्ञान)": 72,
          "Word Formation (शब्द निर्माण)": 78,
          "Poem Recitation & Meaning": 80,
          "Sentence Completion (वाक्य पूर्ति)": 66
        }
      },
      "EVS (Environmental Studies)": {
        total: 100, marks: 88,
        topics: {
          "Plant Parts & Photosynthesis": 92,
          "Water Cycle & Conservation": 86,
          "Living vs Non-Living": 90,
          "Community Helpers & Roles": 88,
          "Food, Nutrition & Healthy Habits": 84
        }
      }
    }
  },
  {
    id: "ET-2026-601",
    name: "Tirth Dave",
    class: "Class 6",
    section: "B",
    rollNo: "07",
    parentName: "Jigneshbhai Dave",
    parentEmail: "jignesh.dave@example.com",
    attendance: 89,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    remarks: "Good grasp of spatial geometry. Work on word problems needed.",
    subjects: {
      "Mathematics": {
        total: 100, marks: 66,
        topics: {
          "Fractions & Decimals": 62,
          "Multiplication & Tables": 74,
          "Division & Remainders": 60,
          "Geometry & Shapes": 78,
          "Word Problems & Logic": 56
        }
      },
      "English": {
        total: 100, marks: 70,
        topics: {
          "Grammar & Tenses": 68,
          "Vocabulary & Synonyms": 74,
          "Reading Comprehension": 70,
          "Spelling & Phonics": 72,
          "Sentence Formation": 66
        }
      },
      "Gujarati": {
        total: 100, marks: 74,
        topics: {
          "Kakko & Barakhadi": 82,
          "Matra Identification & Usage": 70,
          "Sentence Reading (વાક્ય વાચન)": 76,
          "Vocabulary & Opposites (શબ્દ ભંડોળ)": 72,
          "Paragraph Comprehension (પરિચ્છેદ સમજ)": 70
        }
      },
      "Hindi": {
        total: 100, marks: 68,
        topics: {
          "Varnamala (स्वर एवं व्यंजन)": 76,
          "Matra Application (मात्रा ज्ञान)": 64,
          "Word Formation (शब्द निर्माण)": 70,
          "Poem Recitation & Meaning": 72,
          "Sentence Completion (वाक्य पूर्ति)": 58
        }
      },
      "EVS (Environmental Studies)": {
        total: 100, marks: 80,
        topics: {
          "Plant Parts & Photosynthesis": 84,
          "Water Cycle & Conservation": 78,
          "Living vs Non-Living": 85,
          "Community Helpers & Roles": 80,
          "Food, Nutrition & Healthy Habits": 73
        }
      }
    }
  }
];

// Initial Coordinator Saved Advice
const INITIAL_COORDINATOR_ADVICE = [
  {
    id: "ADV-01",
    class: "Class 4",
    coordinatorName: "Shri R.K. Mehta (BRC Coordinator)",
    date: "12-Oct-2026",
    advice: "Conduct 15-minute daily abacus bead and base-10 block sessions for students scoring below 40% in Mathematics multiplication and division. Focus on peer-assisted learning.",
    status: "Implemented"
  },
  {
    id: "ADV-02",
    class: "Class 4",
    coordinatorName: "Shri R.K. Mehta (BRC Coordinator)",
    date: "06-Oct-2026",
    advice: "Organize visual Barakhadi audio rhyme drills during morning language assembly to assist Gujarati matra recognition.",
    status: "In Progress"
  },
  {
    id: "ADV-03",
    class: "Class 5",
    coordinatorName: "Shri R.K. Mehta (BRC Coordinator)",
    date: "28-Sep-2026",
    advice: "Implement CUBES problem-solving strategy cards for multi-step word problems in Class 5 Mathematics.",
    status: "Reviewed"
  }
];

// Initial Parent Doubts / Questions
const INITIAL_PARENT_DOUBTS = [
  {
    id: "DOUBT-101",
    studentId: "ET-2026-401",
    studentName: "Aarav Patel",
    parentName: "Kishorbhai Patel",
    subject: "Mathematics",
    category: "Marks Clarification",
    question: "Aarav scored 38% in multiplication tables quiz. How can we support his table practice at home?",
    status: "Replied",
    reply: "Dear Parent, please practice skip counting by 3s and 4s using daily objects. He has also been assigned 10-minute abacus sessions in school.",
    date: "14-Oct-2026 10:30 AM"
  },
  {
    id: "DOUBT-102",
    studentId: "ET-2026-401",
    studentName: "Aarav Patel",
    parentName: "Kishorbhai Patel",
    subject: "Gujarati",
    category: "Academic Doubt",
    question: "He confuses short and long 'i' matras (હ્રસ્વ vs દીર્ઘ). Can teacher recommend extra storybooks?",
    status: "Pending",
    reply: null,
    date: "15-Oct-2026 09:15 AM"
  }
];

/**
 * Main EduTrack Data Controller
 */
class EduTrackDataStore {
  constructor() {
    this.students = this.load(STORAGE_KEYS.DATA, INITIAL_STUDENTS);
    this.advice = this.load(STORAGE_KEYS.ADVICE, INITIAL_COORDINATOR_ADVICE);
    this.doubts = this.load(STORAGE_KEYS.DOUBTS, INITIAL_PARENT_DOUBTS);
    this.thresholds = this.load(STORAGE_KEYS.THRESHOLDS, DEFAULT_THRESHOLDS);
    this.apiBase = window.EDUTRACK_API_URL || 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:5000' : 
      (window.location.protocol.startsWith('http') ? '' : 'http://localhost:5000'));
    this.isBackendOnline = false;
  }

  getAuthHeaders() {
    const token = sessionStorage.getItem('edutrack_jwt_token') || localStorage.getItem('edutrack_jwt_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  async checkBackend() {
    try {
      const res = await fetch(`${this.apiBase}/api/status`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        this.isBackendOnline = true;
        this.updateBackendStatusUI(true, `Backend Live (${data.students_count || this.students.length} students)`);
        await this.syncRemoteData();
        return true;
      }
    } catch (e) {
      // Backend not running on default port or file:// without server
    }
    this.isBackendOnline = false;
    this.updateBackendStatusUI(false, "Local Standalone Mode");
    return false;
  }

  async syncRemoteData() {
    try {
      const headers = this.getAuthHeaders();
      // 1. Sync students
      const resStudents = await fetch(`${this.apiBase}/api/v1/students`, { headers, cache: 'no-store' });
      if (resStudents.ok) {
        const json = await resStudents.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          this.students = json.data;
          this.save(STORAGE_KEYS.DATA, this.students);
        }
      }
      // 2. Sync advice
      const resAdvice = await fetch(`${this.apiBase}/api/v1/advice`, { headers, cache: 'no-store' });
      if (resAdvice.ok) {
        const json = await resAdvice.json();
        if (json.data && Array.isArray(json.data)) {
          this.advice = json.data;
          this.save(STORAGE_KEYS.ADVICE, this.advice);
        }
      }
      // 3. Sync doubts
      const resDoubts = await fetch(`${this.apiBase}/api/v1/doubts`, { headers, cache: 'no-store' });
      if (resDoubts.ok) {
        const json = await resDoubts.json();
        if (json.data && Array.isArray(json.data)) {
          this.doubts = json.data;
          this.save(STORAGE_KEYS.DOUBTS, this.doubts);
        }
      }
      // 4. Sync thresholds
      const resThresh = await fetch(`${this.apiBase}/api/v1/settings/thresholds`, { cache: 'no-store' });
      if (resThresh.ok) {
        const json = await resThresh.json();
        if (json.data) {
          this.thresholds = json.data;
          this.save(STORAGE_KEYS.THRESHOLDS, this.thresholds);
        }
      }
    } catch (err) {
      console.warn("EduTrack remote sync skipped:", err);
    }
  }

  updateBackendStatusUI(online, text) {
    document.querySelectorAll('.backend-status-pill').forEach(pill => {
      pill.className = `backend-status-pill ${online ? 'online' : 'offline'}`;
      pill.innerHTML = `<i class="fa-solid fa-${online ? 'circle-check' : 'circle-exclamation'}"></i> <span>${text}</span>`;
    });
  }

  async fetchStudents() {
    const isUp = await this.checkBackend();
    if (isUp) {
      try {
        const res = await fetch(`${this.apiBase}/api/students`, { cache: 'no-store' });
        if (res.ok) {
          const remoteStudents = await res.json();
          if (Array.isArray(remoteStudents) && remoteStudents.length > 0) {
            this.students = remoteStudents;
            this.save(STORAGE_KEYS.DATA, this.students);
            return this.students;
          }
        }
      } catch (e) {
        console.warn("Backend fetch failed, using local storage:", e);
      }
    }
    return this.students;
  }

  async addStudent(studentData) {
    // If backend is online, persist via REST API
    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${this.apiBase}/api/students`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(studentData)
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData.student) {
            studentData = resData.student;
          }
        }
      } catch (e) {
        console.warn("Failed to post student to backend:", e);
      }
    }

    // Always update local memory and cache
    const existingIdx = this.students.findIndex(s => s.id === studentData.id);
    if (existingIdx >= 0) {
      this.students[existingIdx] = studentData;
    } else {
      this.students.push(studentData);
    }
    this.save(STORAGE_KEYS.DATA, this.students);
    return studentData;
  }

  async updateStudent(studentId, updatedFields) {
    if (this.isBackendOnline) {
      try {
        await fetch(`${this.apiBase}/api/students/${encodeURIComponent(studentId)}`, {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(updatedFields)
        });
      } catch (e) {
        console.warn("Failed to update student on backend:", e);
      }
    }

    const student = this.getStudentById(studentId);
    if (student) {
      Object.assign(student, updatedFields);
      this.save(STORAGE_KEYS.DATA, this.students);
      return student;
    }
    return null;
  }

  async deleteStudent(studentId) {
    if (this.isBackendOnline) {
      try {
        await fetch(`${this.apiBase}/api/students/${encodeURIComponent(studentId)}`, {
          method: 'DELETE',
          headers: this.getAuthHeaders()
        });
      } catch (e) {
        console.warn("Failed to delete student on backend:", e);
      }
    }

    const initLen = this.students.length;
    this.students = this.students.filter(s => s.id !== studentId);
    this.save(STORAGE_KEYS.DATA, this.students);
    return this.students.length < initLen;
  }

  async importBulkStudents(studentsList) {
    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${this.apiBase}/api/students/bulk`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(studentsList)
        });
        if (res.ok) {
          await this.fetchStudents();
          return true;
        }
      } catch (e) {
        console.warn("Bulk import to backend failed:", e);
      }
    }

    // Local fallback
    studentsList.forEach(item => {
      const idx = this.students.findIndex(s => s.id === item.id);
      if (idx >= 0) this.students[idx] = item;
      else this.students.push(item);
    });
    this.save(STORAGE_KEYS.DATA, this.students);
    return true;
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn(`Error loading key ${key}`, e);
    }
    this.save(key, fallback);
    return JSON.parse(JSON.stringify(fallback));
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving key ${key}`, e);
    }
  }

  getStudentsByClass(className) {
    return this.students.filter(s => s.class === className);
  }

  getStudentById(id) {
    return this.students.find(s => s.id === id);
  }

  getStudentsByParentEmail(email) {
    return this.students.filter(s => s.parentEmail.toLowerCase() === email.toLowerCase());
  }

  async updateStudentMarks(studentId, subject, updatedTopics, overallMarks, remarks) {
    const student = this.getStudentById(studentId);
    if (!student) return false;

    if (!student.subjects[subject]) {
      student.subjects[subject] = { total: 100, marks: 0, topics: {} };
    }

    student.subjects[subject].topics = updatedTopics;
    student.subjects[subject].marks = Number(overallMarks);
    if (remarks) student.remarks = remarks;

    this.save(STORAGE_KEYS.DATA, this.students);

    // Sync to backend if available
    if (this.isBackendOnline) {
      try {
        await fetch(`${this.apiBase}/api/students/${encodeURIComponent(studentId)}`, {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ subjects: student.subjects, remarks: student.remarks })
        });
      } catch (e) {
        console.warn("Backend update failed:", e);
      }
    }

    return true;
  }

  async addCoordinatorAdvice(className, adviceText) {
    const newAdvice = {
      id: "ADV-" + Date.now().toString().slice(-4),
      class: className,
      coordinatorName: "Shri R.K. Mehta (BRC Coordinator)",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      advice: adviceText,
      status: "Submitted"
    };

    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${this.apiBase}/api/v1/advice`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ className, advice: adviceText })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) Object.assign(newAdvice, json.data);
        }
      } catch (e) {
        console.warn("Could not post advice to backend:", e);
      }
    }

    this.advice.unshift(newAdvice);
    this.save(STORAGE_KEYS.ADVICE, this.advice);
    return newAdvice;
  }

  async addParentDoubt(studentId, subject, category, questionText) {
    const student = this.getStudentById(studentId) || this.students[0];
    const newDoubt = {
      id: "DOUBT-" + Date.now().toString().slice(-4),
      studentId: student.id,
      studentName: student.name,
      parentName: student.parentName,
      parentEmail: student.parentEmail,
      subject: subject,
      category: category,
      question: questionText,
      status: "Pending",
      reply: null,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${this.apiBase}/api/v1/doubts`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: JSON.stringify({
            studentId: student.id,
            subject,
            category,
            question: questionText,
            parentName: student.parentName,
            parentEmail: student.parentEmail
          })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) Object.assign(newDoubt, json.data);
        }
      } catch (e) {
        console.warn("Could not post doubt to backend:", e);
      }
    }

    this.doubts.unshift(newDoubt);
    this.save(STORAGE_KEYS.DOUBTS, this.doubts);
    return newDoubt;
  }

  /**
   * Configurable Performance Classifier
   * Uses EXACT required colors:
   * poor: #E06666, average: #F6B26B, EXCELLENT: #6AA84F
   */
  classifyPerformance(percentage) {
    const p = Math.round(Number(percentage));
    const lang = window.i18n ? window.i18n.getLang() : 'en';

    if (p >= this.thresholds.excellent) {
      return {
        category: window.i18n ? window.i18n.t('statusExcellent') : 'Excellent',
        statusKey: 'green',
        badgeClass: 'badge-green',
        icon: 'fa-circle-check',
        color: '#6AA84F', // EXCELLENT - #6AA84F
        label: `${window.i18n ? window.i18n.t('statusExcellent') : 'Excellent'} (${p}%)`
      };
    } else if (p >= this.thresholds.average) {
      return {
        category: window.i18n ? window.i18n.t('statusAverage') : 'Average',
        statusKey: 'yellow',
        badgeClass: 'badge-yellow',
        icon: 'fa-triangle-exclamation',
        color: '#F6B26B', // average - #F6B26B
        label: `${window.i18n ? window.i18n.t('statusAverage') : 'Average'} (${p}%)`
      };
    } else {
      return {
        category: window.i18n ? window.i18n.t('statusNeedsHelp') : 'Needs More Improvement',
        statusKey: 'red',
        badgeClass: 'badge-red',
        icon: 'fa-circle-exclamation',
        color: '#E06666', // poor - #E06666
        label: `${window.i18n ? window.i18n.t('statusNeedsHelp') : 'Needs Improvement'} (${p}%)`
      };
    }
  }

  generatePersonalizedSuggestions(student, subjectName) {
    const subjData = student.subjects[subjectName];
    const lang = window.i18n ? window.i18n.getLang() : 'en';

    if (!subjData) {
      if (lang === 'gu') return ["નિયમિત પુનરાવર્તન અને વર્ગમાં સક્રિય ભાગીદારી ચાલુ રાખો."];
      if (lang === 'hi') return ["नियमित पुनरावृत्ति और कक्षा में सक्रिय भागीदारी जारी रखें।"];
      return ["Continue routine revision and active participation in class."];
    }

    const suggestions = [];
    const weakTopics = [];
    const strongTopics = [];

    Object.entries(subjData.topics).forEach(([topic, score]) => {
      if (score < this.thresholds.average) {
        weakTopics.push({ topic, score });
      } else if (score >= this.thresholds.excellent) {
        strongTopics.push({ topic, score });
      }
    });

    if (weakTopics.length > 0) {
      weakTopics.forEach(wt => {
        if (wt.topic.includes("Multiplication")) {
          if (lang === 'gu') suggestions.push(`પ્રાથમિકતા: ${wt.score}% સ્કોર સુધારવા માટે દરરોજ ૧૦ મિનિટ વિઝ્યુઅલ ફ્લેશકાર્ડ ગુણાકાર ડ્રિલ કરો.`);
          else if (lang === 'hi') suggestions.push(`प्राथमिकता: ${wt.score}% स्कोर सुधारने के लिए प्रतिदिन 10 मिनट विजुअल फ्लैशकार्ड गुणा अभ्यास करें।`);
          else suggestions.push(`Priority: Daily 10-minute flashcard multiplication drills with visual dot matrices to resolve the ${wt.score}% score.`);
        } else if (wt.topic.includes("Division")) {
          if (lang === 'gu') suggestions.push(`ભાગાકારની સરખી વહેંચણી સમજવા માટે ૧૦-૨૦ મણકા કે બટનનો ઉપયોગ કરીને સમૂહ બનાવવાની રમત રમો.`);
          else if (lang === 'hi') suggestions.push(`भाग की अवधारणा समझने के लिए 10-20 मोतियों या बटनों से समूह बनाने का खेल खेलें।`);
          else suggestions.push(`Practice grouping 10-20 beads into equal bowls to reinforce sharing concept before formal long division.`);
        } else if (wt.topic.includes("Matra")) {
          if (lang === 'gu') suggestions.push(`રોજ સાંજે બાળવાર્તામાંથી હ્રસ્વ 'િ' અને દીર્ઘ 'ી' વાળા ૫ શબ્દો રંગીન પેન્સિલથી હાઇલાઇટ કરો.`);
          else if (lang === 'hi') suggestions.push(`प्रतिदिन शाम को बाल कहानी से छोटी 'ि' और बड़ी 'ी' मात्रा वाले 5 शब्द रेखांकित करें।`);
          else suggestions.push(`Color-highlight short and long matras in 5 sentences from daily Gujarati/Hindi reader every evening.`);
        } else if (wt.topic.includes("Grammar")) {
          if (lang === 'gu') suggestions.push(`કર્તા-ક્રિયાપદ સંબંધને મજબૂત કરવા માટે દરરોજ ૫ સરળ વાક્ય સુધારણા સ્વાધ્યાય ઉકેલો.`);
          else if (lang === 'hi') suggestions.push(`कर्ता-क्रिया संबंध सुधारने के लिए प्रतिदिन 5 सरल वाक्य सुधार अभ्यास हल करें।`);
          else suggestions.push(`Solve 5 sentence correction exercises daily focusing on subject-verb agreement.`);
        } else if (wt.topic.includes("Fractions")) {
          if (lang === 'gu') suggestions.push(`અડધો (૧/૨), ત્રીજો (૧/૩) અને પા (૧/૪) ભાગ સમજવા કાગળની પટ્ટીઓ અથવા રોટલીના ટુકડાનો ઉપયોગ કરો.`);
          else if (lang === 'hi') suggestions.push(`आधा (1/2) और चौथाई (1/4) भाग समझने के लिए कागज की पट्टियों या रोटी का उपयोग करें।`);
          else suggestions.push(`Use pizza slices or folded paper strips to visualize halves, thirds, and quarters.`);
        } else {
          if (lang === 'gu') suggestions.push(`${wt.topic} માં પાયાના ખ્યાલો સ્પષ્ટ કરવા SCERT વર્કબુક કાર્ડનો ઉપયોગ કરો.`);
          else if (lang === 'hi') suggestions.push(`${wt.topic} में बुनियादी अवधारणाओं को स्पष्ट करने के लिए अभ्यास पुस्तिका का उपयोग करें।`);
          else suggestions.push(`Review foundational concepts in ${wt.topic} using SCERT primary workbook activity sheets.`);
        }
      });
    }

    if (strongTopics.length > 0) {
      if (lang === 'gu') suggestions.push(`${strongTopics.map(s => s.topic).slice(0, 2).join(' અને ')} માં ઉત્તમ પ્રદર્શન (${strongTopics[0].score}%). મિત્રોને શીખવવાની જવાબદારી આપો.`);
      else if (lang === 'hi') suggestions.push(`${strongTopics.map(s => s.topic).slice(0, 2).join(' और ')} में सराहनीय प्रदर्शन (${strongTopics[0].score}%). सहपाठियों की मदद करने को प्रेरित करें।`);
      else suggestions.push(`Commendable strength in ${strongTopics.map(s => s.topic).slice(0, 2).join(' & ')} (${strongTopics[0].score}%). Assign peer-mentoring tasks to build leadership.`);
    }

    if (suggestions.length === 0) {
      if (lang === 'gu') suggestions.push(`પ્રદર્શન સ્થિર છે (${subjData.marks}%). સતત અભ્યાસ જાળવી રાખો.`);
      else if (lang === 'hi') suggestions.push(`प्रदर्शन स्थिर है (${subjData.marks}%). निरंतर अध्ययन जारी रखें।`);
      else suggestions.push(`Performance is steady (${subjData.marks}%). Maintain consistent study schedules and weekly self-assessment.`);
    }

    return suggestions;
  }
}

// Global Singleton Data Instance
window.EduTrack = new EduTrackDataStore();

/**
 * Authentication Helper
 */
const Auth = {
  getRole() {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) || localStorage.getItem(STORAGE_KEYS.AUTH) || null;
  },
  login(role) {
    sessionStorage.setItem(STORAGE_KEYS.AUTH, role);
    localStorage.setItem(STORAGE_KEYS.AUTH, role);
  },
  logout() {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    window.location.href = 'index.html';
  }
};

/**
 * GLOBAL PERSISTENT PARENT DOUBT SYSTEM
 * Mounts floating button & chat drawer across every page with language support
 */
function mountGlobalParentDoubtSystem() {
  if (document.getElementById('floatingAskBtn')) return;

  const btn = document.createElement('button');
  btn.id = 'floatingAskBtn';
  btn.className = 'floating-ask-btn';
  btn.title = 'Ask a Question / Contact Teacher';
  btn.innerHTML = `
    <i class="fa-solid fa-comments"></i>
    <span data-i18n="askTeacherBtn">${window.i18n.t('askTeacherBtn')}</span>
  `;
  document.body.appendChild(btn);

  const overlay = document.createElement('div');
  overlay.id = 'doubtDrawerOverlay';
  overlay.className = 'doubt-drawer-overlay';

  const drawer = document.createElement('div');
  drawer.id = 'doubtDrawer';
  drawer.className = 'doubt-drawer';
  drawer.innerHTML = `
    <div class="doubt-drawer-header">
      <h3><i class="fa-solid fa-circle-question"></i> <span data-i18n="drawerTitle">${window.i18n.t('drawerTitle')}</span></h3>
      <button id="closeDoubtDrawerBtn" style="background:transparent; border:none; color:white; font-size:1.4rem; cursor:pointer;">&times;</button>
    </div>
    <div class="doubt-drawer-body">
      <div style="background:#f0fdfa; padding:12px 16px; border-radius:var(--radius-md); border-left:4px solid var(--teal-primary); margin-bottom:18px; font-size:0.84rem; color:#0f766e;">
        <strong><i class="fa-solid fa-lock"></i> <span data-i18n="drawerDisclaimer">${window.i18n.t('drawerDisclaimer')}</span></strong>
      </div>

      <form id="globalDoubtForm">
        <div class="form-group">
          <label for="doubtStudentSelect" data-i18n="drawerChildLabel">${window.i18n.t('drawerChildLabel')}</label>
          <select id="doubtStudentSelect" class="form-control" required>
            <option value="ET-2026-401">Aarav Patel (Class 4-A, Roll #01)</option>
            <option value="ET-2026-501">Pooja Patel (Class 5-A, Roll #01)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="doubtSubjectSelect" data-i18n="drawerSubjLabel">${window.i18n.t('drawerSubjLabel')}</label>
          <select id="doubtSubjectSelect" class="form-control" required>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Hindi">Hindi</option>
            <option value="EVS (Environmental Studies)">EVS (Environmental Studies)</option>
            <option value="General / Administration">General / School Administrative</option>
          </select>
        </div>

        <div class="form-group">
          <label for="doubtCategorySelect" data-i18n="drawerCategoryLabel">${window.i18n.t('drawerCategoryLabel')}</label>
          <select id="doubtCategorySelect" class="form-control" required>
            <option value="Academic Doubt">Academic Doubt / Weakness</option>
            <option value="Marks Clarification">Marks Clarification</option>
            <option value="Homework">Homework & Practice Inquiry</option>
            <option value="Attendance">Attendance Inquiry</option>
            <option value="Other">Other Specific Question</option>
          </select>
        </div>

        <div class="form-group">
          <label for="doubtQuestionText" data-i18n="drawerQuestionLabel">${window.i18n.t('drawerQuestionLabel')}</label>
          <textarea id="doubtQuestionText" class="form-control" rows="4" placeholder="${window.i18n.t('drawerQuestionPlaceholder')}" data-i18n-placeholder="drawerQuestionPlaceholder" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width:100%;">
          <i class="fa-solid fa-paper-plane"></i> <span data-i18n="drawerSubmitBtn">${window.i18n.t('drawerSubmitBtn')}</span>
        </button>
      </form>

      <hr style="margin:24px 0; border:0; border-top:1px solid var(--border-color);">

      <h4 style="font-size:1rem; font-weight:700; color:var(--primary-navy); margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
        <span><i class="fa-solid fa-clock-rotate-left"></i> <span data-i18n="drawerHistoryTitle">${window.i18n.t('drawerHistoryTitle')}</span></span>
        <span class="badge badge-gray" id="doubtCountBadge">0</span>
      </h4>

      <div id="doubtHistoryContainer">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  const openDrawer = () => {
    overlay.classList.add('active');
    drawer.classList.add('open');
    renderDoubtHistory();
  };

  const closeDrawer = () => {
    overlay.classList.remove('active');
    drawer.classList.remove('open');
  };

  btn.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.getElementById('closeDoubtDrawerBtn').addEventListener('click', closeDrawer);

  const form = document.getElementById('globalDoubtForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentId = document.getElementById('doubtStudentSelect').value;
    const subject = document.getElementById('doubtSubjectSelect').value;
    const category = document.getElementById('doubtCategorySelect').value;
    const text = document.getElementById('doubtQuestionText').value.trim();

    if (!text) return;

    window.EduTrack.addParentDoubt(studentId, subject, category, text);
    form.reset();
    renderDoubtHistory();
    showToast(window.i18n.getLang() === 'gu' ? 'તમારો પ્રશ્ન સફળતાપૂર્વક સાચવવામાં આવ્યો છે!' : (window.i18n.getLang() === 'hi' ? 'आपका प्रश्न सफलतापूर्वक सहेज लिया गया है!' : 'Your question was saved and queued for school review!'), 'success');
  });

  renderDoubtHistory();
}

function renderDoubtHistory() {
  const container = document.getElementById('doubtHistoryContainer');
  if (!container) return;

  const doubts = window.EduTrack.doubts;
  const countBadge = document.getElementById('doubtCountBadge');
  if (countBadge) countBadge.textContent = `${doubts.length}`;

  if (doubts.length === 0) {
    container.innerHTML = `<p style="font-size:0.84rem; color:var(--text-muted); text-align:center; padding:16px;">${window.i18n.getLang() === 'gu' ? 'હજુ સુધી કોઈ પ્રશ્ન પૂછવામાં આવ્યો નથી.' : (window.i18n.getLang() === 'hi' ? 'अभी तक कोई प्रश्न दर्ज नहीं किया गया है।' : 'No doubts submitted yet.')}</p>`;
    return;
  }

  container.innerHTML = doubts.map(d => {
    let statusClass = 'status-pending';
    let statusLabel = d.status;
    if (d.status === 'Replied') {
      statusClass = 'status-replied';
      statusLabel = window.i18n.getLang() === 'gu' ? 'જવાબ આપ્યો' : (window.i18n.getLang() === 'hi' ? 'उत्तर दिया' : 'Replied');
    } else if (d.status === 'Resolved') {
      statusClass = 'status-resolved';
      statusLabel = window.i18n.getLang() === 'gu' ? 'ઉકેલાઈ ગયું' : (window.i18n.getLang() === 'hi' ? 'समाधान हुआ' : 'Resolved');
    } else {
      statusLabel = window.i18n.getLang() === 'gu' ? 'બાકી' : (window.i18n.getLang() === 'hi' ? 'प्रतीक्षारत' : 'Pending');
    }

    return `
      <div class="doubt-history-item">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <strong style="font-size:0.88rem; color:var(--primary-navy);">${d.subject} &bull; ${d.category}</strong>
          <span class="doubt-status-pill ${statusClass}">${statusLabel}</span>
        </div>
        <p style="font-size:0.84rem; color:#334155; margin-bottom:8px;">"${d.question}"</p>
        <div style="font-size:0.75rem; color:var(--text-light); display:flex; justify-content:space-between;">
          <span>Student: ${d.studentName}</span>
          <span>${d.date}</span>
        </div>
        ${d.reply ? `
          <div style="margin-top:10px; padding:8px 12px; background:#dcfce7; border-radius:var(--radius-sm); font-size:0.82rem; color:#166534;">
            <strong><i class="fa-solid fa-reply"></i> ${window.i18n.getLang() === 'gu' ? 'શિક્ષકનો જવાબ:' : (window.i18n.getLang() === 'hi' ? 'शिक्षक का उत्तर:' : 'Teacher Reply:')}</strong> ${d.reply}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

/**
 * Toast Notification Dispatcher
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'warning') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Global Palette Helper (Standard User Requested Palette)
window.EduTrackColors = {
  excellent: '#6AA84F', // EXCELLENT-#6AA84F
  average: '#F6B26B',   // average-#F6B26B
  poor: '#E06666'       // poor-#E06666
};

// Set Chart.js standard clean theme colors
if (window.Chart) {
  Chart.defaults.color = '#64748b';
  Chart.defaults.borderColor = '#e2e8f0';
}

// Automatically bind language change listeners and initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check Backend and Fetch Students
  if (window.EduTrack && typeof window.EduTrack.fetchStudents === 'function') {
    window.EduTrack.fetchStudents().then(() => {
      if (typeof window.onDataLoaded === 'function') {
        window.onDataLoaded();
      }
    });
  }

  // Bind all language selectors
  document.querySelectorAll('.site-lang-select').forEach(sel => {
    sel.value = window.i18n.getLang();
    sel.addEventListener('change', (e) => {
      window.i18n.setLang(e.target.value);
    });
  });

  // Apply initial translations
  window.i18n.applyTranslations();

  // Mount global persistent doubt chat drawer
  mountGlobalParentDoubtSystem();
});

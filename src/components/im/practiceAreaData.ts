export interface PracticeAreaData {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  heroImage: string;
  color: string;
  overview: string;
  keyServices: { title: string; description: string }[];
  processSteps: { step: number; title: string; description: string }[];
  caseStudies: { title: string; outcome: string; result: string; category: string }[];
  faqs: { question: string; answer: string }[];
  relatedAreas: string[];
  stats: { label: string; value: string }[];
}

export const practiceAreasData: PracticeAreaData[] = [
  {
    slug: "family-law",
    title: "Family Law",
    tagline: "Protecting your family's future with compassion and legal excellence",
    icon: "Heart",
    heroImage: "/images/pegasus-menlyn-maine.jpg",
    color: "#C6A84B",
    overview:
      "Family disputes are among the most emotionally challenging experiences anyone can face. At IM Attorneys, we understand that behind every legal matter lies a family whose well-being, security, and future are at stake. Our family law team combines deep legal expertise with genuine compassion, guiding clients through some of the most difficult transitions of their lives with dignity, discretion, and unwavering dedication.\n\nSouth African family law is governed by a complex framework including the Divorce Act 70 of 1979, the Children's Act 38 of 2005, the Maintenance Act 99 of 1998, and the Domestic Violence Act 116 of 1998. Our attorneys are intimately familiar with these statutes and the evolving body of case law that shapes their interpretation. Whether you are navigating a contested divorce, negotiating a parenting plan, or seeking protection from domestic violence, we ensure your rights are vigorously defended at every stage.\n\nWe recognise that no two families are alike, and we tailor our approach to each client's unique circumstances. From high-net-worth divorce proceedings involving complex asset portfolios to sensitive custody matters, we provide strategic, outcomes-focused representation. Our goal is always to resolve matters as amicably and efficiently as possible, while never compromising on protecting your interests and those of your children.",
    keyServices: [
      {
        title: "Divorce & Separation",
        description:
          "Comprehensive handling of both contested and uncontested divorce proceedings, including settlement negotiations, asset division, and decree of divorce applications.",
      },
      {
        title: "Child Custody & Access",
        description:
          "Primary residence, contact schedules, and parental rights and responsibilities arrangements focused on the best interests of the child under the Children's Act.",
      },
      {
        title: "Ante-Nuptial Contracts",
        description:
          "Drafting and registration of ANC contracts with or without accrual, including postnuptial contracts and amendments to existing marital regimes.",
      },
      {
        title: "Domestic Violence & Protection Orders",
        description:
          "Emergency and interim protection orders, harassment orders, and long-term protective measures under the Domestic Violence Act.",
      },
      {
        title: "Maintenance Claims & Enforcement",
        description:
          "Spousal and child maintenance applications, calculations, variation orders, and enforcement through the Maintenance Court.",
      },
      {
        title: "Parenting Plans & Mediation",
        description:
          "Customised co-parenting agreements, facilitated mediation, and parenting coordination to promote cooperative post-separation parenting.",
      },
      {
        title: "International Family Law",
        description:
          "Cross-border custody disputes, international child abduction under the Hague Convention, and foreign divorce recognition.",
      },
      {
        title: "Surrogate Motherhood & Adoption",
        description:
          "Legal facilitation of surrogacy agreements and adoption proceedings in compliance with South African legislation.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Initial Consultation",
        description:
          "We meet privately to understand your situation, assess your legal position, explain your rights, and discuss the most appropriate strategy for your matter.",
      },
      {
        step: 2,
        title: "Strategy & Documentation",
        description:
          "We develop a tailored legal strategy, draft all necessary pleadings and applications, and gather supporting documentation to build a strong case.",
      },
      {
        step: 3,
        title: "Negotiation & Mediation",
        description:
          "Where possible, we seek to resolve matters through negotiation or mediation to achieve a fair outcome without the need for protracted litigation.",
      },
      {
        step: 4,
        title: "Resolution & Enforcement",
        description:
          "Whether through settlement agreement or court order, we ensure the final resolution is properly implemented and enforceable, with ongoing support as needed.",
      },
    ],
    caseStudies: [
      {
        title: "High-Net-Worth Divorce Settlement",
        outcome:
          "Successfully negotiated a complex divorce settlement involving multiple properties, business interests, and offshore assets valued at over R15 million.",
        result: "Favourable settlement achieved",
        category: "Divorce",
      },
      {
        title: "Primary Residence Dispute",
        outcome:
          "Secured primary residence of two minor children for the mother in a highly contested custody battle, with a detailed parenting plan approved by the court.",
        result: "Primary residence granted",
        category: "Custody",
      },
      {
        title: "Emergency Protection Order",
        outcome:
          "Obtained an interim protection order within 24 hours for a client facing serious domestic violence, with a final order granted at the return date.",
        result: "Protection order granted",
        category: "Domestic Violence",
      },
    ],
    faqs: [
      {
        question: "How long does a divorce take in South Africa?",
        answer:
          "An uncontested divorce can be finalised in as little as 4–6 weeks if all documents are in order and the court schedule permits. Contested divorces typically take 12–18 months depending on complexity, court roll availability, and whether trial dates are set. High-net-worth matters involving complex asset structures may take longer. We work diligently to expedite proceedings while ensuring thorough preparation.",
      },
      {
        question: "Can I get a protection order on the same day?",
        answer:
          "Yes. In emergency situations involving domestic violence, you can apply for an interim protection order on the same day at your nearest Magistrate's Court under the Domestic Violence Act. The interim order provides immediate protection while the return date is set for a full hearing. We strongly recommend contacting us before going to court so we can prepare the application and accompany you.",
      },
      {
        question: "What is the difference between with and without accrual in an ANC?",
        answer:
          'In a marriage "in community of property," all assets are jointly owned. An ANC "with accrual" means each spouse retains their own pre-marital assets, but the growth (accrual) during the marriage is shared equally on divorce. An ANC "without accrual" means each spouse keeps their own assets entirely — there is no sharing of growth. "Without accrual" is popular for business owners and those with significant pre-marital wealth.',
      },
      {
        question: "How is child maintenance calculated in South Africa?",
        answer:
          "There is no strict formula, but courts consider the child's reasonable needs (housing, food, education, medical care, extracurricular activities) and each parent's proportional ability to contribute. The Maintenance Act requires both parents to contribute according to their respective financial means. We assist in calculating fair maintenance amounts and enforcing orders through the Maintenance Court when payments are not made.",
      },
    ],
    relatedAreas: ["wills-estates", "general-litigation", "claims-state"],
    stats: [
      { label: "Family Matters Resolved", value: "500+" },
      { label: "Years of Combined Experience", value: "30+" },
      { label: "Successful Outcomes", value: "95%" },
      { label: "Average Resolution Time", value: "8 Weeks" },
    ],
  },
  {
    slug: "wills-estates",
    title: "Wills & Estates",
    tagline: "Preserving your legacy and protecting your loved ones' future",
    icon: "FileText",
    heroImage: "/images/pegasus-menlyn-maine.jpg",
    color: "#C6A84B",
    overview:
      "Estate planning is one of the most responsible and meaningful steps you can take to protect your family's financial security and ensure your final wishes are honoured. At IM Attorneys, we provide comprehensive estate planning services that go far beyond simply drafting a will — we craft holistic strategies that minimise estate duty, protect assets for future generations, and provide clarity and certainty during what is often a difficult time for surviving family members.\n\nThe South African estate planning landscape is governed by the Wills Act 7 of 1953, the Administration of Estates Act 66 of 1965, the Estate Duty Act 45 of 1955, and the Trust Property Control Act 57 of 1988. Our attorneys possess deep expertise in these interconnected statutes and the practical processes they govern. From drafting bespoke wills that withstand legal challenge to navigating the complexities of estate liquidation and trust administration, we bring precision and care to every matter.\n\nDying without a valid will (intestate succession) can have devastating consequences — your estate may be distributed in ways that do not reflect your wishes, your loved ones may face unnecessary delays and legal costs, and the Master of the High Court will appoint an executor who may not be your preferred choice. We help clients avoid these pitfalls through proactive, well-structured estate planning that adapts to life changes such as marriage, the birth of children, business growth, and asset acquisition.",
    keyServices: [
      {
        title: "Will Drafting & Review",
        description:
          "Legally sound, custom-drafted wills that clearly express your final wishes, appoint executors and guardians, and minimise the risk of disputes.",
      },
      {
        title: "Estate Administration",
        description:
          "Complete winding-up of deceased estates including asset identification, debt settlement, Master's Court applications, and distribution to beneficiaries.",
      },
      {
        title: "Trust Formation & Management",
        description:
          "Establishment and administration of inter vivos (living) and testamentary trusts for asset protection, tax efficiency, and succession planning.",
      },
      {
        title: "Executor & Trustee Services",
        description:
          "Professional executor and trustee appointment to ensure efficient, compliant, and transparent estate and trust management.",
      },
      {
        title: "Estate Duty Planning",
        description:
          "Strategic structuring to minimise estate duty and capital gains tax implications, preserving maximum wealth for your beneficiaries.",
      },
      {
        title: "Estate Dispute Resolution",
        description:
          "Representation in will disputes, contested executor appointments, and beneficiary claims including claims under the Maintenance of Surviving Spouses Act.",
      },
      {
        title: "Living Wills & Medical Directives",
        description:
          "Advance healthcare directives and living wills that specify your wishes regarding medical treatment and end-of-life care.",
      },
      {
        title: "Business Succession Planning",
        description:
          "Buy-sell agreements, shareholder succession strategies, and continuity plans for family-owned businesses and professional practices.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Estate Analysis",
        description:
          "We conduct a thorough review of your assets, liabilities, family circumstances, and existing estate planning documents to identify gaps and opportunities.",
      },
      {
        step: 2,
        title: "Strategy Development",
        description:
          "We develop a tailored estate plan that addresses your objectives, minimises tax exposure, and ensures smooth administration.",
      },
      {
        step: 3,
        title: "Document Drafting",
        description:
          "We draft all necessary legal documents including wills, trust deeds, and ancillary instruments with precision and legal rigour.",
      },
      {
        step: 4,
        title: "Review & Updating",
        description:
          "We provide ongoing review services to ensure your estate plan remains current and effective as your circumstances and the law evolve.",
      },
    ],
    caseStudies: [
      {
        title: "Complex Estate with Business Interests",
        outcome:
          "Administered a R28 million estate with multiple business interests, properties in three provinces, and international shareholdings within 9 months.",
        result: "Estate fully wound up",
        category: "Estate Administration",
      },
      {
        title: "Contested Will Dispute",
        outcome:
          "Successfully defended a testator's will against a challenge by a disinherited child, securing the intended distribution to the rightful beneficiaries.",
        result: "Will upheld by court",
        category: "Will Dispute",
      },
      {
        title: "Estate Duty Savings Strategy",
        outcome:
          "Restructured a client's estate plan through the creation of a discretionary trust, reducing projected estate duty by R2.4 million.",
        result: "R2.4M duty saved",
        category: "Tax Planning",
      },
    ],
    faqs: [
      {
        question: "What happens if I die without a will in South Africa?",
        answer:
          'If you die intestate (without a valid will), your estate is distributed according to the Intestate Succession Act 81 of 1987. This follows a rigid formula: your spouse inherits a defined share, children inherit equally, and if there is no surviving spouse or descendants, the estate passes to parents, then siblings. This may not reflect your wishes — for example, an unmarried partner receives nothing. A properly drafted will ensures your assets go exactly where you intend.',
      },
      {
        question: "How long does estate administration take?",
        answer:
          "Simple estates (no disputes, straightforward assets) typically take 6–12 months from date of death to final distribution. Complex estates involving business interests, properties in multiple jurisdictions, pending litigation, or disagreements among beneficiaries can take 18–36 months or longer. We work efficiently with the Master's Office, SARS, and relevant financial institutions to expedite the process.",
      },
      {
        question: "What is estate duty and how much will my estate pay?",
        answer:
          "Estate duty is a tax levied on the dutiable value of your deceased estate. Currently, the first R3.5 million of an estate is exempt from estate duty. Above that, estate duty is charged at 20% on the dutiable amount. There are additional deductions for bequests to surviving spouses and certain public benefit organisations. Through strategic estate planning using trusts and other structures, this liability can often be significantly reduced.",
      },
      {
        question: "Can I change my will after it has been signed?",
        answer:
          "Yes, you can update your will at any time as long as you have the mental capacity to do so. The most common approach is to sign a new will that expressly revokes all previous wills. You can also add a codicil (a supplementary document) to make minor changes. We strongly recommend reviewing your will whenever there is a significant life event — marriage, divorce, birth of a child, death of a beneficiary, or substantial change in assets.",
      },
    ],
    relatedAreas: ["family-law", "commercial-law", "general-litigation"],
    stats: [
      { label: "Wills Drafted", value: "1200+" },
      { label: "Estates Administered", value: "350+" },
      { label: "Trusts Established", value: "180+" },
      { label: "Estate Duty Saved for Clients", value: "R45M+" },
    ],
  },
  {
    slug: "claims-state",
    title: "Claims Against the State",
    tagline: "Holding government accountable and fighting for your rights",
    icon: "Landmark",
    heroImage: "/images/pegasus-menlyn-maine.jpg",
    color: "#C6A84B",
    overview:
      "When state organs fail in their constitutional and legal obligations, ordinary citizens bear the consequences. At IM Attorneys, we specialise in holding government entities accountable for negligence, misconduct, and rights violations. Our dedicated state claims team has a formidable track record of securing substantial compensation for clients who have suffered injury, loss, or injustice at the hands of the state or its agents.\n\nSouth African law provides robust mechanisms for redress against the state, rooted in Section 34 of the Constitution (right of access to courts), Section 38 (right to approach the court for constitutional rights violations), and the State Liability Act 20 of 1957. Our practice spans Road Accident Fund (RAF) claims, medical negligence in state hospitals, police brutality, wrongful arrest and detention, and constitutional rights litigation. We understand the procedural complexities, prescribed time frames, and evidentiary standards that these matters demand.\n\nClaims against the state require a particular combination of legal skill, tenacity, and resources. Government entities are well-resourced litigants that often resist claims vigorously. We level the playing field by assembling compelling evidence bundles, engaging top forensic and medical experts, and pursuing every available legal avenue to achieve justice. Our team is not intimidated by institutional power — we fight relentlessly for the compensation and vindication our clients deserve.",
    keyServices: [
      {
        title: "Road Accident Fund (RAF) Claims",
        description:
          "Full lifecycle RAF claims management for bodily injury, loss of earnings, loss of support, medical expenses, and general damages.",
      },
      {
        title: "Medical Negligence Claims",
        description:
          "Claims against state and private healthcare providers for substandard treatment, surgical errors, misdiagnosis, birth injuries, and delayed treatment.",
      },
      {
        title: "Police Brutality & Misconduct",
        description:
          "Civil claims for assault, excessive force, wrongful arrest, unlawful detention, malicious prosecution, and torture by state law enforcement.",
      },
      {
        title: "Constitutional Rights Litigation",
        description:
          "Strategic litigation challenging unconstitutional laws, policies, or administrative decisions that infringe on fundamental human rights.",
      },
      {
        title: "Wrongful Death Claims",
        description:
          "Loss of support and dependency claims arising from deaths caused by state negligence, including police action and state hospital negligence.",
      },
      {
        title: "Institutional Human Rights Claims",
        description:
          "Claims against the Department of Correctional Services, social welfare agencies, and other state institutions for systemic rights violations.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Case Assessment",
        description:
          "We evaluate the merits of your claim, identify liable parties, assess potential damages, and advise on the most effective legal strategy.",
      },
      {
        step: 2,
        title: "Evidence & Investigation",
        description:
          "We gather all relevant evidence including medical records, police reports, witness statements, and expert opinions to build a watertight case.",
      },
      {
        step: 3,
        title: "Claim lodgement & Negotiation",
        description:
          "We lodge the formal claim with the relevant state entity and engage in settlement negotiations to secure the best possible outcome without trial.",
      },
      {
        step: 4,
        title: "Litigation & Resolution",
        description:
          "If settlement cannot be reached, we proceed to trial with vigorous advocacy, and ensure any judgment is properly enforced and paid.",
      },
    ],
    caseStudies: [
      {
        title: "RAF Claim — Serious Motor Vehicle Accident",
        outcome:
          "Secured a R4.8 million settlement for a client who suffered permanent spinal injuries in a head-on collision caused by a negligent driver.",
        result: "R4.8M settlement",
        category: "RAF Claim",
      },
      {
        title: "Police Brutality — Wrongful Arrest",
        outcome:
          "Obtained a R1.2 million judgment against the Minister of Police for wrongful arrest, assault, and malicious prosecution of an innocent client.",
        result: "R1.2M judgment awarded",
        category: "Police Misconduct",
      },
      {
        title: "State Hospital Medical Negligence",
        outcome:
          "Settled a birth injury negligence claim against a provincial health department for R6.3 million on behalf of a child who suffered cerebral palsy.",
        result: "R6.3M settlement",
        category: "Medical Negligence",
      },
    ],
    faqs: [
      {
        question: "How long do I have to lodge a RAF claim?",
        answer:
          "You must lodge a claim with the RAF within 3 years of the date of the accident (prescription period). If a child is injured, the claim must be lodged before the child turns 21. If the claimant is mentally incapacitated, prescription may be delayed. We strongly recommend consulting us as soon as possible after an accident to preserve evidence, obtain medical records, and ensure the claim is properly prepared and lodged within the time limit.",
      },
      {
        question: "Can I claim compensation for emotional trauma caused by police brutality?",
        answer:
          "Yes. South African law recognises claims for emotional and psychological trauma (sometimes called constitutional damages or pain and suffering) resulting from police misconduct. Damages can include compensation for post-traumatic stress disorder (PTSD), anxiety, depression, loss of dignity, and impairment of quality of life. The courts have awarded significant sums in cases involving egregious police conduct, and we have expertise in quantifying and proving these claims.",
      },
      {
        question: "What does it cost to pursue a claim against the state?",
        answer:
          "We offer initial consultations at no charge to assess the merits of your case. For RAF and medical negligence claims, we typically work on a contingency (no win, no fee) basis or a hybrid arrangement. For constitutional litigation, we may assist on a pro bono or reduced-fee basis depending on the circumstances. We are transparent about costs and will explain the fee structure clearly before proceeding with your matter.",
      },
      {
        question: "Can I sue the government for failing to provide basic services?",
        answer:
          "Under certain circumstances, yes. Section 27 of the Constitution creates justiciable rights to healthcare, food, water, and social security. Section 26 protects housing rights. Where the state fails to take reasonable legislative and policy measures to progressively realise these rights, affected individuals or groups may approach the courts. These matters often involve strategic constitutional litigation and may be brought as class actions or public interest suits.",
      },
    ],
    relatedAreas: ["criminal-law", "general-litigation", "family-law"],
    stats: [
      { label: "State Claims Won", value: "400+" },
      { label: "Total Compensation Recovered", value: "R120M+" },
      { label: "RAF Claims Settled", value: "250+" },
      { label: "Constitutional Cases Filed", value: "35+" },
    ],
  },
  {
    slug: "criminal-law",
    title: "Criminal Law",
    tagline: "Fearless defence, unwavering commitment to justice",
    icon: "Shield",
    heroImage: "/images/pegasus-menlyn-maine.jpg",
    color: "#C6A84B",
    overview:
      "Facing criminal charges is one of the most stressful and consequential experiences a person can endure. Your freedom, reputation, livelihood, and future are at stake, and the criminal justice system can be intimidating and unforgiving. At IM Attorneys, we provide robust, fearless criminal defence at every stage — from the moment of arrest through to trial and appeal — safeguarding your constitutional rights and pursuing every avenue for the best possible outcome.\n\nSouth African criminal law is rooted in the Constitution's Bill of Rights, which guarantees the right to a fair trial (Section 35), the right to remain silent, the right to legal representation, the right to be presumed innocent, and protection against self-incrimination. Our criminal law team is deeply versed in these constitutional protections and the procedural safeguards of the Criminal Procedure Act 51 of 1977. We leverage every legal tool available to challenge the state's case, exclude unlawfully obtained evidence, and secure acquittals or reduced charges.\n\nOur criminal defence practice covers the full spectrum of offences, from common law crimes such as assault, theft, and fraud to statutory offences under the Drugs and Drug Trafficking Act, the Sexual Offences Act, the Prevention of Organised Crime Act (POCA), and the Cybercrimes Act. We are available 24 hours a day, 7 days a week for urgent bail applications, and we have a proven track record in the Magistrates' Courts and High Courts across multiple jurisdictions.",
    keyServices: [
      {
        title: "24/7 Bail Applications",
        description:
          "Urgent bail applications at police stations and courts across all jurisdictions, including after-hours and weekend appearances.",
      },
      {
        title: "Criminal Trial Defence",
        description:
          "Full trial representation in the Magistrates' Courts and High Courts for all categories of criminal offences, from petty offences to serious crimes.",
      },
      {
        title: "Appeal & Review Applications",
        description:
          "Challenging convictions, sentences, and procedural irregularities through higher court appeals, petitions, and review applications.",
      },
      {
        title: "Plea Negotiations",
        description:
          "Strategic plea bargaining with the prosecution to secure favourable outcomes, reduced charges, or Section 105A sentence agreements.",
      },
      {
        title: "Pre-Trial Strategy & Disclosure",
        description:
          "Thorough case analysis, docket review, witness preparation, and pre-trial applications including applications for discharge under Section 174.",
      },
      {
        title: "Commercial & White-Collar Crime",
        description:
          "Defence in fraud, embezzlement, corruption, money laundering, tax evasion, and POCA-related matters with forensic accounting support.",
      },
      {
        title: "Sexual Offences Defence",
        description:
          "Sensitive, confidential defence representation in sexual offence matters under the Criminal Law (Sexual Offences and Related Matters) Amendment Act.",
      },
      {
        title: "Drug-Related Offence Defence",
        description:
          "Representation in possession, dealing, and trafficking matters under the Drugs and Drug Trafficking Act, including bail in Schedule 5 and 6 offences.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Urgent Response",
        description:
          "We provide immediate legal advice upon arrest or police contact, attend police stations, and initiate bail proceedings without delay — available 24/7.",
      },
      {
        step: 2,
        title: "Case Analysis & Strategy",
        description:
          "We obtain and analyse the police docket, assess the strength of the state's case, identify weaknesses, and develop a comprehensive defence strategy.",
      },
      {
        step: 3,
        title: "Pre-Trial Preparation",
        description:
          "We conduct investigations, engage expert witnesses where needed, file pre-trial applications, and prepare thoroughly for trial or plea negotiations.",
      },
      {
        step: 4,
        title: "Trial & Resolution",
        description:
          "We provide aggressive courtroom advocacy, cross-examine state witnesses, present defence evidence, and argue for acquittal, reduced charges, or mitigated sentence.",
      },
    ],
    caseStudies: [
      {
        title: "High-Profile Fraud Acquittal",
        outcome:
          "Secured a full acquittal for a business director accused of R12 million fraud after a meticulous defence that exposed fatal flaws in the state's evidence.",
        result: "Full acquittal",
        category: "White-Collar Crime",
      },
      {
        title: "Schedule 6 Drug Trafficking — Bail Granted",
        outcome:
          "Successfully obtained bail for a client charged with dealing in cocaine (Schedule 6 offence) in the High Court after the Magistrate's Court refused bail.",
        result: "Bail granted on appeal",
        category: "Drug Offences",
      },
      {
        title: "Assault Charge — Section 174 Discharge",
        outcome:
          "Obtained a Section 174 discharge at the close of the state's case in an assault with intent to cause grievous bodily harm trial, with the accused discharged without needing to present a defence.",
        result: "Discharged at close of state case",
        category: "Assault",
      },
    ],
    faqs: [
      {
        question: "Do I have the right to remain silent when arrested in South Africa?",
        answer:
          "Yes. The South African Constitution (Section 35) guarantees your right to remain silent and your right not to be compelled to give self-incriminating evidence. You are not required to answer police questions without your attorney present. The police are required to inform you of these rights upon arrest. We strongly advise against making any statements or answering questions without your lawyer present, as anything you say can and will be used against you.",
      },
      {
        question: "What should I do if I am arrested?",
        answer:
          "Remain calm and do not resist arrest — resisting can lead to additional charges. Immediately request to contact your lawyer. You have the right to be informed of the charges, the right to remain silent, and the right to legal representation at state expense if you cannot afford an attorney. Do not make any statements, do not sign any documents without legal advice, and do not consent to any searches without a warrant. Contact us immediately — our 24/7 emergency line ensures we can assist at any hour.",
      },
      {
        question: "What is the difference between the Magistrates' Court and the High Court for criminal matters?",
        answer:
          "The Magistrates' Court handles less serious offences (schedule 1 and 2) and can impose a maximum sentence of 3 years imprisonment for a single offence. The Regional Court can impose up to 15 years for certain offences. The High Court deals with serious offences (schedule 5 and 6) including murder, rape, and armed robbery, and can impose any sentence including life imprisonment. The High Court also hears appeals and reviews from the Magistrates' Courts.",
      },
      {
        question: "Can a criminal conviction be removed from my record?",
        answer:
          "Under the Criminal Procedure Act, certain convictions may be expunged (removed from your criminal record) after a prescribed period, provided you have not been convicted of any other offence during that period. The waiting period varies depending on the sentence: 10 years for a fine or imprisonment of up to 1 year, 15 years for imprisonment of 1–5 years, and 20 years for imprisonment exceeding 5 years. Some serious offences (such as sexual offences against children) may not be expunged.",
      },
    ],
    relatedAreas: ["claims-state", "general-litigation", "family-law"],
    stats: [
      { label: "Criminal Cases Defended", value: "600+" },
      { label: "Acquittals Secured", value: "280+" },
      { label: "Bail Applications Granted", value: "90%" },
      { label: "24/7 Emergency Response", value: "Always" },
    ],
  },
  {
    slug: "commercial-law",
    title: "Commercial Law",
    tagline: "Strategic legal counsel that drives business success",
    icon: "Briefcase",
    heroImage: "/images/pegasus-menlyn-maine.jpg",
    color: "#C6A84B",
    overview:
      "In today's dynamic and heavily regulated business environment, sound legal counsel is not a luxury — it is essential for survival and growth. At IM Attorneys, our commercial law team provides pragmatic, commercially aware advice that helps businesses of all sizes navigate legal risks, seize opportunities, and achieve their strategic objectives. We serve as trusted legal partners to entrepreneurs, SMEs, listed companies, and public sector entities across South Africa.\n\nOur commercial practice encompasses the full lifecycle of business legal needs — from entity formation and corporate structuring to complex mergers and acquisitions, regulatory compliance, commercial disputes, and business rescue proceedings. We are deeply knowledgeable about the Companies Act 71 of 2008, the Consumer Protection Act 68 of 2008, the Competition Act 89 of 1998, the Broad-Based Black Economic Empowerment (B-BBEE) framework, and the Protection of Personal Information Act (POPIA).\n\nWhat distinguishes our commercial law team is our genuine understanding of business imperatives. We do not merely identify legal risks — we provide practical, solutions-oriented advice that enables our clients to make informed decisions and move forward with confidence. Whether you are negotiating a critical contract, restructuring your business, responding to a regulatory investigation, or pursuing an acquisition, we bring the same combination of rigour, creativity, and commitment that has defined our firm for over a decade.",
    keyServices: [
      {
        title: "Contract Drafting & Negotiation",
        description:
          "Tailored commercial agreements — from NDAs and SLAs to complex joint venture and shareholder agreements — that protect your interests and minimise risk.",
      },
      {
        title: "Mergers & Acquisitions (M&A)",
        description:
          "End-to-end transactional support for mergers, acquisitions, disposals, and business combinations, including due diligence and regulatory approvals.",
      },
      {
        title: "Corporate Governance & Compliance",
        description:
          "Board advisory, shareholder agreements, Companies Act compliance, King IV recommendations, and corporate secretarial services.",
      },
      {
        title: "BBBEE Advisory & Compliance",
        description:
          "Strategic BBBEE advisory, verification preparation, fronting avoidance, and structuring to optimise BBBEE scores for sustainable business growth.",
      },
      {
        title: "Regulatory & Compliance Advisory",
        description:
          "POPIA compliance programmes, consumer protection compliance, competition law advice, and sector-specific regulatory guidance.",
      },
      {
        title: "Business Restructuring & Rescue",
        description:
          "Companies Act business rescue proceedings, liquidations (voluntary and creditor-driven), compromises with creditors, and restructuring advisory.",
      },
      {
        title: "Commercial Property Law",
        description:
          "Commercial leases, property acquisitions and disposals, sectional title management, and property development agreements.",
      },
      {
        title: "Intellectual Property & Technology",
        description:
          "IP registration and protection, software licensing, e-commerce agreements, data privacy compliance, and technology transactions.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Business Needs Assessment",
        description:
          "We gain a thorough understanding of your business, its objectives, risk profile, and the commercial context in which it operates.",
      },
      {
        step: 2,
        title: "Legal Strategy & Structuring",
        description:
          "We develop a legal strategy that aligns with your business goals, identifies risks and opportunities, and proposes optimal structures.",
      },
      {
        step: 3,
        title: "Drafting & Negotiation",
        description:
          "We draft, review, and negotiate all legal documents with precision, ensuring your commercial interests are protected at every term.",
      },
      {
        step: 4,
        title: "Implementation & Ongoing Support",
        description:
          "We oversee the execution of transactions, provide ongoing legal support, and help you adapt to changing regulatory and business conditions.",
      },
    ],
    caseStudies: [
      {
        title: "R45 Million Acquisition Transaction",
        outcome:
          "Advised a mid-sized company on the acquisition of a complementary business, conducting full due diligence, negotiating the sale agreement, and securing Competition Commission approval.",
        result: "Acquisition completed successfully",
        category: "M&A",
      },
      {
        title: "Shareholder Dispute Resolution",
        outcome:
          "Resolved a protracted 50/50 shareholder deadlock in a family business through mediation, resulting in a structured buyout that preserved business continuity.",
        result: "Dispute resolved through mediation",
        category: "Corporate Governance",
      },
      {
        title: "POPIA Compliance Programme",
        outcome:
          "Designed and implemented a comprehensive POPIA compliance programme for a financial services firm processing over 100,000 data subjects.",
        result: "Full POPIA compliance achieved",
        category: "Regulatory Compliance",
      },
    ],
    faqs: [
      {
        question: "Is a verbal agreement legally binding in South Africa?",
        answer:
          "In many cases, yes — South African contract law generally does not require contracts to be in writing to be valid. A verbal agreement can be legally enforceable if it meets the basic requirements of a valid contract (consensus, capacity, legality, and possibility of performance). However, certain types of agreements MUST be in writing to be valid, including sale of immovable property, credit agreements exceeding the prescribed threshold, long-term leases (more than 10 years), and suretyship agreements. We strongly recommend all commercial arrangements be documented in writing.",
      },
      {
        question: "Do I need a lawyer for BBBEE compliance?",
        answer:
          "While BBBEE compliance itself is not a legal requirement for all businesses, it is a critical commercial consideration — particularly for companies doing business with government, state-owned entities, and large corporates. Proper BBBEE compliance involves complex scoring criteria, verification processes, and strategic structuring. We provide comprehensive advisory to help you achieve optimal scores, avoid common pitfalls such as fronting (which is a criminal offence), and leverage compliance for business growth.",
      },
      {
        question: "What is business rescue and when should a company consider it?",
        answer:
          "Business rescue is a formal process under Chapter 6 of the Companies Act designed to rehabilitate financially distressed companies. A company is 'financially distressed' when it appears reasonably unlikely that it will be able to pay all its debts in the next six months. Business rescue suspends all claims against the company, provides breathing room to restructure, and aims to achieve a better outcome for creditors and shareholders than immediate liquidation. Directors have a duty to consider business rescue when the company is financially distressed.",
      },
      {
        question: "What are the penalties for POPIA non-compliance?",
        answer:
          "The Information Regulator may impose administrative fines of up to R10 million for serious infringements of POPIA. In addition, data subjects (individuals whose personal information has been compromised) may bring civil claims for damages. Non-compliance can also result in reputational damage, loss of client trust, and exclusion from business opportunities. We help businesses implement compliant data processing practices, draft privacy policies, and respond to data breaches in accordance with POPIA requirements.",
      },
    ],
    relatedAreas: ["general-litigation", "wills-estates", "claims-state"],
    stats: [
      { label: "Corporate Clients Served", value: "200+" },
      { label: "Commercial Deals Advised", value: "150+" },
      { label: "Total Deal Value Handled", value: "R500M+" },
      { label: "Compliance Programmes Delivered", value: "80+" },
    ],
  },
  {
    slug: "general-litigation",
    title: "General Litigation",
    tagline: "We litigate what others avoid — determined, strategic, relentless",
    icon: "Scale",
    heroImage: "/images/pegasus-menlyn-maine.jpg",
    color: "#C6A84B",
    overview:
      "When disputes cannot be resolved through negotiation or alternative dispute resolution, determined and experienced litigators become essential. At IM Attorneys, our litigation team handles a broad spectrum of civil disputes with the strategic focus, meticulous preparation, and courtroom expertise that have earned us a reputation as formidable advocates. We are known for taking on complex, high-stakes matters and delivering results that protect our clients' interests.\n\nOur litigation practice spans the Magistrates' Courts, Regional Courts, and High Courts of South Africa. We handle matters including contractual disputes, debt recovery and enforcement, property-related litigation (including evictions and rental disputes), delictual claims, application proceedings for urgent and interim relief, and appeals to higher courts. We are equally effective in protracted, complex litigation and in expedited applications where speed is critical.\n\nWhat sets our litigation team apart is our unwavering commitment to thorough preparation. We leave nothing to chance — every pleading, every affidavit, every piece of evidence is scrutinised and perfected. We believe that cases are won in the preparation phase, not just in the courtroom. Our attorneys combine deep legal knowledge with practical courtroom experience, and we are supported by a network of expert witnesses, forensic specialists, and senior counsel when matters require it. We fight tenaciously for our clients, and we do not back down from difficult cases.",
    keyServices: [
      {
        title: "Debt Recovery & Enforcement",
        description:
          "Strategic debt collection through letters of demand, summons applications, default judgments, garnishee orders, and execution against assets.",
      },
      {
        title: "Eviction Proceedings",
        description:
          "Lawful eviction of residential and commercial tenants in full compliance with the Prevention of Illegal Eviction from and Unlawful Occupation of Land Act (PIEA).",
      },
      {
        title: "Contractual Disputes",
        description:
          "Interpretation, enforcement, breach, rescission, and specific performance claims arising from commercial and civil contracts.",
      },
      {
        title: "Property & Rental Disputes",
        description:
          "Resolution of landlord-tenant disputes, sectional title disputes, servitude claims, boundary disputes, and property-related interdicts.",
      },
      {
        title: "Urgent & Application Proceedings",
        description:
          "Spoliation orders, interdicts, rule nisi applications, and other urgent court applications requiring immediate interim relief.",
      },
      {
        title: "Arbitration & Alternative Dispute Resolution",
        description:
          "Representation in arbitration proceedings, mediation facilitation, and dispute resolution through AFSA, AFSA Rules, and private arbitration tribunals.",
      },
      {
        title: "Delictual Claims",
        description:
          "Civil claims for damages arising from wrongful conduct including negligence, defamation, nuisance, and invasion of privacy.",
      },
      {
        title: "Appeals & Reviews",
        description:
          "Appeals to the Full Bench of the High Court and Supreme Court of Appeal, and reviews of administrative decisions under PAJA.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Case Evaluation & Strategy",
        description:
          "We assess the merits, identify legal and evidentiary strengths and weaknesses, evaluate risks, and develop a clear litigation strategy with cost projections.",
      },
      {
        step: 2,
        title: "Pleading & Preparation",
        description:
          "We draft and file all pleadings, gather evidence, engage expert witnesses, and prepare comprehensive trial bundles with meticulous attention to detail.",
      },
      {
        step: 3,
        title: "Trial & Advocacy",
        description:
          "We provide aggressive courtroom advocacy, examining and cross-examining witnesses, presenting legal arguments, and securing favourable judgments.",
      },
      {
        step: 4,
        title: "Enforcement & Appeal",
        description:
          "We enforce court judgments through available mechanisms and advise on and pursue appeal options where the judgment is unfavourable.",
      },
    ],
    caseStudies: [
      {
        title: "Complex Multi-Party Property Dispute",
        outcome:
          "Resolved a protracted dispute involving competing ownership claims over a R22 million commercial property through a successful application for specific performance in the High Court.",
        result: "Specific performance granted",
        category: "Property Litigation",
      },
      {
        title: "R8 Million Debt Recovery",
        outcome:
          "Recovered R8 million in outstanding commercial debt for a manufacturing company through a combination of urgent applications, default judgments, and garnishee orders.",
        result: "R8M recovered in full",
        category: "Debt Recovery",
      },
      {
        title: "Section 8 PIEA Eviction",
        outcome:
          "Successfully obtained an eviction order against unlawful occupants of a commercial property in compliance with PIEA, with the Sheriff executing the order within 3 months.",
        result: "Eviction order executed",
        category: "Eviction",
      },
    ],
    faqs: [
      {
        question: "How long does a civil lawsuit take in South Africa?",
        answer:
          "Timelines vary significantly depending on complexity, court roll availability, and whether the matter settles. A straightforward debt recovery matter may resolve in 3–6 months through default judgment or settlement. Simple contractual disputes typically take 6–12 months from summons to trial. Complex matters involving multiple parties, expert evidence, or counterclaims can take 1–3 years or longer. We work efficiently to move matters forward and actively pursue settlement opportunities to save time and costs.",
      },
      {
        question: "What is the difference between arbitration and court litigation?",
        answer:
          "Court litigation involves public proceedings in the judicial system following the rules of court, with a judge or magistrate as the decision-maker. Arbitration is a private process where parties agree to submit their dispute to an independent arbitrator who makes a binding decision, typically following more flexible procedures. Arbitration is generally faster, more confidential, and less formal, but the outcome (arbitral award) is equally enforceable in law and can be made an order of court. We advise on the most appropriate forum for each matter.",
      },
      {
        question: "What is a spoliation order and when do I need one?",
        answer:
          "A spoliation order (or mandament van spolie) is a swift legal remedy designed to restore possession of property that has been wrongfully or unlawfully taken from you. It is based on the principle that no one may take the law into their own hands. You can apply for a spoliation order regardless of whether you own the property — the key question is whether you were in peaceful and undisturbed possession. Spoliation applications are heard on an urgent basis and can resolve possession disputes within days rather than months.",
      },
      {
        question: "What are the costs of litigation and how are they calculated?",
        answer:
          "Litigation costs depend on the complexity of the matter, the level of court, the number of witnesses and experts, and the duration of the proceedings. Attorney fees are typically calculated according to the Law Society of South Africa's tariff guidelines or on a client-specific fee agreement. In some matters, a successful party may recover a portion of their legal costs from the losing party (costs on a party-and-party scale), though this rarely covers the full amount. We provide detailed cost estimates upfront and keep clients informed of costs throughout the matter.",
      },
    ],
    relatedAreas: ["commercial-law", "claims-state", "family-law"],
    stats: [
      { label: "Civil Matters Handled", value: "700+" },
      { label: "Cases Won or Favourably Settled", value: "92%" },
      { label: "High Court Appearances", value: "150+" },
      { label: "Debt Recovered for Clients", value: "R80M+" },
    ],
  },
];

export function getPracticeAreaBySlug(slug: string): PracticeAreaData | undefined {
  return practiceAreasData.find((area) => area.slug === slug);
}

export function getAllPracticeAreaSlugs(): string[] {
  return practiceAreasData.map((area) => area.slug);
}

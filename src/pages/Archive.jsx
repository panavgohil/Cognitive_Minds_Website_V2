import { useState } from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import Navbar from '../components/common/Navbar';

const motionsDatabase = [
  { id: 1, text: "THS the usage of statistical risk assessment by US courts in pre-trial decisions", category: "Economics & Policy", topics: ["Law", "Artificial Intelligence"], competition: "19th IITB IV", year: "2025", round: "Round 1", format: "BPD" },
  { id: 2, text: "THS governments banning foreign ownership of media covering local or national news", category: "Technology & Media", topics: ["Media", "Government Regulation"], competition: "19th IITB IV", year: "2025", round: "Round 2", format: "BPD" },
  { id: 3, text: "THBT multilateral development banks should cease financing all greenfield infrastructure in environmentally sensitive regions (Amazon, Congo Basin, Himalayas, etc.)", category: "Economics & Policy", topics: ["Environment", "Development"], competition: "19th IITB IV", year: "2025", round: "Round 3", format: "BPD" },
  { id: 4, text: "In rapidly urbanising regions, THS local governments actively employing Land Value Capture measures", category: "Economics & Policy", topics: ["Urban Policy", "Economics"], competition: "19th IITB IV", year: "2025", round: "Round 4", format: "BPD" },
  { id: 5, text: "THP a world with a dominant norm of maintaining both a polite public persona and emotional distance toward those outside one's immediate circle, as opposed to a world with a dominant norm of being emotionally expressive and authentic with those outside one's immediate circle", category: "Philosophy & Ethics", topics: ["Relationships", "Social Norms"], competition: "19th IITB IV", year: "2025", round: "Round 5", format: "BPD" },
  { id: 6, text: "THS social justice movements in South Asia framing their advocacy through the concept of dharma (duty and moral responsibility)", category: "Social Justice & Feminism", topics: ["Religion", "Social Movements"], competition: "19th IITB IV", year: "2025", round: "Pre-Quarters", format: "BPD" },
  { id: 7, text: "THBT Moldova should pursue accelerated EU accession, even at the expense of its relations with Russia.", category: "International Relations", topics: ["Geopolitics", "European Union"], competition: "19th IITB IV", year: "2025", round: "Quarterfinals", format: "BPD" },
  { id: 8, text: "THR the rise of social-media-based self-disclosure groups for mental health", category: "Technology & Media", topics: ["Mental Health", "Social Media"], competition: "19th IITB IV", year: "2025", round: "Novice Semifinals", format: "BPD" },
  { id: 9, text: "THBT adults have a greater moral obligation towards vulnerable strangers than towards their self-sufficient parents", category: "Philosophy & Ethics", topics: ["Morality", "Family"], competition: "19th IITB IV", year: "2025", round: "Semifinals", format: "BPD" },
  { id: 10, text: "THBT feminists should support the legalization of surrogacy for profit.", category: "Social Justice & Feminism", topics: ["Feminism", "Surrogacy"], competition: "19th IITB IV", year: "2025", round: "Novice Finals", format: "BPD" },
  { id: 11, text: "During times of ethno-religious conflicts, THS governments deploying the national military at religious places of worship that are likely to be affected by the conflict", category: "International Relations", topics: ["Religion", "Conflict"], competition: "19th IITB IV", year: "2025", round: "Grand Final", format: "BPD" },
  { id: 12, text: "THO the societal focus on ascribing art as inherently political", category: "Philosophy & Ethics", topics: ["Art", "Politics"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 13, text: "THR the rise of pop psychology on social media platforms like Instagram/Facebook", category: "Technology & Media", topics: ["Psychology", "Social Media"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 14, text: "THS the glorification of the lazy girl trend", category: "Philosophy & Ethics", topics: ["Culture", "Social Norms"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 15, text: "THO the commercialisation of the Hajj", category: "Philosophy & Ethics", topics: ["Religion", "Economics"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 16, text: "THR the decline of religion's role in emotional healing, in replacement with professional psychological help (i.e., therapy)", category: "Philosophy & Ethics", topics: ["Religion", "Mental Health"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 17, text: "THBT the OIC should prioritize advocating for climate action as a form of zakat", category: "International Relations", topics: ["Climate", "Islam"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 18, text: "THBT the pursuit of eternal life does more harm than good", category: "Philosophy & Ethics", topics: ["Immortality", "Ethics"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 19, text: "THO the glorification of agency", category: "Philosophy & Ethics", topics: ["Agency", "Ethics"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 20, text: "TH, as an average person, would choose to be immortal", category: "Philosophy & Ethics", topics: ["Immortality", "Identity"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 21, text: "THO commercialised AI software", category: "Technology & Media", topics: ["Artificial Intelligence", "Technology"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 22, text: "THW mandate tighter regulation on the pace of massive AI development projects (e.g., GPT-4, Gemini, DALL-E 3)", category: "Technology & Media", topics: ["Artificial Intelligence", "Regulation"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 23, text: "THO DeepSeek's development and release", category: "Technology & Media", topics: ["Artificial Intelligence", "China"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 24, text: "THBT recently established post-colonial states should significantly limit the power of individuals who collaborated heavily with colonial powers in the state", category: "International Relations", topics: ["Colonialism", "Governance"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 5", format: "APD" },
  { id: 25, text: "THBT the demonisation of colonialism in post-colonial states has done more harm than good", category: "International Relations", topics: ["Colonialism", "History"], competition: "IGDTUW APD 2025", year: "2025", round: "Round 5", format: "APD" },
  { id: 26, text: "THBT developing states should prioritize investing in university education programs rather than in primary education programs", category: "Economics & Policy", topics: ["Education", "Development"], competition: "SVDC 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 27, text: "THR the narrative that places premium value on university rankings in tertiary education (e.g., QS and THE rankings)", category: "Economics & Policy", topics: ["Education", "Rankings"], competition: "SVDC 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 28, text: "TH, as a minority parent, would homeschool their child as opposed to enrolling them in public schools", category: "Philosophy & Ethics", topics: ["Education", "Parenting"], competition: "SVDC 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 29, text: "TH, as a parent of a kid with exceptional talent in sports, would significantly push their kid to maximise their potential even at the expense of the child's immediate happiness", category: "Philosophy & Ethics", topics: ["Sports", "Parenting"], competition: "SVDC 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 30, text: "TH opposes female-exclusive titles and leagues in non-physical sports", category: "Social Justice & Feminism", topics: ["Sports", "Gender"], competition: "SVDC 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 31, text: "THR the emphasis of rivalries in women's sports", category: "Technology & Media", topics: ["Sports", "Gender"], competition: "SVDC 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 32, text: "THBT global environmental agreements should prioritize binding production caps over recycling measures", category: "Economics & Policy", topics: ["Environment", "Policy"], competition: "SVDC 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 33, text: "THW establish a permanent international climate tribunal", category: "International Relations", topics: ["Climate", "Law"], competition: "SVDC 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 34, text: "THBT environmental movements should frame their advocacy primarily around economic impacts rather than humanitarian impacts", category: "Economics & Policy", topics: ["Environment", "Economics"], competition: "SVDC 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 35, text: "THS widespread adoption of Islamic banking practices in developing countries", category: "Economics & Policy", topics: ["Finance", "Islam"], competition: "SVDC 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 36, text: "THS entrepreneurial familism in Asian countries", category: "Economics & Policy", topics: ["Economics", "Culture"], competition: "SVDC 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 37, text: "THW implement an annual tax on shares owned by individuals and entities", category: "Economics & Policy", topics: ["Taxation", "Finance"], competition: "SVDC 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 38, text: "THR the stigmatisation of monkey branching", category: "Philosophy & Ethics", topics: ["Social Norms", "Identity"], competition: "SVDC 2025", year: "2025", round: "Quarterfinals", format: "APD" },
  { id: 39, text: "TH, as this young woman, would sell the house", category: "Philosophy & Ethics", topics: ["Family", "Identity"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 40, text: "THS that choice feminism is a useful framework in modern feminist literature", category: "Social Justice & Feminism", topics: ["Feminism", "Literature"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 41, text: "THR the romanticisation of 'fix them' characters in popular media", category: "Philosophy & Ethics", topics: ["Media", "Relationships"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 42, text: "THBT popular romantic novels encourage unrealistic or unhealthy expectations about relationships", category: "Philosophy & Ethics", topics: ["Relationships", "Media"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 43, text: "THBT the use of animals in medical research is justified when it substantially advances human health", category: "Philosophy & Ethics", topics: ["Animal Rights", "Health"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 44, text: "THBT India's policy of vaccinating, sterilizing, and releasing non-aggressive stray dogs better protects both public safety and animal welfare", category: "Philosophy & Ethics", topics: ["Animal Rights", "Public Policy"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 45, text: "THW dissolve PETA to fund the local-level animal rights movement", category: "Philosophy & Ethics", topics: ["Animal Rights", "Activism"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 46, text: "THP a world where the EU acts as a unified military power", category: "International Relations", topics: ["Europe", "Military"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Semifinals", format: "APD" },
  { id: 47, text: "THO India's decision to grant refuge to Sheikh Hasina amid Bangladesh's political crisis", category: "International Relations", topics: ["Geopolitics", "Refugees"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Semifinals", format: "APD" },
  { id: 48, text: "TH predicts that the Trump presidency will cause lasting damage to US relations with its key international allies", category: "International Relations", topics: ["US Politics", "Diplomacy"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Semifinals", format: "APD" },
  { id: 49, text: "THBT it is more moral to save 5 strangers than a loved one", category: "Philosophy & Ethics", topics: ["Ethics", "Morality"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Grand Final", format: "APD" },
  { id: 50, text: "THBT you should not have made this wish", category: "Philosophy & Ethics", topics: ["Ethics", "Decision Making"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Grand Final", format: "APD" },
  { id: 51, text: "THBT choosing ignorance can be as justifiable as choosing knowledge", category: "Philosophy & Ethics", topics: ["Epistemology", "Ethics"], competition: "IIT Kanpur Antaragni PD 2025", year: "2025", round: "Grand Final", format: "APD" },
  { id: 52, text: "THBT major US college athletes should be classified and paid as university employees", category: "Economics & Policy", topics: ["Sports", "Labor"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 53, text: "TH opposes the centrality of sport to national identity", category: "Philosophy & Ethics", topics: ["Sports", "Identity"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 54, text: "THBT India should heavily invest in local sports over global sports", category: "Economics & Policy", topics: ["Sports", "Development"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 55, text: "THW require that technologies relevant to de-extinction be open source", category: "Technology & Media", topics: ["Biotechnology", "Open Source"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 56, text: "THBT the environmental movement in the US should focus on Climate Realism advocacy", category: "Economics & Policy", topics: ["Environment", "Climate"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 57, text: "TH prefers a world where all environmental action pushed solely for carbon reductions rather than carbon offsets", category: "Economics & Policy", topics: ["Climate", "Environment"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 58, text: "THBT the feminist movement should portray men as the victims of patriarchy rather than the beneficiaries of patriarchy", category: "Social Justice & Feminism", topics: ["Feminism", "Gender"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 59, text: "THBT the feminist movement should support the usage of women-only safety apps", category: "Social Justice & Feminism", topics: ["Feminism", "Technology"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 60, text: "TH, as the feminist movement in Japan, supports Sanae Takaichi's election as Japan's new PM", category: "Social Justice & Feminism", topics: ["Feminism", "Politics"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 61, text: "THW prioritise insurgent planning over state-led planning for housing in developing countries", category: "Economics & Policy", topics: ["Housing", "Development"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 62, text: "THW liberalize India's passenger aviation industry", category: "Economics & Policy", topics: ["Aviation", "Policy"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 63, text: "THBT it is in India's interest to reject the US demand rather than pursue a compromise strategy in the November 2025 trade negotiations", category: "International Relations", topics: ["Trade", "India-US Relations"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 4", format: "APD" },
  { id: 64, text: "THW significantly reduce the union rights of police officers in the United States", category: "Economics & Policy", topics: ["Law", "Police"], competition: "ISM Dhanbad Parlance 2025", year: "2025", round: "Round 5", format: "APD" },
  { id: 65, text: "THW actively incentivise build-to-rent housing models in India's Tier-1 cities and emerging Tier-2 urban clusters", category: "Economics & Policy", topics: ["Housing", "Urban Policy"], competition: "Ramjas Polemic '25", year: "2025", round: "Quarter Finals", format: "APD" },
  { id: 66, text: "THO the societal norm of home ownership", category: "Philosophy & Ethics", topics: ["Housing", "Society"], competition: "Ramjas Polemic '25", year: "2025", round: "Quarter Finals", format: "APD" },
  { id: 67, text: "TH prefers a real-estate market where developers rely on under-construction REITs rather than pre-sales to finance construction", category: "Economics & Policy", topics: ["Real Estate", "Finance"], competition: "Ramjas Polemic '25", year: "2025", round: "Quarter Finals", format: "APD" },
  { id: 68, text: "THR the expanding presence of private military contractors in state security and foreign policy operations", category: "International Relations", topics: ["Security", "Military"], competition: "Ramjas Polemic '25", year: "2025", round: "Semi Finals", format: "APD" },
  { id: 69, text: "THW intentionally leak sensitive information about allied nations to extract concessions or prolong survival", category: "International Relations", topics: ["Espionage", "Geopolitics"], competition: "Ramjas Polemic '25", year: "2025", round: "Semi Finals", format: "APD" },
  { id: 70, text: "THW ban the delegation of battlefield command decisions to artificial intelligence", category: "International Relations", topics: ["Artificial Intelligence", "Military"], competition: "Ramjas Polemic '25", year: "2025", round: "Semi Finals", format: "APD" },
  { id: 71, text: "THW choose to be born in Fantasia over Earth", category: "Philosophy & Ethics", topics: ["Identity", "Existence"], competition: "Ramjas Polemic '25", year: "2025", round: "Grand Finals", format: "APD" },
  { id: 72, text: "TH, as the parent, would not give their consent", category: "Philosophy & Ethics", topics: ["Parenting", "Consent"], competition: "Ramjas Polemic '25", year: "2025", round: "Grand Finals", format: "APD" },
  { id: 73, text: "THBT human beings have a moral responsibility to preserve the ecology of Earth, even at the expense of their own survival", category: "Philosophy & Ethics", topics: ["Ecology", "Ethics"], competition: "Ramjas Polemic '25", year: "2025", round: "Grand Finals", format: "APD" },
  { id: 74, text: "TH prefers to believe in a watchmaker God as opposed to an interventionist God", category: "Philosophy & Ethics", topics: ["Religion", "Philosophy"], competition: "Ramjas Polemic '25", year: "2025", round: "Novice Finals", format: "APD" },
  { id: 75, text: "TH (as the Church) would discourage the usage of Bible GPT", category: "Philosophy & Ethics", topics: ["Religion", "Technology"], competition: "Ramjas Polemic '25", year: "2025", round: "Novice Finals", format: "APD" },
  { id: 76, text: "THP a world where karmic reincarnation exists", category: "Philosophy & Ethics", topics: ["Religion", "Metaphysics"], competition: "Ramjas Polemic '25", year: "2025", round: "Novice Finals", format: "APD" },
  { id: 77, text: "THBT chess should move away from gender separation", category: "Social Justice & Feminism", topics: ["Sports", "Gender"], competition: "UIET PD", year: "2025", round: "Round 1", format: "APD" },
  { id: 78, text: "THW allocate funding for rising sports to the regions that produce the most athletes for those sports", category: "Economics & Policy", topics: ["Sports", "Policy"], competition: "UIET PD", year: "2025", round: "Round 1", format: "APD" },
  { id: 79, text: "THBT countries with territorial disputes should be barred from hosting global sporting events", category: "International Relations", topics: ["Sports", "Geopolitics"], competition: "UIET PD", year: "2025", round: "Round 1", format: "APD" },
  { id: 80, text: "THR the glorification of careers in industry giants", category: "Philosophy & Ethics", topics: ["Career", "Society"], competition: "UIET PD", year: "2025", round: "Round 2", format: "APD" },
  { id: 81, text: "THP a world where there is a dominant narrative of 'multiple discovery' as opposed to inventions being the creations of unique geniuses", category: "Philosophy & Ethics", topics: ["Innovation", "Philosophy"], competition: "UIET PD", year: "2025", round: "Round 2", format: "APD" },
  { id: 82, text: "THS the narrative of 'I am enough' post breakup", category: "Philosophy & Ethics", topics: ["Relationships", "Self-Image"], competition: "UIET PD", year: "2025", round: "Round 2", format: "APD" },
  { id: 83, text: "THS the use of Artificial Intelligence in Parliamentary Debating Tournaments at the university level", category: "Technology & Media", topics: ["Artificial Intelligence", "Debating"], competition: "UIET PD", year: "2025", round: "Round 3", format: "APD" },
  { id: 84, text: "THW decide breaks based on total speaks as opposed to team points", category: "Economics & Policy", topics: ["Debating", "Competition"], competition: "UIET PD", year: "2025", round: "Round 3", format: "APD" },
  { id: 85, text: "TH, as Maras Hilari, would date in the debating circuit", category: "Philosophy & Ethics", topics: ["Relationships", "Debating"], competition: "UIET PD", year: "2025", round: "Round 3", format: "APD" },
  { id: 86, text: "THBT AI companies should be held liable for the output generated by their Large Language Models (e.g., ChatGPT, Claude, etc.)", category: "Technology & Media", topics: ["Artificial Intelligence", "Law"], competition: "UIET PD", year: "2025", round: "Round 4", format: "APD" },
  { id: 87, text: "THO the prioritization of AGI safety over ANI safety", category: "Technology & Media", topics: ["Artificial Intelligence", "Safety"], competition: "UIET PD", year: "2025", round: "Round 4", format: "APD" },
  { id: 88, text: "THS the use of genetic engineering as depicted in 'Oryx and Crake'", category: "Technology & Media", topics: ["Biotechnology", "Literature"], competition: "UIET PD", year: "2025", round: "Round 4", format: "APD" },
  { id: 89, text: "THW make Luigi Mangione's trial a 'closed trial'", category: "Philosophy & Ethics", topics: ["Law", "Justice"], competition: "UIET PD", year: "2025", round: "Round 5", format: "APD" },
  { id: 90, text: "THS the adoption of SLTCs by the Indian working class", category: "Economics & Policy", topics: ["Labor", "Education"], competition: "Maitreyi Anvaya 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 91, text: "THW nationalise all for-profit education academies", category: "Economics & Policy", topics: ["Education", "Policy"], competition: "Maitreyi Anvaya 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 92, text: "THW actively promote return-of-service agreements as opposed to international scholarships", category: "Economics & Policy", topics: ["Education", "Migration"], competition: "Maitreyi Anvaya 2025", year: "2025", round: "Round 1", format: "APD" },
  { id: 93, text: "TH, as an upper middle class queer individual living in a country that has decriminalised homosexuality but lacks social acceptance for it, would choose to migrate to a queer-friendly country", category: "Philosophy & Ethics", topics: ["Queer Rights", "Migration"], competition: "Maitreyi Anvaya 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 94, text: "THBT social justice movements should adopt reconciliatory rather than confrontational approaches in their advocacy", category: "Social Justice & Feminism", topics: ["Social Justice", "Activism"], competition: "Maitreyi Anvaya 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 95, text: "TH regrets the decline of joint families", category: "Philosophy & Ethics", topics: ["Family", "Society"], competition: "Maitreyi Anvaya 2025", year: "2025", round: "Round 2", format: "APD" },
  { id: 96, text: "TH opposes moral relativism", category: "Philosophy & Ethics", topics: ["Ethics", "Morality"], competition: "Maitreyi Anvaya 2025", year: "2025", round: "Round 3", format: "APD" },
  { id: 97, text: "TH, as Joel, would choose to have never met Clementine", category: "Philosophy & Ethics", topics: ["Relationships", "Identity"], competition: "Maharaja Agrasen Chorus PD 2026", year: "2026", round: "Round 1", format: "APD" },
  { id: 98, text: "THP a world where CupidX is widely available", category: "Technology & Media", topics: ["Technology", "Relationships"], competition: "Maharaja Agrasen Chorus PD 2026", year: "2026", round: "Round 1", format: "APD" },
  { id: 99, text: "THS the normalisation of prenuptial agreements", category: "Philosophy & Ethics", topics: ["Marriage", "Law"], competition: "Maharaja Agrasen Chorus PD 2026", year: "2026", round: "Round 1", format: "APD" },
  { id: 100, text: "THS the privatisation of UN peacekeeping forces", category: "International Relations", topics: ["Peacekeeping", "Governance"], competition: "Maharaja Agrasen Chorus PD 2026", year: "2026", round: "Round 2", format: "APD" },
  { id: 101, text: "THW suspend the operations of independent anti-corruption bodies during times of war", category: "International Relations", topics: ["Corruption", "War"], competition: "Maharaja Agrasen Chorus PD 2026", year: "2026", round: "Round 2", format: "APD" },
  { id: 102, text: "THS the use of the Dahiya Doctrine in insurgent-held territory", category: "International Relations", topics: ["Conflict", "Military"], competition: "Maharaja Agrasen Chorus PD 2026", year: "2026", round: "Round 2", format: "APD" },
  { id: 103, text: "TH, as a female executive in a male-dominated industry, would give preferential treatment to female subordinates", category: "Social Justice & Feminism", topics: ["Gender", "Leadership"], competition: "Maharaja Agrasen Chorus PD 2026", year: "2026", round: "Round 3", format: "APD" },
  { id: 104, text: "TH would rather be a brat than be demure", category: "Philosophy & Ethics", topics: ["Identity", "Culture"], competition: "IIT Bombay IV 17th Edition", year: "2025", round: "Round 1", format: "BPD" },
  { id: 105, text: "THP a world in which social media platforms follow a Reddit-style model", category: "Technology & Media", topics: ["Social Media", "Technology"], competition: "IIT Bombay IV 17th Edition", year: "2025", round: "Round 2", format: "BPD" },
  { id: 106, text: "TH prefers to be born with an exceptionally high level of self-awareness", category: "Philosophy & Ethics", topics: ["Identity", "Philosophy"], competition: "IIT Bombay IV 17th Edition", year: "2025", round: "Round 3", format: "BPD" },
  { id: 107, text: "THO the decoupling between the US and China", category: "International Relations", topics: ["Geopolitics", "US-China Relations"], competition: "IIT Bombay IV 17th Edition", year: "2025", round: "Round 4", format: "BPD" },
  { id: 108, text: "THBT developing countries should significantly invest in startups and MSMEs at the expense of significant investment in state-owned enterprises", category: "Economics & Policy", topics: ["Development", "Economics"], competition: "IIT Bombay IV 17th Edition", year: "2025", round: "Round 5", format: "BPD" },
  { id: 109, text: "In resource-rich developing nations, THW distribute profits earned from resource extraction in cash payments to citizens rather than retained by the government", category: "Economics & Policy", topics: ["Resource Extraction", "Development"], competition: "IIT Bombay IV 17th Edition", year: "2025", round: "Quarterfinals", format: "BPD" },
];

const categories = ["All", "Economics & Policy", "International Relations", "Philosophy & Ethics", "Social Justice & Feminism", "Technology & Media"];
const competitions = ["All Competitions", ...new Set(motionsDatabase.map((motion) => motion.competition))];
const topics = ["All Topics", ...[...new Set(motionsDatabase.flatMap((motion) => motion.topics))].sort()];
// Prefer explicit ordering so the dropdown shows APD first, then All Formats, then BPD
const formats = ["APD", "BPD", "All Formats"];

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCompetition, setActiveCompetition] = useState('All Competitions');
  const [activeTopic, setActiveTopic] = useState('All Topics');
  const [activeFormat, setActiveFormat] = useState('All Formats');

  const filteredMotions = motionsDatabase.filter((motion) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      motion.text.toLowerCase().includes(query) ||
      motion.competition.toLowerCase().includes(query) ||
      motion.topics.some((topic) => topic.toLowerCase().includes(query));
    const matchesCategory = activeCategory === 'All' || motion.category === activeCategory;
    const matchesCompetition = activeCompetition === 'All Competitions' || motion.competition === activeCompetition;
    const matchesTopic = activeTopic === 'All Topics' || motion.topics.includes(activeTopic);
    const matchesFormat = activeFormat === 'All Formats' || motion.format === activeFormat;

    return matchesSearch && matchesCategory && matchesCompetition && matchesTopic && matchesFormat;
  });

  const hasActiveFilters =
    searchQuery ||
    activeCategory !== 'All' ||
    activeCompetition !== 'All Competitions' ||
    activeTopic !== 'All Topics' ||
    activeFormat !== 'All Formats';

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveCompetition('All Competitions');
    setActiveTopic('All Topics');
    setActiveFormat('All Formats');
  };

  return (
    <div className="min-h-screen bg-transparent pb-24 pt-32">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="eyebrow mb-4 text-oxblood">Research Desk / Archive</p>
          <h1 className="mb-6 text-6xl font-semibold text-primary md:text-8xl">Motion Archive</h1>
          <p className="text-sm text-secondary md:text-base">Search and filter past debate motions by competition, topic, or broad category.</p>
        </div>

        <div className="mb-12 flex flex-col gap-6">
          <input
            type="search"
            placeholder="Search motions, competitions, or topics..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="mx-auto w-full max-w-4xl border-2 border-primary bg-paper px-6 py-4 text-primary shadow-poster-gold focus:outline-none"
          />

          <div className="mx-auto w-full max-w-4xl border-2 border-primary bg-paper p-5 shadow-poster">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={17} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">Filter by</span>
              </div>
              {hasActiveFilters && (
                <button type="button" onClick={resetFilters} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-oxblood hover:underline">
                  <RotateCcw size={14} />
                  Reset
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Competition</span>
                <select value={activeCompetition} onChange={(event) => setActiveCompetition(event.target.value)} className="w-full border-2 border-primary bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent">
                  {competitions.map((competition) => <option key={competition} value={competition}>{competition}</option>)}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Topic</span>
                <select value={activeTopic} onChange={(event) => setActiveTopic(event.target.value)} className="w-full border-2 border-primary bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent">
                  {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Format</span>
                <select value={activeFormat} onChange={(event) => setActiveFormat(event.target.value)} className="w-full border-2 border-primary bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent">
                  {formats.map((format) => <option key={format} value={format}>{format}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border-2 border-primary px-5 py-2.5 text-xs font-bold transition-colors ${
                  activeCategory === category ? 'bg-primary text-paper' : 'bg-transparent text-secondary hover:bg-accent hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Showing {filteredMotions.length} of {motionsDatabase.length} motions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredMotions.map((motion) => (
            <article key={motion.id} className="flex flex-col justify-between border-2 border-primary bg-paper p-8 transition-transform hover:-translate-y-1 hover:shadow-poster">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-oxblood">{motion.category}</span>
                <h2 className="mt-3 text-2xl font-serif leading-snug text-primary">“{motion.text}”</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {motion.topics.map((topic) => (
                    <span key={topic} className="border border-primary/25 bg-background px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-primary/20 pt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                {motion.format} • {motion.competition} • {motion.round} • {motion.year}
              </div>
            </article>
          ))}
        </div>

        {filteredMotions.length === 0 && (
          <div className="border-2 border-dashed border-primary/30 py-16 text-center">
            <h2 className="text-3xl font-serif">No matching motions.</h2>
            <button type="button" onClick={resetFilters} className="mt-5 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-paper">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;

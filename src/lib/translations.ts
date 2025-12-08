export type Language = 'en' | 'zu' | 'xh' | 'nso';

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
  { code: 'nso', name: 'Sepedi', nativeName: 'Sepedi' },
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.check': 'Link Checker',
    'nav.password': 'Password Check',
    'nav.tips': 'Safety Tips',
    'nav.report': 'Report Scam',
    
    // Hero
    'hero.title': 'Stay Safe Online',
    'hero.subtitle': 'MzanziShield protects everyday South Africans from online scams, phishing, and cyber threats',
    'hero.cta': 'Check a Suspicious Link',
    
    // Link Checker
    'check.title': 'Link & Message Safety Checker',
    'check.subtitle': 'Paste any suspicious link or message from WhatsApp, SMS, or email',
    'check.placeholder': 'Paste a link or message here...',
    'check.button': 'Check for Threats',
    'check.analyzing': 'Analyzing...',
    'check.safe': 'This appears to be safe',
    'check.warning': 'Warning: This could be suspicious',
    'check.danger': 'Danger: This is likely a scam',
    
    // Password
    'password.title': 'Password Strength Checker',
    'password.subtitle': 'Test your password to see if it\'s strong enough',
    'password.placeholder': 'Enter a password to test...',
    'password.weak': 'Weak',
    'password.medium': 'Medium',
    'password.strong': 'Strong',
    'password.tips': 'Tips to improve',
    
    // Tips
    'tips.title': 'Cyber Safety Tips',
    'tips.subtitle': 'Practical advice to keep you safe online',
    
    // Report
    'report.title': 'Report a Scam',
    'report.subtitle': 'Help protect your community by reporting suspicious activity',
    'report.linkLabel': 'Suspicious Link or Number',
    'report.descLabel': 'Description',
    'report.typeLabel': 'Type of Scam',
    'report.submit': 'Submit Report',
    'report.success': 'Thank you! Your report helps protect others.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.tryAgain': 'Try again',
  },
  zu: {
    // Navigation
    'nav.home': 'Ikhaya',
    'nav.check': 'Hlola Isixhumanisi',
    'nav.password': 'Hlola Iphasiwedi',
    'nav.tips': 'Amacebo Okuphepha',
    'nav.report': 'Bika Inkohliso',
    
    // Hero
    'hero.title': 'Hlala Uphephile Ku-inthanethi',
    'hero.subtitle': 'MzanziShield ivikela abantu baseNingizimu Afrika ezinkohlisweni zaku-inthanethi',
    'hero.cta': 'Hlola Isixhumanisi Esingabazekayo',
    
    // Link Checker
    'check.title': 'Ihloli Lokuphepha Kwezixhumanisi',
    'check.subtitle': 'Namathisela noma yisiphi isixhumanisi esivela kuWhatsApp, SMS, noma i-imeyili',
    'check.placeholder': 'Namathisela isixhumanisi noma umlayezo lapha...',
    'check.button': 'Hlola Izingozi',
    'check.analyzing': 'Kuhlolwa...',
    'check.safe': 'Lokhu kubonakala kuphephile',
    'check.warning': 'Isexwayiso: Lokhu kungaba okungabazekayo',
    'check.danger': 'Ingozi: Lokhu kungase kube inkohliso',
    
    // Password
    'password.title': 'Ihloli Lamandla Ephasiwedi',
    'password.subtitle': 'Hlola iphasiwedi yakho ukuze ubone uma inamandla anele',
    'password.placeholder': 'Faka iphasiwedi ukuze uyihlole...',
    'password.weak': 'Buthakathaka',
    'password.medium': 'Maphakathi',
    'password.strong': 'Qinile',
    'password.tips': 'Amacebo okuthuthukisa',
    
    // Tips
    'tips.title': 'Amacebo Okuphepha Ku-inthanethi',
    'tips.subtitle': 'Izeluleko ezisebenzayo zokukugcina uphephile',
    
    // Report
    'report.title': 'Bika Inkohliso',
    'report.subtitle': 'Siza ukuvikela umphakathi wakho ngokubika okungabazekayo',
    'report.linkLabel': 'Isixhumanisi Noma Inombolo Engabazekayo',
    'report.descLabel': 'Incazelo',
    'report.typeLabel': 'Uhlobo Lwenkohliso',
    'report.submit': 'Thumela Umbiko',
    'report.success': 'Siyabonga! Umbiko wakho usiza ukuvikela abanye.',
    
    // Common
    'common.loading': 'Kuyalayisha...',
    'common.error': 'Kukhona okungahambanga kahle',
    'common.tryAgain': 'Zama futhi',
  },
  xh: {
    // Navigation
    'nav.home': 'Ikhaya',
    'nav.check': 'Jonga Ikhonkco',
    'nav.password': 'Jonga Iphasiwedi',
    'nav.tips': 'Amacebiso Okhuseleko',
    'nav.report': 'Xela Ubuqhetseba',
    
    // Hero
    'hero.title': 'Hlala Ukhuselekile Kwi-intanethi',
    'hero.subtitle': 'MzanziShield ikhusela abantu baseMzantsi Afrika kubuqhetseba be-intanethi',
    'hero.cta': 'Jonga Ikhonkco Elingaqinisekanga',
    
    // Link Checker
    'check.title': 'Umhloli Wokhuseleko Lwekhonkco',
    'check.subtitle': 'Ncamathisela naliphi na ikhonkco elivela kuWhatsApp, SMS, okanye i-imeyile',
    'check.placeholder': 'Ncamathisela ikhonkco okanye umyalezo apha...',
    'check.button': 'Jonga Izoyikiso',
    'check.analyzing': 'Kuyahlolwa...',
    'check.safe': 'Oku kubonakala kukhuselekile',
    'check.warning': 'Isilumkiso: Oku kunokuba kuyathandabuzeka',
    'check.danger': 'Ingozi: Oku kunokuba bubuqhetseba',
    
    // Password
    'password.title': 'Umhloli Wamandla Ephasiwedi',
    'password.subtitle': 'Vavanye iphasiwedi yakho ukuze ubone ukuba yomelele ngokwaneleyo',
    'password.placeholder': 'Faka iphasiwedi ukuze uyivavanye...',
    'password.weak': 'Buthathaka',
    'password.medium': 'Phakathi',
    'password.strong': 'Yomelele',
    'password.tips': 'Amacebiso okuphucula',
    
    // Tips
    'tips.title': 'Amacebiso Okhuseleko Kwi-intanethi',
    'tips.subtitle': 'Amacebiso asebenzayo ukukugcina ukhuselekile',
    
    // Report
    'report.title': 'Xela Ubuqhetseba',
    'report.subtitle': 'Nceda ukukhusela uluntu lwakho ngokuxela okuthandabuzekayo',
    'report.linkLabel': 'Ikhonkco Okanye Inombolo Ethandabuzekayo',
    'report.descLabel': 'Inkcazo',
    'report.typeLabel': 'Uhlobo Lobuqhetseba',
    'report.submit': 'Thumela Ingxelo',
    'report.success': 'Enkosi! Ingxelo yakho inceda ukukhusela abanye.',
    
    // Common
    'common.loading': 'Kuyalayisha...',
    'common.error': 'Kukho into engahambanga kakuhle',
    'common.tryAgain': 'Zama kwakhona',
  },
  nso: {
    // Navigation
    'nav.home': 'Gae',
    'nav.check': 'Lekola Linki',
    'nav.password': 'Lekola Password',
    'nav.tips': 'Maele a Polokego',
    'nav.report': 'Bega Bosenyi',
    
    // Hero
    'hero.title': 'Dula o Bolokegileng Inthaneteng',
    'hero.subtitle': 'MzanziShield e šireletša batho ba Afrika Borwa go bosenyi bja inthanete',
    'hero.cta': 'Lekola Linki ye e Belaelwago',
    
    // Link Checker
    'check.title': 'Molekodi wa Polokego ya Linki',
    'check.subtitle': 'Kgomaretša linki efe goba efe go tšwa go WhatsApp, SMS, goba imeile',
    'check.placeholder': 'Kgomaretša linki goba molaetša mo...',
    'check.button': 'Lekola Dikotsi',
    'check.analyzing': 'Go a lekolwa...',
    'check.safe': 'Se se bonala se bolokegileng',
    'check.warning': 'Temošo: Se se ka ba se belaelwa',
    'check.danger': 'Kotsi: Se e ka ba bosenyi',
    
    // Password
    'password.title': 'Molekodi wa Maatla a Password',
    'password.subtitle': 'Leka password ya gago go bona ge e le maatla go lekana',
    'password.placeholder': 'Tsenya password go e leka...',
    'password.weak': 'Fokola',
    'password.medium': 'Magareng',
    'password.strong': 'Maatla',
    'password.tips': 'Maele a go kaonafatša',
    
    // Tips
    'tips.title': 'Maele a Polokego ya Inthanete',
    'tips.subtitle': 'Keletšo tše di šomago go go boloka o bolokegileng',
    
    // Report
    'report.title': 'Bega Bosenyi',
    'report.subtitle': 'Thuša go šireletša setšhaba sa gago ka go bega tše di belaelwago',
    'report.linkLabel': 'Linki goba Nomoro ye e Belaelwago',
    'report.descLabel': 'Tlhaloso',
    'report.typeLabel': 'Mohuta wa Bosenyi',
    'report.submit': 'Romela Pego',
    'report.success': 'Re a leboga! Pego ya gago e thuša go šireletša ba bangwe.',
    
    // Common
    'common.loading': 'Go a laelwa...',
    'common.error': 'Go na le se sengwe se sa šomago gabotse',
    'common.tryAgain': 'Leka gape',
  },
};

export const safetyTips: Record<Language, { title: string; description: string; icon: string }[]> = {
  en: [
    { title: "Don't pay for jobs on WhatsApp", description: "Legitimate employers never ask for payment. If someone asks you to pay R100 or more to 'secure' a job, it's a scam.", icon: "briefcase" },
    { title: "Check banking URLs carefully", description: "South African banks use .co.za domains. Be suspicious of links that use .com or strange spellings like 'f1rstbank'.", icon: "landmark" },
    { title: "SARS will never ask for card details", description: "SARS communicates through eFiling or official letters. They will never SMS or WhatsApp you asking for banking details.", icon: "shield" },
    { title: "Too good to be true = Scam", description: "Winning a lottery you didn't enter, or getting a 'free' phone? If you didn't apply for it, don't click on it.", icon: "gift" },
    { title: "Verify before you send money", description: "If someone claims to be a family member in trouble, call them directly before sending any money.", icon: "phone" },
    { title: "Use different passwords", description: "Don't use the same password for Facebook and your bank. If one gets hacked, all your accounts are at risk.", icon: "key" },
  ],
  zu: [
    { title: "Ungakhokhi imali yomsebenzi kuWhatsApp", description: "Abaqashi beqiniso abasoze bakucele ukukhokha. Uma umuntu ekucela ukuthi ukhokhe uR100 noma ngaphezulu 'ukuqinisekisa' umsebenzi, kuyinkohliso.", icon: "briefcase" },
    { title: "Hlola ama-URL asebhange ngokucophelela", description: "Amabhange aseNingizimu Afrika asebenzisa ama-domain a-.co.za. Qaphela izixhumanisi ezisebenzisa .com noma ukupela okungajwayelekile.", icon: "landmark" },
    { title: "I-SARS ayisoze icele imininingwane yekhadi", description: "I-SARS ixhumana nge-eFiling noma izincwadi ezisemthethweni. Abasoze bakuthumelele i-SMS noma uWhatsApp becela imininingwane yasebhange.", icon: "shield" },
    { title: "Okuhle kakhulu ukuba kube iqiniso = Inkohliso", description: "Ukuwina ilotho ongangenianga kuyo, noma ukuthola ucingo 'lwamahhala'? Uma ungafakanga isicelo, ungachofozi kuko.", icon: "gift" },
    { title: "Qinisekisa ngaphambi kokuthumela imali", description: "Uma umuntu ethi ungilungu lomndeni elusizini, bashayele ucingo ngqo ngaphambi kokuthumela noma yimuphi imali.", icon: "phone" },
    { title: "Sebenzisa amaphasiwedi ahlukene", description: "Ungasebenzisi iphasiwedi efanayo kuFacebook nasebhange lakho. Uma eyodwa ihlaselwa, zonke i-akhawunti zakho zisengozini.", icon: "key" },
  ],
  xh: [
    { title: "Musa ukuhlawulela imisebenzi kuWhatsApp", description: "Abaqeshi bokwenyani abakubuzi ukuhlawula. Ukuba umntu ukucela ukuhlawula uR100 okanye ngaphezulu 'ukuqinisekisa' umsebenzi, bubuqhetseba.", icon: "briefcase" },
    { title: "Jonga ii-URL zebhanki ngenyameko", description: "Iibhanki zaseMzantsi Afrika zisebenzisa ii-domain ze-.co.za. Krokrela izihlanganiso ezisebenzisa u-.com okanye upelo olungaqhelekanga.", icon: "landmark" },
    { title: "I-SARS ayizokubuza iinkcukacha zekhadi", description: "I-SARS inxibelelana nge-eFiling okanye iileta ezisemthethweni. Abazukukuthumela i-SMS okanye uWhatsApp bekucela iinkcukacha zebhanki.", icon: "shield" },
    { title: "Kulungile kakhulu ukuba yinyaniso = Bubuqhetseba", description: "Ukuphumelela ilotho ongabhalisiyo kuyo, okanye ukufumana ifoni 'simahla'? Ukuba akuzange ufake isicelo, sukucofa kuyo.", icon: "gift" },
    { title: "Qinisekisa phambi kokuthumela imali", description: "Ukuba umntu uthi lilungu losapho elusezingxakini, bafowunele ngqo phambi kokuthumela nayiphi na imali.", icon: "phone" },
    { title: "Sebenzisa iiphasiwedi ezahlukeneyo", description: "Musa ukusebenzisa iphasiwedi efanayo kuFacebook nakwibhanki yakho. Ukuba enye iyahlaselwa, zonke ii-akhawunti zakho zisemngciphekweni.", icon: "key" },
  ],
  nso: [
    { title: "O se ke wa lefa mešomo go WhatsApp", description: "Bašomi ba kgonthe ga ba kgopele tefo. Ge motho a go kgopela go lefa R100 goba go feta go 'netefatša' mošomo, ke bosenyi.", icon: "briefcase" },
    { title: "Lekola di-URL tša panka ka šedi", description: "Dipanka tša Afrika Borwa di šomiša di-domain tša .co.za. Belaela dikgokagano tše di šomišago .com goba mopeleto wo o sa tlwaelegago.", icon: "landmark" },
    { title: "SARS e ka se kgopele dintlha tša karata", description: "SARS e boledišana ka eFiling goba mangwalo a semmušo. Ga ba kitimele go go romelela SMS goba WhatsApp ba kgopela dintlha tša panka.", icon: "shield" },
    { title: "Go kaone kudu go ba therešo = Bosenyi", description: "Go thopa lothari ye o sego wa e tsena, goba go hwetša sellathekeng 'sa mahala'? Ge o sa dirile kgopelo, o se ke wa tobetsa go yona.", icon: "gift" },
    { title: "Netefatša pele o romela tšhelete", description: "Ge motho a re ke leloko la lapa le le mathateng, ba leletše thwii pele o romela tšhelete efe goba efe.", icon: "phone" },
    { title: "Šomiša di-password tše di fapanego", description: "O se ke wa šomiša password e tee go Facebook le pankeng ya gago. Ge e tee e senywa, di-account ka moka tša gago di kotsing.", icon: "key" },
  ],
};

export const scamTypes: Record<Language, { value: string; label: string }[]> = {
  en: [
    { value: 'job', label: 'Fake Job Offer' },
    { value: 'bank', label: 'Banking/Phishing' },
    { value: 'lottery', label: 'Lottery/Prize Scam' },
    { value: 'store', label: 'Fraudulent Online Store' },
    { value: 'romance', label: 'Romance Scam' },
    { value: 'other', label: 'Other' },
  ],
  zu: [
    { value: 'job', label: 'Isethembiso Somsebenzi Ongewona' },
    { value: 'bank', label: 'Ebhange/Phishing' },
    { value: 'lottery', label: 'Inkohliso Yelotho/Yomklomelo' },
    { value: 'store', label: 'Isitolo Saku-inthanethi Esingamanga' },
    { value: 'romance', label: 'Inkohliso Yothando' },
    { value: 'other', label: 'Okunye' },
  ],
  xh: [
    { value: 'job', label: 'Isibonelelo Somsebenzi Obuxoki' },
    { value: 'bank', label: 'Ebhanki/Phishing' },
    { value: 'lottery', label: 'Ubuqhetseba Belotho/Mbasa' },
    { value: 'store', label: 'Ivenkile Ye-intanethi Yobuqhetseba' },
    { value: 'romance', label: 'Ubuqhetseba Bothando' },
    { value: 'other', label: 'Enye' },
  ],
  nso: [
    { value: 'job', label: 'Sethembiso sa Mošomo wa Maaka' },
    { value: 'bank', label: 'Panka/Phishing' },
    { value: 'lottery', label: 'Bosenyi bja Lothari/Mpho' },
    { value: 'store', label: 'Lebenkele la Inthanete la Bosenyi' },
    { value: 'romance', label: 'Bosenyi bja Lerato' },
    { value: 'other', label: 'Tše Dingwe' },
  ],
};

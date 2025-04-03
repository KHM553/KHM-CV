const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-btn');
const quickReplies = document.querySelectorAll('.quick-reply');

// قاعدة بيانات الردود
const responses = {
    "من هو خباب": {
        type: 'profile',
        content: {
            text: "خباب سيف الدين هو طالب في آخر مرحلة ثانوية، شغوف بتطوير البرمجيات وهندسة الشبكات. متخصص في تصميم المواقع وإدارة الشبكات.",
            image: "https://www2.0zz0.com/2025/03/18/05/915054445.png",
            details: [
                { icon: "fas fa-graduation-cap", text: "طالب في آخر مرحلة ثانوية" },
                { icon: "fas fa-laptop-code", text: "مطور ويب" },
                { icon: "fas fa-network-wired", text: "مهندس شبكات" }
            ]
        }
    },
    "دراسته": {
        type: 'education',
        content: {
            title: "المعلومات الدراسية",
            currentLevel: "المرحلة الثانوية - السنة النهائية",
            details: "يدرس خباب حالياً في آخر مرحلة من المرحلة الثانوية (الصف الثالث الثانوي)، ويتميز بالتركيز على دراسته الأكاديمية مع تطوير مهاراته في مجالات البرمجة والتقنية بشكل متوازي.",
            icon: "fas fa-graduation-cap",
            additionalInfo: "متفوق في المواد العلمية والتقنية"
        }
    },
    "ما هي مهاراته": {
        type: 'skills',
        content: [
            { name: "مهارة التحدث", level: 95, icon: "fas fa-comments" },
            { name: "استخدام الحاسب", level: 90, icon: "fas fa-laptop" },
            { name: "منتجات قوقل", level: 92, icon: "fab fa-google" },
            { name: "العمل الجماعي", level: 85, icon: "fas fa-users" },
            { name: "مهارة البحث", level: 88, icon: "fas fa-search" },
            { name: "التصميم", level: 87, icon: "fas fa-paint-brush" }
        ]
    },
    "مشاريعه": {
        type: 'projects',
        content: [
            {
                name: "منصة عافيتي",
                description: "منصة طبية متكاملة تهدف إلى تسهيل الوصول للخدمات الصحية",
                category: "تطوير ويب",
                tags: ["HTML", "CSS", "JavaScript"],
                status: "قيد التطوير"
            },
            {
                name: "براند KHM",
                description: "علامة تجارية خاصة تضم منتجات مميزة ومبتكرة",
                category: "تصميم هوية",
                tags: ["Brand Identity", "Product Design"],
                status: "مكتمل"
            },
            {
                name: "براند الملابس",
                description: "تصميمات عصرية مميزة تعكس الهوية الشخصية",
                category: "تصميم أزياء",
                tags: ["Fashion Design", "Branding"],
                status: "مكتمل"
            }
        ]
    },
    "كيف أتواصل معه": {
        type: 'contact',
        content: {
            email: "khabab.seif87@email.com",
            text: "يمكنك التواصل معي مباشرة عبر البريد الإلكتروني",
            action: "email"
        }
    },
    "شركاء النجاح": {
        type: 'partners',
        content: [
            {
                name: "إدارة النسيج العربي",
                category: "شريك صناعي",
                description: "شركة رائدة في مجال النسيج والملابس"
            },
            {
                name: "وزارة الصحة",
                category: "شريك حكومي",
                description: "شريك استراتيجي في المجال الصحي"
            },
            {
                name: "الهلال الأحمر السعودي",
                category: "شريك مجتمعي",
                description: "شراكة في مجال العمل التطوعي"
            },
            {
                name: "سدايا",
                category: "شريك تقني",
                description: "مؤسسة متخصصة في مجال الذكاء الاصطناعي"
            }
        ]
    },
    "اهتماماته": {
        type: 'interests',
        content: {
            title: "اهتمامات خباب",
            interests: [
                {
                    icon: "fas fa-code",
                    name: "البرمجة والتطوير",
                    description: "شغوف بتطوير المواقع والتطبيقات وتعلم التقنيات الجديدة"
                },
                {
                    icon: "fas fa-network-wired",
                    name: "هندسة الشبكات",
                    description: "مهتم بتصميم وإدارة شبكات الحاسب"
                },
                {
                    icon: "fas fa-tshirt",
                    name: "تصميم الأزياء",
                    description: "تصميم وتطوير الملابس العصرية"
                },
                {
                    icon: "fas fa-robot",
                    name: "الذكاء الاصطناعي",
                    description: "دراسة وتطبيق تقنيات الذكاء الاصطناعي"
                }
            ]
        }
    },
    "براند الملابس": {
        type: 'brand',
        content: {
            name: "براند الملابس الخاص بي",
            description: "علامة تجارية مميزة للملابس العصرية تجمع بين الأصالة والحداثة",
            features: [
                "تصاميم عصرية مبتكرة",
                "جودة عالية في التنفيذ",
                "هوية بصرية فريدة",
                "أسعار تنافسية"
            ],
            collections: [
                "الملابس الكاجوال",
                "التصاميم الرياضية",
                "الإصدارات المحدودة"
            ]
        }
    },
    "براند KHM": {
        type: 'brand',
        content: {
            name: "براند KHM",
            description: "علامة تجارية مميزة تضم مجموعة متنوعة من المنتجات المبتكرة والمتميزة تحت مظلة واحدة",
            features: [
                "هوية بصرية مميزة",
                "منتجات متنوعة ومبتكرة",
                "جودة عالية في التصنيع",
                "تصاميم عصرية وفريدة"
            ],
            collections: [
                "المنتجات التقنية",
                "الأدوات المكتبية",
                "الإكسسوارات",
                "المنتجات المخصصة"
            ]
        }
    },
    "الشهادات": {
        type: 'certificates',
        content: {
            title: "الشهادات والدورات المعتمدة",
            description: "حاصل على مجموعة من الشهادات المعتمدة في مجالات مختلفة",
            certificates: [
                {
                    name: "الأمن السيبراني",
                    provider: "إدراك",
                    description: "شهادة معتمدة في الأمن السيبراني والحماية الرقمية",
                    icon: "fas fa-shield-alt",
                    date: "2024",
                    duration: "3 أشهر"
                },
                {
                    name: "ICDL",
                    provider: "الرخصة الدولية",
                    description: "الرخصة الدولية لقيادة الحاسب الآلي المعتمدة دولياً",
                    icon: "fas fa-laptop-code",
                    date: "2023",
                    modules: ["Word", "Excel", "PowerPoint", "Internet"]
                },
                {
                    name: "العمل التطوعي",
                    provider: "الهلال الأحمر السعودي",
                    description: "شهادة في مجال العمل التطوعي والإسعافات الأولية",
                    icon: "fas fa-hands-helping"
                },
                {
                    name: "الذكاء الاصطناعي",
                    provider: "سدايا",
                    description: "شهادة متخصصة في مجال الذكاء الاصطناعي وتطبيقاته",
                    icon: "fas fa-brain"
                },
                {
                    name: "الرعاية الصحية",
                    provider: "وزارة الصحة السعودية",
                    description: "شهادة في مجال الرعاية الصحية والسلامة",
                    icon: "fas fa-hospital"
                }
            ]
        }
    },
    "شهادة الذكاء الاصطناعي": {
        type: 'single-certificate',
        content: {
            name: "شهادة الذكاء الاصطناعي",
            provider: "هيئة البيانات والذكاء الاصطناعي (سدايا)",
            description: "نعم، حاصل على شهادة معتمدة من هيئة البيانات والذكاء الاصطناعي (سدايا)، وهي تشمل أساسيات وتطبيقات الذكاء الاصطناعي والتعلم الآلي",
            icon: "fas fa-brain",
            date: "2024",
            duration: "4 أشهر",
            topics: ["أساسيات الذكاء الاصطناعي", "التعلم الآلي", "معالجة البيانات", "تطبيقات عملية"]
        }
    },
    "شهادة الأمن السيبراني": {
        type: 'single-certificate',
        content: {
            name: "شهادة الأمن السيبراني",
            provider: "إدراك",
            description: "نعم، حاصل على شهادة متخصصة في الأمن السيبراني من منصة إدراك، تشمل أساسيات الأمن الرقمي والحماية السيبرانية",
            icon: "fas fa-shield-alt"
        }
    },
    "شهادة ICDL": {
        type: 'single-certificate',
        content: {
            name: "ICDL شهادة",
            provider: "الرخصة الدولية",
            description: "نعم، لديه الرخصة الدولية لقيادة الحاسب الآلي (ICDL) المعتمدة دولياً",
            icon: "fas fa-laptop-code"
        }
    },
    "شهادة وزارة الصحة": {
        type: 'single-certificate',
        content: {
            name: "شهادة الرعاية الصحية",
            provider: "وزارة الصحة السعودية",
            description: "نعم، حاصل على شهادة معتمدة في مجال الرعاية الصحية والسلامة من وزارة الصحة السعودية",
            icon: "fas fa-hospital",
            date: "2024"
        }
    },
    "شهادة الهلال الأحمر": {
        type: 'single-certificate',
        content: {
            name: "شهادة العمل التطوعي",
            provider: "الهلال الأحمر السعودي",
            description: "نعم، حاصل على شهادة في مجال العمل التطوعي والإسعافات الأولية من الهلال الأحمر السعودي",
            icon: "fas fa-hands-helping",
            date: "2023"
        }
    },
    "منصة عافيتي": {
        type: 'project-details',
        content: {
            name: "منصة عافيتي",
            status: "قيد التطوير",
            description: "منصة طبية متكاملة تهدف إلى تسهيل الوصول للخدمات الصحية وربط المرضى بالأطباء بشكل مباشر",
            image: "https://www2.0zz0.com/2025/03/29/11/446576212.png",
            features: [
                "حجز المواعيد الطبية",
                "استشارات طبية عن بعد",
                "متابعة الحالة الصحية",
                "وصفات طبية إلكترونية"
            ],
            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "React.js",
                "Node.js"
            ]
        }
    },
    "مهارة منتجات قوقل": {
        type: 'single-skill',
        content: {
            name: "منتجات قوقل",
            level: 92,
            icon: "fab fa-google",
            description: "نعم، لديه خبرة ممتازة في استخدام منتجات قوقل المختلفة مثل محرر المستندات وجداول البيانات والعروض التقديمية وغيرها",
            examples: [
                "Google Docs",
                "Google Sheets",
                "Google Slides",
                "Google Drive",
                "Google Forms"
            ]
        }
    },
    "مهارة التحدث": {
        type: 'single-skill',
        content: {
            name: "مهارة التحدث",
            level: 95,
            icon: "fas fa-comments",
            description: "يتميز بقدرة ممتازة على التواصل والتحدث بطلاقة وإيصال الأفكار بوضوح تام",
            strengths: [
                "التحدث بثقة وطلاقة",
                "القدرة على الإقناع",
                "مهارات العرض والتقديم",
                "التواصل الفعال"
            ]
        }
    },
    "مهارة الحاسب": {
        type: 'single-skill',
        content: {
            name: "استخدام الحاسب",
            level: 90,
            icon: "fas fa-laptop",
            description: "متمكن من استخدام الحاسب الآلي وتطبيقاته المختلفة بكفاءة عالية",
            examples: [
                "برامج Microsoft Office",
                "أنظمة التشغيل",
                "إدارة الملفات",
                "برامج التصميم"
            ]
        }
    },
    "مهارة العمل الجماعي": {
        type: 'single-skill',
        content: {
            name: "العمل الجماعي",
            level: 85,
            icon: "fas fa-users",
            description: "يمتلك قدرة عالية على العمل ضمن فريق وبناء علاقات إيجابية مع زملاء العمل",
            strengths: [
                "التعاون الفعال",
                "روح الفريق",
                "المشاركة في اتخاذ القرارات",
                "تقبل الآراء المختلفة"
            ]
        }
    },
    "مهارة البحث": {
        type: 'single-skill',
        content: {
            name: "مهارة البحث",
            level: 88,
            icon: "fas fa-search",
            description: "قدرة متميزة على البحث وجمع المعلومات وتحليلها بشكل فعال",
            examples: [
                "البحث الأكاديمي",
                "جمع المعلومات",
                "تحليل البيانات",
                "توثيق المصادر"
            ]
        }
    },
    "مهارة التصميم": {
        type: 'single-skill',
        content: {
            name: "التصميم",
            level: 87,
            icon: "fas fa-paint-brush",
            description: "مهارة عالية في التصميم وإنشاء المحتوى البصري الجذاب",
            examples: [
                "تصميم واجهات المستخدم",
                "التصميم الجرافيكي",
                "تصميم الهويات البصرية",
                "معالجة الصور"
            ]
        }
    },
    "الخبرة العملية": {
        type: 'experience',
        content: {
            name: "شركة مصنع النسيج العربي",
            position: "متدرب",
            duration: "3 أشهر",
            description: "عمل في مجال تصميم وتطوير المنتجات النسيجية والملابس، واكتسب خبرة في مجال التصميم والإنتاج",
            responsibilities: [
                "تصميم النماذج الأولية للمنتجات",
                "متابعة عمليات الإنتاج",
                "تطوير المنتجات وتحسين جودتها",
                "العمل مع فريق التصميم والإنتاج"
            ],
            icon: "fas fa-industry"
        }
    },
    "شركة النسيج": {
        type: 'experience',
        content: {
            name: "شركة مصنع النسيج العربي",
            position: "متدرب",
            duration: "3 أشهر",
            description: "شركة رائدة في مجال صناعة النسيج والملابس، تتميز بجودة منتجاتها وتصاميمها العصرية",
            details: [
                "تصنيع منتجات نسيجية عالية الجودة",
                "تصميم وإنتاج الملابس العصرية",
                "استخدام أحدث التقنيات في الإنتاج",
                "خبرة تمتد لأكثر من 20 عاماً"
            ],
            icon: "fas fa-industry"
        }
    },
    "الجنسية": {
        type: 'nationality',
        content: {
            text: "خباب سيف الدين من السودان 🇸🇩",
            description: "سوداني الجنسية",
            flagImage: "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg",
            details: [
                { icon: "fas fa-flag", text: "السودان" },
                { icon: "fas fa-map-marker-alt", text: "شمال شرق أفريقيا" }
            ]
        }
    },
    "ما هي هواياته": "اهتماماته",
    "بماذا يهتم": "اهتماماته",
    "ماذا يحب": "اهتماماته",
    "عن براند الملابس": "براند الملابس",
    "احكي لي عن البراند": "براند الملابس",
    "ماذا يدرس": "من هو خباب",
    "اين يدرس": "من هو خباب",
    "ما هو تخصصه": "من هو خباب",
    "كيف اتواصل": "كيف أتواصل معه",
    "معلومات الاتصال": "كيف أتواصل معه",
    "البريد الالكتروني": "كيف أتواصل معه",
    "عرفني على خباب": "من هو خباب",
    "من يكون خباب": "من هو خباب",
    "اخبرني عن خباب": "من هو خباب",
    "ما هي قدراته": "ما هي مهاراته",
    "ماذا يتقن": "ما هي مهاراته",
};

// تحسين قاعدة البيانات للكلمات المفتاحية
const brandKeywords = {
    // براند KHM
    'khm': 'براند KHM',
    'براند khm': 'براند KHM',
    'خباب براند': 'براند KHM',
    'العلامة التجارية khm': 'براند KHM',
    'منتجات خباب': 'براند KHM',
    'منتجاته': 'براند KHM',
    
    // براند الملابس
    'براند الملابس': 'براند الملابس',
    'ملابس': 'براند الملابس',
    'تشيرتات': 'براند الملابس',
    'الازياء': 'براند الملابس',
};

const keywordMap = {
    // معلومات شخصية
    'من': 'من هو خباب',
    'خباب': 'من هو خباب',
    'عن خباب': 'من هو خباب',
    'عرفني': 'من هو خباب',
    'نبذة': 'من هو خباب',
    'السيرة الذاتية': 'من هو خباب',
    'معلومات عن': 'من هو خباب',
    'تعريف': 'من هو خباب',

    // كلمات باللهجة السعودية للمعلومات الشخصية
    'وشو': 'من هو خباب',
    'منهو': 'من هو خباب',
    'منو': 'من هو خباب',
    'وش يسوي': 'من هو خباب',
    'وش يشتغل': 'من هو خباب',
    'ايش يسوي': 'من هو خباب',
    'شغال وش': 'من هو خباب',

    // المهارات
    'مهارات': 'ما هي مهاراته',
    'قدرات': 'ما هي مهاراته',
    'يتقن': 'ما هي مهاراته',
    'خبرات': 'ما هي مهاراته',
    'يعرف': 'ما هي مهاراته',
    'متمكن من': 'ما هي مهاراته',
    'يجيد': 'ما هي مهاراته',
    'المهارات': 'ما هي مهاراته',

    // كلمات للمهارات باللهجة السعودية
    'وش يعرف': 'ما هي مهاراته',
    'ايش يعرف': 'ما هي مهاراته',
    'وش يسوي': 'ما هي مهاراته',
    'يعرف ايش': 'ما هي مهاراته',
    'يقدر على': 'ما هي مهاراته',
    'وش يشتغل': 'ما هي مهاراته',
    'شاطر في': 'ما هي مهاراته',
    
    // مهارات محددة
    'منتجات قوقل': 'مهارة منتجات قوقل',
    'قوقل': 'مهارة منتجات قوقل',
    'جوجل': 'مهارة منتجات قوقل',
    'google': 'مهارة منتجات قوقل',

    'مهارة التحدث': 'مهارة التحدث',
    'التحدث': 'مهارة التحدث',
    'الحديث': 'مهارة التحدث',
    'الكلام': 'مهارة التحدث',
    'يتكلم': 'مهارة التحدث',
    'خطابة': 'مهارة التحدث',
    'مهارة الكلام': 'مهارة التحدث',

    'استخدام الحاسب': 'مهارة الحاسب',
    'حاسب': 'مهارة الحاسب',
    'كمبيوتر': 'مهارة الحاسب',
    'الحاسوب': 'مهارة الحاسب',
    'يستخدم الحاسب': 'مهارة الحاسب',
    'مهارة الحاسب': 'مهارة الحاسب',
    'الكمبيوتر': 'مهارة الحاسب',
    'استخدام الكمبيوتر': 'مهارة الحاسب',

    'العمل الجماعي': 'مهارة العمل الجماعي',
    'عمل جماعي': 'مهارة العمل الجماعي',
    'فريق': 'مهارة العمل الجماعي',
    'تيم وورك': 'مهارة العمل الجماعي',
    'العمل في فريق': 'مهارة العمل الجماعي',
    'يعمل مع فريق': 'مهارة العمل الجماعي',
    'التعاون': 'مهارة العمل الجماعي',
    'يتعاون': 'مهارة العمل الجماعي',

    'مهارة البحث': 'مهارة البحث',
    'البحث': 'مهارة البحث',
    'بحث': 'مهارة البحث',
    'يبحث': 'مهارة البحث',
    'البحث العلمي': 'مهارة البحث',
    'مهارة البحث': 'مهارة البحث',
    'قدرة البحث': 'مهارة البحث',
    'يجمع معلومات': 'مهارة البحث',
    'جمع المعلومات': 'مهارة البحث',

    'التصميم': 'مهارة التصميم',
    'تصميم': 'مهارة التصميم',
    'يصمم': 'مهارة التصميم',
    'جرافيك': 'مهارة التصميم',
    'تصميم جرافيك': 'مهارة التصميم',
    'فوتوشوب': 'مهارة التصميم',
    'تصاميم': 'مهارة التصميم',

    // المشاريع
    'مشاريع': 'مشاريعه',
    'اعمال': 'مشاريعه',
    'انجازات': 'مشاريعه',
    'عمل على': 'مشاريعه',
    'صمم': 'مشاريعه',
    'طور': 'مشاريعه',
    'المشاريع': 'مشاريعه',
    'شو مسوي': 'مشاريعه',

    // كلمات للمشاريع باللهجة السعودية
    'وش مسوي': 'مشاريعه',
    'ايش مسوي': 'مشاريعه',
    'وش سوا': 'مشاريعه',
    'سوا ايش': 'مشاريعه',
    'مشاريعه وش': 'مشاريعه',
    'شغلاته': 'مشاريعه',
    'اعماله': 'مشاريعه',

    // التواصل
    'تواصل': 'كيف أتواصل معه',
    'اتصال': 'كيف أتواصل معه',
    'ايميل': 'كيف أتواصل معه',
    'بريد': 'كيف أتواصل معه',
    'معلومات الاتصال': 'كيف أتواصل معه',
    'التواصل': 'كيف أتواصل معه',
    'راسله': 'كيف أتواصل معه',
    'اتصل به': 'كيف أتواصل معه',

    // كلمات للتواصل باللهجة السعودية
    'كيف اكلمه': 'كيف أتواصل معه',
    'ابي اكلمه': 'كيف أتواصل معه',
    'ابغى اكلمه': 'كيف أتواصل معه',
    'وش رقمه': 'كيف أتواصل معه',
    'رقمه كم': 'كيف أتواصل معه',
    'ايميله': 'كيف أتواصل معه',

    // الشركاء
    'شركاء': 'شركاء النجاح',
    'متعاون': 'شركاء النجاح',
    'يتعاون': 'شركاء النجاح',
    'شراكات': 'شركاء النجاح',
    'الشركاء': 'شركاء النجاح',
    'علاقات': 'شركاء النجاح',
    'يعمل مع': 'شركاء النجاح',

    // الاهتمامات
    'هوايات': 'اهتماماته',
    'يحب': 'اهتماماته',
    'اهتمامات': 'اهتماماته',
    'شغف': 'اهتماماته',
    'يهتم': 'اهتماماته',
    'مهتم': 'اهتماماته',
    'يستمتع': 'اهتماماته',

    // كلمات للاهتمامات باللهجة السعودية
    'وش يحب': 'اهتماماته',
    'ايش يحب': 'اهتماماته',
    'وش هواياته': 'اهتماماته',
    'ايش هواياته': 'اهتماماته',
    'يحب ايش': 'اهتماماته',
    'يحب وش': 'اهتماماته',

    // التعليم
    'يدرس': 'دراسته',
    'دراسة': 'دراسته',
    'الدراسة': 'دراسته',
    'المرحلة': 'دراسته',
    'ثانوي': 'دراسته',
    'ثانوية': 'دراسته',
    'طالب': 'دراسته',
    'تعليم': 'دراسته',
    'مستواه': 'دراسته',
    'صف': 'دراسته',
    'سنة كم': 'دراسته',
    'وين يدرس': 'دراسته',
    'متخرج من': 'دراسته',
    'ايش يدرس': 'دراسته',
    'كم صف': 'دراسته',
    'سنة دراسية': 'دراسته',
    'مستوى دراسي': 'دراسته',
    'في اي مدرسة': 'دراسته',
    'وين درس': 'دراسته',

    // كلمات للدراسة باللهجة السعودية
    'وين يدرس': 'دراسته',
    'وش يدرس': 'دراسته',
    'ايش يدرس': 'دراسته',
    'في اي صف': 'دراسته',
    'باي صف': 'دراسته',
    'في اي مدرسة': 'دراسته',
    'دارس وش': 'دراسته',
    'دارس ايش': 'دراسته',

    // الشهادات العامة
    'شهادات': 'الشهادات',
    'دورات': 'الشهادات',
    'مؤهلات': 'الشهادات',
    'تدريب': 'الشهادات',
    'هل لديه شهادة': 'الشهادات',
    'شهادة في': 'الشهادات',
    'هل درس': 'الشهادات',
    'هل حصل على': 'الشهادات',
    'هل معه شهادة': 'الشهادات',
    'هل عنده شهادة': 'الشهادات',
    'حاصل على': 'الشهادات',
    'ايش شهاداته': 'الشهادات',
    'كم شهادة': 'الشهادات',
    'شهادات في': 'الشهادات',

    // كلمات للشهادات باللهجة السعودية
    'عنده شهادات': 'الشهادات',
    'معه شهادات': 'الشهادات',
    'وش شهاداته': 'الشهادات',
    'ايش شهاداته': 'الشهادات',
    'متخرج من وين': 'الشهادات',
    'دارس وين': 'الشهادات',

    // شهادات محددة
    'شهادة سيبراني': 'شهادة الأمن السيبراني',
    'شهادة امن': 'شهادة الأمن السيبراني',
    'امن معلومات': 'شهادة الأمن السيبراني',
    'السايبر': 'شهادة الأمن السيبراني',
    'شهادة ذكاء': 'شهادة الذكاء الاصطناعي',
    'شهادة ai': 'شهادة الذكاء الاصطناعي',
    'تدريب سدايا': 'شهادة الذكاء الاصطناعي',
    'رخصة كمبيوتر': 'شهادة ICDL',
    'شهادة كمبيوتر': 'شهادة ICDL',
    'رخصة حاسب': 'شهادة ICDL',

    // شهادة وزارة الصحة
    'شهادة صحة': 'شهادة وزارة الصحة',
    'شهادة وزارة الصحة': 'شهادة وزارة الصحة',
    'شهادة طبية': 'شهادة وزارة الصحة',
    'شهادة رعاية صحية': 'شهادة وزارة الصحة',
    'دورة صحية': 'شهادة وزارة الصحة',
    'تدريب صحي': 'شهادة وزارة الصحة',
    'وزارة صحة': 'شهادة وزارة الصحة',

    // شهادة الهلال الأحمر
    'شهادة هلال': 'شهادة الهلال الأحمر',
    'شهادة الهلال': 'شهادة الهلال الأحمر',
    'شهادة تطوع': 'شهادة الهلال الأحمر',
    'شهادة اسعافات': 'شهادة الهلال الأحمر',
    'دورة هلال': 'شهادة الهلال الأحمر',
    'تدريب هلال': 'شهادة الهلال الأحمر',
    'هلال احمر': 'شهادة الهلال الأحمر',

    // شهادة سدايا والذكاء الاصطناعي
    'سدايا': 'شهادة الذكاء الاصطناعي',
    'شهادة سدايا': 'شهادة الذكاء الاصطناعي',
    'شهادات سدايا': 'شهادة الذكاء الاصطناعي',
    'دورة سدايا': 'شهادة الذكاء الاصطناعي',
    'هيئة سدايا': 'شهادة الذكاء الاصطناعي',
    'شهادة الذكاء': 'شهادة الذكاء الاصطناعي',
    'شهادة ذكاء اصطناعي': 'شهادة الذكاء الاصطناعي',
    'الذكاء الاصطناعي': 'شهادة الذكاء الاصطناعي',
    'شهادة ai': 'شهادة الذكاء الاصطناعي',
    'هيئة البيانات': 'شهادة الذكاء الاصطناعي',

    // منصة عافيتي
    'منصة': 'منصة عافيتي',
    'عافيتي': 'منصة عافيتي',
    'منصة عافيتي': 'منصة عافيتي',
    'المنصة الطبية': 'منصة عافيتي',
    'المنصة': 'منصة عافيتي',
    'مشروع عافيتي': 'منصة عافيتي',
    'عافية': 'منصة عافيتي',

    // الخبرة العملية
    'خبرة': 'الخبرة العملية',
    'خبرة عملية': 'الخبرة العملية',
    'تدريب عملي': 'الخبرة العملية',
    'عمل في': 'الخبرة العملية',
    'وين تدرب': 'الخبرة العملية',
    'وين اشتغل': 'الخبرة العملية',
    'تدرب وين': 'الخبرة العملية',

    // كلمات للخبرة باللهجة السعودية
    'وين اشتغل': 'الخبرة العملية',
    'فين شتغل': 'الخبرة العملية',
    'له خبرة': 'الخبرة العملية',
    'عنده خبرة': 'الخبرة العملية',
    'شغال وين': 'الخبرة العملية',
    'تدرب وين': 'الخبرة العملية',

    // شركة النسيج
    'نسيج': 'شركة النسيج',
    'مصنع النسيج': 'شركة النسيج',
    'النسيج العربي': 'شركة النسيج',
    'شركة النسيج': 'شركة النسيج',
    'المصنع': 'شركة النسيج',

    // الجنسية
    'جنسية': 'الجنسية',
    'جنسيته': 'الجنسية',
    'من وين': 'الجنسية',
    'من اين': 'الجنسية',
    'من أين': 'الجنسية',
    'بلده': 'الجنسية',
    'دولته': 'الجنسية',
    'من اي دولة': 'الجنسية',
    'من أي دولة': 'الجنسية',
    'من اي بلد': 'الجنسية',
    'من أي بلد': 'الجنسية',
    'سوداني': 'الجنسية',
    'السودان': 'الجنسية',

    // كلمات للجنسية باللهجة السعودية
    'منين': 'الجنسية',
    'منوين': 'الجنسية',
    'من وين جاي': 'الجنسية',
    'وين ساكن': 'الجنسية',
    'وين عايش': 'الجنسية',
    'بلده وين': 'الجنسية',
    'اصله وين': 'الجنسية',
    'من وين اصله': 'الجنسية',

    // أسئلة عامة
    'ممكن': 'كيف أتواصل معه',
    'كيف': 'كيف أتواصل معه',
    'وين': 'كيف أتواصل معه',
    'احتاج': 'كيف أتواصل معه',
    'اريد': 'كيف أتواصل معه',
    'ابغى': 'كيف أتواصل معه',
    ...brandKeywords
};

function createMessageContent(response) {
    if (typeof response === 'string') {
        return `<div class="message-content">${response}</div>`;
    }

    switch (response.type) {
        case 'profile':
            return `
                <div class="message-content profile-card">
                    <img src="${response.content.image}" alt="خباب سيف">
                    <p>${response.content.text}</p>
                    <div class="profile-details">
                        ${response.content.details.map(detail => `
                            <div class="detail-item">
                                <i class="${detail.icon}"></i>
                                <span>${detail.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

        case 'skills':
            return `
                <div class="message-content skills-grid">
                    ${response.content.map(skill => `
                        <div class="skill-item">
                            <i class="${skill.icon}"></i>
                            <div class="skill-info">
                                <span>${skill.name}</span>
                                <div class="skill-bar">
                                    <div class="skill-level" style="width: ${skill.level}%">
                                        <span>${skill.level}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

        case 'contact':
            return `
                <div class="message-content contact-info">
                    <p>${response.content.text}</p>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${response.content.email}&su=استفسار من موقعك الشخصي&body=السلام عليكم،%0D%0A" target="_blank" class="contact-btn">
                        <i class="fab fa-google"></i>
                        فتح Gmail للتواصل
                    </a>
                </div>
            `;

        case 'projects':
            return `
                <div class="message-content projects-list">
                    ${response.content.map(project => `
                        <div class="project-item">
                            <div class="project-header">
                                <h4>${project.name}</h4>
                                <span class="project-status ${project.status === 'مكتمل' ? 'completed' : 'in-progress'}">
                                    ${project.status}
                                </span>
                            </div>
                            <span class="project-category">
                                <i class="fas fa-folder"></i> ${project.category}
                            </span>
                            <p>${project.description}</p>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

        case 'partners':
            return `
                <div class="message-content partners-list">
                    <div class="partners-grid">
                        ${response.content.map(partner => `
                            <div class="partner-item">
                                <span class="partner-category">${partner.category}</span>
                                <h4>${partner.name}</h4>
                                <p>${partner.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

        case 'interests':
            return `
                <div class="message-content interests-list">
                    <h4>${response.content.title}</h4>
                    <div class="interests-grid">
                        ${response.content.interests.map(interest => `
                            <div class="interest-item">
                                <i class="${interest.icon}"></i>
                                <h5>${interest.name}</h5>
                                <p>${interest.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

        case 'brand':
            return `
                <div class="message-content brand-info">
                    <h4>${response.content.name}</h4>
                    <p>${response.content.description}</p>
                    <div class="brand-features">
                        <h5>المميزات:</h5>
                        <ul>
                            ${response.content.features.map(feature => `
                                <li><i class="fas fa-check"></i> ${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="brand-collections">
                        <h5>التشكيلات:</h5>
                        <div class="collections-tags">
                            ${response.content.collections.map(collection => `
                                <span class="collection-tag">${collection}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

        case 'education':
            return `
                <div class="message-content education-info">
                    <div class="education-header">
                        <i class="${response.content.icon}"></i>
                        <h4>${response.content.title}</h4>
                    </div>
                    <div class="education-current">
                        <span class="level-badge">${response.content.currentLevel}</span>
                    </div>
                    <p>${response.content.details}</p>
                </div>
            `;

        case 'certificates':
            return `
                <div class="message-content certificates-list">
                    <h4>${response.content.title}</h4>
                    <div class="certificates-grid">
                        ${response.content.certificates.map(cert => `
                            <div class="certificate-item">
                                <i class="${cert.icon}"></i>
                                <div class="cert-info">
                                    <h5>${cert.name}</h5>
                                    <span class="provider">${cert.provider}</span>
                                    <p>${cert.description}</p>
                                    ${cert.date ? `<span class="cert-date">تاريخ الإصدار: ${cert.date}</span>` : ''}
                                    ${cert.duration ? `<span class="cert-duration">المدة: ${cert.duration}</span>` : ''}
                                    ${cert.modules ? `<div class="cert-modules">المواد: ${cert.modules.join(', ')}</div>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

        case 'single-certificate':
            return `
                <div class="message-content single-certificate">
                    <div class="cert-header">
                        <i class="${response.content.icon}"></i>
                        <h4>${response.content.name}</h4>
                    </div>
                    <span class="provider">${response.content.provider}</span>
                    <p>${response.content.description}</p>
                </div>
            `;

        case 'project-details':
            return `
                <div class="message-content project-details">
                    <div class="project-header">
                        <h4>${response.content.name}</h4>
                        <span class="project-status">${response.content.status}</span>
                    </div>
                    <img src="${response.content.image}" alt="${response.content.name}" class="project-image">
                    <p>${response.content.description}</p>
                    <div class="features-section">
                        <h5>المميزات:</h5>
                        <ul>
                            ${response.content.features.map(feature => `
                                <li><i class="fas fa-check"></i> ${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="tech-stack">
                        <h5>التقنيات المستخدمة:</h5>
                        <div class="tech-tags">
                            ${response.content.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

        case 'single-skill':
            return `
                <div class="message-content single-skill">
                    <div class="skill-header">
                        <i class="${response.content.icon}"></i>
                        <h4>${response.content.name}</h4>
                        <div class="skill-level">
                            <div class="level-bar" style="width: ${response.content.level}%"></div>
                            <span>${response.content.level}%</span>
                        </div>
                    </div>
                    <p>${response.content.description}</p>
                    ${response.content.examples ? `
                        <div class="skill-examples">
                            <h5>أمثلة:</h5>
                            <div class="examples-tags">
                                ${response.content.examples.map(ex => `
                                    <span class="example-tag">${ex}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${response.content.strengths ? `
                        <div class="skill-strengths">
                            <h5>نقاط القوة:</h5>
                            <ul>
                                ${response.content.strengths.map(str => `
                                    <li><i class="fas fa-check"></i> ${str}</li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;

        case 'experience':
            return `
                <div class="message-content experience-info">
                    <div class="experience-header">
                        <i class="${response.content.icon}"></i>
                        <h4>${response.content.name}</h4>
                    </div>
                    <div class="experience-details">
                        <span class="position-badge">
                            <i class="fas fa-user-tie"></i> ${response.content.position}
                        </span>
                        <span class="duration-badge">
                            <i class="fas fa-clock"></i> ${response.content.duration}
                        </span>
                    </div>
                    <p>${response.content.description}</p>
                    ${response.content.responsibilities ? `
                        <div class="responsibilities">
                            <h5>المسؤوليات:</h5>
                            <ul>
                                ${response.content.responsibilities.map(item => `
                                    <li><i class="fas fa-check"></i> ${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${response.content.details ? `
                        <div class="company-details">
                            <h5>عن الشركة:</h5>
                            <ul>
                                ${response.content.details.map(item => `
                                    <li><i class="fas fa-check"></i> ${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;

        case 'nationality':
            return `
                <div class="message-content nationality-info">
                    <div class="nationality-header">
                        <img src="${response.content.flagImage}" alt="علم السودان" class="flag-image">
                        <h4>${response.content.text}</h4>
                    </div>
                    <div class="nationality-details">
                        ${response.content.details.map(detail => `
                            <div class="detail-item">
                                <i class="${detail.icon}"></i>
                                <span>${detail.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
    }
}

// دالة إضافة رسالة جديدة
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    if (isUser) {
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    } else {
        const response = responses[message] || { type: 'text', content: message };
        messageDiv.innerHTML = createMessageContent(response);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// تحسين دالة البحث عن الردود
function findBestMatch(input) {
    const cleanInput = input.trim().toLowerCase();
    
    // معالجة خاصة للاستفسارات عن المهارات
    if (cleanInput.includes('هل يعرف') || 
        cleanInput.includes('هل لديه مهارة') || 
        cleanInput.includes('هل يجيد') ||
        cleanInput.includes('كيف مهارته في')) {
        
        for (let [key, value] of Object.entries(keywordMap)) {
            if (cleanInput.includes(key.toLowerCase())) {
                return value;
            }
        }
    }

    // معالجة خاصة للبراندات
    if (cleanInput.includes('khm') || cleanInput.includes('كي اتش ام')) {
        return 'براند KHM';
    }

    // معالجة خاصة لشهادة سدايا
    if (cleanInput.includes('سدايا') || 
        cleanInput.includes('ذكاء اصطناعي') || 
        cleanInput.includes('ai') || 
        cleanInput.includes('هيئة البيانات')) {
        return 'شهادة الذكاء الاصطناعي';
    }

    // 1. معالجة خاصة للأسئلة المتعلقة بالشهادات
    if (cleanInput.includes('شهادة') || cleanInput.includes('حاصل على')) {
        if (cleanInput.includes('امن') || cleanInput.includes('سيبراني') || cleanInput.includes('سايبر')) {
            return 'شهادة الأمن السيبراني';
        }
        if (cleanInput.includes('ذكاء') || cleanInput.includes('ai')) {
            return 'شهادة الذكاء الاصطناعي';
        }
        if (cleanInput.includes('صحة') || cleanInput.includes('طبية') || cleanInput.includes('وزارة الصحة')) {
            return 'شهادة وزارة الصحة';
        }
        if (cleanInput.includes('هلال') || cleanInput.includes('تطوع')) {
            return 'شهادة الهلال الأحمر';
        }
        if (cleanInput.includes('icdl') || cleanInput.includes('حاسب') || cleanInput.includes('كمبيوتر')) {
            return 'شهادة ICDL';
        }
        // إذا كان السؤال عام عن الشهادات
        if (cleanInput.includes('شهادات') || cleanInput.includes('شهاداته') || cleanInput.includes('مؤهلات')) {
            return 'الشهادات';
        }
    }

    // 2. البحث في الكلمات المباشرة
    if (responses[cleanInput]) {
        return cleanInput;
    }

    // 3. البحث في الكلمات المفتاحية
    let maxLength = 0;
    let bestMatch = null;

    for (let [key, value] of Object.entries(keywordMap)) {
        if (cleanInput.includes(key.toLowerCase()) && key.length > maxLength) {
            maxLength = key.length;
            bestMatch = value;
        }
    }

    return bestMatch;
}

// دالة لحساب نسبة التشابه بين نصين
function calculateSimilarity(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    return 1 - (matrix[len1][len2] / Math.max(len1, len2));
}

// تحسين معالجة الردود
function handleResponse(input) {
    const responseKey = findBestMatch(input);
    
    if (!responseKey) {
        // إذا لم يتم العثور على إجابة مناسبة
        addMessage("لم أفهم سؤالك تماماً. يمكنك أن تسألني عن:", false);
        addQuickSuggestions();
        return;
    }

    const response = responses[responseKey];
    showTypingEffect(() => {
        addMessage(responseKey, false);
    });
}

// إضافة اقتراحات سريعة
function addQuickSuggestions() {
    const suggestions = [
        "من هو خباب؟",
        "ما هي مهاراته؟",
        "مشاريعه؟",
        "كيف أتواصل معه؟"
    ];
    
    const suggestionsHtml = `
        <div class="message bot">
            <div class="quick-suggestions">
                ${suggestions.map(s => `<button class="quick-reply">${s}</button>`).join('')}
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', suggestionsHtml);
    attachQuickReplyListeners();
}

// إضافة تأثير الكتابة
function showTypingEffect(callback) {
    const typingIndicator = showTypingIndicator();
    setTimeout(() => {
        typingIndicator.remove();
        callback();
    }, 1500);
}

// معالجة إرسال الرسائل
sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        handleResponse(message);
    }
});

// معالجة ضغط Enter
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            handleResponse(message);
        }
    }
});

// معالجة الأزرار السريعة
quickReplies.forEach(button => {
    button.addEventListener('click', () => {
        const message = button.textContent;
        addMessage(message, true);
        handleResponse(message);
    });
});

// إضافة مؤشر الكتابة
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message bot typing';
    indicator.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
}

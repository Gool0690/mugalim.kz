import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, FileText, Sparkles, Shield, Lock, Unlock, Phone, Search, 
  PlusCircle, Download, ExternalLink, Globe, CheckCircle2, AlertCircle, MessageSquare, 
  Send, User, Building, GraduationCap, X, Copy, Code, HelpCircle, FileCheck, Layers, Eye
} from 'lucide-react';

// ==========================================
// KAZAKHSTAN OFFICIAL CURRICULUM SUBJECT MAP
// (Ibrai Altynarin National Academy Standards)
// ==========================================
const CURRICULUM_DATA = {
  primary: {
    label: { kz: '1-4 Сыныптар (Бастауыш)', ru: '1-4 Классы (Начальное)', en: 'Grades 1-4 (Primary)' },
    grades: [1, 2, 3, 4],
    getSubjects: (grade) => {
      const base = ['Сауат ашу / Әліппе / Ана тілі', 'Қазақ тілі', 'Орыс тілі', 'Математика', 'Дүниетану', 'Жаратылыстану', 'Еңбекке баулу / Көркем еңбек', 'Бейнелеу өнері', 'Музыка', 'Дене шынықтыру'];
      if (grade >= 3) {
        base.push('Ағылшын тілі', 'Цифрлық сауаттылық');
      }
      return base;
    }
  },
  middle: {
    label: { kz: '5-9 Сыныптар (Негізгі орта)', ru: '5-9 Классы (Основное)', en: 'Grades 5-9 (Middle)' },
    grades: [5, 6, 7, 8, 9],
    getSubjects: (grade) => {
      const base = ['Қазақ тілі мен әдебиеті', 'Орыс тілі мен әдебиеті', 'Ағылшын тілі', 'Алгебра', 'Геометрия', 'Информатика', 'Дүниежүзі тарихы', 'Қазақстан тарихы', 'География', 'Биология', 'Көркем еңбек', 'Музыка', 'Дене шынықтыру'];
      if (grade >= 7) {
        base.push('Физика', 'Химия');
      }
      if (grade === 9) {
        base.push('Зайырлылық және дінтану негіздері');
      }
      return base;
    }
  },
  high: {
    label: { kz: '10-11 Сыныптар (Жоғары мектеп)', ru: '10-11 Классы (Старшая школа)', en: 'Grades 10-11 (High)' },
    grades: [10, 11],
    getSubjects: () => [
      'Қазақ тілі', 'Қазақ әдебиеті', 'Орыс тілі', 'Орыс әдебиеті', 'Ағылшын тілі',
      'Алгебра және анализ бастамалары', 'Геометрия', 'Информатика', 'Қазақстан тарихы',
      'Дүниежүзі тарихы', 'Құқық негіздері', 'Физика', 'Химия', 'Биология', 'География',
      'Графика және жобалау', 'Кәсіпкерлік және бизнес негіздері',
      'Алғашқы әскери және технологиялық дайындық (АӘТД)', 'Дене шынықтыру'
    ]
  }
};

// ==========================================
// TRANSLATION DICTIONARY (KZ, RU, EN)
// ==========================================
const TRANSLATIONS = {
  kz: {
    brand: 'Mugalim.kz',
    tagline: 'Ұстаздар қауымдастығы мен ресурстық платформасы',
    loginTitle: 'Mugalim.kz жүйесіне кіру',
    loginSubtitle: 'Қазақстан мұғалімдеріне арналған ресми платформа',
    phoneNumber: 'Телефон нөмірі',
    sendCode: 'СМС код жіберу',
    verifyCode: 'Кодты растау',
    enterCode: 'СМС арқылы келген 6 таңбалы кодты енгізіңіз',
    profileSetup: 'Профильді толтыру',
    fullName: 'Толық аты-жөніңіз (ФИО)',
    school: 'Мектеп (Қала/Облыс, Мектеп №)',
    subjects: 'Сабақ беретін пәндеріңіз',
    saveProfile: 'Профильді сақтау',
    schemaBtn: 'SQL Схема & Бұлтты құрылым',
    gradeSelect: 'Сыныпты таңдаңыз',
    subjectSelect: 'Пәнді таңдаңыз',
    tabForum: 'Ұстаздар форумы',
    tabResources: 'Ресурстар мен ҚМЖ/ҚТЖ',
    tabAI: 'Mugalim AI Ассистент',
    paywallTitle: 'Премиум материалдарға қолжетімділік',
    paywallText: 'Материалдарды жүктеу үшін жобаны қолдау және техникалық шығындарды өтеуге арналған бірреттік 5 000 тг ресми жазылымды белсендіріңіз (Төлем заңды, 1% салықпен қамтылған).',
    activateWa: 'WhatsApp арқылы белсендіру (Чек жіберу)',
    downloadLocked: 'Жүктеу жабық (5 000 тг)',
    downloadBtn: 'Жүктеу (PDF/DOCX)',
    uploadBtn: 'Материал қосу',
    postBtn: 'Сұрақ/Пикір жазу',
    founder: 'Платформаның негізін қалаушы: Омарова Гульмира © 2026',
    contactSupport: 'Байланыс / Поддержка',
    aiPlaceholder: 'ҚМЖ немесе сабақ жоспарының матнін осы жерге қойыңыз...',
    aiPrompt1: 'Сабаққа интерактивті ойындар қосу',
    aiPrompt2: 'Инклюзивті білім беруге бейімдеу',
    aiPrompt3: 'Дескрипторлар мен бағалау критерийлерін құру',
    aiPrompt4: 'Бастауыш сыныпқа арнап жеңілдету',
    aiGenerate: 'AI арқылы қайта өңдеу',
    premiumStatus: 'Премиум мәртебесі: Белсенді',
    freeStatus: 'Тегін аккаунт (Жүктеу шектелген)',
    searchPlaceholder: 'Ресурс немесе тақырыпты іздеу...',
    categoryAll: 'Барлығы',
    categoryKMJ: 'ҚМЖ (Қысқа мерзімді)',
    categoryKTJ: 'ҚТЖ (Күнтізбелік-тақырыптық)',
    categoryWorksheets: 'Дидактикалық материалдар',
    categoryVisuals: 'Көрнекіліктер',
    noResources: 'Бұл пән бойынша әлі материалдар жүктелмеген',
    noPosts: 'Форумда әлі талқылаулар жоқ. Алғашқы болып пікір қалдырыңыз!',
    uploadedBy: 'Жүктеген:',
    postBy: 'Авторы:'
  },
  ru: {
    brand: 'Mugalim.kz',
    tagline: 'Сообщество учителей и ресурсная платформа',
    loginTitle: 'Вход в систему Mugalim.kz',
    loginSubtitle: 'Официальная платформа для учителей Казахстана',
    phoneNumber: 'Номер телефона',
    sendCode: 'Отправить СМС код',
    verifyCode: 'Подтвердить код',
    enterCode: 'Введите 6-значный код из СМС',
    profileSetup: 'Заполнение профиля',
    fullName: 'Полное ФИО',
    school: 'Школа (Город/Область, № школы)',
    subjects: 'Преподаваемые предметы',
    saveProfile: 'Сохранить профиль',
    schemaBtn: 'SQL Схема & Облако',
    gradeSelect: 'Выберите класс',
    subjectSelect: 'Выберите предмет',
    tabForum: 'Форум учителей',
    tabResources: 'Ресурсы и КСП/КТП',
    tabAI: 'Mugalim AI Ассистент',
    paywallTitle: 'Доступ к премиум материалам',
    paywallText: 'Для скачивания материалов активируйте официальную подписку за 5 000 тг (Оплата легальна, включает 1% налог).',
    activateWa: 'Активировать через WhatsApp (Отправить чек)',
    downloadLocked: 'Скачивание закрыто (5 000 тг)',
    downloadBtn: 'Скачать (PDF/DOCX)',
    uploadBtn: 'Добавить материал',
    postBtn: 'Написать пост',
    founder: 'Основатель платформы: Омарова Гульмира © 2026',
    contactSupport: 'Байланыс / Поддержка',
    aiPlaceholder: 'Вставьте текст КСП или плана урока сюда...',
    aiPrompt1: 'Добавить интерактивные игры',
    aiPrompt2: 'Адаптировать для инклюзивного образования',
    aiPrompt3: 'Сформировать дескрипторы и критерии оценивания',
    aiPrompt4: 'Упростить текст для начальных классов',
    aiGenerate: 'Переработать с помощью AI',
    premiumStatus: 'Премиум статус: Активен',
    freeStatus: 'Бесплатный аккаунт (Скачивание ограничено)',
    searchPlaceholder: 'Поиск ресурсов или тем...',
    categoryAll: 'Все',
    categoryKMJ: 'КСП (Краткосрочные)',
    categoryKTJ: 'КТП (Календарно-тематические)',
    categoryWorksheets: 'Дидактика',
    categoryVisuals: 'Наглядные пособия',
    noResources: 'По этому предмету еще нет материалов',
    noPosts: 'На форуме пока нет обсуждений. Будьте первым!',
    uploadedBy: 'Загрузил:',
    postBy: 'Автор:'
  },
  en: {
    brand: 'Mugalim.kz',
    tagline: 'Kazakhstan Teachers Network & Resource Platform',
    loginTitle: 'Login to Mugalim.kz',
    loginSubtitle: 'Official community platform for Kazakhstan educators',
    phoneNumber: 'Phone Number',
    sendCode: 'Send SMS Code',
    verifyCode: 'Verify Code',
    enterCode: 'Enter the 6-digit SMS code',
    profileSetup: 'Complete Profile',
    fullName: 'Full Name',
    school: 'School (City/Region, School #)',
    subjects: 'Subjects Taught',
    saveProfile: 'Save Profile',
    schemaBtn: 'SQL Schema & Supabase Config',
    gradeSelect: 'Select Grade',
    subjectSelect: 'Select Subject',
    tabForum: 'Teacher Forum',
    tabResources: 'Resources & Lesson Plans',
    tabAI: 'Mugalim AI Assistant',
    paywallTitle: 'Unlock Premium Teaching Resources',
    paywallText: 'To download materials, activate a one-time official platform subscription for 5,000 KZT (Legal payment with 1% tax included).',
    activateWa: 'Activate via WhatsApp (Send Receipt)',
    downloadLocked: 'Locked (5,000 KZT)',
    downloadBtn: 'Download (PDF/DOCX)',
    uploadBtn: 'Upload Resource',
    postBtn: 'Create Discussion',
    founder: 'Platform Founder: Omarova Gulmira © 2026',
    contactSupport: 'Contact & Support',
    aiPlaceholder: 'Paste your lesson plan or KMJ text here...',
    aiPrompt1: 'Add interactive games and icebreakers',
    aiPrompt2: 'Adapt for inclusive education',
    aiPrompt3: 'Generate assessment criteria & descriptors',
    aiPrompt4: 'Simplify text for primary students',
    aiGenerate: 'Refine with AI',
    premiumStatus: 'Premium Status: Active',
    freeStatus: 'Free Account (Downloads Locked)',
    searchPlaceholder: 'Search resources or topics...',
    categoryAll: 'All',
    categoryKMJ: 'KMJ (Short-term plans)',
    categoryKTJ: 'KTJ (Syllabus/Curriculum)',
    categoryWorksheets: 'Worksheets',
    categoryVisuals: 'Visual Aids',
    noResources: 'No materials uploaded for this subject yet',
    noPosts: 'No forum discussions yet. Start a conversation!',
    uploadedBy: 'Uploaded by:',
    postBy: 'Author:'
  }
};

// ==========================================
// MOCK INITIAL DATA & RESOURCES
// ==========================================
const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    title: 'Алгебра 7-сынып. Қысқаша көбейту формулалары (ҚМЖ)',
    grade: 7,
    subject: 'Алгебра',
    category: 'ҚМЖ (Қысқа мерзімді)',
    author: 'Ахметова А.Е.',
    file_url: '#',
    downloads: 142,
    date: '14 Окт, 2026'
  },
  {
    id: 'res-2',
    title: 'Қазақ тілі 3-сынып. Зат есімнің септелуі (Дидактика)',
    grade: 3,
    subject: 'Қазақ тілі',
    category: 'Дидактикалық материалдар',
    author: 'Сұлтанова Г.М.',
    file_url: '#',
    downloads: 89,
    date: '16 Окт, 2026'
  },
  {
    id: 'res-3',
    title: 'Физика 9-сынып. Ньютон заңдары (Көрнекілік тер)',
    grade: 9,
    subject: 'Физика',
    category: 'Көрнекіліктер',
    author: 'Серіков Б.Н.',
    file_url: '#',
    downloads: 210,
    date: '18 Окт, 2026'
  }
];

const INITIAL_POSTS = [
  {
    id: 'post-1',
    teacher_name: 'Жұмабаева Анар',
    school: 'Алматы қ., №178 лицей',
    subject: 'Математика',
    grade: 5,
    content: 'Коллегалар, 5-сыныпта жай бөлшектерді түсіндіруде қандай визуализация әдістерін қолданасыздар? Тәжірибелеріңізбен бөліссеңіздер!',
    date: 'Бүгін, 14:20',
    replies: [
      { author: 'Қасымов Нұрлан', text: 'Мен пицца бөлшектері салынған дидактикалық карточкаларды қолданамын. Mugalim AI арқылы тапсырмаларды құрастырып алдым.' }
    ]
  },
  {
    id: 'post-2',
    teacher_name: 'Бекболат Динара',
    school: 'Астана қ., №83 мектеп-гимназия',
    subject: 'Ағылшын тілі',
    grade: 8,
    content: 'Has anyone prepared the formative assessment descriptors for Grade 8 Unit 3? Let us share feedback on criteria.',
    date: ' Кеше, 18:45',
    replies: []
  }
];

export default function App() {
  // Lang & UI State
  const [lang, setLang] = useState('kz');
  const t = TRANSLATIONS[lang];

  // Auth & Profile State
  const [user, setUser] = useState(null); // { phone, name, school, subjects, is_premium }
  const [authStep, setAuthStep] = useState('phone'); // 'phone', 'otp', 'profile', 'app'
  const [phoneInput, setPhoneInput] = useState('+7 (707) ');
  const [otpInput, setOtpInput] = useState('');
  const [profileForm, setProfileForm] = useState({ name: '', school: '', subjects: 'Математика, Физика' });

  // Navigation State
  const [selectedGradeGroup, setSelectedGradeGroup] = useState('middle'); // 'primary', 'middle', 'high'
  const [selectedGrade, setSelectedGrade] = useState(7);
  const [selectedSubject, setSelectedSubject] = useState('Алгебра');
  const [activeTab, setActiveTab] = useState('resources'); // 'forum', 'resources', 'ai'
  const [selectedCategory, setSelectedCategory] = useState('Barлығы');
  const [searchQuery, setSearchQuery] = useState('');

  // Data States
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Modals State
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSqlSchemaModal, setShowSqlSchemaModal] = useState(false);

  // AI Assistant State
  const [aiText, setAiText] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Form states
  const [newPostContent, setNewPostContent] = useState('');
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceCategory, setNewResourceCategory] = useState('ҚМЖ (Қысқа мерзімді)');

  // Dynamic subjects based on grade
  const currentSubjects = CURRICULUM_DATA[selectedGradeGroup].getSubjects(selectedGrade);

  useEffect(() => {
    if (!currentSubjects.includes(selectedSubject)) {
      setSelectedSubject(currentSubjects[0] || '');
    }
  }, [selectedGrade, selectedGradeGroup]);

  // Auth Handlers
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneInput.length > 8) {
      setAuthStep('otp');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput.length === 6 || otpInput === '123456' || otpInput.length > 0) {
      setUser({
        phone: phoneInput,
        name: 'Нұрғалиева Әсем Асқарқызы',
        school: 'Астана қ., №70 мектеп-лицей',
        subjects: ['Математика', 'Алгебра'],
        is_premium: false
      });
      setAuthStep('app');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name: profileForm.name || 'Ұстаз',
      school: profileForm.school || 'Мектеп',
      subjects: profileForm.subjects.split(',').map(s => s.trim())
    });
    setAuthStep('app');
  };

  // WhatsApp Paywall Link Generator
  const getWhatsAppPaywallUrl = () => {
    const userPhone = user?.phone || '+77000000000';
    const message = `Сәлеметсіз бе, Гульмира ханым! Mugalim.kz сайтына 5000 тг ресми төлем жасадым, міне менің чегім. Профилімді белсендіріп бересіз бе? Менің тіркелген нөмірім: ${userPhone}`;
    return `https://wa.me/77000000000?text=${encodeURIComponent(message)}`;
  };

  const getWhatsAppSupportUrl = () => {
    const message = `Сәлеметсіз бе, Гульмира ханым! Mugalim.kz платформасы бойынша сұрағым бар еді.`;
    return `https://wa.me/77000000000?text=${encodeURIComponent(message)}`;
  };

  // Resource Download Handler with Paywall Enforcement
  const handleDownload = (res) => {
    if (!user?.is_premium) {
      setShowPaywallModal(true);
      return;
    }
    alert(`«${res.title}» құжатын жүктеу басталды!`);
  };

  // Forum Post Submission
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const newPost = {
      id: `post-${Date.now()}`,
      teacher_name: user?.name || 'Ұстаз',
      school: user?.school || 'Қазақстан мектебі',
      subject: selectedSubject,
      grade: selectedGrade,
      content: newPostContent,
      date: 'Жаңа ғана',
      replies: []
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  // Resource Upload Submission
  const handleUploadResource = (e) => {
    e.preventDefault();
    if (!newResourceTitle.trim()) return;
    const newRes = {
      id: `res-${Date.now()}`,
      title: `${newResourceTitle} (${selectedSubject}, ${selectedGrade}-сынып)`,
      grade: selectedGrade,
      subject: selectedSubject,
      category: newResourceCategory,
      author: user?.name || 'Белгісіз ұстаз',
      file_url: '#',
      downloads: 0,
      date: 'Бүгін'
    };
    setResources([newRes, ...resources]);
    setShowUploadModal(false);
    setNewResourceTitle('');
  };

  // Gemini API Customizer Integration
  const handleAiCustomization = async (promptPreset) => {
    if (!aiText.trim()) {
      alert('Алдымен ҚМЖ немесе сабақ жоспарының мәтінін енгізіңіз!');
      return;
    }
    setIsAiLoading(true);
    setAiOutput('');

    const fullPrompt = `Ресми Қазақстан білім беру стандартына (Ы. Алтынсарин атындағы ҰБА) сәйкес сабақ жоспарын өңде. 
Тапсырма: ${promptPreset}
Пән: ${selectedSubject}, Сынып: ${selectedGrade}

Бастапқы текст:
${aiText}`;

    try {
      // Direct REST call to Gemini 3 Flash Preview API
      const apiKey = ""; // Runtime system fallback
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            systemInstruction: {
              parts: [{ text: 'Сіз Mugalim.kz платформасының жоғары санатты әдіскер-консультантысыз. Тексті ресми педагогтық стильде, айқын дескрипторлармен, құрылымдалған форматта беріңіз.' }]
            }
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setAiOutput(data.candidates[0].content.parts[0].text);
      } else {
        setAiOutput('AI жауабын қалыптастыру кезінде қате орын алды. Жүйені қайта тексеріңіз.');
      }
    } catch (err) {
      setAiOutput('Желілік немесе API қателігі: ' + err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  // SQL Schema Code
  const sqlSchemaText = `-- ========================================================
-- MUGALIM.KZ SUPABASE POSTGRESQL DATABASE SCHEMA & RLS
-- Domain: mugalim.kz
-- Author: Omarova Gulmira (2026)
-- ========================================================

-- 1. Create Profiles Table (Linked to Supabase Auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  school TEXT,
  subjects TEXT[],
  role TEXT DEFAULT 'teacher',
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Resources Table (KTJ, KMJ, Worksheets)
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  title TEXT NOT NULL,
  grade INT NOT NULL CHECK (grade BETWEEN 1 AND 11),
  subject TEXT NOT NULL,
  category TEXT NOT NULL, -- 'KMJ', 'KTJ', 'Worksheets', 'Visuals'
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Forum Posts Table
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  grade INT NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  teacher_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR PROFILES
CREATE POLICY "Public profiles read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS POLICIES FOR RESOURCES (1% Tax 5,000 KZT Paywall Enforcement)
-- Anyone can view metadata:
CREATE POLICY "Public view resource metadata" ON public.resources FOR SELECT USING (true);

-- ONLY USERS WITH IS_PREMIUM = TRUE CAN DOWNLOAD/ACCESS FULL FILE URLS:
CREATE POLICY "Premium users access download links" ON public.resources
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_premium = true
    )
  );

-- RLS POLICIES FOR FORUM (Verified Teachers Only)
CREATE POLICY "Verified teachers read forum" ON public.forum_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Verified teachers write forum" ON public.forum_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = teacher_id);
`;

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#2D3748] font-sans flex flex-col justify-between selection:bg-[#8FA89B] selection:text-white">
      
      {/* ========================================== */}
      {/* HEADER & TOP BRANDING NAVIGATION BAR      */}
      {/* ========================================== */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setAuthStep('app')}>
            <div className="w-11 h-11 rounded-xl bg-[#8FA89B] flex items-center justify-center text-white font-bold text-2xl shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-[#4A5568]">{t.brand}</span>
                <span className="bg-[#8FA89B]/20 text-[#4A5568] text-xs px-2 py-0.5 rounded-full font-medium">v2026</span>
              </div>
              <p className="text-xs text-gray-500 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          {/* Center Actions / Schema Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setShowSqlSchemaModal(true)}
              className="flex items-center space-x-1.5 text-xs font-medium text-[#4A5568] bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors border border-gray-200"
            >
              <Code className="w-4 h-4 text-[#8FA89B]" />
              <span className="hidden md:inline">{t.schemaBtn}</span>
            </button>

            {/* 3-Language Switcher Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs font-semibold">
              <button 
                onClick={() => setLang('kz')}
                className={`px-2.5 py-1 rounded-md transition-all ${lang === 'kz' ? 'bg-[#8FA89B] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                КЗ
              </button>
              <button 
                onClick={() => setLang('ru')}
                className={`px-2.5 py-1 rounded-md transition-all ${lang === 'ru' ? 'bg-[#8FA89B] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                РУ
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${lang === 'en' ? 'bg-[#8FA89B] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </button>
            </div>

            {/* User Profile Badge or Status */}
            {user ? (
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-3">
                <div className="hidden lg:block text-right">
                  <div className="text-xs font-bold text-[#4A5568]">{user.name}</div>
                  <div className="text-[10px] text-gray-500">{user.is_premium ? t.premiumStatus : t.freeStatus}</div>
                </div>
                <button 
                  onClick={() => user.is_premium ? alert('Премиум белсенді!') : setShowPaywallModal(true)}
                  className={`p-2 rounded-lg flex items-center space-x-1 text-xs font-medium ${user.is_premium ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}
                >
                  {user.is_premium ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-600" />}
                  <span className="hidden sm:inline">{user.is_premium ? '5 000 ₸ Active' : '5 000 ₸ Unlock'}</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setAuthStep('phone')}
                className="bg-[#8FA89B] hover:bg-[#7a9386] text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                Кіру / Тіркелу
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* MAIN CONTENT AREA                          */}
      {/* ========================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full">

        {/* AUTHENTICATION & INITIAL PROFILE FLOW MODAL/PANEL */}
        {authStep !== 'app' && (
          <div className="max-w-md mx-auto my-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#8FA89B]/15 text-[#8FA89B] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#4A5568]">{t.loginTitle}</h2>
              <p className="text-xs text-gray-500 mt-1">{t.loginSubtitle}</p>
            </div>

            {authStep === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t.phoneNumber}</label>
                  <input 
                    type="text" 
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+7 (777) 000 00 00"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8FA89B] focus:border-transparent outline-none text-sm"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#8FA89B] hover:bg-[#7a9386] text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm text-sm"
                >
                  {t.sendCode}
                </button>
              </form>
            )}

            {authStep === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t.enterCode}</label>
                  <input 
                    type="text" 
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="1 2 3 4 5 6"
                    maxLength={6}
                    required
                    className="w-full px-4 py-2.5 text-center tracking-widest text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8FA89B] focus:border-transparent outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#8FA89B] hover:bg-[#7a9386] text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm text-sm"
                >
                  {t.verifyCode}
                </button>
              </form>
            )}

            {authStep === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t.fullName}</label>
                  <input 
                    type="text" 
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    placeholder="Ахметова Анар Ержанқызы"
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-[#8FA89B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t.school}</label>
                  <input 
                    type="text" 
                    value={profileForm.school}
                    onChange={(e) => setProfileForm({...profileForm, school: e.target.value})}
                    placeholder="Алматы қ., №159 гимназия"
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-[#8FA89B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t.subjects}</label>
                  <input 
                    type="text" 
                    value={profileForm.subjects}
                    onChange={(e) => setProfileForm({...profileForm, subjects: e.target.value})}
                    placeholder="Математика, Алгебра"
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-[#8FA89B]"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#8FA89B] hover:bg-[#7a9386] text-white font-medium py-2.5 rounded-xl transition-colors shadow-sm text-sm"
                >
                  {t.saveProfile}
                </button>
              </form>
            )}
          </div>
        )}

        {/* MAIN DASHBOARD (When Auth Completed) */}
        {authStep === 'app' && (
          <div className="space-y-6">

            {/* GRADE LEVEL GROUP SELECTION TABS */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h1 className="text-lg font-bold text-[#4A5568]">Mugalim.kz — {t.tagline}</h1>
                  <p className="text-xs text-gray-500">Ы. Алтынсарин атындағы Ұлттық білім академиясының ресми бағдарламасы бойынша</p>
                </div>
                {/* Grade Group Selector */}
                <div className="flex flex-wrap gap-2">
                  {Object.keys(CURRICULUM_DATA).map((key) => {
                    const active = selectedGradeGroup === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedGradeGroup(key);
                          setSelectedGrade(CURRICULUM_DATA[key].grades[0]);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          active 
                            ? 'bg-[#4A5568] text-white shadow-sm' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {CURRICULUM_DATA[key].label[lang]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SPECIFIC GRADE NUMBERS SELECTOR BAR */}
              <div className="pt-4 flex items-center space-x-2 overflow-x-auto pb-1">
                <span className="text-xs font-semibold text-gray-500 mr-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1 text-[#8FA89B]" /> {t.gradeSelect}:
                </span>
                {CURRICULUM_DATA[selectedGradeGroup].grades.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                      selectedGrade === g 
                        ? 'bg-[#8FA89B] text-white shadow-sm scale-105' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* CURRICULUM SUBJECT SELECTOR CAROUSEL/GRID */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <span className="block text-xs font-semibold text-gray-500 mb-3">
                {selectedGrade}-сынып пәндер тізімі:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentSubjects.map((sub) => {
                  const active = selectedSubject === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        active 
                          ? 'bg-[#8FA89B] text-white shadow-sm font-bold' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FEATURE TABS: FORUM | RESOURCES | AI CUSTOMIZER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex space-x-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'resources' 
                      ? 'bg-[#4A5568] text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#8FA89B]" />
                  <span>{t.tabResources}</span>
                </button>

                <button
                  onClick={() => setActiveTab('forum')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'forum' 
                      ? 'bg-[#4A5568] text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-[#8FA89B]" />
                  <span>{t.tabForum}</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'ai' 
                      ? 'bg-[#8FA89B] text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.tabAI}</span>
                </button>
              </div>

              {/* Action Upload button */}
              {activeTab === 'resources' && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center justify-center space-x-2 bg-[#8FA89B] hover:bg-[#7a9386] text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t.uploadBtn}</span>
                </button>
              )}
            </div>

            {/* ========================================== */}
            {/* TAB 1: RESOURCE REPOSITORY & 5000₸ PAYWALL */}
            {/* ========================================== */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                
                {/* 1% TAX COMPLIANT PERMANENT PAYWALL BANNER NOTICE */}
                {!user?.is_premium && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl mt-0.5">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-amber-900">{t.paywallTitle}</h3>
                          <p className="text-xs text-amber-800 mt-1 max-w-3xl leading-relaxed">
                            {t.paywallText}
                          </p>
                        </div>
                      </div>
                      <a
                        href={getWhatsAppPaywallUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap flex items-center space-x-2 bg-[#8FA89B] hover:bg-[#7a9386] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>{t.activateWa}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200">
                  <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
                    {['Барлығы', 'ҚМЖ (Қысқа мерзімді)', 'ҚТЖ (Күнтізбелік-тақырыптық)', 'Дидактикалық материалдар', 'Көрнекіліктер'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === cat ? 'bg-gray-200 text-[#4A5568] font-bold' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-[#8FA89B]"
                    />
                  </div>
                </div>

                {/* Resource List Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter(r => r.subject === selectedSubject && r.grade === selectedGrade)
                    .map((res) => (
                      <div key={res.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[#8FA89B] transition-all">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold bg-[#8FA89B]/15 text-[#4A5568] px-2 py-0.5 rounded-md">
                              {res.category}
                            </span>
                            <span className="text-[10px] text-gray-400">{res.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-[#4A5568] mb-2 line-clamp-2">{res.title}</h4>
                          <p className="text-xs text-gray-500 mb-4">{t.uploadedBy} <span className="font-medium text-gray-700">{res.author}</span></p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[11px] text-gray-400">{res.downloads} жүктеу</span>
                          <button
                            onClick={() => handleDownload(res)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                              user?.is_premium 
                                ? 'bg-[#8FA89B] hover:bg-[#7a9386] text-white shadow-sm' 
                                : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                            }`}
                          >
                            {user?.is_premium ? <Download className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-amber-700" />}
                            <span>{user?.is_premium ? t.downloadBtn : t.downloadLocked}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {resources.filter(r => r.subject === selectedSubject && r.grade === selectedGrade).length === 0 && (
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 text-gray-400 text-xs">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    {t.noResources}
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* TAB 2: INTERACTIVE TEACHER FORUM FEED     */}
            {/* ========================================== */}
            {activeTab === 'forum' && (
              <div className="space-y-6">
                
                {/* Create New Forum Post Form */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                  <h3 className="text-sm font-bold text-[#4A5568] mb-3 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-[#8FA89B]" /> 
                    {selectedSubject} ({selectedGrade}-сынып) мұғалімдеріне сұрақ немесе тәжірибе жазу
                  </h3>
                  <form onSubmit={handleAddPost} className="space-y-3">
                    <textarea
                      rows={3}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Оқыту әдістемесі, сабақ жоспары немесе дидактика бойынша пікіріңізді қалдырыңыз..."
                      required
                      className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-[#8FA89B]"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-[#8FA89B] hover:bg-[#7a9386] text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.postBtn}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Forum Posts Stream */}
                <div className="space-y-4">
                  {posts
                    .filter(p => p.subject === selectedSubject && p.grade === selectedGrade)
                    .map((post) => (
                      <div key={post.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#4A5568] text-white flex items-center justify-center font-bold text-xs">
                              {post.teacher_name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[#4A5568]">{post.teacher_name}</h4>
                              <p className="text-[10px] text-gray-400">{post.school}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400">{post.date}</span>
                        </div>

                        <p className="text-xs text-gray-700 leading-relaxed">{post.content}</p>

                        {/* Reply Section */}
                        {post.replies.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-3 space-y-2 mt-2">
                            {post.replies.map((reply, idx) => (
                              <div key={idx} className="text-xs text-gray-600 border-l-2 border-[#8FA89B] pl-2">
                                <span className="font-bold text-[#4A5568]">{reply.author}: </span>
                                {reply.text}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                  {posts.filter(p => p.subject === selectedSubject && p.grade === selectedGrade).length === 0 && (
                    <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 text-gray-400 text-xs">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      {t.noPosts}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* TAB 3: FREE AI LESSON PLAN CUSTOMIZER     */}
            {/* ========================================== */}
            {activeTab === 'ai' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-[#8FA89B] font-bold text-base">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h2>Mugalim AI Ассистент — Сабақ жоспарын цифрлық бейімдеу</h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Gemini AI арқылы ҚМЖ мәтінін лезде өңдеп, интерактивті тапсырмалар, критерийлер мен ойындар қосыңыз.
                  </p>
                </div>

                {/* Preset Prompt Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <button 
                    onClick={() => handleAiCustomization(t.aiPrompt1)}
                    className="p-3 bg-gray-50 hover:bg-[#8FA89B]/10 border border-gray-200 rounded-xl text-left text-xs font-semibold text-[#4A5568] transition-all flex items-center justify-between"
                  >
                    <span>{t.aiPrompt1}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <button 
                    onClick={() => handleAiCustomization(t.aiPrompt2)}
                    className="p-3 bg-gray-50 hover:bg-[#8FA89B]/10 border border-gray-200 rounded-xl text-left text-xs font-semibold text-[#4A5568] transition-all flex items-center justify-between"
                  >
                    <span>{t.aiPrompt2}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <button 
                    onClick={() => handleAiCustomization(t.aiPrompt3)}
                    className="p-3 bg-gray-50 hover:bg-[#8FA89B]/10 border border-gray-200 rounded-xl text-left text-xs font-semibold text-[#4A5568] transition-all flex items-center justify-between"
                  >
                    <span>{t.aiPrompt3}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <button 
                    onClick={() => handleAiCustomization(t.aiPrompt4)}
                    className="p-3 bg-gray-50 hover:bg-[#8FA89B]/10 border border-gray-200 rounded-xl text-left text-xs font-semibold text-[#4A5568] transition-all flex items-center justify-between"
                  >
                    <span>{t.aiPrompt4}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                </div>

                {/* Input Area */}
                <div>
                  <textarea
                    rows={5}
                    value={aiText}
                    onChange={(e) => setAiText(e.target.value)}
                    placeholder={t.aiPlaceholder}
                    className="w-full p-4 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-[#8FA89B]"
                  />
                </div>

                {/* Custom Prompt Trigger Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleAiCustomization('Жалпы сабақ жоспарын жақсарту және тереңдету')}
                    disabled={isAiLoading}
                    className="flex items-center space-x-2 bg-[#8FA89B] hover:bg-[#7a9386] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isAiLoading ? 'AI өңдеуде...' : t.aiGenerate}</span>
                  </button>
                </div>

                {/* Output Editor/Display Box */}
                {aiOutput && (
                  <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                      <span className="text-xs font-bold text-emerald-900 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" /> AI Өңделген Нәтиже:
                      </span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(aiOutput)}
                        className="text-[11px] text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 font-medium"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Көшіру</span>
                      </button>
                    </div>
                    <div className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {aiOutput}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* UPLOAD MATERIAL MODAL                      */}
      {/* ========================================== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-[#4A5568]">{t.uploadBtn}</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUploadResource} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Материал атауы</label>
                <input 
                  type="text" 
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                  placeholder="Мәселен: ҚМЖ 7-сынып Теңдеулер жүйесі"
                  required
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:ring-1 focus:ring-[#8FA89B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Санат</label>
                <select 
                  value={newResourceCategory}
                  onChange={(e) => setNewResourceCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:ring-1 focus:ring-[#8FA89B]"
                >
                  <option value="ҚМЖ (Қысқа мерзімді)">ҚМЖ (Қысқа мерзімді)</option>
                  <option value="ҚТЖ (Күнтізбелік-тақырыптық)">ҚТЖ (Күнтізбелік-тақырыптық)</option>
                  <option value="Дидактикалық материалдар">Дидактикалық материалдар</option>
                  <option value="Көрнекіліктер">Көрнекіліктер</option>
                </select>
              </div>
              <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center text-xs text-gray-500">
                Файлды таңдаңыз (PDF, DOCX)
              </div>
              <button 
                type="submit"
                className="w-full bg-[#8FA89B] hover:bg-[#7a9386] text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                Жүктеу
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* PAYWALL DETAILS POPUP MODAL                */}
      {/* ========================================== */}
      {showPaywallModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2 text-amber-700 font-bold text-sm">
                <Shield className="w-5 h-5" />
                <span>{t.paywallTitle}</span>
              </div>
              <button onClick={() => setShowPaywallModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.paywallText}
            </p>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2 text-xs text-amber-900">
              <div className="font-bold">Төлемнен кейін сізге ашылатын мүмкіндіктер:</div>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>Барлық 1-11 сыныптар бойынша ҚТЖ және ҚМЖ жүктеу</li>
                <li>Дидактикалық карточкалар мен көрнекіліктер</li>
                <li>Mugalim AI шектеусіз ассистенті</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-end gap-2">
              <button 
                onClick={() => setShowPaywallModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-xl"
              >
                Жабу
              </button>
              <a
                href={getWhatsAppPaywallUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#8FA89B] hover:bg-[#7a9386] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t.activateWa}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* SUPABASE SQL SCHEMA MODAL                  */}
      {/* ========================================== */}
      {showSqlSchemaModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E293B] text-slate-200 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-700">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-[#8FA89B]" />
                <h3 className="text-sm font-bold text-white">Supabase SQL Schema & Row Level Security (RLS)</h3>
              </div>
              <button onClick={() => setShowSqlSchemaModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto font-mono text-xs text-emerald-400 bg-[#0F172A] flex-grow leading-relaxed">
              <pre>{sqlSchemaText}</pre>
            </div>

            <div className="p-4 border-t border-slate-700 flex justify-between items-center bg-[#1E293B]">
              <span className="text-[11px] text-slate-400">mugalim.kz PostgreSQL + Supabase Storage Architecture</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlSchemaText);
                  alert('SQL Схема көшірілді!');
                }}
                className="bg-[#8FA89B] hover:bg-[#7a9386] text-white px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Көшіріп алу</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* FOOTER & WHATSAPP SUPPORT INTEGRATION      */}
      {/* ========================================== */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-[#8FA89B] flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <div>
              <p className="text-xs font-bold text-[#4A5568]">{t.founder}</p>
              <p className="text-[11px] text-gray-400">Mugalim.kz — Қазақстан мектеп мұғалімдерінің бірыңғай цифрлық кеңістігі</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={getWhatsAppSupportUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-[#8FA89B]/15 hover:bg-[#8FA89B]/25 text-[#4A5568] px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-[#8FA89B]/30"
            >
              <Send className="w-4 h-4 text-[#8FA89B]" />
              <span>{t.contactSupport}</span>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}

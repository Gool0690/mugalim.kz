import React, { useState } from 'react';
import {
  BookOpen, Users, FileText, Sparkles, Shield, Lock, Unlock, Phone, Search,
  PlusCircle, Download, ExternalLink, Globe, CheckCircle2, AlertCircle, MessageSquare,
  Send, User, Building, GraduationCap, X, Copy, Code, HelpCircle, FileCheck, Layers, Eye
} from 'lucide-react';

const CURRICULUM_DATA = {
  primary: {
    label: { kz: '1-4 Сыныптар (Бастауыш)', ru: '1-4 Классы (Начальное)', en: 'Grades 1-4 (Primary)' },
    grades: [1, 2, 3, 4],
    getSubjects: (grade) => {
      const base = ['Сауат ашу / Әліппе / Ана тілі', 'Қазақ тілі', 'Орыс тілі', 'Математика', 'Дүниетану', 'Жаратылыстану', 'Еңбекке баулу / Көркем еңбек', 'Бейнелеу өнері', 'Музыка', 'Дене шынықтыру'];
      if (grade >= 3) base.push('Ағылшын тілі', 'Цифрлық сауаттылық');
      return base;
    }
  },
  middle: {
    label: { kz: '5-9 Сыныптар (Негізгі орта)', ru: '5-9 Классы (Основное среднее)', en: 'Grades 5-9 (Middle)' },
    grades: [5, 6, 7, 8, 9],
    getSubjects: (grade) => {
      const base = ['Қазақ тілі мен әдебиеті', 'Орыс тілі мен әдебиеті', 'Ағылшын тілі', 'Алгебра', 'Геометрия', 'Информатика', 'Дүниежүзі тарихы', 'Қазақстан тарихы', 'География', 'Биология', 'Көркем еңбек', 'Музыка', 'Дене шынықтыру'];
      if (grade >= 7) base.push('Физика', 'Химия');
      if (grade === 9) base.push('Зайырлылық және дінтану негіздері');
      return base;
    }
  },
  high: {
    label: { kz: '10-11 Сыныптар (Жоғары)', ru: '10-11 Классы (Старшая школа)', en: 'Grades 10-11 (High)' },
    grades: [10, 11],
    getSubjects: () => [
      'Қазақ тілі', 'Қазақ әдебиеті', 'Орыс тілі', 'Орыс әдебиеті', 'Ағылшын тілі',
      'Алгебра және анализ бастамалары', 'Геометрия', 'Информатика', 'Қазақстан тарихы',
      'Дүниежүзі тарихы', 'Құқық негіздері', 'Физика', 'Химия', 'Биология', 'География',
      'Графика және жобалау', 'Кәсіпкерлік және бизнес негіздері', 'Алғашқы әскери және технологиялық дайындық (АӘТД)', 'Дене шынықтыру'
    ]
  }
};

const TRANSLATIONS = {
  kz: {
    title: "Mugalim.kz — Ұстаздар қауымдастығы",
    subtitle: "Қазақстан мектеп мұғалімдеріне арналған ресми платформа",
    loginTitle: "Mugalim.kz жүйесіне кіру",
    loginSubtitle: "Қазақстан мұғалімдеріне арналған ресми платформа",
    phonePlaceholder: "Телефон нөмірі (мысалы: +7 701 123 4567)",
    sendCode: "Кодты жіберу",
    enterOtp: "СМС арқылы келген 6 таңбалы кодты енгізіңіз (Тест: 123456)",
    verifyCode: "Кодты растау",
    profileTitle: "Мұғалімнің жеке профилі",
    profileSubtitle: "Платформаны толық пайдалану үшін мәліметтеріңізді енгізіңіз",
    fullName: "Толық аты-жөніңіз (ФИО)",
    school: "Мектеп атауы / №",
    subject: "Негізгі пәніңіз",
    saveProfile: "Профильді сақтау және кіру",
    gradesNav: "Сыныптар мен пәндер",
    resourcesTab: "Ресурстар базасы (ҚТЖ, ҚМЖ)",
    forumTab: "Мұғалімдер форумы",
    aiTab: "Тегін AI Көмекшісі",
    sqlTab: "Supabase SQL Схемасы",
    paywallAlert: "Материалдарды жүктеу үшін жобаны қолдау және техникалық шығындарды өтеуге арналған бірреттік 5 000 тг ресми жазылымды белсендіріңіз.",
    activateWhatsapp: "WhatsApp арқылы белсендіру",
    addResource: "+ Материал қосу",
    founder: "Платформаның негізін қалаушы: Омарова Гульмира © 2026",
    contactSupport: "Байланыс / Поддержка",
    aiAssistantTitle: "Mugalim AI — Сабақ жоспарын жақсарту",
    aiPlaceholder: "ҚМЖ мәтінін немесе тақырыбын осында енгізіңіз...",
    aiButton: "AI арқылы өңдеу",
  },
  ru: {
    title: "Mugalim.kz — Сообщество учителей",
    subtitle: "Официальная платформа для учителей школ Казахстана",
    loginTitle: "Вход в систему Mugalim.kz",
    loginSubtitle: "Официальная платформа для учителей Казахстана",
    phonePlaceholder: "Номер телефона (например: +7 701 123 4567)",
    sendCode: "Отправить код",
    enterOtp: "Введите 6-значный код (Тест: 123456)",
    verifyCode: "Подтвердить код",
    profileTitle: "Личный профиль учителя",
    profileSubtitle: "Заполните данные для полноценного использования платформы",
    fullName: "ФИО полностью",
    school: "Название школы / №",
    subject: "Основной предмет",
    saveProfile: "Сохранить профиль и войти",
    gradesNav: "Классы и предметы",
    resourcesTab: "База ресурсов (КТП, СПУ)",
    forumTab: "Форум учителей",
    aiTab: "Бесплатный AI Помощник",
    sqlTab: "SQL Схема Supabase",
    paywallAlert: "Для скачивания материалов активируйте официальную подписку за 5 000 тг.",
    activateWhatsapp: "Активировать через WhatsApp",
    addResource: "+ Добавить материал",
    founder: "Основатель платформы: Омарова Гульмира © 2026",
    contactSupport: "Связь / Поддержка",
    aiAssistantTitle: "Mugalim AI — Улучшение планов уроков",
    aiPlaceholder: "Введите текст или тему урока здесь...",
    aiButton: "Обработать через AI",
  },
  en: {
    title: "Mugalim.kz — Teachers Community",
    subtitle: "Official platform for school teachers in Kazakhstan",
    loginTitle: "Sign in to Mugalim.kz",
    loginSubtitle: "Official platform for teachers in Kazakhstan",
    phonePlaceholder: "Phone number (e.g., +7 701 123 4567)",
    sendCode: "Send Code",
    enterOtp: "Enter 6-digit code (Test: 123456)",
    verifyCode: "Verify Code",
    profileTitle: "Teacher Profile",
    profileSubtitle: "Fill in your details to access the platform",
    fullName: "Full Name",
    school: "School Name / No.",
    subject: "Primary Subject",
    saveProfile: "Save Profile & Enter",
    gradesNav: "Grades & Subjects",
    resourcesTab: "Resource Repository (KTJ, KMJ)",
    forumTab: "Teachers Forum",
    aiTab: "Free AI Assistant",
    sqlTab: "Supabase SQL Schema",
    paywallAlert: "Activate the official subscription for 5,000 KZT to download materials.",
    activateWhatsapp: "Activate via WhatsApp",
    addResource: "+ Add Resource",
    founder: "Platform Founder: Omarova Gulmira © 2026",
    contactSupport: "Contact / Support",
    aiAssistantTitle: "Mugalim AI — Lesson Plan Enhancer",
    aiPlaceholder: "Enter lesson plan text or topic here...",
    aiButton: "Enhance with AI",
  }
};

export default function App() {
  const [lang, setLang] = useState('kz');
  const t = TRANSLATIONS[lang];

  const [step, setStep] = useState('login'); 
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({ fullName: '', school: '', subject: '', isPremium: false });

  const [selectedGrade, setSelectedGrade] = useState(5);
  const [selectedSubject, setSelectedSubject] = useState('Ағылшын тілі');
  const [activeTab, setActiveTab] = useState('resources');

  const [resources, setResources] = useState([
    { id: 1, title: '1-тоқсан ҚТЖ (КТП) - Ағылшын тілі 5-сынып', grade: 5, subject: 'Ағылшын тілі', category: 'KTJ' },
    { id: 2, title: 'Unit 1 Lesson Plan (ҚМЖ) - Present Simple', grade: 5, subject: 'Ағылшын тілі', category: 'KMJ' },
    { id: 3, title: 'Interactive Grammar Worksheet - Quantifiers', grade: 5, subject: 'Ағылшын тілі', category: 'Worksheets' }
  ]);

  const [posts, setPosts] = useState([
    { id: 1, teacher: 'Айгүл Мұқанова', subject: 'Ағылшын тілі', content: 'Әріптестер, 5-сыныпқа арналған Speaking тапсырмалары бар ма?', time: '10 минут бұрын' }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) { alert('Телефон нөмірін енгізіңіз'); return; }
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) { alert('Кодты енгізіңіз (мысалы: 123456)'); return; }
    setStep('profile_completion');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profile.fullName || !profile.school) { alert('Барлық өрістерді толтырыңыз'); return; }
    setStep('dashboard');
  };

  const getWhatsappSupportUrl = () => `https://wa.me/77011234567?text=${encodeURIComponent('Сәлеметсіз бе, Гульмира ханым! Mugalim.kz бойынша сұрағым бар еді.')}`;
  const getWhatsappPaywallUrl = () => `https://wa.me/77011234567?text=${encodeURIComponent(`Сәлеметсіз бе, Гульмира ханым! Mugalim.kz сайтына 5000 тг төлем жасадым, чегімді жіберемін. Нөмірім: ${phone}`)}`;

  const handleDownload = (res) => {
    if (!profile.isPremium) {
      alert("Премиум жазылым қажет! 5 000 тг төлеп, WhatsApp арқылы белсендіріңіз.");
      return;
    }
    alert(`Жүктелуде: ${res.title}`);
  };

  if (step === 'login') {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex flex-col justify-between font-sans text-[#2D3748]">
        <div className="flex justify-end p-4">
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            {['kz', 'ru', 'en'].map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded text-sm font-medium uppercase ${lang === l ? 'bg-[#8FA89B] text-white' : 'text-[#4A5568]'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
            <div className="flex justify-center mb-4 text-[#8FA89B]"><GraduationCap size={40} /></div>
            <h1 className="text-2xl font-bold text-center mb-2">{t.loginTitle}</h1>
            <p className="text-sm text-center text-gray-500 mb-6">{t.loginSubtitle}</p>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Телефон</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input type="text" placeholder={t.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-[#8FA89B]" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#8FA89B] text-white py-2.5 rounded-lg font-medium hover:bg-[#7b9688]">{t.sendCode}</button>
            </form>
          </div>
        </div>
        <Footer t={t} getWhatsappSupportUrl={getWhatsappSupportUrl} />
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex flex-col justify-between font-sans text-[#2D3748]">
        <div className="flex justify-end p-4">
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            {['kz', 'ru', 'en'].map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded text-sm font-medium uppercase ${lang === l ? 'bg-[#8FA89B] text-white' : 'text-[#4A5568]'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-2">Mugalim.kz</h2>
            <p className="text-sm text-gray-500 mb-6">{t.enterOtp}</p>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input type="text" maxLength={6} placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full text-center tracking-widest text-xl py-2 border rounded-lg focus:outline-none focus:border-[#8FA89B]" />
              <button type="submit" className="w-full bg-[#8FA89B] text-white py-2.5 rounded-lg font-medium hover:bg-[#7b9688]">{t.verifyCode}</button>
            </form>
          </div>
        </div>
        <Footer t={t} getWhatsappSupportUrl={getWhatsappSupportUrl} />
      </div>
    );
  }

  if (step === 'profile_completion') {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex flex-col justify-between font-sans text-[#2D3748]">
        <div className="flex justify-end p-4">
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            {['kz', 'ru', 'en'].map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded text-sm font-medium uppercase ${lang === l ? 'bg-[#8FA89B] text-white' : 'text-[#4A5568]'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
            <h2 className="text-xl font-bold mb-1">{t.profileTitle}</h2>
            <p className="text-sm text-gray-500 mb-6">{t.profileSubtitle}</p>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">{t.fullName}</label>
                <input type="text" required placeholder="Омарова Гульмира" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#8FA89B]" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">{t.school}</label>
                <input type="text" required placeholder="№31 ЖББ мектеп" value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#8FA89B]" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">{t.subject}</label>
                <input type="text" required placeholder="Ағылшын тілі" value={profile.subject} onChange={(e) => setProfile({ ...profile, subject: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#8FA89B]" />
              </div>
              <button type="submit" className="w-full bg-[#8FA89B] text-white py-2.5 rounded-lg font-medium hover:bg-[#7b9688]">{t.saveProfile}</button>
            </form>
          </div>
        </div>
        <Footer t={t} getWhatsappSupportUrl={getWhatsappSupportUrl} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col justify-between font-sans text-[#2D3748]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-[#8FA89B] text-white p-2 rounded-lg"><GraduationCap size={24} /></div>
            <div>
              <h1 className="font-bold text-lg">Mugalim.kz</h1>
              <p className="text-xs text-gray-500">Қазақстан ұстаздар қауымдастығы</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setProfile({ ...profile, isPremium: !profile.isPremium })} className={`text-xs px-3 py-1.5 rounded-full font-medium border ${profile.isPremium ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
              {profile.isPremium ? '✓ Премиум белсенді' : '🔒 Стандарт (5000 тг)'}
            </button>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {['kz', 'ru', 'en'].map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${lang === l ? 'bg-[#8FA89B] text-white' : 'text-[#4A5568]'}`}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 flex-grow w-full space-y-6">
        {!profile.isPremium && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-start space-x-3">
              <Lock className="text-amber-600 mt-0.5 flex-shrink-0" size={20} />
              <p className="text-sm text-amber-900">{t.paywallAlert}</p>
            </div>
            <a href={getWhatsappPaywallUrl()} target="_blank" rel="noopener noreferrer" className="bg-[#8FA89B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#7b9688] whitespace-nowrap">{t.activateWhatsapp}</a>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-bold text-[#4A5568] flex items-center gap-2"><Layers size={18} /> {t.gradesNav}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(CURRICULUM_DATA).map(([key, group]) => (
              <div key={key} className="border p-4 rounded-lg bg-gray-50/50 space-y-2">
                <h3 className="font-semibold text-sm">{group.label[lang]}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.grades.map((grade) => (
                    <button key={grade} onClick={() => { setSelectedGrade(grade); const subs = group.getSubjects(grade); if (!subs.includes(selectedSubject)) setSelectedSubject(subs[0]); }} className={`px-3 py-1 rounded-md text-xs font-medium ${selectedGrade === grade ? 'bg-[#8FA89B] text-white' : 'bg-white border hover:bg-gray-100'}`}>{grade}-сынып</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b bg-gray-50">
            <button onClick={() => setActiveTab('resources')} className={`flex-1 py-3 px-4 text-center font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'resources' ? 'bg-white border-b-2 border-[#8FA89B]' : 'text-gray-500'}`}><FileText size={16} /> {t.resourcesTab}</button>
            <button onClick={() => setActiveTab('forum')} className={`flex-1 py-3 px-4 text-center font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'forum' ? 'bg-white border-b-2 border-[#8FA89B]' : 'text-gray-500'}`}><MessageSquare size={16} /> {t.forumTab}</button>
            <button onClick={() => setActiveTab('ai')} className={`flex-1 py-3 px-4 text-center font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-white border-b-2 border-[#8FA89B]' : 'text-gray-500'}`}><Sparkles size={16} /> {t.aiTab}</button>
            <button onClick={() => setActiveTab('sql')} className={`flex-1 py-3 px-4 text-center font-medium text-sm flex items-center justify-center gap-2 ${activeTab === 'sql' ? 'bg-white border-b-2 border-[#8FA89B]' : 'text-gray-500'}`}><Code size={16} /> {t.sqlTab}</button>
          </div>
          <div className="p-6">
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{selectedGrade}-сынып | {selectedSubject} — Ресурстар</h3>
                  <button onClick={() => alert('Жаңа материал қосу')} className="bg-[#8FA89B] text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"><PlusCircle size={14} /> {t.addResource}</button>
                </div>
                <div className="divide-y">
                  {resources.map((res) => (
                    <div key={res.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <FileCheck className="text-[#8FA89B]" size={20} />
                        <div>
                          <p className="font-medium text-sm">{res.title}</p>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{res.category}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDownload(res)} className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${profile.isPremium ? 'bg-[#8FA89B] text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {profile.isPremium ? <Download size={14} /> : <Lock size={14} />} Жүктеу
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'forum' && (
              <div className="space-y-4">
                <textarea rows={2} placeholder="Әріптестерге сұрақ қою..." value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:border-[#8FA89B]" />
                <div className="flex justify-end">
                  <button onClick={() => { if (!newPostContent) return; setPosts([{ id: Date.now(), teacher: profile.fullName || 'Мұғалім', subject: selectedSubject, content: newPostContent, time: 'Жаңа ғана' }, ...posts]); setNewPostContent(''); }} className="bg-[#8FA89B] text-white px-4 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"><Send size={14} /> Жіберу</button>
                </div>
                <div className="space-y-3 pt-4 border-t">
                  {posts.map((p) => (
                    <div key={p.id} className="bg-gray-50 p-4 rounded-lg border space-y-1">
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="font-semibold text-[#2D3748]">{p.teacher} ({p.subject})</span>
                        <span>{p.time}</span>
                      </div>
                      <p className="text-sm">{p.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <h3 className="font-bold">{t.aiAssistantTitle}</h3>
                <textarea rows={4} placeholder={t.aiPlaceholder} value={aiInput} onChange={(e) => setAiInput(e.target.value)} className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:border-[#8FA89B]" />
                <button onClick={() => setAiOutput('✨ [Mugalim AI]: Сабақ жоспары сәтті өңделді, инклюзивті тапсырмалар мен дескрипторлар қосылды.')} className="bg-[#8FA89B] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1"><Sparkles size={16} /> {t.aiButton}</button>
                {aiOutput && <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-sm">{aiOutput}</div>}
              </div>
            )}
            {activeTab === 'sql' && (
              <div className="space-y-3">
                <h3 className="font-bold">Supabase Database Schema (SQL)</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
{`CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  name TEXT,
  school TEXT,
  is_premium BOOLEAN DEFAULT false
);`}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer t={t} getWhatsappSupportUrl={getWhatsappSupportUrl} />
    </div>
  );
}

function Footer({ t, getWhatsappSupportUrl }) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-xs font-bold">{t.founder}</p>
          <p className="text-[11px] text-gray-400">Mugalim.kz — Қазақстан мектеп мұғалімдерінің бірыңғай цифрлық кеңістігі</p>
        </div>
        <a href={getWhatsappSupportUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-[#8FA89B]/10 hover:bg-[#8FA89B]/20 text-[#2D3748] px-4 py-2 rounded-lg text-xs font-medium transition border border-[#8FA89B]/30">
          <MessageSquare size={16} className="text-[#8FA89B]" />
          <span>{t.contactSupport}</span>
        </a>
      </div>
    </footer>
  );
}

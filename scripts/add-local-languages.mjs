import { readFileSync, writeFileSync } from 'fs';

const languageData = {
  'Madrid': 'Spanish primary with English secondary. Key Spanish search terms: desarrollo eLearning Madrid (eLearning development Madrid), creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación en línea (online training), plataforma Kajabi (Kajabi platform).',
  'Barcelona': 'Spanish and Catalan primary with English secondary. Key search terms: desarrollo eLearning Barcelona (eLearning development Barcelona), creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación corporativa en línea (corporate online training).',
  'Berlin': 'German primary with English secondary. Key German search terms: eLearning Entwicklung Berlin (eLearning development Berlin), Online-Kurs erstellen (create online course), Lernmanagementsystem (LMS), Online-Training (online training), Kajabi Plattform (Kajabi platform).',
  'Munich': 'German primary with English secondary. Key German search terms: eLearning Entwicklung München (eLearning development Munich), Online-Kurs erstellen (create online course), Lernmanagementsystem (LMS), betriebliche Weiterbildung (corporate training).',
  'Paris': 'French primary with English secondary. Key French search terms: développement eLearning Paris (eLearning development Paris), création de cours en ligne (online course creation), système de gestion de l\'apprentissage (LMS), formation en ligne (online training), plateforme Kajabi (Kajabi platform).',
  'Lyon': 'French primary with English secondary. Key French search terms: développement eLearning Lyon (eLearning development Lyon), création de cours en ligne (online course creation), formation professionnelle en ligne (professional online training), LMS système.',
  'Amsterdam': 'Dutch primary with English secondary. Key Dutch search terms: eLearning ontwikkeling Amsterdam (eLearning development Amsterdam), online cursus maken (create online course), leermanagementsysteem (LMS), online training (online training).',
  'Dubai': 'English primary with Arabic secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في دبي (eLearning development in Dubai), تصميم الدورات التدريبية (course design), نظام إدارة التعلم (LMS), تدريب الموظفين عبر الإنترنت (online employee training), منصة كاجابي (Kajabi platform).',
  'Abu Dhabi': 'English primary with Arabic secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في أبوظبي (eLearning development in Abu Dhabi), تصميم الدورات التدريبية (course design), نظام إدارة التعلم (LMS), تدريب الموظفين (employee training).',
  'Riyadh': 'Arabic primary with English secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في الرياض (eLearning development Riyadh), تصميم المقررات الإلكترونية (e-course design), نظام إدارة التعلم (LMS), التدريب عبر الإنترنت (online training).',
  'Jeddah': 'Arabic primary with English secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في جدة (eLearning development Jeddah), تصميم الدورات التدريبية (course design), نظام إدارة التعلم (LMS), التدريب المؤسسي (corporate training).',
  'Doha': 'Arabic primary with English secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في الدوحة (eLearning development Doha), تصميم الدورات (course design), نظام إدارة التعلم (LMS), التدريب عبر الإنترنت (online training).',
  'Kuwait City': 'Arabic primary with English secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في الكويت (eLearning development Kuwait), تصميم الدورات التدريبية (course design), نظام إدارة التعلم (LMS), التدريب المؤسسي (corporate training).',
  'Muscat': 'Arabic primary with English secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في مسقط (eLearning development Muscat), تصميم الدورات (course design), نظام إدارة التعلم (LMS), التدريب عبر الإنترنت (online training).',
  'Beirut': 'Arabic and French primary with English secondary. Key search terms: تطوير التعلم الإلكتروني في بيروت (eLearning development Beirut), développement eLearning Beyrouth, نظام إدارة التعلم (LMS).',
  'Karachi': 'Urdu and English primary. Key Urdu search terms: آن لائن کورس بنانا (creating online courses), ای لرننگ ڈویلپمنٹ (eLearning development), ایل ایم ایس سسٹم (LMS system), آن لائن تربیت (online training), کاجابی پلیٹ فارم (Kajabi platform).',
  'Lahore': 'Urdu and English primary. Key Urdu search terms: آن لائن کورس بنانا (creating online courses), ای لرننگ ڈویلپمنٹ (eLearning development), ایل ایم ایس سسٹم (LMS system), آن لائن تربیت (online training), کاجابی پلیٹ فارم (Kajabi platform).',
  'Islamabad': 'Urdu and English primary. Key Urdu search terms: آن لائن کورس بنانا (creating online courses), ای لرننگ ڈویلپمنٹ (eLearning development), ایل ایم ایس سسٹم (LMS system), آن لائن تربیت (online training).',
  'Tokyo': 'Japanese primary with English secondary. Key Japanese search terms: eラーニング開発東京 (eLearning development Tokyo), オンラインコース作成 (online course creation), 学習管理システム (LMS), オンライン研修 (online training).',
  'Seoul': 'Korean primary with English secondary. Key Korean search terms: 이러닝 개발 서울 (eLearning development Seoul), 온라인 강의 제작 (online course creation), 학습 관리 시스템 (LMS), 온라인 교육 (online training).',
  'Beijing': 'Mandarin Chinese primary with English secondary. Key Chinese search terms: 北京电子学习开发 (eLearning development Beijing), 在线课程制作 (online course creation), 学习管理系统 (LMS), 企业在线培训 (corporate online training).',
  'Shanghai': 'Mandarin Chinese primary with English secondary. Key Chinese search terms: 上海电子学习开发 (eLearning development Shanghai), 在线课程制作 (online course creation), 学习管理系统 (LMS), 企业培训 (corporate training).',
  'Mumbai': 'Hindi and English primary. Key Hindi search terms: ई-लर्निंग डेवलपमेंट मुंबई (eLearning development Mumbai), ऑनलाइन कोर्स बनाना (create online course), लर्निंग मैनेजमेंट सिस्टम (LMS), ऑनलाइन प्रशिक्षण (online training).',
  'Delhi': 'Hindi and English primary. Key Hindi search terms: ई-लर्निंग डेवलपमेंट दिल्ली (eLearning development Delhi), ऑनलाइन कोर्स बनाना (create online course), लर्निंग मैनेजमेंट सिस्टम (LMS), कॉर्पोरेट प्रशिक्षण (corporate training).',
  'Bangalore': 'English and Kannada primary. Key search terms: eLearning development Bangalore, online course creation, LMS implementation, corporate training Bangalore, Kajabi platform.',
  'Cairo': 'Arabic primary with English secondary. Key Arabic search terms: تطوير التعلم الإلكتروني في القاهرة (eLearning development Cairo), تصميم الدورات التدريبية (course design), نظام إدارة التعلم (LMS), التدريب عبر الإنترنت (online training).',
  'Casablanca': 'Arabic and French primary. Key search terms: تطوير التعلم الإلكتروني في الدار البيضاء (eLearning development Casablanca), développement eLearning Casablanca, نظام إدارة التعلم (LMS).',
  'Mexico City': 'Spanish primary with English secondary. Key Spanish search terms: desarrollo eLearning Ciudad de México (eLearning development Mexico City), creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación empresarial (corporate training).',
  'Buenos Aires': 'Spanish primary with English secondary. Key Spanish search terms: desarrollo eLearning Buenos Aires, creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), capacitación corporativa (corporate training).',
  'Bogota': 'Spanish primary with English secondary. Key Spanish search terms: desarrollo eLearning Bogotá, creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación empresarial en línea (corporate online training).',
  'São Paulo': 'Portuguese primary with English secondary. Key Portuguese search terms: desenvolvimento eLearning São Paulo (eLearning development São Paulo), criação de cursos online (online course creation), sistema de gestão de aprendizagem (LMS), treinamento online (online training).',
  'Miami': 'English primary with Spanish secondary. Key Spanish search terms: desarrollo eLearning Miami (eLearning development Miami), creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación empresarial en línea (corporate online training), plataforma Kajabi (Kajabi platform).',
'Houston': 'English primary with Spanish secondary. Key Spanish search terms: desarrollo eLearning Houston, creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación corporativa en línea (corporate online training).',
'Los Angeles': 'English primary with Spanish secondary. Key Spanish search terms: desarrollo eLearning Los Ángeles, creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación en línea (online training).',
'San Antonio': 'English primary with Spanish secondary. Key Spanish search terms: desarrollo eLearning San Antonio, creación de cursos en línea (online course creation), sistema de gestión del aprendizaje (LMS), formación corporativa (corporate training).',
'Singapore': 'English primary with Mandarin and Malay secondary. Key search terms: eLearning development Singapore, 新加坡电子学习开发 (eLearning development Singapore), pembangunan eLearning Singapura (eLearning development Singapore), LMS implementation.',
'Kuala Lumpur': 'English and Malay primary. Key Malay search terms: pembangunan eLearning Kuala Lumpur (eLearning development KL), pembangunan kursus dalam talian (online course development), sistem pengurusan pembelajaran (LMS), latihan dalam talian (online training).',
'Bangkok': 'Thai primary with English secondary. Key Thai search terms: การพัฒนา eLearning กรุงเทพ (eLearning development Bangkok), การสร้างคอร์สออนไลน์ (online course creation), ระบบจัดการการเรียนรู้ (LMS), การฝึกอบรมออนไลน์ (online training).',
'Jakarta': 'Indonesian primary with English secondary. Key Indonesian search terms: pengembangan eLearning Jakarta (eLearning development Jakarta), pembuatan kursus online (online course creation), sistem manajemen pembelajaran (LMS), pelatihan online (online training).',
'Manila': 'Filipino and English primary. Key search terms: eLearning development Manila, online course creation Philippines, learning management system (LMS), online training Philippines, Kajabi platform.',
'Nairobi': 'English and Swahili primary. Key Swahili search terms: maendeleo ya eLearning Nairobi (eLearning development Nairobi), uundaji wa kozi mtandaoni (online course creation), mfumo wa usimamizi wa kujifunza (LMS), mafunzo mtandaoni (online training).',
'Lagos': 'English primary with Yoruba and Hausa secondary. Key search terms: eLearning development Lagos, online course creation Nigeria, learning management system Nigeria, corporate training Lagos.',
'Accra': 'English primary with Twi secondary. Key search terms: eLearning development Accra, online course creation Ghana, learning management system Ghana, corporate training Accra.',
'Rome': 'Italian primary with English secondary. Key Italian search terms: sviluppo eLearning Roma (eLearning development Rome), creazione corsi online (online course creation), sistema di gestione dell\'apprendimento (LMS), formazione aziendale online (corporate online training).',
'Milan': 'Italian primary with English secondary. Key Italian search terms: sviluppo eLearning Milano (eLearning development Milan), creazione corsi online (online course creation), sistema di gestione dell\'apprendimento (LMS), formazione aziendale (corporate training).',
'Stockholm': 'Swedish primary with English secondary. Key Swedish search terms: eLearning-utveckling Stockholm (eLearning development Stockholm), skapa onlinekurs (create online course), system för lärhantering (LMS), onlineutbildning (online training).',
'Warsaw': 'Polish primary with English secondary. Key Polish search terms: rozwój eLearning Warszawa (eLearning development Warsaw), tworzenie kursów online (online course creation), system zarządzania nauczaniem (LMS), szkolenia online (online training).',
'Istanbul': 'Turkish primary with English secondary. Key Turkish search terms: İstanbul eLearning geliştirme (eLearning development Istanbul), çevrimiçi kurs oluşturma (online course creation), öğrenme yönetim sistemi (LMS), çevrimiçi eğitim (online training).',
'São Paulo': 'Portuguese primary with English secondary. Key Portuguese search terms: desenvolvimento eLearning São Paulo, criação de cursos online (online course creation), sistema de gestão de aprendizagem (LMS), treinamento online (online training).',
'Lisbon': 'Portuguese primary with English secondary. Key Portuguese search terms: desenvolvimento eLearning Lisboa (eLearning development Lisbon), criação de cursos online (online course creation), sistema de gestão de aprendizagem (LMS), formação online (online training).',
};

let content = readFileSync('src/data/cities.ts', 'utf8');

for (const [cityName, langData] of Object.entries(languageData)) {
  // Check if city already has languageLocalizationNeeds
  const hasField = new RegExp(`"cityName":\\s*"${cityName}"[\\s\\S]*?"languageLocalizationNeeds":`).test(content);
  
  if (hasField) {
    // Replace existing value
    const regex = new RegExp(`("cityName":\\s*"${cityName}"[\\s\\S]*?"languageLocalizationNeeds":\\s*)"[^"]*"`, 'g');
    const newContent = content.replace(regex, `$1"${langData}"`);
    if (newContent !== content) {
      content = newContent;
      console.log(`✅ Updated: ${cityName}`);
    }
  } else {
    // Add field before faqQuestions
    const regex = new RegExp(`("cityName":\\s*"${cityName}"[\\s\\S]*?)("faqQuestions":)`, 'g');
    const newContent = content.replace(regex, `$1"languageLocalizationNeeds": "${langData}",\n    $2`);
    if (newContent !== content) {
      content = newContent;
      console.log(`✅ Added: ${cityName}`);
    }
  }
}

writeFileSync('src/data/cities.ts', content, 'utf8');
console.log('Done!');
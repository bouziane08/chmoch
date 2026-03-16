import {
  Shield,
  Zap,
  Users,
  Lock,
  Globe,
  BarChart,
  Bell,
  Key,
  Smartphone,
  Cloud,
  Database,
  Server,
} from "lucide-react";

export const COMPANY_NAME = "Enterprise";
export const COMPANY_SLOGAN = "حلول متكاملة للمؤسسات";

export const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "المميزات", href: "#features" },
  { name: "خطط الأسعار", href: "#pricing" },
  { name: "تواصل معنا", href: "#contact" },
];

export const features = [
  {
    icon: Shield,
    title: "أمان متقدم",
    description:
      "نظام متكامل للمصادقة الثنائية وتشفير البيانات لحماية معلوماتك",
    color: "from-blue-500 to-cyan-500",
    lightColor: "text-blue-600",
    darkColor: "text-blue-400",
  },
  {
    icon: Zap,
    title: "أداء عالي",
    description: "سرعة فائقة في الاستجابة مع دعم لآلاف المستخدمين المتزامنين",
    color: "from-purple-500 to-pink-500",
    lightColor: "text-purple-600",
    darkColor: "text-purple-400",
  },
  {
    icon: Users,
    title: "إدارة المستخدمين",
    description: "نظام متكامل لإدارة المستخدمين والأدوار والصلاحيات",
    color: "from-green-500 to-emerald-500",
    lightColor: "text-green-600",
    darkColor: "text-green-400",
  },
  {
    icon: Lock,
    title: "التحكم بالصلاحيات",
    description: "نظام RBAC متقدم للتحكم الدقيق بصلاحيات المستخدمين",
    color: "from-orange-500 to-red-500",
    lightColor: "text-orange-600",
    darkColor: "text-orange-400",
  },
  {
    icon: Globe,
    title: "دعم OAuth",
    description: "تسجيل الدخول عبر Google و GitHub ومنصات متعددة",
    color: "from-indigo-500 to-purple-500",
    lightColor: "text-indigo-600",
    darkColor: "text-indigo-400",
  },
  {
    icon: BarChart,
    title: "تقارير وتحليلات",
    description: "لوحات تحكم تفاعلية مع رسوم بيانية وإحصائيات دقيقة",
    color: "from-pink-500 to-rose-500",
    lightColor: "text-pink-600",
    darkColor: "text-pink-400",
  },
  {
    icon: Bell,
    title: "إشعارات لحظية",
    description: "نظام إشعارات متقدم مع WebSocket للتحديثات الفورية",
    color: "from-yellow-500 to-amber-500",
    lightColor: "text-yellow-600",
    darkColor: "text-yellow-400",
  },
  {
    icon: Key,
    title: "مصادقة متقدمة",
    description: "JWT, Refresh Tokens, 2FA مع Google Authenticator",
    color: "from-teal-500 to-cyan-500",
    lightColor: "text-teal-600",
    darkColor: "text-teal-400",
  },
  {
    icon: Smartphone,
    title: "متجاوب مع الجوال",
    description: "واجهة متجاوبة تعمل على جميع الأجهزة",
    color: "from-violet-500 to-purple-500",
    lightColor: "text-violet-600",
    darkColor: "text-violet-400",
  },
  {
    icon: Cloud,
    title: "حوسبة سحابية",
    description: "نشر على السحابة مع دعم Docker و Kubernetes",
    color: "from-sky-500 to-blue-500",
    lightColor: "text-sky-600",
    darkColor: "text-sky-400",
  },
  {
    icon: Database,
    title: "قواعد بيانات متعددة",
    description: "دعم PostgreSQL, MongoDB, Redis للتخزين المؤقت",
    color: "from-fuchsia-500 to-pink-500",
    lightColor: "text-fuchsia-600",
    darkColor: "text-fuchsia-400",
  },
  {
    icon: Server,
    title: "جاهز للإنتاج",
    description: "بنية تحتية متكاملة جاهزة للنشر على Render و Vercel",
    color: "from-rose-500 to-red-500",
    lightColor: "text-rose-600",
    darkColor: "text-rose-400",
  },
];

export const stats = [
  { value: "99.9%", label: "نسبة التشغيل", suffix: "uptime" },
  { value: "10K+", label: "مستخدم نشط", suffix: "users" },
  { value: "50ms", label: "زمن الاستجابة", suffix: "response" },
  { value: "24/7", label: "دعم فني", suffix: "support" },
];

export const howItWorks = [
  {
    step: "01",
    title: "إنشاء حساب",
    description:
      "سجل حساب جديد في دقائق باستخدام بريدك الإلكتروني أو عبر Google",
    icon: "📝",
  },
  {
    step: "02",
    title: "تفعيل الحماية",
    description: "فعّل المصادقة الثنائية لحماية حسابك واحصل على رموز الاسترجاع",
    icon: "🔐",
  },
  {
    step: "03",
    title: "إدارة الفريق",
    description: "أضف أعضاء فريقك وحدد صلاحياتهم بدقة باستخدام نظام الأدوار",
    icon: "👥",
  },
  {
    step: "04",
    title: "تابع الأداء",
    description: "راقب نشاط فريقك من خلال لوحة تحكم تفاعلية وتقارير مفصلة",
    icon: "📊",
  },
];

export const testimonials = [
  {
    name: "أحمد محمد",
    role: "مدير تقنية المعلومات",
    company: "شركة التقنية المتطورة",
    content:
      "منصة متكاملة ساعدتنا في تنظيم صلاحيات الموظفين وتحسين أمان النظام. واجهة سهلة ودعم فني ممتاز.",
    avatar: "👨‍💼",
    rating: 5,
  },
  {
    name: "سارة عبدالله",
    role: "مطور برمجيات",
    company: "حلول المستقبل",
    content:
      "أفضل نظام إدارة صلاحيات استخدمته. مرن وقوي ويدعم جميع متطلباتنا الأمنية.",
    avatar: "👩‍💻",
    rating: 5,
  },
  {
    name: "محمد علي",
    role: "مدير المنتج",
    company: "منصة التعليم الإلكتروني",
    content:
      "بفضل هذا النظام، استطعنا إدارة آلاف المستخدمين بكفاءة عالية. أنصح به بشدة.",
    avatar: "👨‍💼",
    rating: 5,
  },
  {
    name: "نورة أحمد",
    role: "مصممة واجهات",
    company: "استوديو الإبداع",
    content:
      "تصميم أنيق وسهل الاستخدام. أحببت لوحة التحكم وإمكانية تخصيص الصلاحيات.",
    avatar: "👩‍🎨",
    rating: 5,
  },
];

export const pricingPlans = [
  {
    name: "المبتدئ",
    price: "0",
    period: "شهر",
    description: "للشركات الناشئة والمشاريع الصغيرة",
    features: [
      "حتى 10 مستخدمين",
      "مميزات أساسية",
      "دعم عبر البريد",
      "2FA قياسي",
      "تقارير أساسية",
    ],
    limitations: [
      "لا يوجد دعم OAuth",
      "لا يوجد تحليلات متقدمة",
      "دعم فني محدود",
    ],
    cta: "ابدأ مجاناً",
    popular: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "المتقدم",
    price: "99",
    period: "شهر",
    description: "للشركات المتوسطة والفرق المتنامية",
    features: [
      "حتى 100 مستخدم",
      "جميع المميزات",
      "دعم فني 24/7",
      "2FA متقدم + رموز استرجاع",
      "تقارير وتحليلات متقدمة",
      "دعم OAuth",
      "API متكامل",
    ],
    limitations: [],
    cta: "اختر الخطة المتقدمة",
    popular: true,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "المؤسسات",
    price: "299",
    period: "شهر",
    description: "للشركات الكبيرة والمؤسسات",
    features: [
      "غير محدود من المستخدمين",
      "جميع مميزات الخطة المتقدمة",
      "مدير حساب مخصص",
      "SLA مضمون",
      "تكامل مخصص",
      "تدريب للفريق",
      "نشر داخلي (On-Premise)",
    ],
    limitations: [],
    cta: "تواصل معنا",
    popular: false,
    gradient: "from-purple-500 to-pink-500",
  },
];

export const faqs = [
  {
    question: "ما هي المصادقة الثنائية؟",
    answer:
      "المصادقة الثنائية تضيف طبقة أمان إضافية لحسابك. بعد تفعيلها، ستحتاج إلى إدخال رمز من تطبيق Google Authenticator بالإضافة إلى كلمة المرور.",
  },
  {
    question: "هل يمكنني تجربة النظام مجاناً؟",
    answer:
      "نعم، نوفر خطة مجانية تتيح لك تجربة جميع المميزات الأساسية مع إمكانية ترقية حسابك في أي وقت.",
  },
  {
    question: "ما هي طرق الدعم المتاحة؟",
    answer:
      "نوفر دعماً عبر البريد الإلكتروني والدردشة المباشرة لجميع العملاء، مع دعم 24/7 للخطط المدفوعة.",
  },
  {
    question: "كيف يمكنني إضافة أعضاء جدد للفريق؟",
    answer:
      "يمكنك إضافة أعضاء جدد بسهولة من لوحة التحكم، وتحديد صلاحيات كل عضو بدقة باستخدام نظام الأدوار.",
  },
  {
    question: "هل النظام آمن للبيانات الحساسة؟",
    answer:
      "نعم، نستخدم أحدث معايير التشفير لحماية بياناتك، مع دعم المصادقة الثنائية وتسجيل جميع النشاطات.",
  },
  {
    question: "هل يمكنني تصدير البيانات؟",
    answer: "نعم، يمكنك تصدير بياناتك بصيغ متعددة مثل CSV و JSON في أي وقت.",
  },
];

export const footerLinks = [
  {
    title: "المنتج",
    links: [
      { label: "المميزات", href: "#features" },
      { label: "خطط الأسعار", href: "#pricing" },
      { label: "التحديثات", href: "#" },
      { label: "دليل الاستخدام", href: "#" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "#" },
      { label: "المدونة", href: "#" },
      { label: "وظائف", href: "#" },
      { label: "تواصل معنا", href: "#contact" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { label: "مركز المساعدة", href: "#" },
      { label: "الأسئلة الشائعة", href: "#faq" },
      { label: "حالة النظام", href: "#" },
      { label: "تقرير مشكلة", href: "#" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { label: "سياسة الخصوصية", href: "#" },
      { label: "شروط الاستخدام", href: "#" },
      { label: "اتفاقية الخدمة", href: "#" },
    ],
  },
];

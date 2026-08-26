import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Scale,
  GraduationCap,
  X,
  Circle,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  ДАННЫЕ ЗАНЯТИЯ — редактируются преподавателем в одном месте        */
/* ------------------------------------------------------------------ */

const PLAN_ITEMS = [
  {
    title: "Понятие труда и трудовой деятельности",
    why: "Без понимания того, что такое труд, невозможно понять, зачем праву регулировать его отдельно.",
    question: "Что такое труд как экономическое, социальное и историческое явление?",
    mission: "Показывает, что труд — это не только сделка, но и человеческая деятельность.",
  },
  {
    title: "Понятие, предмет и метод трудового права",
    why: "Определяет границы отрасли и её отличие от гражданского права.",
    question: "Почему объектом трудового правоотношения является процесс труда, а не результат?",
    mission: "Задаёт юридическую конструкцию, через которую реализуется миссия отрасли.",
  },
  {
    title: "Функции трудового права",
    why: "Показывает, что право одновременно защищает работника и обеспечивает экономику.",
    question: "Как право одновременно защищает работника и обслуживает производство?",
    mission: "Функции — это инструменты, которыми право удерживает баланс интересов.",
  },
  {
    title: "Система трудового права",
    why: "Помогает увидеть отрасль как структуру, а не список разрозненных норм.",
    question: "Как отдельные институты складываются в единую систему?",
    mission: "Система — это архитектура, в которой миссия воплощается на практике.",
  },
  {
    title: "История трудового права",
    why: "Объясняет, почему отрасль возникла именно тогда, когда возникла.",
    question: "Почему прежней модели регулирования оказалось недостаточно?",
    mission: "История показывает, что миссия права меняется вместе с формами труда.",
  },
  {
    title: "Правовое регулирование рынка труда",
    why: "Связывает отраслевые нормы с реальной экономикой занятости.",
    question: "Как право влияет на то, кто и на каких условиях получает работу?",
    mission: "Показывает, что миссия права реализуется не только в договоре, но и на рынке.",
  },
  {
    title: "Соотношение трудового права с иными отраслями",
    why: "Помогает провести границу между трудовым, гражданским и административным правом.",
    question: "Почему трудовой договор — это не разновидность гражданско-правового договора?",
    mission: "Обосновывает самостоятельность отрасли, о которой говорит вся тема занятия.",
  },
  {
    title: "Профессия юриста в сфере трудовых отношений",
    why: "Показывает, как теория превращается в профессиональную практику.",
    question: "Как меняется правовая позиция в зависимости от роли юриста?",
    mission: "Связывает миссию отрасли с повседневной работой юриста.",
  },
];

const STATS = { total: 9.8, hired: 7.3 };

const LABOR_ASPECTS = [
  {
    id: "historical",
    label: "Исторический аспект",
    text: "Труд как фундаментальный способ человеческой жизни и двигатель антропогенеза.",
  },
  {
    id: "social",
    label: "Социальный аспект",
    text: "Труд как целесообразная, сознательная деятельность человека.",
  },
  {
    id: "economic",
    label: "Экономический аспект",
    text: "Труд как фактор производства и основа стоимости товара или услуги.",
  },
];

const LABOR_EXAMPLES = [
  { id: "income", text: "Работа как источник дохода", correct: "economic" },
  { id: "selfreal", text: "Труд как способ самореализации", correct: "social" },
  { id: "factor", text: "Труд как фактор производства", correct: "economic" },
  { id: "value", text: "Труд как основа стоимости", correct: "economic" },
  { id: "society", text: "Труд как форма участия человека в обществе", correct: "social" },
];

const INDEPENDENCE_SCENARIOS = [
  {
    id: 1,
    text: "Фрилансер сам выбирает клиентов, цену и сроки.",
    correct: "independent",
    comment: "Работник сам организует процесс и несёт риски — это самостоятельный труд.",
  },
  {
    id: 2,
    text: "Официант работает по графику ресторана.",
    correct: "hired",
    comment: "Подчинение графику и правилам организации — признак наёмного труда.",
  },
  {
    id: 3,
    text: "Курьер работает через приложение, которое распределяет заказы и блокирует доступ при низком рейтинге.",
    correct: "hired",
    comment: "Алгоритмический контроль и зависимость от платформы — форма организационной власти.",
  },
  {
    id: 4,
    text: "Ремонтник выполняет разовый заказ и сам определяет способ выполнения работы.",
    correct: "independent",
    comment: "Свобода выбора способа работы и ответственность за результат — самостоятельный труд.",
  },
  {
    id: 5,
    text: "Оператор call-центра работает по расписанию, под контролем супервайзера.",
    correct: "hired",
    comment: "Расписание и контроль руководителя — классические признаки наёмного труда.",
  },
];

const SUBJECT_OPTIONS = [
  { id: "A", text: "Готовый результат работы" },
  { id: "B", text: "Процесс личного выполнения труда" },
  { id: "C", text: "Передача вещи" },
  { id: "D", text: "Абстрактная экономическая выгода" },
];

const COMMODITY_ARGUMENTS = [
  "Труд неразрывно связан с личностью работника.",
  "Труд нельзя отделить от человека и передать как вещь.",
  "Неиспользованный труд нельзя сохранить на будущее.",
  "Для работника труд часто является основным или единственным источником существования.",
];

const COMMODITY_QUESTION_OPTIONS = [
  "Потому что трудовое право защищает не только экономический обмен, но и личность работника",
  "Потому что работник не равен вещи или ресурсу",
  "Потому что рынок труда нуждается в гуманизации",
  "Все варианты верны",
];

const CONTROL_ITEMS = [
  { id: "schedule", text: "График работы", correct: "org" },
  { id: "gps", text: "GPS-мониторинг", correct: "digital" },
  { id: "rating", text: "Рейтинг клиента", correct: "digital" },
  { id: "fine", text: "Штраф за опоздание", correct: "disc" },
  { id: "block", text: "Автоматическая блокировка аккаунта", correct: "digital" },
  { id: "dress", text: "Дресс-код", correct: "org" },
  { id: "cctv", text: "Видеонаблюдение", correct: "disc" },
  { id: "kpi", text: "KPI", correct: "disc" },
];

const CONTROL_CATEGORIES = [
  { id: "org", label: "Организационная власть" },
  { id: "disc", label: "Дисциплинарная власть" },
  { id: "digital", label: "Цифровой / алгоритмический контроль" },
];

const PLATFORM_FACTS = [
  "Платформа может заблокировать курьера за низкий рейтинг.",
  "Курьер не может самостоятельно согласовать цену с клиентом.",
  "Курьер сам выбирает дни и часы выхода на линию.",
  "Платформа требует использовать фирменную сумку и соблюдать стандарты общения.",
  "Курьер может одновременно работать через другие платформы.",
];

const PLATFORM_OPTIONS = [
  "Да, это трудовые отношения",
  "Нет, это гражданско-правовые отношения",
  "Это смешанная / пограничная ситуация",
  "Недостаточно данных",
];

const MISSION_LEFT = [
  "Заработная плата",
  "Безопасные условия труда",
  "Ограничение рабочего времени",
  "Время отдыха",
  "Защита от произвольного увольнения",
  "Уважение достоинства",
  "Защита персональных данных",
];

const MISSION_RIGHT = [
  "Прибыль",
  "Производительность",
  "Дисциплина",
  "Гибкость управления",
  "Снижение издержек",
  "Защита имущества и информации",
  "Адаптация бизнеса к рынку",
];

const BALANCE_CONSEQUENCES = {
  freedom: [
    "Риск эксплуатации",
    "Произвольные увольнения",
    "Нестабильность дохода",
    "Нарушение права на отдых",
    "Цифровой контроль без ограничений",
  ],
  overprotect: [
    "Снижение гибкости бизнеса",
    "Рост неформальной занятости",
    "Снижение стимулов к созданию рабочих мест",
    "Формальные гарантии без реального исполнения",
  ],
  balance: [
    "Устойчивые трудовые отношения",
    "Защита слабой стороны",
    "Предсказуемые правила для работодателя",
    "Социальная стабильность",
    "Справедливый рынок труда",
  ],
};

const FUNCTIONS_ITEMS = [
  { id: "rules", text: "Правила внутреннего трудового распорядка", correct: "general" },
  { id: "safety", text: "Охрана труда", correct: "special" },
  { id: "discipline", text: "Дисциплинарная ответственность", correct: "general" },
  { id: "minwage", text: "Минимальная заработная плата", correct: "special" },
  { id: "worktime", text: "Рабочее время", correct: "general" },
  { id: "collective", text: "Коллективный договор", correct: "special" },
  { id: "liability", text: "Материальная ответственность", correct: "general" },
  { id: "discrimination", text: "Защита от дискриминации", correct: "special" },
];

const FUNCTIONS_CATEGORIES = [
  { id: "general", label: "Общие функции (регулятивная / охранительная)" },
  { id: "special", label: "Специальные функции (социальная / экономическая)" },
];

const HISTORY_STAGES = [
  {
    title: "Римское частное право",
    text: "Locatio-conductio operarum как договор найма услуг.",
    question: "Почему найма услуг в частном праве было достаточно для древнего мира труда?",
  },
  {
    title: "Доиндустриальный период",
    text: "Частноправовое регулирование и минимальное вмешательство государства.",
    question: "Почему до индустриализации не было массовой потребности в отдельной отрасли?",
  },
  {
    title: "Индустриализация",
    text: "Массовый наёмный труд, фабричная дисциплина, рост зависимости работника.",
    question: "Почему прежней модели регулирования оказалось недостаточно?",
  },
  {
    title: "XIX–XX века",
    text: "Формирование трудового права как промышленного, фабричного, рабочего права.",
    question: "Почему право ответило именно самостоятельной отраслью, а не поправками в гражданское право?",
  },
  {
    title: "Современный этап",
    text: "Цифровизация труда, платформенная занятость, ИИ, алгоритмическое управление.",
    question: "Почему прежней модели регулирования снова оказывается недостаточно?",
  },
];

const UNCERTAINTY_TYPES = [
  { id: "normative", label: "Нормативная", example: "Оценочные понятия: уважительная причина, существенное изменение условий труда, злоупотребление правом." },
  { id: "factual", label: "Фактическая", example: "Неясно, был ли фактический допуск к работе." },
  { id: "interpretive", label: "Интерпретационная", example: "Разные подходы к квалификации платформенной занятости." },
  { id: "tech", label: "Технологическая", example: "Алгоритмическое управление, GPS-контроль, цифровые доказательства." },
  { id: "social", label: "Социальная", example: "Как право должно реагировать на новые формы занятости." },
  { id: "value", label: "Ценностная", example: "Баланс между эффективностью бизнеса и достоинством работника." },
  { id: "strategic", label: "Стратегическая", example: "Как трудовое право должно развиваться в условиях ИИ и автоматизации." },
];

const UNCERTAINTY_SCENARIOS = [
  { id: 1, text: "Работник уволен за «неоднократное неисполнение обязанностей» — но неясно, что именно считать неоднократностью.", correct: "normative" },
  { id: 2, text: "Работодатель утверждает, что человек никогда не приступал к работе, работник — что фактически работал три дня.", correct: "factual" },
  { id: 3, text: "Суды по-разному квалифицируют договоры курьеров: одни как трудовые, другие как гражданско-правовые.", correct: "interpretive" },
  { id: 4, text: "Спор о том, можно ли использовать данные GPS-трекера как доказательство сверхурочной работы.", correct: "tech" },
  { id: 5, text: "Законодатель не знает, распространять ли трудовые гарантии на самозанятых платформенных работников.", correct: "social" },
];

const AI_WEAKNESSES = [
  "ИИ слишком доверяет названию договора",
  "ИИ не анализирует фактическое содержание отношений",
  "ИИ не учитывает организационную зависимость",
  "ИИ не анализирует цифровой контроль",
  "ИИ не рассматривает альтернативные позиции",
  "ИИ не указывает, каких фактов не хватает",
  "ИИ делает слишком категоричный вывод",
];

const PROFESSION_ROLES = [
  "Юрист работодателя",
  "Юрист работника",
  "Медиатор",
  "Член согласительной комиссии",
  "Государственный инспектор труда",
  "Судья",
  "Профсоюзный юрист",
  "Compliance-специалист",
  "Legal tech / HR tech консультант",
];

const REFLECTION_QUESTIONS = [
  "Почему трудовое право не сводится к гражданскому праву?",
  "Что означает тезис «труд не является товаром»?",
  "Почему баланс интересов в трудовом праве предполагает защиту более слабой стороны?",
  "Какие признаки помогают отличить трудовое отношение от гражданско-правового?",
  "Как изменилась ваша позиция по кейсу после появления новых фактов?",
];

const TEACHER_TIMING = [
  { time: "0–5 мин", text: "Вводный вопрос и запуск занятия." },
  { time: "5–10 мин", text: "Статистика и обсуждение общественного значения наёмного труда." },
  { time: "10–18 мин", text: "Понятие труда и различие самостоятельного / наёмного труда." },
  { time: "18–25 мин", text: "Предмет трудового права и тезис «труд не товар»." },
  { time: "25–35 мин", text: "Кейс о платформенном курьере." },
  { time: "35–45 мин", text: "Миссия трудового права и баланс интересов." },
  { time: "45–52 мин", text: "Функции трудового права и историческая логика." },
  { time: "52–57 мин", text: "ИИ как объект критического анализа." },
  { time: "57–60 мин", text: "Финальная рефлексия." },
];

/* ------------------------------------------------------------------ */
/*  СЕКЦИИ (порядок прохождения занятия)                               */
/* ------------------------------------------------------------------ */

const SECTION_IDS = [
  "intro",
  "plan",
  "why",
  "whatIsLabor",
  "independence",
  "subject",
  "notCommodity",
  "power",
  "platform",
  "mission",
  "functions",
  "history",
  "uncertainty",
  "aiCritique",
  "profession",
  "reflection",
  "conclusion",
];

/* ------------------------------------------------------------------ */
/*  МЕЛКИЕ UI-КОМПОНЕНТЫ                                                */
/* ------------------------------------------------------------------ */

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-blue-800 mb-2">
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
      {children}
    </h2>
  );
}

function Callout({ children, tone = "blue" }) {
  const tones = {
    blue: "border-blue-800 bg-blue-50 text-slate-800",
    rose: "border-rose-800 bg-rose-50 text-slate-800",
    slate: "border-slate-400 bg-slate-50 text-slate-800",
  };
  return (
    <div className={`border-l-4 rounded-r-md p-4 my-4 ${tones[tone]}`}>
      {children}
    </div>
  );
}

function ChoiceButton({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
        selected
          ? "border-blue-800 bg-blue-50 text-slate-900"
          : "border-slate-200 bg-white hover:border-blue-400 text-slate-700"
      }`}
    >
      <span className="flex items-center gap-2">
        {selected ? (
          <CheckCircle2 className="w-4 h-4 text-blue-800 flex-shrink-0" />
        ) : (
          <Circle className="w-4 h-4 text-slate-300 flex-shrink-0" />
        )}
        {children}
      </span>
    </button>
  );
}

function TextField({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-slate-300 rounded-md p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
    />
  );
}

function NavButtons({ onPrev, onNext, nextLabel = "Далее", disableNext = false, hidePrev = false }) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
      {!hidePrev ? (
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onNext}
        disabled={disableNext}
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-md font-medium text-white ${
          disableNext ? "bg-slate-300 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-900"
        }`}
      >
        {nextLabel} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ГЛАВНЫЙ КОМПОНЕНТ                                                   */
/* ------------------------------------------------------------------ */

export default function LaborLawLesson() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [teacherMode, setTeacherMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [assignments, setAssignments] = useState({}); // generic item -> category assignment maps
  const [answers, setAnswers] = useState({}); // free text answers
  const [choices, setChoices] = useState({}); // single choice answers
  const [platformStep, setPlatformStep] = useState(0);
  const [platformHistory, setPlatformHistory] = useState([]);
  const [balanceValue, setBalanceValue] = useState(50);
  const [aiChecks, setAiChecks] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const section = SECTION_IDS[sectionIndex];
  const progress = Math.round((sectionIndex / (SECTION_IDS.length - 1)) * 100);

  function goNext() {
    setSectionIndex((i) => Math.min(i + 1, SECTION_IDS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function goPrev() {
    setSectionIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function resetLesson() {
    setSectionIndex(0);
    setExpandedPlan(null);
    setAssignments({});
    setAnswers({});
    setChoices({});
    setPlatformStep(0);
    setPlatformHistory([]);
    setBalanceValue(50);
    setAiChecks([]);
    setSelectedRole(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function assign(group, itemId, categoryId) {
    setAssignments((prev) => ({
      ...prev,
      [group]: { ...(prev[group] || {}), [itemId]: categoryId },
    }));
  }

  function toggleAiCheck(item) {
    setAiChecks((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  }

  function buildReport() {
    const lines = [];
    lines.push("ЗАНЯТИЕ №1. МИССИЯ ТРУДОВОГО ПРАВА");
    lines.push("Ответы студента");
    lines.push("=".repeat(40));
    lines.push("");
    lines.push("Общественное значение наёмного труда:");
    lines.push(answers.whyImportant || "(нет ответа)");
    lines.push("");
    lines.push("Объект трудового правоотношения (выбор): " + (choices.subject ? SUBJECT_OPTIONS.find((o) => o.id === choices.subject)?.text : "(нет ответа)"));
    lines.push("");
    lines.push("Труд не товар — почему это важно: " + (choices.commodity !== undefined ? COMMODITY_QUESTION_OPTIONS[choices.commodity] : "(нет ответа)"));
    lines.push("");
    lines.push("Кейс «Платформенный курьер»:");
    lines.push("Первоначальная позиция: " + (choices.platformInitial !== undefined ? PLATFORM_OPTIONS[choices.platformInitial] : "(нет ответа)"));
    lines.push("Обоснование: " + (answers.platformReasoning || "(нет ответа)"));
    platformHistory.forEach((h, i) => {
      lines.push(`После факта ${i + 1}: ${PLATFORM_OPTIONS[h]}`);
    });
    lines.push("");
    lines.push("Баланс интересов (позиция на шкале 0–100, 0 = максимальная защита работника, 100 = максимальная свобода работодателя): " + balanceValue);
    lines.push("");
    lines.push("ИИ — найденные слабые места:");
    lines.push(aiChecks.length ? aiChecks.map((c) => "- " + c).join("\n") : "(не выбрано)");
    lines.push("");
    lines.push("Выбранная профессиональная роль: " + (selectedRole || "(не выбрана)"));
    lines.push("Аргумент по кейсу курьера: " + (answers.roleArgument || "(нет ответа)"));
    lines.push("");
    lines.push("ФИНАЛЬНАЯ РЕФЛЕКСИЯ");
    REFLECTION_QUESTIONS.forEach((q, i) => {
      lines.push(`${i + 1}. ${q}`);
      lines.push(answers[`reflection_${i}`] || "(нет ответа)");
      lines.push("");
    });
    return lines.join("\n");
  }

  function copyReport() {
    const text = buildReport();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadReport() {
    const text = buildReport();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trudovoe-pravo-otvety.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ---------------- render helpers per section ---------------- */

  function renderIntro() {
    return (
      <div className="text-center max-w-2xl mx-auto py-10">
        <Eyebrow>Занятие №1 · Трудовое право Республики Казахстан</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
          Миссия трудового права
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Почему трудовое право возникло как самостоятельная отрасль и как оно удерживает
          баланс между работником, работодателем и государством?
        </p>
        <Card className="p-6 text-left mb-8">
          <p className="text-slate-700 leading-relaxed">
            Трудовое право регулирует не просто работу как деятельность, а общественные
            отношения, возникающие по поводу наёмного труда. Его главная задача — превратить
            экономически неравное отношение между работником и работодателем в юридически
            организованное пространство, где труд не сводится к товару, а человек не
            теряется за трудовой функцией.
          </p>
        </Card>
        <Callout tone="rose">
          <p className="font-semibold text-slate-900">Фундаментальный вопрос занятия</p>
          <p className="mt-1">
            Почему трудовое право существует как самостоятельная отрасль права, если работник
            и работодатель формально могут заключить обычный гражданско-правовой договор?
          </p>
        </Callout>
        <button
          onClick={goNext}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-blue-800 text-white font-medium text-lg hover:bg-blue-900 mt-4"
        >
          Начать занятие <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-xs text-slate-400 mt-4">
          Автор курса: Хасенов Муслим Ханатович, PhD, Associate Professor · Maqsut Narikbayev University
        </p>
      </div>
    );
  }

  function renderPlan() {
    return (
      <div>
        <Eyebrow>Структура занятия</Eyebrow>
        <SectionTitle>План занятия</SectionTitle>
        <p className="text-slate-600 mb-6">Нажмите на пункт, чтобы увидеть, зачем он нужен.</p>
        <div className="space-y-3">
          {PLAN_ITEMS.map((item, i) => (
            <Card key={i} className="p-4">
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => setExpandedPlan(expandedPlan === i ? null : i)}
              >
                <span className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-800 text-white text-sm flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-medium text-slate-800">{item.title}</span>
                </span>
                {expandedPlan === i ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expandedPlan === i && (
                <div className="mt-3 pl-10 text-sm text-slate-600 space-y-2">
                  <p><span className="font-semibold text-slate-800">Зачем нужен: </span>{item.why}</p>
                  <p><span className="font-semibold text-slate-800">Фундаментальный вопрос: </span>{item.question}</p>
                  <p><span className="font-semibold text-slate-800">Связь с миссией: </span>{item.mission}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderWhy() {
    const pct = Math.round((STATS.hired / STATS.total) * 100);
    return (
      <div>
        <Eyebrow>Почему это важно</Eyebrow>
        <SectionTitle>Наёмный труд — это не частный вопрос</SectionTitle>
        <Card className="p-6 mb-4">
          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
              <p className="text-3xl font-serif font-bold text-slate-900">{STATS.total} млн</p>
              <p className="text-sm text-slate-500">рабочая сила</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-blue-800">{STATS.hired} млн</p>
              <p className="text-sm text-slate-500">наёмные работники</p>
            </div>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-800" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-sm text-slate-500 mt-2 text-center">
            Наёмные работники составляют около {pct}% рабочей силы
          </p>
        </Card>
        <Callout>
          <p>
            Если большинство экономически активного населения работает по найму, почему
            регулирование наёмного труда становится вопросом не только частного договора, но
            и общественного интереса?
          </p>
        </Callout>
        <TextField
          value={answers.whyImportant}
          onChange={(v) => setAnswers((a) => ({ ...a, whyImportant: v }))}
          placeholder="Ваш краткий ответ..."
        />
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderWhatIsLabor() {
    const group = "labor";
    const current = assignments[group] || {};
    return (
      <div>
        <Eyebrow>Три измерения труда</Eyebrow>
        <SectionTitle>Что такое труд?</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {LABOR_ASPECTS.map((a) => (
            <Card key={a.id} className="p-4">
              <p className="font-semibold text-blue-800 mb-1">{a.label}</p>
              <p className="text-sm text-slate-600">{a.text}</p>
            </Card>
          ))}
        </div>
        <p className="text-slate-600 mb-3">
          Распределите примеры по трём аспектам, нажимая на кнопки под каждым примером.
        </p>
        <div className="space-y-3">
          {LABOR_EXAMPLES.map((ex) => (
            <Card key={ex.id} className="p-4">
              <p className="text-slate-800 mb-3">{ex.text}</p>
              <div className="flex flex-wrap gap-2">
                {LABOR_ASPECTS.map((a) => {
                  const selected = current[ex.id] === a.id;
                  const showCorrect = current[ex.id] && a.id === ex.correct;
                  return (
                    <button
                      key={a.id}
                      onClick={() => assign(group, ex.id, a.id)}
                      className={`px-3 py-1.5 rounded-full text-sm border ${
                        selected
                          ? showCorrect
                            ? "bg-blue-800 border-blue-800 text-white"
                            : "bg-rose-700 border-rose-700 text-white"
                          : "border-slate-300 text-slate-600 hover:border-blue-400"
                      }`}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
              {current[ex.id] && (
                <p className="text-xs mt-2 text-slate-500">
                  {current[ex.id] === ex.correct ? "Верно." : `Точнее отнести к: ${LABOR_ASPECTS.find(a=>a.id===ex.correct).label}.`}
                </p>
              )}
            </Card>
          ))}
        </div>
        <Callout tone="rose">
          Трудовое право возникает на пересечении этих трёх измерений: экономического,
          социального и человеческого.
        </Callout>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderIndependence() {
    const group = "independence";
    const current = assignments[group] || {};
    return (
      <div>
        <Eyebrow>Развилка</Eyebrow>
        <SectionTitle>Самостоятельный и наёмный труд</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <p className="font-semibold text-slate-900 mb-1">Самостоятельный труд</p>
            <p className="text-sm text-slate-600">
              Человек сам организует процесс труда, самостоятельно несёт риски и отвечает за
              результат.
            </p>
          </Card>
          <Card className="p-4">
            <p className="font-semibold text-slate-900 mb-1">Наёмный труд</p>
            <p className="text-sm text-slate-600">
              Человек лично выполняет работу в организационной сфере работодателя, подчиняется
              определённому порядку, получает оплату за процесс труда и находится в положении
              организационной и экономической зависимости.
            </p>
          </Card>
        </div>
        <p className="text-slate-600 mb-3">Определите тип труда в каждой ситуации.</p>
        <div className="space-y-3">
          {INDEPENDENCE_SCENARIOS.map((s) => {
            const picked = current[s.id];
            return (
              <Card key={s.id} className="p-4">
                <p className="text-slate-800 mb-3">{s.text}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => assign(group, s.id, "independent")}
                    className={`px-3 py-1.5 rounded-full text-sm border ${
                      picked === "independent"
                        ? picked === s.correct
                          ? "bg-blue-800 border-blue-800 text-white"
                          : "bg-rose-700 border-rose-700 text-white"
                        : "border-slate-300 text-slate-600 hover:border-blue-400"
                    }`}
                  >
                    Самостоятельный
                  </button>
                  <button
                    onClick={() => assign(group, s.id, "hired")}
                    className={`px-3 py-1.5 rounded-full text-sm border ${
                      picked === "hired"
                        ? picked === s.correct
                          ? "bg-blue-800 border-blue-800 text-white"
                          : "bg-rose-700 border-rose-700 text-white"
                        : "border-slate-300 text-slate-600 hover:border-blue-400"
                    }`}
                  >
                    Наёмный
                  </button>
                </div>
                {picked && <p className="text-xs mt-2 text-slate-500">{s.comment}</p>}
              </Card>
            );
          })}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderSubject() {
    return (
      <div>
        <Eyebrow>Предмет трудового права</Eyebrow>
        <SectionTitle>Что регулирует трудовое право?</SectionTitle>
        <Callout>
          Предметом правового регулирования является не труд сам по себе, а общественные
          отношения, складывающиеся по поводу труда.
        </Callout>
        <Callout tone="rose">
          Объектом трудового правоотношения является процесс труда, то есть живой труд, а не
          овеществлённый результат работы. Этим трудовой договор отличается от
          гражданско-правового договора подряда или оказания услуг.
        </Callout>
        <p className="text-slate-700 font-medium mt-6 mb-3">
          Что является главным объектом регулирования?
        </p>
        <div className="space-y-2">
          {SUBJECT_OPTIONS.map((o) => (
            <ChoiceButton
              key={o.id}
              selected={choices.subject === o.id}
              onClick={() => setChoices((c) => ({ ...c, subject: o.id }))}
            >
              {o.id}. {o.text}
            </ChoiceButton>
          ))}
        </div>
        {choices.subject && (
          <Callout tone={choices.subject === "B" ? "blue" : "rose"}>
            {choices.subject === "B"
              ? "Верно. Логика трудового права связана с процессом личного труда, организационной зависимостью и включением работника в систему работодателя."
              : "Подумайте ещё раз: правильная логика трудового права связана с процессом личного труда, организационной зависимостью и включением работника в систему работодателя."}
          </Callout>
        )}
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderNotCommodity() {
    return (
      <div>
        <Eyebrow>Труд и рынок</Eyebrow>
        <SectionTitle>Почему труд не является товаром?</SectionTitle>
        <Callout tone="rose">
          Труд не является обычным товаром, потому что он неотделим от личности работника.
        </Callout>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {COMMODITY_ARGUMENTS.map((a, i) => (
            <Card key={i} className="p-4 text-sm text-slate-700">
              {a}
            </Card>
          ))}
        </div>
        <p className="text-slate-700 font-medium mb-3">
          Почему утверждение «труд не является товаром» важно для понимания миссии трудового
          права?
        </p>
        <div className="space-y-2">
          {COMMODITY_QUESTION_OPTIONS.map((o, i) => (
            <ChoiceButton
              key={i}
              selected={choices.commodity === i}
              onClick={() => setChoices((c) => ({ ...c, commodity: i }))}
            >
              {o}
            </ChoiceButton>
          ))}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} disableNext={choices.commodity === undefined} />
      </div>
    );
  }

  function renderPower() {
    const group = "power";
    const current = assignments[group] || {};
    return (
      <div>
        <Eyebrow>Асимметрия отношений</Eyebrow>
        <SectionTitle>Власть работодателя</SectionTitle>
        <Callout>Использование наёмного труда порождает власть работодателя над работником.</Callout>
        <div className="grid sm:grid-cols-3 gap-3 mb-6 text-sm text-slate-700">
          <Card className="p-4"><p className="font-semibold text-slate-900 mb-1">В пространстве</p>Работодатель определяет место, обстановку и условия работы.</Card>
          <Card className="p-4"><p className="font-semibold text-slate-900 mb-1">Во времени</p>Работодатель определяет продолжительность, график и режим работы.</Card>
          <Card className="p-4"><p className="font-semibold text-slate-900 mb-1">В цифровой среде</p>Приложение или платформа контролирует работника через рейтинг, GPS, алгоритмы и аналитику.</Card>
        </div>
        <p className="text-slate-600 mb-3">Распределите формы контроля по трём категориям власти.</p>
        <div className="space-y-3">
          {CONTROL_ITEMS.map((it) => {
            const picked = current[it.id];
            return (
              <Card key={it.id} className="p-4">
                <p className="text-slate-800 mb-3">{it.text}</p>
                <div className="flex flex-wrap gap-2">
                  {CONTROL_CATEGORIES.map((cat) => {
                    const selected = picked === cat.id;
                    const isCorrect = picked && cat.id === it.correct;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => assign(group, it.id, cat.id)}
                        className={`px-3 py-1.5 rounded-full text-sm border ${
                          selected
                            ? isCorrect
                              ? "bg-blue-800 border-blue-800 text-white"
                              : "bg-rose-700 border-rose-700 text-white"
                            : "border-slate-300 text-slate-600 hover:border-blue-400"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderPlatform() {
    const started = choices.platformInitial !== undefined;
    const totalFacts = PLATFORM_FACTS.length;
    const finished = platformStep >= totalFacts;

    return (
      <div>
        <Eyebrow>Мини-кейс</Eyebrow>
        <SectionTitle>Платформенный курьер: работник или самозанятый?</SectionTitle>
        <Card className="p-5 mb-4 text-sm text-slate-700 leading-relaxed">
          Курьер работает через цифровую платформу. Формально он зарегистрирован как
          самозанятый и заключил договор оказания услуг. Он сам выбирает время выхода на
          линию, но приложение распределяет заказы, устанавливает рейтинг, контролирует
          скорость доставки, рассчитывает оплату и может временно ограничить доступ к заказам.
        </Card>

        {!started && (
          <>
            <p className="text-slate-700 font-medium mb-3">
              Является ли такой курьер работником? Имеет ли он трудовые права? Являются ли
              отношения между ним и платформой трудовыми?
            </p>
            <div className="space-y-2 mb-4">
              {PLATFORM_OPTIONS.map((o, i) => (
                <ChoiceButton
                  key={i}
                  selected={choices.platformInitial === i}
                  onClick={() => setChoices((c) => ({ ...c, platformInitial: i }))}
                >
                  {o}
                </ChoiceButton>
              ))}
            </div>
            <TextField
              value={answers.platformReasoning}
              onChange={(v) => setAnswers((a) => ({ ...a, platformReasoning: v }))}
              placeholder="Кратко обоснуйте свою позицию..."
            />
          </>
        )}

        {started && !finished && (
          <div>
            <p className="text-sm text-slate-500 mb-2">
              Ваша текущая позиция: <span className="font-medium text-slate-800">{PLATFORM_OPTIONS[platformHistory[platformStep - 1] ?? choices.platformInitial]}</span>
            </p>
            <Callout tone="rose">
              <p className="font-semibold text-slate-900 mb-1">Новый факт {platformStep + 1} из {totalFacts}</p>
              <p>{PLATFORM_FACTS[platformStep]}</p>
            </Callout>
            <p className="text-slate-700 font-medium mb-3">Подтвердите или измените позицию:</p>
            <div className="space-y-2">
              {PLATFORM_OPTIONS.map((o, i) => (
                <ChoiceButton
                  key={i}
                  selected={false}
                  onClick={() => {
                    setPlatformHistory((h) => [...h, i]);
                    setPlatformStep((s) => s + 1);
                  }}
                >
                  {o}
                </ChoiceButton>
              ))}
            </div>
          </div>
        )}

        {started && finished && (
          <div>
            <Callout tone="blue">
              <p className="font-semibold text-slate-900 mb-2">Итоговый анализ</p>
              <p className="mb-2"><span className="font-medium">За трудовую квалификацию: </span>алгоритмический контроль, невозможность согласовывать цену, требования к внешнему виду и стандартам общения, блокировка за рейтинг.</p>
              <p className="mb-2"><span className="font-medium">За гражданско-правовую модель: </span>свобода выбора времени выхода на линию, возможность работать на нескольких платформах одновременно.</p>
              <p className="mb-2">Это пример правовой неопределённости: формальные и фактические признаки указывают в разные стороны.</p>
              <p>Важна не формальная надпись в договоре, а фактическое содержание отношений — принцип приоритета существа над формой.</p>
            </Callout>
            <p className="text-sm text-slate-500">
              История ваших позиций: {[choices.platformInitial, ...platformHistory].map((i) => PLATFORM_OPTIONS[i]).join(" → ")}
            </p>
          </div>
        )}

        <NavButtons
          onPrev={goPrev}
          onNext={goNext}
          disableNext={!started || !finished}
        />
      </div>
    );
  }

  function renderMission() {
    let bucket = "balance";
    if (balanceValue < 30) bucket = "overprotect";
    else if (balanceValue > 70) bucket = "freedom";
    const bucketLabel = {
      overprotect: "Чрезмерная защита без учёта экономики",
      balance: "Баланс",
      freedom: "Максимальная свобода работодателя",
    };
    return (
      <div>
        <Eyebrow>Ядро занятия</Eyebrow>
        <SectionTitle>Миссия трудового права</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Card className="p-4">
            <p className="font-semibold text-blue-800 mb-2">Интересы работника</p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              {MISSION_LEFT.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Card>
          <Card className="p-4">
            <p className="font-semibold text-rose-800 mb-2">Интересы работодателя</p>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              {MISSION_RIGHT.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Card>
        </div>
        <Card className="p-4 text-center mb-6">
          <Scale className="w-6 h-6 text-slate-500 mx-auto mb-1" />
          <p className="font-semibold text-slate-900">Государство и трудовое право</p>
        </Card>
        <Callout tone="rose">
          Миссия трудового права — достижение баланса интересов работников и работодателей. Но
          этот баланс не сводится к равенству сторон. Он достигается с учётом приоритета
          защиты работника как экономически более слабой стороны.
        </Callout>

        <div className="mt-6">
          <p className="text-sm text-slate-600 mb-2">
            Переместите ползунок: слева — максимальная защита работника, справа — максимальная
            свобода работодателя.
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={balanceValue}
            onChange={(e) => setBalanceValue(Number(e.target.value))}
            className="w-full accent-blue-800"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Защита работника</span>
            <span>Баланс</span>
            <span>Свобода работодателя</span>
          </div>
          <Callout tone={bucket === "balance" ? "blue" : "rose"}>
            <p className="font-semibold text-slate-900 mb-2">{bucketLabel[bucket]}</p>
            <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
              {BALANCE_CONSEQUENCES[bucket].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Callout>
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderFunctions() {
    const group = "functions";
    const current = assignments[group] || {};
    return (
      <div>
        <Eyebrow>Инструменты миссии</Eyebrow>
        <SectionTitle>Функции трудового права</SectionTitle>
        <Callout>
          Социальная функция — это руль корабля рыночной экономики, а производственная
          функция — его паруса. Без руля корабль может быть выброшен на рифы, а без парусов он
          может просто остановиться.
        </Callout>
        <p className="text-slate-600 mb-3 mt-4">Распределите институты по функциям.</p>
        <div className="space-y-3">
          {FUNCTIONS_ITEMS.map((it) => {
            const picked = current[it.id];
            return (
              <Card key={it.id} className="p-4">
                <p className="text-slate-800 mb-3">{it.text}</p>
                <div className="flex flex-wrap gap-2">
                  {FUNCTIONS_CATEGORIES.map((cat) => {
                    const selected = picked === cat.id;
                    const isCorrect = picked && cat.id === it.correct;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => assign(group, it.id, cat.id)}
                        className={`px-3 py-1.5 rounded-full text-sm border ${
                          selected
                            ? isCorrect
                              ? "bg-blue-800 border-blue-800 text-white"
                              : "bg-rose-700 border-rose-700 text-white"
                            : "border-slate-300 text-slate-600 hover:border-blue-400"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderHistory() {
    return (
      <div>
        <Eyebrow>Эволюция отрасли</Eyebrow>
        <SectionTitle>История трудового права</SectionTitle>
        <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
          {HISTORY_STAGES.map((s, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-blue-800 border-2 border-white" />
              <Card className="p-4">
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="text-sm text-slate-600 mt-1">{s.text}</p>
                <p className="text-sm text-blue-800 mt-2 italic">{s.question}</p>
              </Card>
            </div>
          ))}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderUncertainty() {
    return (
      <div>
        <Eyebrow>Работа с неопределённостью</Eyebrow>
        <SectionTitle>Семь видов неопределённости</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {UNCERTAINTY_TYPES.map((t) => (
            <Card key={t.id} className="p-3 text-sm">
              <p className="font-semibold text-blue-800">{t.label}</p>
              <p className="text-slate-600">{t.example}</p>
            </Card>
          ))}
        </div>
        <p className="text-slate-600 mb-3">
          Определите, какой вид неопределённости проявляется в каждой ситуации.
        </p>
        <div className="space-y-3">
          {UNCERTAINTY_SCENARIOS.map((s) => {
            const picked = choices[`unc_${s.id}`];
            return (
              <Card key={s.id} className="p-4">
                <p className="text-slate-800 mb-3">{s.text}</p>
                <div className="flex flex-wrap gap-2">
                  {UNCERTAINTY_TYPES.map((t) => {
                    const selected = picked === t.id;
                    const isCorrect = picked && t.id === s.correct;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setChoices((c) => ({ ...c, [`unc_${s.id}`]: t.id }))}
                        className={`px-3 py-1 rounded-full text-xs border ${
                          selected
                            ? isCorrect
                              ? "bg-blue-800 border-blue-800 text-white"
                              : "bg-rose-700 border-rose-700 text-white"
                            : "border-slate-300 text-slate-600 hover:border-blue-400"
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderAiCritique() {
    return (
      <div>
        <Eyebrow>ИИ как объект анализа</Eyebrow>
        <SectionTitle>Проверьте ответ ИИ</SectionTitle>
        <Card className="p-5 mb-4 text-sm text-slate-700 italic">
          «Поскольку курьер заключил договор оказания услуг и зарегистрирован как самозанятый,
          отношения не являются трудовыми. Следовательно, он не имеет трудовых прав».
        </Card>
        <p className="text-slate-700 font-medium mb-3">Найдите слабые места в ответе ИИ:</p>
        <div className="space-y-2 mb-4">
          {AI_WEAKNESSES.map((w) => (
            <label key={w} className="flex items-start gap-3 p-3 rounded-md border border-slate-200 cursor-pointer hover:border-blue-400">
              <input
                type="checkbox"
                checked={aiChecks.includes(w)}
                onChange={() => toggleAiCheck(w)}
                className="mt-0.5 accent-blue-800"
              />
              <span className="text-sm text-slate-700">{w}</span>
            </label>
          ))}
        </div>
        {aiChecks.length > 0 && (
          <Callout tone="rose">
            Юрист не должен просто принимать ответ ИИ. Он должен проверять предпосылки, видеть
            пропущенные факты, анализировать альтернативные квалификации и самостоятельно
            формировать правовую позицию.
          </Callout>
        )}
        <NavButtons onPrev={goPrev} onNext={goNext} />
      </div>
    );
  }

  function renderProfession() {
    return (
      <div>
        <Eyebrow>От теории к практике</Eyebrow>
        <SectionTitle>Профессия юриста в сфере трудовых отношений</SectionTitle>
        <div className="flex flex-wrap gap-2 mb-6">
          {PROFESSION_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-2 rounded-md text-sm border ${
                selectedRole === r
                  ? "bg-blue-800 border-blue-800 text-white"
                  : "border-slate-300 text-slate-600 hover:border-blue-400"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        {selectedRole && (
          <>
            <Callout>
              Как меняется правовая позиция в зависимости от профессиональной роли юриста?
              Сформулируйте один аргумент по делу платформенного курьера с позиции роли:{" "}
              <span className="font-semibold">{selectedRole}</span>.
            </Callout>
            <TextField
              value={answers.roleArgument}
              onChange={(v) => setAnswers((a) => ({ ...a, roleArgument: v }))}
              placeholder="Ваш аргумент..."
            />
          </>
        )}
        <NavButtons onPrev={goPrev} onNext={goNext} disableNext={!selectedRole} />
      </div>
    );
  }

  function renderReflection() {
    return (
      <div>
        <Eyebrow>Финал занятия</Eyebrow>
        <SectionTitle>Финальная рефлексия</SectionTitle>
        <div className="space-y-5">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i}>
              <p className="text-slate-800 font-medium mb-2">{i + 1}. {q}</p>
              <TextField
                value={answers[`reflection_${i}`]}
                onChange={(v) => setAnswers((a) => ({ ...a, [`reflection_${i}`]: v }))}
                placeholder="Ваш ответ..."
                rows={2}
              />
            </div>
          ))}
        </div>
        <NavButtons onPrev={goPrev} onNext={goNext} nextLabel="Завершить занятие" />
      </div>
    );
  }

  function renderConclusion() {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <Eyebrow>Итог</Eyebrow>
        <SectionTitle>Занятие завершено</SectionTitle>
        <Card className="p-6 text-left mb-6">
          <p className="text-slate-700 leading-relaxed">
            Трудовое право — это правовой механизм очеловечивания рынка труда. Оно удерживает
            баланс между интересами работника, работодателя и государства, компенсирует
            экономическую слабость работника, ограничивает власть работодателя и создаёт
            правила, без которых рынок труда превращается в пространство фактического
            неравенства.
          </p>
        </Card>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={copyReport}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            {copied ? <Check className="w-4 h-4 text-blue-800" /> : <Copy className="w-4 h-4" />}
            {copied ? "Скопировано" : "Скопировать ответы"}
          </button>
          <button
            onClick={downloadReport}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-800 text-white hover:bg-blue-900"
          >
            <Download className="w-4 h-4" /> Скачать ответы
          </button>
        </div>
        <button
          onClick={resetLesson}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-slate-500 hover:text-slate-700 text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Пройти занятие заново
        </button>
        <NavButtons onPrev={goPrev} onNext={() => {}} nextLabel="—" disableNext />
      </div>
    );
  }

  const RENDERERS = {
    intro: renderIntro,
    plan: renderPlan,
    why: renderWhy,
    whatIsLabor: renderWhatIsLabor,
    independence: renderIndependence,
    subject: renderSubject,
    notCommodity: renderNotCommodity,
    power: renderPower,
    platform: renderPlatform,
    mission: renderMission,
    functions: renderFunctions,
    history: renderHistory,
    uncertainty: renderUncertainty,
    aiCritique: renderAiCritique,
    profession: renderProfession,
    reflection: renderReflection,
    conclusion: renderConclusion,
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header / progress bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <GraduationCap className="w-5 h-5 text-blue-800 flex-shrink-0" />
            <span className="text-sm font-medium text-slate-700 truncate">
              Миссия трудового права
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setTeacherMode(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Методические комментарии
            </button>
            <button
              onClick={resetLesson}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Сбросить
            </button>
          </div>
        </div>
        <div className="h-1.5 bg-slate-100">
          <div
            className="h-full bg-blue-800 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => setTeacherMode(true)}
        className="sm:hidden fixed bottom-4 right-4 z-30 inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-slate-800 text-white shadow-lg"
      >
        Метод. комментарии
      </button>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {RENDERERS[section]()}
      </main>

      <footer className="text-center text-xs text-slate-400 pb-8">
        Курс «Трудовое право Республики Казахстан» · Хасенов М.Х., PhD · Maqsut Narikbayev University
      </footer>

      {teacherMode && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white">
              <p className="font-serif font-bold text-slate-900">Методические комментарии</p>
              <button onClick={() => setTeacherMode(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-2">Тайминг занятия (60 минут)</p>
                <div className="space-y-1.5">
                  {TEACHER_TIMING.map((t, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="font-mono text-blue-800 flex-shrink-0 w-20">{t.time}</span>
                      <span className="text-slate-600">{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Callout tone="slate">
                <p className="text-sm">
                  Блоки с индивидуальным ответом (текстовое поле) — хорошее место для короткого
                  голосования в аудитории перед тем, как студенты пишут ответ. Блок «Платформенный
                  курьер» и слайдер «Баланс интересов» лучше всего работают как повод для дискуссии
                  — остановитесь и спросите, кто и почему изменил позицию.
                </p>
              </Callout>
              <Callout tone="slate">
                <p className="text-sm font-semibold text-slate-800 mb-1">Типичные ошибки студентов</p>
                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                  <li>Смешение предмета и объекта трудового правоотношения.</li>
                  <li>Оценка кейса курьера только по названию договора, без анализа фактических признаков.</li>
                  <li>Понимание баланса интересов как формального равенства сторон.</li>
                </ul>
              </Callout>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

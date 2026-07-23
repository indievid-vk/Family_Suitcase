import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Share2,
  Trash2,
  Plus,
  Minus,
  X,
  Check,
  Briefcase,
  MapPin,
  Calendar,
  Sparkles,
  Download,
  Copy,
  UserPlus,
  AlertTriangle,
  Info,
  CheckSquare,
  Square,
  User,
  Baby,
  PawPrint,
  FileText,
  Shirt,
  Footprints,
  Smile,
  Smartphone,
  Snowflake,
  HeartPulse,
  Gamepad2,
  Utensils,
  Compass,
  Tent,
  Sun,
  Layers,
  Heart,
  Mail,
  Upload,
  Flame,
  RefreshCw,
  Chrome,
  Monitor,
  MoreVertical,
  Minimize2,
  Maximize2,
  ChevronDown,
  ChevronUp,
  CloudRain,
  Trees,
  Dumbbell,
  Pencil
} from 'lucide-react';
import { Item, Lists, Member, TripConditions, Gender, AgeGroup } from './types';

const APP_VERSION = "0.0.1";

const DEFAULT_ITEMS = {
  adult_male: {
    "📋 Документы": [
      { name: "Паспорт", count: 1, packed: false },
      { name: "Билеты / Подтверждения броней", count: 1, packed: false },
      { name: "СНИЛС", count: 1, packed: false }
    ],
    "🍎 Еда": [
      { name: "Вода питьевая (бутылка)", count: 2, packed: false },
      { name: "Перекус в дорогу (сэндвичи / батончики)", count: 2, packed: false },
      { name: "Орехи / Сухофрукты / Снеки", count: 1, packed: false },
      { name: "Жевательная резинка / Леденцы", count: 1, packed: false }
    ],
    "👕 Одежда": [
      { name: "Футболки мужские", count: 1, packed: false },
      { name: "Нижнее белье мужское", count: 1, packed: false },
      { name: "Носки, пар", count: 1, packed: false },
      { name: "Шорты / Брюки легкие", count: 1, packed: false },
      { name: "Мужские джинсы", count: 1, packed: false },
      { name: "Теплая кофта / Худи", count: 1, packed: false }
    ],
    "👟 Обувь": [
      { name: "Удобные кроссовки мужские", count: 1, packed: false },
      { name: "Домашние тапочки / Сланцы", count: 1, packed: false }
    ],
    "🧼 Гигиена": [
      { name: "Зубная щетка и паста", count: 1, packed: false },
      { name: "Мужской гель для душа & Шампунь", count: 1, packed: false },
      { name: "Влажные салфетки", count: 1, packed: false },
      { name: "Мужской дезодорант", count: 1, packed: false },
      { name: "Станок для бритья & Пена", count: 1, packed: false }
    ],
    "📱 Гаджеты": [
      { name: "Смартфон и зарядка", count: 1, packed: false },
      { name: "Внешний аккумулятор (PowerBank)", count: 1, packed: false }
    ],
    "💊 Лекарства": [
      { name: "Обезболивающее", count: 1, packed: false },
      { name: "Пластырь, пачка", count: 1, packed: false },
      { name: "Средство от укачивания", count: 1, packed: false }
    ]
  },
  adult_female: {
    "📋 Документы": [
      { name: "Паспорт", count: 1, packed: false },
      { name: "Билеты / Подтверждения броней", count: 1, packed: false },
      { name: "СНИЛС", count: 1, packed: false }
    ],
    "🍎 Еда": [
      { name: "Вода питьевая (бутылка)", count: 2, packed: false },
      { name: "Перекус в дорогу (батончики / фрукты)", count: 2, packed: false },
      { name: "Орехи / Сухофрукты / Снеки", count: 1, packed: false },
      { name: "Чай в пакетиках / Растворимый кофе", count: 1, packed: false }
    ],
    "👕 Одежда": [
      { name: "Платья / Сарафаны", count: 1, packed: false },
      { name: "Футболки женские", count: 1, packed: false },
      { name: "Нижнее белье женское", count: 1, packed: false },
      { name: "Носки, пар", count: 1, packed: false },
      { name: "Легинсы / Брюки легкие", count: 1, packed: false },
      { name: "Теплая кофта / Кардиган", count: 1, packed: false }
    ],
    "👟 Обувь": [
      { name: "Удобные кроссовки женские", count: 1, packed: false },
      { name: "Домашние тапочки / Босоножки", count: 1, packed: false }
    ],
    "🧼 Гигиена": [
      { name: "Зубная щетка и паста", count: 1, packed: false },
      { name: "Шампунь & Бальзам для волос", count: 1, packed: false },
      { name: "Влажные салфетки", count: 1, packed: false },
      { name: "Женский дезодорант", count: 1, packed: false },
      { name: "Косметичка & Средства женской гигиены", count: 1, packed: false },
      { name: "Мицеллярная вода", count: 1, packed: false }
    ],
    "📱 Гаджеты": [
      { name: "Смартфон и зарядка", count: 1, packed: false },
      { name: "Внешний аккумулятор (PowerBank)", count: 1, packed: false }
    ],
    "💊 Лекарства": [
      { name: "Обезболивающее", count: 1, packed: false },
      { name: "Пластырь, пачка", count: 1, packed: false },
      { name: "Средство от укачивания", count: 1, packed: false },
      { name: "Индивидуальная аптечка", count: 1, packed: false }
    ]
  },
  child_boy: {
    "📋 Документы": [
      { name: "Свидетельство о рождении / Паспорт", count: 1, packed: false },
      { name: "Полис ОМС", count: 1, packed: false },
      { name: "СНИЛС", count: 1, packed: false }
    ],
    "🍎 Еда": [
      { name: "Детская вода / Сок с соломинкой", count: 2, packed: false },
      { name: "Детские перекусы (пюре в паучах, печенье)", count: 3, packed: false },
      { name: "Фрукты (яблоки, бананы)", count: 2, packed: false },
      { name: "Леденцы от укачивания", count: 1, packed: false }
    ],
    "👕 Одежда": [
      { name: "Детские футболки для мальчика", count: 2, packed: false },
      { name: "Шорты детские", count: 2, packed: false },
      { name: "Сменное детское белье", count: 2, packed: false },
      { name: "Носки детские, пар", count: 2, packed: false },
      { name: "Кофточка детская с капюшоном", count: 1, packed: false },
      { name: "Детская кепка", count: 1, packed: false }
    ],
    "👟 Обувь": [
      { name: "Детские кроссовки", count: 1, packed: false },
      { name: "Детские сандалии", count: 1, packed: false }
    ],
    "🧼 Гигиена": [
      { name: "Детская зубная щетка и паста", count: 1, packed: false },
      { name: "Детские влажные салфетки", count: 2, packed: false },
      { name: "Детский крем", count: 1, packed: false },
      { name: "Детский шампунь без слез", count: 1, packed: false },
      { name: "Подгузники (при необходимости)", count: 10, packed: false }
    ],
    "🧸 Игры и досуг": [
      { name: "Игрушечная машинка", count: 2, packed: false },
      { name: "Детская раскраска с карандашами", count: 1, packed: false },
      { name: "Любимая игрушка для сна", count: 1, packed: false }
    ],
    "💊 Лекарства": [
      { name: "Детский жаропонижающий сироп", count: 1, packed: false },
      { name: "Капли в нос детские", count: 1, packed: false },
      { name: "Пластырь детский, пачка", count: 1, packed: false }
    ],
    "📱 Гаджеты": [
      { name: "Детский планшет / Игрушка", count: 1, packed: false }
    ]
  },
  child_girl: {
    "📋 Документы": [
      { name: "Свидетельство о рождении / Паспорт", count: 1, packed: false },
      { name: "Полис ОМС", count: 1, packed: false },
      { name: "СНИЛС", count: 1, packed: false }
    ],
    "🍎 Еда": [
      { name: "Детская вода / Сок с соломинкой", count: 2, packed: false },
      { name: "Детские перекусы (пюре в паучах, печенье)", count: 3, packed: false },
      { name: "Фрукты (яблоки, бананы)", count: 2, packed: false },
      { name: "Леденцы от укачивания", count: 1, packed: false }
    ],
    "👕 Одежда": [
      { name: "Детские платья / Юбочки", count: 2, packed: false },
      { name: "Детские футболки для девочки", count: 2, packed: false },
      { name: "Легинсы детские", count: 2, packed: false },
      { name: "Сменное детское белье", count: 2, packed: false },
      { name: "Носки детские, пар", count: 2, packed: false },
      { name: "Кофточка детская с капюшоном", count: 1, packed: false },
      { name: "Панама детская", count: 1, packed: false },
      { name: "Заколки и резиночки для волос", count: 1, packed: false }
    ],
    "👟 Обувь": [
      { name: "Детские кроссовки", count: 1, packed: false },
      { name: "Детские сандалии", count: 1, packed: false }
    ],
    "🧼 Гигиена": [
      { name: "Детская зубная щетка и паста", count: 1, packed: false },
      { name: "Детские влажные салфетки", count: 2, packed: false },
      { name: "Детский крем", count: 1, packed: false },
      { name: "Детский шампунь без слез", count: 1, packed: false },
      { name: "Подгузники (при необходимости)", count: 10, packed: false }
    ],
    "🧸 Игры и досуг": [
      { name: "Любимая кукла / Мягкая игрушка", count: 1, packed: false },
      { name: "Набор для рисования", count: 1, packed: false },
      { name: "Любимая игрушка для сна", count: 1, packed: false }
    ],
    "💊 Лекарства": [
      { name: "Детский жаропонижающий сироп", count: 1, packed: false },
      { name: "Капли в нос детские", count: 1, packed: false },
      { name: "Пластырь детский, пачка", count: 1, packed: false }
    ],
    "📱 Гаджеты": [
      { name: "Детский планшет / Игрушка", count: 1, packed: false }
    ]
  },
  pet: {
    "📋 Документы": [
      { name: "Ветеринарный паспорт", count: 1, packed: false },
      { name: "Справка о прививках (если требуется)", count: 1, packed: false }
    ],
    "🥩 Питание": [
      { name: "Корм сухой / влажный", count: 1, packed: false },
      { name: "Миски для корма и воды", count: 2, packed: false },
      { name: "Лакомства в дорогу", count: 1, packed: false },
      { name: "Дорожная поилка", count: 1, packed: false }
    ],
    "🍎 Еда": [
      { name: "Лакомства и снеки для питомца в дорогу", count: 2, packed: false },
      { name: "Запас прохладной воды в дорогу", count: 1, packed: false }
    ],
    "🐕 Амуниция и Сон": [
      { name: "Поводок / Рулетка & Ошейник с адресником", count: 1, packed: false },
      { name: "Переноска / Автокресло для животных", count: 1, packed: false },
      { name: "Любимая лежанка / Плед", count: 1, packed: false },
      { name: "Намордник (если требуется)", count: 1, packed: false }
    ],
    "🧼 Гигиена и Уход": [
      { name: "Одноразовые пеленки", count: 5, packed: false },
      { name: "Пакеты для уборки за собакой / лоток с наполнителем", count: 1, packed: false },
      { name: "Влажные салфетки для лап", count: 1, packed: false },
      { name: "Расческа / Пуходерка", count: 1, packed: false }
    ],
    "🧸 Игры и досуг": [
      { name: "Любимая игрушка для питомца", count: 2, packed: false }
    ],
    "💊 Лекарства": [
      { name: "Капли от клещей и блох", count: 1, packed: false },
      { name: "Успокоительное для животных в дорогу", count: 1, packed: false },
      { name: "Средство для обработки ран (антисептик)", count: 1, packed: false }
    ]
  }
};

const cleanCategoryName = (name: string): string => {
  return name.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '').trim();
};

const getCategoryIcon = (name: string) => {
  const clean = cleanCategoryName(name);
  if (clean.includes("Документы")) return FileText;
  if (clean.includes("Еда") || clean.includes("Питание") || clean.includes("Корм")) return Utensils;
  if (clean.includes("Одежда")) return Shirt;
  if (clean.includes("Обувь")) return Footprints;
  if (clean.includes("Гигиена")) return Smile;
  if (clean.includes("Гаджеты")) return Smartphone;
  if (clean.includes("Лекарства")) return HeartPulse;
  if (clean.includes("Игры") || clean.includes("досуг")) return Gamepad2;
  if (clean.includes("Амуниция")) return Compass;
  if (clean.includes("Пляж")) return Sun;
  if (clean.includes("Снаряжение") || clean.includes("Поход")) return Tent;
  if (clean.includes("Теплые") || clean.includes("Холод")) return Snowflake;
  if (clean.includes("Летние") || clean.includes("Жара") || clean.includes("Жарко")) return Flame;
  if (clean.includes("Дождь") || clean.includes("Непогода")) return CloudRain;
  if (clean.includes("Лагерь") || clean.includes("Кемпинг")) return Trees;
  if (clean.includes("Спорт")) return Dumbbell;
  return Layers;
};

const getCategoryStyles = (name: string) => {
  const clean = cleanCategoryName(name);
  if (clean.includes("Документы")) return { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", accent: "orange" };
  if (clean.includes("Еда") || clean.includes("Питание") || clean.includes("Корм")) return { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", accent: "amber" };
  if (clean.includes("Одежда")) return { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-100", accent: "pink" };
  if (clean.includes("Обувь")) return { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", accent: "rose" };
  if (clean.includes("Гигиена")) return { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-100", accent: "teal" };
  if (clean.includes("Гаджеты")) return { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100", accent: "purple" };
  if (clean.includes("Лекарства")) return { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100", accent: "rose" };
  if (clean.includes("Игры") || clean.includes("досуг")) return { bg: "bg-fuchsia-50", text: "text-fuchsia-600", border: "border-fuchsia-100", accent: "fuchsia" };
  if (clean.includes("Амуниция")) return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", accent: "emerald" };
  if (clean.includes("Пляж")) return { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-100", accent: "yellow" };
  if (clean.includes("Снаряжение") || clean.includes("Поход")) return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", accent: "emerald" };
  if (clean.includes("Теплые") || clean.includes("Холод")) return { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-100", accent: "sky" };
  if (clean.includes("Летние") || clean.includes("Жара") || clean.includes("Жарко")) return { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100", accent: "orange" };
  if (clean.includes("Дождь") || clean.includes("Непогода")) return { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", accent: "blue" };
  if (clean.includes("Лагерь") || clean.includes("Кемпинг")) return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", accent: "emerald" };
  if (clean.includes("Спорт")) return { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100", accent: "indigo" };
  return { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-100", accent: "slate" };
};

const CATEGORY_ORDER = [
  "📋 Документы",
  "🍎 Еда",
  "💊 Лекарства",
  "🥩 Питание",
  "👕 Одежда",
  "👟 Обувь",
  "🧼 Гигиена",
  "🧼 Гигиена и Уход",
  "🐕 Амуниция и Сон",
  "📱 Гаджеты",
  "🏖️ Пляж и Отдых",
  "☀️ Летние вещи (Жара)",
  "⛺ Снаряжение & Поход",
  "❄️ Теплые вещи (Холод)",
  "🌧️ Дождь / Непогода",
  "🌲 Кемпинг / Лагерь",
  "💪 Спорт / Активный отдых",
  "🧸 Игры и досуг"
];

function sortCategories([a]: [string, any], [b]: [string, any]): number {
  const cleanStr = (s: string) => s.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, "").trim().toLowerCase();
  
  const cleanA = cleanStr(a);
  const cleanB = cleanStr(b);

  if (cleanA === cleanB) return 0;

  // Документы всегда первые
  if (cleanA.includes("документ")) return -1;
  if (cleanB.includes("документ")) return 1;

  // Лекарства всегда вторые
  if (cleanA.includes("лекарств")) return -1;
  if (cleanB.includes("лекарств")) return 1;

  const indexA = CATEGORY_ORDER.findIndex(cat => cleanStr(cat) === cleanA);
  const indexB = CATEGORY_ORDER.findIndex(cat => cleanStr(cat) === cleanB);

  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  return cleanA.localeCompare(cleanB);
}

function getOrderedCategories(member?: Member | null): string[] {
  if (!member || !member.lists) return [];
  const categories = Object.keys(member.lists);
  if (!member.categoryOrder || member.categoryOrder.length === 0) {
    return categories.sort((ka, kb) => sortCategories([ka, null], [kb, null]));
  }
  
  const orderMap = new Map(member.categoryOrder.map((cat, idx) => [cat, idx]));
  return categories.sort((a, b) => {
    const idxA = orderMap.has(a) ? orderMap.get(a)! : 999;
    const idxB = orderMap.has(b) ? orderMap.get(b)! : 999;
    if (idxA !== idxB) return idxA - idxB;
    return sortCategories([a, null], [b, null]);
  });
}

function migrateLists(lists: Lists): Lists {
  if (!lists) return {};
  const migrated: Lists = {};
  Object.entries(lists).forEach(([catName, items]) => {
    if (catName === "📱 Гаджеты и Документы" || catName === "📱 Гаджеты и документы") {
      const docItems = items.filter(it => 
        it.name.toLowerCase().includes("паспорт") || 
        it.name.toLowerCase().includes("билет") || 
        it.name.toLowerCase().includes("брони") ||
        it.name.toLowerCase().includes("документ") ||
        it.name.toLowerCase().includes("полис") ||
        it.name.toLowerCase().includes("свидетельство")
      );
      const gadgetItems = items.filter(it => 
        !it.name.toLowerCase().includes("паспорт") && 
        !it.name.toLowerCase().includes("билет") && 
        !it.name.toLowerCase().includes("брони") &&
        !it.name.toLowerCase().includes("документ") &&
        !it.name.toLowerCase().includes("полис") &&
        !it.name.toLowerCase().includes("свидетельство")
      );
      if (docItems.length > 0) {
        migrated["📋 Документы"] = [...(migrated["📋 Документы"] || []), ...docItems];
      }
      if (gadgetItems.length > 0) {
        migrated["📱 Гаджеты"] = [...(migrated["📱 Гаджеты"] || []), ...gadgetItems];
      }
    } else {
      migrated[catName] = items;
    }
  });
  return migrated;
}

function normalizeMember(m: any): Member {
  const gender = m.gender || 'male';
  const ageGroup = m.ageGroup || 'adult';
  
  // Set default color based on gender/ageGroup if legacy or empty
  let color = m.color || '';
  let textColor = m.textColor || '';
  let border = m.border || '';

  // Check if it is a legacy short string or empty, or if it doesn't contain standard from-/text-/border- prefixes
  if (!color || !color.includes('from-')) {
    if (ageGroup === 'pet') {
      color = "from-emerald-400 to-teal-400";
      textColor = "text-teal-600";
      border = "border-teal-200";
    } else if (gender === 'female' && ageGroup === 'adult') {
      color = "from-pink-400 to-rose-400";
      textColor = "text-rose-500";
      border = "border-rose-200";
    } else if (gender === 'male' && ageGroup === 'child') {
      color = "from-amber-300 to-orange-400";
      textColor = "text-orange-600";
      border = "border-orange-200";
    } else if (gender === 'female' && ageGroup === 'child') {
      color = "from-fuchsia-300 to-purple-400";
      textColor = "text-purple-600";
      border = "border-purple-200";
    } else {
      // male adult
      color = "from-sky-400 to-blue-400";
      textColor = "text-sky-600";
      border = "border-sky-200";
    }
  }

  // Double check if textColor or border is missing/legacy
  if (!textColor || !textColor.includes('text-')) {
    if (ageGroup === 'pet') textColor = "text-teal-600";
    else if (gender === 'female' && ageGroup === 'adult') textColor = "text-rose-500";
    else if (gender === 'male' && ageGroup === 'child') textColor = "text-orange-600";
    else if (gender === 'female' && ageGroup === 'child') textColor = "text-purple-600";
    else textColor = "text-sky-600";
  }

  if (!border || !border.includes('border-')) {
    if (ageGroup === 'pet') border = "border-teal-200";
    else if (gender === 'female' && ageGroup === 'adult') border = "border-rose-200";
    else if (gender === 'male' && ageGroup === 'child') border = "border-orange-200";
    else if (gender === 'female' && ageGroup === 'child') border = "border-purple-200";
    else border = "border-sky-200";
  }

  return {
    id: m.id || String(Math.random()),
    name: m.name || 'Путешественник',
    gender,
    ageGroup,
    color,
    textColor,
    border,
    lists: migrateLists(m.lists || {})
  };
}

function getMemberGradient(m: Member): string {
  const color = m.color || '';
  if (color.includes('from-')) return color;
  
  // fallback mapping of short names
  if (m.ageGroup === 'pet') return 'from-emerald-400 to-teal-400';
  if (m.gender === 'female') {
    if (m.ageGroup === 'child') return 'from-fuchsia-300 to-purple-400';
    return 'from-pink-400 to-rose-400';
  }
  if (m.ageGroup === 'child') return 'from-amber-300 to-orange-400';
  return 'from-sky-400 to-blue-400';
}

export default function App() {
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('family_pack_members');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: any) => normalizeMember(m));
        }
      } catch (e) {
        // ignore and fallback
      }
    }
    return [
      { id: '1', name: 'Папа', gender: 'male', ageGroup: 'adult', color: 'from-sky-400 to-blue-400', textColor: 'text-sky-600', border: 'border-sky-200', lists: {} },
      { id: '2', name: 'Мама', gender: 'female', ageGroup: 'adult', color: 'from-pink-400 to-rose-400', textColor: 'text-rose-500', border: 'border-rose-200', lists: {} }
    ];
  });

  const [activeMemberId, setActiveMemberId] = useState<string>(() => members[0]?.id || '1');
  const activeMember = members.find(m => m.id === activeMemberId) || members[0];

  // Настройки текущей поездки
  const [tripDestination, setTripDestination] = useState<string>(() => {
    return localStorage.getItem('family_pack_destination') || 'Сочи';
  });
  const [tripDays, setTripDays] = useState<number>(() => {
    const saved = localStorage.getItem('family_pack_days');
    return saved ? parseInt(saved, 10) : 7;
  });
  const [tripConditions, setTripConditions] = useState<TripConditions>(() => {
    const saved = localStorage.getItem('family_pack_conditions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      withKids: true,
      isHike: false,
      isBeach: true,
      isCold: false,
      isHot: false,
      isRain: false,
      isCamp: false,
      isSport: false
    };
  });

  // Состояния PWA (Advanced PWA Logic)
  const [isInstallPromptAvailable, setIsInstallPromptAvailable] = useState<boolean>(false);
  const [isPwaInstalled, setIsPwaInstalled] = useState<boolean>(() => {
    return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
  });
  const [isPwaUpdateAvailable, setIsPwaUpdateAvailable] = useState<boolean>(() => (window as any).pwaUpdateAvailable || false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState<boolean>(false);
  const [pwaModalPlatform, setPwaModalPlatform] = useState<'android' | 'ios' | 'desktop'>('android');
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (isStandalone && !localStorage.getItem('hasSeenWelcome')) {
      setIsWelcomeModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isWelcomeModalOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isWelcomeModalOpen]);

  const closeWelcome = () => {
    setIsWelcomeModalOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  // Check for PWA updates periodically
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch('./version.json?cache-bust=' + Date.now());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.version !== APP_VERSION) {
          setIsPwaUpdateAvailable(true);
        }
      } catch (e) {
        console.warn('Could not check version, skipping...', e);
      }
    };
    
    checkVersion();

    const interval = setInterval(() => {
      if ((window as any).pwaUpdateAvailable && !isPwaUpdateAvailable) {
        setIsPwaUpdateAvailable(true);
      }
      checkVersion();
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isPwaUpdateAvailable]);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPwaModalPlatform('ios');
    } else if (/android/.test(ua)) {
      setPwaModalPlatform('android');
    } else {
      setPwaModalPlatform('desktop');
    }
  }, []);

  useEffect(() => {
    const triggerSystemPrompt = () => {
      const promptEvent = (window as any).deferredPrompt;
      if (promptEvent && !isPwaInstalled && pwaModalPlatform !== 'ios') {
        try {
          console.log('[PWA] Synchronously triggering system install prompt...');
          promptEvent.prompt();
          promptEvent.userChoice.then((choiceResult: any) => {
            console.log(`[PWA] Auto-prompt response: ${choiceResult.outcome}`);
            (window as any).deferredPrompt = null;
            setIsInstallPromptAvailable(false);
          }).catch((err: any) => {
            console.warn('[PWA] Error handling userChoice outcome:', err);
          });
          return true;
        } catch (err) {
          console.warn('[PWA] Auto-prompt invocation failed:', err);
          return false;
        }
      }
      return false;
    };

    // Обобщенный слушатель любого первого жеста пользователя
    const handleGestureWithPrompt = (e?: Event) => {
      console.log(`[PWA] Зафиксирован жест пользователя (${e ? e.type : 'unknown'}), вызываем нативную установку...`);
      const isPrompted = triggerSystemPrompt();
      if (isPrompted) {
        console.log('[PWA] Системный prompt успешно инициирован. Удаляем слушатели жестов.');
        removeGestureListeners();
      }
    };

    const addGestureListeners = () => {
      document.addEventListener('click', handleGestureWithPrompt, { passive: true });
      document.addEventListener('touchend', handleGestureWithPrompt, { passive: true });
    };

    const removeGestureListeners = () => {
      document.removeEventListener('click', handleGestureWithPrompt);
      document.removeEventListener('touchend', handleGestureWithPrompt);
    };

    const handleInstallReady = () => {
      setIsInstallPromptAvailable(true);
      // При получении события готовности, гарантируем активацию слушателей жестов
      addGestureListeners();
    };

    const handleUpdateAvailable = () => {
      setIsPwaUpdateAvailable(true);
      (window as any).pwaPopupActive = true;
    };

    window.addEventListener('pwa-install-ready', handleInstallReady);
    window.addEventListener('pwa-update-available', handleUpdateAvailable);

    // Добавляем слушатели сразу на старте, чтобы поймать первый же тап/клик, если prompt уже доступен
    addGestureListeners();

    if ((window as any).deferredPrompt) {
      setIsInstallPromptAvailable(true);
    }
    if ((window as any).pwaUpdateAvailable) {
      setIsPwaUpdateAvailable(true);
    }

    return () => {
      window.removeEventListener('pwa-install-ready', handleInstallReady);
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
      removeGestureListeners();
    };
  }, [isPwaInstalled, pwaModalPlatform]);

  const handleTriggerInstall = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (!promptEvent) {
      setIsPwaModalOpen(true);
      return;
    }
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    console.log(`[PWA] Результат установки: ${outcome}`);
    (window as any).deferredPrompt = null;
    setIsInstallPromptAvailable(false);
  };

  const handleTriggerUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    }
    window.location.reload();
  };

  // Безопасные кастомные модалки
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [headerMounted, setHeaderMounted] = useState<boolean>(false);
  const [isTravelerDropdownOpen, setIsTravelerDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    setHeaderMounted(true);
  }, []);

  const [collapsedModals, setCollapsedModals] = useState<Record<string, boolean>>({
    about: false,
    export: false,
    pwa: false,
    tripParams: false,
    travelers: false,
    suitcase: false,
  });

  const toggleModalCollapse = (modalKey: string) => {
    setCollapsedModals(prev => ({
      ...prev,
      [modalKey]: !prev[modalKey]
    }));
  };

  // Контроллеры перетаскивания для каждого окна
  const dragControlsSuitcase = useDragControls();
  const dragControlsExport = useDragControls();
  const dragControlsAbout = useDragControls();
  const dragControlsPwa = useDragControls();
  const [importText, setImportText] = useState<string>('');
  const [notification, setNotification] = useState<string>('');
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleteAllConfirmOpen, setIsDeleteAllConfirmOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const headerRef = useRef<HTMLElement>(null);
  const travelersRef = useRef<HTMLElement>(null);
  const suitcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rAFId: number;

    const handleScroll = () => {
      if (!headerRef.current) return;

      const header = headerRef.current;
      const headerRect = header.getBoundingClientRect();
      const headerHeight = headerRect.height;
      const stickyTopOffset = 16;
      const headerBottom = stickyTopOffset + headerHeight;

      let overlap = 0;

      // Check collision with Travelers block (if rendered)
      if (travelersRef.current) {
        const travelersRect = travelersRef.current.getBoundingClientRect();
        const travelersTop = travelersRect.top;
        if (travelersTop < headerBottom) {
          overlap = Math.max(overlap, headerBottom - travelersTop);
        }
      }

      // Check collision with Selected Traveler's Suitcase block (if rendered)
      if (suitcaseRef.current) {
        const suitcaseRect = suitcaseRef.current.getBoundingClientRect();
        const suitcaseTop = suitcaseRect.top;
        if (suitcaseTop < headerBottom) {
          overlap = Math.max(overlap, headerBottom - suitcaseTop);
        }
      }

      if (overlap > 0) {
        const maxShift = headerHeight + stickyTopOffset + 32;
        const newY = -Math.min(overlap, maxShift);
        header.style.transform = `translateY(${newY}px)`;
      } else {
        header.style.transform = 'translateY(0px)';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Immediate checks and fallback intervals to handle mounts and lazy content loads
    handleScroll();
    const timer = setTimeout(handleScroll, 50);
    const timer2 = setTimeout(handleScroll, 150);
    const timer3 = setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rAFId);
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [members, activeMemberId]);

  const handleExportToFile = () => {
    try {
      const data = {
        version: "1.0",
        members,
        tripDestination,
        tripDays,
        tripConditions
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Semya_chemodan.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerNotification('💾 Файл Semya_chemodan.json успешно сохранен!');
    } catch (err) {
      triggerNotification('⚠️ Не удалось экспортировать файл.');
    }
  };

  const handleImportFromFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const importData = JSON.parse(text);
        let importedMembers = null;
        if (Array.isArray(importData)) {
          importedMembers = importData;
        } else if (importData && typeof importData === 'object' && importData.members && Array.isArray(importData.members)) {
          importedMembers = importData.members;
          if (importData.tripDestination) setTripDestination(importData.tripDestination);
          if (importData.tripDays) setTripDays(importData.tripDays);
          if (importData.tripConditions) setTripConditions(importData.tripConditions);
        }

        if (importedMembers && importedMembers.length > 0) {
          const validated = importedMembers.map((m: any) => normalizeMember(m));
          setMembers(validated);
          setActiveMemberId(validated[0].id);
          triggerNotification('📥 Данные из файла успешно восстановлены!');
        } else {
          triggerNotification('⚠️ Неверный формат файла сборов.');
        }
      } catch (err) {
        triggerNotification('⚠️ Ошибка при чтении файла.');
      }
    };
    reader.readAsText(file);
    // Reset input value so same file can be loaded again
    e.target.value = '';
  };

  // Управление добавлением элементов
  const [newCustomCategory, setNewCustomCategory] = useState<string>('');
  const [newCustomItems, setNewCustomItems] = useState<{ [category: string]: string }>({});
  const [newMemberName, setNewMemberName] = useState<string>('');
  const [newMemberGender, setNewMemberGender] = useState<Gender>('male');
  const [newMemberAgeGroup, setNewMemberAgeGroup] = useState<AgeGroup>('adult');
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');

  // Сброс вкладки при смене путешественника
  useEffect(() => {
    setActiveCategoryTab('all');
  }, [activeMemberId]);

  // Если выбранная вкладка-категория была удалена, сбрасываем на "Все вместе"
  useEffect(() => {
    if (activeCategoryTab !== 'all' && activeMember && (!activeMember.lists || !activeMember.lists[activeCategoryTab])) {
      setActiveCategoryTab('all');
    }
  }, [activeMember, activeCategoryTab]);

  // Автосохранение в LocalStorage при любых изменениях
  useEffect(() => {
    localStorage.setItem('family_pack_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('family_pack_destination', tripDestination);
  }, [tripDestination]);

  useEffect(() => {
    localStorage.setItem('family_pack_days', String(tripDays));
  }, [tripDays]);

  useEffect(() => {
    localStorage.setItem('family_pack_conditions', JSON.stringify(tripConditions));
  }, [tripConditions]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleCopyToClipboard = (text: string) => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      triggerNotification('📋 Конфигурация скопирована!');
    } catch (err) {
      triggerNotification('⚠️ Не удалось скопировать.');
    }
  };

  const generateLocalList = (conditions: TripConditions, days: number, gender: Gender, ageGroup: AgeGroup): Lists => {
    const combined: Lists = {};
    let baseTemplate: any;
    if (ageGroup === 'pet') {
      baseTemplate = DEFAULT_ITEMS.pet;
    } else {
      const key = ageGroup === 'adult' ? `adult_${gender}` : `child_${gender === 'male' ? 'boy' : 'girl'}`;
      baseTemplate = DEFAULT_ITEMS[key as keyof typeof DEFAULT_ITEMS] || DEFAULT_ITEMS.adult_male;
    }

    // Inject base template with scaling
    Object.entries(baseTemplate as Record<string, any[]>).forEach(([catName, items]) => {
      combined[catName] = items.map((item: any) => {
        let factor = 1;
        if (catName === "👕 Одежда" && (item.name.includes("Футболк") || item.name.includes("белье") || item.name.includes("Носки") || item.name.includes("Плать") || item.name.includes("Легинсы") || item.name.includes("Шорты"))) {
          factor = Math.max(1, Math.min(days, 12));
        } else if (catName === "🧼 Гигиена" && item.name.includes("Подгузники")) {
          factor = Math.max(5, days * 4);
        } else if (catName === "🧼 Гигиена" && item.name.includes("салфетки")) {
          factor = Math.max(1, Math.ceil(days / 5));
        } else if (catName === "💊 Лекарства" && item.name.includes("Пластыри")) {
          factor = Math.max(5, days * 1.5);
        } else if (catName === "🥩 Питание" && item.name.includes("Корм")) {
          factor = Math.max(1, days);
        } else if (catName === "🍎 Еда" && (item.name.includes("Вода") || item.name.includes("Перекус") || item.name.includes("перекус") || item.name.includes("Сок"))) {
          factor = Math.max(1, Math.min(Math.ceil(days / 2), 6));
        } else if (catName === "🧼 Гигиена и Уход" && item.name.includes("пеленки")) {
          factor = Math.max(2, days);
        }
        return {
          name: item.name,
          count: Math.ceil(item.count * factor),
          packed: false
        };
      });
    });

    // 2. Beach conditions
    if (conditions.isBeach) {
      if (!combined["🏖️ Пляж и Отдых"]) combined["🏖️ Пляж и Отдых"] = [];
      if (ageGroup === 'adult') {
        if (gender === 'male') {
          combined["🏖️ Пляж и Отдых"].push(
            { name: "Мужские плавки", count: 1, packed: false },
            { name: "Пляжные сланцы", count: 1, packed: false },
            { name: "Солнцезащитные очки", count: 1, packed: false },
            { name: "Солнцезащитный крем SPF 50", count: 1, packed: false }
          );
        } else {
          combined["🏖️ Пляж и Отдых"].push(
            { name: "Купальник", count: 1, packed: false },
            { name: "Пляжная накидка / Парео", count: 1, packed: false },
            { name: "Широкополая шляпа", count: 1, packed: false },
            { name: "Солнцезащитные очки", count: 1, packed: false },
            { name: "Пляжная сумка & Полотенце", count: 1, packed: false },
            { name: "Солнцезащитный крем SPF 50", count: 1, packed: false }
          );
        }
      } else if (ageGroup === 'child') {
        // Child
        combined["🏖️ Пляж и Отдых"].push(
          { name: gender === 'male' ? "Детские плавки" : "Детский купальник", count: 1, packed: false },
          { name: "Надувной круг / Нарукавники", count: 1, packed: false },
          { name: "Детский солнцезащитный крем SPF 50+", count: 1, packed: false },
          { name: "Набор игрушек для песка (ведерко, лопатка)", count: 1, packed: false }
        );
      } else if (ageGroup === 'pet') {
        combined["🏖️ Пляж и Отдых"].push(
          { name: "Пляжная подстилка / Коврик для питомца", count: 1, packed: false },
          { name: "Защитный воск для лап от горячего песка", count: 1, packed: false },
          { name: "Складная силиконовая дорожная миска", count: 1, packed: false }
        );
      }
    }

    // 3. Hike conditions
    if (conditions.isHike) {
      if (!combined["⛺ Снаряжение & Поход"]) combined["⛺ Снаряжение & Поход"] = [];
      if (ageGroup === 'adult') {
        combined["⛺ Снаряжение & Поход"].push(
          { name: "Треккинговые прочные ботинки", count: 1, packed: false },
          { name: "Плотный дождевик", count: 1, packed: false },
          { name: "Налобный фонарик + запасные батарейки", count: 1, packed: false },
          { name: "Спрей от клещей и комаров", count: 1, packed: false }
        );
        if (gender === 'male') {
          combined["⛺ Снаряжение & Поход"].push({ name: "Мультитул / Карманный нож", count: 1, packed: false });
        } else {
          combined["⛺ Снаряжение & Поход"].push({ name: "Термос для горячего чая", count: 1, packed: false });
        }
      } else if (ageGroup === 'child') {
        // Child
        combined["⛺ Снаряжение & Поход"].push(
          { name: "Детская удобная обувь с цепкой подошвой", count: 1, packed: false },
          { name: "Детский легкий дождевик", count: 1, packed: false },
          { name: "Небольшой детский рюкзачок", count: 1, packed: false },
          { name: "Детский гипоаллергенный спрей от комаров", count: 1, packed: false }
        );
      } else if (ageGroup === 'pet') {
        combined["⛺ Снаряжение & Поход"].push(
          { name: "Защитный светящийся ошейник или маячок", count: 1, packed: false },
          { name: "Усиленный спрей от клещей и блох (ветеринарный)", count: 1, packed: false },
          { name: "Специальный питьевой поильник-бутылка", count: 1, packed: false }
        );
      }
    }

    // 4. Cold conditions
    if (conditions.isCold) {
      if (!combined["❄️ Теплые вещи (Холод)"]) combined["❄️ Теплые вещи (Холод)"] = [];
      if (ageGroup === 'adult') {
        combined["❄️ Теплые вещи (Холод)"].push(
          { name: gender === 'male' ? "Термобелье мужское (комплект)" : "Термобелье женское (комплект)", count: 1, packed: false },
          { name: "Теплый шерстяной свитер", count: 1, packed: false },
          { name: "Теплая непромокаемая куртка / Пуховик", count: 1, packed: false },
          { name: "Теплая шапка и перчатки", count: 1, packed: false },
          { name: "Гигиеническая помада от обветривания", count: 1, packed: false }
        );
        if (gender === 'female') {
          combined["❄️ Теплые вещи (Холод)"].push({ name: "Теплый шарф / Бафф", count: 1, packed: false });
        }
      } else if (ageGroup === 'child') {
        // Child
        combined["❄️ Теплые вещи (Холод)"].push(
          { name: "Детское термобелье (комплект)", count: 1, packed: false },
          { name: "Теплый комбинезон / зимняя куртка", count: 1, packed: false },
          { name: "Детская теплая шапка и шарф", count: 1, packed: false },
          { name: "Непромокаемые варежки", count: 1, packed: false },
          { name: "Защитный детский крем от мороза", count: 1, packed: false }
        );
      } else if (ageGroup === 'pet') {
        combined["❄️ Теплые вещи (Холод)"].push(
          { name: "Теплый комбинезон / попона для питомца", count: 1, packed: false },
          { name: "Защитный воск для лап от реагентов и соли", count: 1, packed: false }
        );
      }
    }

    // 5. Hot conditions
    if (conditions.isHot) {
      if (!combined["☀️ Летние вещи (Жара)"]) combined["☀️ Летние вещи (Жара)"] = [];
      if (ageGroup === 'adult') {
        combined["☀️ Летние вещи (Жара)"].push(
          { name: "Солнцезащитные очки", count: 1, packed: false },
          { name: "Солнцезащитный крем SPF 50", count: 1, packed: false },
          { name: "Легкий головной убор (кепка / панама / соломенная шляпа)", count: 1, packed: false },
          { name: "Свободная дышащая одежда (шорты, майки, лен)", count: days > 3 ? 3 : 1, packed: false },
          { name: "Освежающий спрей / Термальная вода", count: 1, packed: false }
        );
      } else if (ageGroup === 'child') {
        combined["☀️ Летние вещи (Жара)"].push(
          { name: "Детский солнцезащитный крем SPF 50+", count: 1, packed: false },
          { name: "Легкая панама или кепка с козырьком", count: 1, packed: false },
          { name: "Детская одежда из тонкого муслина/хлопка", count: days > 3 ? 4 : 2, packed: false },
          { name: "Детские солнцезащитные очки с UV-защитой", count: 1, packed: false }
        );
      } else if (ageGroup === 'pet') {
        combined["☀️ Летние вещи (Жара)"].push(
          { name: "Охлаждающий ошейник или коврик для питомца", count: 1, packed: false },
          { name: "Дорожная поилка с запасом прохладной свежей воды", count: 1, packed: false },
          { name: "Защитный воск для лап от горячего асфальта", count: 1, packed: false }
        );
      }
    }

    // 6. Rain conditions
    if (conditions.isRain) {
      if (!combined["🌧️ Дождь / Непогода"]) combined["🌧️ Дождь / Непогода"] = [];
      if (ageGroup === 'adult') {
        combined["🌧️ Дождь / Непогода"].push(
          { name: "Зонт складной", count: 1, packed: false },
          { name: "Водонепроницаемый чехол для телефона", count: 1, packed: false },
          { name: "Плотный дождевик / Ветровка", count: 1, packed: false },
          { name: "Сушилка для обуви", count: 1, packed: false }
        );
      } else if (ageGroup === 'child') {
        combined["🌧️ Дождь / Непогода"].push(
          { name: "Детский зонтик", count: 1, packed: false },
          { name: "Детский дождевик яркий", count: 1, packed: false },
          { name: "Резиновые сапоги детские", count: 1, packed: false }
        );
      } else if (ageGroup === 'pet') {
        combined["🌧️ Дождь / Непогода"].push(
          { name: "Дождевик / Ветрозащитный комбинезон", count: 1, packed: false },
          { name: "Специальное полотенце для лап", count: 1, packed: false }
        );
      }
    }

    // 7. Camp conditions
    if (conditions.isCamp) {
      if (!combined["🌲 Кемпинг / Лагерь"]) combined["🌲 Кемпинг / Лагерь"] = [];
      if (ageGroup === 'adult') {
        combined["🌲 Кемпинг / Лагерь"].push(
          { name: "Спальный мешок & Коврик (пенка)", count: 1, packed: false },
          { name: "Посуда металлическая (кружка, миска, ложка)", count: 1, packed: false },
          { name: "Репеллент от комаров и клещей", count: 1, packed: false },
          { name: "Сидушка туристическая (хоба)", count: 1, packed: false }
        );
      } else if (ageGroup === 'child') {
        combined["🌲 Кемпинг / Лагерь"].push(
          { name: "Детский спальный мешок", count: 1, packed: false },
          { name: "Фонарик детский ручной", count: 1, packed: false },
          { name: "Индивидуальный бейдж с контактами", count: 1, packed: false }
        );
      } else if (ageGroup === 'pet') {
        combined["🌲 Кемпинг / Лагерь"].push(
          { name: "Светящийся ошейник / маячок для леса", count: 1, packed: false },
          { name: "Складная миска", count: 2, packed: false },
          { name: "Длинный поводок-привязь (5-10м)", count: 1, packed: false }
        );
      }
    }

    // 8. Sport conditions
    if (conditions.isSport) {
      if (!combined["💪 Спорт / Активный отдых"]) combined["💪 Спорт / Активный отдых"] = [];
      if (ageGroup === 'adult') {
        combined["💪 Спорт / Активный отдых"].push(
          { name: "Спортивная форма (футболка, тайтсы/шорты)", count: days > 3 ? 2 : 1, packed: false },
          { name: "Спортивная бутылка для воды", count: 1, packed: false },
          { name: "Фитнес-браслет / Смарт-часы с зарядкой", count: 1, packed: false },
          { name: "Эластичный бинт / Спортивный тейп", count: 1, packed: false }
        );
      } else if (ageGroup === 'child') {
        combined["💪 Спорт / Активный отдых"].push(
          { name: "Детская спортивная форма", count: 1, packed: false },
          { name: "Спортивная бутылочка детская", count: 1, packed: false },
          { name: "Удобная детская спортивная обувь", count: 1, packed: false }
        );
      } else if (ageGroup === 'pet') {
        combined["💪 Спорт / Активный отдых"].push(
          { name: "Спортивная шлейка для бега", count: 1, packed: false },
          { name: "Амортизирующий поводок", count: 1, packed: false },
          { name: "Игрушка-пуллер / Фрисби", count: 1, packed: false }
        );
      }
    }

    return combined;
  };

  const handleGenerateWithAI = () => {
    setIsGenerating(true);
    triggerNotification('✨ Подбираем вещи по параметрам...');

    setTimeout(() => {
      const updatedMembers = members.map(m => {
        const customList = generateLocalList(tripConditions, tripDays, m.gender, m.ageGroup);
        
        // Слияние списков для сохранения ручных изменений и добавления новых вещей
        const existingLists = m.lists || {};
        const mergedLists: Lists = { ...existingLists };

        for (const category of Object.keys(customList)) {
          const generatedItems = customList[category] || [];
          if (!mergedLists[category]) {
            // Если такой категории еще не было в чемодане, добавляем её
            mergedLists[category] = [...generatedItems];
          } else {
            // Если категория уже была создана и отредактирована пользователем,
            // оставляем её 100% без изменений: удаленные элементы не возвращаем,
            // добавленные пользователем сохраняем, статусы упаковано и количества не сбрасываем.
          }
        }

        return { ...m, lists: mergedLists };
      });
      setMembers(updatedMembers);
      setIsGenerating(false);
      triggerNotification('✨ Списки успешно обновлены с сохранением ваших изменений!');
    }, 850);
  };

  const handleToggleItem = (category: string, itemIdx: number) => {
    setMembers(prev => prev.map(m => {
      if (m.id !== activeMemberId) return m;
      const catList = [...(m.lists[category] || [])];
      if (catList[itemIdx]) {
        catList[itemIdx] = { ...catList[itemIdx], packed: !catList[itemIdx].packed };
      }
      return { ...m, lists: { ...m.lists, [category]: catList } };
    }));
  };

  const handleChangeCount = (category: string, itemIdx: number, delta: number) => {
    setMembers(prev => prev.map(m => {
      if (m.id !== activeMemberId) return m;
      const catList = [...(m.lists[category] || [])];
      if (catList[itemIdx]) {
        const newCount = Math.max(1, catList[itemIdx].count + delta);
        catList[itemIdx] = { ...catList[itemIdx], count: newCount };
      }
      return { ...m, lists: { ...m.lists, [category]: catList } };
    }));
  };

  const handleDeleteItem = (category: string, itemIdx: number) => {
    setMembers(prev => prev.map(m => {
      if (m.id !== activeMemberId) return m;
      const catList = (m.lists[category] || []).filter((_, idx) => idx !== itemIdx);
      const updatedLists = { ...m.lists, [category]: catList };
      if (catList.length === 0) {
        delete updatedLists[category];
      }
      return { ...m, lists: updatedLists };
    }));
  };

  const handleAddItem = (category: string) => {
    const text = newCustomItems[category]?.trim();
    if (!text) return;

    setMembers(prev => prev.map(m => {
      if (m.id !== activeMemberId) return m;
      const catList = [...(m.lists[category] || [])];
      catList.push({ name: text, count: 1, packed: false });
      return { ...m, lists: { ...m.lists, [category]: catList } };
    }));

    setNewCustomItems(prev => ({ ...prev, [category]: '' }));
  };

  const handleAddCategory = () => {
    const catName = newCustomCategory.trim();
    if (!catName) return;

    setMembers(prev => prev.map(m => {
      if (m.id !== activeMemberId) return m;
      if (m.lists[catName]) return m;
      return { ...m, lists: { ...m.lists, [catName]: [] } };
    }));

    setNewCustomCategory('');
    triggerNotification(`➕ Категория "${catName}" добавлена!`);
    setActiveCategoryTab(catName);
  };

  const handleMoveCategory = (categoryName: string, direction: 'up' | 'down') => {
    if (!activeMember) return;
    const currentOrdered = getOrderedCategories(activeMember);
    const index = currentOrdered.indexOf(categoryName);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrdered.length) return;

    const newOrder = [...currentOrdered];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setMembers(prev => prev.map(m => {
      if (m.id === activeMember.id) {
        return { ...m, categoryOrder: newOrder };
      }
      return m;
    }));
  };

  const startEditMember = (m: Member) => {
    setEditingMemberId(m.id);
    setNewMemberName(m.name);
    setNewMemberGender(m.gender);
    setNewMemberAgeGroup(m.ageGroup);
    // Smooth scroll to traveler form so user sees it is editing
    const formElement = document.querySelector('[placeholder="Имя путешественника..."]');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (formElement as HTMLInputElement).focus();
    }
  };

  const handleAddMember = () => {
    const name = newMemberName.trim();
    if (!name) return;

    let color = "from-sky-400 to-blue-400";
    let textColor = "text-sky-600";
    let border = "border-sky-200";

    if (newMemberAgeGroup === 'pet') {
      color = "from-emerald-400 to-teal-400";
      textColor = "text-teal-600";
      border = "border-teal-200";
    } else if (newMemberGender === 'female' && newMemberAgeGroup === 'adult') {
      color = "from-pink-400 to-rose-400";
      textColor = "text-rose-500";
      border = "border-rose-200";
    } else if (newMemberGender === 'male' && newMemberAgeGroup === 'child') {
      color = "from-amber-300 to-orange-400";
      textColor = "text-orange-600";
      border = "border-orange-200";
    } else if (newMemberGender === 'female' && newMemberAgeGroup === 'child') {
      color = "from-fuchsia-300 to-purple-400";
      textColor = "text-purple-600";
      border = "border-purple-200";
    }

    if (editingMemberId) {
      setMembers(prev => prev.map(m => {
        if (m.id === editingMemberId) {
          return {
            ...m,
            name,
            gender: newMemberGender,
            ageGroup: newMemberAgeGroup,
            color,
            textColor,
            border
          };
        }
        return m;
      }));
      setEditingMemberId(null);
      setNewMemberName('');
      triggerNotification(`✏️ Изменения для "${name}" сохранены!`);
    } else {
      const newId = `user_${Date.now()}`;
      const newObj: Member = {
        id: newId,
        name,
        gender: newMemberGender,
        ageGroup: newMemberAgeGroup,
        color,
        textColor,
        border,
        lists: {}
      };
      newObj.lists = generateLocalList(tripConditions, tripDays, newMemberGender, newMemberAgeGroup);

      setMembers(prev => [...prev, newObj]);
      setActiveMemberId(newId);
      setNewMemberName('');
      triggerNotification(`👋 Добавлен новый чемодан для ${name}!`);
    }
  };

  const initiateDeleteMember = (id: string, name: string) => {
    if (members.length <= 1) {
      triggerNotification('⚠️ Нельзя удалить единственного путешественника!');
      return;
    }
    setDeleteConfirmTarget({ id, name });
  };

  const executeDeleteMember = () => {
    if (!deleteConfirmTarget) return;
    const { id, name } = deleteConfirmTarget;
    const filtered = members.filter(m => m.id !== id);
    setMembers(filtered);
    setActiveMemberId(filtered.length > 0 ? filtered[0].id : '');
    if (editingMemberId === id) {
      setEditingMemberId(null);
      setNewMemberName('');
    }
    setDeleteConfirmTarget(null);
    triggerNotification(`🗑️ Чемодан "${name}" удален.`);
  };

  const handleClearAllMembers = () => {
    setIsDeleteAllConfirmOpen(true);
  };

  const executeClearAllMembers = () => {
    setMembers([]);
    setActiveMemberId('');
    setIsDeleteAllConfirmOpen(false);
    triggerNotification('🗑️ Все чемоданы и списки сборов очищены.');
  };

  const handleImportConfig = () => {
    try {
      const parsed = JSON.parse(importText);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name) {
        setMembers(parsed);
        setActiveMemberId(parsed[0].id);
        setIsExportModalOpen(false);
        setImportText('');
        triggerNotification('📥 Данные чемоданов успешно импортированы!');
      } else {
        throw new Error('Некорректная структура JSON.');
      }
    } catch (err) {
      triggerNotification('❌ Некорректный формат конфигурации.');
    }
  };

  const calculateProgress = (memberObj: Member) => {
    if (!memberObj || !memberObj.lists) return 0;
    let total = 0;
    let packed = 0;
    Object.values(memberObj.lists).forEach(items => {
      items.forEach(it => {
        total += it.count;
        if (it.packed) packed += it.count;
      });
    });
    if (total === 0) return 0;
    return Math.round((packed / total) * 100);
  };

  const getSuitcaseTotals = (memberObj: Member) => {
    if (!memberObj || !memberObj.lists) return { total: 0, packed: 0 };
    let total = 0;
    let packed = 0;
    Object.values(memberObj.lists).forEach(items => {
      items.forEach(it => {
        total += it.count;
        if (it.packed) packed += it.count;
      });
    });
    return { total, packed };
  };

  const activeProgress = calculateProgress(activeMember);
  const { total: activeTotal, packed: activePacked } = getSuitcaseTotals(activeMember);

  return (
    <div className="min-h-screen text-slate-800 antialiased selection:bg-orange-500/20 custom-scrollbar pb-12">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImportFromFile} 
        accept=".json" 
        className="hidden" 
      />
      <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 relative">
        
        {/* МОДАЛКА УДАЛЕНИЯ */}
        <AnimatePresence>
          {deleteConfirmTarget && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white/95 rounded-3xl p-6 max-w-sm w-full border border-white flex flex-col gap-4 relative text-slate-800 text-center shadow-2xl"
              >
                <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Удалить участника?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Вы действительно хотите исключить <span className="font-bold text-slate-800">"{deleteConfirmTarget.name}"</span> из поездки? Все списки вещей для этого человека будут утеряны.
                </p>
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={() => setDeleteConfirmTarget(null)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Отмена
                  </button>
                  <button 
                    onClick={executeDeleteMember}
                    className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {isDeleteAllConfirmOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white/95 rounded-3xl p-6 max-w-sm w-full border border-white flex flex-col gap-4 relative text-slate-800 text-center shadow-2xl"
              >
                <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 animate-pulse">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Удалить всех участников?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Вы действительно хотите удалить <span className="font-bold text-rose-600">всех путешественников</span> и очистить все чемоданы? Это действие полностью удалит ваши текущие списки сборов.
                </p>
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={() => setIsDeleteAllConfirmOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Отмена
                  </button>
                  <button 
                    onClick={executeClearAllMembers}
                    className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Удалить всех
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ШАПКА ПРИЛОЖЕНИЯ (ЧЕМОДАН) */}
        <header 
          ref={headerRef}
          className={`sticky top-4 z-40 bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border-4 border-orange-200/50 shadow-2xl shadow-orange-950/5 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 mt-6 transition-opacity duration-500 ${headerMounted ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Handle of the suitcase */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-6 bg-orange-900/20 rounded-t-xl border-t-4 border-x-4 border-orange-900/10"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-800 border border-orange-300/50 shrink-0 shadow-inner">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-extrabold text-3xl tracking-tighter bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Семейный Чемодан</h1>
              <p className="text-sm text-orange-700 font-bold tracking-wide uppercase mt-1">Умный планировщик дорожных сборов</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <motion.button 
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setIsExportModalOpen(true);
                setCollapsedModals(prev => ({ ...prev, export: false }));
              }}
              className="px-4 py-2.5 bg-white/90 hover:bg-orange-50 border border-slate-200 rounded-2xl text-orange-700 text-xs font-bold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Поделиться сборами</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAboutModalOpen(true);
                setCollapsedModals(prev => ({ ...prev, about: false }));
              }}
              className="w-10 h-10 bg-white/90 hover:bg-orange-50 border border-slate-200 rounded-2xl text-orange-700 shadow-sm flex items-center justify-center transition-all cursor-pointer"
              title="О приложении"
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </div>
        </header>

        {/* МОДАЛКА ЭКСПОРТА / ИМПОРТА */}
        <AnimatePresence>
          {isExportModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md">
              <motion.div 
                layoutId="export-modal-container"
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white/95 rounded-3xl border border-white flex flex-col relative text-slate-800 shadow-2xl pointer-events-auto p-6 max-w-xl w-full gap-4"
              >
                {/* ХЕДЕР */}
                <div className="flex items-center justify-between border-b border-slate-100/80 pb-3 relative">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 select-none">
                        <Share2 className="w-4 h-4 text-orange-500" />
                        Поделиться сборами
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Экспорт и импорт списков через файлы</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setIsExportModalOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Закрыть"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 cursor-default" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> 1. Сохранить записи:
                      </span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Сохраните файл со всеми списками вещей и настройками на ваше устройство. Файл можно отправить близким в любой мессенджер.
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleExportToFile}
                        className="mt-auto w-full bg-orange-100 hover:bg-orange-200 text-orange-800 font-extrabold text-[11px] py-2.5 px-3 rounded-xl border border-orange-200/50 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Сохранить записи
                      </motion.button>
                    </div>

                    <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" /> 2. Восстановить записи:
                      </span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Выберите ранее сохраненный файл со списками вещей `.json` для мгновенной загрузки и восстановления данных:
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          fileInputRef.current?.click();
                          setIsExportModalOpen(false);
                        }}
                        className="mt-auto w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-[11px] py-2.5 px-3 rounded-xl border border-emerald-200/50 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Восстановить записи
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* МОДАЛКИ PWA: УСТАНОВКА И ОБНОВЛЕНИЯ */}
        <AnimatePresence>
          {isPwaModalOpen && (
            <motion.div 
              key="pwa-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setIsPwaModalOpen(false)}
            >
              <motion.div 
                layoutId="pwa-modal-container"
                drag
                dragMomentum={false}
                dragElastic={0.05}
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-[32px] p-6 sm:p-8 max-w-sm w-full border border-white flex flex-col gap-4 relative text-slate-800 shadow-2xl text-center animate-fade-in cursor-move"
                onClick={(e) => e.stopPropagation()}
              >
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleModalCollapse('pwa'); }}
                    className="absolute top-4 right-12 text-slate-400 hover:text-orange-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Свернуть"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsPwaModalOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="mx-auto w-16 h-16 rounded-full bg-orange-50/80 border border-orange-100 flex items-center justify-center text-orange-500 shadow-sm shrink-0 mt-2 cursor-move">
                    <Smartphone className="w-8 h-8" />
                  </div>

                  <div className="cursor-move">
                    <h3 className="font-extrabold text-2xl text-slate-800 mt-2 select-none">Установка</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[260px] mx-auto leading-relaxed select-none">
                      Добавьте приложение на рабочий стол для мгновенного доступа.
                    </p>
                  </div>

                  <div className="bg-orange-50/40 border border-orange-100/50 rounded-3xl p-5 flex flex-col gap-3.5 mt-2 max-w-sm w-full text-left cursor-default" onClick={(e) => e.stopPropagation()}>
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                      {pwaModalPlatform === 'ios' ? 'Инструкная для iOS:' : pwaModalPlatform === 'android' ? 'Инструкция для Android:' : 'Как установить вручную:'}
                    </p>
                    
                    {pwaModalPlatform === 'ios' ? (
                      <>
                        <div className="flex items-start gap-3">
                           <span className="w-5 h-5 rounded-full bg-orange-100/70 text-orange-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-medium">
                            Нажмите кнопку <strong className="text-slate-800">«Поделиться»</strong> (<Share2 className="w-3.5 h-3.5 inline text-orange-500 mb-0.5 mx-0.5" /> на нижней панели) в браузере <strong className="text-slate-800">Safari</strong>.
                          </p>
                        </div>

                        <div className="flex items-start gap-3">
                           <span className="w-5 h-5 rounded-full bg-orange-100/70 text-orange-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-medium">
                            Прокрутите список вниз и выберите <strong className="text-slate-800">«На экран "Домой"»</strong>.
                          </p>
                        </div>
                      </>
                    ) : pwaModalPlatform === 'android' ? (
                      <>
                        <div className="flex items-start gap-3">
                           <span className="w-5 h-5 rounded-full bg-orange-100/70 text-orange-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-medium">
                            Нажмите на значок меню <strong className="text-slate-800">«три точки»</strong> (<MoreVertical className="w-3.5 h-3.5 inline text-orange-500 mb-0.5 mx-0.5" /> в правом верхнем углу браузера Chrome).
                          </p>
                        </div>

                        <div className="flex items-start gap-3">
                           <span className="w-5 h-5 rounded-full bg-orange-100/70 text-orange-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-medium">
                            Выберите пункт <strong className="text-slate-800">«Установить приложение»</strong> или <strong className="text-slate-800">«Добавить на главный экран»</strong>.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-3">
                           <span className="w-5 h-5 rounded-full bg-orange-100/70 text-orange-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-medium">
                            Нажмите на иконку установки (<Download className="w-3.5 h-3.5 inline text-orange-500 mb-0.5 mx-0.5" />) в правой части адресной строки браузера.
                          </p>
                        </div>

                        <div className="flex items-start gap-3">
                           <span className="w-5 h-5 rounded-full bg-orange-100/70 text-orange-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-medium">
                            Или откройте меню (<MoreVertical className="w-3.5 h-3.5 inline text-orange-500 mb-0.5 mx-0.5" />) и выберите пункт <strong className="text-slate-800">«Установить приложение»</strong>.
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {isInstallPromptAvailable && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleTriggerInstall();
                        setIsPwaModalOpen(false);
                      }}
                      className="w-full bg-orange-100 hover:bg-orange-200 text-orange-800 font-extrabold text-xs py-3 rounded-2xl uppercase tracking-wider transition-all cursor-pointer border border-orange-200/50 shadow-none flex items-center justify-center gap-1.5 mt-1"
                    >
                      <Download className="w-4 h-4" />
                      Установить в 1 клик
                    </motion.button>
                  )}

                  <button 
                    onClick={() => setIsPwaModalOpen(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer py-1.5 mt-1 transition-all"
                  >
                    Продолжить в браузере
                  </button>
                </motion.div>
              </motion.div>
          )}

          {/* ОКНО ОБНОВЛЕНИЯ (КРИТИЧЕСКИЙ ПРИОРИТЕТ) */}
          {isPwaUpdateAvailable && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white/95 rounded-3xl p-6 max-w-sm w-full border border-orange-100 flex flex-col gap-4 relative text-slate-800 text-center shadow-2xl"
              >
                <div className="mx-auto w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shadow-md">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-extrabold text-base text-slate-900">Приложение обновилось!</h3>
                  <p className="text-[10px] text-orange-600 font-bold tracking-wider uppercase mt-0.5">Стало еще удобнее</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Мы внесли улучшения, чтобы ваши сборы стали быстрее и комфортнее.
                </p>
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={handleTriggerUpdate}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    К сборам
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* МОДАЛКА О ПРИЛОЖЕНИИ */}
        <AnimatePresence>
          {isAboutModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md">
              <motion.div 
                layoutId="about-modal-container"
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white/95 rounded-3xl border border-white flex flex-col relative text-slate-800 shadow-2xl pointer-events-auto p-6 max-w-2xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* ХЕДЕР */}
                <div className="flex items-center justify-between border-b border-slate-100/80 pb-3 relative flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 select-none">
                        <Info className="w-4 h-4 text-orange-500" />
                        О приложении
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Умный планировщик «Семейный Чемодан»</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setIsAboutModalOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Закрыть"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden flex flex-col">
                  {/* Скроллируемая область контента */}
                  <div className="overflow-y-auto custom-scrollbar p-1 pt-4 cursor-default flex flex-col gap-5 text-xs text-slate-600 leading-relaxed max-h-[60vh]" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-1">О приложении</h4>
                      <p>
                        <strong>«Семейный Чемодан»</strong> — это персональный интерактивный планировщик дорожных сборов. 
                        В отличие от обычных заметок, приложение автоматически анализирует состав вашей семьи (включая детей и любимых питомцев), 
                        условия путешествия (пляжный отдых, походы, холодный климат), длительность поездки и предлагает идеально сбалансированный список вещей. 
                        Это избавляет вас от необходимости вспоминать всё в последний момент и гарантирует, что вы не забудете ничего важного!
                      </p>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-1">Технические особенности приложения</h4>
                      <p>
                        Приложение работает как <strong>PWA (Progressive Web App)</strong> — современная технология, которая позволяет 
                        устанавливать приложение на экран телефона или компьютера прямо из браузера, в обход традиционных магазинов приложений. 
                        Оно живет прямо в вашем браузере, почти не занимая лишнего места. Все записи хранятся только внутри памяти браузера. 
                        Это обеспечивает полную приватность без передачи информации в облачные хранилища.
                      </p>
                    </div>

                    <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-4 flex gap-3 text-amber-800">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-xs uppercase tracking-wide mb-0.5">Ограничение</h5>
                        <p className="text-[11px] leading-relaxed">
                          Если вы очистите кэш или данные браузера, списки тоже сотрутся.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-1">Возможности</h4>
                      <p className="mb-3">
                        Вы можете сохранять свои списки в файл и легко передавать их другим пользователям или импортировать на другие ваши устройства.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleExportToFile}
                          className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-extrabold text-[11px] py-2.5 px-3 rounded-xl border border-orange-200/50 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Сохранить записи
                        </motion.button>

                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            fileInputRef.current?.click();
                            setIsAboutModalOpen(false);
                          }}
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-[11px] py-2.5 px-3 rounded-xl border border-emerald-200/50 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Восстановить записи
                        </motion.button>
                      </div>
                    </div>

                    {/* БЛОК ОБРАТНОЙ СВЯЗИ В СТИЛЕ ИЗОБРАЖЕНИЯ ПОЛЬЗОВАТЕЛЯ */}
                    <div className="mt-2 bg-[#F9F6F0] rounded-3xl p-6 border border-[#ECE6D9] flex flex-col items-center gap-4 text-center">
                      <h4 className="font-sans text-lg font-bold text-[#7D1D1D] tracking-wide uppercase">
                        Обратная связь
                      </h4>
                      
                      <motion.a 
                        href="mailto:indievid_studiio@mail.ru"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full max-w-sm py-3 px-5 bg-[#EFECE6]/80 hover:bg-[#E7E2D8] border border-[#DCD6C8] rounded-2xl font-semibold text-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm text-xs"
                      >
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>Написать разработчику</span>
                      </motion.a>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                        <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                        <span>Создано нейрокомандой Индивид СтуИИя</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ОСНОВНОЙ КОНТЕНТ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
          
          {/* ЛЕВАЯ ПАНЕЛЬ: КОНФИГУРАТОР И ЧЛЕНЫ СЕМЬИ */}
          <aside className="lg:col-span-4 lg:sticky lg:top-4 h-fit lg:max-h-[92vh] lg:overflow-y-auto pr-1 flex flex-col gap-6 custom-scrollbar">
            
            {/* Параметры поездки */}
            <motion.section 
              className={`bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/60 shadow-lg shadow-orange-950/5 relative select-none flex flex-col ${collapsedModals.tripParams ? 'pb-3.5 gap-0' : 'gap-4'}`}
            >
              <div className="border-b border-slate-100/50 pb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">

                  <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100/60 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h2 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">
                    Параметры поездки
                  </h2>
                </div>
                <button 
                  onClick={() => toggleModalCollapse('tripParams')}
                  className="p-1 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-600 transition-all cursor-pointer shrink-0"
                  title={collapsedModals.tripParams ? "Развернуть блок" : "Свернуть блок"}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className={`w-3.5 h-3.5 fill-current transition-transform duration-300 ${collapsedModals.tripParams ? '-rotate-90' : ''}`}
                  >
                    <path d="M12 16l-6-6h12z"/>
                  </svg>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {!collapsedModals.tripParams && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-3 pt-1">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Куда отправляемся?</span>
                        <input 
                          type="text" 
                          value={tripDestination}
                          onChange={(e) => setTripDestination(e.target.value)}
                          placeholder="Сочи, Алтай, Пхукет..."
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" /> Количество дней:
                        </span>
                        <div className="flex items-center gap-2">
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setTripDays(d => Math.max(1, d - 1))}
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:border-orange-300 cursor-pointer"
                          >-</motion.button>
                          <span className="text-xs font-bold text-slate-800 px-2">{tripDays} дней</span>
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setTripDays(d => d + 1)}
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:border-orange-300 cursor-pointer"
                          >+</motion.button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-2 border-t border-slate-100/50 pt-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Особенности путешествия:</span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'withKids', label: 'С детьми', icon: Baby },
                            { id: 'isBeach', label: 'Море/Пляж', icon: Sun },
                            { id: 'isHike', label: 'Поход/Горы', icon: Tent },
                            { id: 'isCold', label: 'Холодно', icon: Snowflake },
                            { id: 'isHot', label: 'Жарко', icon: Flame },
                            { id: 'isRain', label: 'Дождь', icon: CloudRain },
                            { id: 'isCamp', label: 'Лагерь', icon: Trees },
                            { id: 'isSport', label: 'Спорт', icon: Dumbbell }
                          ].map(cond => {
                            const isActive = tripConditions[cond.id as keyof TripConditions];
                            const Icon = cond.icon;
                            return (
                              <motion.button
                                key={cond.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setTripConditions(prev => ({ ...prev, [cond.id]: !prev[cond.id as keyof TripConditions] }))}
                                className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                                  isActive 
                                    ? 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                                <span>{cond.label}</span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Список путешественников с круговым прогресс-баром */}
            <motion.section 
              ref={travelersRef}
              className={`bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/60 shadow-lg shadow-orange-950/5 relative select-none flex flex-col ${collapsedModals.travelers ? 'pb-3.5 gap-0' : 'gap-4'}`}
            >
              <div className="border-b border-slate-100/50 pb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">

                  <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100/60 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h2 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">
                    Путешественники
                  </h2>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100/50 px-2.5 py-0.5 rounded-full">{members.length} чел.</span>
                  {members.length > 0 && !collapsedModals.travelers && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleClearAllMembers}
                      className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all cursor-pointer border border-rose-100 shrink-0"
                      title="Удалить всех путешественников"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </motion.button>
                  )}
                  <button 
                    onClick={() => toggleModalCollapse('travelers')}
                    className="p-1 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-600 transition-all cursor-pointer shrink-0"
                    title={collapsedModals.travelers ? "Развернуть блок" : "Свернуть блок"}
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className={`w-3.5 h-3.5 fill-current transition-transform duration-300 ${collapsedModals.travelers ? '-rotate-90' : ''}`}
                    >
                      <path d="M12 16l-6-6h12z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {!collapsedModals.travelers && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-3 pt-1">
                      <AnimatePresence mode="popLayout">
                        {members.map(m => {
                          const prog = calculateProgress(m);
                          const isSelected = m.id === activeMemberId;

                          return (
                            <motion.div
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              key={m.id}
                              onClick={() => setActiveMemberId(m.id)}
                              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${isSelected ? `${m.border} bg-white shadow-md ring-2 ring-orange-500/10` : 'border-slate-200/40 bg-white/40 hover:bg-white/70'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr bg-linear-to-tr ${getMemberGradient(m)} flex items-center justify-center shadow-inner text-white shrink-0`}>
                                  {m.ageGroup === 'pet' ? <PawPrint className="w-5 h-5" /> : m.ageGroup === 'child' ? <Baby className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                </div>
                                <div>
                                  <h3 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 flex-wrap">
                                    {m.name}
                                    {m.ageGroup !== 'pet' && (
                                      <span className={`text-[8px] px-1 py-0.5 rounded-md font-bold uppercase ${m.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                                        {m.gender === 'male' ? 'М' : 'Ж'}
                                      </span>
                                    )}
                                    <span className={`text-[8px] px-1 py-0.5 rounded-md font-bold uppercase ${m.ageGroup === 'pet' ? 'bg-emerald-50 text-emerald-600' : m.ageGroup === 'adult' ? 'bg-orange-50 text-orange-600 border border-orange-100/40' : 'bg-amber-50 text-amber-600 border border-amber-100/40'}`}>
                                      {m.ageGroup === 'pet' ? 'Пит' : m.ageGroup === 'adult' ? 'Взр' : 'Дет'}
                                    </span>
                                  </h3>
                                  <p className="text-[9px] text-slate-400 font-semibold uppercase">Собрано: {prog}%</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5">
                                {/* Кольцевой индикатор сборов */}
                                <div className="relative w-8 h-8 flex items-center justify-center">
                                  <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="16" cy="16" r="12" stroke="rgba(0,0,0,0.03)" strokeWidth="2.5" fill="none"/>
                                    <circle cx="16" cy="16" r="12" 
                                            stroke={prog === 100 ? '#10B981' : '#6366F1'} 
                                            strokeWidth="2.5" 
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 12}`}
                                            strokeDashoffset={`${2 * Math.PI * 12 * (1 - prog / 100)}`}
                                            className="transition-all duration-300"
                                    />
                                  </svg>
                                  <span className="absolute text-[8px] font-extrabold text-slate-600">{prog}%</span>
                                </div>

                                {/* Редактирование профиля */}
                                <motion.button 
                                  whileHover={{ scale: 1.1, color: '#f59e0b' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => { e.stopPropagation(); startEditMember(m); }}
                                  className="text-slate-300 hover:text-amber-500 px-1 py-1 transition-colors cursor-pointer"
                                  title="Редактировать путешественника"
                                >
                                  <Pencil className="w-4 h-4" />
                                </motion.button>

                                {/* Удаление профиля */}
                                <motion.button 
                                  whileHover={{ scale: 1.1, color: '#f43f5e' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => { e.stopPropagation(); initiateDeleteMember(m.id, m.name); }}
                                  className="text-slate-300 hover:text-rose-500 px-1 py-1 transition-colors cursor-pointer"
                                  title="Удалить путешественника"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    <div className="border-t border-slate-100/50 pt-3 flex flex-col gap-2.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <UserPlus className="w-3.5 h-3.5" /> {editingMemberId ? 'Редактировать путешественника:' : 'Новый путешественник:'}
                      </span>
                      
                      <div className="flex flex-col gap-2.5">
                        {/* Выбор Типа */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Кто едет:</span>
                          <div className="flex bg-slate-100 rounded-xl p-0.5 border border-slate-200/50">
                            <button
                              type="button"
                              onClick={() => {
                                if (newMemberAgeGroup === 'pet') {
                                  setNewMemberAgeGroup('adult');
                                }
                              }}
                              className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${newMemberAgeGroup !== 'pet' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              <User className="w-3.5 h-3.5" />
                              <span>Человек</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setNewMemberAgeGroup('pet')}
                              className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${newMemberAgeGroup === 'pet' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              <PawPrint className="w-3.5 h-3.5" />
                              <span>Питомец</span>
                            </button>
                          </div>
                        </div>

                        {/* Выбор Пола и Возраста для Человека */}
                        {newMemberAgeGroup !== 'pet' && (
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {/* Пол */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Пол:</span>
                              <div className="flex bg-slate-100 rounded-xl p-0.5 border border-slate-200/50">
                                <button
                                  type="button"
                                  onClick={() => setNewMemberGender('male')}
                                  className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${newMemberGender === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                  М
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setNewMemberGender('female')}
                                  className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${newMemberGender === 'female' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                  Ж
                                </button>
                              </div>
                            </div>

                            {/* Категория */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Категория:</span>
                              <div className="flex bg-slate-100 rounded-xl p-0.5 border border-slate-200/50">
                                <button
                                  type="button"
                                  onClick={() => setNewMemberAgeGroup('adult')}
                                  className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${newMemberAgeGroup === 'adult' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                  Взрослый
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setNewMemberAgeGroup('child')}
                                  className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${newMemberAgeGroup === 'child' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                  Ребенок
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          placeholder="Имя путешественника..."
                          className="flex-1 min-w-0 bg-white border border-orange-300 rounded-xl px-2.5 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                        />
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleAddMember}
                          className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-extrabold text-xs px-3 rounded-xl uppercase tracking-wider border border-orange-200/50 transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0"
                        >
                          {editingMemberId ? 'Сохранить' : 'Добавить'}
                        </motion.button>
                        {editingMemberId && (
                          <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setEditingMemberId(null);
                              setNewMemberName('');
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs px-3 rounded-xl uppercase tracking-wider border border-slate-200 transition-all cursor-pointer flex items-center justify-center shrink-0"
                          >
                            Отмена
                          </motion.button>
                        )}
                      </div>

                      {/* КНОПКА ГЕНЕРАЦИИ СПИСКОВ */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerateWithAI}
                        disabled={isGenerating}
                        className="mt-4 w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-extrabold text-xs py-3 px-4 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-100/50 disabled:opacity-50"
                      >
                        {isGenerating ? (
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        ) : <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />}
                        {isGenerating ? 'Анализ условий...' : 'Сгенерировать списки'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

          </aside>

          {/* ПРАВАЯ ПАНЕЛЬ: ТЕКУЩИЙ ЧЕМОДАН ЧЛЕНА СЕМЬИ */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            {!activeMember ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-slate-200/50 shadow-lg shadow-orange-950/5 text-center flex flex-col items-center justify-center gap-6 min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100/50 shadow-sm animate-pulse">
                  <UserPlus className="w-8 h-8" />
                </div>
                <div className="max-w-md flex flex-col gap-2">
                  <h3 className="font-extrabold text-lg text-slate-800">Список путешественников пуст</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Добавьте членов семьи, детей или питомцев в левой панели, укажите особенности поездки и получите персональные чемоданы со всеми необходимыми вещами!
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                ref={suitcaseRef}
                drag="y"
                dragControls={dragControlsSuitcase}
                dragListener={false}
                dragMomentum={false}
                dragElastic={0.05}
                className="flex flex-col gap-6"
              >
                {/* ЕДИНЫЙ ЛИПКИЙ КОНТЕНТ ХЕДЕРА: Имя путешественника, прогресс и переключатель вкладок всегда на виду */}
                <div className={`sticky top-2 sm:top-4 z-30 flex flex-col bg-white/95 backdrop-blur-xl rounded-3xl border ${activeMember?.border || 'border-slate-200'} shadow-xl shadow-orange-950/10 transition-all duration-300 ${collapsedModals.suitcase ? 'p-4' : 'p-4 sm:p-5 gap-4'}`}>
              
              {/* Верхняя строка: Имя, аватар, прогресс-бар */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div 
                      onClick={() => setIsTravelerDropdownOpen(!isTravelerDropdownOpen)}
                      className="flex items-center gap-3 hover:bg-slate-50 active:bg-slate-100 p-2 -m-2 rounded-2xl transition-all cursor-pointer select-none group"
                      title="Сменить путешественника"
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr bg-linear-to-tr ${activeMember ? getMemberGradient(activeMember) : 'from-orange-400 to-amber-500'} flex items-center justify-center shadow-md text-white shrink-0 group-hover:scale-105 transition-transform`}>
                        {activeMember?.ageGroup === 'pet' ? <PawPrint className="w-6 h-6" /> : activeMember?.ageGroup === 'child' ? <Baby className="w-6 h-6" /> : <User className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h2 className="font-extrabold text-base text-slate-800 flex items-center gap-1">
                            Чемодан: {activeMember?.name}
                            <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${isTravelerDropdownOpen ? 'rotate-180' : ''}`} />
                          </h2>
                          {activeMember?.ageGroup !== 'pet' && (
                            <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase ${activeMember?.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                              {activeMember?.gender === 'male' ? 'М' : 'Ж'}
                            </span>
                          )}
                          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase ${activeMember?.ageGroup === 'pet' ? 'bg-emerald-50 text-emerald-600' : activeMember?.ageGroup === 'adult' ? 'bg-orange-50 text-orange-600 border border-orange-100/40' : 'bg-orange-50 text-orange-600'}`}>
                            {activeMember?.ageGroup === 'pet' ? 'Питомец 🐾' : activeMember?.ageGroup === 'adult' ? 'Взр' : 'Дет'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">
                          Собрано: <span className={`${activeMember?.textColor || 'text-orange-600'} font-extrabold`}>{activePacked} из {activeTotal}</span> вещей ({activeProgress}%)
                        </p>
                      </div>
                    </div>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {isTravelerDropdownOpen && (
                        <>
                          {/* Backdrop to close on click outside */}
                          <div 
                            className="fixed inset-0 z-40 cursor-default" 
                            onClick={() => setIsTravelerDropdownOpen(false)} 
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute left-0 top-full mt-3 w-64 bg-white rounded-2xl border border-slate-100 shadow-2xl p-2 z-50 flex flex-col gap-1 max-h-80 overflow-y-auto custom-scrollbar"
                          >
                            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Сменить чемодан
                            </div>
                            {members.map((m) => {
                              const isActive = m.id === activeMemberId;
                              return (
                                <button
                                  key={m.id}
                                  onClick={() => {
                                    setActiveMemberId(m.id);
                                    setIsTravelerDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${isActive ? 'bg-orange-50/60' : 'hover:bg-slate-50'}`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr bg-linear-to-tr ${getMemberGradient(m)} flex items-center justify-center text-white shrink-0 text-xs shadow-sm`}>
                                      {m.ageGroup === 'pet' ? <PawPrint className="w-4 h-4" /> : m.ageGroup === 'child' ? <Baby className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div>
                                      <div className="text-xs font-bold text-slate-700 leading-tight">
                                        {m.name}
                                      </div>
                                      <div className="text-[10px] text-slate-400 font-medium">
                                        {m.ageGroup === 'pet' ? '🐾 Питомец' : m.ageGroup === 'adult' ? '🧑 Взрослый' : '👶 Ребенок'}
                                      </div>
                                    </div>
                                  </div>
                                  {isActive && (
                                    <Check className="w-4 h-4 text-orange-500 stroke-[3]" />
                                  )}
                                </button>
                              );
                            })}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex-1 md:max-w-xs flex items-center gap-3 justify-end">
                  <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${activeProgress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r bg-linear-to-r ${activeMember ? getMemberGradient(activeMember) : 'from-orange-400 to-amber-500'}`}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Пусто</span>
                      <span>Упакован! 🎉</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleModalCollapse('suitcase')}
                    className="p-1 rounded-lg hover:bg-orange-50 text-slate-400 hover:text-orange-600 transition-all cursor-pointer shrink-0"
                    title={collapsedModals.suitcase ? "Развернуть чемодан" : "Свернуть чемодан"}
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className={`w-3.5 h-3.5 fill-current transition-transform duration-300 ${collapsedModals.suitcase ? '-rotate-90' : ''}`}
                    >
                      <path d="M12 16l-6-6h12z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Категории багажа (Внутри липкого хедера) */}
              {activeMember?.lists && Object.keys(activeMember.lists).length > 0 && (
                <div className="border-t border-slate-100/80 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-orange-500" />
                      Разделы багажа
                    </h3>
                    
                    {/* Быстрое добавление категории прямо в липкий хедер */}
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="text" 
                        value={newCustomCategory}
                        onChange={(e) => setNewCustomCategory(e.target.value)}
                        placeholder="Добавить категорию..."
                        className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-[11px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-orange-500 w-36 font-semibold"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddCategory}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-extrabold text-[11px] py-1 px-2.5 rounded-xl border border-orange-200/50 uppercase tracking-wider transition-all cursor-pointer shrink-0"
                      >
                        + Раздел
                      </motion.button>
                    </div>
                  </div>

                  {/* Горизонтальные вкладки */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 -mx-1 px-1 custom-scrollbar shrink-0">
                    {/* Вкладка: Все вместе */}
                    <button
                      onClick={() => setActiveCategoryTab('all')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all border cursor-pointer ${
                        activeCategoryTab === 'all'
                          ? 'bg-orange-100 text-orange-800 border-orange-200 shadow-sm font-extrabold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Все разделы</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${activeCategoryTab === 'all' ? 'bg-orange-200 text-orange-900 font-black' : 'bg-slate-100 text-slate-500 font-bold'}`}>
                        {activePacked}/{activeTotal}
                      </span>
                    </button>

                    {/* Индивидуальные вкладки */}
                    {getOrderedCategories(activeMember).map(cat => {
                      const items = activeMember.lists[cat] || [];
                      const packedCount = items.filter(it => it.packed).length;
                      const totalCount = items.length;
                      const isCompleted = totalCount > 0 && packedCount === totalCount;
                      const isSelected = activeCategoryTab === cat;
                      const IconComponent = getCategoryIcon(cat);
                      const styles = getCategoryStyles(cat);

                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveCategoryTab(cat)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-orange-100 text-orange-800 border-orange-200 shadow-sm font-extrabold'
                              : isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/50'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
                          }`}
                        >
                          <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-700' : styles.text}`} />
                          <span>{cleanCategoryName(cat)}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                            isSelected 
                              ? 'bg-orange-200 text-orange-900 font-black' 
                              : isCompleted
                              ? 'bg-emerald-200 text-emerald-800 font-bold'
                              : 'bg-slate-100 text-slate-500 font-bold'
                          }`}>
                            {packedCount}/{totalCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* СПИСОК ВЕЩЕЙ */}
            <AnimatePresence initial={false}>
              {!collapsedModals.suitcase && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 flex flex-col gap-4 border border-white/60 shadow-lg shadow-orange-950/5">

              {(!activeMember?.lists || Object.keys(activeMember.lists).length === 0) ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-slate-400 gap-3 text-center"
                >
                  <div className="text-4xl animate-bounce">🧹</div>
                  <p className="font-bold text-slate-600 uppercase text-[10px] tracking-wider">Чемодан пуст</p>
                  <p className="text-[11px] leading-relaxed max-w-xs text-slate-400">
                    Настройте параметры в блоке <span className="font-bold text-orange-600">«Параметры поездки»</span> и нажмите сгенерировать, чтобы наполнить чемодан вещами!
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence mode="popLayout">
                    {(() => {
                      const orderedCategories = getOrderedCategories(activeMember);
                      const filteredCategories = orderedCategories.filter(cat => activeCategoryTab === 'all' || activeCategoryTab === cat);
                      
                      return filteredCategories.map((categoryName) => {
                        const items = (activeMember.lists[categoryName] || []) as Item[];
                        const catIndex = orderedCategories.indexOf(categoryName);
                        const totalCatsCount = orderedCategories.length;

                        return (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            key={categoryName}
                            className="bg-white/40 border border-slate-200/30 rounded-2xl p-4 flex flex-col gap-3 transition-all hover:bg-white/70 shadow-sm"
                          >
                            <div className="flex items-center justify-between border-b border-slate-100/60 pb-1.5">
                              <div className="flex items-center gap-2 min-w-0">
                                {(() => {
                                  const IconComponent = getCategoryIcon(categoryName);
                                  const styles = getCategoryStyles(categoryName);
                                  return (
                                    <div className={`w-6 h-6 rounded-lg ${styles.bg} ${styles.text} flex items-center justify-center border ${styles.border} shrink-0`}>
                                      <IconComponent className="w-3.5 h-3.5" />
                                    </div>
                                  );
                                })()}
                                <span className="font-extrabold text-[12px] text-slate-700 uppercase tracking-wide truncate">{cleanCategoryName(categoryName)}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {/* Кнопки перемещения списка выше / ниже */}
                                {activeCategoryTab === 'all' && totalCatsCount > 1 && (
                                  <div className="flex items-center gap-0.5 bg-slate-100/80 rounded-lg p-0.5 border border-slate-200/50">
                                    <button
                                      type="button"
                                      onClick={() => handleMoveCategory(categoryName, 'up')}
                                      disabled={catIndex === 0}
                                      title="Переместить список выше"
                                      className="p-1 hover:bg-white rounded text-slate-500 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all cursor-pointer"
                                    >
                                      <ChevronUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMoveCategory(categoryName, 'down')}
                                      disabled={catIndex === totalCatsCount - 1}
                                      title="Переместить список ниже"
                                      className="p-1 hover:bg-white rounded text-slate-500 hover:text-orange-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all cursor-pointer"
                                    >
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                )}

                                <span className="text-[10px] font-bold bg-orange-50/50 text-orange-600 border border-orange-100/40 px-2.5 py-0.5 rounded-full">
                                  {items.filter(it => it.packed).length} / {items.length} упаковано
                                </span>
                              </div>
                            </div>

                          <div className="flex flex-col gap-2">
                            <AnimatePresence mode="popLayout">
                              {items.map((item, idx) => (
                                <motion.div 
                                  layout
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  transition={{ duration: 0.15 }}
                                  key={item.name}
                                  className={`flex items-center justify-between p-2 rounded-xl transition-all ${item.packed ? 'bg-orange-50/10' : 'bg-white/40'}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <motion.button 
                                      whileTap={{ scale: 0.85 }}
                                      onClick={() => handleToggleItem(categoryName, idx)}
                                      className="text-orange-600 hover:text-orange-700 transition-colors cursor-pointer shrink-0"
                                    >
                                      {item.packed ? (
                                        <CheckSquare className="w-5 h-5 text-emerald-500" />
                                      ) : (
                                        <Square className="w-5 h-5 text-slate-300" />
                                      )}
                                    </motion.button>
                                    <span className={`text-xs font-semibold ${item.packed ? 'line-through text-slate-400 italic' : 'text-slate-700'}`}>
                                      {item.name}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 bg-white/80 border border-slate-200/50 rounded-lg p-0.5 shadow-sm">
                                      <motion.button 
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => handleChangeCount(categoryName, idx, -1)}
                                        className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </motion.button>
                                      <span className="text-[10px] font-bold text-slate-700 px-1 min-w-[12px] text-center">{item.count}</span>
                                      <motion.button 
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => handleChangeCount(categoryName, idx, 1)}
                                        className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </motion.button>
                                    </div>

                                    <motion.button 
                                      whileHover={{ scale: 1.1, color: '#f43f5e' }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDeleteItem(categoryName, idx)}
                                      className="text-slate-300 hover:text-rose-500 text-xs transition-colors cursor-pointer p-0.5"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </motion.button>
                                  </div>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>

                          <div className="flex items-center gap-1.5 mt-1.5 border-t border-slate-100/40 pt-2">
                            <input 
                              type="text"
                              value={newCustomItems[categoryName] || ''}
                              onChange={(e) => setNewCustomItems({ ...newCustomItems, [categoryName]: e.target.value })}
                              placeholder="Добавить вещь..."
                              className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAddItem(categoryName)}
                              className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-extrabold text-[11px] py-1 px-2.5 rounded-xl border border-orange-200/50 uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              Добавить
                            </motion.button>
                          </div>

                        </motion.div>
                      );
                    });
                  })()}
                  </AnimatePresence>
                </div>
              )}
            </section>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

          </main>

        </div>

        {/* КНОПКА УСТАНОВКИ (FAB) */}
        {!isPwaInstalled && (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsPwaModalOpen(true);
              setCollapsedModals(prev => ({ ...prev, pwa: false }));
            }}
            className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-white border border-slate-200/60 shadow-lg shadow-orange-100/40 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Download className="w-5 h-5 text-amber-500" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          </motion.button>
        )}

        {/* ТРЕЙ-НОТИФИКАЦИЯ */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              className={`fixed ${!isPwaInstalled ? 'bottom-22' : 'bottom-6'} right-6 bg-slate-900/90 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 transition-all duration-300`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ПРИВЕТСТВЕННОЕ ОКНО */}
        <AnimatePresence>
          {isWelcomeModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900">Привет!</h2>
                  <p className="text-slate-600">Приложение Семейный чемодан установлено</p>
                </div>
                <button
                  onClick={closeWelcome}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors"
                >
                  Начать
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

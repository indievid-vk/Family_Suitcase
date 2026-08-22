export interface Item {
  name: string;
  count: number;
  packed: boolean;
}

export interface Lists {
  [categoryName: string]: Item[];
}

export type Gender = 'male' | 'female';
export type AgeGroup = 'adult' | 'child' | 'pet';

export interface Member {
  id: string;
  name: string;
  gender: Gender;
  ageGroup: AgeGroup;
  color: string;
  textColor: string;
  border: string;
  lists: Lists;
  categoryOrder?: string[];
}

export interface TripConditions {
  isVacation?: boolean; // Отдых
  isWork?: boolean;     // Работа
  withKids?: boolean;   // С детьми
  withPets?: boolean;   // С питомцами
  isHike?: boolean;     // Поход/Горы
  isBeach?: boolean;    // Море/Пляж
  isCamp?: boolean;     // Лагерь
  isSport?: boolean;    // Спорт
  isCold?: boolean;     // Холод
  isHot?: boolean;      // Жара
  isRain?: boolean;     // Дождь
}

export interface SavedTrip {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  tripDestination: string;
  tripDays: number;
  tripConditions: TripConditions;
  members: Member[];
}

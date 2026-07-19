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
}

export interface TripConditions {
  withKids: boolean;
  isHike: boolean;
  isBeach: boolean;
  isCold: boolean;
  isHot: boolean;
}

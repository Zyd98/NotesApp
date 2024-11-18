import { Category } from '../enums/CategoryEnum';

export const getCategoryLabel = (value: Category): string => {
  switch (value) {
    case Category.WorkAndStudy:
      return 'Work and Study';
    case Category.Life:
      return 'Life';
    case Category.HealthAndWellness:
      return 'Health and Wellness';
    default:
      return '';
  }
};

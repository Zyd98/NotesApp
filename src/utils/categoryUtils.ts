import { Category } from '../enums/CategoryEnum';
import i18n from 'i18next';

export const getCategoryLabel = (value: Category): string => {
  switch (value) {
    case Category.WorkAndStudy:
      return i18n.t('category.Work and Study');
    case Category.Life:
      return i18n.t('category.Life');
    case Category.HealthAndWellness:
      return i18n.t('category.Health and Wellness');
    default:
      return '';
  }
};

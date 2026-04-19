import type React from 'react';

export interface EmptyStateProps {
  /** Обязательный заголовок состояния */
  title: string;
  /** Опциональное описание под заголовком */
  description?: string;
  /** Кастомная иллюстрация; если не передана — рендерится пресетная */
  illustration?: React.ReactNode;
  /** Кнопка действия */
  action?: {
    label: string;
    onPress: () => void;
  };
}

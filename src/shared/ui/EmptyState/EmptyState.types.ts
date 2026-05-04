import type React from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  illustration?: React.ReactNode;
  action?: {
    label: string;
    onPress: () => void;
    isLoading?: boolean;
  };
}

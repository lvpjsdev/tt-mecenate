import { EmptyState } from '@/shared/ui';
import { getUIErrorMessage, type UIError } from '@/shared/ui/uiErrors';

interface FeedErrorProps {
  title?: string;
  error: UIError;
  onRetry: () => void;
  isRetrying?: boolean;
}

export function FeedError({ title, error, onRetry, isRetrying }: FeedErrorProps) {
  return (
    <EmptyState
      title={title || getUIErrorMessage(error)}
      action={{
        label: 'Повторить',
        onPress: onRetry,
        isLoading: isRetrying,
      }}
    />
  );
}

import { EmptyState } from '@/shared/ui';
import { getUIErrorMessage, type UIError } from '@/shared/ui/uiErrors';

interface FeedFooterErrorProps {
  error: UIError;
  onRetry: () => void;
}

export function FeedFooterError({ error, onRetry }: FeedFooterErrorProps) {
  return (
    <EmptyState
      title={getUIErrorMessage(error)}
      action={{
        label: 'Повторить',
        onPress: onRetry,
      }}
    />
  );
}

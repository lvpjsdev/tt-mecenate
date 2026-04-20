import { type UIError } from '@/shared/ui/uiErrors';
import { FeedFooterError } from './FeedFooterError';
import { FeedLoader } from './FeedLoader';

interface FeedListFooterProps {
  isLoading: boolean;
  error: UIError | null;
  onRetry: () => void;
}

export function FeedListFooter({ isLoading, error, onRetry }: FeedListFooterProps) {
  if (isLoading) return <FeedLoader paddingVertical={16} />;
  if (error) return <FeedFooterError error={error} onRetry={onRetry} />;
  return null;
}

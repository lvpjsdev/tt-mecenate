import { useLocalSearchParams } from 'expo-router';
import { useSendComment } from '../../api/useSendComment';
import { SendCommentInput } from '../SendCommentInput/SendCommentInput';

export function SendComment() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  const { mutateAsync } = useSendComment(postId);

  return (
    <SendCommentInput
      onSend={async (text) => {
        await mutateAsync(text);
      }}
    />
  );
}

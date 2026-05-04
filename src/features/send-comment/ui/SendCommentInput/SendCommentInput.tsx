import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics';
import { observer } from 'mobx-react-lite';
import { TextInput, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { postPostsIdCommentsBodyTextMax } from '@/shared/api/generated/comments/comments.zod';
import { SendButton } from '@/shared/ui/SendButton';
import { sendCommentStore } from '../../store/send-comment.store';
import { stylesheet } from './SendCommentInput.styles';
import type { SendCommentInputProps } from './SendCommentInput.types';

export const SendCommentInput = observer(({ onSend }: SendCommentInputProps) => {
  const theme = useTheme();
  const store = sendCommentStore;

  const isDisabled = store.commentText.trim() === '' || store.isLoading;

  const handleSend = async () => {
    if (isDisabled) return;

    await impactAsync(ImpactFeedbackStyle.Light);
    store.setIsLoading(true);
    try {
      await onSend(store.commentText);
      store.reset();
    } catch {
      store.setIsLoading(false);
      // commentText сохраняется — пользователь может повторить отправку
    }
  };

  return (
    <View style={stylesheet.container}>
      <TextInput
        style={[
          stylesheet.input,
          {
            borderColor: theme.colors.border.focus,
            backgroundColor: theme.colors.background.default,
            color: theme.colors.text.primary,
          },
        ]}
        value={store.commentText}
        onChangeText={store.setCommentText}
        placeholder="Ваш комментарий"
        placeholderTextColor={theme.colors.text.placeholder}
        maxLength={postPostsIdCommentsBodyTextMax}
        editable={!store.isLoading}
      />
      <SendButton disabled={isDisabled} onPress={handleSend} />
    </View>
  );
});

SendCommentInput.displayName = 'SendCommentInput';

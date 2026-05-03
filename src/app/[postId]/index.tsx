import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostWithComments } from '@/features/post-with-comments/ui/PostWithComments';
import { SendComment } from '@/features/send-comment/ui/SendComment/SendComment';
import { tokens } from '@/shared/styles/tokens';

export default function PostScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.palette.neutral[0] }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <PostWithComments />
        <SendComment />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PostWithComments } from '@/features/post-with-comments/ui/PostWithComments';
import { SendComment } from '@/features/send-comment/ui/SendComment/SendComment';
import { stylesheet } from './index.styles';

export default function PostScreen() {
  return (
    <SafeAreaView style={stylesheet.safeArea}>
      <KeyboardAvoidingView style={stylesheet.keyboardAvoiding} behavior="padding">
        <PostWithComments />
        <SendComment />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

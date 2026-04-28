import { useLocalSearchParams } from 'expo-router';
import { Text as RNText, View } from 'react-native';

export function PostDetail() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  return (
    <View>
      <RNText>{`This is ${postId} post screen`}</RNText>
    </View>
  );
}

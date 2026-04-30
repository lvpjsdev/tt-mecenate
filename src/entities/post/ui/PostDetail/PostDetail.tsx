import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ActionButton, Avatar, Text } from '@/shared/ui';
import { stylesheet } from './PostDetail.styles';
import type { PostDetailProps } from './PostDetail.types';

export function PostDetail({
  id,
  authorAvatarUri,
  authorName,
  imageUri,
  title,
  body,
  likeCount,
  commentCount,
}: PostDetailProps) {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={stylesheet.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={stylesheet.card}>
        <View style={stylesheet.header}>
          <Avatar uri={authorAvatarUri} size={40} />
          <Text variant="label" color={theme.colors.text.primary}>
            {authorName}
          </Text>
        </View>

        <Image source={{ uri: imageUri }} contentFit="cover" style={stylesheet.postImage} />

        <View style={stylesheet.textBlock}>
          <Text variant="title" color={theme.colors.text.primary}>
            {title}
          </Text>

          <Text variant="body">{body}</Text>
        </View>

        <View style={stylesheet.actionsRow}>
          <ActionButton
            type="like"
            count={likeCount}
            onPress={() => {}}
            // active={donateActive}
          />
          <ActionButton type="comment" count={commentCount} />
        </View>
      </View>
    </ScrollView>
  );
}

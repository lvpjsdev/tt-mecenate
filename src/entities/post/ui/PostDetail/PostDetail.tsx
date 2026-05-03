import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ActionButton, Text } from '@/shared/ui';
import { PostCardHeader } from '../PostCard/PostCardHeader';
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
  isLiked = false,
  onLike,
}: PostDetailProps) {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={stylesheet.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={[stylesheet.card, { backgroundColor: theme.colors.background.default }]}>
        <PostCardHeader avatarUrl={authorAvatarUri} authorName={authorName} />

        <Image source={{ uri: imageUri }} contentFit="cover" style={stylesheet.postImage} />

        <View style={stylesheet.textBlock}>
          <Text variant="title" color={theme.colors.text.primary}>
            {title}
          </Text>

          <Text variant="body">{body}</Text>
        </View>

        <View style={stylesheet.actionsRow}>
          <ActionButton type="like" count={likeCount} onPress={onLike} active={isLiked} />
          <ActionButton type="comment" count={commentCount} />
        </View>
      </View>
    </ScrollView>
  );
}

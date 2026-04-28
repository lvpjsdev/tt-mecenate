import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ActionButton, Avatar, CommentItem, LinkButton, Text, TextShowMore } from '@/shared/ui';
import { stylesheet } from './PostDetail.styles';
import type { PostDetailProps } from './PostDetail.types';

export function PostDetail({
  authorAvatarUri,
  authorName,
  imageUri,
  title,
  body,
  donateCount,
  commentCount,
  donateActive = false,
  comments,
  sortLabel = 'Сначала новые',
  onDonatePress,
  onCommentPress,
  onSortPress,
  onCommentLikePress,
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

          <TextShowMore text={body} numberOfLines={2} />
        </View>

        <View style={stylesheet.actionsRow}>
          <ActionButton
            type="like"
            count={donateCount}
            active={donateActive}
            onPress={onDonatePress}
          />
          <ActionButton type="comment" count={commentCount} onPress={onCommentPress} />
        </View>

        <View style={stylesheet.commentsBlock}>
          <View style={stylesheet.commentsHeader}>
            <Text variant="body" color={theme.colors.text.secondary}>
              {`${commentCount} комментари${getCommentSuffix(commentCount)}`}
            </Text>
            <LinkButton label={sortLabel} onPress={onSortPress} />
          </View>

          {comments.map((comment, index) => (
            <View key={comment.id}>
              <CommentItem
                avatarUri={comment.avatarUri}
                authorName={comment.authorName}
                commentText={comment.commentText}
                likeCount={comment.likeCount}
                liked={comment.liked}
                onLikePress={() => onCommentLikePress?.(comment.id)}
              />
              {index < comments.length - 1 && <View style={stylesheet.commentDivider} />}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function getCommentSuffix(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) return 'ев';
  if (mod10 === 1) return 'й';
  if (mod10 >= 2 && mod10 <= 4) return 'я';
  return 'ев';
}

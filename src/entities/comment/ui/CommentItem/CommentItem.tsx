import { Text, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Avatar } from '@/shared/ui/Avatar';
import { LikeButton } from '@/shared/ui/LikeButton';
import { stylesheet } from './CommentItem.styles';
import type { CommentItemProps } from './CommentItem.types';

export function CommentItem({
  avatarUri,
  authorName,
  commentText,
  // TODO: пока что бэк не поддерживает лайки комментариев, хотя в дизайне они есть
  // likeCount = 0,
  // liked = false,
  // onLikePress,
}: CommentItemProps) {
  const theme = useTheme();

  return (
    <View style={stylesheet.container}>
      <Avatar uri={avatarUri} size={40} />
      <View style={stylesheet.content}>
        <Text style={[stylesheet.authorName, { color: theme.colors.text.primary }]}>
          {authorName}
        </Text>
        <Text style={[stylesheet.commentText, { color: theme.colors.text.primary }]}>
          {commentText}
        </Text>
      </View>
      {/* // TODO: пока что бэк не поддерживает лайки комментариев, хотя в дизайне они есть */}
      {/* <LikeButton count={likeCount} active={liked} onPress={onLikePress} /> */}
    </View>
  );
}

CommentItem.displayName = 'CommentItem';

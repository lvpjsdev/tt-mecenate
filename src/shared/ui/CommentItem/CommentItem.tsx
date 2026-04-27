import { Text, View } from 'react-native';
import { Avatar } from '../Avatar';
import { LikeButton } from '../LikeButton';
import { stylesheet } from './CommentItem.styles';
import type { CommentItemProps } from './CommentItem.types';

export function CommentItem({
  avatarUri,
  authorName,
  commentText,
  likeCount,
  liked,
  onLikePress,
}: CommentItemProps) {
  return (
    <View style={stylesheet.container}>
      <Avatar uri={avatarUri} size={40} />
      <View style={stylesheet.content}>
        <Text style={stylesheet.authorName}>{authorName}</Text>
        <Text style={stylesheet.commentText}>{commentText}</Text>
      </View>
      <LikeButton count={likeCount} active={liked} onPress={onLikePress} />
    </View>
  );
}

CommentItem.displayName = 'CommentItem';

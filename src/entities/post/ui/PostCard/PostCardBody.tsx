import { View } from 'react-native';
import { ActionButton, Text, TextShowMore } from '@/shared/ui';
import { stylesheet } from './PostCard.styles';

interface PostCardBodyProps {
  title?: string;
  preview?: string;
  isLocked: boolean;
  likes: number;
  comments: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
}

export function PostCardBody({
  title,
  preview,
  isLocked,
  likes,
  comments,
  isLiked,
  onLike,
  onComment,
}: PostCardBodyProps) {
  return (
    <>
      <View style={stylesheet.body}>
        {title ? <Text variant="title">{title}</Text> : null}

        {!isLocked && preview ? <TextShowMore text={preview} /> : null}
      </View>

      {!isLocked ? (
        <View style={stylesheet.actions}>
          <ActionButton type="like" count={likes} active={isLiked} onPress={onLike} />
          <ActionButton type="comment" count={comments} onPress={onComment} />
        </View>
      ) : null}
    </>
  );
}

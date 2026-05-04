import { useRouter } from 'expo-router';
import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useLike } from '../../api/useLike';
import type { Post } from '../../model/types';
import { stylesheet } from './PostCard.styles';
import { PostCardBody } from './PostCardBody';
import { PostCardCover } from './PostCardCover';
import { PostCardHeader } from './PostCardHeader';

export interface PostCardProps {
  post: Post;
  onComment?: () => void;
  onDonate?: () => void;
}

export function PostCard({ post, onComment, onDonate }: PostCardProps) {
  const router = useRouter();
  const theme = useTheme();
  const { mutate: toggleLike } = useLike(post.id);

  const handleOnPress = useCallback(() => {
    if (post.isPaid) {
      return;
    }
    router.push({
      pathname: '/[postId]',
      params: { postId: post.id },
    });
  }, [post.id, post.isPaid, router]);

  return (
    <Pressable
      style={[stylesheet.card, { backgroundColor: theme.colors.background.default }]}
      onPress={handleOnPress}
    >
      <PostCardHeader avatarUrl={post.avatarUrl} authorName={post.authorName} />

      {post.coverUrl ? (
        <PostCardCover coverUrl={post.coverUrl} isLocked={post.isPaid} onDonate={onDonate} />
      ) : null}

      <PostCardBody
        title={post.title}
        preview={post.preview}
        isLocked={post.isPaid}
        likes={post.likes}
        comments={post.comments}
        isLiked={post.isLiked}
        onLike={toggleLike}
        onComment={onComment}
      />
    </Pressable>
  );
}

export const PostCardMemo = memo(PostCard);

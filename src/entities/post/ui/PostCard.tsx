import { View } from 'react-native';
import type { Post } from '../model/types';
import { stylesheet } from './PostCard.styles';
import { PostCardBody } from './PostCardBody';
import { PostCardCover } from './PostCardCover';
import { PostCardHeader } from './PostCardHeader';

export interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onDonate?: () => void;
}

export function PostCard({ post, onLike, onComment, onDonate }: PostCardProps) {
  return (
    <View style={stylesheet.card}>
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
        onLike={onLike}
        onComment={onComment}
      />
    </View>
  );
}

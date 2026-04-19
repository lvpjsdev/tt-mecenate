import { Image } from 'expo-image';
import { View } from 'react-native';
import { theme } from '@/shared/styles/theme';
import { ActionButton, Avatar, Text } from '@/shared/ui';
import type { Post } from '../types';
import { stylesheet } from './PostCard.styles';

export interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
}

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  return (
    <View style={stylesheet.card}>
      {/* Header: avatar + author name */}
      <View style={stylesheet.header}>
        <Avatar uri={post.avatarUrl ?? ''} />
        <Text variant="label">{post.authorName}</Text>
      </View>

      {/* Cover image */}
      {post.coverUrl ? (
        <Image source={{ uri: post.coverUrl }} contentFit="cover" style={stylesheet.coverImage} />
      ) : null}

      {/* Title + preview text */}
      <View style={stylesheet.body}>
        {post.title ? <Text variant="title">{post.title}</Text> : null}
        <Text variant="body" color={theme.colors.text.primary}>
          {post.preview}
        </Text>
      </View>

      {/* Actions: like + comment */}
      <View style={stylesheet.actions}>
        <ActionButton type="like" count={post.likes} active={post.isLiked} onPress={onLike} />
        <ActionButton type="comment" count={post.comments} onPress={onComment} />
      </View>
    </View>
  );
}

PostCard.displayName = 'PostCard';

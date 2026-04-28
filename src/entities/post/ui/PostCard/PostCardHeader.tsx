import { View } from 'react-native';
import { tokens } from '@/shared/styles/tokens';
import { Avatar, Text } from '@/shared/ui';
import { stylesheet } from './PostCard.styles';

interface PostCardHeaderProps {
  avatarUrl?: string;
  authorName: string;
}

export function PostCardHeader({ avatarUrl, authorName }: PostCardHeaderProps) {
  return (
    <View style={stylesheet.header}>
      <Avatar uri={avatarUrl ?? ''} />
      <Text variant="title" style={{ fontSize: tokens.fontSize.base }}>
        {authorName}
      </Text>
    </View>
  );
}

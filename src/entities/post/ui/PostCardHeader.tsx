import { View } from 'react-native';
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
      <Text variant="label">{authorName}</Text>
    </View>
  );
}

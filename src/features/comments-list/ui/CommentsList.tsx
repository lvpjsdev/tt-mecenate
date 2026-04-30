import { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useComments } from '@/entities/comment/api/useComments';
import { CommentItem } from '@/entities/comment/ui/CommentItem';
import { EmptyState } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';

export interface CommentsListProps {
  postId: string;
}

export function CommentsList({ postId }: CommentsListProps) {
  const { data, isError, isLoading } = useComments(postId);

  const comments = useMemo(() => data?.pages.flatMap((page) => page.comments) ?? [], [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load comments"
        action={{
          label: 'Reload',
          onPress: () => {},
        }}
      />
    );
  }

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <CommentItem
          avatarUri={item.avatarUrl || ''}
          commentText={item.text || ''}
          authorName={item.authorName || ''}
        />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}

import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useComments } from '@/entities/comment/api/useComments';
import { CommentItem } from '@/entities/comment/ui/CommentItem';
import { EmptyState } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';
import { ListHeaderMemo } from './ListHeader';

export function PostWithComments() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useComments(postId);

  console.log(data);

  const comments = useMemo(() => data?.pages.flatMap((page) => page.comments) ?? [], [data]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <EmptyState
        title="что то не так"
        action={{
          label: 'Reload',
          onPress: () => {},
        }}
      />
    );
  }

  return (
    // TODO: возможно стоит перейти на FlashList
    <FlatList
      data={comments}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      ListHeaderComponent={<ListHeaderMemo postId={postId} />}
      renderItem={({ item }) => (
        <CommentItem
          avatarUri={item.avatarUrl || ''}
          commentText={item.text || ''}
          authorName={item.authorName || ''}
        />
      )}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
    />
  );
}

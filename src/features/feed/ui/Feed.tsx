import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Post } from '@/entities/post/model/types';
import { PostCardMemo } from '@/entities/post/ui';
import { tokens } from '@/shared/styles/tokens';
import { usePosts } from '../model/usePosts';
import { FeedEmpty } from './FeedEmpty';
import { FeedError } from './FeedError';
import { FeedListFooter } from './FeedListFooter';
import { FeedSkeleton } from './FeedSkeleton';

export function FeedScreen() {
  const {
    query: { data, isRefetching, isFetching, isFetchingNextPage, error, refetch },
    retry,
    fetchNext,
  } = usePosts();

  const renderPostCard = useCallback(({ item }: { item: Post }) => {
    return <PostCardMemo post={item} />;
  }, []);

  const posts = data?.pages.flatMap((p) => p.posts ?? []) ?? [];

  if (isFetching && !data) {
    return <FeedSkeleton />;
  }

  if (error && !data) {
    return <FeedError error={error} onRetry={retry} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPostCard}
        onEndReached={fetchNext}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <View style={styles.listGap} />}
        ListEmptyComponent={<FeedEmpty onReset={retry} />}
        ListFooterComponent={
          <FeedListFooter
            isLoading={isFetchingNextPage}
            error={data ? error : null}
            onRetry={retry}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.palette.neutral[50],
  },
  listGap: {
    height: tokens.spacing.xl,
    width: tokens.spacing.xl,
  },
});

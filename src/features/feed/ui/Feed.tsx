import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PostCard } from '@/entities/post/ui';
import { tokens } from '@/shared/styles/tokens';
import { usePosts } from '../model/usePosts';
import { FeedEmpty } from './FeedEmpty';
import { FeedError } from './FeedError';
import { FeedListFooter } from './FeedListFooter';
import { FeedLoader } from './FeedLoader';
import { FeedSkeleton } from './FeedSkeleton';
import { isNearBottom } from './utils';

export function FeedScreen() {
  const {
    query: { data, isRefetching, isFetching, isFetchingNextPage, error },
    retry,
    fetchNext,
    refresh,
  } = usePosts();

  const posts = data?.pages.flatMap((p) => p.posts ?? []) ?? [];

  if (isFetching && !data) {
    return <FeedSkeleton />;
  }

  if (error && !data) {
    return <FeedError error={error} onRetry={retry} />;
  }

  return (
    <View style={styles.container}>
      {isRefetching && data && <FeedLoader paddingVertical={8} />}
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostCard post={item} />}
        onScroll={(e) => {
          if (!isNearBottom(e)) return;
          fetchNext();
        }}
        refreshing={isRefetching}
        onRefresh={refresh}
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
    backgroundColor: tokens.palette.neutral[0],
  },
  listGap: {
    height: tokens.spacing.xl,
    width: tokens.spacing.xl,
  },
});

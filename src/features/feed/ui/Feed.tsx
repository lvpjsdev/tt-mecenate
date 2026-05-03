import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useRef } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { filtersStore } from '@/core/stores/filters.store';
import { networkStore } from '@/core/stores/network.store';
import { Post } from '@/entities/post/model/types';
import { PostCardMemo } from '@/entities/post/ui/PostCard';
import { tokens } from '@/shared/styles/tokens';
import { usePosts } from '../model/usePosts';
import { FeedEmpty } from './FeedEmpty';
import { FeedError } from './FeedError';
import { FeedListFooter } from './FeedListFooter';
import { FeedSkeleton } from './FeedSkeleton';

const ListSeparatorComponent = () => <View style={styles.listGap} />;

function FeedComponent() {
  const tier = filtersStore.activeFilter;
  const {
    query: { data, isRefetching, isFetching, isFetchingNextPage, error, refetch },
    retry,
    fetchNext,
  } = usePosts(tier);

  const isOffline = !networkStore.isOnline;

  // Запоминаем последнюю ошибку, чтобы не мигать скелетоном
  // пока идёт повторный запрос (error на момент рефетча может быть null)
  const lastErrorRef = useRef(error);
  if (error) lastErrorRef.current = error;

  const isRetrying = isFetching && !data;

  const renderPostCard = useCallback(({ item }: { item: Post }) => {
    return <PostCardMemo post={item} />;
  }, []);

  const renderListFooterComponent = useCallback(() => {
    if (isOffline) {
      return <FeedListFooter isLoading={false} error={{ type: 'network' }} onRetry={retry} />;
    }

    return (
      <FeedListFooter isLoading={isFetchingNextPage} error={data ? error : null} onRetry={retry} />
    );
  }, [isFetchingNextPage, data, retry, error, isOffline]);

  const posts = useMemo(() => data?.pages.flatMap((p) => p.posts ?? []) ?? [], [data]);

  if ((error || isRetrying) && !data && lastErrorRef.current) {
    return (
      <FeedError
        title="Не удалось загрузить публикации"
        error={lastErrorRef.current}
        onRetry={retry}
        isRetrying={isRetrying}
      />
    );
  }

  if (isFetching && !data) {
    return <FeedSkeleton />;
  }

  if (!posts.length) {
    return <FeedEmpty onReset={retry} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPostCard}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        onEndReached={fetchNext}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ListSeparatorComponent}
        ListFooterComponent={renderListFooterComponent}
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
  },
});

export const Feed = observer(FeedComponent);

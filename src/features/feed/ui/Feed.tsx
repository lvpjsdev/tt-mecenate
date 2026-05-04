import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useRef } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { filtersStore } from '@/core/stores/filters.store';
import { networkStore } from '@/core/stores/network.store';
import type { Post } from '@/entities/post/model/types';
import { PostCardMemo } from '@/entities/post/ui/PostCard';
import { ERROR_MESSAGES } from '@/shared/ui/errorDictionary';
import { usePosts } from '../model/usePosts';
import { stylesheet } from './Feed.styles';
import { FeedEmpty } from './FeedEmpty';
import { FeedError } from './FeedError';
import { FeedListFooter } from './FeedListFooter';
import { FeedSkeleton } from './FeedSkeleton';

const ListSeparatorComponent = () => <View style={stylesheet.listGap} />;

function FeedComponent() {
  const tier = filtersStore.activeFilter;
  const {
    query: { data, isRefetching, isFetching, isFetchingNextPage, error, refetch },
    retry,
    fetchNext,
  } = usePosts(tier);

  const isOffline = !networkStore.isOnline;

  const lastErrorRef = useRef(error);
  if (error) lastErrorRef.current = error;

  const isRetrying = isFetching && !data;

  const renderPostCard = useCallback(({ item }: { item: Post }) => {
    return <PostCardMemo post={item} />;
  }, []);

  const renderListFooterComponent = useCallback(() => {
    if (isOffline) {
      return (
        <FeedListFooter
          isLoading={false}
          error={{ type: 'network', uiText: ERROR_MESSAGES.network }}
          onRetry={retry}
        />
      );
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

  if (!posts.length && !isFetching) {
    return <FeedEmpty onReset={retry} />;
  }

  return (
    <View style={stylesheet.container}>
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

export const Feed = observer(FeedComponent);

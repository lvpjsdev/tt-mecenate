import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, type ViewToken } from 'react-native';
import { getPosts } from '@/shared/api/generated/posts/posts';
import { usePosts } from './model/usePosts';

const PostsScreen = () => {
  const isRefreshingRef = useRef(false);
  const isFetchingMoreRef = useRef(false);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error: queryError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePosts();

  const posts = data?.pages.flatMap((p) => p.posts ?? []) ?? [];

  const errorMessage = queryError instanceof Error ? queryError.message : 'Unknown error';

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems?: ViewToken[] }) => {
      const lastIndex = viewableItems?.at(-1)?.index ?? 0;

      const shouldPrefetch = lastIndex >= posts.length - 5;

      if (shouldPrefetch && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [posts.length, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const onRefresh = useCallback(async () => {
    if (isRefreshingRef.current) return;

    isRefreshingRef.current = true;

    try {
      const firstPage = await queryClient.fetchQuery({
        queryKey: ['posts', { cursor: '' }],
        queryFn: () => getPosts({ cursor: '' }),
      });

      queryClient.setQueryData(['posts'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: [firstPage, ...old.pages.slice(1)],
        };
      });
    } finally {
      isRefreshingRef.current = false;
    }
  }, [queryClient, queryClient.fetchQuery]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.center}>
        <Text>Error: {errorMessage}</Text>
      </View>
    );
  }

  if (!posts.length) {
    return (
      <View style={styles.center}>
        <Text>No posts</Text>
      </View>
    );
  }

  const fetchNext = async () => {
    if (isFetchingMoreRef.current || isRefreshingRef.current || !hasNextPage) return;

    isFetchingMoreRef.current = true;

    try {
      await fetchNextPage();
    } finally {
      isFetchingMoreRef.current = false;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
        refreshing={isRefreshingRef.current}
        onRefresh={onRefresh}
        onEndReached={fetchNext}
        //TODO: добавить onMomentumScrollBegin
        onViewableItemsChanged={onViewableItemsChanged}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.center}>
              <Text>Loading more...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
});

export default PostsScreen;

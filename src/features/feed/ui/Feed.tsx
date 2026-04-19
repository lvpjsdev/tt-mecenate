import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePosts } from '../model/usePosts';
import { PostCard, PostCardSkeleton } from '@/entities/post/ui';
import { isNearBottom } from './utils'

const PostsScreen = () => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error: queryError,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
  } = usePosts();

  const posts = data?.pages.flatMap((p) => p.posts ?? []) ?? [];

  const onRefresh = useCallback(async () => {
    queryClient.cancelQueries({queryKey: ['posts']});
    queryClient.invalidateQueries({queryKey: ['posts']});
  }, [queryClient]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (queryError) {
    const errorMessage = queryError instanceof Error ? queryError.message : 'Unknown error';
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

  const fetchNext = () => {
    if (isFetchingNextPage || !hasNextPage) return;

    fetchNextPage();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PostCard
              post={item}
          />
        )}
        onScroll={(e)=>{
          if (!isNearBottom(e)) return;
          fetchNext();
        }}
        refreshing={isRefetching}
        onRefresh={onRefresh}
        ListFooterComponent={
          isFetchingNextPage ? (
            <PostCardSkeleton/>
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

import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePosts } from './model/usePosts';

const PostsScreen = () => {
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
        //TODO: добавить onMomentumScrollBegin
        onEndReached={() => {
          if (isFetchingNextPage || !hasNextPage) return;
          fetchNextPage();
        }}
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

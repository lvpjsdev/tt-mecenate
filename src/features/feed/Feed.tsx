import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePosts } from './model/usePosts';

const PostsScreen = () => {
  const { data, isLoading: loading, isError, error: queryError, fetchNextPage } = usePosts();

  const error = isError ? ((queryError as Error)?.message ?? 'Unknown error') : null;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.posts}
        keyExtractor={(item) => item.id ?? ''}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
        onEndReached={() => {
          if (loading || isError) return;
          fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
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

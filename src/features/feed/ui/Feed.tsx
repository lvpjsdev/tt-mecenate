import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PostCard } from '@/entities/post/ui';
import { tokens } from '@/shared/styles/tokens';
import { EmptyState } from '@/shared/ui';
import { usePosts } from '../model/usePosts';
import { isNearBottom } from './utils';

const PostsScreen = () => {
  const queryClient = useQueryClient();
  const {
    query: { data, isRefetching, hasNextPage, error },
    retry,
    fetchNext,
  } = usePosts();

  const posts = data?.pages.flatMap((p) => p.posts ?? []) ?? [];

  const onRefresh = useCallback(async () => {
    queryClient.cancelQueries({ queryKey: ['posts'] });
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  }, [queryClient]);

  if (error && !data) {
    return (
      <View style={styles.center}>
        <EmptyState
          title="Не удалось загрузить страницу"
          action={{
            label: 'Повторить',
            onPress: retry,
          }}
        />
      </View>
    );
  }

  if (!posts.length && !hasNextPage) {
    return (
      <View style={styles.center}>
        <EmptyState
          title="По вашему запросу ничего нет"
          action={{
            label: 'На главную',
            onPress: retry,
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostCard post={item} />}
        onScroll={(e) => {
          if (!isNearBottom(e)) return;
          fetchNext();
        }}
        refreshing={isRefetching}
        onRefresh={onRefresh}
        ItemSeparatorComponent={() => <View style={styles.listGap} />}
        ListFooterComponent={
          error &&
          data && (
            <EmptyState
              title="Не удалось загрузить следующие посты"
              action={{
                label: 'Повторить',
                onPress: retry,
              }}
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.palette.neutral[0],
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: tokens.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: tokens.palette.neutral[400],
  },
  listGap: {
    height: tokens.spacing.xl,
    width: tokens.spacing.xl,
  },
  title: {
    fontSize: tokens.fontSize.lg,
    fontWeight: '700',
    marginBottom: tokens.spacing.xs,
  },
  body: {
    fontSize: tokens.fontSize.sm,
    color: tokens.palette.neutral[700],
  },
});

export default PostsScreen;

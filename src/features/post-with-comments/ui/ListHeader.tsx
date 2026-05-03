import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { usePostById } from '@/entities/post/api/usePostById';
import { PostDetail } from '@/entities/post/ui/PostDetail';
import { tokens } from '@/shared/styles/tokens';
import { EmptyState, LinkButton, Text } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';
import { getCommentSuffix } from '../utils';

export function ListHeader({ postId }: { postId: string }) {
  const theme = useTheme();

  const { data: data, isError, isLoading } = usePostById(postId);

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

  if (!data) {
    return null;
  }

  return (
    <View>
      <PostDetail
        id={postId}
        authorAvatarUri={data.avatarUrl ?? ''}
        authorName={data.authorName}
        imageUri={data.coverUrl ?? ''}
        title={data.title ?? ''}
        body={data.body}
        likeCount={data.likes}
        commentCount={data.comments}
      />
      <View style={stylesheet.commentsHeader}>
        <Text variant="body" color={theme.colors.text.secondary}>
          {`${data.comments} комментари${getCommentSuffix(data.comments)}`}
        </Text>
        <LinkButton label={'Сначала новые'} onPress={() => {}} />
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.xl,
  },
});

export const ListHeaderMemo = memo(ListHeader);

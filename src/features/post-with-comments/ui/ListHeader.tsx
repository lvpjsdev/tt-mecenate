import { memo, useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { useLike } from '@/entities/post/api/useLike';
import { usePostById } from '@/entities/post/api/usePostById';
import { PostDetail } from '@/entities/post/ui/PostDetail';
import { EmptyState, LinkButton, Text } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';
import { getCommentSuffix } from '../utils';
import { stylesheet } from './ListHeader.styles';

export function ListHeader({ postId }: { postId: string }) {
  const theme = useTheme();

  const { data: data, isError, isLoading } = usePostById(postId);
  const { mutate: toggleLike } = useLike(postId);

  const commentLabel = useMemo(
    () => (data ? `${data.comments} комментари${getCommentSuffix(data.comments)}` : ''),
    [data],
  );

  const postDetailProps = useMemo(
    () =>
      data
        ? {
            id: postId,
            authorAvatarUri: data.avatarUrl ?? '',
            authorName: data.authorName,
            imageUri: data.coverUrl ?? '',
            title: data.title ?? '',
            body: data.body,
            likeCount: data.likes,
            commentCount: data.comments,
            isLiked: data.isLiked,
          }
        : null,
    [postId, data],
  );

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

  if (!postDetailProps) {
    return null;
  }

  return (
    <View>
      <PostDetail {...postDetailProps} onLike={toggleLike} />
      <View style={stylesheet.commentsHeader}>
        <Text variant="body" color={theme.colors.text.secondary}>
          {commentLabel}
        </Text>
        <LinkButton label={'Сначала новые'} onPress={() => {}} />
      </View>
    </View>
  );
}

export const ListHeaderMemo = memo(ListHeader);

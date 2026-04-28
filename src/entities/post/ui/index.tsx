import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { EmptyState } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';
import { getUIErrorMessage } from '@/shared/ui/uiErrors';
import { usePostById } from '../api/usePostById';
import { PostDetail } from './PostDetail';

export function Post() {
  const params = useLocalSearchParams<{ postId: string }>();

  console.log(params);

  const postId = params.postId;

  const { data, error, isError, isLoading } = usePostById(postId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <EmptyState title={getUIErrorMessage(error)} />;
  }

  if (!data) {
    return null;
  }

  return (
    <PostDetail
      authorAvatarUri={data.avatarUrl ?? ''}
      authorName={data.authorName}
      imageUri={data.coverUrl ?? ''}
      title={data.title ?? ''}
      body={data.body}
      donateCount={data.likes}
      commentCount={data.comments}
      donateActive={data.isLiked}
      comments={[]}
    />
  );
}

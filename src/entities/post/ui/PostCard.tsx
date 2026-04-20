import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import type { LayoutChangeEvent, NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { Text as RNText, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ActionButton, Avatar, Button, LinkButton, Text } from '@/shared/ui';
import type { Post } from '../model/types';
import { stylesheet } from './PostCard.styles';

export interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onDonate?: () => void;
}

export function PostCard({ post, onLike, onComment, onDonate }: PostCardProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTextLong, setIsTextLong] = useState(false);
  const [btnWidth, setBtnWidth] = useState(0);

  const showExpandButton = isTextLong && !post.isPaid && !isExpanded;
  const numberOfLines = isTextLong && !isExpanded ? 2 : undefined;
  const showLockedOverlay = post.isPaid;

  const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (e.nativeEvent.lines.length > 2) {
      setIsTextLong(true);
    }
  };

  const handleBtnLayout = (e: LayoutChangeEvent) => {
    setBtnWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={stylesheet.card}>
      {/* Header: avatar + author name */}
      <View style={stylesheet.header}>
        <Avatar uri={post.avatarUrl ?? ''} />
        <Text variant="label">{post.authorName}</Text>
      </View>

      {/* Cover image + locked overlay */}
      {post.coverUrl ? (
        <View style={stylesheet.coverWrapper}>
          <Image
            source={{ uri: post.coverUrl }}
            contentFit="cover"
            blurRadius={showLockedOverlay ? 35 : 0}
            style={stylesheet.coverImage as import('react-native').ImageStyle}
          />
          {showLockedOverlay ? (
            <View style={stylesheet.lockedCoverOverlay} pointerEvents="box-none">
              <View style={stylesheet.lockedContent}>
                <View style={stylesheet.lockedIconWrapper}>
                  <View style={stylesheet.lockedIconCircle}>
                    <FontAwesome6
                      name="dollar-sign"
                      size={14}
                      color={theme.colors.primary.default}
                    />
                  </View>
                </View>
                <View style={stylesheet.lockedTextAndButton}>
                  <RNText style={stylesheet.lockedMessageText}>
                    {'Контент скрыт пользователем.\nДоступ откроется после доната'}
                  </RNText>
                  <Button label="Отправить донат" onPress={onDonate} />
                </View>
              </View>
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Body */}
      <View style={stylesheet.body}>
        {post.title ? <Text variant="title">{post.title}</Text> : null}

        {/* Preview text container — скрыт при isPaid */}
        {!showLockedOverlay ? (
          <View style={stylesheet.previewContainer}>
            {/* Скрытый View для измерения количества строк */}
            <View style={stylesheet.hiddenText} pointerEvents="none">
              <Text
                variant="body"
                color={theme.colors.text.primary}
                onTextLayout={handleTextLayout}
              >
                {post.preview}
              </Text>
            </View>

            {/* Видимый текст — обрезан или полный */}
            <Text variant="body" color={theme.colors.text.primary} numberOfLines={numberOfLines}>
              {post.preview}
            </Text>

            {/* Кнопка "Показать ещё" — в конце второй строки */}
            {showExpandButton ? (
              <>
                <LinearGradient
                  colors={['transparent', theme.colors.background.default]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[stylesheet.showMoreGradient, { right: btnWidth }]}
                  pointerEvents="none"
                />
                <LinkButton
                  label="Показать ещё"
                  onPress={() => setIsExpanded(true)}
                  style={stylesheet.showMoreButton}
                  onLayout={handleBtnLayout}
                />
              </>
            ) : null}
          </View>
        ) : null}

        {/* Actions: like + comment — скрыты при isPaid */}
      </View>

      {!showLockedOverlay ? (
        <View style={stylesheet.actions}>
          <ActionButton type="like" count={post.likes} active={post.isLiked} onPress={onLike} />
          <ActionButton type="comment" count={post.comments} onPress={onComment} />
        </View>
      ) : null}
    </View>
  );
}

PostCard.displayName = 'PostCard';

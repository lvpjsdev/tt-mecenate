import { Image } from 'expo-image';
import { useState } from 'react';
import { Text as RNText, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { tokens } from '@/shared/styles/tokens';
import { Button } from '@/shared/ui';
import { Icon } from '@/shared/ui/Icon';
import { stylesheet } from './PostCard.styles';

interface PostCardCoverProps {
  coverUrl: string;
  isLocked: boolean;
  onDonate?: () => void;
}

export function PostCardCover({ coverUrl, isLocked, onDonate }: PostCardCoverProps) {
  const theme = useTheme();

  return (
    <View style={stylesheet.coverWrapper}>
      <Image
        source={{ uri: coverUrl }}
        contentFit="cover"
        blurRadius={isLocked ? 35 : 0}
        transition={300}
        style={[stylesheet.coverImage, { backgroundColor: tokens.palette.skeleton.base }]}
      />
      {isLocked ? (
        <View style={stylesheet.lockedCoverOverlay} pointerEvents="box-none">
          <View style={stylesheet.lockedContent}>
            <View style={stylesheet.lockedIconWrapper}>
              <Icon name="donate" size={30} color={theme.colors.primary.default} />
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
  );
}

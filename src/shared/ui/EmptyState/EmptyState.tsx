import { Image, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import illustrationSticker from '../../../../assets/illustration_sticker.png';
import { styles } from './EmptyState.styles';
import type { EmptyStateProps } from './EmptyState.types';

export function EmptyState({ title, description, illustration, action }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.outer}>
      <View style={styles.content}>
        {illustration ?? (
          <Image
            source={illustrationSticker}
            style={styles.illustration}
            testID="empty-state-preset-illustration"
          />
        )}

        <Text variant="title" color={theme.colors.text.primary}>
          {title}
        </Text>

        {description ? (
          <Text variant="body" color={theme.colors.text.secondary}>
            {description}
          </Text>
        ) : null}

        {action ? (
          <View style={styles.actionWrapper}>
            <Button
              label={action.label}
              onPress={action.onPress}
              state={action.isLoading ? 'loading' : 'default'}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

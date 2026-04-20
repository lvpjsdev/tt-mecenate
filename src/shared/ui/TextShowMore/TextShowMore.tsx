import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import type { LayoutChangeEvent, TextLayoutEvent } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { LinkButton } from '../LinkButton';
import { Text } from '../Text';
import { stylesheet } from './TextShowMore.styles';

interface TextShowMoreProps {
  text: string;
  numberOfLines?: number;
  showMoreLabel?: string;
}

export function TextShowMore({
  text,
  numberOfLines = 2,
  showMoreLabel = 'Показать ещё',
}: TextShowMoreProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTextLong, setIsTextLong] = useState(false);
  const [btnWidth, setBtnWidth] = useState(0);

  const showExpandButton = isTextLong && !isExpanded;
  const visibleLines = isTextLong && !isExpanded ? numberOfLines : undefined;

  const handleTextLayout = (e: TextLayoutEvent) => {
    if (e.nativeEvent.lines.length > numberOfLines) {
      setIsTextLong(true);
    }
  };

  const handleBtnLayout = (e: LayoutChangeEvent) => {
    setBtnWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={stylesheet.container}>
      {/* Скрытый View для измерения количества строк */}
      <View style={stylesheet.hiddenText} pointerEvents="none">
        <Text variant="body" color={theme.colors.text.primary} onTextLayout={handleTextLayout}>
          {text}
        </Text>
      </View>

      {/* Видимый текст — обрезан или полный */}
      <Text variant="body" color={theme.colors.text.primary} numberOfLines={visibleLines}>
        {text}
      </Text>

      {showExpandButton ? (
        <>
          <LinearGradient
            colors={['transparent', theme.colors.background.default]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[stylesheet.gradient, { right: btnWidth }]}
            pointerEvents="none"
          />
          <LinkButton
            label={showMoreLabel}
            onPress={() => setIsExpanded(true)}
            style={stylesheet.button}
            onLayout={handleBtnLayout}
          />
        </>
      ) : null}
    </View>
  );
}

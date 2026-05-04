import { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { TabItem } from '../TabItem';
import { stylesheet } from './TabBar.styles';
import type { TabBarProps } from './TabBar.types';

export function TabBar<T extends string, U extends string>({
  tabs,
  selectedKey,
  onTabChange,
}: TabBarProps<T, U>) {
  const theme = useTheme();
  const borderColor = theme.colors.border.default;

  const tabItems = useMemo(
    () =>
      tabs.map((tab) => (
        <View key={tab.key} style={{ flex: 1 }}>
          <TabItem
            label={tab.label}
            active={tab.key === selectedKey}
            onPress={() => onTabChange(tab.key)}
          />
        </View>
      )),
    [tabs, selectedKey, onTabChange],
  );

  return (
    <View
      style={[
        stylesheet.container,
        { borderColor, backgroundColor: theme.colors.background.default },
      ]}
    >
      {tabItems}
    </View>
  );
}

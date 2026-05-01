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

  return (
    <View
      style={[
        stylesheet.container,
        { borderColor, backgroundColor: theme.colors.background.default },
      ]}
    >
      {tabs.map((tab) => (
        <View key={tab.key} style={{ flex: 1 }}>
          <TabItem
            label={tab.label}
            active={tab.key === selectedKey}
            onPress={() => onTabChange(tab.key)}
          />
        </View>
      ))}
    </View>
  );
}

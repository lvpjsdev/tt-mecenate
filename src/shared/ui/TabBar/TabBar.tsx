import { View } from 'react-native';
import { TabItem } from '../TabItem';
import { stylesheet } from './TabBar.styles';
import type { TabBarProps } from './TabBar.types';

export function TabBar({ tabs, selectedKey, onTabChange }: TabBarProps) {
  return (
    <View style={stylesheet.container}>
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

TabBar.displayName = 'TabBar';

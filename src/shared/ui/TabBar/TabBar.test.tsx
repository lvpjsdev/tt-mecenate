import { describe, expect, it, vi } from 'vitest';

vi.mock('react-native', () => ({
  View: ({ children, style }: any) => ({
    type: 'View',
    props: { children, style },
  }),
  StyleSheet: { create: (s: any) => s },
}));

vi.mock('../TabItem', () => ({
  TabItem: ({ label, active, onPress }: any) => ({
    type: 'TabItem',
    props: { label, active, onPress },
  }),
}));

vi.mock('./TabBar.styles', () => ({
  stylesheet: { container: {} },
}));

import { TabItem } from '../TabItem';
import { TabBar } from './TabBar';

describe('TabBar', () => {
  it('renders correct number of TabItems', () => {
    const tabs = [
      { key: 'tab1', label: 'Tab 1' },
      { key: 'tab2', label: 'Tab 2' },
      { key: 'tab3', label: 'Tab 3' },
    ];
    const result = TabBar({ tabs, selectedKey: 'tab1', onTabChange: vi.fn() }) as any;
    expect(result.props.children.length).toBe(3);
  });

  it('correct active tab based on selectedKey', () => {
    const tabs = [
      { key: 'tab1', label: 'Tab 1' },
      { key: 'tab2', label: 'Tab 2' },
    ];
    const result = TabBar({ tabs, selectedKey: 'tab2', onTabChange: vi.fn() }) as any;
    const tabItems = result.props.children;
    expect(tabItems[0].props.active).toBe(false);
    expect(tabItems[1].props.active).toBe(true);
  });

  it('onTabChange called with correct key', () => {
    const onTabChange = vi.fn();
    const tabs = [
      { key: 'tab1', label: 'Tab 1' },
      { key: 'tab2', label: 'Tab 2' },
    ];
    const result = TabBar({ tabs, selectedKey: 'tab1', onTabChange }) as any;
    result.props.children[1].props.onPress();
    expect(onTabChange).toHaveBeenCalledWith('tab2');
  });

  it('each TabItem gets flex: 1', () => {
    const tabs = [
      { key: 'tab1', label: 'Tab 1' },
      { key: 'tab2', label: 'Tab 2' },
    ];
    const result = TabBar({ tabs, selectedKey: 'tab1', onTabChange: vi.fn() }) as any;
    const tabItems = result.props.children;
    expect(tabItems[0].props.style.flex).toBe(1);
    expect(tabItems[1].props.style.flex).toBe(1);
  });

  it('TabItem label matches tab.label', () => {
    const tabs = [
      { key: 'tab1', label: 'Hello' },
      { key: 'tab2', label: 'World' },
    ];
    const result = TabBar({ tabs, selectedKey: 'tab1', onTabChange: vi.fn() }) as any;
    expect(result.props.children[0].props.label).toBe('Hello');
    expect(result.props.children[1].props.label).toBe('World');
  });
});

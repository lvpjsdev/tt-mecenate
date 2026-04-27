// Feature: ui-kit-components, Property 3: TabBar selection invariant
// Validates: Requirements 2.3
import fc from 'fast-check';
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

describe('Property 3: TabBar selection invariant', () => {
  it('exactly one TabItem is active when selectedKey matches one tab', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({ key: fc.string(), label: fc.string() }), { minLength: 1 }),
        (tabs) => {
          const selectedKey = tabs[Math.floor(Math.random() * tabs.length)].key;
          const result = TabBar({ tabs, selectedKey, onTabChange: vi.fn() }) as any;
          const activeCount = result.props.children.filter((t: any) => t.props.active).length;
          expect(activeCount).toBe(1);
        },
      ),
      { numRuns: 100 },
    );
  });
});

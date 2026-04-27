import { describe, expect, it, vi } from 'vitest';
import { TabItem } from './TabItem';

vi.mock('react-native', () => ({
  Pressable: ({ children, style, onPress, testID }: any) => ({
    type: 'Pressable',
    props: { children, style, onPress, testID },
  }),
  StyleSheet: { create: (s: any) => s },
}));

vi.mock('../../styles/theme', () => ({
  theme: {
    colors: {
      primary: { default: '#6115cd', disabled: '#d5c9ff' },
      text: { inverse: '#ffffff', secondary: '#57626f', disabled: '#c3cad1' },
      border: { default: '#e8ecef' },
    },
    borderRadius: { '2xl': 22, full: 9999 },
    spacing: { xs: 4, sm: 6, lg: 12 },
  },
}));

vi.mock('../Text', () => ({
  Text: ({ children, color, variant }: any) => ({
    type: 'Text',
    props: { children, color, variant },
  }),
}));

vi.mock('./TabItem.styles', () => ({
  stylesheet: { container: {} },
}));

describe('TabItem', () => {
  it('active state: background is primary.default, text color is inverse', () => {
    const result = TabItem({ label: 'Tab', active: true }) as any;
    expect(result.props.style[1].backgroundColor).toBe('#6115cd');
    expect(result.props.children.props.color).toBe('#ffffff');
  });

  it('inactive state: background is transparent, text color is secondary', () => {
    const result = TabItem({ label: 'Tab', active: false }) as any;
    expect(result.props.style[1].backgroundColor).toBe('transparent');
    expect(result.props.children.props.color).toBe('#57626f');
  });

  it('active + disabled: background is primary.disabled', () => {
    const result = TabItem({ label: 'Tab', active: true, disabled: true }) as any;
    expect(result.props.style[1].backgroundColor).toBe('#d5c9ff');
  });

  it('inactive + disabled: text color is text.disabled', () => {
    const result = TabItem({ label: 'Tab', active: false, disabled: true }) as any;
    expect(result.props.children.props.color).toBe('#c3cad1');
  });

  it('disabled blocks onPress', () => {
    const onPress = vi.fn();
    const result = TabItem({ label: 'Tab', disabled: true, onPress }) as any;
    result.props.onPress();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('enabled calls onPress', () => {
    const onPress = vi.fn();
    const result = TabItem({ label: 'Tab', onPress }) as any;
    result.props.onPress();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('testID is forwarded', () => {
    const result = TabItem({ label: 'Tab', testID: 'my-tab' }) as any;
    expect(result.props.testID).toBe('my-tab');
  });

  it('label is rendered inside Text child', () => {
    const result = TabItem({ label: 'Hello' }) as any;
    expect(result.props.children.props.children).toBe('Hello');
  });
});

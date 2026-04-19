import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { theme } from '../../styles/theme';
// Now import the component
import { Button } from './Button';

// Mock React hooks - properly maintain state
let mockPressState = 'default';
const mockSetPressState = vi.fn((newState) => {
  mockPressState = typeof newState === 'function' ? newState(mockPressState) : newState;
  return mockPressState;
});
vi.mock('react', () => ({
  useState: vi.fn((initial) => {
    // Return current mock state if set, otherwise initial
    return [mockPressState || initial, mockSetPressState];
  }),
  useCallback: (fn: (...args: unknown[]) => unknown) => fn,
  createContext: (defaultValue: unknown) => ({ _defaultValue: defaultValue }),
  useContext: (ctx: { _defaultValue: unknown }) => ctx._defaultValue,
}));

// Mock react-native BEFORE any imports
vi.mock('react-native', () => ({
  Pressable: ({
    children,
    onPress,
    onPressIn,
    onPressOut,
    testID,
  }: {
    children?: unknown;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    testID?: string;
  }) => ({
    type: 'Pressable',
    props: { onPress, onPressIn, onPressOut, testID, children },
  }),
  ActivityIndicator: ({ color, size }: { color?: string; size?: string | number }) => ({
    type: 'ActivityIndicator',
    props: { color, size },
  }),
  View: ({ children, style }: { children?: unknown; style?: unknown }) => ({
    type: 'View',
    props: { children, style },
  }),
  StyleSheet: {
    create: (styles: Record<string, unknown>) => styles,
  },
}));

vi.mock('../../../styles/ThemeContext', () => {
  const mockTheme = {
    borderRadius: { lg: 14, xl: 20, '2xl': 22, full: 9999 },
    spacing: { xs: 4, sm: 6, md: 8, base: 10, lg: 12, xl: 16, '2xl': 20, '3xl': 24, '4xl': 32 },
    states: {
      primary: {
        default: { background: '#6115cd', text: '#ffffff', icon: '#ffffff' },
        hover: { background: '#4e11a4', text: '#ffffff', icon: '#ffffff' },
        pressed: { background: '#3a0d7b', text: '#ffffff', icon: '#ffffff' },
        disabled: { background: '#d5c9ff', text: '#ffffff', icon: '#ffffff' },
      },
    },
  };
  return {
    useTheme: () => mockTheme,
    ThemeProvider: ({ children }: { children?: unknown }) => children,
  };
});

// Use theme directly for assertions (same values as mock theme)

describe('Button Component', () => {
  describe('Rendering in each state (Requirements 18.1)', () => {
    it('renders in default state', () => {
      const button = Button({ label: 'Click me', state: 'default' });

      expect(button).toBeDefined();
      expect(button.props.testID).toBe('button-container');
    });

    it('renders in hover state', () => {
      const button = Button({ label: 'Hover Button', state: 'hover' });

      expect(button).toBeDefined();
      expect(button.props.testID).toBe('button-container');
    });

    it('renders in pressed state', () => {
      const button = Button({ label: 'Pressed Button', state: 'pressed' });

      expect(button).toBeDefined();
      expect(button.props.testID).toBe('button-container');
    });

    it('renders in disabled state', () => {
      const button = Button({ label: 'Disabled Button', state: 'disabled' });

      expect(button).toBeDefined();
      expect(button.props.testID).toBe('button-container');
    });

    it('renders in loading state', () => {
      const button = Button({ label: 'Loading Button', state: 'loading' });

      expect(button).toBeDefined();
      expect(button.props.testID).toBe('button-container');
    });
  });

  describe('onPress behavior (Requirement 18.2)', () => {
    it('calls onPress when pressed in default state', () => {
      const onPress = vi.fn();
      const button = Button({ label: 'Click me', onPress });

      // Simulate press
      button.props.onPress();
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = vi.fn();
      const button = Button({ label: 'Disabled', state: 'disabled', onPress });

      // Simulate press
      button.props.onPress();
      expect(onPress).not.toHaveBeenCalled();
    });

    it('does not call onPress when loading', () => {
      const onPress = vi.fn();
      const button = Button({ label: 'Loading', state: 'loading', onPress });

      // Simulate press
      button.props.onPress();
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('Loading state renders ActivityIndicator (Requirement 18.3)', () => {
    it('renders ActivityIndicator when in loading state', () => {
      const button = Button({ label: 'Loading', state: 'loading' });

      expect(button).toBeDefined();
      // The children is a View with ActivityIndicator
      const viewProps = button.props.children.props;
      expect(viewProps.children.type).toBeDefined();
      expect(viewProps.children.type.name).toBe('ActivityIndicator');
    });

    it('does not render label text when in loading state', () => {
      const button = Button({ label: 'Loading', state: 'loading' });

      const viewProps = button.props.children.props;
      // In loading state, the View contains ActivityIndicator, not Text
      expect(viewProps.children.type.name).toBe('ActivityIndicator');
    });
  });

  // Feature: base-component-system, Property 1: disabled state uses disabled tokens
  // Validates: Requirements 18.1, 2.7, 6.1
  describe('Property 1: Disabled state uses disabled tokens', () => {
    it('disabled state always uses states.primary.disabled.background, not default', () => {
      fc.assert(
        fc.property(fc.constantFrom('default', 'hover', 'pressed'), () => {
          // Render button with disabled state
          const button = Button({ label: 'Test', state: 'disabled' });

          // Get the background color from the View style (it's an array)
          const viewProps = button.props.children.props;
          const styleArray = viewProps.style;

          // Find backgroundColor in the style array (second element is { backgroundColor })
          const backgroundColor = styleArray[1]?.backgroundColor;

          // Should use disabled token, not default
          expect(backgroundColor).toBe(theme.states.primary.disabled.background);
          expect(backgroundColor).not.toBe(theme.states.primary.default.background);
        }),
        { numRuns: 100 },
      );
    });
  });

  // Feature: base-component-system, Property 2: pressed state uses pressed tokens
  // Validates: Requirements 18.2, 2.7
  describe('Property 2: Pressed state uses pressed tokens', () => {
    it('pressed state always uses states.primary.pressed.background', () => {
      fc.assert(
        fc.property(fc.constantFrom('default', 'hover', 'disabled'), () => {
          // Set mock state to pressed BEFORE rendering to simulate the pressed state
          mockPressState = 'pressed';

          // Render button - it will use the mockPressState which is 'pressed'
          const button = Button({ label: 'Test' });

          // Get the background color from the View style (it's an array)
          const viewProps = button.props.children.props;
          const styleArray = viewProps.style;

          // Find backgroundColor in the style array
          const backgroundColor = styleArray[1]?.backgroundColor;

          // Should use pressed token
          expect(backgroundColor).toBe(theme.states.primary.pressed.background);
          expect(backgroundColor).not.toBe(theme.states.primary.default.background);
          expect(backgroundColor).not.toBe(theme.states.primary.hover.background);
        }),
        { numRuns: 100 },
      );
    });
  });

  // Feature: base-component-system, Property 3: disabled button never calls onPress
  // Validates: Requirements 18.3, 2.7
  describe('Property 3: Disabled button never calls onPress', () => {
    it('disabled button never calls onPress regardless of press count', () => {
      fc.assert(
        fc.property(
          fc.nat(10), // number of press attempts (0-10)
          (pressCount) => {
            const onPress = vi.fn();
            const button = Button({ label: 'Test', state: 'disabled', onPress });

            // Simulate pressing the button pressCount times
            for (let i = 0; i < pressCount; i++) {
              button.props.onPress();
            }

            // onPress should never be called when button is disabled
            expect(onPress).not.toHaveBeenCalled();
          },
        ),
        { numRuns: 100 },
      );
    });
  });
});

import { render } from '@testing-library/react-native';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text Component', () => {
  describe('Rendering variants', () => {
    it('renders label variant correctly', () => {
      const { getByText } = render(<Text variant="label">Label Text</Text>);
      expect(getByText('Label Text')).toBeTruthy();
    });

    it('renders symbol variant correctly', () => {
      const { getByText } = render(<Text variant="symbol">Symbol Text</Text>);
      expect(getByText('Symbol Text')).toBeTruthy();
    });

    it('renders placeholder variant correctly', () => {
      const { getByText } = render(<Text variant="placeholder">Placeholder Text</Text>);
      expect(getByText('Placeholder Text')).toBeTruthy();
    });

    it('renders body variant correctly', () => {
      const { getByText } = render(<Text variant="body">Body Text</Text>);
      expect(getByText('Body Text')).toBeTruthy();
    });
  });

  describe('Color override', () => {
    it('applies custom color when color prop is provided', () => {
      const customColor = '#ff0000';
      const { getByText } = render(
        <Text variant="label" color={customColor}>
          Custom Color Text
        </Text>,
      );
      const textElement = getByText('Custom Color Text');

      expect(textElement).toBeTruthy();
      const styles = textElement.props.style;
      const hasCustomColor = styles.some((s: { color?: string }) => s?.color === customColor);
      expect(hasCustomColor).toBe(true);
    });

    it('overrides default color with custom color for label variant', () => {
      const customColor = '#00ff00';
      const { getByText } = render(
        <Text variant="label" color={customColor}>
          Override Color
        </Text>,
      );
      const textElement = getByText('Override Color');

      const styles = textElement.props.style;
      const colorStyle = styles.find((s: { color?: string }) => s?.color);
      expect(colorStyle?.color).toBe(customColor);
    });

    it('overrides default color with custom color for placeholder variant', () => {
      const customColor = '#0000ff';
      const { getByText } = render(
        <Text variant="placeholder" color={customColor}>
          Override Placeholder Color
        </Text>,
      );
      const textElement = getByText('Override Placeholder Color');

      const styles = textElement.props.style;
      const colorStyle = styles.find((s: { color?: string }) => s?.color);
      expect(colorStyle?.color).toBe(customColor);
    });
  });

  describe('All variants render children', () => {
    const variants = ['label', 'symbol', 'placeholder', 'body'] as const;

    variants.forEach((variant) => {
      it(`renders children for ${variant} variant`, () => {
        const testText = `Test ${variant} text`;
        const { getByText } = render(<Text variant={variant}>{testText}</Text>);

        expect(getByText(testText)).toBeTruthy();
      });
    });
  });
});

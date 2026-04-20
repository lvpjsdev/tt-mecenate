# Text

Атом для отображения текста. Базовый компонент для всех текстовых элементов в системе. Использует шрифт Manrope.

## Описание

Компонент `Text` рендерит текстовый контент с предопределёнными вариантами стилизации. Является атомом — не содержит логики, только отображает переданные данные.

## Props

| Prop | Type | Default | Описание |
|------|------|---------|----------|
| `variant` | `'label' \| 'symbol' \| 'placeholder' \| 'body'` | — | Вариант текста (обязательный) |
| `children` | `string` | — | Текстовое содержимое |
| `color` | `string` | `undefined` | Переопределение цвета текста |

## Варианты (variant)

| Variant | fontSize | fontWeight | color (default) |
|---------|----------|------------|-----------------|
| `label` | 15 (base) | 600 (semibold) | `colors.text.primary` |
| `symbol` | 13 (sm) | 700 (bold) | `colors.text.primary` |
| `placeholder` | 15 (base) | 500 (medium) | `colors.text.secondary` |
| `body` | 15 (base) | 500 (medium) | `colors.text.primary` |

## Примеры использования

```tsx
import { Text } from './components/atoms/Text'

// Заголовок
<Text variant="label">Заголовок</Text>

// Символ (иконка текстом)
<Text variant="symbol">★</Text>

// Плейсхолдер
<Text variant="placeholder">Введите текст</Text>

// Основной текст
<Text variant="body">Основной текст сообщения</Text>

// С кастомным цветом
<Text variant="body" color="#ff0000">Красный текст</Text>
```

## Токены

- `theme.typography.fontFamily.primary` — Manrope
- `theme.typography.fontSize.*` — размеры шрифта
- `theme.typography.fontWeight.*` — начертания шрифта
- `theme.colors.text.*` — цвета текста
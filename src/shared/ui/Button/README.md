# Button

Молекула для отображения интерактивной кнопки с поддержкой состояний.

## Описание

Компонент `Button` — интерактивный элемент управления для выполнения действий. Поддерживает состояния `default`, `hover`, `pressed`, `disabled`, `loading`. Использует паттерн `states.primary`.

## Props

| Prop | Type | Default | Описание |
|------|------|---------|----------|
| `label` | `string` | — | Текст кнопки |
| `state` | `'default' \| 'hover' \| 'pressed' \| 'disabled' \| 'loading'` | `'default'` | Состояние кнопки |
| `onPress` | `() => void` | `undefined` | Обработчик нажатия |

## Состояния

| State | Background | Text Color | Behavior |
|-------|------------|------------|----------|
| `default` | `states.primary.default.background` (#6115cd) | `states.primary.default.text` (#ffffff) | Готов к взаимодействию |
| `hover` | `states.primary.hover.background` (#4e11a4) | `states.primary.hover.text` (#ffffff) | Наведение (Expo Web) |
| `pressed` | `states.primary.pressed.background` (#3a0d7b) | `states.primary.pressed.text` (#ffffff) | Нажатие |
| `disabled` | `states.primary.disabled.background` (#d5c9ff) | `states.primary.disabled.text` (#ffffff) | Неактивна, onPress не вызывается |
| `loading` | `states.primary.default.background` | — | Показывает ActivityIndicator, onPress не вызывается |

## Стили

- `borderRadius`: `theme.borderRadius.lg` (14)
- `paddingVertical`: `theme.spacing.xl` (16)
- `paddingHorizontal`: `theme.spacing['4xl']` (32)
- `height`: 42

## Примеры использования

```tsx
import { Button } from './components/molecules/Button'

// Базовая кнопка
<Button label="Нажми меня" onPress={() => console.log('pressed')} />

// Кнопка в состоянии loading
<Button label="Загрузка" state="loading" />

// Неактивная кнопка
<Button label="Недоступно" state="disabled" />

// Кнопка с обработчиком
<Button 
  label="Отправить" 
  onPress={() => handleSubmit()} 
/>
```

## Токены

- `theme.states.primary.*` — паттерн primary для всех состояний
- `theme.borderRadius.lg` — 14
- `theme.spacing.xl` — 16
- `theme.spacing['4xl']` — 32
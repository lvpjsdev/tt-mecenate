## Задачи

### День 1

	- [X]	Поднять проект на Expo + TypeScript
    - [X]   Линтер и прекамитхук
	- [X]	React Navigation
	- [X]	TanStack Query
	- [X]	MobX
	- [X]	Axios
	- [X]	Настроить базовую структуру:
	- [X]	app/ (navigation)
	- [X]	shared/api
	- [X]	shared/ui
	- [X]	entities/post
	- [X]	features/feed
	- [X]	Настроить QueryClientProvider
	- [X]	Реализовать автогенерацию типовых уков на основе сваггер конфига. 
	- [X]	Сделать базовый API client (axios instance + interceptors)
	- [X]	Подключить дизайн-токены (цвета, отступы, типографика)
	- [X]	Сделать базовые UI-компоненты:
	- [X]	Text
	- [X]	Button
	- [X]	Loader / Skeleton
	- [X]	Перевести схемы линтинга expo на biome

### День 2

    - [X]	Реализовать useInfiniteQuery для постов
	- [X]	Настроить cursor-based пагинацию
	- [X]	Сделать экран Feed:
	- [X]	FlatList
	- [ ]	Карточка поста (author, preview, image, stats)
	- [ ]	Реализовать:
	- [ ]	infinite scroll (onEndReached)
	- [ ]	pull-to-refresh
	- [ ]	Добавить фильтр:
	- [ ]	All / Free / Paid
	- [ ]	Навигация в Post Detail

### День 3

	- [ ]	Реализовать состояния:
	- [ ]	loading (skeleton)
	- [ ]	error
	- [ ]	empty
	- [ ]	Error state:
	- [ ]	текст: “Не удалось загрузить публикации”
	- [ ]	кнопка retry
	- [ ]	Paid посты:
	- [ ]	скрытый текст
	- [ ]	заглушка
	- [ ]	Оптимизация:
	- [ ]	keyExtractor
	- [ ]	memo для item
	- [ ]	Мини-полишинг UI под Figma
	- [ ]	Добавить третий кран как витрину UI компонентов. 


MUST HAVE:
	•	React Query data layer
	•	optimistic like
	•	WebSocket updates
	•	retry + backoff + jitter (минимально)
	•	error classification

⸻

NICE TO HAVE:
	•	mutation queue (простая версия)
	•	connection state (MobX)
	•	selectors
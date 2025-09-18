# Компоненты

## DMap

Основной компонент карты, который содержит все остальные элементы.

### Пропсы

| Проп             | Тип                                      | Обязательный | По умолчанию | Описание                             |
| ---------------- | ---------------------------------------- | ------------ | ------------ | ------------------------------------ |
| `options`        | `MapOptions`                             | ✅           | -            | Настройки карты                      |
| `style`          | `ViewStyle`                              | ✅           | -            | Стили контейнера карты               |
| `children`       | `React.ReactNode`                        | ❌           | -            | Дочерние компоненты                  |
| `autoFitBounds`  | `boolean \| Partial<Padding>`            | ❌           | `false`      | Автоматическая подгонка границ       |
| `fadeInOnInit`   | `boolean`                                | ❌           | `true`       | Плавное появление при инициализации  |
| `fadeInDuration` | `number`                                 | ❌           | `500`        | Длительность анимации появления (мс) |
| `fadeInDelay`    | `number`                                 | ❌           | `500`        | Задержка анимации появления (мс)     |
| `onInit`         | `() => void`                             | ❌           | -            | Колбэк инициализации карты           |
| `onTouchStart`   | `(event: GestureResponderEvent) => void` | ❌           | -            | Обработчик начала касания            |
| `onTouchEnd`     | `(event: GestureResponderEvent) => void` | ❌           | -            | Обработчик окончания касания         |
| `onWebViewError` | `(event: WebViewErrorEvent) => void`     | ❌           | -            | Обработчик ошибок WebView            |
| `injectCSS`      | `string`                                 | ❌           | -            | Дополнительные CSS стили             |
| `injectJS`       | `string`                                 | ❌           | -            | Дополнительный JavaScript код        |
| `injectHTML`     | `string`                                 | ❌           | -            | Дополнительный HTML контент          |

### События карты

| Событие                  | Тип                                                       | Описание                                      |
| ------------------------ | --------------------------------------------------------- | --------------------------------------------- |
| `onMove`                 | `(event: MapEvent & MapEventState) => void`               | Вызывается при движении карты                 |
| `onMoveStart`            | `(event: MapEvent & MapEventState) => void`               | Вызывается в начале движения карты            |
| `onMoveEnd`              | `(event: MapEvent & MapEventState) => void`               | Вызывается в конце движения карты             |
| `onCenter`               | `(event: MapEvent & MapEventState) => void`               | Вызывается при изменении центра               |
| `onCenterStart`          | `(event: MapEvent & MapEventState) => void`               | Вызывается в начале изменения центра          |
| `onCenterEnd`            | `(event: MapEvent & MapEventState) => void`               | Вызывается в конце изменения центра           |
| `onZoom`                 | `(event: MapEvent & MapEventState) => void`               | Вызывается при изменении масштаба             |
| `onZoomStart`            | `(event: MapEvent & MapEventState) => void`               | Вызывается в начале изменения масштаба        |
| `onZoomEnd`              | `(event: MapEvent & MapEventState) => void`               | Вызывается в конце изменения масштаба         |
| `onRotation`             | `(event: MapEvent & MapEventState) => void`               | Вызывается при повороте карты                 |
| `onRotationStart`        | `(event: MapEvent & MapEventState) => void`               | Вызывается в начале поворота                  |
| `onRotationEnd`          | `(event: MapEvent & MapEventState) => void`               | Вызывается в конце поворота                   |
| `onPitch`                | `(event: MapEvent & MapEventState) => void`               | Вызывается при наклоне карты                  |
| `onPitchStart`           | `(event: MapEvent & MapEventState) => void`               | Вызывается в начале наклона                   |
| `onPitchEnd`             | `(event: MapEvent & MapEventState) => void`               | Вызывается в конце наклона                    |
| `onIdle`                 | `(event: MapEvent & MapEventState) => void`               | Вызывается когда карта становится неактивной  |
| `onResize`               | `(event: MapEvent & MapEventState) => void`               | Вызывается при изменении размера карты        |
| `onTrafficShow`          | `(event: TrafficVisibilityEvent & MapEventState) => void` | Вызывается при показе слоя пробок             |
| `onTrafficHide`          | `(event: TrafficVisibilityEvent & MapEventState) => void` | Вызывается при скрытии слоя пробок            |
| `onTrafficScore`         | `(event: TrafficScoreEvent & MapEventState) => void`      | Вызывается при обновлении оценки пробок       |
| `onFloorPlanShow`        | `(event: FloorPlanShowEvent & MapEventState) => void`     | Вызывается при показе плана этажа             |
| `onFloorPlanHide`        | `(event: FloorPlanHideEvent & MapEventState) => void`     | Вызывается при скрытии плана этажа            |
| `onFloorLevelChange`     | `(event: FloorLevelChangeEvent & MapEventState) => void`  | Вызывается при изменении уровня этажа         |
| `onStyleLoad`            | `(event: StyleLoadEvent & MapEventState) => void`         | Вызывается при загрузке стиля карты           |
| `onStyleLoadError`       | `(event: StyleLoadErrorEvent & MapEventState) => void`    | Вызывается при ошибке загрузки стиля          |
| `onChangeLanguage`       | `(event: ChangeLanguageEvent & MapEventState) => void`    | Вызывается при изменении языка карты          |
| `onDestroy`              | `(event: DestroyMapEvent & MapEventState) => void`        | Вызывается при уничтожении карты              |
| `onGraphicsPresetChange` | `(event: GraphicsPresetChangeEvent) => void`              | Вызывается при изменении графического пресета |

### Пример использования

```tsx
<DMap
  style={{ flex: 1 }}
  options={{
    key: 'YOUR_API_KEY',
    center: [82.920412, 55.030111],
    zoom: 13,
    style: 'light',
    trafficControl: 'topRight',
    zoomControl: 'topRight',
  }}
  autoFitBounds={{
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  }}
  onInit={() => console.log('Карта инициализирована')}
  onMove={(event) => console.log('Карта перемещена:', event.center)}
  onZoom={(event) => console.log('Масштаб:', event.zoom)}
>
  {/* Дочерние компоненты */}
</DMap>
```

## DMarker

Компонент для отображения маркеров на карте.

### Пропсы

| Проп            | Тип             | Обязательный | Описание                                        |
| --------------- | --------------- | ------------ | ----------------------------------------------- |
| `uniqueId`      | `string`        | ✅           | Уникальный идентификатор маркера                |
| `options`       | `MarkerOptions` | ❌           | Настройки маркера                               |
| `onPress`       | `() => void`    | ❌           | Обработчик нажатия на маркер                    |
| `ignoreAutoFit` | `boolean`       | ❌           | Игнорировать при автоматической подгонке границ |

### MarkerOptions

| Свойство      | Тип        | Обязательное | По умолчанию | Описание                                        |
| ------------- | ---------- | ------------ | ------------ | ----------------------------------------------- |
| `coordinates` | `number[]` | ✅           | -            | Координаты маркера `[долгота, широта, высота?]` |
| `icon`        | `string`   | ❌           | -            | URL иконки маркера                              |
| `size`        | `number[]` | ❌           | -            | Размер иконки `[ширина, высота]` в пикселях     |
| `anchor`      | `number[]` | ❌           | -            | Точка привязки `[x, y]` в пикселях              |
| `opacity`     | `number`   | ❌           | `1`          | Прозрачность маркера (0-1)                      |
| `rotation`    | `number`   | ❌           | `0`          | Поворот иконки в градусах                       |
| `zIndex`      | `number`   | ❌           | `10`         | Порядок отрисовки                               |

### Пример использования

```tsx
<DMarker
  uniqueId="marker1"
  options={{
    coordinates: [82.920412, 55.030111],
    icon: 'https://example.com/marker.png',
    size: [32, 32],
    anchor: [16, 32], // Центр снизу
    opacity: 0.8,
    rotation: 45,
    zIndex: 10,
  }}
  onPress={() => console.log('Маркер нажат!')}
/>
```

## DLabel

Компонент для отображения текстовых меток на карте.

### Пропсы

| Проп            | Тип            | Обязательный | Описание                                        |
| --------------- | -------------- | ------------ | ----------------------------------------------- |
| `uniqueId`      | `string`       | ✅           | Уникальный идентификатор метки                  |
| `options`       | `LabelOptions` | ❌           | Настройки метки                                 |
| `onPress`       | `() => void`   | ❌           | Обработчик нажатия на метку                     |
| `ignoreAutoFit` | `boolean`      | ❌           | Игнорировать при автоматической подгонке границ |

### LabelOptions

| Свойство         | Тип               | Обязательное | По умолчанию | Описание                                      |
| ---------------- | ----------------- | ------------ | ------------ | --------------------------------------------- |
| `coordinates`    | `number[]`        | ✅           | -            | Координаты метки `[долгота, широта, высота?]` |
| `text`           | `string`          | ✅           | -            | Текст метки                                   |
| `image`          | `LabelImage`      | ❌           | -            | Фоновое изображение                           |
| `minZoom`        | `number`          | ❌           | -            | Минимальный масштаб отображения               |
| `maxZoom`        | `number`          | ❌           | -            | Максимальный масштаб отображения              |
| `color`          | `string`          | ❌           | `#000000`    | Цвет текста (hex)                             |
| `fontSize`       | `number`          | ❌           | `14`         | Размер шрифта                                 |
| `haloRadius`     | `number`          | ❌           | -            | Радиус ореола вокруг текста                   |
| `haloColor`      | `string`          | ❌           | -            | Цвет ореола (hex)                             |
| `letterSpacing`  | `number`          | ❌           | `0`          | Межбуквенное расстояние                       |
| `lineHeight`     | `number`          | ❌           | -            | Высота строки для многострочного текста       |
| `anchor`         | `number[]`        | ❌           | -            | Смещение метки `[x, y]` (устарело)            |
| `offset`         | `number[]`        | ❌           | -            | Смещение метки `[x, y]`                       |
| `relativeAnchor` | `number[]`        | ❌           | `[0, 0]`     | Относительная точка привязки `[x, y]` (0-1)   |
| `zIndex`         | `number`          | ❌           | `10`         | Порядок отрисовки                             |
| `userData`       | `any`             | ❌           | -            | Пользовательские данные                       |
| `interactive`    | `boolean`         | ❌           | `false`      | Возможность взаимодействия                    |
| `labeling`       | `LabelingOptions` | ❌           | -            | Настройки маркировки                          |

### LabelImage

| Свойство     | Тип                                | Обязательное | Описание                              |
| ------------ | ---------------------------------- | ------------ | ------------------------------------- |
| `url`        | `string`                           | ✅           | URL изображения                       |
| `size`       | `[number, number]`                 | ✅           | Размер изображения `[ширина, высота]` |
| `stretchX`   | `Array<[number, number]>`          | ❌           | Горизонтальные области растяжения     |
| `stretchY`   | `Array<[number, number]>`          | ❌           | Вертикальные области растяжения       |
| `pixelRatio` | `number`                           | ❌           | Соотношение пикселей                  |
| `padding`    | `[number, number, number, number]` | ❌           | Отступы `[верх, право, низ, лево]`    |

### Пример использования

```tsx
<DLabel
  uniqueId="label1"
  options={{
    coordinates: [82.920412, 55.030111],
    text: 'Новосибирск',
    color: '#ff0000',
    fontSize: 16,
    haloRadius: 2,
    haloColor: '#ffffff',
    offset: [0, -10],
    relativeAnchor: [0.5, 1], // Центр снизу
    zIndex: 10,
    interactive: true,
  }}
  onPress={() => console.log('Метка нажата!')}
/>
```

## DPolyline

Компонент для отображения линий на карте.

### Пропсы

| Проп            | Тип               | Обязательный | Описание                                        |
| --------------- | ----------------- | ------------ | ----------------------------------------------- |
| `uniqueId`      | `string`          | ✅           | Уникальный идентификатор линии                  |
| `options`       | `PolylineOptions` | ❌           | Настройки линии                                 |
| `ignoreAutoFit` | `boolean`         | ❌           | Игнорировать при автоматической подгонке границ |

### PolylineOptions

| Свойство             | Тип            | Обязательное | По умолчанию | Описание                                    |
| -------------------- | -------------- | ------------ | ------------ | ------------------------------------------- |
| `coordinates`        | `number[][]`   | ✅           | -            | Массив координат `[[долгота, широта], ...]` |
| `zIndex`             | `number`       | ❌           | `5`          | Порядок отрисовки                           |
| `width`              | `number`       | ❌           | `2`          | Ширина линии в пикселях                     |
| `color`              | `string`       | ❌           | `#000000`    | Цвет линии (hex)                            |
| `gapLength`          | `number`       | ❌           | -            | Длина промежутка в пикселях                 |
| `gapColor`           | `string`       | ❌           | -            | Цвет промежутка (hex)                       |
| `dashLength`         | `number`       | ❌           | -            | Длина штриха в пикселях                     |
| `minZoom`            | `number`       | ❌           | -            | Минимальный масштаб отображения             |
| `maxZoom`            | `number`       | ❌           | -            | Максимальный масштаб отображения            |
| `interactive`        | `boolean`      | ❌           | `true`       | Возможность взаимодействия                  |
| `userData`           | `any`          | ❌           | -            | Пользовательские данные                     |
| `renderingMode`      | `'2d' \| '3d'` | ❌           | `'2d'`       | Режим отрисовки                             |
| `hiddenPartColor`    | `string`       | ❌           | -            | Цвет скрытых частей (3D режим)              |
| `hiddenPartGapColor` | `string`       | ❌           | -            | Цвет промежутков скрытых частей (3D режим)  |

### Пример использования

```tsx
<DPolyline
  uniqueId="route1"
  options={{
    coordinates: [
      [82.920412, 55.030111],
      [82.930412, 55.040111],
      [82.940412, 55.050111],
    ],
    width: 5,
    color: '#ff0000',
    dashLength: 10,
    gapLength: 5,
    gapColor: '#ffffff',
    zIndex: 5,
    interactive: true,
  }}
/>
```

## DPolygon

Компонент для отображения полигонов на карте.

### Пропсы

| Проп            | Тип              | Обязательный | Описание                                        |
| --------------- | ---------------- | ------------ | ----------------------------------------------- |
| `uniqueId`      | `string`         | ✅           | Уникальный идентификатор полигона               |
| `options`       | `PolygonOptions` | ❌           | Настройки полигона                              |
| `ignoreAutoFit` | `boolean`        | ❌           | Игнорировать при автоматической подгонке границ |

### PolygonOptions

| Свойство      | Тип            | Обязательное | По умолчанию | Описание                                              |
| ------------- | -------------- | ------------ | ------------ | ----------------------------------------------------- |
| `coordinates` | `number[][][]` | ✅           | -            | Координаты полигона `[[[долгота, широта], ...], ...]` |
| `zIndex`      | `number`       | ❌           | `2`          | Порядок отрисовки                                     |
| `minZoom`     | `number`       | ❌           | -            | Минимальный масштаб отображения                       |
| `maxZoom`     | `number`       | ❌           | -            | Максимальный масштаб отображения                      |
| `color`       | `string`       | ❌           | `#000000`    | Цвет заливки (hex)                                    |
| `strokeColor` | `string`       | ❌           | -            | Цвет обводки (hex)                                    |
| `strokeWidth` | `number`       | ❌           | `1`          | Ширина обводки в пикселях                             |
| `interactive` | `boolean`      | ❌           | `true`       | Возможность взаимодействия                            |
| `userData`    | `any`          | ❌           | -            | Пользовательские данные                               |

### Пример использования

```tsx
<DPolygon
  uniqueId="area1"
  options={{
    coordinates: [
      [
        [82.920412, 55.030111],
        [82.930412, 55.030111],
        [82.930412, 55.040111],
        [82.920412, 55.040111],
        [82.920412, 55.030111], // Замыкаем полигон
      ],
    ],
    color: '#ff000080',
    strokeColor: '#ff0000',
    strokeWidth: 2,
    zIndex: 2,
    interactive: true,
  }}
/>
```

## DHtmlMarker

Компонент для отображения HTML-маркеров на карте.

### Пропсы

| Проп            | Тип                 | Обязательный | Описание                                        |
| --------------- | ------------------- | ------------ | ----------------------------------------------- |
| `uniqueId`      | `string`            | ✅           | Уникальный идентификатор HTML-маркера           |
| `options`       | `HtmlMarkerOptions` | ❌           | Настройки HTML-маркера                          |
| `ignoreAutoFit` | `boolean`           | ❌           | Игнорировать при автоматической подгонке границ |

### HtmlMarkerOptions

| Свойство                 | Тип                     | Обязательное | По умолчанию | Описание                                        |
| ------------------------ | ----------------------- | ------------ | ------------ | ----------------------------------------------- |
| `coordinates`            | `number[]`              | ✅           | -            | Координаты маркера `[долгота, широта, высота?]` |
| `html`                   | `HTMLElement \| string` | ✅           | -            | HTML контент маркера                            |
| `anchor`                 | `number[]`              | ❌           | `[0, 0]`     | Точка привязки `[x, y]` в пикселях              |
| `minZoom`                | `number`                | ❌           | -            | Минимальный масштаб отображения                 |
| `maxZoom`                | `number`                | ❌           | -            | Максимальный масштаб отображения                |
| `zIndex`                 | `number`                | ❌           | `10`         | Порядок отрисовки                               |
| `preventMapInteractions` | `boolean`               | ❌           | `true`       | Блокировать взаимодействие с картой             |
| `userData`               | `any`                   | ❌           | -            | Пользовательские данные                         |
| `interactive`            | `boolean`               | ❌           | `true`       | Возможность взаимодействия                      |
| `disableRounding`        | `boolean`               | ❌           | `false`      | Отключить округление координат                  |
| `labeling`               | `HtmlMarkerLabeling`    | ❌           | -            | Настройки маркировки                            |

### HtmlMarkerLabeling

| Свойство | Тип                                                 | Описание                                  |
| -------- | --------------------------------------------------- | ----------------------------------------- |
| `type`   | `'none' \| 'invincible' \| 'full' \| 'pinnedToPoi'` | Тип маркировки                            |
| `width`  | `number`                                            | Ширина области маркировки                 |
| `height` | `number`                                            | Высота области маркировки                 |
| `offset` | `number[]`                                          | Смещение области маркировки               |
| `poiId`  | `string`                                            | ID связанной POI (для типа 'pinnedToPoi') |

### Пример использования

```tsx
<DHtmlMarker
  uniqueId="htmlMarker1"
  options={{
    coordinates: [82.920412, 55.030111],
    html: `
      <div style="
        background: #007bff;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        HTML маркер
      </div>
    `,
    anchor: [0, 0],
    zIndex: 10,
    interactive: true,
    preventMapInteractions: false,
  }}
/>
```

## Типы данных

### MapEventState

```tsx
interface MapEventState {
  zoom: number | null;
  rotation: number | null;
  pitch: number | null;
  center: number[] | null;
  styleZoom: number | null;
  latlng: LeafletLatLng | null;
}
```

### LeafletLatLng

```tsx
interface LeafletLatLng {
  lat: number;
  lng: number;
}
```

### LngLatBounds

```tsx
interface LngLatBounds {
  southWest: number[];
  northEast: number[];
}
```

### Padding

```tsx
interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
```

## Следующие шаги

- [Использование](USAGE.md) - Примеры использования компонентов
- [API Справочник](API.md) - Методы управления картой
- [Примеры](EXAMPLES.md) - Готовые примеры приложений

# API Справочник

## DMapRef

Интерфейс для управления картой через ref.

### Методы управления центром и масштабом

#### setCenter(center, options?)

Устанавливает центр карты.

```tsx
mapRef.current?.setCenter([82.920412, 55.030111], {
  animate: true,
  duration: 1000,
  easing: 'easeOutCubic',
});
```

**Параметры:**

- `center: number[]` - Координаты центра `[долгота, широта]`
- `options?: AnimationOptions` - Опции анимации

#### setZoom(zoom, options?)

Устанавливает масштаб карты.

```tsx
mapRef.current?.setZoom(15, {
  animate: true,
  duration: 800,
  easing: 'easeInOutQuad',
  useHeightForAnimation: true,
});
```

**Параметры:**

- `zoom: number` - Масштаб карты
- `options?: ZoomAnimationOptions` - Опции анимации

#### setStyleZoom(styleZoom, options?)

Устанавливает масштаб стиля карты.

```tsx
mapRef.current?.setStyleZoom(15, {
  animate: true,
  duration: 1000,
  easing: 'easeOutCubic',
});
```

**Параметры:**

- `styleZoom: number` - Масштаб стиля
- `options?: AnimationOptions` - Опции анимации

### Методы управления поворотом и наклоном

#### setRotation(rotation, options?)

Устанавливает поворот карты.

```tsx
mapRef.current?.setRotation(45, {
  animate: true,
  duration: 500,
  easing: 'easeOutSine',
  normalize: true,
});
```

**Параметры:**

- `rotation: number` - Угол поворота в градусах
- `options?: RotationAnimationOptions` - Опции анимации

#### setPitch(pitch, options?)

Устанавливает наклон карты.

```tsx
mapRef.current?.setPitch(60, {
  animate: true,
  duration: 600,
  easing: 'easeInOutCubic',
});
```

**Параметры:**

- `pitch: number` - Угол наклона в градусах
- `options?: AnimationOptions` - Опции анимации

### Методы управления ограничениями

#### setMinZoom(zoom, options?)

Устанавливает минимальный масштаб карты.

```tsx
mapRef.current?.setMinZoom(5, {
  animate: true,
  duration: 500,
});
```

**Параметры:**

- `zoom: number` - Минимальный масштаб
- `options?: AnimationOptions` - Опции анимации

#### setMaxZoom(zoom, options?)

Устанавливает максимальный масштаб карты.

```tsx
mapRef.current?.setMaxZoom(20, {
  animate: true,
  duration: 500,
});
```

**Параметры:**

- `zoom: number` - Максимальный масштаб
- `options?: AnimationOptions` - Опции анимации

#### setMinPitch(pitch, options?)

Устанавливает минимальный наклон карты.

```tsx
mapRef.current?.setMinPitch(0, {
  animate: true,
  duration: 500,
});
```

**Параметры:**

- `pitch: number` - Минимальный наклон в градусах
- `options?: AnimationOptions` - Опции анимации

#### setMaxPitch(pitch, options?)

Устанавливает максимальный наклон карты.

```tsx
mapRef.current?.setMaxPitch(85, {
  animate: true,
  duration: 500,
});
```

**Параметры:**

- `pitch: number` - Максимальный наклон в градусах
- `options?: AnimationOptions` - Опции анимации

#### setLowZoomMaxPitch(pitch, options?)

Устанавливает максимальный наклон для малых масштабов (zoom < 16.5).

```tsx
mapRef.current?.setLowZoomMaxPitch(60, {
  animate: true,
  duration: 500,
});
```

**Параметры:**

- `pitch: number` - Максимальный наклон для малых масштабов
- `options?: AnimationOptions` - Опции анимации

### Методы управления слоями

#### showTraffic()

Показывает слой пробок на карте.

```tsx
mapRef.current?.showTraffic();
```

#### hideTraffic()

Скрывает слой пробок с карты.

```tsx
mapRef.current?.hideTraffic();
```

### Методы управления языком и стилем

#### setLanguage(lang)

Устанавливает язык карты.

```tsx
mapRef.current?.setLanguage('ru');
```

**Параметры:**

- `lang: string` - Код языка (например, 'ru', 'en')

#### setStyleById(styleId)

Устанавливает стиль карты по ID.

```tsx
mapRef.current?.setStyleById('dark');
```

**Параметры:**

- `styleId: string` - ID стиля или 'light'/'dark'

#### setStyleFromUrl(styleUrl, options)

Устанавливает стиль карты по URL.

```tsx
mapRef.current?.setStyleFromUrl('https://example.com/style.json', {
  iconsPath: 'https://example.com/icons/',
  fontsPath: 'https://example.com/fonts/',
  modelsPath: 'https://example.com/models/',
});
```

**Параметры:**

- `styleUrl: string` - URL стиля
- `options: StyleOptions` - Опции стиля

### Методы управления границами и отступами

#### setMaxBounds(bounds)

Устанавливает максимальные границы карты.

```tsx
mapRef.current?.setMaxBounds({
  southWest: [82.0, 54.0],
  northEast: [83.0, 56.0],
});
```

**Параметры:**

- `bounds: LngLatBounds` - Границы карты

#### setPadding(padding, options?)

Устанавливает отступы карты.

```tsx
mapRef.current?.setPadding(
  {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  },
  {
    animate: true,
    duration: 500,
  }
);
```

**Параметры:**

- `padding: Partial<Padding>` - Отступы карты
- `options?: AnimationOptions` - Опции анимации

#### fitBounds(bounds, options?)

Подгоняет карту под указанные границы.

```tsx
mapRef.current?.fitBounds(
  {
    southWest: [82.0, 54.0],
    northEast: [83.0, 56.0],
  },
  {
    padding: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutCubic',
    },
    maxZoom: 15,
  }
);
```

**Параметры:**

- `bounds: LngLatBounds` - Границы для подгонки
- `options?: FitBoundsOptions` - Опции подгонки

#### flyTo(latlng, zoom?, options?)

Плавно перелетает к указанной точке.

```tsx
mapRef.current?.flyTo({ lat: 55.7558, lng: 37.6176 }, 15, {
  animate: true,
  duration: 2000,
  easing: 'easeOutCubic',
});
```

**Параметры:**

- `latlng: LatLngLiteral` - Координаты точки
- `zoom?: number` - Масштаб (опционально)
- `options?: ZoomPanOptions` - Опции анимации

## Типы данных

### AnimationOptions

```tsx
interface AnimationOptions {
  animate?: boolean; // Включить анимацию
  duration?: number; // Длительность в миллисекундах
  easing?: Easing; // Функция анимации
}
```

### ZoomAnimationOptions

```tsx
interface ZoomAnimationOptions extends AnimationOptions {
  useHeightForAnimation?: boolean; // Использовать высоту камеры для анимации
}
```

### RotationAnimationOptions

```tsx
interface RotationAnimationOptions extends AnimationOptions {
  normalize?: boolean; // Нормализовать поворот
}
```

### FitBoundsOptions

```tsx
interface FitBoundsOptions {
  padding?: Partial<Padding>; // Отступы
  skipMapPadding?: boolean; // Игнорировать отступы карты
  considerRotation?: boolean; // Учитывать поворот карты
  animation?: AnimationOptions; // Анимация
  maxZoom?: number; // Максимальный масштаб
}
```

### ZoomPanOptions

```tsx
interface ZoomPanOptions {
  animate?: boolean; // Включить анимацию
  duration?: number; // Длительность
  easeLinearity?: number; // Линейность анимации
  noMoveStart?: boolean; // Не начинать движение
}
```

### LatLngLiteral

```tsx
interface LatLngLiteral {
  lat: number; // Широта
  lng: number; // Долгота
  alt?: number; // Высота (опционально)
}
```

### LngLatBounds

```tsx
interface LngLatBounds {
  southWest: number[]; // Юго-западная точка [долгота, широта]
  northEast: number[]; // Северо-восточная точка [долгота, широта]
}
```

### Padding

```tsx
interface Padding {
  top: number; // Верхний отступ
  right: number; // Правый отступ
  bottom: number; // Нижний отступ
  left: number; // Левый отступ
}
```

### StyleOptions

```tsx
interface StyleOptions {
  stylePath?: string; // Путь к стилям
  iconsPath: string; // Путь к иконкам
  fontsPath: string; // Путь к шрифтам
  modelsPath: string; // Путь к моделям
}
```

## Функции анимации (Easing)

Доступные функции анимации:

### Линейные

- `'linear'`

### Квадратичные

- `'easeInQuad'`
- `'easeOutQuad'`
- `'easeInOutQuad'`

### Кубические

- `'easeInCubic'`
- `'easeOutCubic'`
- `'easeInOutCubic'`

### Квартичные

- `'easeInQuart'`
- `'easeOutQuart'`
- `'easeInOutQuart'`

### Квинтичные

- `'easeInQuint'`
- `'easeOutQuint'`
- `'easeInOutQuint'`

### Синусоидальные

- `'easeInSine'`
- `'easeOutSine'`
- `'easeInOutSine'`

### Экспоненциальные

- `'easeInExpo'`
- `'easeOutExpo'`
- `'easeInOutExpo'`

### Круговые

- `'easeInCirc'`
- `'easeOutCirc'`
- `'easeInOutCirc'`

### Упругие

- `'easeInElastic'`
- `'easeOutElastic'`
- `'easeInOutElastic'`

### Откатные

- `'easeInBack'`
- `'easeOutBack'`
- `'easeInOutBack'`

### Отскакивающие

- `'easeOutBounce'`

## Примеры использования

### Базовое управление картой

```tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { DMap, type DMapRef } from 'react-native-2gis-mapgl';

export default function MapController() {
  const mapRef = useRef<DMapRef>(null);

  const goToMoscow = () => {
    mapRef.current?.setCenter([37.6176, 55.7558], {
      animate: true,
      duration: 2000,
      easing: 'easeOutCubic',
    });
  };

  const zoomIn = () => {
    mapRef.current?.setZoom(18, {
      animate: true,
      duration: 1000,
      easing: 'easeInOutQuad',
    });
  };

  const rotateMap = () => {
    mapRef.current?.setRotation(45, {
      animate: true,
      duration: 1500,
      easing: 'easeInOutSine',
    });
  };

  const showTraffic = () => {
    mapRef.current?.showTraffic();
  };

  return (
    <View style={styles.container}>
      <DMap
        ref={mapRef}
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: [82.920412, 55.030111],
          zoom: 13,
        }}
      />

      <View style={styles.controls}>
        <Button title="Москва" onPress={goToMoscow} />
        <Button title="Увеличить" onPress={zoomIn} />
        <Button title="Повернуть" onPress={rotateMap} />
        <Button title="Пробки" onPress={showTraffic} />
      </View>
    </View>
  );
}
```

### Анимация с несколькими параметрами

```tsx
const animateToLocation = (coordinates: [number, number], zoom: number) => {
  // Анимация центра
  mapRef.current?.setCenter(coordinates, {
    animate: true,
    duration: 1000,
    easing: 'easeOutCubic',
  });

  // Анимация масштаба
  mapRef.current?.setZoom(zoom, {
    animate: true,
    duration: 1000,
    easing: 'easeOutCubic',
    useHeightForAnimation: true,
  });

  // Анимация поворота
  mapRef.current?.setRotation(0, {
    animate: true,
    duration: 800,
    easing: 'easeInOutSine',
    normalize: true,
  });

  // Анимация наклона
  mapRef.current?.setPitch(0, {
    animate: true,
    duration: 600,
    easing: 'easeOutQuad',
  });
};
```

### Управление границами

```tsx
const setMapBounds = () => {
  // Установка границ
  mapRef.current?.setMaxBounds({
    southWest: [82.0, 54.0],
    northEast: [83.0, 56.0],
  });

  // Подгонка под границы
  mapRef.current?.fitBounds(
    {
      southWest: [82.5, 54.5],
      northEast: [83.5, 55.5],
    },
    {
      padding: {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      },
      animation: {
        duration: 1500,
        easing: 'easeOutCubic',
      },
      maxZoom: 15,
    }
  );
};
```

## Следующие шаги

- [Компоненты](COMPONENTS.md) - Описание всех компонентов
- [Использование](USAGE.md) - Примеры использования
- [Примеры](EXAMPLES.md) - Готовые примеры приложений

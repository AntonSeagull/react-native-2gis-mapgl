# Использование

## Базовое использование

### Простая карта

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DMap } from 'react-native-2gis-mapgl';

export default function SimpleMap() {
  return (
    <View style={styles.container}>
      <DMap
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: [82.920412, 55.030111], // Новосибирск
          zoom: 13,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
```

### Карта с маркером

```tsx
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { DMap, DMarker } from 'react-native-2gis-mapgl';

export default function MapWithMarker() {
  const handleMarkerPress = () => {
    Alert.alert('Маркер', 'Маркер нажат!');
  };

  return (
    <View style={styles.container}>
      <DMap
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: [82.920412, 55.030111],
          zoom: 13,
        }}
      >
        <DMarker
          uniqueId="mainMarker"
          options={{
            coordinates: [82.920412, 55.030111],
            icon: 'https://example.com/marker.png',
            size: [32, 32],
            anchor: [16, 32],
          }}
          onPress={handleMarkerPress}
        />
      </DMap>
    </View>
  );
}
```

## Продвинутые примеры

### Карта с несколькими объектами

```tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  DMap,
  DMarker,
  DLabel,
  DPolyline,
  DPolygon,
  DHtmlMarker,
  type DMapRef,
} from 'react-native-2gis-mapgl';

export default function AdvancedMap() {
  const mapRef = useRef<DMapRef>(null);

  const handleMapInit = () => {
    console.log('Карта инициализирована');
  };

  const handleMarkerPress = () => {
    Alert.alert('Маркер', 'Маркер нажат!');
  };

  const handleMapMove = (event: any) => {
    console.log('Карта перемещена:', event.center);
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
        onInit={handleMapInit}
        onMove={handleMapMove}
        onZoom={(event) => console.log('Масштаб:', event.zoom)}
      >
        {/* Маркер с иконкой */}
        <DMarker
          uniqueId="mainMarker"
          options={{
            coordinates: [82.920412, 55.030111],
            icon: 'https://example.com/marker.png',
            size: [32, 32],
            anchor: [16, 32],
            zIndex: 10,
          }}
          onPress={handleMarkerPress}
        />

        {/* Текстовая метка */}
        <DLabel
          uniqueId="cityLabel"
          options={{
            coordinates: [82.920412, 55.030111],
            text: 'Новосибирск',
            color: '#000000',
            fontSize: 16,
            haloRadius: 2,
            haloColor: '#ffffff',
            offset: [0, -40],
            relativeAnchor: [0.5, 1],
            zIndex: 10,
          }}
        />

        {/* Маршрут */}
        <DPolyline
          uniqueId="route"
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
          }}
        />

        {/* Область */}
        <DPolygon
          uniqueId="area"
          options={{
            coordinates: [
              [
                [82.920412, 55.030111],
                [82.930412, 55.030111],
                [82.930412, 55.040111],
                [82.920412, 55.040111],
                [82.920412, 55.030111],
              ],
            ],
            color: '#ff000080',
            strokeColor: '#ff0000',
            strokeWidth: 2,
            zIndex: 2,
          }}
        />

        {/* HTML маркер */}
        <DHtmlMarker
          uniqueId="htmlMarker"
          options={{
            coordinates: [82.930412, 55.040111],
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
          }}
        />
      </DMap>
    </View>
  );
}
```

### Управление картой через ref

```tsx
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { DMap, type DMapRef } from 'react-native-2gis-mapgl';

export default function ControlledMap() {
  const mapRef = useRef<DMapRef>(null);

  const flyToMoscow = () => {
    mapRef.current?.flyTo({ lat: 55.7558, lng: 37.6176 }, 15, {
      animate: true,
      duration: 2000,
    });
  };

  const showTraffic = () => {
    mapRef.current?.showTraffic();
  };

  const hideTraffic = () => {
    mapRef.current?.hideTraffic();
  };

  const changeStyle = () => {
    mapRef.current?.setStyleById('dark');
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
        <Button title="Перелететь в Москву" onPress={flyToMoscow} />
        <Button title="Показать пробки" onPress={showTraffic} />
        <Button title="Скрыть пробки" onPress={hideTraffic} />
        <Button title="Темная тема" onPress={changeStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
```

## Обработка событий

### События карты

```tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DMap, type MapEvent } from 'react-native-2gis-mapgl';

export default function EventHandlingMap() {
  const [mapState, setMapState] = useState({
    center: [82.920412, 55.030111],
    zoom: 13,
    rotation: 0,
    pitch: 0,
  });

  const handleMapMove = (event: MapEvent) => {
    setMapState({
      center: event.center || [0, 0],
      zoom: event.zoom || 0,
      rotation: event.rotation || 0,
      pitch: event.pitch || 0,
    });
  };

  const handleMapClick = (event: MapEvent) => {
    console.log('Клик по карте:', event.latlng);
  };

  return (
    <View style={styles.container}>
      <DMap
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: mapState.center,
          zoom: mapState.zoom,
        }}
        onMove={handleMapMove}
        onClick={handleMapClick}
        onZoom={(event) => console.log('Масштаб изменен:', event.zoom)}
        onRotation={(event) => console.log('Поворот изменен:', event.rotation)}
        onPitch={(event) => console.log('Наклон изменен:', event.pitch)}
      />

      <View style={styles.info}>
        <Text>
          Центр: {mapState.center[0].toFixed(4)},{' '}
          {mapState.center[1].toFixed(4)}
        </Text>
        <Text>Масштаб: {mapState.zoom.toFixed(1)}</Text>
        <Text>Поворот: {mapState.rotation.toFixed(1)}°</Text>
        <Text>Наклон: {mapState.pitch.toFixed(1)}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  info: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 5,
  },
});
```

### События маркеров

```tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { DMap, DMarker } from 'react-native-2gis-mapgl';

export default function MarkerEventsMap() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const markers = [
    { id: 'marker1', coordinates: [82.920412, 55.030111], title: 'Точка 1' },
    { id: 'marker2', coordinates: [82.930412, 55.040111], title: 'Точка 2' },
    { id: 'marker3', coordinates: [82.940412, 55.050111], title: 'Точка 3' },
  ];

  const handleMarkerPress = (markerId: string, title: string) => {
    setSelectedMarker(markerId);
    Alert.alert('Маркер', `Выбран маркер: ${title}`);
  };

  return (
    <View style={styles.container}>
      <DMap
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: [82.930412, 55.040111],
          zoom: 13,
        }}
      >
        {markers.map((marker) => (
          <DMarker
            key={marker.id}
            uniqueId={marker.id}
            options={{
              coordinates: marker.coordinates,
              icon:
                selectedMarker === marker.id
                  ? 'https://example.com/selected-marker.png'
                  : 'https://example.com/marker.png',
              size: [32, 32],
              anchor: [16, 32],
            }}
            onPress={() => handleMarkerPress(marker.id, marker.title)}
          />
        ))}
      </DMap>
    </View>
  );
}
```

## Анимации

### Плавные переходы

```tsx
import React, { useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { DMap, type DMapRef } from 'react-native-2gis-mapgl';

export default function AnimatedMap() {
  const mapRef = useRef<DMapRef>(null);

  const animateToLocation = (coordinates: [number, number], zoom: number) => {
    mapRef.current?.setCenter(coordinates, {
      animate: true,
      duration: 1000,
      easing: 'easeOutCubic',
    });

    mapRef.current?.setZoom(zoom, {
      animate: true,
      duration: 1000,
      easing: 'easeOutCubic',
    });
  };

  const rotateMap = (rotation: number) => {
    mapRef.current?.setRotation(rotation, {
      animate: true,
      duration: 800,
      easing: 'easeInOutSine',
    });
  };

  const pitchMap = (pitch: number) => {
    mapRef.current?.setPitch(pitch, {
      animate: true,
      duration: 600,
      easing: 'easeOutQuad',
    });
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
        <Button
          title="Новосибирск"
          onPress={() => animateToLocation([82.920412, 55.030111], 13)}
        />
        <Button
          title="Москва"
          onPress={() => animateToLocation([37.6176, 55.7558], 15)}
        />
        <Button title="Повернуть" onPress={() => rotateMap(45)} />
        <Button title="Наклонить" onPress={() => pitchMap(60)} />
      </View>
    </View>
  );
}
```

## Лучшие практики

### 1. Оптимизация производительности

```tsx
// ✅ Хорошо: Используйте useMemo для тяжелых вычислений
const markers = useMemo(
  () =>
    data.map((item) => ({
      id: item.id,
      coordinates: [item.lng, item.lat],
      // ... другие свойства
    })),
  [data]
);

// ❌ Плохо: Создание объектов в render
const markers = data.map((item) => ({
  id: item.id,
  coordinates: [item.lng, item.lat],
}));
```

### 2. Управление состоянием

```tsx
// ✅ Хорошо: Централизованное управление состоянием
const [mapState, setMapState] = useState({
  center: [82.920412, 55.030111],
  zoom: 13,
  selectedMarker: null,
});

// ❌ Плохо: Разрозненное состояние
const [center, setCenter] = useState([82.920412, 55.030111]);
const [zoom, setZoom] = useState(13);
const [selectedMarker, setSelectedMarker] = useState(null);
```

### 3. Обработка ошибок

```tsx
const handleWebViewError = (error: WebViewErrorEvent) => {
  console.error('Ошибка WebView:', error);
  // Показать пользователю сообщение об ошибке
  Alert.alert('Ошибка', 'Не удалось загрузить карту');
};

<DMap options={{ key: 'YOUR_API_KEY' }} onWebViewError={handleWebViewError} />;
```

### 4. Мемоизация компонентов

```tsx
// ✅ Хорошо: Мемоизация для предотвращения лишних рендеров
const Marker = React.memo(({ marker }) => (
  <DMarker
    uniqueId={marker.id}
    options={marker.options}
    onPress={marker.onPress}
  />
));

// ❌ Плохо: Компонент перерендеривается при каждом изменении
const Marker = ({ marker }) => (
  <DMarker
    uniqueId={marker.id}
    options={marker.options}
    onPress={marker.onPress}
  />
);
```

## Следующие шаги

- [Компоненты](COMPONENTS.md) - Подробное описание всех компонентов
- [API Справочник](API.md) - Полный справочник по API
- [Примеры](EXAMPLES.md) - Готовые примеры приложений

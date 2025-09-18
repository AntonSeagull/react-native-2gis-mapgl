# Примеры

## Базовые примеры

### 1. Простая карта

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

### 2. Карта с маркером

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

### 3. Карта с несколькими объектами

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DMap,
  DMarker,
  DLabel,
  DPolyline,
  DPolygon,
} from 'react-native-2gis-mapgl';

export default function MultiObjectMap() {
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
        {/* Маркер */}
        <DMarker
          uniqueId="marker1"
          options={{
            coordinates: [82.920412, 55.030111],
            icon: 'https://example.com/marker.png',
            size: [32, 32],
          }}
        />

        {/* Текстовая метка */}
        <DLabel
          uniqueId="label1"
          options={{
            coordinates: [82.920412, 55.030111],
            text: 'Новосибирск',
            color: '#000000',
            fontSize: 16,
          }}
        />

        {/* Линия */}
        <DPolyline
          uniqueId="route1"
          options={{
            coordinates: [
              [82.920412, 55.030111],
              [82.930412, 55.040111],
            ],
            width: 5,
            color: '#ff0000',
          }}
        />

        {/* Полигон */}
        <DPolygon
          uniqueId="area1"
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
          }}
        />
      </DMap>
    </View>
  );
}
```

## Продвинутые примеры

### 4. Интерактивная карта с управлением

```tsx
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Text, Alert } from 'react-native';
import { DMap, DMarker, type DMapRef } from 'react-native-2gis-mapgl';

export default function InteractiveMap() {
  const mapRef = useRef<DMapRef>(null);
  const [mapState, setMapState] = useState({
    center: [82.920412, 55.030111],
    zoom: 13,
    rotation: 0,
    pitch: 0,
  });

  const handleMapMove = (event: any) => {
    setMapState({
      center: event.center || [0, 0],
      zoom: event.zoom || 0,
      rotation: event.rotation || 0,
      pitch: event.pitch || 0,
    });
  };

  const goToMoscow = () => {
    mapRef.current?.flyTo({ lat: 55.7558, lng: 37.6176 }, 15, {
      animate: true,
      duration: 2000,
      easing: 'easeOutCubic',
    });
  };

  const showTraffic = () => {
    mapRef.current?.showTraffic();
  };

  const hideTraffic = () => {
    mapRef.current?.hideTraffic();
  };

  const rotateMap = () => {
    const newRotation = (mapState.rotation + 45) % 360;
    mapRef.current?.setRotation(newRotation, {
      animate: true,
      duration: 1000,
      easing: 'easeInOutSine',
    });
  };

  const handleMarkerPress = () => {
    Alert.alert('Маркер', 'Маркер нажат!');
  };

  return (
    <View style={styles.container}>
      <DMap
        ref={mapRef}
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: mapState.center,
          zoom: mapState.zoom,
        }}
        onMove={handleMapMove}
        onZoom={(event) => console.log('Масштаб:', event.zoom)}
        onRotation={(event) => console.log('Поворот:', event.rotation)}
        onPitch={(event) => console.log('Наклон:', event.pitch)}
      >
        <DMarker
          uniqueId="mainMarker"
          options={{
            coordinates: [82.920412, 55.030111],
            icon: 'https://example.com/marker.png',
            size: [32, 32],
          }}
          onPress={handleMarkerPress}
        />
      </DMap>

      <View style={styles.controls}>
        <Button title="Москва" onPress={goToMoscow} />
        <Button title="Пробки" onPress={showTraffic} />
        <Button title="Скрыть пробки" onPress={hideTraffic} />
        <Button title="Повернуть" onPress={rotateMap} />
      </View>

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
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
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

### 5. Карта с маршрутом

```tsx
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { DMap, DPolyline, DMarker } from 'react-native-2gis-mapgl';

export default function RouteMap() {
  const [showRoute, setShowRoute] = useState(false);

  const routeCoordinates = [
    [82.920412, 55.030111], // Начальная точка
    [82.930412, 55.040111], // Промежуточная точка
    [82.940412, 55.050111], // Конечная точка
  ];

  const toggleRoute = () => {
    setShowRoute(!showRoute);
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
        autoFitBounds={{
          top: 100,
          bottom: 100,
          left: 100,
          right: 100,
        }}
      >
        {/* Начальная точка */}
        <DMarker
          uniqueId="startMarker"
          options={{
            coordinates: routeCoordinates[0],
            icon: 'https://example.com/start-marker.png',
            size: [24, 24],
            anchor: [12, 24],
          }}
        />

        {/* Конечная точка */}
        <DMarker
          uniqueId="endMarker"
          options={{
            coordinates: routeCoordinates[2],
            icon: 'https://example.com/end-marker.png',
            size: [24, 24],
            anchor: [12, 24],
          }}
        />

        {/* Маршрут */}
        {showRoute && (
          <DPolyline
            uniqueId="route"
            options={{
              coordinates: routeCoordinates,
              width: 6,
              color: '#007bff',
              dashLength: 10,
              gapLength: 5,
              gapColor: '#ffffff',
              zIndex: 5,
            }}
          />
        )}
      </DMap>

      <View style={styles.controls}>
        <Button
          title={showRoute ? 'Скрыть маршрут' : 'Показать маршрут'}
          onPress={toggleRoute}
        />
      </View>
    </View>
  );
}
```

### 6. Карта с областями

```tsx
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { DMap, DPolygon, DMarker } from 'react-native-2gis-mapgl';

export default function AreaMap() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const areas = [
    {
      id: 'area1',
      name: 'Центральный район',
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
    },
    {
      id: 'area2',
      name: 'Северный район',
      coordinates: [
        [
          [82.930412, 55.040111],
          [82.940412, 55.040111],
          [82.940412, 55.050111],
          [82.930412, 55.050111],
          [82.930412, 55.040111],
        ],
      ],
      color: '#00ff0080',
      strokeColor: '#00ff00',
    },
  ];

  const selectArea = (areaId: string) => {
    setSelectedArea(selectedArea === areaId ? null : areaId);
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
        autoFitBounds={{
          top: 100,
          bottom: 100,
          left: 100,
          right: 100,
        }}
      >
        {areas.map((area) => (
          <DPolygon
            key={area.id}
            uniqueId={area.id}
            options={{
              coordinates: area.coordinates,
              color: selectedArea === area.id ? '#ffff0080' : area.color,
              strokeColor:
                selectedArea === area.id ? '#ffff00' : area.strokeColor,
              strokeWidth: selectedArea === area.id ? 3 : 2,
              zIndex: selectedArea === area.id ? 10 : 2,
              interactive: true,
            }}
          />
        ))}

        {/* Центры областей */}
        {areas.map((area) => (
          <DMarker
            key={`center-${area.id}`}
            uniqueId={`center-${area.id}`}
            options={{
              coordinates: [
                (area.coordinates[0][0][0] + area.coordinates[0][2][0]) / 2,
                (area.coordinates[0][0][1] + area.coordinates[0][2][1]) / 2,
              ],
              icon: 'https://example.com/area-marker.png',
              size: [20, 20],
              anchor: [10, 10],
            }}
          />
        ))}
      </DMap>

      <View style={styles.controls}>
        {areas.map((area) => (
          <Button
            key={area.id}
            title={area.name}
            onPress={() => selectArea(area.id)}
            color={selectedArea === area.id ? '#ffff00' : undefined}
          />
        ))}
      </View>
    </View>
  );
}
```

### 7. Карта с HTML маркерами

```tsx
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { DMap, DHtmlMarker, DMarker } from 'react-native-2gis-mapgl';

export default function HtmlMarkerMap() {
  const [showHtmlMarkers, setShowHtmlMarkers] = useState(false);

  const locations = [
    {
      id: 'location1',
      coordinates: [82.920412, 55.030111],
      name: 'Торговый центр',
      type: 'shopping',
    },
    {
      id: 'location2',
      coordinates: [82.930412, 55.040111],
      name: 'Ресторан',
      type: 'restaurant',
    },
    {
      id: 'location3',
      coordinates: [82.940412, 55.050111],
      name: 'Отель',
      type: 'hotel',
    },
  ];

  const getMarkerHtml = (location: any) => {
    const colors = {
      shopping: '#007bff',
      restaurant: '#28a745',
      hotel: '#ffc107',
    };

    return `
      <div style="
        background: ${colors[location.type as keyof typeof colors]};
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        white-space: nowrap;
      ">
        ${location.name}
      </div>
    `;
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
        autoFitBounds={{
          top: 100,
          bottom: 100,
          left: 100,
          right: 100,
        }}
      >
        {/* Обычные маркеры */}
        {locations.map((location) => (
          <DMarker
            key={`marker-${location.id}`}
            uniqueId={`marker-${location.id}`}
            options={{
              coordinates: location.coordinates,
              icon: 'https://example.com/location-marker.png',
              size: [24, 24],
              anchor: [12, 24],
            }}
          />
        ))}

        {/* HTML маркеры */}
        {showHtmlMarkers &&
          locations.map((location) => (
            <DHtmlMarker
              key={`html-${location.id}`}
              uniqueId={`html-${location.id}`}
              options={{
                coordinates: location.coordinates,
                html: getMarkerHtml(location),
                anchor: [0, 0],
                zIndex: 10,
                interactive: true,
              }}
            />
          ))}
      </DMap>

      <View style={styles.controls}>
        <Button
          title={
            showHtmlMarkers ? 'Скрыть HTML маркеры' : 'Показать HTML маркеры'
          }
          onPress={() => setShowHtmlMarkers(!showHtmlMarkers)}
        />
      </View>
    </View>
  );
}
```

### 8. Карта с анимациями

```tsx
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { DMap, DMarker, type DMapRef } from 'react-native-2gis-mapgl';

export default function AnimatedMap() {
  const mapRef = useRef<DMapRef>(null);
  const [animationStep, setAnimationStep] = useState(0);

  const locations = [
    { name: 'Новосибирск', coordinates: [82.920412, 55.030111], zoom: 13 },
    { name: 'Москва', coordinates: [37.6176, 55.7558], zoom: 15 },
    { name: 'Санкт-Петербург', coordinates: [30.3351, 59.9311], zoom: 14 },
    { name: 'Екатеринбург', coordinates: [60.6122, 56.8431], zoom: 12 },
  ];

  const animateToNextLocation = () => {
    const nextStep = (animationStep + 1) % locations.length;
    const location = locations[nextStep];

    setAnimationStep(nextStep);

    // Анимация центра
    mapRef.current?.setCenter(location.coordinates, {
      animate: true,
      duration: 2000,
      easing: 'easeOutCubic',
    });

    // Анимация масштаба
    mapRef.current?.setZoom(location.zoom, {
      animate: true,
      duration: 2000,
      easing: 'easeOutCubic',
      useHeightForAnimation: true,
    });

    // Анимация поворота
    mapRef.current?.setRotation(0, {
      animate: true,
      duration: 1500,
      easing: 'easeInOutSine',
      normalize: true,
    });

    // Анимация наклона
    mapRef.current?.setPitch(0, {
      animate: true,
      duration: 1000,
      easing: 'easeOutQuad',
    });
  };

  const rotateMap = () => {
    const rotation = Math.random() * 360;
    mapRef.current?.setRotation(rotation, {
      animate: true,
      duration: 2000,
      easing: 'easeInOutElastic',
    });
  };

  const pitchMap = () => {
    const pitch = Math.random() * 60;
    mapRef.current?.setPitch(pitch, {
      animate: true,
      duration: 1500,
      easing: 'easeOutBack',
    });
  };

  return (
    <View style={styles.container}>
      <DMap
        ref={mapRef}
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: locations[0].coordinates,
          zoom: locations[0].zoom,
        }}
      >
        <DMarker
          uniqueId="animatedMarker"
          options={{
            coordinates: locations[animationStep].coordinates,
            icon: 'https://example.com/animated-marker.png',
            size: [32, 32],
            anchor: [16, 32],
          }}
        />
      </DMap>

      <View style={styles.controls}>
        <Button title="Следующее место" onPress={animateToNextLocation} />
        <Button title="Повернуть" onPress={rotateMap} />
        <Button title="Наклонить" onPress={pitchMap} />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          Текущее место: {locations[animationStep].name}
        </Text>
        <Text style={styles.infoText}>
          Координаты: {locations[animationStep].coordinates[0].toFixed(4)},{' '}
          {locations[animationStep].coordinates[1].toFixed(4)}
        </Text>
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
  info: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#333',
  },
});
```

## Полные примеры приложений

### 9. Карта с поиском мест

```tsx
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Text,
} from 'react-native';
import { DMap, DMarker, type DMapRef } from 'react-native-2gis-mapgl';

interface Place {
  id: string;
  name: string;
  coordinates: [number, number];
  description: string;
}

export default function SearchableMap() {
  const mapRef = useRef<DMapRef>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const places: Place[] = [
    {
      id: '1',
      name: 'Новосибирский театр оперы и балета',
      coordinates: [82.920412, 55.030111],
      description: 'Главный театр Новосибирска',
    },
    {
      id: '2',
      name: 'Площадь Ленина',
      coordinates: [82.930412, 55.040111],
      description: 'Центральная площадь города',
    },
    {
      id: '3',
      name: 'Новосибирский зоопарк',
      coordinates: [82.940412, 55.050111],
      description: 'Один из крупнейших зоопарков России',
    },
  ];

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectPlace = (place: Place) => {
    setSelectedPlace(place);
    mapRef.current?.flyTo(
      { lat: place.coordinates[1], lng: place.coordinates[0] },
      16,
      {
        animate: true,
        duration: 1500,
        easing: 'easeOutCubic',
      }
    );
  };

  return (
    <View style={styles.container}>
      <DMap
        ref={mapRef}
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: [82.930412, 55.040111],
          zoom: 13,
        }}
      >
        {places.map((place) => (
          <DMarker
            key={place.id}
            uniqueId={place.id}
            options={{
              coordinates: place.coordinates,
              icon:
                selectedPlace?.id === place.id
                  ? 'https://example.com/selected-marker.png'
                  : 'https://example.com/marker.png',
              size: [32, 32],
              anchor: [16, 32],
            }}
          />
        ))}
      </DMap>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск мест..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {searchText.length > 0 && (
          <FlatList
            style={styles.searchResults}
            data={filteredPlaces}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Button title={item.name} onPress={() => selectPlace(item)} />
            )}
          />
        )}
      </View>

      {selectedPlace && (
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{selectedPlace.name}</Text>
          <Text style={styles.placeDescription}>
            {selectedPlace.description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  searchResults: {
    maxHeight: 200,
  },
  placeInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeDescription: {
    fontSize: 14,
    color: '#666',
  },
});
```

## Следующие шаги

- [Установка](INSTALLATION.md) - Инструкция по установке
- [Использование](USAGE.md) - Базовые примеры использования
- [Компоненты](COMPONENTS.md) - Описание всех компонентов
- [API Справочник](API.md) - Полный справочник по API

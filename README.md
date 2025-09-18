# react-native-2gis-mapgl

React Native-обёртка над 2GIS MapGL JS API, позволяющая встраивать интерактивные карты 2ГИС в мобильные приложения.

## 🚀 Быстрый старт

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DMap, DMarker } from 'react-native-2gis-mapgl';

export default function App() {
  return (
    <View style={styles.container}>
      <DMap
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY', // Получите ключ на https://dev.2gis.com/
          center: [82.920412, 55.030111], // Новосибирск
          zoom: 13,
        }}
      >
        <DMarker
          uniqueId="marker1"
          options={{
            coordinates: [82.920412, 55.030111],
            icon: 'https://example.com/marker.png',
            size: [32, 32],
          }}
          onPress={() => console.log('Маркер нажат!')}
        />
      </DMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
```

## 📚 Документация

- **[Установка](docs/INSTALLATION.md)** - Подробная инструкция по установке и настройке
- **[Использование](docs/USAGE.md)** - Примеры использования и лучшие практики
- **[Компоненты](docs/COMPONENTS.md)** - Описание всех компонентов и их пропсов
- **[API Справочник](docs/API.md)** - Полный справочник по API и методам
- **[Примеры](docs/EXAMPLES.md)** - Готовые примеры приложений

## 🎯 Основные возможности

- ✅ **Интерактивные карты 2ГИС** с поддержкой всех функций MapGL API
- ✅ **Маркеры и метки** с поддержкой кастомных иконок и HTML-контента
- ✅ **Линии и полигоны** для отображения маршрутов и областей
- ✅ **Анимации** для плавных переходов и эффектов
- ✅ **События карты** для обработки взаимодействий пользователя
- ✅ **Типизация TypeScript** для лучшего опыта разработки
- ✅ **Автоматическая подгонка границ** для отображения всех объектов

## 🛠 Поддерживаемые платформы

- ✅ **iOS** (11.0+)
- ✅ **Android** (API 21+)
- ❌ **Web** (планируется)

## 📋 Требования

- React Native >= 0.60
- @react-native-async-storage/async-storage
- react-native-webview

## 🔑 Получение API ключа

1. Перейдите на [dev.2gis.com](https://dev.2gis.com/)
2. Зарегистрируйтесь или войдите в аккаунт
3. Создайте новый проект
4. Получите API ключ в разделе "Ключи"

## 🤝 Вклад в проект

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## 📄 Лицензия

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

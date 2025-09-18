# Установка

## Требования

- React Native >= 0.60
- iOS >= 11.0
- Android API >= 21
- Node.js >= 14

## Установка пакета

```bash
npm install react-native-2gis-mapgl
```

или

```bash
yarn add react-native-2gis-mapgl
```

## Установка зависимостей

Плагин требует следующие peer dependencies:

```bash
npm install @react-native-async-storage/async-storage react-native-webview
```

или

```bash
yarn add @react-native-async-storage/async-storage react-native-webview
```

## Настройка для iOS

### 1. Установка CocoaPods зависимостей

```bash
cd ios && pod install
```

### 2. Настройка Info.plist (опционально)

Если вы хотите использовать кастомные стили карт, добавьте в `ios/YourApp/Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### 3. Настройка разрешений (опционально)

Для доступа к геолокации добавьте в `ios/YourApp/Info.plist`:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Это приложение использует геолокацию для отображения вашего местоположения на карте</string>
```

## Настройка для Android

### 1. Настройка разрешений

Добавьте в `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### 2. Настройка Network Security Config (опционально)

Если вы используете HTTP-ресурсы, создайте файл `android/app/src/main/res/xml/network_security_config.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">example.com</domain>
    </domain-config>
</network-security-config>
```

И добавьте в `android/app/src/main/AndroidManifest.xml`:

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
```

## Получение API ключа

1. Перейдите на [dev.2gis.com](https://dev.2gis.com/)
2. Зарегистрируйтесь или войдите в аккаунт
3. Создайте новый проект
4. Получите API ключ в разделе "Ключи"
5. Добавьте ключ в настройки карты:

```tsx
<DMap
  options={{
    key: 'YOUR_API_KEY', // Замените на ваш ключ
    center: [82.920412, 55.030111],
    zoom: 13,
  }}
/>
```

## Проверка установки

Создайте простой тест для проверки установки:

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DMap } from 'react-native-2gis-mapgl';

export default function TestMap() {
  return (
    <View style={styles.container}>
      <DMap
        style={styles.map}
        options={{
          key: 'YOUR_API_KEY',
          center: [82.920412, 55.030111],
          zoom: 13,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
```

## Устранение проблем

### Проблема: WebView не загружается

**Решение:**

- Убедитесь, что у вас установлен `react-native-webview`
- Проверьте подключение к интернету
- Убедитесь, что API ключ корректный

### Проблема: Карта не отображается на Android

**Решение:**

- Проверьте разрешения в AndroidManifest.xml
- Убедитесь, что установлены все зависимости
- Перезапустите Metro bundler

### Проблема: Карта не отображается на iOS

**Решение:**

- Выполните `cd ios && pod install`
- Очистите кэш: `npx react-native start --reset-cache`
- Пересоберите проект

### Проблема: Ошибки TypeScript

**Решение:**

- Убедитесь, что установлены типы: `npm install @types/react @types/react-native`
- Проверьте версию TypeScript: `npm install typescript@latest`

## Дополнительные настройки

### Настройка Metro для лучшей производительности

Добавьте в `metro.config.js`:

```javascript
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    resolver: {
      assetExts: [...assetExts, 'svg'],
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
```

### Настройка для production

1. Убедитесь, что API ключ добавлен в переменные окружения
2. Настройте правильные домены для ресурсов карт
3. Оптимизируйте изображения маркеров
4. Настройте кэширование для статических ресурсов

## Следующие шаги

После успешной установки переходите к:

- [Использование](USAGE.md) - Примеры использования
- [Компоненты](COMPONENTS.md) - Описание компонентов
- [API Справочник](API.md) - Полный справочник API

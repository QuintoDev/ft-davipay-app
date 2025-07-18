# ft-davipay-app

![platform](https://img.shields.io/badge/platform-React--Native-blue)
![state](https://img.shields.io/badge/state-managed--context-red)
![license](https://img.shields.io/badge/license-MIT-lightgrey)

Aplicación móvil para realizar transferencias y consultar saldo entre usuarios, como parte del ecosistema DaviPay. Implementada con React Native, autenticación JWT y comunicación con un backend REST seguro.

---

## Características

- Login con número celular y OTP simulado (`123456`)
- Almacenamiento seguro del token JWT
- Consulta de saldo en tiempo real
- Realización de transferencias con validaciones
- Historial de transacciones (paginado)
- UI responsiva y validación de formularios
- Manejo de errores y sesión expirada
- Navegación protegida y estado global vía Context API

---

## Instalación local

1. **Clonar el repositorio:**

```bash
git clone https://github.com/usuario/ft-davipay-app.git
cd ft-davipay-app
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ajustar la variable `apiUrl` en `app.config.js`:**

Edita el archivo `app.config.js` para establecer la URL base del backend:

```js
// app.config.js
export default {
    // ...
    extra: {
        apiUrl: "http://IP_LOCAL:3000/api",
    },
};
```


4. **Ejecutar en desarrollo:**

```bash
npm start
```

> Usa la app de Expo Go para probarlo en tu dispositivo.

---

## Navegación y Pantallas

| Pantalla      | Descripción                                                   |
|---------------|---------------------------------------------------------------|
| `Login`       | Ingreso con número celular y OTP                              |
| `Home`        | Muestra el saldo y últimos movimientos                        |
| `Transferir`  | Permite enviar dinero a otro número con validación            |
| `Movimientos` | Lista paginada del historial de transferencias                |

---

## Estructura del Proyecto

```
├── components/            # Componentes reutilizables como MovimientoCard
├── context/               # Contexto de autenticación
├── screens/               # Pantallas principales (Login, Home, Transferir)
├── services/              # Cliente Axios configurado con interceptores
├── navigation/            # Navegación con React Navigation
├── styles/ (opcional)     # Archivo de estilos desacoplado
└── App.tsx                # Punto de entrada de la app
```

---

## Tecnologías utilizadas

- React Native + Expo
- Context API (Auth)
- React Navigation
- Axios
- React Hook Form + Yup
- AsyncStorage
- react-native-confirmation-code-field

---

## Licencia

Este proyecto está bajo la licencia MIT.


# 🚀 SurveyFlow - SDK de Encuestas Internas

**SurveyFlow** es un SDK profesional de encuestas internas desarrollado con React, TypeScript, Node.js y Express. Diseñado para ser modular, reutilizable y fácil de integrar en cualquier aplicación.

## 📋 Características

### ✨ SDK Frontend
- **Componente reutilizable** `<SurveyWidget />` 
- **Tipado fuerte** con TypeScript
- **Múltiples tipos de preguntas**: texto, radio, checkbox, escala, sí/no, etc.
- **Navegación fluida** entre preguntas con validación inteligente
- **Barra de progreso** visual
- **Validación estricta**: primeras preguntas obligatorias, últimas opcionales
- **Límites de caracteres**: 200 chars para texto, 500 para textarea
- **UI Dark Mode** profesional y responsive
- **Contador de caracteres** en tiempo real

### 🔧 Backend API
- **RESTful API** con Express y TypeScript
- **Base de datos SQLite** con datos de ejemplo
- **Endpoints para**:
  - Obtener encuestas: `GET /api/surveys/:id`
  - Enviar respuestas: `POST /api/responses` 
  - Consultar métricas: `GET /api/surveys/:id/metrics`
  - Health check: `GET /health`
- **Métricas inteligentes**: Complete vs Partial submissions
- **Visualización adaptativa**: barras para opciones, texto truncado para respuestas abiertas
- **CORS configurado** para desarrollo

### 📱 App de Demostración
- **Integración completa** del SDK
- **Dashboard de métricas** con visualización profesional
- **UI Dark Mode** moderna y elegante
- **Métricas diferenciadas**: Complete vs Partial submissions
- **Ratings con estrellitas** (1⭐ - 5⭐) para escalas
- **Interfaz intuitiva** para testing completo

## 🌟 Funcionalidades Extra

Más allá de los requerimientos del challenge, **SurveyFlow** incluye:

- **🎨 Dark Mode UI**: Diseño moderno y profesional con tema oscuro
- **⚡ Validación Inteligente**: Preguntas obligatorias vs opcionales con feedback visual
- **📊 Métricas Avanzadas**: Diferenciación entre submissions completas y parciales
- **🔤 Límites de Caracteres**: Prevención de spam con contadores en tiempo real
- **⭐ Rating Visual**: Escalas numéricas con estrellitas (1⭐ - 5⭐)
- **📝 Visualización Adaptativa**: Texto truncado para respuestas abiertas, barras para opciones
- **💚 Health Check**: Endpoint de monitoreo para el backend
- **🚀 Progress Bar**: Navegación visual entre preguntas

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18.3+, TypeScript 5.5+, Vite 5.4+
- **Backend**: Node.js 20+, Express 4.19+, SQLite3 5.1+
- **Herramientas**: NPM Workspaces, TSX para desarrollo

## 🚀 Instalación y Uso

### Paso 1: Clonar e instalar dependencias

```bash
# Clonar el repositorio
git clone <tu-repo>
cd surveyflow

# Instalar todas las dependencias
npm install
```

### Paso 2: Ejecutar el backend

```bash
# Desde la carpeta raíz, iniciar el backend
cd backend
npm run dev
```

El backend estará corriendo en `http://localhost:3001`

### Paso 3: Ejecutar la app de demostración

En otra terminal:

```bash
# Desde la carpeta raíz, iniciar la app
cd app  
npm run dev
```

La app estará corriendo en `http://localhost:3000`

### Paso 4: ¡Probar SurveyFlow!

1. Abre `http://localhost:3000` en tu navegador
2. Completa la encuesta de ejemplo
3. Haz clic en "📊 View Metrics" para ver las métricas agregadas
4. Usa "🔄 Reset Demo" para probar nuevamente

## 📁 Estructura del Proyecto

```
surveyflow/
├── sdk/                    # SDK React + TypeScript
│   ├── src/
│   │   ├── SurveyWidget.tsx   # Componente principal
│   │   ├── types.ts           # Tipos TypeScript
│   │   └── index.ts           # Exportaciones
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/                # API Node.js + Express
│   ├── src/
│   │   ├── server.ts          # Servidor principal
│   │   ├── database.ts        # Base de datos SQLite
│   │   └── types.ts           # Tipos del backend
│   ├── package.json
│   └── tsconfig.json
├── app/                    # App de demostración
│   ├── src/
│   │   ├── App.tsx            # Componente principal
│   │   └── main.tsx           # Punto de entrada
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── package.json            # Configuración raíz
└── README.md
```

## 🔌 API Endpoints

### GET `/api/surveys/:id`
Obtiene una encuesta por ID.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": "survey-1",
    "title": "Customer Satisfaction Survey",
    "description": "Help us improve our service",
    "questions": [...]
  }
}
```

### POST `/api/responses`
Envía una respuesta de encuesta.

**Body:**
```json
{
  "surveyId": "survey-1",
  "answers": [
    {
      "questionId": "q1",
      "value": "satisfied"
    }
  ],
  "userId": "optional-user-id"
}
```

### GET `/api/surveys/:id/metrics`
Obtiene métricas agregadas de una encuesta.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "surveyId": "survey-1",
    "surveyTitle": "Customer Satisfaction Survey",
    "totalQuestions": 3,
    "metrics": [
      {
        "questionId": "q1",
        "questionText": "How satisfied are you?",
        "questionType": "radio",
        "totalResponses": 5,
        "responseDistribution": {
          "satisfied": 3,
          "very_satisfied": 2
        }
      }
    ]
  }
}
```

### GET `/health`
Health check del servidor.

**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2025-07-11T04:30:00.000Z"
}
```

## 💡 Uso del SDK en tu aplicación

### Instalación
```bash
npm install @surveyflow/sdk
```

### Uso básico
```tsx
import React from 'react';
import { SurveyWidget } from '@surveyflow/sdk';

const MyApp = () => {
  return (
    <SurveyWidget
      surveyId="survey-1"
      apiUrl="http://localhost:3001"
      onComplete={(response) => {
        console.log('Survey completed:', response);
      }}
      onError={(error) => {
        console.error('Survey error:', error);
      }}
    />
  );
};
```

## 🎯 Decisiones Técnicas

### ¿Por qué estas tecnologías?

1. **React + TypeScript**: Máxima productividad y tipado fuerte para prevenir errores
2. **Vite**: Build tool moderno y rápido para desarrollo
3. **Express**: Framework minimalista y probado para APIs
4. **SQLite**: Base de datos simple para demostración, fácil migración a PostgreSQL/MySQL
5. **NPM Workspaces**: Gestión simplificada de monorepo sin herramientas complejas

### Arquitectura del SDK

- **Modular**: Cada componente tiene una responsabilidad específica
- **Reutilizable**: Exportable como paquete npm independiente  
- **Tipado fuerte**: Prevención de errores en tiempo de compilación
- **Flexible**: Soporta múltiples tipos de preguntas y configuraciones

### Escalabilidad

- **Base de datos**: Preparada para migrar a PostgreSQL con Prisma
- **Autenticación**: Estructura lista para JWT/OAuth
- **Cacheo**: Fácil integración con Redis
- **Validación**: Preparado para esquemas Zod más complejos

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Ejecuta todos los proyectos
npm run build        # Construye todos los proyectos

# Por proyecto individual
cd backend && npm run dev    # Solo backend
cd app && npm run dev        # Solo app demo
cd sdk && npm run build      # Solo SDK
```

## 📝 Próximos Pasos

- [ ] Agregar validación de formularios más robusta
- [ ] Implementar persistencia con PostgreSQL + Prisma  
- [ ] Añadir autenticación JWT
- [ ] Tests unitarios con Vitest
- [ ] Documentación interactiva con Storybook
- [ ] Deploy con Docker + Docker Compose

## 🤝 Contribución

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

**SurveyFlow** - Creado con ❤️ y las mejores prácticas de desarrollo moderno.
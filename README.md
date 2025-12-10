# Frontend - Sistema de Reservación de Canchas

## Instalación

```bash
npm install
```

## Ejecutar en Desarrollo

```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## Build para Producción

```bash
npm run build
```

## Características Implementadas

### Rutas
- `/` - Página de inicio
- `/login` - Inicio de sesión
- `/register` - Registro de usuario
- `/canchas` - Listado de canchas
- `/canchas/:id` - Detalle de cancha (usa useParams)
- `/mis-reservas` - Reservas del usuario (ruta protegida)

### Componentes
- `Navbar` - Navegación principal
- `CanchaCard` - Tarjeta de cancha reutilizable

### Custom Hooks
- `useAuth` - Manejo de autenticación y localStorage

### Formularios con Validación
- Registro de usuario (validación completa)
- Login
- Reserva de cancha

### Estado y Efectos
- `useState` para manejo de estado local
- `useEffect` para llamadas a API
- `useParams` para parámetros de ruta

### Almacenamiento
- `localStorage` para token y datos de usuario

### Responsividad
- Diseño adaptable de 320px a 2000px
- Media queries para móviles y tablets

## Despliegue en Vercel

```bash
npm i -g vercel
vercel
```

O conectar el repositorio directamente en [vercel.com](https://vercel.com)

## Variables de Entorno

Crear archivo `.env.local`:
```
REACT_APP_API_URL=http://localhost:5000
```
### Autoría
   - `ESTUDIANTE`: *Gianella Lopez*
   - `INSTITUCION`: *UTN - Universidad Tecnológica Nacional*
   - `TITULO`: *Diplomatura en Desarrollo Web Full Stack*
   - *Proyecto Final Integrador*

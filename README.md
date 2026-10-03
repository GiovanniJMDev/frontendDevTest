# Mobile Shop

Mini aplicación SPA para comprar dispositivos móviles (prueba Front-End ITX): listado de productos con búsqueda en tiempo real y vista de detalle con selectores de color y almacenamiento.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, TanStack Query, Zustand, Vitest, Storybook.

## Cómo ejecutarlo

```bash
pnpm install
pnpm start            # modo desarrollo (Vite)
pnpm build            # compilación de producción
pnpm test             # tests (Vitest)
pnpm lint             # comprobación de código (Oxlint)
pnpm storybook        # catálogo de componentes
```

La URL de la API se puede cambiar con `VITE_API_BASE_URL` (por defecto `https://itx-frontend-test.onrender.com`).

## Decisiones de diseño

### Caché de la API
Las peticiones `GET /api/product` y `GET /api/product/:id` pasan por TanStack Query con expiración de 1 hora (`staleTime`/`gcTime`), así que no se repiten en ese intervalo. La caché vive en memoria, en cliente.

### Carrito híbrido: API + estado local

El enunciado indica que `POST /api/cart` devuelve el número de productos de la cesta y que ese valor se muestra en la cabecera. **Aquí se usa la API, pero el contador no depende de su respuesta.** Se mantiene un carrito local (Zustand, persistido en `localStorage`) que es la fuente de verdad de lo que ve el usuario.

**Por qué:**

- La API solo sabe **añadir**. No existe endpoint para quitar un producto ni para cambiar cantidades, y su `count` no distingue productos. Si la cabecera mostrara el `count` de la API, no podríamos ofrecer `−`, papelera ni cantidades, y el contador podría no coincidir con lo que hay en el carrito.
- Esperar la respuesta de la API (que en el entorno de pruebas puede tardar por el arranque en frío del servidor) **bloquea la experiencia**: el usuario pulsa «Añadir» y no ve nada hasta que responde, o ve un error si falla.

**Cómo funciona:**

1. Al pulsar «Añadir al carrito» en el detalle, el producto se **añade al carrito local al instante** (`addProduct`). Si hay 4 productos, la cabecera muestra 4.
2. En paralelo, `useAddToCart` envía `{ id, colorCode, storageCode }` a `POST /api/cart` **en segundo plano**. No se espera su respuesta ni se muestra su `count`.
3. Si la API falla, el carrito local no se revierte: la compra del usuario nunca se pierde por un fallo de red.
4. Quitar unidades (`−`, papelera) y los botones `+` del drawer y del checkout operan **solo en local**, porque la API no tiene endpoint equivalente y esos botones no tienen color ni almacenamiento elegidos.

**Contrapartida asumida:** la API y el carrito local pueden divergir (por ejemplo, tras quitar un producto). Es una decisión consciente a favor de la experiencia de usuario. Si la API ofreciera endpoints de lectura y borrado del carrito, el siguiente paso sería sincronizar en ambos sentidos.

### Vistas
Además de las dos vistas pedidas (listado y detalle) hay un carrito lateral (drawer) y una página `/checkout` como extra.

### Tema claro/oscuro
Clase `dark` en `<html>`, persistida en `localStorage`, con tokens semánticos en `src/index.css`.

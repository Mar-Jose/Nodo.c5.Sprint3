# Nombre de tu tienda

🔗 **Demo:** https://sprint-3-react-mj.netlify.app

## Qué es
Intenta ser una página web que permite ver productos, agregar al carrito y simular compras

## Cómo correrlo:
*
En https://sprint-3-react-mj.netlify.app

*
cd vite-project
pnpm dev
http://localhost:5179/


## Mis contextos
CarritoContext.jsx:
*Guarda: carrito, cantidadTotal, total, agregar, cambiarCantidad, quitar, vaciar y estaEnElCarrito que viene de tu hook useCarrito.
*Lo Consume: Header para el contador, ProductCard para agregar y CartView para mostrar y modificar cantidades.
*Global porque el carrito debe mantenerse al navegar entre rutas y persistir con useLocalStorage, si fuera local se vaciaría al cambiar de vista.

listaContext.jsx:
*Guarda: lista de IDs en favoritos, toggleItem para agregar/sacar y vaciarLista.
*Lo Consume: ProductCard y ListaView para mostrar los productos guardados y favorito.
*Global: porque la lista de deseados debe ser accesible desde cualquier producto y desde la vista de lista sin perder los datos.

themeContext.jsx:
*Guarda: isDarkMode y toggleDarkMode persistido con useLocalStorage('modoOscuro').
*Lo consume: el Provider mismo para poner las clases de fondo y el botón flotante de modo oscuro/claro.
*Global porque el tema afecta a toda la app y debe aplicarse de forma consistente sin tener que pasar la prop isDarkMode por todos los componentes.
## Mis hooks: Qué hace cada uno y qué devuelve. Dos líneas cada uno.

useCarrito:
*Gestiona el carrito con persistencia en localStorage, controla que no supere el stock con limitarCantidad y evita duplicados sumando cantidad.
*Devuelve { carrito, cantidadTotal, total, estaEnElCarrito, agregar, cambiarCantidad, quitar, vaciar }.

useLocalStorage:
*Lee de localStorage con JSON.parse seguro y guarda automáticamente con useEffect cada vez que cambia el valor.
*Devuelve [value, setValue] igual que un useState pero persistente entre recargas.

useToggle:
*Maneja un booleano con un useState y una función que invierte el valor anterior.
*Devuelve [value, toggle] para abrir/cerrar modales, menús o 

## Decisiones de estado: Qué estado NO puse en un contexto y por qué.

*vista en App.jsx:
Guarda en qué pantalla estoy VISTAS.TIENDA / CHECKOUT / CONFIRMACION con useState.
NO lo puse en contexto porque solo App decide qué renderizar en renderVista(). Si fuera global, cualquier card podría cambiar la vista y rompería el flujo.

*abierto y historialPedido en Navbar.jsx:
Guardan si los modales de "Mi lista" y "Pedidos" están abiertos con useState(false).
NO los puse en contexto porque son estados efímeros de UI. Si fueran globales, abrir un modal haría re-render de toda la tienda y se abrirían en todos lados

*nombreCliente y búsqueda local de DulceCard:
nombreCliente guarda el nombre solo para la pantalla de confirmación después de confirmarPedido. isInMyList / isInCart son cálculos derivados con includes(), no estado.
NO los puse en contexto porque son temporales y derivados. Ponerlos global ensuciaría los contextos con datos que solo necesita una vista una vez.

## Prop drilling: antes y después: Cuántas props pasaban de largo antes de Context y cuántas ahora.

*Antes de Context:
Para que DulceCard pudiera agregar al carrito y a la lista, tenía que pasar 5 props de largo:
App -> Tienda -> DulceList -> DulceCard pasaba lista, toggleItem, carrito, agregar, estaEnElCarrito.
App -> Navbar -> Modal pasaba lista, vaciarLista, toggleItem.
Total: 5 props cruzando 2-3 componentes que no las usaban, solo las pasaban. Cada cambio en el carrito hacía re-render de toda la cadena.

*Ahora con Context:
DulceCard hace useListaContext() y useCarritoContext() directo, 0 props de carrito/lista.
Navbar hace useListaContext() directo, 0 props de lista.
Solo queda 1 prop legítimo: Tienda -> DulceList pasa items={itemsFiltrados} que es dato filtrado local, no estado global. No es drilling, es uso directo.
Pasa de 5 props atravesando 3 niveles a 0 props globales.

## Qué generé con IA :Qué partes generaste, qué corregiste a mano y por qué.

*Selección de código del sprint 2 para continuar con el mismo tema en este sprint 3.
*IA Copilot me ayudo en todo el código del sprint 3.
*Lo que corregi a mano fue que copilo asignó el mismo color a las letras y al fondo (cuando el fondo era negro las letras también lo eran) lo que impedía ver el contenido de la página.




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

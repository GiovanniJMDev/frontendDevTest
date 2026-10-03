import { Link } from "react-router";

export const NotFoundPage = () => (
  <div className="py-12 text-center">
    <h1 className="mb-2 text-3xl font-bold">404 - Página no encontrada</h1>
    <p className="mb-4 text-content-muted dark:text-content-muted-dark">La página que buscas no existe.</p>
    <Link to="/" className="text-primary-600 hover:text-primary-800 dark:hover:text-primary-300 hover:underline">
      Volver a la tienda
    </Link>
  </div>
);

export default NotFoundPage;

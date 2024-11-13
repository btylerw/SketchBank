import App from './App.jsx';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage.jsx';

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/home",
        element: <HomePage />,
    }
]

export default routes;
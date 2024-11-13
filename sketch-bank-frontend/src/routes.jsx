import App from './App.jsx';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage.jsx';
import { SignUp } from './SignUp.jsx';

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
    },
    {
        path: "/signup",
        element: <SignUp />,
    }
]

export default routes;
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppContainer from "./layout/AppContainer";
import ErrorPage from "./pages/ErrorPage";
import RootPage from "./pages/RootPage";
import AddVerbForm, {loader as addVerbFormLoader} from "./pages/AddVerbForm";

const router = createBrowserRouter([
    {
        element: <AppContainer/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <RootPage/>
            },
            {
                path: "add-verb",
                element: <AddVerbForm/>,
                loader: addVerbFormLoader
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

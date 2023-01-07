import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppContainer from "./layout/AppContainer";
import ErrorPage from "./pages/ErrorPage";
import RootPage, {loader as rootPageLoader} from "./pages/RootPage";
import AddVerbForm, {loader as addVerbFormLoader} from "./pages/AddVerbForm";
import TrainVerb from "./pages/TrainVerb";

const router = createBrowserRouter([
    {
        element: <AppContainer/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <RootPage/>,
                loader: rootPageLoader
            },
            {
                path: "add-verb",
                element: <AddVerbForm/>,
                loader: addVerbFormLoader
            },
            {
                path: "train-verb",
                element: <TrainVerb/>,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

import React from "react"
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import PathConstants from "./pathConstants"
import Layout from "../layout/layout";

const Home = React.lazy(() => import("../pages/home"))
const CheckPackage = React.lazy(() => import("../pages/checkPackage"))

const configRoutes = [
    {
        path: PathConstants.HOME,
        element: <Home />,
        auth: true,
    },
    {
        path: PathConstants.CHECK_PACKAGE,
        element: <CheckPackage />,
        auth: true,
    },
    
]


export const routes = createBrowserRouter(
    createRoutesFromElements(
        // <Route>
        //     {
        //         configRoutes.map(({ path, element }) =>
        //             <Route key={path} element={
        //                 <ErrorBoundary>
        //                     <Layout>{element}</Layout>
        //                 </ErrorBoundary>
        //             } />
        //         )
        //     }
        // </Route>
        <Route>
            {
                configRoutes.map(({ path, element, auth }) =>
                    auth ? (
                        <Route key={path} element={<Layout> {element} </Layout>}>
                            <Route path={path} element={element} />
                        </Route>
                    ) : (
                        <Route key={path} element={<></>}>
                            <Route path={path} element={element} />
                        </Route>
                    )
                )
            }
        </Route>
    )
);

export default routes
import React from "react"
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import PathConstants from "./pathConstants"
import AuthLayout from "../layout/layout";

// const Login = React.lazy(() => import("../pages/Login/login"))
const Home = React.lazy(() => import("../pages/home"))
// const BillList = React.lazy(() => import("../pages/Bill/billList"))
// const BillAdd = React.lazy(() => import("../pages/Bill/billAdd"))
// const BillEdit = React.lazy(() => import("../pages/Bill/billEdit"))
// const BillDetail = React.lazy(() => import("../pages/Bill/billDetail"))
// const ChequeList = React.lazy(() => import("../pages/Cheque/chequeList"))
// const ChequeAdd = React.lazy(() => import('../pages/Cheque/chequeAdd'))
// const ManagePDF = React.lazy(() => import("../components/TemplatePDF/manage"))
// const ChequePDF = React.lazy(() => import("../components/TemplatePDF/cheque"))

// const ExpenseList = React.lazy(() => import("../pages/Expense/expenseList"))
// const ExpenseAdd = React.lazy(() => import("../pages/Expense/expenseAdd"))
// const ExpenseEdit = React.lazy(() => import("../pages/Expense/expenseEdit"))

const configRoutes = [
    // {
    //     path: PathConstants.LOGIN,
    //     element: <Login />,
    //     auth: false,
    // },
    // {
    //     path: PathConstants.MANAGE_PDF,
    //     element: <ManagePDF />,
    //     auth: false
    // },
    {
        path: PathConstants.HOME,
        element: <Home />,
        auth: true,
    },
    // {
    //     path: PathConstants.BILL,
    //     element: <BillList />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.BILL_ADD,
    //     element: <BillAdd />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.BILL_EDIT,
    //     element: <BillEdit />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.BILL_DETAIL,
    //     element: <BillDetail />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.CHEQUE,
    //     element: <ChequeList />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.CHEQUE_ADD,
    //     element: <ChequeAdd />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.CHEQUE_PDF,
    //     element: <ChequePDF />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.EXPENSES,
    //     element: <ExpenseList />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.EXPENSES_ADD,
    //     element: <ExpenseAdd />,
    //     auth: true
    // },
    // {
    //     path: PathConstants.EXPENSES_EDIT,
    //     element: <ExpenseEdit />,
    //     auth: true
    // },
]


export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {
                configRoutes.map(({ path, element, auth }) =>
                    auth ? (
                        <Route key={path} element={<AuthLayout />}>
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
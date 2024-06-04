import App from 'App';
import AdminDashboard from 'pages/AdminDashboard';
import AdminPanel from 'pages/AdminPanel';
import AllProducts from 'pages/AllProducts';
import AllUsers from 'pages/AllUsers';
import Cart from 'pages/Cart';
import CategoryProduct from 'pages/CategoryProduct';
import ForgotPassword from 'pages/ForgotPassword';
import Home from 'pages/Home';
import Login from 'pages/Login';
import ProductDetails from 'pages/ProductDetails';
import ProfilePage from 'pages/ProfilePage';
import ResetPassword from 'pages/ResetPassword';
import SearchProduct from 'pages/SearchProduct';
import Signup from 'pages/Signup';
import { createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'forgotpassword',
                element:<ForgotPassword/>
            },
            {
                path:'profile',
                element:<ProfilePage/>
            },
            {
                path:'reset-password',
                element:<ResetPassword/>
            },
            {
                path:'signup',
                element:<Signup/>
            },
            {
                path:'my-cart',
                element:<Cart/>
            },
            {
                path:'search',
                element:<SearchProduct/>
            },
            {
                path:'product-category',
                element:<CategoryProduct/>
            },
            {
                path:'product/:productId',
                element:<ProductDetails/>
            },
            {
                path:'admin-panel',
                element:<AdminPanel/>,
                children:[
                    {
                        path:'dashboard',
                        element:<AdminDashboard/>
                    },
                    {
                        path:"all-users",
                        element:<AllUsers/>
                    },
                    {
                        path:'all-products',
                        element:<AllProducts/>
                    }
                ]
            }
        ]
    }
])

export default router;
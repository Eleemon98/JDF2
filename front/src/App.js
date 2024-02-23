import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { AuthContextProvider, AuthContext } from "./context/authContext"; // AuthContextProvider 및 AuthContext 추가
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./style.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const { currentUser } = useContext(AuthContext);
    const { darkMode } =useContext(DarkModeContext);
    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <Navbar />
                    <div style={{ display: "flex" }}>
                        <LeftBar />
                        <div style={{ flex: 6 }}>
                            <Outlet />
                        </div>
                        <RightBar />
                    </div>
                </div>
            </QueryClientProvider>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout/>
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile/:id",
                    element: <Profile />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ]);

    return (
        <div>
            <AuthContextProvider> {/* AuthContextProvider 추가 */}
                <RouterProvider router={router} />
            </AuthContextProvider> {/* AuthContextProvider 추가 */}
        </div>
    );
}

export default App;

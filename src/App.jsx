import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<p>Loading</p>}>
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
          />
          <AppRoutes />
        </AuthProvider>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;

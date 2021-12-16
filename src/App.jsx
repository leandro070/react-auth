import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes/routes";
import { GeneralProvider } from "./hooks/useGeneral";
import { ProfileProvider } from "./hooks/useProfile";

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<p>Loading</p>}>
        <AuthProvider>
          <GeneralProvider>
            <ProfileProvider>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick={true}
              />
              <AppRoutes />
            </ProfileProvider>
          </GeneralProvider>
        </AuthProvider>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;

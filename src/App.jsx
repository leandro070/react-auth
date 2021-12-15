import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<p>Loading</p>}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Billing } from "./pages/Billing";
import { RequireAuth } from "./auth/RequireAuth";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { UnauthedLayout } from "./layouts/UnauthedLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <UnauthedLayout>
            <Login />
          </UnauthedLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthedLayout>
            <Signup />
          </UnauthedLayout>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

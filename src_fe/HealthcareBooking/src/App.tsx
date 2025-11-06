import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import { Fragment } from "react";
import { publicRoutes, privateRoutes } from "./routes/index.tsx";
import "./App.css";
import { DefaultLayout } from "./components/Layout/DefaultLayout";
import { ProtectedRoute } from "./components/Admin/ProtectRoute.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          // Page được truyền vào Layout như một children
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {/* Các privateRoutes cần đăng nhập mới vào được */}

        {privateRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={["R1"]}>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

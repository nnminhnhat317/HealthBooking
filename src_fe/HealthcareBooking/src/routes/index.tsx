import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { LoginPage } from "@/pages/LoginPage/index";
import { HomePage } from "@/pages/HomePage/HomePage";
import { EmptyLayout } from "@/components/Layout/EmptyLayout";
import { DetailClinic } from "@/pages/DetailClinic";
import { TestPage } from "@/pages/TestPage";
const publicRoutes = [
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/login", component: LoginPage, layout: EmptyLayout },
  { path: "/clinics", component: DetailClinic, layout: DefaultLayout },
  { path: "/test-page", component: TestPage, layout: AdminLayout },
];

const privateRoutes = [
  // { path: "/", component: Home, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
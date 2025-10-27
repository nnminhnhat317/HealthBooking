import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import { LoginPage } from "@/pages/LoginPage/index";
import { HomePage } from "@/pages/HomePage/HomePage";
import { EmptyLayout } from "@/components/Layout/EmptyLayout";
import { DetailClinic } from "@/pages/DetailClinic";
const publicRoutes = [
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/login", component: LoginPage, layout: EmptyLayout },
  { path: "/clinics", component: DetailClinic, layout: DefaultLayout },
];

const privateRoutes = [
  // { path: "/", component: Home, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
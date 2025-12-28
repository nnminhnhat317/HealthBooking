import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { LoginPage } from "@/pages/LoginPage/index";
import { HomePage } from "@/pages/HomePage/HomePage";
import { EmptyLayout } from "@/components/Layout/EmptyLayout";
import { DetailClinic } from "@/pages/DetailClinic/index";
import { TestPage } from "@/pages/TestPage";
import { AdminPage } from "@/pages/AdminPage";
import { DetailDoctor } from "@/pages/DetailDoctor";
const publicRoutes = [
  { path: "/", component: HomePage, layout: DefaultLayout },
  { path: "/login", component: LoginPage, layout: EmptyLayout },
  { path: "/clinics", component: DetailClinic, layout: DefaultLayout },
  { path: "/detail-doctor", component: DetailDoctor, layout: DefaultLayout },
  { path: "/test-page", component: TestPage, layout: AdminLayout },
];

const privateRoutes = [
  { path: "/user-manage", component: AdminPage, layout: AdminLayout },
];

export { publicRoutes, privateRoutes };
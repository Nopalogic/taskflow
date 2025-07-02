import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import Landing from "./pages/landing";
import Dashboard from "./pages/u";
import ProjectPage from "./pages/u/projects";
import ProjectCreate from "./pages/u/projects/create";
import ProjectShow from "./pages/u/projects/show";
import TaskPage from "./pages/u/tasks";
import TrashPage from "./pages/u/trash";
import UserLayout from "./routes/user-layout";
import TaskCreate from "./pages/u/tasks/create";
import NotFound from "./pages/u/not-found";
import TaskShow from "./pages/u/tasks/show";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/Login" element={<LoginPage />} />

      <Route element={<UserLayout />}>
        <Route path="/u" element={<Dashboard />} />
        <Route path="/u/projects" element={<ProjectPage />} />
        <Route path="/u/projects/create" element={<ProjectCreate />} />
        <Route path="/u/projects/:projectId" element={<ProjectShow />} />

        <Route path="/u/tasks" element={<TaskPage />} />
        <Route path="/u/tasks/create" element={<TaskCreate />} />
        <Route path="/u/tasks/:taskId" element={<TaskShow />} />

        <Route path="/u/trash" element={<TrashPage />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import InvestorsIndexPage from "./pages/InvestorsIndexPage";
import InvestorsShowPage from "./pages/InvestorsShowPage";
import PoolDetailsPage from "./pages/PoolDetailsPage";
import ProjectsShowPage from "./pages/ProjectsShowPage";
import ProjectsIndexPage from "./pages/ProjectsIndexPage";
import Error from './components/Error';
import useInvestorsStore from './store/investorsStore';
import useProjectsStore from './store/projectsStore';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const investorsStore = useInvestorsStore();
  const projectsStore = useProjectsStore();
  const errors = [investorsStore.error, projectsStore.error];

  return (
    <Router>
      <div className="container mx-auto">

        {/* Navigation */}
        <header className="flex justify-center border-b">
          <Link className="px-3 py-1 block border" to="/">
            Dashboard
          </Link>
          <Link className="px-3 py-1 block border" to="/Projects">
            Projects
          </Link>
          <Link className="px-3 py-1 block border" to="/Investors">
            Investors
          </Link>
          {/* <Link className="px-3 py-1 block border" to="/PoolDetails">
            Pool Details
          </Link> */}
        </header>

        {/* Main content area */}
        <section className="p-6">

          {errors && errors.map((e, i) => e && (<Error key={i} error={e} />))}

          {/* Routes */}
          <Routes>
            <Route exact path="/" element={
              <DashboardPage />
            } />
            <Route exact path="/Projects" element={
              <ProjectsIndexPage />
            } />
            <Route exact path="/Projects/:id" element={
              <ProjectsShowPage />
            } />
            <Route exact path="/Investors" element={
              <InvestorsIndexPage />
            } />
            <Route exact path="/Investors/:id" element={
              <InvestorsShowPage />
            } />
            {/* <Route exact path="/PoolDetails" element={
              <PoolDetailsPage />
            } /> */}
          </Routes>

        </section>

      </div>

    </Router>
  );
}

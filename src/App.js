import './App.css';
import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Nav from "./components/Nav"
import Loading from "./components/Loading"

const Home = lazy(() => import("./pages/Home"))
const MyCard = lazy(() => import("./pages/MyCard"))
const New = lazy(() => import("./pages/New"))
const Edit = lazy(() => import("./pages/Edit"))
const Help = lazy(() => import("./pages/Help"))
const Settings = lazy(() => import("./pages/Settings"))
const Error = lazy(() => import("./pages/Error"))

function App() {


  return (
    <Router>
      <Nav />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-card" element={<MyCard />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

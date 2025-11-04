import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import useSidebarStore from "./store/sidebarStore";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ScrollToTop from "./utils/ScrollToTop";
import SearchResult from "./pages/SearchResult";
import WatchPage from "./pages/WatchPage";
import PageNotFound from "./pages/PageNotFound";
import PeopleInfoPage from "./pages/PeopleInfoPage";
import CharacterInfoPage from "./pages/CharacterInfoPage";
import CharactersPage from "./pages/CharactersPage";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const App = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const togglesidebar = useSidebarStore((state) => state.toggleSidebar);
  const location = useLocation();
  const path = location.pathname === "/";

  return (
    <>
      {!path && <Sidebar />}

      <main className={`${isSidebarOpen ? "bg-active" : ""} opacityWrapper`}>
        <div
          onClick={togglesidebar}
          className={`${isSidebarOpen ? "active" : ""} opacityBg`}
        ></div>
        {!path && <Header />}
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Root />} />
            <Route path="/home" element={
              <motion.div {...pageTransition}>
                <Home />
              </motion.div>
            } />
            <Route path="/anime/:id" element={
              <motion.div {...pageTransition}>
                <DetailPage />
              </motion.div>
            } />
            <Route path="/animes/:category/:query?" element={
              <motion.div {...pageTransition}>
                <ListPage />
              </motion.div>
            } />
            <Route path="/search" element={
              <motion.div {...pageTransition}>
                <SearchResult />
              </motion.div>
            } />
            <Route path="/watch/:id" element={
              <motion.div {...pageTransition}>
                <WatchPage />
              </motion.div>
            } />
            <Route path="/characters/:id" element={
              <motion.div {...pageTransition}>
                <CharactersPage />
              </motion.div>
            } />
            <Route path="/people/:id" element={
              <motion.div {...pageTransition}>
                <PeopleInfoPage />
              </motion.div>
            } />
            <Route path="/character/:id" element={
              <motion.div {...pageTransition}>
                <CharacterInfoPage />
              </motion.div>
            } />
            <Route path="*" element={
              <motion.div {...pageTransition}>
                <PageNotFound />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
};

// pages
// /
// /home
// /:id
// top-rated
// most-popular
// most-favotite
// completed
// recently-added
// recently-updated
// top-upcoming
// subbed-anime
// dubbed-anime
// movie
// tv
// ova
// ona
// special
// events
// /genre/:genre
//  /watch/:id?ep=${number}
//  /character/:id
//  /people/:id
// filter

export default App;

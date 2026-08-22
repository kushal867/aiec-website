import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DestinationsIndex from "./pages/DestinationsIndex";
import CountryPage from "./pages/CountryPage";
import TestPrepIndex from "./pages/TestPrepIndex";
import TestPage from "./pages/TestPage";
import TestComparePage from "./pages/TestComparePage";
import UniversityFinder from "./pages/UniversityFinder";
import LearningHub from "./pages/LearningHub";
import ArticlePage from "./pages/ArticlePage";
import SuccessStories from "./pages/SuccessStories";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<DestinationsIndex />} />
        <Route path="/destinations/:code" element={<CountryPage />} />
        <Route path="/test-prep" element={<TestPrepIndex />} />
        <Route path="/test-prep/compare" element={<TestComparePage />} />
        <Route path="/test-prep/:slug" element={<TestPage />} />
        <Route path="/universities" element={<UniversityFinder />} />
        <Route path="/learning-hub" element={<LearningHub />} />
        <Route path="/learning-hub/:id" element={<ArticlePage />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;

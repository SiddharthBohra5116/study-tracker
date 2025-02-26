import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import SubjectDetails from "./pages/SubjectDetails";
import TopicDetails from "./pages/TopicDetails";
import DailyTargets from "./pages/DailyTargets";

function App() {
  // const [subjects,setSubjects]=({});
  return (
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        </Routes>
     </Router>
  );
}

// function Buttons(){
  
  
// }

export default App;
{/* <Route path="/subject/:subjectId" element={<SubjectDetails />} />
  <Route path="/subject/:subjectId/topic/:topicId" element={<TopicDetails />} />
        <Route path="/daily-targets" element={<DailyTargets />} /> */}
      
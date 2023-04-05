import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RecipiesList from './components/RecipiesList';
import CreateRecipy from './components/recipy/CreateRecipy';

function App() {
  return (
    <>
      <h1>Recipy</h1>
      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/recipies" />} />
          <Route path="/recipies" element={<RecipiesList />} />
          <Route path="/recipy/create" element={<CreateRecipy />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RecipyForm from './components/forms/RecipyForm';
import RecipiesList from './components/RecipiesList';

function App() {
  return (
    <>
      <h1>Recipy</h1>
      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/recipies" />} />
          <Route path="/recipies" element={<RecipiesList />} />
          <Route path="/recipy/create" element={<RecipyForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

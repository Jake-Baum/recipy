import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RecipiesList from './components/RecipiesList';
import CreateRecipy from './components/recipy/CreateRecipy';
import UpdateRecipy from './components/recipy/UpdateRecipy';
import { SnackbarServiceProvider } from './services/SnackBarService';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <SnackbarServiceProvider>
          <h1>Recipy</h1>
          <div className="main-wrapper">
            <Routes>
              <Route path="/" element={<Navigate to="/recipies" />} />
              <Route path="/recipies" element={<RecipiesList />} />
              <Route path="/recipy/create" element={<CreateRecipy />} />
              <Route path="/recipy/:id" element={<UpdateRecipy />} />
            </Routes>
          </div>
        </SnackbarServiceProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;

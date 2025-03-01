import { Provider } from 'react-redux';
import './App.css'
import { store } from './store/store';
import List from './components/List';
import Details from './components/Details'
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<List/>} />
          <Route path="/post/:id" element={<Details/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App

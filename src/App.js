import './App.css';
import Layout from './Layout';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SignInSignUp' element={<Layout/>}>
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
         </Route> 
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;

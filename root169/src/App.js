import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main.js"
import {Update} from "./Update.js"
import {Signup} from "./Signup.js"
import { Add } from "./Add.js"
import {Login} from "./Login.js"
import { Admin } from "./Admin.js";
import { Delete } from "./Delete.js";
import ProtectedRoute from "./ProtectedRoute.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />

          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="/signup" element={<Signup/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

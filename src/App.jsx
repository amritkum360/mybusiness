
// import './App.css'
// import Front from './component/front'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./component/Main"
import Addmember from "./component/Addmemb";
import Details from "./component/Details";
import AddDetails from './component/AddDetails';
import Paiddetails from "./component/paiddetails";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} /> 
      <Route path="/addmember" element={<Addmember />} /> 
      <Route path="/detail/:collectionId" element={<Details />} /> 
      <Route path="/detail/:collectionName/adddetail" element={<AddDetails/>} />
      <Route exact path="/details/:collectionId/paid" component={<Paiddetails />} />
    </Routes>
    </BrowserRouter>
      
         </>
  )
}

export default App

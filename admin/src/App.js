import React, { useContext} from 'react'
import Home from './pages/home/Home';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './pages/login/Login';
import Packages from './pages/packages/Packages';
import Package from './pages/package/Package';
import "./style/dark.scss";
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { enquiryColumns, packageColumns, userColumns } from './dataTableSource';
import NewPackage from './pages/newPackage/NewPackage';
import Profile from './pages/profile/Profile';
import Enquiry from './pages/enquiry/Enquiry';
import Notifications from './pages/notifications/Notifications';
 import User from './pages/user/User';
import EnquiryPage from './pages/enquiryPage/EnquiryPage';
import Checked from './pages/checked/Checked';
import Contacted from './pages/contacted/Contacted';
import Assigned from './pages/assigned/Assigned';

const App = () => {

    const {darkMode} = useContext(DarkModeContext);

    const ProtectedRoute = ({children}) =>{
        const {user} = useContext(AuthContext);

        if(!user){
            return <Navigate to="/login"/>;
        }

        return children;
    }

  return (
    
     <div className={darkMode ? "app dark" :"app"}>
       <BrowserRouter>
            <Routes>
                <Route path="/">
                   <Route path="login" element={<Login />}/>
                     <Route 
                        index 
                       element = 
                          {<ProtectedRoute>
                             <Home />
                          </ProtectedRoute>} 
                     />
                 
                    <Route path="users">
                         <Route index element={<ProtectedRoute>
                                 <Packages columns={userColumns}/>
                             </ProtectedRoute>}/>
                         <Route path=":userId" element={<ProtectedRoute>
                                 <User />
                            </ProtectedRoute>}/>
                        <Route path="profile" element = {
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }/>    
                    </Route>
                    <Route path="packages">
                        <Route index element={<ProtectedRoute>
                                <Packages columns={packageColumns}/>
                            </ProtectedRoute>}/>
                        <Route path=":id" element={<ProtectedRoute>
                                <Package />
                            </ProtectedRoute>}/>
                            <Route path="new" element=
                            {
                                <ProtectedRoute>
                                    <NewPackage />
                                </ProtectedRoute>
                            }/>
                    </Route>
                    <Route path="enquiry">
                        <Route index element=
                            {
                                <ProtectedRoute>
                                    <Enquiry columns={enquiryColumns}/>
                                </ProtectedRoute>
                            }/>
                        <Route path=":enquiryID" element= {
                            <ProtectedRoute>
                                <EnquiryPage />
                            </ProtectedRoute>
                        }/>
                    </Route>
                    <Route path="notifications">
                        <Route index element=
                            {
                                <ProtectedRoute>
                                    <Notifications />
                                </ProtectedRoute>
                            }/>
                    </Route>
                    <Route path="checked">
                        <Route index element=
                            {
                                <ProtectedRoute>
                                    <Checked />
                                </ProtectedRoute>
                            }/>
                    </Route>
                    <Route path="contacted">
                        <Route index element=
                            {
                                <ProtectedRoute>
                                    <Contacted />
                                </ProtectedRoute>
                            }/>
                    </Route>
                    <Route path="assignedTo">
                        <Route index element=
                            {
                                <ProtectedRoute>
                                    <Assigned />
                                </ProtectedRoute>
                            }/>
                        </Route> 
              </Route>         
           </Routes>
       </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App

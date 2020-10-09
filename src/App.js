import React, {useState} from 'react';
import './App.css';

import RegisterView from './components/LenderRegistration.js';
import OtpView from './components/OtpView.js';
import PostRegisterView from './components/PostRegisterView.js';

function App() {
  const [flow, setFlow] = useState("REGISTER");
  return <RegisterView />;
  // switch(flow) {
  //   case "REGISTER": return <RegisterView setFlow={setFlow} />;
  //   case "OTP": return <OtpView setFlow={setFlow}/>;
  //   case "POST_REGISTER": return <PostRegisterView setFlow={setFlow}/>;
  //   default: return <div>Page not found</div>;
  // }
}

export default App;

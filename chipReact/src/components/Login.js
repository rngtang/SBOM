// import React, { useEffect, useContext } from 'react';
// import { UserContext } from '../UserContext';

// function Login() {
//   const { setUser } = useContext(UserContext);

//   useEffect(() => {
//     fetch('https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu')
//       .then((response) => {
//         console.log(response);
//         console.log(response.redirected);
//         console.log(response.url);
        
//         if(response.redirected){
//           window.location.href = response.url;
//         }
        
//         //we're assuming we get the user data as json endpoint
//         return response.json();
//       })
//       .then((data) => {
//         setUser(data.user);  // Save the logged in user data to context
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Shib testing</h1>
//     </div>
//   );
// }

// export default Login;
// Login.js
import React, { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    window.location.href = 'https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu';
  }, []);

  return null;
};

export default Login;


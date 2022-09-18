import React from 'react';

import styled from 'styled-components'

import {
	useRef,
	useEffect
} from 'react'

import { 
	getAuth, 
	isSignInWithEmailLink, 
	sendSignInLinkToEmail,
	signInWithEmailLink,
	signInWithPopup, 
	GoogleAuthProvider 
} from "firebase/auth";

import { Link, useNavigate} from "react-router-dom";

import GEButton from '../components/GEButton'

import GETitle from '../components/GETitle'

import GEInput from '../components/GEInput'

import GEFormSection from '../components/GEFormSection'

import logo from '../logo.svg';
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://geometry-lab.ew.r.appspot.com/finishSignUp',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'geometry-lab.danilaplee.ios'
  },
  android: {
    packageName: 'geometry-lab.danilaplee.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'geometry-lab.ew.r.appspot.com'
};
function GELogin() {
  const navigate = useNavigate()

	const GELoginContainer = styled.div`
    overflow: hidden;
    max-width: 375px;
    width: 100%;	    
	`

	const GELoginFormContainer = styled.div`
		position: relative;
    z-index: 1;
    width: 100%;
    min-height: 375px;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 2px;
    padding: 32px;
    background-color: rgb(255, 255, 255);
  `

  const emailInputRef = useRef(null)

	const auth = getAuth();

  const signInWithGoogle = () => {
  	console.info('==== try google ====')
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
	  .then((result) => {
	  	console.info(result)
	    
	    const credential = GoogleAuthProvider.credentialFromResult(result);
	    const token = credential?.accessToken;
	    const user = result.user;

      navigate("/upload")

	  }).catch((error) => {

	  	console.error(error)
	    
	    const errorCode = error.code;
	    const errorMessage = error.message;
	    const email = error.customData.email;
	    const credential = GoogleAuthProvider.credentialFromError(error);
      
      navigate("/upload")
	  });
  }

  const signInWithEmail = () => {
  	
  	console.info('==== try email ====')

	  let email = (emailInputRef.current as any).value
	  
	  console.info(email)

	  if (!email) {
	    
	    email = window.prompt('Please provide your email for confirmation');
	    return

	  }
		try {
	  	
	  	sendSignInLinkToEmail(auth, email, actionCodeSettings)
		  .then(() => {
		    window.localStorage.setItem('emailForSignIn', email);
		  })
		  .catch((error:Error) => {
		  	console.error("send confirmation link", error)
		    const errorMessage = error.message;
		  });

		} catch(err) {
			console.error(err)
		}
  }

  const checkAuthOnMount = () => {
  	if (isSignInWithEmailLink(auth, window.location.href)) {
		  let email = window.localStorage.getItem('emailForSignIn');
		  if (!email) {
		    email = window.prompt('Please provide your email for confirmation');
		  }
		  signInWithEmailLink(auth, email as string, window.location.href)
		    .then((result) => {
		    	console.info('===== succesfully loggedin with email link ====', result)
		    })
		    .catch((error) => {
		    	console.error("===== email link confirmation error ====", error)
		    });
		}
  }
  useEffect(()=>{
  	checkAuthOnMount()
  }, [])

	return (
		<GELoginContainer>
			<GELoginFormContainer>
				
				<GETitle>
					Sign In
				</GETitle>

				<GEFormSection>
					<GEButton onClick={signInWithGoogle}>
						Login With Google
					</GEButton>
				</GEFormSection>
				
				<GEFormSection>
					<GEInput 
						placeholder="youremail@domain.com" 
						ref={emailInputRef}
					/>
				</GEFormSection>

				<GEFormSection>
					<GEButton onClick={signInWithEmail}> 
						Login With Email 
					</GEButton>
				</GEFormSection>
			
			</GELoginFormContainer>
		</GELoginContainer>
	)
}

export default GELogin;
import React from 'react';
import {
	useRef, 
	useState
} from 'react'


import { getDatabase, ref, get, onValue} from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import GETitle from '../components/GETitle'
import GEMenu from '../components/GEMenu'
import GEInput from '../components/GEInput'
import GEButton from '../components/GEButton'
import GEInnerContainer from '../components/GEInnerContainer'
import GEFormSection from '../components/GEFormSection'

import { 
  FileUploadURL, 
  annotationsLink, 
  Errors, 
  ErrorDisplayTime 
} from '../config'

const findShortestPalyndrome = (st:string) => {
    let checkPal = (ss:string)=> {
      return ss.split("").reverse().join("") === ss
    }
    let nstr = st
    let revIndex = st.length - 1
    let firstIndex = 0
    let iter = 0
    while(!checkPal(nstr) && iter < 100) {
      iter += 1
      const first = st[firstIndex]
      const last = st[revIndex]
      if(first && last) {
          if(first === last) {
            revIndex -= 1
            firstIndex += 1
            continue
          } else {
            revIndex -= 1
            continue
          }
      }
      if(last) {
        nstr += last
        revIndex -= 1  
      } 
      else {
        revIndex = st.length - 1
        // firstIndex = 0
      }
    }
    return nstr
}


function GEUploadForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false) 

  const [errorText, setError] = useState("")

  const showError = (message:string) => {
    setError(message)
    setTimeout(()=>setError(""), ErrorDisplayTime)
  }
  
  const fileInputRef = useRef(null)

  const submitRef = useRef(null)

  const onSubmit = () => {
    
    if(isLoading) {
      console.info('===== isLoading =====')
      return null
    }
    
    const input = fileInputRef.current as any

    if(
      input.files.length === 0 
      ) {
      showError(Errors.nofile)
      return null
    }

    setIsLoading(true)

    console.info(
      '==== submit ====', 
      input
    )

    fetch(FileUploadURL, { method: "POST", body: input.files[0] }) 
    .then(async (data)=>{
      const j = await data.json() as any
      console.info('==== file uploaded ====', j)
      if(j.success !== true) {
        showError(j.error)
        return;
      }

      const db = getDatabase();
      const dataRef = ref(db, 'jobs/' + j.jobId + '/status');
      onValue(dataRef, async (snapshot) => {
        const data = snapshot.val();
        console.info('==== data updated =====', data)
        if(data === "done") {
          const result = (await get(ref(db, 'jobs/' + j.jobId))).val();
          console.info("async result", result);
          window.localStorage.setItem("jData", JSON.stringify(result.result))
          navigate("/viewer")
        }
      });
    })
    .catch((err)=>{
      showError(err.message)
    })

    return null
  }

  return (
    <div>
      <GEMenu>
        <Link to="/">
          <GETitle color="white">
          EXIT
          </GETitle>
        </Link>
      </GEMenu>
      
      <GEInnerContainer>
        <GETitle text-align="left">
          GEOMETRY UPLOAD FORM (<a 
            href={annotationsLink} 
            download
            target="_blank"
            rel="noreferrer"
            >
            <u>annotations.json</u>
          </a>)
        </GETitle>

        {errorText !== "" ? (
          <GETitle color="red">
          ERROR: {errorText}
          </GETitle>) 
        : ""}

        <GEFormSection>
          <GEInput 
            ref={fileInputRef}
            type="file" 
            accept="application/json" />
        </GEFormSection>
        
        <GEFormSection>          
          {isLoading === false ? (
            <GEButton
            ref={submitRef}
            onClick={onSubmit}
            > SUBMIT </GEButton>
          ) : (
            <GEButton
              onClick={onSubmit}
            > LOADING... </GEButton>
          )}
        </GEFormSection>

      </GEInnerContainer>


    </div>
  );
}

export default GEUploadForm;

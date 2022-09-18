import React from 'react';
import {
	useRef, 
	useState
} from 'react'
import { Link, useNavigate } from "react-router-dom";
import GETitle from '../components/GETitle'
import GEMenu from '../components/GEMenu'
import GEInput from '../components/GEInput'
import GEButton from '../components/GEButton'
import GEInnerContainer from '../components/GEInnerContainer'
import GEFormSection from '../components/GEFormSection'


import { FileUploadURL, annotationsLink, Errors } from '../config'

function GEUploadForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false) 

  const [errorText, setError] = useState("")

  const errorTime = 3000

  const showError = (message:string) => {
    setError(message)
    setTimeout(()=>setError(""), errorTime)
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
      const j = await data.json()
      console.info('==== file uploaded ====', j)
      if(j.success !== true) {
        showError(j.error)
        return;
      }
      window.localStorage.setItem("jData", JSON.stringify(j))
      navigate("/viewer")
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
              annotations.json
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

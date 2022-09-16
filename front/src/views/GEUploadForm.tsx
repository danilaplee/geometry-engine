import React from 'react';
import {
	useRef, 
	useState, 
	useEffect, 
  // useReducer
} from 'react'
import styled from 'styled-components'
import { Outlet, Link, useNavigate } from "react-router-dom";
import GETitle from '../components/GETitle'
import GEMenu from '../components/GEMenu'
import GEInput from '../components/GEInput'
import GEButton from '../components/GEButton'
import GEInnerContainer from '../components/GEInnerContainer'
import GEFormSection from '../components/GEFormSection'

const FileUploadURL = process.env.FILE_UPLOAD_URL 
|| "https://europe-west2-geometry-lab.cloudfunctions.net/geometry-lab-dev-processPolygonPayload"

const annotationsLink = "https://raw.githubusercontent.com/danilaplee/geometry-engine/main/annotations.json"
function GEUploadForm() {
  const navigate = useNavigate()
  const GETextArea = styled.textarea`
    padding:8px;
    width:100%
  `
  const [isLoading, setIsLoading] = useState(false) 
  
  const fileInputRef = useRef(null)

  const submitRef = useRef(null)

  const textAreaRef = useRef(null)

  const onSubmit = () => {
    if(isLoading) {
      console.info('===== isLoading =====')
      return null
    }
    
    const input = fileInputRef.current as any
  
    let validTextareaJSON = false

    if(
      input.files.length === 0 
      ) {
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
      window.localStorage.setItem("jData", JSON.stringify(j))
      navigate("/viewer")
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
            >
              annotations.json
          </a>)
        </GETitle>

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

import React from 'react';
import {
	useRef, 
	useState, 
	useEffect, 
  // useReducer
} from 'react'
import styled from 'styled-components'

import { Outlet, Link } from "react-router-dom";

import GEButton from '../components/GEButton'

import GETitle from '../components/GETitle'

import GEInput from '../components/GEInput'

import GEFormSection from '../components/GEFormSection'

function GELogin() {

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

	return (
			<GELoginContainer>
				<GELoginFormContainer>
					
					<GETitle>
						Sign In
					</GETitle>

					<GEFormSection>
						<Link to="/upload">
							<GEButton> Login With Google </GEButton>
						</Link>
					</GEFormSection>
					
					<GEFormSection>
						<GEInput placeholder="you@domain.com" />
					</GEFormSection>

					<GEFormSection>
						<Link to="/upload">
							<GEButton> Login With Email </GEButton>
						</Link>
					</GEFormSection>
				
				</GELoginFormContainer>
			</GELoginContainer>
	)
}

export default GELogin;
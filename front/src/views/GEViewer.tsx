import React from 'react';
import {
	useRef, 
	useState, 
	useEffect, 
  // useReducer
} from 'react'
import styled from 'styled-components'
import { Outlet, Link } from "react-router-dom";
import GETitle from '../components/GETitle'
import GEMenu from '../components/GEMenu'
import GEInnerContainer from '../components/GEInnerContainer'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Category Title',
        selector: (row:any) => row.name,
    },
    {
        name: 'Category Area',
        selector: (row:any) => row.area,
    },
];

function GEViewer() {
    let data: string | null | any[] = window.localStorage.getItem("jData")
    if(data) {
        data = JSON.parse(data).sortedCategorySet
    }
    else {
        data = []
    }
  	return (
  		<div>
  			<GEMenu>
					<Link to="/">
	  				<GETitle 
	  					color="white" 
	  				>EXIT</GETitle>
					</Link>

					<Link to="/upload">
	  				<GETitle 
	  					color="white" 
	  				> UPLOAD FILE </GETitle>
					</Link>
  			</GEMenu>
  			<GEInnerContainer>
					<GETitle text-align="left">
						VIEWING RESULTS
					</GETitle>
	        <DataTable
	            columns={columns}
	            data={data as any[]}
	        />
  			</GEInnerContainer>
  		</div>
  	);
}

export default GEViewer;

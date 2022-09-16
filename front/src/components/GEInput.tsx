import styled from 'styled-components'

export interface GEInputProps {

}

const GEInput = styled.input<GEInputProps>`
	appearance: none;
  outline: none;
  -webkit-box-flex: 1;
  flex-grow: 1;
  width: 100%;
  transition: border-color 150ms ease-in-out 0s, box-shadow 150ms ease-in-out 0s;
  border: 1px solid rgb(170, 170, 170);
  font-size: 15px;
  height: 44px;
  padding: 8px;
  min-width:200px;
  cursor:pointer
`

export default GEInput
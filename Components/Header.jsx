import React from 'react'
import styled from 'styled-components'
import Logo from './logo/Logo'


const HeaderC = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
`
const Header = props => {
	return (
		<HeaderC>
			<Logo />
		</HeaderC>
	)
}
export default Header

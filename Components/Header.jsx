import React from 'react'
import styled from 'styled-components'
import Logo from './logo/Logo'


const HeaderC = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 5.2rem;
`
const Header = () => {
	return (
		<HeaderC>
			<Logo />
		</HeaderC>
	)
}
export default Header

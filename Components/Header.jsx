import React from 'react'
import styled from 'styled-components'
import Logo from './logo/Logo'


const HeaderC = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
	position: absolute;
`
const Svg = styled.svg`
	display: ${props => props.menu};
	padding: .3rem;
	cursor: pointer;
	transform: rotate(180deg);
`
const Header = props => {
	return (
		<HeaderC>
			<Logo />
		</HeaderC>
	)
}
export default Header

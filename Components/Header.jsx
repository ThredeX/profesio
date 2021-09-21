import React from 'react'
import styled from 'styled-components'
import Logo from './logo/Logo'


const HeaderC = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
`
const Svg = styled.svg`
	display: ${props => props.menu};
	padding: .3rem;
	cursor: pointer;
	transform: rotate(180deg);
`
const Header = props => {
    const handleClick = () => {
        //openMenu
    }
	return (
		<HeaderC>
			<Logo />
			<Svg 
				menu={props.menu}
                onClick={handleClick}
				fill="none"
				height="70"
				width="70"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg">
				<path
					clipRule="evenodd"
					d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z"
					fill={process.env.NEXT_PUBLIC_COLOR_BLACK}
					fillRule="evenodd"
				/>
				<path
					clipRule="evenodd"
					d="M3 10C3 9.44772 3.44772 9 4 9H10C10.5523 9 11 9.44772 11 10C11 10.5523 10.5523 11 10 11H4C3.44772 11 3 10.5523 3 10Z"
					fill={process.env.NEXT_PUBLIC_COLOR_ORANGE}
					fillRule="evenodd"
				/>
				<path
					clipRule="evenodd"
					d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z"
					fill={process.env.NEXT_PUBLIC_COLOR_BLACK}
					fillRule="evenodd"
				/>
			</Svg>
		</HeaderC>
	)
}
export default Header

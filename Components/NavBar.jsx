import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faFolderMinus, faFolderOpen, faUserPlus, faUserMinus, faUserGear, faGear, faGears, faUser} from '@fortawesome/free-solid-svg-icons'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

const Nav = styled.nav`
	background-color: ${process.env.NEXT_PUBLIC_COLOR_BLACK};
	height: 90vh;
	width: 280px;
	position: absolute;
	top: 5vh;
	right: -230px;
	border-radius: 50px 0 0 50px;
	padding: 0 20px;
    overflow-y: scroll;
	color: #fff;
    transition: right .5s ease;
    &:hover {
        right: 0px;
    }
    &::-webkit-scrollbar {
        width: 0px;
    }
`
const Paragraph = styled.p`
	color: #fff;
	text-overflow: ellipsis;
	width: 230px;
	white-space: nowrap;
	overflow: hidden;
	margin: 15px;
`
const Heading1 = styled.h1`
	text-align: center;
    margin-left: .5rem;
`
const Line = styled.div`
	margin-block: 2rem;
`
const Div = styled.div`
	/* border-bottom: 1px solid ${process.env.NEXT_PUBLIC_COLOR_ORANGE}; */
	display: flex;
	justify-content: space-between;
    align-items: center;
    cursor: pointer;
    margin-block: .3rem;
`
const DivHeading = styled.div`
    display: flex;
	justify-content: center;
    align-items: center;
    margin-left: 2rem;
`
export default function NavBar() {
	return (
		<Nav>
			<DivHeading>
                <FontAwesomeIcon size='2x' icon={faUser} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
				<Heading1>{'Jmeno Správce'}</Heading1>
			</DivHeading>
			<div>
				<Div>
                    <FontAwesomeIcon icon={faFolderPlus} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Přidat učebnu</Paragraph>
				</Div>
				<Div>
					<FontAwesomeIcon icon={faFolderOpen} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Změnit učebnu</Paragraph>
				</Div>
				<Div>
					<FontAwesomeIcon icon={faFolderMinus} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Odebrat učebnu</Paragraph>
				</Div>
				<Line></Line>
				<Div>
					<FontAwesomeIcon icon={faUserPlus} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Přidat studenta/zaměstnance</Paragraph>
				</Div>
				<Div>
					<FontAwesomeIcon icon={faUserGear} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Změnit nastavení studenta/zaměstnance</Paragraph>
				</Div>
				<Div>
					<FontAwesomeIcon icon={faUserMinus} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Odebrat studenta/zaměstnance</Paragraph>
				</Div>
				<Line></Line>
				<Div>
					<FontAwesomeIcon icon={faGears} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Obecné nastavení školy</Paragraph>
				</Div>
				<Div>
					<FontAwesomeIcon icon={faGear} color={process.env.NEXT_PUBLIC_COLOR_ORANGE}/>
					<Paragraph>Nastavení</Paragraph>
				</Div>
			</div>
		</Nav>
	)
}

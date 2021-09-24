import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFolderPlus,
	faFolderMinus,
	faFolderOpen,
	faUserPlus,
	faUserMinus,
	faUserGear,
	faGear,
	faGears,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

const Container = styled.div`
	&::-webkit-scrollbar {
		width: 0px;
	}
	overflow-y: scroll;
	padding: 0 10px;
	height: 100%;
	border-radius: 30px;
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
	margin-left: 0.5rem;
`
const Line = styled.div`
	margin-block: 2rem;
`
const A = styled.a`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	margin-block: 0.3rem;
`
const Div = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(255, 255, 255, 0);
	border-radius: 30px;
	padding: 8px;
	position: relative;
	transition: background 0.3s ease-in-out;
	&:hover {
		background-color: #e4e4e4;
	}
`
const Nav = styled.nav`
	height: clamp(20rem, 80vh, 300rem);
	padding-block: 4vh;
	position: absolute;
	top: clamp(0.3rem, 5vh, 4rem);
	width: 50px;
	right: 0;
	border-radius: 50px 0 0 50px;
	background-color: ${process.env.NEXT_PUBLIC_COLOR_BLACK};
	color: #fff;
	transition: width 0.5s ease;
`
const Handle = styled.div`
	border-radius: 10px 0 0 10px;
	width: 12px;
	height: 100px;
	padding: 5px;
	position: absolute;
	top: 50%;
	box-shadow: -2px 0 1px 0px inset;
	left: -4px;
	opacity: 0;
	transform: translate(-50%, -50%);
	transition: opacity 0.5s ease;
	cursor: pointer;
	background-color: ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
	${Nav}:hover & {
		opacity: 1;
	}
`
const DivHeading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 2rem;
`
export default function NavBar() {
	const [state, setState] = useState(false)
	const navRef = useRef(null)
	const route = useRouter().pathname

	function navHandling() {
		let displayMenuOpen = document.getElementsByClassName('noneOpen')
		if (state === false) {
			navRef.current.style.width = 'clamp(100px, 60vw, 280px)'
			for (let i = 0; i < displayMenuOpen.length; i++) {
				displayMenuOpen[i].style.opacity = '1'
			}
			setState(true)
		} else {
			navRef.current.style.width = '50px'
			for (let i = 0; i < displayMenuOpen.length; i++) {
				displayMenuOpen[i].style.opacity = '0'
			}
			setState(false)
		}
	}

	return (
		<Nav ref={navRef}>
			<Container>
				<DivHeading className="noneOpen">
					<FontAwesomeIcon
						size="2x"
						icon={faUser}
						color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
					/>
					<Heading1>{'Jmeno Správce'}</Heading1>
				</DivHeading>
				<div>
					<Link href={`${route}/room`} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faFolderPlus}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">Přidat učebnu</Paragraph>
						</A>
					</Link>
					<Link href={`${route}/room`} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faFolderOpen}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">Změnit učebnu</Paragraph>
						</A>
					</Link>
					<Link href={`${route}/room`} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faFolderMinus}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">Odebrat učebnu</Paragraph>
						</A>
					</Link>
					<Line></Line>
					<Link href={`${route}/people`} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faUserPlus}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">
								Přidat studenta/zaměstnance
							</Paragraph>
						</A>
					</Link>
					<Link href={`${route}/people`} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faUserGear}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">
								Změnit nastavení studenta/zaměstnance
							</Paragraph>
						</A>
					</Link>
					<Link href={`${route}/people`} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faUserMinus}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">
								Odebrat studenta/zaměstnance
							</Paragraph>
						</A>
					</Link>
					<Line></Line>
					<Link href={`${route}/globalSettings`} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faGears}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">
								Obecné nastavení školy
							</Paragraph>
						</A>
					</Link>
					<Link href={'/peoples/settings'} passHref>
						<A>
							<Div>
								<FontAwesomeIcon
									style={{ width: '18px', height: '18px' }}
									icon={faGear}
									color={process.env.NEXT_PUBLIC_COLOR_ORANGE}
								/>
							</Div>
							<Paragraph className="noneOpen">Nastavení</Paragraph>
						</A>
					</Link>
				</div>
			</Container>
			<Handle onClick={navHandling}></Handle>
		</Nav>
	)
}

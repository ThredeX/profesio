import React, { useRef, useState, useContext } from 'react'
import styled, { ThemeProvider } from 'styled-components'
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
import Link from 'next/link'
import { Context } from '../pages/_app'

const Container = styled.div`
	&::-webkit-scrollbar {
		width: 0px;
	}
	position: fixed;
	overflow-y: scroll;
	padding: 0 15px;
	height: 100%;
	border-radius: 30px;
`
const Paragraph = styled.p`
	color: ${props => props.theme.text};
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
	min-height: 100vh;
	position: fixed;
	box-shadow: -2px 0 1px 0 #0f0f0fc1;
	width: 60px;
	top: 0;
	z-index: 20;
	right: 0;
	background-color: ${props => props.theme.nav};
	color: ${props => props.theme.text};
	transition: width 0.5s ease;
`
const Handle = styled.div`
	border-radius: 10px 0 0 10px;
	width: 12px;
	height: 100px;
	padding: 5px;
	position: absolute;
	top: 50%;
	left: -10px;
	opacity: 0;
	transform: translate(-50%, -50%);
	transition: opacity 0.5s ease;
	cursor: pointer;
	background-color: ${props => props.theme.color};
	${Nav}:hover & {
		opacity: 1;
	}
`
const DivHeading = styled.div`
	display: flex;
	opacity: 0;
	justify-content: center;
	align-items: center;
	margin-left: 2rem;
`
export default function NavBar({ route }) {
	const faIconSize = { width: '19px', height: '19px' }
	const [state, setState] = useState(false)
	const navRef = useRef(null)
	const theme = useContext(Context)
	function navHandling() {
		let displayMenuOpen = document.getElementsByClassName('noneOpen')
		if (state === false) {
			navRef.current.style.width = 'clamp(100px, 60vw, 300px)'
			for (let i = 0; i < displayMenuOpen.length; i++) {
				displayMenuOpen[i].style.opacity = '1'
			}
			setState(true)
		} else {
			navRef.current.style.width = '60px'
			for (let i = 0; i < displayMenuOpen.length; i++) {
				displayMenuOpen[i].style.opacity = '0'
			}
			setState(false)
		}
	}
	return (
		<ThemeProvider theme={useContext(Context)}>
			<Nav ref={navRef}>
				<Container>
					<DivHeading className="noneOpen">
						<FontAwesomeIcon size="2x" icon={faUser} color={theme.color} />
						<Heading1>{'Jmeno Správce'}</Heading1>
					</DivHeading>
					<>
						{route == 'administrator' ? (
							<div>
								<Link href={`/peoples/${route}/AddingRoom`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderPlus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Přidat učebnu
										</Paragraph>
									</A>
								</Link>
								<Link href={`/peoples/${route}/ChangingRoom`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderOpen}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Změnit nastavení učebny
										</Paragraph>
									</A>
								</Link>
								<Link href={`/peoples/${route}/deletingRoom`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderMinus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Odebrat učebnu
										</Paragraph>
									</A>
								</Link>
								<Line></Line>
								<Link href={`/peoples/${route}/AddingPeople`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserPlus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Přidat studenta/zaměstnance
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/ChangingPeople`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Změnit nastavení studenta/zaměstnance
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/DeletingPeople`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserMinus}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Odebrat studenta/zaměstnance
										</Paragraph>
									</A>
								</Link>
								<Line></Line>
								<Link
									href={`/peoples/${route}/schoolSettings`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faGears}
												color={theme.color}
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
												style={faIconSize}
												icon={faGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Nastavení
										</Paragraph>
									</A>
								</Link>
							</div>
						) : route == 'teacher' ? (
							<div>
								<Link href={`/peoples/${route}/timetable`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Rozvrh
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/changingtimetable`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderOpen}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Úprava rozvrhů
										</Paragraph>
									</A>
								</Link>

								<Link href={'/peoples/settings'} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Nastavení
										</Paragraph>
									</A>
								</Link>
							</div>
						) : route == 'student' ? (
							<div>
								<Link href={`/peoples/${route}/timetable`} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faFolderOpen}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Rozvrh
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/timetablecreate`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Vytvoření rozvrhu
										</Paragraph>
									</A>
								</Link>
								<Link
									href={`/peoples/${route}/timetablechange`}
									passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faUserGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Úprava rozvrhu
										</Paragraph>
									</A>
								</Link>
								<Link href={'/peoples/settings'} passHref>
									<A>
										<Div>
											<FontAwesomeIcon
												style={faIconSize}
												icon={faGear}
												color={theme.color}
											/>
										</Div>
										<Paragraph className="noneOpen">
											Nastavení
										</Paragraph>
									</A>
								</Link>
							</div>
						) : null}
					</>
				</Container>
				<Handle onClick={navHandling}></Handle>
			</Nav>
		</ThemeProvider>
	)
}

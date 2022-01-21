import React from 'react'
import '../styles/globals.css'
import { createContext, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
export const Context = createContext({
	bg: '#121212',
	text: '#fff',
	color: '#03d3fc',
	nav: '#1E1E1E',
	box: '#1E1E1E',
	shadow: '#fff',
	tableLine: '#444',
	border: '#fff',
})

function MyApp({ Component, pageProps }) {
	// colors to switch
	const ORANGE = '#ff5900'
	const BLUE = '#03d3fc'
	const RED = '#ff0000'
	const WHITE = '#ffffff'
	const GREEN = '#1aff00'
	const PURPLE = '#5100ff'

	// Background
	const BG_LIGHT = '#fff'
	const BG_DARK = '#121212'

	// Navigation
	const NAV_LIGHT = '#fff'
	const NAV_DARK = '#1E1E1E'

	// text
	const TEXT_LIGHT = '#121212'
	const TEXT_DARK = '#fff'

	// box
	const BOX_LIGHT = '#eeeeee'
	const BOX_DARK = '#1E1E1E'

	//shadow
	const SHADOW_LIGHT = '#dddddd'
	const SHADOW_DARK = '#131313'
	//border
	const BORDER_LIGHT = '#929292'
	const BORDER_DARK = '#fff'
	//table border
	const TABLE_LINE_LIGHT = '#b3b3b3'
	const TABLE_LINE_DARK = '#444'

	let theme = {}

	if (true) {
		theme = {
			bg: BG_DARK,
			text: TEXT_DARK,
			color: BLUE,
			nav: NAV_DARK,
			box: BOX_DARK,
			shadow: SHADOW_DARK,
			tableLine: TABLE_LINE_DARK,
			border: BORDER_DARK,
		}
	} else {
		theme = {
			bg: BG_LIGHT,
			text: TEXT_LIGHT,
			color: PURPLE,
			nav: NAV_LIGHT,
			box: BOX_LIGHT,
			shadow: SHADOW_LIGHT,
			tableLine: TABLE_LINE_LIGHT,
			border: BORDER_LIGHT,
		}
	}
	useEffect(() => {
		document.body.style.backgroundColor = `${theme.bg}`
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<Context.Provider
				value={theme}>
				<Component {...pageProps} />
			</Context.Provider>
		</ThemeProvider>
	)
}
export default MyApp

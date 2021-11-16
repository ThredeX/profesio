import React from 'react'
import '../styles/globals.css'
import { createContext, useEffect } from 'react'

export const Context = createContext(null)

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
	const BG_DARK = '#090909'

	// Navigation
	const NAV_LIGHT = '#fff'
	const NAV_DARK = '#141414'

	// text
	const TEXT_LIGHT = '#000'
	const TEXT_DARK = '#fff'

	// box
	const BOX_LIGHT = '#f1f1f1'
	const BOX_DARK = '#141414'

	let theme = {}

	if (true) {
		theme = {
			bg: BG_DARK,
			text: TEXT_DARK,
			color: RED,
			nav: NAV_DARK,
			box: BOX_DARK,
		}
	} else {
		theme = {
			bg: BG_LIGHT,
			text: TEXT_LIGHT,
			color: PURPLE,
			nav: NAV_LIGHT,
			box: BOX_LIGHT,
		}
	}
	useEffect(() => {
		document.body.style.backgroundColor = `${theme.bg}`
	})

	return (
		<Context.Provider value={theme}>
			<Component {...pageProps} />
		</Context.Provider>
	)
}
export default MyApp

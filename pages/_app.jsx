import React from 'react'
import '../styles/globals.css'
import { createContext, useEffect } from 'react'

export const Context = createContext(null)

function MyApp({ Component, pageProps }) {
	let theme = {}
	if (true) { //dark
		theme = {
			bg: process.env.NEXT_PUBLIC_COLOR_BG_DARK,
			text: process.env.NEXT_PUBLIC_COLOR_TEXT_DARK,
			color: process.env.NEXT_PUBLIC_COLOR_BLUE,
			nav: process.env.NEXT_PUBLIC_COLOR_NAV_DARK,
			box: process.env.NEXT_PUBLIC_COLOR_BOX_DARK
		}
	} else { //light
		theme = {
			bg: process.env.NEXT_PUBLIC_COLOR_BG_LIGHT,
			text: process.env.NEXT_PUBLIC_COLOR_TEXT_LIGHT,
			color: process.env.NEXT_PUBLIC_COLOR_PURPLE,
			nav: process.env.NEXT_PUBLIC_COLOR_NAV_LIGHT,
			box: process.env.NEXT_PUBLIC_COLOR_BOX_LIGHT
		}
	}
	useEffect(()=> {
		document.body.style.backgroundColor = `${theme.bg}`
	})
	
	return (
		<Context.Provider value={theme}>
			<Component {...pageProps} />
		</Context.Provider>
	)
}
export default MyApp

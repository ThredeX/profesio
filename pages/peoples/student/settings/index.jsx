//settings menu
import React, { useContext, useState, useEffect } from 'react'
import Header from '../../../../Components/Header'
import NavBar from '../../../../Components/NavBar'
import { ThemeProvider } from 'styled-components'
import { Context } from '../../../_app'
import { MainHeading, Main} from '../../../../theme'
import PasswordChange from '../../../../Components/PasswordChange'
import { logged } from '../../../../utils/logged'


const Index = () => {
	const [load, setLoad] = useState(false);

    useEffect(async () => {
		let data = await logged()
		setLoad(!!data)
	}, [])
    return load && (

        <>
        <ThemeProvider theme={useContext(Context)}>
            <Header />
            <NavBar route='student' name='Dominik'/>
            <MainHeading>Nastavení</MainHeading>
            <Main>
                <PasswordChange />
            </Main>
        </ThemeProvider>
    </>

    )
}
export default Index
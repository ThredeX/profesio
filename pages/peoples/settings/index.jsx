//settings menu
import React, { useContext, useState } from 'react'

import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'
import { ThemeProvider } from 'styled-components'
import { Context } from '../../_app'
import { MainHeading, Main} from '../../../theme'
import PasswordChange from '../../../Components/PasswordChange'
import ThemeChange from '../../../Components/ThemeChange'


const Index = () => {
    return (
        <>
        <ThemeProvider theme={useContext(Context)}>
            <Header />
            <NavBar route="administrator" />
            <MainHeading>Nastavení uživatele</MainHeading>
            <Main>
                <PasswordChange />
                <ThemeChange />
            </Main>
        </ThemeProvider>
    </>
    )
}
export default Index
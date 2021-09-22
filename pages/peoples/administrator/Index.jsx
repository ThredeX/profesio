import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../../../Components/Header'
import NavBar from '../../../Components/NavBar'


//pro vsechny uzivatele, komponenta bude 3x vyuzita (student, admin, ucitel) jako main page
const Heading = styled.h1`
    color: ${process.env.NEXT_PUBLIC_COLOR_BLACK};
    font-size: clamp(3rem, 5vw, 5vw);
    text-align: center;
`
const Span = styled.span`
    color: ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
`
const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
`
const Main = styled.main`
    height: 100vh;
`
const Index = () => {
    const [bool, setBool] = useState(true);
    function handleBool() {
        setBool(false)
    }
    return (
        <>
            <Header handleBool={handleBool}/>
            <Main>
                <Container>
                    {bool && <Heading>Vítejte v aplikaci <br/> <Span>P</Span>rofesio</Heading>}
                </Container>
            </Main>
            <NavBar />
        </>
    )
}
export default Index
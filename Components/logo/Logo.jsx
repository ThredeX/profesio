import React, { useContext } from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Context} from '../../pages/_app'

const Heading = styled.h1`
    border-bottom: ${props => props.theme.orange} solid;
    padding: .5rem;
    width: 11rem;
    margin-top: 0rem;
    color: ${props => props.theme.text};
`
const Span = styled.span`
    color: ${props => props.theme.orange};
`

const Logo = () => {
    return (
        <ThemeProvider theme={useContext(Context)}>
            <Heading>
                <Span>P</Span>rofesio
            </Heading>
        </ThemeProvider>
    )
}
export default Logo

import React from 'react'
import styled from 'styled-components'

const Heading = styled.h1`
    border-bottom: ${process.env.NEXT_PUBLIC_COLOR_ORANGE} solid;
    padding: .5rem;
    width: 11rem;
    margin-top: 0rem;
`
const Span = styled.span`
    color: ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
`

const Logo = () => {
    return (
       <Heading>
           <Span>P</Span>rofesio
       </Heading>
    )
}
export default Logo

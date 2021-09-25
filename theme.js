import styled from 'styled-components'

export const Form = styled.form`
    width: clamp(20rem, 20vw, 80vw);
    margin: 0 auto;
`
export const Field = styled.input`
    width: 100%;
    border: 1px ${process.env.NEXT_PUBLIC_COLOR_BLACK} solid;
    border-radius: 20px;
    margin-block: .3rem;
    padding: .3rem .6rem;
    &::placeholder {
        color: grey;
    }
`
export const SubmitButton = styled.input`
    border-radius: 20px;
    border: none;
    padding: .5rem 3rem;
    float: right;
    height: 2.5rem;
    margin-top: .8rem;
    background-color: ${process.env.NEXT_PUBLIC_COLOR_ORANGE};
    color: #fff;
    cursor: pointer;
`
export const BackButton = styled.button`

`
export const SaveButton = styled.button`

`
export const Radio = styled.input`
    cursor: pointer;
    width: 15px;
    height: 15px;
`
export const MainHeading = styled.h1`
    margin-left: 2rem;
`
export const Label = styled.label`

`
export const Select = styled.select`
    width: 100%;
    border: 1px ${process.env.NEXT_PUBLIC_COLOR_BLACK} solid;
    border-radius: 20px;
    margin-block: .3rem;
    padding: .3rem .6rem;
`
export const Main = styled.main`
    height: 80vh;
    padding-top: 2rem;
`
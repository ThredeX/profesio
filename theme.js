import styled from 'styled-components'

export const Form = styled.form`
	width: clamp(20rem, 20vw, 80vw);
`
export const Form2= styled.form`
	width: clamp(15rem, 80%, 80vw);
	margin-left: 1rem;
`
export const Input = styled.input`
	width: 100%;
	border: 1px ${props => props.theme.text} solid;
	border-radius: 20px;
	margin-block: 0.3rem;
	padding: 0.3rem 0.6rem;
	&::placeholder {
		color: #999999;
	}
`
export const SubmitButton = styled.input`
	border-radius: 20px;
	border: none;
	padding: 0.5rem 3rem;
	height: 1.95rem;
	background-color: ${props => props.theme.color};
	color: #fff;
	cursor: pointer;
	float: right;
`
export const Radio = styled.input`
	cursor: pointer;
	width: 15px;
	height: 15px;
	&:after {
		width: 15px;
		height: 15px;
		border-radius: 15px;
		top: -2px;
		left: -1px;
		position: relative;
		background-color: #fff;
		content: '';
		display: inline-block;
		visibility: visible;
		border: 2px solid ${props => props.theme.text};
	}
	&:checked:after {
		width: 15px;
		height: 15px;
		border-radius: 15px;
		top: -2px;
		left: -1px;
		position: relative;
		background-color: ${props => props.theme.color};
		content: '';
		display: inline-block;
		visibility: visible;
		border: 2px solid ${props => props.theme.text};
	}
`
export const MainHeading = styled.h1`
	text-align: center;
	font-size: clamp(1.5rem, 3vw, 3rem);
	font-weight: 100;
	color: ${props => props.theme.text};
	margin-top: -1rem;
`
export const Heading2 = styled.h2`
	text-align: center;
	font-size: clamp(1.5rem, 2vw, 2rem);
	font-weight: 100;

	color: ${props => props.theme.text};
`
export const Label = styled.label`
	font-weight: 100;
	width: 10rem;
	padding: 0 0.5rem;
	color: ${props => props.theme.text};
`
export const Select = styled.select`
	width: 100%;
	border-radius: 20px;
	margin-block: 0.3rem;
	padding: 0.3rem 0.6rem;
	font-weight: 100;
`
export const Option = styled.option`
	border: none;
	color: ${props => props.theme.text};
	background-color: ${props => props.theme.box};
`
export const Select2 = styled.select`
	width: 100%;
	border: 1px ${props => props.theme.text} solid;
	border-radius: 20px;
	margin-block: 0.3rem;
	padding: 0.3rem 0.6rem;
	&::placeholder {
		color: #999999;
	}
`
export const Main = styled.main`
	height: 80vh;
	padding-top: 2rem;
`
export const Paragraph = styled.p`
	color: ${props => props.theme.color};
`
export const Box = styled.div`
	font-weight: 100;
	margin: 1.5rem 0rem 0rem 1rem;
	padding-inline: 10px;
	border-radius: 20px;
	padding-bottom: 1.5rem;
	position: relative;
	overflow: hidden;
	background-color: ${props => props.theme.box};

	&::-webkit-scrollbar {
		height: 0px;
	}
	&::-webkit-scrollbar-thumb {
		box-sizing: border-box;
		width: 10px;
		background-color: ${props => props.theme.color};
		border-radius: 10px;
	}
	
`
export const Table = styled.table`
	color: ${props => props.theme.text};
	text-align: center;
	border-collapse: collapse;
	width: ${props => props.size * 8 + 'rem'};
	margin: 20px;
	font-size: clamp(1rem, 1.5vw, 1.5rem);
`
export const Th = styled.th`
	font-weight: 100;
	color: ${props => props.theme.text};
	border: 1px solid #444;
	position: relative;
	height: 100%;
	&:nth-child(1) {
		border: none;
	}

`
export const Td = styled.td`
	width: 8rem;
	height: 8rem;
	position: relative;
	border: 1px solid #444;
	padding: 0.4rem;
`
export const Tr = styled.tr`
	height: 8rem;
	width: 8rem;
`
export const Tbody = styled.tbody`
`

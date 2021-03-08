import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
  cardBackground:"grey"
};

export const darkTheme = {
  body: "#000",
  fontColor: "#fff",
  cardBackground:"SteelBlue"
  
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;
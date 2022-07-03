import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import palette from "./palette";
// import typography from "./typography";

let theme = createTheme({
    palette,
    // typography,
    shape: { borderRadius: 10, borderColor: "#FFFFFF" },
});

theme = responsiveFontSizes(theme);

export default theme;

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import palette from "./palette";

let theme = createTheme({
    palette,
    shape: { borderRadius: 10, borderColor: "#FFFFFF" },
});

theme = responsiveFontSizes(theme);

export default theme;

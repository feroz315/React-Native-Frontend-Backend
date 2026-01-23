import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    // primary: "#E1AD01", // mustard
    // secondary: "#CDCDD2",   // grey
    // danger:"#f61244",     //light red  
    // lightblack:"#959595", //light black
    // orange:"#fb923c",     //orange 
    // redlight:"#bd2c3d",
    // // colors
    // black: "#1E1F20",
    // white: "#FFFFFF",
    // lightGray: "#F5F5F6",
    // lightGray2: "#F6F6F7",
    // lightGray3: "#EFEFF1",
    // lightGray4: "#F8F8F9",
    // transparent: "transparent",
    // darkgray: '#898C95',
    red: '#F52A2A',
    green: '#00B761',
    white: '#FFF',
    dark: '#000',
    primary: '#F9813A',
    secondary: '#fedac5',
    grey: '#908e8c',
    yellow: `rgb(250,230,50)`,
    gray: `rgb(120,120,120)`,
    light: `rgb(240,240,240)`,
    blue:'#154c79',
    lightblue:'#4C629E',
    lightred:'#CE3B42',
    lightOrange:'rgb(21,76,121)',
    lightblue:'rgb(21,76,121)',
    lightwhite:'#E5E5E5',
    navy:'#3B3178',
    brown:'#170708',
    lightgreen:'#75BEBA',
    lightgary:"#376061",
    lightyellow:'#FCCD91',
    lighdark:'#170708',
    Danger:"#DB3D45",
    Darknavy:"#154c79",

};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Poppins-Regular", fontSize: SIZES.largeTitle, includeFontPadding: false, textAlignVertical: 'center' },
    h1: { fontFamily: "Poppins-Bold", fontSize: SIZES.h1, color: COLORS.black, includeFontPadding: false, textAlignVertical: 'center' },
    h2: { fontFamily: "Poppins-Medium", fontSize: SIZES.h2, color: COLORS.black, includeFontPadding: false, textAlignVertical: 'center' },
    h3: { fontFamily: "Poppins-Medium", fontSize: SIZES.h3, color: COLORS.black, includeFontPadding: false, textAlignVertical: 'center' },
    h4: { fontFamily: "Poppins-Medium", fontSize: SIZES.h4, color: COLORS.black, includeFontPadding: false, textAlignVertical: 'center' },
    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1, includeFontPadding: false, textAlignVertical: 'center' },
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2, includeFontPadding: false, textAlignVertical: 'center' },
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3, includeFontPadding: false, textAlignVertical: 'center' },
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4, includeFontPadding: false, textAlignVertical: 'center' },
    body5: { fontFamily: "Poppins-Regular", fontSize: SIZES.body5, includeFontPadding: false, textAlignVertical: 'center' },
};


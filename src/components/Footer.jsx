import React from "react";
import { Box, Typography, IconButton } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#121212",
        color: "#ccc",
        textAlign: "center",
        py: 5,
        px: 2,
      }}
    >
   
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mb: 3,
          flexWrap: "wrap",
          fontSize: "17px",
        }}
      >
        <a href="#" style={{textDecoration:'none',color:'white'}}>Product</a>
        <a href="#" style={{textDecoration:'none',color:'white'}}>Resources</a>
        <a href="#" style={{textDecoration:'none',color:'white'}}>Templates</a>
        <a href="#" style={{textDecoration:'none',color:'white'}}>Company</a>
      </Box>

   
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#fff", mb: 1,letterSpacing:'1px' }}
      >
        Resume Builder
      </Typography>
      <Typography sx={{ fontSize: "14px", mb: 2, letterSpacing:'1px' }}>
        Create, design, and optimize your professional resume with ease.
      </Typography>


     

   
      <Box sx={{ width: "80%", margin: "auto", borderTop: "1px solid #333", mb: 2 }} />

   
      <Typography sx={{ fontSize: "13px", color: "#666" }}>
        © {new Date().getFullYear()} Resume Builder. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
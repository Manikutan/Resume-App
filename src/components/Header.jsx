import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

function Header() {
  const intro = "A Resume Builder App is an essential tool for job seekers looking to create polished and effective resumes. By combining ease of use with professional design options, these apps empower users to present their qualifications confidently and increase their chances of landing job interviews.";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#4288c9ff' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/7039/7039285.png"
              alt="Logo"
              sx={{
                width: { xs: 35, sm: 45, md: 50 }, // responsive sizes
                height: 'auto',
              }}
            />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '18px', sm: '22px', md: '25px' },
              color: 'white',
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Resume Builder
            </Link>
          </Typography>

          <Tooltip title={intro}>
            <Button
              color="inherit"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
              }}
            >
              About
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
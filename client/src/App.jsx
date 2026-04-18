import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import theme from './theme/theme';

import FeedPage from './pages/Feed';
import ConnectionsPage from './pages/Connections';
import MessagesPage from './pages/Messages';
import ProfilePage from './pages/Profile';
import OnboardingPage from './pages/Onboarding';
import EventDetailPage from './pages/EventDetails';
import { contextFeed } from './data/mockData';

function App() {
  const [tab, setTab] = useState(0);
  const [onboarded, setOnboarded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [socialBattery, setSocialBattery] = useState('medium');
  const [openToTalk, setOpenToTalk] = useState(true);

  if (!onboarded) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OnboardingPage onComplete={() => setOnboarded(true)} />
      </ThemeProvider>
    );
  }

  if (selectedEvent) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EventDetailPage
          event={selectedEvent}
          onBack={() => setSelectedEvent(null)}
          openToTalk={openToTalk}
        />
      </ThemeProvider>
    );
  }

  const pages = [
    <FeedPage
      key="feed"
      socialBattery={socialBattery}
      onSelectEvent={setSelectedEvent}
    />,
    <ConnectionsPage key="connections" />,
    <MessagesPage key="messages" />,
    <ProfilePage
      key="profile"
      socialBattery={socialBattery}
      setSocialBattery={setSocialBattery}
      openToTalk={openToTalk}
      setOpenToTalk={setOpenToTalk}
    />,
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          maxWidth: 480,
          mx: 'auto',
          position: 'relative',
          pb: '68px',
        }}
      >
        {pages[tab]}

        <Paper
          elevation={0}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 480,
            zIndex: 1000,
            borderTop: '1px solid',
            borderColor: 'divider',
            borderRadius: 0,
          }}
        >
          <BottomNavigation
            value={tab}
            onChange={(_, v) => setTab(v)}
            showLabels
          >
            <BottomNavigationAction label="Discover" icon={<ExploreIcon />} />
            <BottomNavigationAction label="People" icon={<PeopleAltIcon />} />
            <BottomNavigationAction label="Messages" icon={<ChatBubbleOutlineOutlinedIcon />} />
            <BottomNavigationAction label="Profile" icon={<AccountCircleOutlinedIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;

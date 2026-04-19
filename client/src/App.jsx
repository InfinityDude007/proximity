import { useMemo, useState, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Chip,
  useMediaQuery,
  AppBar,
  Toolbar,
  Tooltip,
  Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';

import { createAppTheme } from './theme';
import proximityLogo from './assets/proximity-logo.png';
import proximityLogoDark from './assets/proximity-logo-dark.png'
import favicon from '/favicon.png';
import faviconDark from '/favicon-dark.png'
import {
  loadUserPreferences,
  saveSocialBattery,
  saveUserInterests,
  saveOpenToTalk,
  saveOnboarded,
} from './utils/storage';
import FeedPage from './pages/Feed';
import ConnectionsPage from './pages/Connections';
import MessagesPage from './pages/Messages';
import ProfilePage from './pages/Profile';
import OnboardingPage from './pages/Onboarding';
import EventDetailPage from './pages/EventDetails';

const expandedDrawerWidth = 272;
const collapsedDrawerWidth = 92;
const THEME_MODE_KEY = 'proximity-theme-mode';

const navItems = [
  { label: 'Discover', icon: <ExploreIcon />, description: 'Nearby spaces', short: 'Go', tab: 0 },
  { label: 'People', icon: <PeopleAltIcon />, description: 'Connections', short: 'Ppl', tab: 1 },
  { label: 'Messages', icon: <ChatBubbleOutlineOutlinedIcon />, description: 'Shared moments', short: 'Msg', tab: 2 },
  { label: 'Profile', icon: <AccountCircleOutlinedIcon />, description: 'Preferences', short: 'Me', tab: 3 },
];

function SidebarContent({
  tab,
  setTab,
  collapsed,
  setCollapsed,
  showCollapseControl = true,
  mode,
}) {
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 1.5,
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          py: 1,
          mb: 1.5,
          position: 'relative',
        }}
      >
        <Tooltip title="Proximity" placement="right" disableHoverListener={!collapsed}>
          <Box
            component="img"
            src={collapsed ? (isDark ? faviconDark : favicon) : (isDark ? proximityLogoDark : proximityLogo)}
            alt="Proximity"
            sx={{
              width: collapsed ? 36 : 180,
              height: 'auto',
              flexShrink: 0,
              transition: 'width 0.3s ease',
              filter: isDark ? 'brightness(1.05)' : 'none',
            }}
          />
        </Tooltip>

        {showCollapseControl && !collapsed && (
          <IconButton size="small" onClick={() => setCollapsed(true)} sx={{ p: 1, ml: 'auto' }}>
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
        )}

        {showCollapseControl && collapsed && (
          <Tooltip title="Expand sidebar" placement="right">
            <IconButton
              size="small"
              onClick={() => setCollapsed(false)}
              sx={{ p: 1, position: 'absolute', right: 4, top: 8 }}
            >
              <ChevronRightRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box
        sx={{
          px: collapsed ? 0.75 : 1,
          py: 1.25,
          mb: 2,
          borderRadius: 4,
          background: isDark
            ? 'linear-gradient(160deg, rgba(104,76,211,0.18), rgba(45,106,79,0.22))'
            : 'linear-gradient(160deg, rgba(45,106,79,0.12), rgba(82,183,136,0.18))',
          border: '1px solid',
          borderColor: isDark ? alpha('#8B7CF6', 0.22) : alpha('#2D6A4F', 0.12),
          display: 'flex',
          alignItems: collapsed ? 'center' : 'flex-start',
          flexDirection: collapsed ? 'column' : 'row',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        <BoltRoundedIcon sx={{ color: isDark ? 'secondary.light' : 'primary.dark', flexShrink: 0 }} />
        {!collapsed && (
          <Box>
            <Typography variant="caption" fontWeight={800} color={isDark ? 'secondary.light' : 'primary.dark'} display="block">
              Campus mode
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Live shared spaces across UBD
            </Typography>
          </Box>
        )}
        {collapsed && (
          <Tooltip title="Campus mode: Live shared spaces across UBD" placement="right" arrow>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: isDark ? 'secondary.light' : 'primary.dark',
                fontSize: '0.65rem',
                textAlign: 'center',
              }}
            >
              Live
            </Typography>
          </Tooltip>
        )}
      </Box>

      <List sx={{ p: 0, display: 'grid', gap: 0.75 }}>
        {navItems.map((item) => {
          const selected = tab === item.tab;
          return (
            <ListItemButton
              key={item.label}
              selected={selected}
              onClick={() => setTab(item.tab)}
              sx={{
                borderRadius: 3.5,
                minHeight: 58,
                px: collapsed ? 1.2 : 1.4,
                justifyContent: collapsed ? 'center' : 'flex-start',
                bgcolor: selected
                  ? alpha(isDark ? '#8B7CF6' : '#2D6A4F', isDark ? 0.16 : 0.1)
                  : 'transparent',
                border: '1px solid',
                borderColor: selected
                  ? alpha(isDark ? '#8B7CF6' : '#2D6A4F', isDark ? 0.26 : 0.18)
                  : 'transparent',
                position: 'relative',
                '&:hover': {
                  bgcolor: selected
                    ? alpha(isDark ? '#8B7CF6' : '#2D6A4F', isDark ? 0.22 : 0.13)
                    : alpha(isDark ? '#8B7CF6' : '#2D6A4F', isDark ? 0.08 : 0.04),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 'unset' : 40,
                  color: selected ? 'primary.main' : 'text.secondary',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  primaryTypographyProps={{ fontWeight: 700, fontSize: '0.95rem' }}
                  secondaryTypographyProps={{ fontSize: '0.77rem' }}
                />
              )}
              {collapsed && (
                <Tooltip title={`${item.label} - ${item.description}`} placement="right" arrow>
                  <Typography
                    variant="caption"
                    sx={{ position: 'absolute', bottom: 4, fontSize: '0.65rem', opacity: 0.7, fontWeight: 600 }}
                  >
                    {item.short}
                  </Typography>
                </Tooltip>
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ my: 1.5 }} />

      <Box
        sx={{
          p: collapsed ? 1.2 : 1.5,
          borderRadius: 3.5,
          bgcolor: 'action.hover',
          border: '1px solid',
          borderColor: 'divider',
          textAlign: collapsed ? 'center' : 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: collapsed ? 'center' : 'flex-start',
        }}
      >
        {!collapsed ? (
          <>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              Status
            </Typography>
            <Chip size="small" label="Open to connect" color="success" sx={{ fontWeight: 700 }} />
          </>
        ) : (
          <Tooltip title="Open to connect" placement="right">
            <Chip size="small" label="On" color="success" sx={{ fontWeight: 700 }} />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

function AppShell({ children, tab, setTab, mode, muiTheme }) {
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));
  const isTabletUp = useMediaQuery(muiTheme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const isDark = mode === 'dark';

  const drawerWidth = isDesktop ? (collapsed ? collapsedDrawerWidth : expandedDrawerWidth) : expandedDrawerWidth;

  const drawer = (
    <SidebarContent
      tab={tab}
      setTab={(value) => {
        setTab(value);
        setMobileOpen(false);
      }}
      collapsed={isDesktop ? collapsed : false}
      setCollapsed={setCollapsed}
      showCollapseControl={isDesktop}
      mode={mode}
    />
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex' }}>
      {!isDesktop && (
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            backdropFilter: 'blur(16px)',
            backgroundColor: isDark ? alpha('#130f24', 0.86) : alpha('#F8F5F0', 0.84),
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3 } }}>
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1.5 }}>
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Proximity
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Shared spaces, low-pressure connections
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      )}

      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: expandedDrawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              overflowX: 'hidden',
              borderRight: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              transition: muiTheme.transitions.create('width', {
                easing: muiTheme.transitions.easing.sharp,
                duration: muiTheme.transitions.duration.standard,
              }),
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          px: { xs: 2, sm: 3, md: 4, xl: 5 },
          pt: { xs: 11, md: 4 },
          pb: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: isTabletUp ? 'min(1480px, calc(100vw - 140px))' : '100%',
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const [tab, setTab] = useState(0);
  const [onboarded, setOnboarded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [socialBattery, setSocialBattery] = useState('medium');
  const [userInterests, setUserInterests] = useState([]);
  const [openToTalk, setOpenToTalk] = useState(true);
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    const preferences = loadUserPreferences();
    setOnboarded(preferences.onboarded);
    setSocialBattery(preferences.socialBattery);
    setUserInterests(preferences.userInterests);
    setOpenToTalk(preferences.openToTalk);
    const savedMode = window.localStorage.getItem(THEME_MODE_KEY);
    if (savedMode === 'dark' || savedMode === 'light') {
      setThemeMode(savedMode);
    }
  }, []);

  const muiTheme = useMemo(() => createAppTheme(themeMode), [themeMode]);

  const handleSetSocialBattery = (value) => {
    setSocialBattery(value);
    saveSocialBattery(value);
  };

  const handleSetOpenToTalk = (value) => {
    setOpenToTalk(value);
    saveOpenToTalk(value);
  };

  const handleSetThemeMode = (value) => {
    setThemeMode(value);
    window.localStorage.setItem(THEME_MODE_KEY, value);
  };

  const handleOnboardingComplete = (batteryValue, interestsArray) => {
    setSocialBattery(batteryValue);
    setUserInterests(interestsArray);
    setOnboarded(true);
    saveSocialBattery(batteryValue);
    saveUserInterests(interestsArray);
    saveOnboarded(true);
  };

  const pages = useMemo(
    () => [
      <FeedPage key="feed" socialBattery={socialBattery} userInterests={userInterests} onSelectEvent={setSelectedEvent} />,
      <ConnectionsPage key="connections" userInterests={userInterests} />,
      <MessagesPage key="messages" />,
      <ProfilePage
        key="profile"
        socialBattery={socialBattery}
        setSocialBattery={handleSetSocialBattery}
        openToTalk={openToTalk}
        setOpenToTalk={handleSetOpenToTalk}
        userInterests={userInterests}
        setUserInterests={(interests) => {
          setUserInterests(interests);
          saveUserInterests(interests);
        }}
        themeMode={themeMode}
        setThemeMode={handleSetThemeMode}
      />,
    ],
    [openToTalk, socialBattery, userInterests, themeMode],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {!onboarded ? (
        <OnboardingPage onComplete={handleOnboardingComplete} />
      ) : selectedEvent ? (
        <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} openToTalk={openToTalk} />
      ) : (
        <AppShell tab={tab} setTab={setTab} mode={themeMode} muiTheme={muiTheme}>
          {pages[tab]}
        </AppShell>
      )}
    </ThemeProvider>
  );
}

export default App;

import { useMemo, useState } from 'react';
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
  Button,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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
  saveUserProfile,
} from './utils/storage';
import {
  getNextAvailabilityStatus,
  getAvailabilityMeta,
  getPreferenceChipSx,
  getSocialBatteryMeta,
  renderAvailabilityIcon,
  renderSocialBatteryIcon,
  SOCIAL_BATTERY_ORDER,
} from './data/preferencesUi';
import { buildUserProfile } from './data/userProfile';
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
  { label: 'Discover', icon: <ExploreIcon />, tab: 0 },
  { label: 'Messages', icon: <ChatBubbleOutlineOutlinedIcon />, tab: 1 },
  { label: 'People', icon: <PeopleAltIcon />, tab: 2 },
  { label: 'Profile', icon: <AccountCircleOutlinedIcon />, tab: 3 },
];

function SidebarContent({
  tab,
  setTab,
  collapsed,
  setCollapsed,
  showCollapseControl = true,
  mode,
  socialBattery,
  setSocialBattery,
  openToTalk,
  setOpenToTalk,
}) {
  const isDark = mode === 'dark';
  const batteryLevels = SOCIAL_BATTERY_ORDER;
  const batteryMeta = getSocialBatteryMeta(socialBattery);
  const availabilityMeta = getAvailabilityMeta(openToTalk);
  const batteryIcon = renderSocialBatteryIcon(socialBattery);

  const handleBatteryToggle = () => {
    const currentIndex = batteryLevels.indexOf(socialBattery);
    const nextIndex = (currentIndex + 1) % batteryLevels.length;
    setSocialBattery(batteryLevels[nextIndex]);
  };

  const handleOpenToTalkToggle = () => {
    setOpenToTalk(getNextAvailabilityStatus(openToTalk));
  };

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
      {showCollapseControl && collapsed && (
        <Tooltip title="Expand sidebar" placement='right'>
          <IconButton onClick={() => setCollapsed(false)} sx={{ p: 1, mx: "auto" }}>
            <ArrowBackIosRoundedIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          py: 1,
          mb: 2,
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={collapsed ? (isDark ? faviconDark : favicon) : (isDark ? proximityLogoDark : proximityLogo)}
          alt="Proximity"
          sx={{
            width: collapsed ? 60 : 180,
            height: 'auto',
            flexShrink: 0,
            transition: 'width 0.3s ease',
            filter: isDark ? 'brightness(1.05)' : 'none',
          }}
        />

        <Tooltip title="Collapse sidebar" placement="right">
          {showCollapseControl && !collapsed && (
            <IconButton onClick={() => setCollapsed(true)} sx={{ ml: 'auto' }}>
              <ArrowForwardIosRoundedIcon sx={{ fontSize: 28 }} />
            </IconButton>
          )}
        </Tooltip>
      </Box>

      <List sx={{ px: collapsed ? 1.5 : 0, display: 'grid', gap: 1 }}>
        {navItems.map((item) => {
          const selected = tab === item.tab;
          return (
            <Tooltip title={`${collapsed ? item.label : ''}`} placement="right">
              <ListItemButton
                key={item.label}
                selected={selected}
                onClick={() => setTab(item.tab)}
                sx={{
                  px: collapsed ? 0 : 'auto',
                  py: collapsed ? 1 : 'auto',
                  borderRadius: collapsed ? 10 : 3,
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
                    color: selected ? 'primary.main' : 'text.secondary',
                    justifyContent: 'center',
                    mr: collapsed ? 0 : 1,
                    ml: 0
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ my: 1.5 }} />

      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: collapsed ? 'center' : 'flex-start',
          gap: 1,
        }}
      >
        {!collapsed ? (
          <>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'text.secondary',
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                Your Vibe
              </Typography>
              <Typography variant="caption" sx={{ mt: 0.4, color: 'text.secondary', display: 'block' }}>
                {availabilityMeta.description}
              </Typography>
            </Box>

            <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
              <Chip
                size="medium"
                icon={renderAvailabilityIcon(openToTalk)}
                label={availabilityMeta.label}
                onClick={handleOpenToTalkToggle}
                sx={getPreferenceChipSx(availabilityMeta, isDark, { interactive: true  })}
              />
              <Chip
                size="medium"
                icon={batteryIcon}
                label={batteryMeta.label}
                color="default"
                onClick={handleBatteryToggle}
                sx={getPreferenceChipSx(batteryMeta, isDark, { interactive: true })}
              />
            </Stack>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setTab(3);
                setTimeout(() => {
                  document.getElementById('settings-section')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }, 100);
              }}
              sx={{
                alignSelf: 'flex-end',
                  mt: 0.5,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  px: 1.2,
                  py: 0.4,
                          }}
                        >
              More details
            </Button>
          </>
        ) : (
          <Stack direction="column" spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
            <Tooltip title={availabilityMeta.label} placement="right">
              <Chip
                size="small"
                icon={renderAvailabilityIcon(openToTalk, { sx: { fontSize: '18px' } })}
                label=""
                onClick={handleOpenToTalkToggle}
                sx={getPreferenceChipSx(availabilityMeta, isDark, { interactive: true, compact: true })}
              />
            </Tooltip>
            <Tooltip title={batteryMeta.label} placement="right">
              <Chip
                size="small"
                icon={batteryIcon}
                label=""
                color="default"
                onClick={handleBatteryToggle}
                sx={getPreferenceChipSx(batteryMeta, isDark, { interactive: true, compact: true })}
              />
            </Tooltip>
          </Stack>
          
        )}
      </Box>
    </Box>
  );
}

function AppShell({
  children,
  tab,
  setTab,
  mode,
  muiTheme,
  socialBattery,
  setSocialBattery,
  openToTalk,
  setOpenToTalk,
}) {
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
      socialBattery={socialBattery}
      setSocialBattery={setSocialBattery}
      openToTalk={openToTalk}
      setOpenToTalk={setOpenToTalk}
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
  const [onboarded, setOnboarded] = useState(() => loadUserPreferences().onboarded);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [socialBattery, setSocialBattery] = useState(() => loadUserPreferences().socialBattery);
  const [userInterests, setUserInterests] = useState(() => loadUserPreferences().userInterests);
  const [openToTalk, setOpenToTalk] = useState(() => loadUserPreferences().openToTalk);
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = window.localStorage.getItem(THEME_MODE_KEY);
    return savedMode === 'dark' || savedMode === 'light' ? savedMode : 'light';
  });
  const [userProfile, setUserProfile] = useState(() => buildUserProfile(loadUserPreferences().userProfile));

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

  const handleOnboardingComplete = (profileValue, batteryValue, interestsArray) => {
    const nextProfile = buildUserProfile(profileValue);
    setUserProfile(nextProfile);
    setSocialBattery(batteryValue);
    setUserInterests(interestsArray);
    setOnboarded(true);
    saveUserProfile(nextProfile);
    saveSocialBattery(batteryValue);
    saveUserInterests(interestsArray);
    saveOnboarded(true);
  };

  const pages = useMemo(
    () => [
      <FeedPage
        key="feed"
        socialBattery={socialBattery}
        setSocialBattery={handleSetSocialBattery}
        openToTalk={openToTalk}
        setOpenToTalk={handleSetOpenToTalk}
        userInterests={userInterests}
        onSelectEvent={setSelectedEvent}
        userProfile={userProfile}
        setTab={setTab}
      />,
      <MessagesPage key="messages" userProfile={userProfile} />,
      <ConnectionsPage key="connections" userProfile={userProfile} userInterests={userInterests} />,
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
        userProfile={userProfile}
        themeMode={themeMode}
        setThemeMode={handleSetThemeMode}
      />,
    ],
    [openToTalk, socialBattery, userInterests, userProfile, themeMode],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {!onboarded ? (
        <OnboardingPage initialProfile={userProfile} onComplete={handleOnboardingComplete} />
      ) : (
        <AppShell
          tab={tab}
          setTab={selectedEvent ? (value) => { setTab(value); setSelectedEvent(null); } : setTab}
          mode={themeMode}
          muiTheme={muiTheme}
          socialBattery={socialBattery}
          setSocialBattery={handleSetSocialBattery}
          openToTalk={openToTalk}
          setOpenToTalk={handleSetOpenToTalk}
        >
          {selectedEvent ? (
            <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} openToTalk={openToTalk} />
          ) : (
            pages[tab]
          )}
        </AppShell>
      )}
    </ThemeProvider>
  );
}

export default App;

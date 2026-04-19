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
  Avatar,
  Chip,
  useMediaQuery,
  AppBar,
  Toolbar,
  Tooltip,
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

import theme from './theme';
import FeedPage from './pages/Feed';
import ConnectionsPage from './pages/Connections';
import MessagesPage from './pages/Messages';
import ProfilePage from './pages/Profile';
import OnboardingPage from './pages/Onboarding';
import EventDetailPage from './pages/EventDetails';

const expandedDrawerWidth = 272;
const collapsedDrawerWidth = 92;

const navItems = [
  { label: 'Discover', icon: <ExploreIcon />, description: 'Nearby spaces', short: 'Go', tab: 0 },
  { label: 'People', icon: <PeopleAltIcon />, description: 'Connections', short: 'Ppl', tab: 1 },
  { label: 'Messages', icon: <ChatBubbleOutlineOutlinedIcon />, description: 'Shared moments', short: 'Msg', tab: 2 },
  { label: 'Profile', icon: <AccountCircleOutlinedIcon />, description: 'Preferences', short: 'Me', tab: 3 },
];

function SidebarContent({ tab, setTab, collapsed, setCollapsed, showCollapseControl = true }) {
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
          justifyContent: collapsed ? 'center' : 'space-between',
          px: collapsed ? 0 : 1,
          py: 1,
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            minWidth: 0,
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              width: 42,
              height: 42,
              fontWeight: 800,
              borderRadius: 3,
              boxShadow: '0 10px 28px rgba(45,106,79,0.18)',
            }}
          >
            P
          </Avatar>
          {!collapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={800} noWrap>
                Proximity
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Find your people naturally
              </Typography>
            </Box>
          )}
        </Box>

        {showCollapseControl && !collapsed && (
          <IconButton size="small" onClick={() => setCollapsed(true)}>
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
        )}

        {showCollapseControl && collapsed && (
          <Tooltip title="Expand sidebar" placement="right">
            <IconButton size="small" onClick={() => setCollapsed(false)}>
              <ChevronRightRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box
        sx={{
          px: collapsed ? 0.5 : 1,
          py: 1.25,
          mb: 2,
          borderRadius: 4,
          background: 'linear-gradient(160deg, rgba(45,106,79,0.12), rgba(82,183,136,0.18))',
          border: '1px solid',
          borderColor: alpha('#2D6A4F', 0.12),
          display: 'flex',
          alignItems: collapsed ? 'center' : 'flex-start',
          flexDirection: collapsed ? 'column' : 'row',
          gap: 1,
        }}
      >
        <BoltRoundedIcon sx={{ color: 'primary.dark' }} />
        {!collapsed && (
          <Box>
            <Typography variant="caption" fontWeight={800} color="primary.dark" display="block">
              Campus mode
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Live shared spaces across UBD
            </Typography>
          </Box>
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
                bgcolor: selected ? alpha('#2D6A4F', 0.1) : 'transparent',
                border: '1px solid',
                borderColor: selected ? alpha('#2D6A4F', 0.18) : 'transparent',
                '&:hover': {
                  bgcolor: selected ? alpha('#2D6A4F', 0.13) : alpha('#2D6A4F', 0.04),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 'unset' : 40,
                  color: selected ? 'primary.main' : 'text.secondary',
                  justifyContent: 'center',
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
                <Typography variant="caption" sx={{ position: 'absolute', bottom: 6, opacity: 0.65 }}>
                  {item.short}
                </Typography>
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ my: 1.5 }} />
      <Box
        sx={{
          p: collapsed ? 1 : 1.5,
          borderRadius: 3.5,
          bgcolor: '#F8F5F0',
          border: '1px solid',
          borderColor: 'divider',
          textAlign: collapsed ? 'center' : 'left',
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
          <Chip size="small" label="On" color="success" sx={{ fontWeight: 700 }} />
        )}
      </Box>
    </Box>
  );
}

function AppShell({ children, tab, setTab }) {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTabletUp = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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
            backgroundColor: 'rgba(248,245,240,0.84)',
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

      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
      >
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
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
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
  const [openToTalk, setOpenToTalk] = useState(true);

  const pages = useMemo(
    () => [
      <FeedPage key="feed" socialBattery={socialBattery} onSelectEvent={setSelectedEvent} />,
      <ConnectionsPage key="connections" />,
      <MessagesPage key="messages" />,
      <ProfilePage
        key="profile"
        socialBattery={socialBattery}
        setSocialBattery={setSocialBattery}
        openToTalk={openToTalk}
        setOpenToTalk={setOpenToTalk}
      />,
    ],
    [openToTalk, socialBattery],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!onboarded ? (
        <OnboardingPage onComplete={() => setOnboarded(true)} />
      ) : selectedEvent ? (
        <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} openToTalk={openToTalk} />
      ) : (
        <AppShell tab={tab} setTab={setTab}>
          {pages[tab]}
        </AppShell>
      )}
    </ThemeProvider>
  );
}

export default App;

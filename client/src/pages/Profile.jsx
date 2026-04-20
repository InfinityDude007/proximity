import { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Switch,
  Card,
  CardContent,
  Divider,
  Stack,
  Grid,
  Button,
  IconButton,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Battery1BarIcon from '@mui/icons-material/Battery1Bar';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { currentUser, batteryLevels } from '../data/mockData';
import {
  loadUserPreferences,
  saveOnboarded,
} from '../utils/storage';

const batteryOptions = [
  { value: 'low', icon: <Battery1BarIcon />, label: 'Low' },
  { value: 'medium', icon: <BoltIcon />, label: 'Moderate' },
  { value: 'high', icon: <AutoAwesomeIcon />, label: 'High' },
];

const interestOptions = [
  'Coffee',
  'Study Groups',
  'Music',
  'Gaming',
  'Fitness',
  'Outdoors',
  'Socials',
  'Startups',
];

export default function ProfilePage({
  socialBattery,
  setSocialBattery,
  openToTalk,
  setOpenToTalk,
  userInterests = [],
  setUserInterests,
  themeMode = 'light',
  setThemeMode,
}) {
  const [onboarded, setOnboarded] = useState(false);
  const battery = batteryLevels[socialBattery];
  const isDark = themeMode === 'dark';
  const handleThemeToggle = (event) => {
    setThemeMode(event.target.checked ? 'dark' : 'light');
  };

  const toggleInterest = (interest) => {
    if (userInterests.includes(interest)) {
      setUserInterests(userInterests.filter((i) => i !== interest));
    } else {
      setUserInterests([...userInterests, interest]);
    }
  };

  const handleRedoOnboarding = (batteryValue, interestsArray) => {
      setOnboarded(false);
      saveOnboarded(false);
    };

  return (
    <Box>
      <Box sx={{ mb: 3.2 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 0.8 }}>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 740 }}>
          Your preferences, visibility, social energy, and appearance settings.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={4.2}>
          <Stack spacing={2.5}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 2.4, alignItems: 'center', mb: 2.4 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 78, height: 78, fontSize: '1.8rem', fontWeight: 800 }}>
                    {currentUser.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={800}>{currentUser.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{currentUser.degree}</Typography>
                    <Typography variant="caption" color="text.secondary">{currentUser.year} · University of Birmingham Dubai</Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {interestOptions.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      size="small"
                      onClick={() => toggleInterest(interest)}
                      sx={{
                        bgcolor: userInterests.includes(interest) ? 'primary.main' : 'action.hover',
                        color: userInterests.includes(interest) ? 'white' : 'text.primary',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
            
            <Card sx={{ display: 'flex', flexDirection: 'row', gap: 2, background: 'transparent' }}>
              <Card
                sx={{
                  border: '1px dashed',
                  borderColor: 'primary.light',
                  bgcolor: isDark ? alpha('#8B7CF6', 0.08) : '#FAFFF9',
                }}
              >
                <CardContent sx={{ p: 2.4 }}>
                  <Typography variant="caption" color="primary.main" fontWeight={800} display="block" sx={{ mb: 0.5 }}>
                    Your data & privacy
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Proximity only shares your location within campus. Your profile is only visible when you are in a shared space, and you can go invisible any time.
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent sx={{ p: 2.8 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.6 }}>
                        <Typography variant="h6" fontWeight={800}>Redo Onboarding</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Need a refresher on how everything works? No problem!
                      </Typography>
                    </Box>
                    <IconButton onClick={() => setCollapsed(false)} sx={{ p: 1, mx: "auto" }}>
                      <RestartAltIcon sx={{ fontSize: 28 }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} xl={7.8}>
          <Stack spacing={2.5}>
            <Card>
              <CardContent sx={{ p: 2.8 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.6 }}>
                      {openToTalk ?
                        <FiberManualRecordIcon sx={{ fontSize: 10, color: '#52B788' }} />
                        : <FiberManualRecordIcon sx={{ fontSize: 10, color: '#E76F51' }} />
                      }
                      <Typography variant="h6" fontWeight={800}>Open to chat</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {openToTalk ? 'Others in the same location can send you a soft invite.' : 'You’re in private mode - no one can reach out.'}
                    </Typography>
                  </Box>
                  <Switch checked={openToTalk} onChange={(e) => setOpenToTalk(e.target.checked)} color="primary" />
                </Box>

                {openToTalk && (
                  <Box
                    sx={{
                      mt: 1.8,
                      p: 1.8,
                      bgcolor: isDark ? alpha('#52B788', 0.12) : '#F0FAF4',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: isDark ? alpha('#52B788', 0.26) : '#C8E6C9',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                    }}
                  >
                    <FiberManualRecordIcon sx={{ color: 'primary.main', mt: 0.3, fontSize: 18, flexShrink: 0 }} />
                    <Typography variant="body2" color={isDark ? 'text.primary' : 'primary.dark'}>
                      You're visible to people at the same places as you. They can only send soft openers - no cold messages.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 2.8 }}>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>Social battery</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.4 }}>
                  Adjust this to change what your feed prioritises.
                </Typography>

                <Grid container spacing={1.5}>
                  {batteryOptions.map((option) => (
                    <Grid item xs={12} md={4} key={option.value}>
                      <Box
                        onClick={() => setSocialBattery(option.value)}
                        sx={{
                          height: '100%',
                          border: '2px solid',
                          borderColor: socialBattery === option.value ? 'primary.main' : 'divider',
                          borderRadius: 3,
                          p: 2,
                          cursor: 'pointer',
                          bgcolor: socialBattery === option.value ? 'action.hover' : 'background.paper',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ fontSize: '2rem', mb: 0.8, color: 'primary.main' }}>{option.icon}</Box>
                        <Typography variant="subtitle1" fontWeight={800}>{option.label}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4, textAlign: 'center' }}>
                          {batteryLevels[option.value].description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 2, p: 1.8, bgcolor: 'action.hover', borderRadius: 3 }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.4 }}>
                    Current feed focus
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>{battery.recommendations.join(', ')}</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: 2.8 }}>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Preferences</Typography>
                {[
                  { label: 'Event reminders', desc: 'Notify me when something nearby starts', defaultOn: true },
                  { label: 'Follow-up prompts', desc: 'Suggest reconnecting after shared events', defaultOn: true },
                  { label: 'Group suggestions only', desc: 'Prefer group over one-on-one', defaultOn: false },
                ].map((pref, index) => (
                  <Box key={pref.label}>
                    {index > 0 && <Divider sx={{ my: 1.6 }} />}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={700}>{pref.label}</Typography>
                        <Typography variant="body2" color="text.secondary">{pref.desc}</Typography>
                      </Box>
                      <Switch defaultChecked={pref.defaultOn} color="primary" size="small" />
                    </Box>
                  </Box>
                ))}
                <Divider sx={{ my: 1.6 }} />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight={700}>Appearance</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Switch between light and dark mode.
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 1.25 }}>
                      <Chip
                        icon={<LightModeRoundedIcon />}
                        label="Light"
                        size="small"
                        variant={isDark ? 'outlined' : 'filled'}
                        color={isDark ? 'default' : 'primary'}
                        onClick={() => setThemeMode('light')}
                      />
                      <Chip
                        icon={<DarkModeRoundedIcon />}
                        label="Dark"
                        size="small"
                        variant={isDark ? 'filled' : 'outlined'}
                        color={isDark ? 'primary' : 'default'}
                        onClick={() => setThemeMode('dark')}
                      />
                    </Stack>
                  </Box>
                  <Switch
                    checked={isDark}
                    onChange={handleThemeToggle}
                    color="primary"
                    size="small"
                    inputProps={{ 'aria-label': 'Toggle dark mode' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

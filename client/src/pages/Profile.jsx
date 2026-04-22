import { useState } from 'react';
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
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
  AVAILABILITY_OPTIONS,
  renderAvailabilityIcon,
  renderSocialBatteryIcon,
  SOCIAL_BATTERY_OPTIONS,
} from '../data/preferencesUi';
import { interestOptions } from '../data/interestOptions';
import { saveOnboarded } from '../utils/storage';

export default function ProfilePage({
  socialBattery,
  setSocialBattery,
  openToTalk,
  setOpenToTalk,
  userInterests = [],
  setUserInterests,
  userProfile,
  themeMode = 'light',
  setThemeMode,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
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

  const handleRedoOnboarding = () => {
    saveOnboarded(false);
    window.location.reload();
  };

  const handleResetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const profileMetaLine = [userProfile.year, userProfile.university].filter(Boolean).join(' · ');

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

      <Stack spacing={2.5}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2.4, alignItems: 'center', mb: 2.4 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 78, height: 78, fontSize: '1.8rem', fontWeight: 800 }}>
                {userProfile.avatar}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={800}>{userProfile.name}</Typography>
                <Typography variant="body2" color="text.secondary">{userProfile.degree}</Typography>
                <Typography variant="caption" color="text.secondary">{profileMetaLine}</Typography>
              </Box>
            </Box>

            <Typography variant="h6" fontWeight={800} sx={{ mb: 1.5 }}>Your Interests</Typography>
            
            {userInterests.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1.2} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {userInterests.map((interestLabel) => {
                    const interest = interestOptions.find(i => i.label === interestLabel);
                    return (
                      <Chip
                        key={interestLabel}
                        icon={interest?.icon}
                        label={interestLabel}
                        size="small"
                        onClick={() => toggleInterest(interestLabel)}
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '& .MuiChip-icon': {
                            color: 'white',
                            mr: '0.05rem',
                          },
                          py: 2,
                          px: 1,
                          borderRadius: 1.5,
                        }}
                      />
                    );
                  })}
                </Stack>
              </Box>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: 16, fontWeight: 700 }}>Add Interests</Typography>
            <TextField
              placeholder="Search interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={1.2} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {interestOptions
                .filter((interest) => !userInterests.includes(interest.label) && interest.label.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((interest) => (
                  <Chip
                    key={interest.label}
                    icon={interest.icon}
                    label={interest.label}
                    size="small"
                    onClick={() => toggleInterest(interest.label)}
                    sx={{
                      bgcolor: 'action.hover',
                      color: 'text.primary',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '& .MuiChip-icon': {
                        mr: '0.05rem',
                      },
                      py: 2,
                      px: 1,
                      borderRadius: 1.5,
                    }}
                  />
                ))}
            </Stack>
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Card
            sx={{
              flex: 1,
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
          <Card sx={{ flex: 1 }}>
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
                <IconButton onClick={() => handleRedoOnboarding()} sx={{ p: 1, mx: "auto" }}>
                  <RestartAltIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Card>
          <CardContent sx={{ p: 2.8 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
              Availability
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.4 }}>
              Control who can reach out when you share the same space.
            </Typography>

            <Stack direction='row' spacing={1.5}>
              {AVAILABILITY_OPTIONS.map((option) => (
                <Grid item xs={12} md={4} key={option.value}>
                  <Box
                    onClick={() => setOpenToTalk(option.value)}
                    sx={{
                      height: '100%',
                      border: '2px solid',
                      borderColor: openToTalk === option.value ? option.color : 'divider',
                      borderRadius: 1,
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: openToTalk === option.value ? alpha(option.color, isDark ? 0.18 : 0.1) : 'background.paper',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Stack direction='row' useFlexGap spacing={1.5} sx={{ fontSize: '2rem', alignItems: 'center', justifyContent: 'center', mb: 0.8, color: option.color }}>
                      {renderAvailabilityIcon(option.value)}
                      <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary' }}>{option.label}</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                      {option.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: 2.8 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>Social battery</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.4 }}>
              Adjust this to change what your feed prioritises.
            </Typography>

            <Stack direction='row' spacing={1.5}>
              {SOCIAL_BATTERY_OPTIONS.map((option) => (
                <Grid item xs={12} md={4} key={option.value}>
                  <Box
                    onClick={() => setSocialBattery(option.value)}
                    sx={{
                      height: '100%',
                      border: '2px solid',
                      borderColor: socialBattery === option.value ? option.color : 'divider',
                      borderRadius: 1,
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: socialBattery === option.value ? alpha(option.color, isDark ? 0.18 : 0.1) : 'background.paper',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Stack
                      direction='row'
                      useFlexGap
                      spacing={1.5}
                      sx={{ fontSize: '2rem', alignItems: 'center', justifyContent: 'center', mb: 0.8, color: option.color }}
                    >
                      {renderSocialBatteryIcon(option.value)}
                      <Typography variant="subtitle1" fontWeight={800} sx={{ color: 'text.primary' }}>{option.label}</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                      {option.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Stack>
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

        <Card>
          <CardContent sx={{ p: 2.8 }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>Reset Data</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Delete all stored data and start fresh. This will clear your profile, preferences, and onboarding status.</Typography>
                <Typography variant="overline" color="error" sx={{ fontWeight: 700, fontSize: '14px' }}>WARNING: THIS ACTION IS PERMANENT AND CAN NEVER BE UNDONE!</Typography>
              </Box>
              <Button variant="outlined" color="error" onClick={() => setResetDialogOpen(true)} sx={{ maxHeight: '60px' }} startIcon={<DeleteForeverIcon />}>Reset All Data</Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Dialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        aria-labelledby="reset-dialog-title"
        aria-describedby="reset-dialog-description"
      >
        <DialogTitle id="reset-dialog-title">Reset All Data</DialogTitle>
        <DialogContent>
          <DialogContentText id="reset-dialog-description">
            Are really sure you sure you want to reset all data?
            
            <br /> <Typography variant="overline" color="error" sx={{ fontWeight: 700, fontSize: '16px' }}>WARNING: THIS ACTION IS PERMANENT AND CAN NEVER BE UNDONE!</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResetData} color="error" variant="contained">
            Reset All Data
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

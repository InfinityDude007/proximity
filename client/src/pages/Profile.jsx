import { useState } from 'react';
import {
  Box, Typography, Avatar, Chip, Switch, Card, CardContent,
  Divider, Stack, Button, Slider, FormControlLabel,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { currentUser, batteryLevels } from '../data/mockData';

const batteryOptions = [
  { value: 'low', emoji: '🔋', label: 'Low' },
  { value: 'medium', emoji: '⚡', label: 'Moderate' },
  { value: 'high', emoji: '✨', label: 'High' },
];

const interestsList = ['Coffee', 'Gaming', 'Music', 'Study Groups', 'Outdoors', 'Socials'];

export default function ProfilePage({ socialBattery, setSocialBattery, openToTalk, setOpenToTalk }) {
  const battery = batteryLevels[socialBattery];

  return (
    <Box sx={{ px: 2.5, pt: 4, pb: 2 }}>
      <Typography variant="h4" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 3 }}>
        Profile
      </Typography>

      {/* User card */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
          <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', mb: 2.5 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 64,
                height: 64,
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {currentUser.avatar}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>{currentUser.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser.degree}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentUser.year} · University of Birmingham Dubai
              </Typography>
            </Box>
          </Box>

          {/* Interests */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {currentUser.interests.map(i => (
              <Chip
                key={i}
                label={i}
                size="small"
                sx={{ bgcolor: '#F0FAF4', color: 'primary.dark', fontWeight: 500 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Open to talk toggle */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1, pr: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                {openToTalk && <FiberManualRecordIcon sx={{ fontSize: 10, color: '#52B788' }} />}
                <Typography variant="subtitle1" fontWeight={700}>
                  Open to chat
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {openToTalk
                  ? 'Others at the same location can send you a soft invite'
                  : 'You\'re in private mode — no one can reach out'}
              </Typography>
            </Box>
            <Switch
              checked={openToTalk}
              onChange={e => setOpenToTalk(e.target.checked)}
              color="primary"
            />
          </Box>

          {openToTalk && (
            <Box
              sx={{
                mt: 1.5,
                p: 1.5,
                bgcolor: '#F0FAF4',
                borderRadius: 2,
                border: '1px solid #C8E6C9',
              }}
            >
              <Typography variant="caption" color="primary.dark">
                🟢 You're visible to people at the same places as you. They can only send soft openers — no cold messages.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Social Battery */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>
            Social battery
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Adjust to change what your feed shows you
          </Typography>

          <Stack spacing={1.5}>
            {batteryOptions.map(opt => (
              <Box
                key={opt.value}
                onClick={() => setSocialBattery(opt.value)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  border: '2px solid',
                  borderColor: socialBattery === opt.value ? 'primary.main' : 'divider',
                  borderRadius: 2.5,
                  p: 1.8,
                  cursor: 'pointer',
                  bgcolor: socialBattery === opt.value ? '#F0FAF4' : 'white',
                  transition: 'all 0.15s ease',
                }}
              >
                <Typography sx={{ fontSize: '1.4rem' }}>{opt.emoji}</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>{opt.label}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {batteryLevels[opt.value].description}
                  </Typography>
                </Box>
                {socialBattery === opt.value && (
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>✓</Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Stack>

          <Box sx={{ mt: 2, p: 1.5, bgcolor: '#F8F5F0', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Current filter: <strong>{battery.recommendations.join(', ')}</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* HCI-aware note */}
      <Card sx={{ mb: 2, border: '1px dashed', borderColor: 'primary.light', bgcolor: '#FAFFF9' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="caption" color="primary.dark" fontWeight={600} display="block" sx={{ mb: 0.5 }}>
            Your data & privacy
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Proximity only shares your location within campus. Your profile is only visible when you're at a shared space. You can go invisible any time.
          </Typography>
        </CardContent>
      </Card>

      {/* Preferences section */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Preferences
          </Typography>
          {[
            { label: 'Event reminders', desc: 'Notify me when something nearby starts', defaultOn: true },
            { label: 'Follow-up prompts', desc: 'Suggest reconnecting after shared events', defaultOn: true },
            { label: 'Group suggestions only', desc: 'Prefer group over one-on-one', defaultOn: false },
          ].map((pref, i) => (
            <Box key={pref.label}>
              {i > 0 && <Divider sx={{ my: 1.5 }} />}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, pr: 2 }}>
                  <Typography variant="body2" fontWeight={600}>{pref.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{pref.desc}</Typography>
                </Box>
                <Switch defaultChecked={pref.defaultOn} color="primary" size="small" />
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        sx={{ mt: 1, borderRadius: 50, color: '#E76F51', borderColor: '#E76F51' }}
      >
        Sign out
      </Button>
    </Box>
  );
}

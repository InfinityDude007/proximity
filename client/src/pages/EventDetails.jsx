import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import VerifiedIcon from '@mui/icons-material/Verified';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { softInviteTemplates } from '../data/mockData';

const avatarColors = {
  R: '#2D6A4F',
  T: '#6B7280',
  L: '#7C3AED',
  J: '#1D4ED8',
  P: '#BE185D',
  S: '#B45309',
  O: '#0F766E',
  M: '#9333EA',
  Z: '#DC2626',
};

function AttendeeRow({ person, openToTalk }) {
  const [sent, setSent] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const isOpen = person.openToTalk;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ bgcolor: avatarColors[person.avatar] || 'primary.main', width: 46, height: 46, fontWeight: 800 }}>{person.avatar}</Avatar>
          {isOpen && <Box sx={{ position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, bgcolor: '#52B788', borderRadius: '50%', border: '2px solid white' }} />}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight={800}>{person.name}</Typography>
          <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap alignItems="center">
            <Typography variant="caption" color="text.secondary">{person.degree}</Typography>
            {isOpen && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <FiberManualRecordIcon sx={{ fontSize: 7, color: '#52B788' }} />
                <Typography variant="caption" sx={{ color: '#2D6A4F', fontWeight: 700 }}>open to chat</Typography>
              </Box>
            )}
          </Stack>
        </Box>

        {isOpen && !sent && openToTalk && <Button size="small" variant="outlined" onClick={() => setShowTemplates(true)} sx={{ px: 2, py: 1 }}>Say hi 👋</Button>}
        {sent && <Chip label="Sent ✓" size="small" sx={{ bgcolor: '#F0FAF4', color: 'primary.dark' }} />}
        {!isOpen && <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>busy</Typography>}
      </Box>

      <Dialog open={showTemplates} onClose={() => setShowTemplates(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 5 } }}>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={800}>Say hi to {person.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Pick a soft opener — no pressure on either side.</Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            {softInviteTemplates.map((template) => (
              <Box
                key={template.id}
                onClick={() => {
                  setSent(true);
                  setShowTemplates(false);
                }}
                sx={{
                  border: '1.5px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main', bgcolor: '#F0FAF4' },
                }}
              >
                <Typography variant="body2" fontWeight={500}>“{template.text}”</Typography>
                <Chip label={template.tone} size="small" sx={{ mt: 1, bgcolor: '#F3F4F6', color: 'text.secondary' }} />
              </Box>
            ))}
          </Stack>
          <Button fullWidth variant="text" color="inherit" sx={{ color: 'text.secondary' }} onClick={() => setShowTemplates(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default function EventDetailPage({ event, onBack, openToTalk }) {
  const [joined, setJoined] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    setToastOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: 1360, mx: 'auto' }}>
        <Box
          sx={{
            p: { xs: 2.5, md: 4 },
            mb: 3,
            borderRadius: 6,
            background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 60%, #52B788 100%)',
            color: 'white',
          }}
        >
          <IconButton onClick={onBack} sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', mb: 3, '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }} size="small">
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Grid container spacing={3} alignItems="end">
            <Grid item xs={12} lg={8}>
              <Chip label={event.type === 'event' ? '📅 Event' : '📍 Spot'} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white', fontWeight: 700, mb: 1.6 }} />
              <Typography variant="h3" sx={{ color: 'white', fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.05, mb: 1.2 }}>{event.title}</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.82)', maxWidth: 760 }}>{event.description}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Stack spacing={1.1}>
                {[
                  { icon: <LocationOnIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.84)' }} />, text: event.location },
                  { icon: <AccessTimeIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.84)' }} />, text: event.time },
                  { icon: <DirectionsWalkIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.84)' }} />, text: event.distance },
                ].map((item) => (
                  <Box key={item.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                    {item.icon}
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.92)' }}>{item.text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} xl={8}>
            <Stack spacing={3}>
              <Card>
                <CardContent sx={{ p: 3.2 }}>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.2 }}>Who’s here</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Green dot = open to chat. Tap “Say hi” for a soft, no-pressure opener.
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  {event.attendees.map((person, i) => (
                    <Box key={person.id}>
                      <AttendeeRow person={person} openToTalk={openToTalk} />
                      {i < event.attendees.length - 1 && <Divider />}
                    </Box>
                  ))}
                  {event.mutualCount > 0 && (
                    <Box sx={{ mt: 2, p: 1.6, bgcolor: '#F0FAF4', borderRadius: 3 }}>
                      <Typography variant="body2" color="primary.dark" fontWeight={700}>
                        🤝 {event.mutualCount} mutual connection{event.mutualCount > 1 ? 's' : ''} here
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} xl={4}>
            <Stack spacing={3}>
              <Card>
                <CardContent sx={{ p: 3.2 }}>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.2 }}>Details</Typography>
                  <Stack spacing={1.2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                      <Typography variant="body2">{event.credibility}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessibilityNewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">{event.accessibility}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3.2 }}>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.2 }}>Vibe</Typography>
                  <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
                    {event.tags.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#F3F4F6', color: 'text.secondary' }} />)}
                  </Stack>
                  <Chip
                    label={event.vibe === 'quiet' ? 'Quiet atmosphere' : 'Social atmosphere'}
                    sx={{ mt: 1.5, bgcolor: event.vibe === 'quiet' ? '#EEF2FF' : '#FFF7ED', color: event.vibe === 'quiet' ? '#4F46E5' : '#C2410C', fontWeight: 700 }}
                  />
                </CardContent>
              </Card>

              {!joined ? (
                <Button variant="contained" size="large" onClick={handleJoin} sx={{ py: 2, px: 3, fontSize: '1.05rem', fontWeight: 700 }}>
                  I’m heading there
                </Button>
              ) : (
                <Box sx={{ bgcolor: '#F0FAF4', border: '2px solid', borderColor: 'primary.light', borderRadius: 4, p: 2.5, textAlign: 'center' }}>
                  <Typography variant="body1" fontWeight={800} color="primary.dark" sx={{ mb: 0.6 }}>You’re in 🎉</Typography>
                  <Typography variant="body2" color="text.secondary">Your presence helps signal shared context for others nearby.</Typography>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Snackbar open={toastOpen} autoHideDuration={2600} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setToastOpen(false)} sx={{ borderRadius: 3 }}>
          Added to your nearby plans.
        </Alert>
      </Snackbar>
    </Box>
  );
}

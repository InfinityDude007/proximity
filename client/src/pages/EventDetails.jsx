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
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { softInviteTemplates } from '../data/mockData';
import { alpha, useTheme } from '@mui/material/styles';
import { isReachableAvailability } from '../data/preferencesUi';

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

function MetaRow({ icon, text }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box sx={{ width: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </Box>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.92)' }}>
        {text}
      </Typography>
    </Box>
  );
}

function AttendeeRow({ person, openToTalk }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [sent, setSent] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const isOpen = person.openToTalk;
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 1.5,
        }}
      >
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
          <Avatar
            sx={{
              bgcolor: avatarColors[person.avatar] || 'primary.main',
              width: 46,
              height: 46,
              fontWeight: 800,
            }}
          >
            {person.avatar}
          </Avatar>
          {isOpen && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 1,
                right: 1,
                width: 12,
                height: 12,
                bgcolor: 'success.main',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: 'background.paper',
              }}
            />
          )}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight={800} noWrap>
            {person.name}
          </Typography>
          <Stack
            direction="row"
            spacing={0.75}
            flexWrap="wrap"
            useFlexGap
            alignItems="center"
            sx={{ mt: 0.25 }}
          >
            <Typography variant="caption" color="text.secondary">
              {person.degree}
            </Typography>
            {isOpen && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <FiberManualRecordIcon sx={{ fontSize: 7, color: 'success.main' }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? 'success.light' : 'success.dark',
                    fontWeight: 700,
                  }}
                >
                  open to chat
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          {isOpen && !sent && isReachableAvailability(openToTalk) && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => setShowTemplates(true)}
              sx={{ px: 2, py: 0.75, minWidth: 72 }}
            >
              Say hi
            </Button>
          )}
          {sent && (
            <Chip
              label="Sent"
              size="small"
              sx={{ bgcolor: successSurface, color: isDark ? 'text.primary' : 'primary.dark' }}
            />
          )}
          {!isOpen && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              busy
            </Typography>
          )}
        </Box>
      </Box>

      <Dialog
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 5 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={800}>
            Say hi to {person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Pick a soft opener — no pressure on either side.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1.25} sx={{ mb: 2 }}>
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
                  minHeight: 72,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main', bgcolor: successSurface },
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  "{template.text}"
                </Typography>
                <Chip
                  label={template.tone}
                  size="small"
                  sx={{ mt: 1, bgcolor: subtleSurface, color: 'text.secondary', alignSelf: 'flex-start' }}
                />
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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [joined, setJoined] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const vibeChipColor = event.vibe === 'quiet' ? theme.palette.secondary.main : theme.palette.warning.main;

  const handleJoin = () => {
    setJoined(true);
    setToastOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1360, mx: 'auto' }}>
        <Box
          sx={{
            p: { xs: 2.5, md: 4 },
            mb: 3,
            borderRadius: 3,
            background: isDark
              ? 'linear-gradient(160deg, #17192B 0%, #20243D 55%, #2B3154 100%)'
              : 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 60%, #52B788 100%)',
            color: 'white',
            border: '1px solid',
            borderColor: isDark ? '#2A2E49' : 'transparent',
          }}
        >
          <IconButton
            onClick={onBack}
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: 'white',
              mb: 3,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
            }}
            size="small"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} lg={8}>
              <Chip
                label={event.type === 'event' ? '📅 Event' : '📍 Spot'}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white', fontWeight: 700, mb: 1.5 }}
              />
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontSize: { xs: '2rem', md: '3rem' },
                  lineHeight: 1.05,
                  mb: 1.25,
                }}
              >
                {event.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.82)', maxWidth: 760 }}>
                {event.description}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Stack spacing={1.25}>
                <MetaRow icon={<LocationOnIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.84)' }} />} text={event.location} />
                <MetaRow icon={<AccessTimeIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.84)' }} />} text={event.time} />
                <MetaRow icon={<DirectionsWalkIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.84)' }} />} text={event.distance} />
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          spacing={10}
          sx={{
            position: 'relative',
            left: { xs: 0, lg: 50, xl: 100 },
          }}
        >
          <Grid item xs={12} xl={8}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 0.75, textAlign: 'center' }}>
                  Who's here
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                  Green dot = open to chat. Tap "Say hi" for a soft, no-pressure opener.
                </Typography>
                <Divider sx={{ mb: 0.5 }} />
                {event.attendees.map((person, i) => (
                  <Box key={person.id}>
                    <AttendeeRow person={person} openToTalk={openToTalk} />
                    {i < event.attendees.length - 1 && <Divider />}
                  </Box>
                ))}
                {event.mutualCount > 0 && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: successSurface,
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.75,
                      textAlign: 'center',
                    }}
                  >
                    <HandshakeIcon sx={{ color: isDark ? 'text.primary' : 'primary.dark' }} />
                    <Typography variant="body2" color={isDark ? 'text.primary' : 'primary.dark'} fontWeight={700}>
                      {event.mutualCount} mutual connection{event.mutualCount > 1 ? 's' : ''} here
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} xl={4}>
            <Stack spacing={3.5}>
              <Card>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>
                    Details
                  </Typography>
                  <Stack spacing={1.25} alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
                      <Typography variant="body2">{event.credibility}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <AccessibilityNewIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary">{event.accessibility}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>
                    Vibe
                  </Typography>
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap justifyContent="center">
                    {event.tags.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ bgcolor: subtleSurface, color: 'text.secondary' }} />)}
                  </Stack>
                  <Chip
                    label={event.vibe === 'quiet' ? 'Quiet atmosphere' : 'Social atmosphere'}
                    sx={{ mt: 1.5, bgcolor: alpha(vibeChipColor, isDark ? 0.24 : 0.14), color: isDark ? 'text.primary' : vibeChipColor, fontWeight: 700 }}
                  />
                </CardContent>
              </Card>

              {!joined ? (
                <Button variant="contained" size="large" onClick={handleJoin} sx={{ py: 2, fontSize: '1.05rem', fontWeight: 700 }}>
                  I'm heading there
                </Button>
              ) : (
                <Box
                  sx={{
                    bgcolor: successSurface,
                    border: '2px solid',
                    borderColor: 'primary.light',
                    borderRadius: 4,
                    p: 2.5,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <EmojiEventsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body1" fontWeight={800} color={isDark ? 'text.primary' : 'primary.dark'} sx={{ mb: 0.6 }}>You're in</Typography>
                    <Typography variant="body2" color="text.secondary">Your presence helps signal shared context for others nearby.</Typography>
                  </Box>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2600}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setToastOpen(false)} sx={{ borderRadius: 3 }}>
          Added to your nearby plans.
        </Alert>
      </Snackbar>
    </Box>
  );
}

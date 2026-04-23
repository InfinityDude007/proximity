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
  AvatarGroup,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import VerifiedIcon from '@mui/icons-material/Verified';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
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

function AttendeeRow({ person, openToTalk }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [sent, setSent] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const isOpen = person.openToTalk;
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);

  const toneColors = {
    casual: { bg: alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07), color: 'primary.main' },
    warm: { bg: alpha(theme.palette.warning.main, isDark ? 0.14 : 0.07), color: 'warning.main' },
    'low-pressure': { bg: alpha(theme.palette.success.main, isDark ? 0.14 : 0.07), color: 'success.main' },
    flexible: { bg: alpha(theme.palette.info.main, isDark ? 0.14 : 0.07), color: 'info.main' },
  };

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
          <Typography variant="body2" sx={{ mt: 0.5, mb: 2, color: "text.secondary"}}>
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
                  borderRadius: 2,
                  px: 3,
                  py: 2,
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main', bgcolor: successSurface },
                }}
              >
                <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" fontWeight={500}>
                    "{template.text}"
                  </Typography>
                  <Chip
                    label={template.tone}
                    size="small"
                    sx={{ bgcolor: toneColors[template.tone]?.bg || subtleSurface, color: toneColors[template.tone]?.color || 'text.secondary', alignSelf: 'flex-start' }}
                  />
                </Stack>
              </Box>
          ))}
          </Stack>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', mt: 1 }}>
            <Button variant="outlined" onClick={() => setShowTemplates(false)}>
              Cancel
            </Button>
          </Box>
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
  const vibeColor = event.vibe === 'quiet' ? { bg: '#EEF2FF', text: '#4F46E5' } : { bg: '#FFF7ED', text: '#C2410C' };
  const openCount = event.attendees.filter((a) => a.openToTalk).length;

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
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Back button */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            onClick={onBack}
            variant='outlined'
            sx={{ bgcolor: 'background.paper' }}
            size="small"
          >
            <Stack direction='row' spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <ArrowBackIcon fontSize="small" />
              <Typography variant='caption' sx={{ fontSize: '14px', fontWeight: 600 }}>Back to your feed</Typography>
            </Stack>
          </Button>
        </Box>

        {/* Main content card */}
        <Card
          sx={{
            mb: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: 4, justifyContent: 'space-between' }}>
            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
              <Stack spacing={2.5}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
                    <Chip
                      label={event.vibe === 'quiet' ? 'Quiet' : 'Social'}
                      size="small"
                      sx={{ bgcolor: vibeColor.bg, color: vibeColor.text, fontWeight: 700 }}
                    />
                    {event.mutualCount > 0 && (
                      <Chip
                        label={`${event.mutualCount} mutual${event.mutualCount > 1 ? 's' : ''} going`}
                        size="small"
                        sx={{
                          bgcolor: successSurface,
                          color: isDark ? 'text.primary' : 'primary.dark',
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Stack>

                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
                    {event.title}
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    {event.description}
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={2.5}>
                <Box>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VerifiedIcon sx={{ fontSize: 18, color: 'primary.main', flexShrink: 0 }} />
                      <Typography variant="body2">{event.credibility}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessibilityNewIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary">{event.accessibility}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Stack>

            <Divider />
            
            <Stack direction='row' sx={{ justifyContent: 'space-between', mt: 3 }}>
              <Stack>
                <Typography variant="body1" sx={{ mb: 2, fontSize: '18px', fontWeight: 700 }}>
                  Event Details
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary', flexShrink: 0 }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 20, color: 'text.secondary', flexShrink: 0 }} />
                    <Typography variant="body2">{event.time}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <DirectionsWalkIcon sx={{ fontSize: 20, color: 'text.secondary', flexShrink: 0 }} />
                    <Typography variant="body2">{event.distance}</Typography>
                  </Box>
                </Stack>

                <Box>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', useFlexGap: true, alignItems: 'center', mt: 1}}>
                    <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                      Tags
                    </Typography>
                    {event.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          color: 'text.secondary',
                          bgcolor: subtleSurface,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
              
              <Box>
                {!joined ? (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleJoin}
                      sx={{ width: '100%', py: 2 }}
                    >
                      I'm heading there
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        bgcolor: successSurface,
                        border: '2px solid',
                        borderColor: 'primary.light',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box>
                        <Stack direction='row' spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                          <EventAvailableIcon sx={{ fontSize: 30, color: 'primary.main' }} />
                          <Typography variant="body2" color={isDark ? 'text.primary' : 'primary.dark'} sx={{ fontSize: '16px', fontWeight: 700 }}>
                            You're in
                          </Typography>
                        </Stack>  
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '14px' }}>
                          Your presence helps signal shared context.
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Who's here section */}
        <Card
          sx={{
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: 700, mb: 1 }}>
                Who's here
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '14px', color: "text.secondary" }}>
                Green dot = open to chat. Tap "Say hi" for a soft, no-pressure opener.
              </Typography>
            </Box>

            <Divider sx={{ mb: 2.5 }} />

            {event.attendees.length > 0 ? (
              <Stack spacing={0}>
                {event.attendees.map((person, i) => (
                  <Box key={person.id}>
                    <AttendeeRow person={person} openToTalk={openToTalk} />
                    {i < event.attendees.length - 1 && <Divider />}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                No attendees yet
              </Typography>
            )}

            {event.mutualCount > 0 && (
              <Box
                sx={{
                  mt: 2.5,
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

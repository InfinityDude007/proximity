import { useState } from 'react';
import {
  Box, Typography, Button, Chip, Stack, Avatar, Card,
  CardContent, Divider, IconButton, Collapse, Snackbar,
  Alert, Switch, FormControlLabel, Dialog, DialogContent,
  DialogTitle,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import VerifiedIcon from '@mui/icons-material/Verified';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SendIcon from '@mui/icons-material/Send';
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            sx={{
              bgcolor: avatarColors[person.avatar] || 'primary.main',
              width: 44,
              height: 44,
              fontWeight: 700,
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
                bgcolor: '#52B788',
                borderRadius: '50%',
                border: '2px solid white',
              }}
            />
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" fontWeight={700}>
            {person.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography variant="caption" color="text.secondary">
              {person.degree}
            </Typography>
            {isOpen && (
              <>
                <Typography variant="caption" color="text.secondary">·</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <FiberManualRecordIcon sx={{ fontSize: 7, color: '#52B788' }} />
                  <Typography variant="caption" sx={{ color: '#2D6A4F', fontWeight: 600 }}>
                    open to chat
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>

        {isOpen && !sent && openToTalk && (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => setShowTemplates(true)}
            sx={{ fontSize: '0.75rem', px: 1.5, py: 0.5, borderRadius: 50 }}
          >
            Say hi 👋
          </Button>
        )}
        {sent && (
          <Chip
            label="Sent ✓"
            size="small"
            sx={{ bgcolor: '#F0FAF4', color: 'primary.dark', fontSize: '0.75rem' }}
          />
        )}
        {!isOpen && (
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            busy
          </Typography>
        )}
      </Box>

      {/* Template picker */}
      <Dialog
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        PaperProps={{ sx: { borderRadius: 4, m: 2 } }}
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={700}>Say hi to {person.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Pick a soft opener — no pressure on either side
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            {softInviteTemplates.map(t => (
              <Box
                key={t.id}
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
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: 'primary.main', bgcolor: '#F0FAF4' },
                }}
              >
                <Typography variant="body2" fontWeight={500}>"{t.text}"</Typography>
                <Chip
                  label={t.tone}
                  size="small"
                  sx={{ mt: 1, height: 18, fontSize: '0.65rem', bgcolor: '#F3F4F6', color: 'text.secondary' }}
                />
              </Box>
            ))}
          </Stack>
          <Button
            fullWidth
            variant="text"
            color="inherit"
            sx={{ color: 'text.secondary' }}
            onClick={() => setShowTemplates(false)}
          >
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          pt: 5,
          pb: 3,
          background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 60%, #52B788 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Back button */}
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

        {/* Type badge */}
        <Chip
          label={event.type === 'event' ? '📅 Event' : '📍 Spot'}
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 600,
            mb: 1.5,
            fontSize: '0.78rem',
          }}
        />

        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1, lineHeight: 1.2 }}>
          {event.title}
        </Typography>

        <Stack spacing={0.8} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              {event.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              {event.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DirectionsWalkIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              {event.distance}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ px: 2.5, mt: 3 }}>
        {/* Description */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
              About this {event.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography variant="caption" fontWeight={600}>{event.credibility}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessibilityNewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">{event.accessibility}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Who's there */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight={700}>
                Who's here
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#52B788' }} />
                <Typography variant="caption" color="text.secondary">live</Typography>
              </Box>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Green dot = open to chat. Tap 'Say hi' for a soft, no-pressure opener.
            </Typography>

            <Divider sx={{ mb: 1 }} />

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
                  p: 1.5,
                  bgcolor: '#F0FAF4',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="caption" color="primary.dark" fontWeight={600}>
                  🤝 {event.mutualCount} mutual connection{event.mutualCount > 1 ? 's' : ''} here
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Vibe info */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
              Vibe
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {event.tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{ bgcolor: '#F3F4F6', color: 'text.secondary' }}
                />
              ))}
            </Box>
            <Chip
              label={event.vibe === 'quiet' ? '🤫 Quiet atmosphere' : '🎉 Social atmosphere'}
              sx={{
                mt: 1.5,
                bgcolor: event.vibe === 'quiet' ? '#EEF2FF' : '#FFF7ED',
                color: event.vibe === 'quiet' ? '#4F46E5' : '#C2410C',
                fontWeight: 600,
              }}
            />
          </CardContent>
        </Card>

        {/* CTA */}
        {!joined ? (
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleJoin}
            sx={{ py: 1.8, fontSize: '1rem' }}
          >
            I'm heading there
          </Button>
        ) : (
          <Box
            sx={{
              bgcolor: '#F0FAF4',
              border: '2px solid',
              borderColor: 'primary.light',
              borderRadius: 3,
              p: 2.5,
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>✅</Typography>
            <Typography variant="subtitle1" fontWeight={700} color="primary.dark">
              You're marked as heading there
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Others can see you're on the way. No commitment needed.
            </Typography>
          </Box>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', textAlign: 'center', mt: 2 }}
        >
          You can change your mind anytime — no obligation
        </Typography>
      </Box>

      {/* Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{ borderRadius: 3, fontFamily: '"DM Sans", sans-serif' }}
          onClose={() => setToastOpen(false)}
        >
          You're on the list! Others can see you're heading there.
        </Alert>
      </Snackbar>
    </Box>
  );
}

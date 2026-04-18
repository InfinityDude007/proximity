import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Avatar, Chip,
  Button, Stack, Divider, Dialog, DialogTitle, DialogContent,
  IconButton, Snackbar, Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { connections } from '../data/mockData';
import { softInviteTemplates } from '../data/mockData';

const statusColor = {
  acquaintance: { bg: '#FFF7ED', text: '#C2410C', label: 'Acquaintance' },
  friend: { bg: '#F0FAF4', text: '#166534', label: 'Friend' },
};

const avatarColors = {
  R: '#2D6A4F',
  J: '#1D4ED8',
  S: '#B45309',
};

function ConnectionCard({ person, onViewProfile }) {
  const status = statusColor[person.status];
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{
                bgcolor: avatarColors[person.avatar] || 'primary.main',
                width: 52,
                height: 52,
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              {person.avatar}
            </Avatar>
            {person.openToTalk && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                  width: 13,
                  height: 13,
                  bgcolor: '#52B788',
                  borderRadius: '50%',
                  border: '2px solid white',
                }}
              />
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                {person.name}
              </Typography>
              <Chip
                label={status.label}
                size="small"
                sx={{
                  bgcolor: status.bg,
                  color: status.text,
                  fontWeight: 600,
                  fontSize: '0.68rem',
                  height: 20,
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" display="block">
              {person.degree} · {person.year}
            </Typography>

            {/* Shared context */}
            <Box
              sx={{
                mt: 1.5,
                p: 1.2,
                bgcolor: '#F8F5F0',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" fontWeight={600} color="text.secondary">
                How you met
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.3 }}>
                {person.sharedContext}
              </Typography>
            </Box>

            {/* Last seen */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1 }}>
              <LocationOnIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {person.lastSeen}
              </Typography>
            </Box>

            {/* Shared interests */}
            {person.sharedInterests.length > 0 && (
              <Box sx={{ mt: 1.5, display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                {person.sharedInterests.map(interest => (
                  <Chip
                    key={interest}
                    label={`✦ ${interest}`}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.68rem',
                      bgcolor: '#EEF2FF',
                      color: '#4F46E5',
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            fullWidth
            onClick={() => onViewProfile(person)}
            sx={{ fontSize: '0.78rem' }}
          >
            View profile
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onViewProfile(person)}
            sx={{ fontSize: '0.78rem' }}
          >
            Send invite 👋
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function ProfileDialog({ person, open, onClose }) {
  const [sent, setSent] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  if (!person) return null;
  const status = statusColor[person.status];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 4, m: 2 } }}
      fullWidth
    >
      <DialogTitle sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>Profile</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', pt: 2, pb: 2 }}>
          <Avatar
            sx={{
              bgcolor: avatarColors[person.avatar] || 'primary.main',
              width: 72,
              height: 72,
              fontSize: '1.8rem',
              fontWeight: 700,
              mx: 'auto',
              mb: 1.5,
            }}
          >
            {person.avatar}
          </Avatar>
          <Typography variant="h6" fontWeight={700}>{person.name}</Typography>
          <Typography variant="body2" color="text.secondary">{person.degree} · {person.year}</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1.5 }}>
            <Chip label={status.label} size="small" sx={{ bgcolor: status.bg, color: status.text, fontWeight: 600 }} />
            {person.openToTalk && (
              <Chip
                icon={<FiberManualRecordIcon sx={{ fontSize: '10px !important', color: '#52B788 !important' }} />}
                label="Open to chat"
                size="small"
                sx={{ bgcolor: '#F0FAF4', color: '#166534', fontWeight: 600 }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ bgcolor: '#F8F5F0', borderRadius: 3, p: 2, mb: 2 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            Shared context
          </Typography>
          <Typography variant="body2">{person.sharedContext}</Typography>
        </Box>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
          Send a soft invite
        </Typography>

        {!sent ? (
          <Stack spacing={1} sx={{ mb: 2 }}>
            {softInviteTemplates.slice(0, 3).map(t => (
              <Box
                key={t.id}
                onClick={() => { setSent(true); setToastOpen(true); }}
                sx={{
                  border: '1.5px solid',
                  borderColor: 'divider',
                  borderRadius: 2.5,
                  p: 1.5,
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main', bgcolor: '#F0FAF4' },
                }}
              >
                <Typography variant="body2">"{t.text}"</Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Box sx={{ bgcolor: '#F0FAF4', borderRadius: 3, p: 2, textAlign: 'center', mb: 2 }}>
            <Typography variant="body2" fontWeight={600} color="primary.dark">
              ✓ Soft invite sent to {person.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              No pressure — they can respond in their own time
            </Typography>
          </Box>
        )}
      </DialogContent>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ borderRadius: 3 }} onClose={() => setToastOpen(false)}>
          Invite sent!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default function ConnectionsPage() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <Box sx={{ px: 2.5, pt: 4, pb: 2 }}>
      <Typography variant="h4" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 0.5 }}>
        Your people
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Connections built from real shared moments
      </Typography>

      {/* Journey hint */}
      <Box
        sx={{
          bgcolor: 'white',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: 2,
          mb: 3,
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <Typography sx={{ fontSize: '1.3rem' }}>🗺️</Typography>
        <Box>
          <Typography variant="caption" fontWeight={700} display="block">
            Acquaintance → Friend
          </Typography>
          <Typography variant="caption" color="text.secondary">
            The more contexts you share, the stronger the connection becomes.
          </Typography>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {[
          { num: connections.length, label: 'Connections' },
          { num: connections.filter(c => c.status === 'friend').length, label: 'Friends' },
          { num: connections.filter(c => c.openToTalk).length, label: 'Open now' },
        ].map(stat => (
          <Box
            key={stat.label}
            sx={{
              flex: 1,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 1.5,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight={700} color="primary.main">
              {stat.num}
            </Typography>
            <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
          </Box>
        ))}
      </Box>

      {connections.map(person => (
        <ConnectionCard key={person.id} person={person} onViewProfile={setSelectedPerson} />
      ))}

      <ProfileDialog
        person={selectedPerson}
        open={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />
    </Box>
  );
}

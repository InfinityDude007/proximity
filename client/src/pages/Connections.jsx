import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MapIcon from '@mui/icons-material/Map';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { connections, softInviteTemplates } from '../data/mockData';
import { alpha, useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const status = statusColor[person.status];
  const softSurface = alpha(theme.palette.primary.main, isDark ? 0.18 : 0.08);
  const tintedSurface = alpha(theme.palette.primary.main, isDark ? 0.16 : 0.1);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Avatar
              sx={{
                bgcolor: avatarColors[person.avatar] || 'primary.main',
                width: 56,
                height: 56,
                fontWeight: 800,
                fontSize: '1.15rem',
              }}
            >
              {person.avatar}
            </Avatar>
            {person.openToTalk && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 13,
                  height: 13,
                  bgcolor: 'success.main',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'background.paper',
                }}
              />
            )}
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 0.5 }}>
              <Typography variant="subtitle1" fontWeight={800}>{person.name}</Typography>
              <Chip
                label={status.label}
                size="small"
                sx={{
                  bgcolor: isDark ? 'action.selected' : status.bg,
                  color: isDark ? 'text.primary' : status.text,
                  fontWeight: 700,
                }}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {person.degree} · {person.year}
            </Typography>

            <Box sx={{ mt: 1.5, p: 1.4, bgcolor: 'action.hover', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="caption" fontWeight={800} color="text.secondary" display="block" sx={{ mb: 0.45 }}>
                How you met
              </Typography>
              <Typography variant="body2" color="text.secondary">{person.sharedContext}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1.2 }}>
              <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">{person.lastSeen}</Typography>
            </Box>
          </Box>
        </Box>

        {person.sharedInterests.length > 0 && (
          <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mt: 1.8 }}>
            {person.sharedInterests.map((interest) => (
              <Chip
                key={interest}
                label={`✦ ${interest}`}
                size="small"
                sx={{ bgcolor: tintedSurface, color: isDark ? 'primary.light' : 'primary.dark' }}
              />
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.1} sx={{ mt: 'auto' }}>
          <Button variant="outlined" fullWidth onClick={() => onViewProfile(person)} sx={{ px: 2, py: 1.2 }}>
            View profile
          </Button>
          <Button variant="contained" fullWidth onClick={() => onViewProfile(person)} sx={{ px: 2, py: 1.2 }}>
            Send invite
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ProfileDialog({ person, open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [sent, setSent] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  if (!person) return null;
  const status = statusColor[person.status];
  const softSurface = alpha(theme.palette.primary.main, isDark ? 0.18 : 0.08);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 5 } }}>
      <DialogTitle sx={{ pb: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={800}>Profile</Typography>
          <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 1.5 }}>
        <Box sx={{ textAlign: 'center', mb: 2.5 }}>
          <Avatar
            sx={{
              bgcolor: avatarColors[person.avatar] || 'primary.main',
              width: 82,
              height: 82,
              fontSize: '1.9rem',
              fontWeight: 800,
              mx: 'auto',
              mb: 1.4,
            }}
          >
            {person.avatar}
          </Avatar>
          <Typography variant="h5" fontWeight={800}>{person.name}</Typography>
          <Typography variant="body2" color="text.secondary">{person.degree} · {person.year}</Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }}>
            <Chip
              label={status.label}
              size="small"
              sx={{
                bgcolor: alpha(status.text, isDark ? 0.22 : 0.12),
                color: isDark ? 'text.primary' : status.text,
                fontWeight: 700,
              }}
            />
            {person.openToTalk && (
              <Chip
                icon={<FiberManualRecordIcon sx={{ fontSize: '10px !important', color: `${theme.palette.success.main} !important` }} />}
                label="Open to chat"
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.success.main, isDark ? 0.18 : 0.1),
                  color: isDark ? 'text.primary' : 'success.dark',
                  fontWeight: 700,
                }}
              />
            )}
          </Stack>
        </Box>

        <Box sx={{ bgcolor: 'action.hover', borderRadius: 4, p: 2, mb: 2.2 }}>
          <Typography variant="caption" fontWeight={800} color="text.secondary" display="block" sx={{ mb: 0.5 }}>
            Shared context
          </Typography>
          <Typography variant="body2">{person.sharedContext}</Typography>
        </Box>

        <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.4 }}>
          Send a soft invite
        </Typography>

        {!sent ? (
          <Stack spacing={1.1} sx={{ mb: 2 }}>
            {softInviteTemplates.slice(0, 3).map((template) => (
              <Box
                key={template.id}
                onClick={() => {
                  setSent(true);
                  setToastOpen(true);
                }}
                sx={{
                  border: '1.5px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  p: 1.7,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': { borderColor: 'primary.main', bgcolor: softSurface },
                }}
              >
                <Typography variant="body2">“{template.text}”</Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Box sx={{ bgcolor: alpha(theme.palette.success.main, isDark ? 0.16 : 0.1), borderRadius: 4, p: 2, textAlign: 'center', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" fontWeight={700} color={isDark ? 'text.primary' : 'primary.dark'}>Soft invite sent to {person.name}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">No pressure — they can respond in their own time.</Typography>
          </Box>
        )}
      </DialogContent>

      <Snackbar open={toastOpen} autoHideDuration={2400} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ borderRadius: 3 }} onClose={() => setToastOpen(false)}>
          Invite sent!
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default function ConnectionsPage() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const stats = useMemo(
    () => [
      { value: connections.length, label: 'Connections' },
      { value: connections.filter((p) => p.openToTalk).length, label: 'Open to chat' },
      { value: connections.filter((p) => p.status === 'friend').length, label: 'Friends' },
    ],
    [],
  );

  return (
    <Box>
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 0.8 }}>
          Your people
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          Connections built from real shared moments — designed to feel warmer, clearer, and easier to revisit.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        <Grid item xs={12} xl={8.2}>
          <Box
            sx={{
              p: { xs: 2.2, md: 2.8 },
              borderRadius: 5,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              gap: 2,
              alignItems: 'flex-start',
            }}
          >
            <MapIcon sx={{ fontSize: 32, color: 'primary.main', flexShrink: 0 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 0.4 }}>Acquaintance → Friend</Typography>
              <Typography variant="body2" color="text.secondary">
                The more contexts you share, the stronger the connection becomes. This view now scales properly across desktop instead of compressing everything into a narrow stack.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} xl={3.8}>
          <Grid container spacing={1.5}>
            {stats.map((stat) => (
              <Grid key={stat.label} item xs={4} xl={12}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2.2 }}>
                    <Typography variant="h6" fontWeight={800}>{stat.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        {connections.map((person) => (
          <Grid item xs={12} md={6} xl={4} key={person.id}>
            <ConnectionCard person={person} onViewProfile={setSelectedPerson} />
          </Grid>
        ))}
      </Grid>

      <ProfileDialog person={selectedPerson} open={Boolean(selectedPerson)} onClose={() => setSelectedPerson(null)} />
    </Box>
  );
}

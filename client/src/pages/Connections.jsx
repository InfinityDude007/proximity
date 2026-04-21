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
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { connections, softInviteTemplates } from '../data/mockData';
import { alpha, useTheme } from '@mui/material/styles';

const statusColor = {
  acquaintance: { bg: '#FFF7ED', text: '#C2410C', label: 'Acquaintance' },
  friend:       { bg: '#F0FAF4', text: '#166534', label: 'Friend' },
};

const avatarColors = {
  R: '#2D6A4F',
  J: '#1D4ED8',
  S: '#B45309',
};

// ─── ConnectionCard ────────────────────────────────────────────────────────
// FIX: All child elements now use consistent centred alignment.
// FIX: Removed inconsistent gap values; standardised to gap={2}.
// FIX: Button row now always full-width with equal flex-basis so both
//      buttons are exactly the same width regardless of label length.
function ConnectionCard({ person, onViewProfile }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const status = statusColor[person.status];
  const tintedSurface = alpha(theme.palette.primary.main, isDark ? 0.16 : 0.1);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',   // FIX: was already set but propagated inconsistently
          textAlign: 'center',
          gap: 2,                 // FIX: was 1.2 — unified to 2 for consistent vertical rhythm
        }}
      >
        {/* ── Avatar + status ring ── */}
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

        {/* ── Name + degree row ── */}
        {/* FIX: Moved name/status chip into a single centred column instead of
                a row with flexWrap so the chip never misaligns on short names. */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant="subtitle1" fontWeight={800}>
              {person.name}
            </Typography>
            <Chip
              label={status.label}
              size="small"
              sx={{
                bgcolor: isDark ? 'action.selected' : status.bg,
                color:   isDark ? 'text.primary'   : status.text,
                fontWeight: 700,
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary">
            {person.degree} · {person.year}
          </Typography>
        </Box>

        {/* ── How you met ── */}
        {/* FIX: Set explicit maxWidth: '100%' so it never overflows the card. */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: 'action.hover',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            width: '100%',
          }}
        >
          <Typography
            variant="caption"
            fontWeight={800}
            color="text.secondary"
            display="block"
            sx={{ mb: 0.5 }}
          >
            How you met
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {person.sharedContext}
          </Typography>
        </Box>

        {/* ── Last seen ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            {person.lastSeen}
          </Typography>
        </Box>

        {/* ── Shared-interest chips ── */}
        {person.sharedInterests.length > 0 && (
          <Stack
            direction="row"
            spacing={0.75}
            flexWrap="wrap"
            useFlexGap
            sx={{ justifyContent: 'center', width: '100%' }}
          >
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

        {/* FIX: Divider + button group pushed to the bottom with mt: 'auto' on
                a wrapper so cards of different heights stay bottom-aligned. */}
        <Box sx={{ mt: 'auto', width: '100%' }}>
          <Divider sx={{ mb: 2 }} />

          {/* FIX: Both buttons use flex: 1 so they share width equally. */}
          <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => onViewProfile(person)}
              sx={{ flex: 1, py: 1.2 }}
            >
              View profile
            </Button>
            <Button
              variant="contained"
              onClick={() => onViewProfile(person)}
              sx={{ flex: 1, py: 1.2 }}
            >
              Send invite
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── ProfileDialog ─────────────────────────────────────────────────────────
// FIX: Template list items now have consistent padding and min-height so
//      short vs. long templates don't make the list feel jagged.
function ProfileDialog({ person, open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [sent, setSent] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  if (!person) return null;
  const status = statusColor[person.status];
  const softSurface = alpha(theme.palette.primary.main, isDark ? 0.18 : 0.08);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 5 } }}
    >
      <DialogTitle sx={{ pb: 0.5 }}>
        {/* FIX: Title row uses space-between with consistent gap */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography variant="h6" fontWeight={800}>
            Profile
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1.5 }}>
        {/* ── Avatar hero ── */}
        <Box sx={{ textAlign: 'center', mb: 2.5 }}>
          <Avatar
            sx={{
              bgcolor: avatarColors[person.avatar] || 'primary.main',
              width: 80,
              height: 80,
              fontSize: '1.9rem',
              fontWeight: 800,
              mx: 'auto',
              mb: 1.5,
            }}
          >
            {person.avatar}
          </Avatar>
          <Typography variant="h5" fontWeight={800}>
            {person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {person.degree} · {person.year}
          </Typography>

          {/* FIX: Chips are centred and wrapped consistently */}
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
            sx={{ mt: 1.5 }}
          >
            <Chip
              label={status.label}
              size="small"
              sx={{
                bgcolor: alpha(status.text, isDark ? 0.22 : 0.12),
                color:   isDark ? 'text.primary' : status.text,
                fontWeight: 700,
              }}
            />
            {person.openToTalk && (
              <Chip
                icon={
                  <FiberManualRecordIcon
                    sx={{ fontSize: '10px !important', color: `${theme.palette.success.main} !important` }}
                  />
                }
                label="Open to chat"
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.success.main, isDark ? 0.18 : 0.1),
                  color:   isDark ? 'text.primary' : 'success.dark',
                  fontWeight: 700,
                }}
              />
            )}
          </Stack>
        </Box>

        {/* ── Shared context ── */}
        <Box sx={{ bgcolor: 'action.hover', borderRadius: 4, p: 2, mb: 2.5 }}>
          <Typography
            variant="caption"
            fontWeight={800}
            color="text.secondary"
            display="block"
            sx={{ mb: 0.5 }}
          >
            Shared context
          </Typography>
          <Typography variant="body2">{person.sharedContext}</Typography>
        </Box>

        {/* ── Soft-invite templates ── */}
        <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, textAlign: 'center' }}>
          Send a soft invite
        </Typography>

        {!sent ? (
          <Stack spacing={1} sx={{ mb: 2 }}>
            {softInviteTemplates.slice(0, 3).map((template) => (
              // FIX: All template boxes have the same minHeight so the list
              //      rows are vertically equal.
              <Box
                key={template.id}
                onClick={() => { setSent(true); setToastOpen(true); }}
                sx={{
                  border: '1.5px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  p: 1.75,
                  minHeight: 56,           // FIX: prevents height variation
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': { borderColor: 'primary.main', bgcolor: softSurface },
                }}
              >
                <Typography variant="body2">"{template.text}"</Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              bgcolor: alpha(theme.palette.success.main, isDark ? 0.16 : 0.1),
              borderRadius: 4,
              p: 2,
              textAlign: 'center',
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.75,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography
                variant="body2"
                fontWeight={700}
                color={isDark ? 'text.primary' : 'primary.dark'}
              >
                Soft invite sent to {person.name}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              No pressure — they can respond in their own time.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2400}
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

// ─── ConnectionsPage ───────────────────────────────────────────────────────
// FIX: Stats grid now uses xs={4} on all breakpoints so the three stat boxes
//      are always equal-width and centred within their column.
// FIX: Info banner is centred both horizontally and vertically in its grid cell.
export default function ConnectionsPage() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const stats = useMemo(
    () => [
      { value: connections.length,                                    label: 'Connections'  },
      { value: connections.filter((p) => p.openToTalk).length,        label: 'Open to chat' },
      { value: connections.filter((p) => p.status === 'friend').length, label: 'Friends'     },
    ],
    [],
  );

  return (
    <Box>
      {/* ── Page header ── */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 0.75 }}>
          Your people
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          Connections built from real shared moments — designed to feel warmer, clearer, and easier to revisit.
        </Typography>
      </Box>

      {/* ── Info bar + stats ── */}
      <Grid container spacing={3} sx={{ mb: 3.5 }} alignItems="stretch">
        {/* Banner */}
        <Grid item xs={12} xl={8}>
          <Box
            sx={{
              height: '100%',
              p: { xs: 2.5, md: 3 },
              borderRadius: 5,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',    // FIX: column so content stays centred
              alignItems: 'center',
              justifyContent: 'center',   // FIX: vertical centering within row
              gap: 1.5,
              textAlign: 'center',
            }}
          >
            <MapIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 0.4 }}>
                Acquaintance → Friend
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The more shared moments you have with someone, the stronger your connection grows — naturally.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Stat boxes */}
        {/* FIX: Three equal-width stat boxes — each xl={4} inside the xl={4} column */}
        <Grid item xs={12} xl={4}>
          <Grid container spacing={1.5} sx={{ height: '100%' }}>
            {stats.map((stat) => (
              <Grid key={stat.label} item xs={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent
                    sx={{
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center', // FIX: vertically centred numbers
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" fontWeight={800}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* ── Empty state ── */}
      {connections.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
            bgcolor: 'background.paper',
            borderRadius: 5,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <PeopleOutlinedIcon sx={{ fontSize: 56, color: 'text.secondary', opacity: 0.4, mb: 2 }} />
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
            No connections yet
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxWidth: 420, mx: 'auto' }}
          >
            Head to Discover and join a nearby event or spot — you'll build connections naturally.
          </Typography>
        </Box>
      ) : (
        /* ── Connection cards — equal-height rows via alignItems stretch ── */
        <Grid container spacing={2.5} alignItems="stretch">
          {connections.map((person) => (
            <Grid item xs={12} md={6} xl={4} key={person.id}>
              <ConnectionCard person={person} onViewProfile={setSelectedPerson} />
            </Grid>
          ))}
        </Grid>
      )}

      <ProfileDialog
        person={selectedPerson}
        open={Boolean(selectedPerson)}
        onClose={() => setSelectedPerson(null)}
      />
    </Box>
  );
}
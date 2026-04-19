import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
  Avatar,
  AvatarGroup,
  IconButton,
  Divider,
  Button,
  Grid,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TuneIcon from '@mui/icons-material/Tune';
import { contextFeed, batteryLevels, vibeFilters } from '../data/mockData';

const vibeColor = {
  quiet: { bg: '#EEF2FF', text: '#4F46E5' },
  social: { bg: '#FFF7ED', text: '#C2410C' },
};

function PageHero({ battery }) {
  return (
    <Box
      sx={{
        mb: 4,
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 5,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(240,250,244,0.96))',
        border: '1px solid',
        borderColor: 'divider',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', xl: '1.3fr 0.7fr' },
        gap: 2.5,
        alignItems: 'stretch',
      }}
    >
      <Box>
        <Chip label="Live campus discovery" size="small" sx={{ mb: 1.5, fontWeight: 700, bgcolor: '#E9F7EE', color: 'primary.dark' }} />
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.05, mb: 1.2 }}>
          Around you
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mb: 2.2 }}>
          Shared places, active people, and low-pressure ways to connect across the University of Birmingham Dubai.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
          {[
            { label: 'University of Birmingham Dubai' },
            { label: `${battery.label}` },
            { label: `${contextFeed.length} nearby contexts` },
          ].map((item) => (
            <Chip key={item.label} label={item.label} variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.9)' }} />
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          p: 2.2,
          borderRadius: 4,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
          <Typography variant="subtitle2" fontWeight={800}>
            Your social battery
          </Typography>
          <Typography sx={{ fontSize: '1.4rem' }}>{battery.emoji}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.6 }}>
          {battery.description}
        </Typography>
        <Box sx={{ p: 1.6, borderRadius: 3, bgcolor: '#F8F5F0' }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.35 }}>
            Feed is prioritising
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {battery.recommendations.join(' • ')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function ContextCard({ event, onSelect }) {
  const vibe = vibeColor[event.vibe] || vibeColor.social;
  const openCount = event.attendees.filter((a) => a.openToTalk).length;

  return (
    <Card
      onClick={() => onSelect(event)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 18px 34px rgba(45,106,79,0.12)',
          borderColor: 'rgba(82,183,136,0.35)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.2, md: 2.5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.2, mb: 1.5 }}>
          <Box>
            <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
              <Chip label={event.vibe === 'quiet' ? 'Quiet' : 'Social'} size="small" sx={{ bgcolor: vibe.bg, color: vibe.text, fontWeight: 700 }} />
              {event.mutualCount > 0 && (
                <Chip label={`${event.mutualCount} mutual${event.mutualCount > 1 ? 's' : ''}`} size="small" sx={{ bgcolor: '#F0FAF4', color: 'primary.dark', fontWeight: 700 }} />
              )}
            </Stack>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25, mb: 0.4 }}>
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </Box>
          <Button variant="outlined" size="small" sx={{ minWidth: 94, flexShrink: 0 }}>
            View
          </Button>
        </Box>

        <Stack spacing={0.85} sx={{ mb: 2.2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">{event.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">{event.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DirectionsWalkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">{event.distance}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
            <AvatarGroup
              max={4}
              sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.78rem', border: '2px solid white' } }}
            >
              {event.attendees.map((a) => (
                <Avatar key={a.id} sx={{ bgcolor: a.openToTalk ? 'primary.main' : '#B7BBC5' }}>
                  {a.avatar}
                </Avatar>
              ))}
            </AvatarGroup>
            <Box>
              <Typography variant="body2" fontWeight={700}>
                {openCount} open to chat
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: '#52B788' }} />
                <Typography variant="caption" color="text.secondary">active now</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
          {event.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.85)' }} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function QuickStats() {
  const stats = useMemo(
    () => [
      { value: contextFeed.length, label: 'Live contexts nearby' },
      { value: contextFeed.reduce((sum, event) => sum + event.attendees.length, 0), label: 'People visible now' },
      { value: contextFeed.filter((event) => event.vibe === 'quiet').length, label: 'Quiet options' },
    ],
    [],
  );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2 }}>
          Snapshot
        </Typography>
        <Stack spacing={1.2}>
          {stats.map((stat) => (
            <Box key={stat.label} sx={{ p: 1.5, borderRadius: 3, bgcolor: '#F8F5F0' }}>
              <Typography variant="h6" fontWeight={800}>{stat.value}</Typography>
              <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function FeedPage({ socialBattery, onSelectEvent }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const battery = batteryLevels[socialBattery];

  const filtered = activeFilter === 'All'
    ? contextFeed
    : contextFeed.filter(
        (e) => e.vibe === activeFilter.toLowerCase() || e.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase()),
      );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <PageHero battery={battery} />
      </Box>

      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        <Grid item xs={12} lg={8.3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
              gap: 1.5,
              flexDirection: { xs: 'column', md: 'row' },
              mb: 2,
            }}
          >
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
              {vibeFilters.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  clickable
                  onClick={() => setActiveFilter(f)}
                  color={activeFilter === f ? 'primary' : 'default'}
                  variant={activeFilter === f ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 700, bgcolor: activeFilter === f ? undefined : 'rgba(255,255,255,0.85)' }}
                />
              ))}
            </Stack>
            <Button startIcon={<TuneIcon />} variant="outlined" sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}>
              Refine feed
            </Button>
          </Box>

          <Grid container spacing={2.25}>
            {filtered.map((event) => (
              <Grid key={event.id} item xs={12} md={6}>
                <ContextCard event={event} onSelect={onSelectEvent} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} lg={3.7}>
          <Stack spacing={2.5}>
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight={800}>Notifications</Typography>
                  <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.8)', border: '1px solid', borderColor: 'divider' }}>
                    <NotificationsNoneIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  You’ll only see activity that matches your current energy and shared context.
                </Typography>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: '#F0FAF4' }}>
                  <Typography variant="caption" color="primary.dark" fontWeight={700}>
                    Low-pressure by design
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    No cold messaging. Every interaction starts from a real shared moment.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <QuickStats />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

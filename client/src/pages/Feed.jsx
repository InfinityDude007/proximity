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
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TuneIcon from '@mui/icons-material/Tune';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { contextFeed, batteryLevels, vibeFilters } from '../data/mockData';
import { alpha } from '@mui/material/styles';
import {
  getAvailabilityMeta,
  getNextAvailabilityStatus,
  getPreferenceChipSx,
  renderAvailabilityIcon,
  renderSocialBatteryIcon,
  SOCIAL_BATTERY_ORDER,
} from '../data/preferencesUi';

const vibeColor = {
  quiet: { bg: '#EEF2FF', text: '#4F46E5' },
  social: { bg: '#FFF7ED', text: '#C2410C' },
};

function PageHero({ battery, socialBattery, setSocialBattery, openToTalk, setOpenToTalk }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const availability = getAvailabilityMeta(openToTalk);

  const handleBatteryToggle = () => {
    const currentIndex = SOCIAL_BATTERY_ORDER.indexOf(socialBattery);
    const nextIndex = (currentIndex + 1) % SOCIAL_BATTERY_ORDER.length;
    setSocialBattery(SOCIAL_BATTERY_ORDER[nextIndex]);
  };

  return (
    <Box
      sx={{
        mb: 4,
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: theme.shadows[1],
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', xl: '1.3fr 0.7fr' },
        gap: 2.5,
        alignItems: 'stretch',
        minWidth: '100%',
      }}
    >
      <Box>
        <Chip
          label="Live campus discovery"
          size="small"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            bgcolor: subtleSurface,
            color: isDark ? 'primary.light' : 'primary.dark',
          }}
        />
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.05, mb: 1.2 }}>
          Discover What's Happening Around You
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ minWidth: '100%', mb: 2.2 }}>
          Shared places, active people, and low-pressure ways to connect across the University of Birmingham Dubai.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
          {[
            { label: 'University of Birmingham Dubai' },
            { label: `${contextFeed.length} nearby contexts` },
          ].map((item) => (
            <Chip
              key={item.label}
              label={item.label}
              variant="outlined"
              sx={{
                bgcolor: subtleSurface,
                borderColor: 'divider',
                color: 'text.primary',
              }}
            />
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.14em',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            Your Vibe
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Chip
              size="medium"
              icon={renderAvailabilityIcon(openToTalk)}
              label={availability.label}
              onClick={() => setOpenToTalk(getNextAvailabilityStatus(openToTalk))}
              sx={getPreferenceChipSx(availability, isDark, { interactive: true })}
            />
            <Typography variant="body2" color="text.secondary">
              {availability.description}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Chip
              size="medium"
              icon={renderSocialBatteryIcon(battery.icon)}
              label={battery.label}
              onClick={handleBatteryToggle}
              sx={getPreferenceChipSx(battery, isDark, { interactive: true })}
            />
            <Typography variant="body2" color="text.secondary">
              {battery.description}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

function ContextCard({ event, onSelect }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const vibe = vibeColor[event.vibe] || vibeColor.social;
  const openCount = event.attendees.filter((a) => a.openToTalk).length;
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);

  const MetaItem = ({ icon, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75 }}>
      <Box sx={{ width: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </Box>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );

  return (
    <Card
      onClick={() => onSelect(event)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
          borderColor: alpha(theme.palette.primary.main, 0.35),
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2.5, md: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 0,
        }}
      >
        <Box sx={{ width: '100%', mb: 2 }}>
          <Stack
            direction="row"
            spacing={0.75}
            flexWrap="wrap"
            useFlexGap
            justifyContent="center"
            sx={{ mb: 1.25 }}
          >
              <Chip label={event.vibe === 'quiet' ? 'Quiet' : 'Social'} size="small" sx={{ bgcolor: vibe.bg, color: vibe.text, fontWeight: 700 }} />
              {event.mutualCount > 0 && (
                <Chip
                  label={`${event.mutualCount} mutual${event.mutualCount > 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    bgcolor: successSurface,
                    color: isDark ? 'text.primary' : 'primary.dark',
                    fontWeight: 700,
                  }}
                />
              )}
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25, mb: 0.5 }}>
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, mx: 'auto', mb: 1.5 }}>
            {event.description}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(event);
            }}
            sx={{ minWidth: 100, px: 2.5, py: 1 }}
          >
            View
          </Button>
        </Box>

        <Stack spacing={0.85} sx={{ mb: 2.25, width: '100%', alignItems: 'center' }}>
          <MetaItem icon={<LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />} text={event.location} />
          <MetaItem icon={<AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />} text={event.time} />
          <MetaItem icon={<DirectionsWalkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />} text={event.distance} />
        </Stack>

        <Divider sx={{ mb: 2, width: '100%' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            width: '100%',
          }}
        >
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                fontSize: '0.78rem',
                border: '2px solid',
                borderColor: 'background.paper',
              },
            }}
          >
            {event.attendees.map((a) => (
              <Avatar key={a.id} sx={{ bgcolor: a.openToTalk ? 'primary.main' : 'action.disabled' }}>
                {a.avatar}
              </Avatar>
            ))}
          </AvatarGroup>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" fontWeight={700}>
              {openCount} open to chat
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 0.25 }}>
              <FiberManualRecordIcon sx={{ fontSize: 8, color: 'success.main' }} />
              <Typography variant="caption" color="text.secondary">
                active now
              </Typography>
            </Box>
          </Box>
        </Box>

        <Stack
          direction="row"
          spacing={0.75}
          flexWrap="wrap"
          useFlexGap
          justifyContent="center"
          sx={{ mt: 'auto', width: '100%' }}
        >
          {event.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                color: 'text.secondary',
                bgcolor: subtleSurface,
              }}
            />
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
      <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 2 }}>
          Snapshot
        </Typography>
        <Stack spacing={1.25}>
          {stats.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: 'action.hover',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" fontWeight={800}>{stat.value}</Typography>
              <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function FeedPage({
  socialBattery,
  setSocialBattery,
  openToTalk,
  setOpenToTalk,
  userInterests,
  onSelectEvent,
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const battery = batteryLevels[socialBattery];
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);

  // Filter events based on active filter and user interests
  let filtered = activeFilter === 'All'
    ? contextFeed
    : contextFeed.filter(
        (e) => e.vibe === activeFilter.toLowerCase() || e.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase()),
      );

  // If user has interests, prioritize events with matching tags
  if (userInterests.length > 0) {
    filtered = filtered.sort((a, b) => {
      const aHasInterest = a.tags.some((tag) => userInterests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())));
      const bHasInterest = b.tags.some((tag) => userInterests.some((interest) => tag.toLowerCase().includes(interest.toLowerCase())));
      return aHasInterest === bHasInterest ? 0 : aHasInterest ? -1 : 1;
    });
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <PageHero
          battery={battery}
          socialBattery={socialBattery}
          setSocialBattery={setSocialBattery}
          openToTalk={openToTalk}
          setOpenToTalk={setOpenToTalk}
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        <Grid item xs={12} lg={8.3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
              flexWrap: 'wrap',
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
                  sx={{
                    fontWeight: 700,
                    bgcolor: activeFilter === f ? undefined : subtleSurface,
                    borderColor: 'divider',
                    flexShrink: 0,
                  }}
                />
              ))}
            </Stack>
            <Button startIcon={<TuneIcon />} variant="outlined" sx={{ px: 2.5, py: 1.1, flexShrink: 0 }}>
              Refine feed
            </Button>
          </Box>

          {filtered.length === 0 ? (
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
              <SearchOffIcon sx={{ fontSize: 56, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                No events match your filter
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto', mb: 2.5 }}>
                Try a different filter, or reset to "All" to see everything nearby.
              </Typography>
              <Button variant="outlined" onClick={() => setActiveFilter('All')}>
                Show all events
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2.25} alignItems="stretch">
              {filtered.map((event) => (
                <Grid key={event.id} item xs={12} md={6}>
                  <ContextCard event={event} onSelect={onSelectEvent} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} lg={3.7}>
          <Stack spacing={2.5}>
            <Card>
              <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.25 }}>
                  Notifications
                </Typography>
                <IconButton
                  size="small"
                  title="Notification settings"
                  sx={{
                    bgcolor: subtleSurface,
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 1.25,
                    mb: 1.5,
                  }}
                >
                  <NotificationsNoneIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  You’ll only see activity that matches your current energy and shared context.
                </Typography>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: successSurface }}>
                  <Typography variant="caption" color={isDark ? 'text.primary' : 'primary.dark'} fontWeight={700}>
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

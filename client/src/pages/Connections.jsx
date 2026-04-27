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
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { getUniversityMockData, softInviteTemplates } from '../data/mockData';
import { interestOptions } from '../data/interestOptions';
import { renderSocialBatteryIcon, SOCIAL_BATTERY_OPTIONS } from '../data/preferencesUi';
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

// Generate contextual invite templates based on shared context
function generateInviteTemplates(sharedContext) {
  const templates = [
    {
      id: 1,
      text: `Hey! Saw we were both at ${sharedContext}. Would be great to catch up sometime!`,
      tone: 'casual',
    },
    {
      id: 2,
      text: `Really enjoyed ${sharedContext}! Want to grab coffee and chat about it?`,
      tone: 'warm',
    },
    {
      id: 3,
      text: `We crossed paths at ${sharedContext} — no pressure, but happy to connect if you're up for it!`,
      tone: 'low-pressure',
    },
    {
      id: 4,
      text: `Hey! From ${sharedContext}. Let me know if you ever want to study together or just chat.`,
      tone: 'flexible',
    },
  ];
  
  return templates;
}

function ConnectionCard({ person, onViewProfile }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const status = statusColor[person.status];
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);

  return (
    <Card
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
      onClick={() => onViewProfile(person)}
    >
      <CardContent
        sx={{
          py: 2.5,
          px: 3.5,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
          <Box sx={{ position: 'relative', flexShrink: 0 }}>
            <Avatar
              sx={{
                bgcolor: avatarColors[person.avatar] || 'primary.main',
                width: 50,
                height: 50,
                fontWeight: 800,
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
            <Typography variant="subtitle1" fontWeight={800} noWrap>
              {person.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {person.degree} · {person.year}
            </Typography>
          </Box>
        </Box>

        <Stack direction='row' sx={{ minWidth: "100%" }}>
          <Chip
            label={status.label}
            size="small"
            sx={{
              bgcolor: alpha(status.text, isDark ? 0.22 : 0.12),
              color: isDark ? 'text.primary' : status.text,
              fontWeight: 700,
              p: 1,
              maxWidth: '150px'
            }}
          />
        </Stack>

        <Box sx={{ display: 'grid', gap: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
            Their current vibe
          </Typography>
          <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
            {person.openToTalk && (
              <Chip
                icon={<FiberManualRecordIcon sx={{ fontSize: '12px !important', color: `${theme.palette.success.main} !important` }} />}
                label="Open to connect"
                size="small"
                sx={{
                  bgcolor: successSurface,
                  color: isDark ? 'text.primary' : 'success.dark',
                  fontWeight: 700,
                }}
              />
            )}
            <Chip
              icon={renderSocialBatteryIcon(person.socialBattery)}
              label={SOCIAL_BATTERY_OPTIONS.find(o => o.value === person.socialBattery)?.label}
              size="small"
              sx={{
                bgcolor: alpha(SOCIAL_BATTERY_OPTIONS.find(o => o.value === person.socialBattery)?.color || 'primary.main', isDark ? 0.18 : 0.1),
                color: isDark ? 'text.primary' : SOCIAL_BATTERY_OPTIONS.find(o => o.value === person.socialBattery)?.color || 'primary.main',
                fontWeight: 700,
                '& .MuiChip-icon': {
                  color: 'currentColor',
                },
              }}
            />
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
          <Typography variant="body2" color="text.secondary">
            {person.lastSeen}
          </Typography>
        </Box>

        {person.userSharedInterests?.length > 0 && (
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
              Your shared interests
            </Typography>
            <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
              {person.userSharedInterests.map((interest) => {
                const interestObj = interestOptions.find(i => i.label === interest);
                return (
                  <Chip
                    key={`shared-${interest}`}
                    icon={interestObj?.icon}
                    label={interest}
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: 'white',
                        mr: '0.05rem',
                      },
                      py: 2,
                      px: 1,
                      borderRadius: 1.5,
                    }}
                  />
                );
              })}
            </Stack>
          </Box>
        )}

        <Box sx={{ mt: 'auto', width: '100%' }}>
          <Divider sx={{ mb: 2, mt: 0.5 }} />
          <Stack direction="row" spacing={1.5} sx={{ width: '100%' }}>
            <Button
              variant="outlined"
              onClick={(event) => {
                event.stopPropagation();
                onViewProfile(person);
              }}
              sx={{ flex: 1, py: 1 }}
            >
              View profile
            </Button>
            <Button
              variant="contained"
              onClick={(event) => {
                event.stopPropagation();
                onViewProfile(person);
              }}
              sx={{ flex: 1, py: 1 }}
            >
              Send invite
            </Button>
          </Stack>
        </Box>
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
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const successSurface = alpha(theme.palette.success.main, isDark ? 0.18 : 0.1);

  const toneColors = {
    casual: { bg: alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07), color: 'primary.main' },
    warm: { bg: alpha(theme.palette.warning.main, isDark ? 0.14 : 0.07), color: 'warning.main' },
    'low-pressure': { bg: alpha(theme.palette.success.main, isDark ? 0.14 : 0.07), color: 'success.main' },
    flexible: { bg: alpha(theme.palette.info.main, isDark ? 0.14 : 0.07), color: 'info.main' },
  };

  const contextualTemplates = generateInviteTemplates(person.sharedContext);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll='paper'
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 5,
          border: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <DialogTitle sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="overline" sx={{ mt: 0.5, color:"text.secondary", fontWeight: 700, letterSpacing: '0.14em', fontSize: '14px' }}>
            Profile
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ flexShrink: 0 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 2, px: 3, mt: 0.5 }}>
        <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Avatar
                sx={{
                  bgcolor: avatarColors[person.avatar] || 'primary.main',
                  width: 78,
                  height: 78,
                  fontSize: '1.8rem',
                  fontWeight: 800,
                }}
              >
                {person.avatar}
              </Avatar>
              {person.openToTalk && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    width: 14,
                    height: 14,
                    bgcolor: 'success.main',
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'background.paper',
                  }}
                />
              )}
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h5" fontWeight={800}>
                {person.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {person.degree} - {person.year}
              </Typography>
              <Chip
                label={status.label}
                size="small"
                sx={{
                  bgcolor: alpha(status.text, isDark ? 0.22 : 0.12),
                  color: isDark ? 'text.primary' : status.text,
                  fontWeight: 700,
                  fontSize: '14px',
                  py: 2,
                  px: 1.5,
                  borderRadius: '30px',
                  mt: 0.5
                }}
              />
            </Box>
          </Box>

          <Stack direction="column" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
            <Box sx={{ display: 'grid', gap: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, fontSize: '14px' }}>
                Their current vibe
              </Typography>
              <Stack direction='row' spacing={2}>
                {person.openToTalk && (
                  <Chip
                    icon={<FiberManualRecordIcon sx={{ fontSize: '14px !important', color: `${theme.palette.success.main} !important` }} />}
                    label="Open to connect"
                    size="small"
                    sx={{
                      bgcolor: successSurface,
                      color: isDark ? 'text.primary' : 'success.dark',
                      fontWeight: 700,
                      fontSize: '14px',
                      py: 2,
                      px: 1.5,
                      borderRadius: '30px',
                    }}
                  />
                )}
                <Chip
                  icon={renderSocialBatteryIcon(person.socialBattery)}
                  label={SOCIAL_BATTERY_OPTIONS.find(o => o.value === person.socialBattery)?.label}
                  size="small"
                  sx={{
                    bgcolor: alpha(SOCIAL_BATTERY_OPTIONS.find(o => o.value === person.socialBattery)?.color || 'primary.main', isDark ? 0.18 : 0.1),
                    color: isDark ? 'text.primary' : SOCIAL_BATTERY_OPTIONS.find(o => o.value === person.socialBattery)?.color || 'primary.main',
                    fontWeight: 700,
                    fontSize: '14px',
                    py: 2,
                    px: 1.5,
                    borderRadius: '30px',
                    '& .MuiChip-icon': {
                      color: 'currentColor',
                    },
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2.5, mt: 1}} />

        <Box sx={{ display: 'flex', gap: 1, mb: 2.5, justifyContent: 'space-between', alignItems: 'center'}}>
          {person.userSharedInterests?.length > 0 && (
            <Box>
              <Typography variant="body2" sx={{ mb: 0.8, fontWeight: 700, color: 'text.secondary' }}>
                Your shared interests
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {person.userSharedInterests.map((interest) => {
                  const interestObj = interestOptions.find(i => i.label === interest);
                  return (
                    <Chip
                      key={`dialog-shared-${interest}`}
                      icon={interestObj?.icon}
                      label={interest}
                      size="small"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                          color: 'white',
                          mr: '0.05rem',
                        },
                        py: 2,
                        px: 1,
                        borderRadius: 1.5,
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          )}

          {person.otherInterests?.length > 0 && (
            <Box>
              <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 700, color: 'text.secondary' }}>
                Their other interests
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {person.otherInterests.map((interest) => {
                  const interestObj = interestOptions.find(i => i.label === interest);
                  return (
                    <Chip
                      key={`dialog-other-${interest}`}
                      icon={interestObj?.icon}
                      label={interest}
                      size="small"
                      sx={{
                        bgcolor: 'action.hover',
                        color: 'text.secondary',
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                          mr: '0.05rem',
                        },
                        py: 2,
                        px: 1,
                        borderRadius: 1.5,
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        <Stack direction='row' sx={{ width: '100%', justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 700, color: 'text.secondary' }}>
              Last seen
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
              <Typography variant="body2" color="text.secondary">
                {person.lastSeen}
              </Typography>
            </Box>
          </Box>
        <Box sx={{ bgcolor: 'action.hover', borderRadius: 1, px: 2, py: 1, mb: 2.5 }}>
            <Typography variant="body1" display="block" sx={{ mb: 0.2, color: "text.secondary" }}>
              How you connected
            </Typography>
            <Typography variant="body2">{person.sharedContext}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" display="block" sx={{ mb: 0.5, color: "text.secondary" }}>
            Send a soft invite
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pick a low-pressure opener that references your shared moment.
          </Typography>
        </Box>

        {!sent ? (
          <Stack spacing={1.25} sx={{ mb: 2 }}>
            {contextualTemplates.map((template) => (
              <Box
                key={template.id}
                onClick={() => {
                  setSent(true);
                  setToastOpen(true);
                }}
                sx={{
                  border: '1.5px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  px: 3,
                  py: 2,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: subtleSurface,
                  },
                }}
              >
                <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" fontWeight={500}>
                    "{template.text}"
                  </Typography>
                  <Chip
                    label={template.tone}
                    size="small"
                    sx={{ 
                      bgcolor: toneColors[template.tone]?.bg || subtleSurface, 
                      color: toneColors[template.tone]?.color || 'text.secondary', 
                      flexShrink: 0 
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              bgcolor: successSurface,
              border: '2px solid',
              borderColor: 'primary.light',
              borderRadius: 2,
              p: 2,
              textAlign: 'center',
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 24 }} />
              <Typography variant="body2" fontWeight={700} color={isDark ? 'text.primary' : 'primary.dark'}>
                Soft invite sent to {person.name}
              </Typography>
            </Stack>
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

export default function ConnectionsPage({ userProfile, userInterests }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { connections } = useMemo(
    () => getUniversityMockData(userProfile?.university),
    [userProfile?.university],
  );

  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);

  const getStringHash = (value) => {
    return [...value].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0);
  };

  const getUserSharedInterests = (interests, personId) => {
    if (!Array.isArray(interests) || interests.length === 0) {
      return [];
    }

    const maxCount = Math.min(interests.length, 2);
    const count = 1 + (getStringHash(personId) % maxCount);
    const seeded = [...interests].sort((a, b) => {
      const hashA = getStringHash(`${personId}-${a}`);
      const hashB = getStringHash(`${personId}-${b}`);
      return hashA - hashB;
    });

    return seeded.slice(0, count);
  };

  const connectionsWithInterests = useMemo(
    () => connections.map((person) => ({
      ...person,
      userSharedInterests: getUserSharedInterests(userInterests, person.id),
      otherInterests: person.sharedInterests || [],
    })),
    [connections, userInterests],
  );

  const stats = useMemo(
    () => [
      {
        value: connections.length,
        label: `Connection${connections.length === 1 ? '' : 's'}`,
        icon: <PersonAddIcon sx={{ fontSize: '28px', color: 'primary.main' }}/>
      },
      {
        value: connections.filter((p) => p.openToTalk).length,
        label: 'Open to chat',
        icon: <MarkChatReadIcon sx={{ color: 'primary.main' }}/>
      },
      {
        value: connections.filter((p) => p.status === 'friend').length,
        label: `Friend${connections.filter((p) => p.status === 'friend').length === 1 ? '' : 's'}`,
        icon: <HandshakeIcon sx={{ fontSize: '28px', color: 'primary.main' }}/>
      },
    ],
    [connections],
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 0.75 }}>
          Your people
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          Connections built from real shared moments — designed to feel warmer, clearer, and easier to revisit.
        </Typography>
      </Box>

      <Card sx={{ height: '100%', mb: 3}}>
        <CardContent
          sx={{
            p: { xs: 2.5, md: 3.5 },
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Stack direction='column' sx={{ width: '100%' }}>
            <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2,
                  bgcolor: subtleSurface,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MapIcon sx={{ fontSize: 30, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
                  Acquaintance → Friend
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The more shared moments you have with someone, the stronger your connection grows — naturally.
                </Typography>
              </Box>
            </Stack>
            
            <Stack direction='row' spacing={2} sx={{ alignItems: 'center', mb: 2, mt: 3 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: subtleSurface,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AnalyticsIcon sx={{ fontSize: 24, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: '16px'}}>
                  Connections Summary
                </Typography>
              </Box>
            </Stack>
            <Stack direction='row' spacing={4} sx={{ width: '100%', justifyContent: 'center'}}>
              {stats.map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                    textAlign: 'center',
                    minWidth: '25%'
                  }}
                >
                  <Stack direction='row' spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    {stat.icon}
                    <Typography variant="h5" fontWeight={800}>{stat.value}</Typography>
                  </Stack>
                  <Typography variant="body1" color="text.secondary">{stat.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {connectionsWithInterests.length === 0 ? (
        <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ textAlign: 'center', py: 8, px: 3 }}>
            <PeopleOutlinedIcon sx={{ fontSize: 56, color: 'text.secondary', opacity: 0.4, mb: 2 }} />
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                No connections yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mx: 'auto' }}>
                Head to Discover and join a nearby event or spot — you'll build connections naturally.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: 'center',
            }}
          >
            {connectionsWithInterests.map((person) => (
              <Grid
                item
                key={person.id}
                sx={{
                  maxWidth: '380px',
                  minWidth: '380px',
                }}
              >
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
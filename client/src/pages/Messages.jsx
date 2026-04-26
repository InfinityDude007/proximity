import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Badge,
  TextField,
  IconButton,
  Grid,
  List,
  ListItemButton,
  Stack,
  Card,
  CardContent,
  InputAdornment,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { getUniversityMockData } from '../data/mockData';
import { alpha, useTheme } from '@mui/material/styles';

const avatarColors = {
  R: '#2D6A4F',
  S: '#B45309',
  J: '#1D4ED8',
};

// ─── MessageCard ───────────────────────────────────────────────────────────
function MessageCard({ msg, onOpen, isSelected }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const unreadSurface = alpha(theme.palette.success.main, isDark ? 0.16 : 0.08);
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);

  return (
    <Card
      onClick={() => onOpen(msg.id)}
      sx={{
        cursor: 'pointer',
        border: isSelected ? '1.5px solid' : '1px solid',
        borderColor: isSelected ? 'primary.light' : msg.unread ? alpha(theme.palette.success.main, 0.5) : 'divider',
        bgcolor: msg.unread && !isSelected ? unreadSurface : isSelected ? unreadSurface : 'background.paper',
        '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
        transition: 'all 0.15s ease',
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
          <Badge
            overlap="circular"
            variant={msg.unread ? 'dot' : 'standard'}
            sx={{ 
              '& .MuiBadge-badge': { 
                bgcolor: 'success.main',
                animation: msg.unread ? 'pulse 2s ease-in-out infinite' : 'none',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.7, transform: 'scale(1.1)' },
                },
              }, 
              flexShrink: 0 
            }}
          >
            <Avatar
              sx={{
                bgcolor: avatarColors[msg.avatar] || 'primary.main',
                width: 46,
                height: 46,
                fontWeight: 800,
                border: msg.unread ? `2px solid ${theme.palette.success.main}` : 'none',
              }}
            >
              {msg.avatar}
            </Avatar>
          </Badge>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                mb: 0.25,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={msg.unread ? 900 : isSelected ? 800 : 700}
                  noWrap
                  sx={{ flex: 1 }}
                >
                  {msg.name}
                </Typography>
                {msg.unread && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      flexShrink: 0,
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                )}
              </Box>
              <Typography 
                variant="caption" 
                color={msg.unread ? 'success.main' : 'text.secondary'}
                fontWeight={msg.unread ? 700 : 400}
                sx={{ flexShrink: 0 }}
              >
                {msg.time}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color={msg.unread ? 'text.primary' : isSelected ? 'text.primary' : 'text.secondary'}
              fontWeight={msg.unread ? 600 : isSelected ? 500 : 400}
              noWrap
            >
              {msg.preview}
            </Typography>

            <Chip
              icon={<LocationOnIcon />}
              label={msg.context}
              size="small"
              sx={{ mt: 0.75, bgcolor: subtleSurface, color: 'text.secondary' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── MessagesPage (inline chat panel, no popup) ────────────────────────────
export default function MessagesPage({ userProfile }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');

  // Store the current state of every conversation (keyed by message id)
  const [conversationsState, setConversationsState] = useState({});

  // Track which messages have been read
  const [readMessages, setReadMessages] = useState(new Set());

  // Input state for the inline chat panel
  const [inputText, setInputText] = useState('');

  const { messages } = useMemo(
    () => getUniversityMockData(userProfile?.university),
    [userProfile?.university]
  );

  const filteredMessages = useMemo(
    () =>
      messages
        .filter((m) =>
          [m.name, m.preview, m.context]
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase())
        )
        .map((m) => ({
          ...m,
          unread: m.unread && !readMessages.has(m.id),
        })),
    [messages, query, readMessages]
  );

  const selectedMsg = messages.find((m) => m.id === selectedId);

  // Get the conversation for the selected message – either from local state or original mock data
  const currentConversation =
    selectedId && conversationsState[selectedId]
      ? conversationsState[selectedId]
      : selectedMsg?.conversation || [];

  // Send a new message (from "me")
  const sendMessage = () => {
    if (!inputText.trim() || !selectedId) return;

    const newMessage = {
      from: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedConversation = [...currentConversation, newMessage];

    setConversationsState((prev) => ({
      ...prev,
      [selectedId]: updatedConversation,
    }));

    setInputText('');
  };

  // Clear the selected conversation (optional, gives a way to go back to empty state)
  const clearSelected = () => setSelectedId(null);

  // Handle opening a message and mark it as read
  const handleOpenMessage = (id) => {
    setSelectedId(id);
    setReadMessages((prev) => new Set(prev).add(id));
  };

  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 3.25 }}>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 0.75 }}
        >
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Every conversation here started from a real shared moment — a study session, a café, or an event you both attended.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Inbox list – narrower on large screens */}
        <Grid item sx={{ width: '40%' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ py: 2, px: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Stack direction='column' spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'start' }}>
                <Typography variant="body1" sx={{ fontSize: '20px', fontWeight: 700 }}>
                  Inbox
                </Typography>

                <TextField
                  size="small"
                  placeholder="Search by name, place, or context"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  sx={{ width: "100%" }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Stack>

              <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {filteredMessages.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 5 }}>
                    <ForumOutlinedIcon
                      sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.4, mb: 1.5 }}
                    />
                    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                      {query ? 'No messages found' : 'No messages yet'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ maxWidth: 260, mx: 'auto' }}
                    >
                      {query
                        ? 'Try a different search term.'
                        : 'Start a conversation by saying hi to someone at a nearby event.'}
                    </Typography>
                  </Box>
                ) : (
                  filteredMessages.map((msg) => (
                    <ListItemButton
                      disableRipple
                      key={msg.id}
                      onClick={() => handleOpenMessage(msg.id)}
                      sx={{ p: 0, borderRadius: 1, display: 'block', '&:hover': { bgcolor: 'transparent' }, }}
                    >
                      <MessageCard msg={msg} onOpen={handleOpenMessage} isSelected={msg.id === selectedId} />
                    </ListItemButton>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Inline conversation panel – wider, fills the right side */}
        <Grid item sx={{ flex: 1, minWidth: 0 }}>
          <Card sx={{ minHeight: 620, height: '100%' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {selectedMsg ? (
                <>
                  {/* Header with close button */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: avatarColors[selectedMsg.avatar] || 'primary.main',
                        width: 50,
                        height: 50,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {selectedMsg.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="h6" fontWeight={800} noWrap>
                        {selectedMsg.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        You connected through {selectedMsg.context}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={clearSelected} sx={{ flexShrink: 0 }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Divider />

                  {/* Messages bubble area */}
                  <Stack spacing={1.5} sx={{ flex: 1, overflowY: 'auto', mb: 2, mt: 3 }}>
                    {currentConversation.map((c, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          justifyContent: c.from === 'me' ? 'flex-end' : 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '75%',
                            width: '600px',
                            bgcolor: c.from === 'me' ? 'primary.main' : 'action.hover',
                            color: c.from === 'me' ? 'primary.contrastText' : 'text.primary',
                            borderRadius:
                              c.from === 'me'
                                ? '18px 18px 4px 18px'
                                : '18px 18px 18px 4px',
                            px: 2,
                            py: 1.25,
                          }}
                        >
                          <Typography variant="body2">{c.text}</Typography>
                          {c.time && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                mt: 0.4,
                                textAlign: 'right',
                                opacity: 0.7,
                                fontSize: '0.68rem',
                              }}
                            >
                              {c.time}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  {/* Input row – exactly matching the previous dialog style */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Type a message..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: subtleSurface } }}
                    />
                    <IconButton
                      color="primary"
                      onClick={sendMessage}
                      disabled={!inputText.trim()}
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        '&:hover': { bgcolor: 'primary.dark' },
                        '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' },
                      }}
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </>
              ) : (
                /* Empty state – perfectly centred */
                <Box
                  sx={{
                    flex: 1,
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                    minWidth: '100%'
                  }}
                >
                  <Box>
                    <ForumOutlinedIcon
                      sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.35, mb: 1.5 }}
                    />
                    <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
                      Select a conversation
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mx: 'auto' }}>
                      Click a message on the left to open the conversation here.
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
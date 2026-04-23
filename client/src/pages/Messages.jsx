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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { getUniversityMockData } from '../data/mockData';
import { alpha, useTheme } from '@mui/material/styles';

const avatarColors = {
  R: '#2D6A4F',
  S: '#B45309',
  J: '#1D4ED8',
};

// ─── MessageCard ───────────────────────────────────────────────────────────
function MessageCard({ msg, onOpen }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const unreadSurface = alpha(theme.palette.success.main, isDark ? 0.16 : 0.08);
  const subtleSurface = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.07);

  return (
    <Card
      onClick={() => onOpen(msg.id)}
      sx={{
        cursor: 'pointer',
        border: msg.unread ? '1.5px solid' : '1px solid',
        borderColor: msg.unread ? 'primary.light' : 'divider',
        bgcolor: msg.unread ? unreadSurface : 'background.paper',
        '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
        transition: 'all 0.15s ease',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', gap: 1.75, alignItems: 'center' }}>
          <Badge
            overlap="circular"
            variant={msg.unread ? 'dot' : 'standard'}
            sx={{ '& .MuiBadge-badge': { bgcolor: 'success.main' }, flexShrink: 0 }}
          >
            <Avatar
              sx={{
                bgcolor: avatarColors[msg.avatar] || 'primary.main',
                width: 46,
                height: 46,
                fontWeight: 800,
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
              <Typography
                variant="subtitle2"
                fontWeight={msg.unread ? 800 : 700}
                noWrap
                sx={{ flex: 1 }}
              >
                {msg.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                {msg.time}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color={msg.unread ? 'text.primary' : 'text.secondary'}
              fontWeight={msg.unread ? 500 : 400}
              noWrap
            >
              {msg.preview}
            </Typography>

            <Chip
              label={`📍 ${msg.context}`}
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

  // Input state for the inline chat panel
  const [inputText, setInputText] = useState('');

  const { messages } = useMemo(
    () => getUniversityMockData(userProfile?.university),
    [userProfile?.university]
  );

  const filteredMessages = useMemo(
    () =>
      messages.filter((m) =>
        [m.name, m.preview, m.context]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [messages, query]
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
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
          Every conversation here started from a real shared moment — a study session, a café, or an event you both attended.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Inbox list – narrower on large screens */}
        <Grid item xs={12} md={4} lg={3.5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ textAlign: 'center' }}>
                Inbox
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Search by name, place, or context"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchRoundedIcon
                      fontSize="small"
                      style={{ marginRight: 8, opacity: 0.65 }}
                    />
                  ),
                }}
              />

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
                      key={msg.id}
                      onClick={() => setSelectedId(msg.id)}
                      sx={{ p: 0, borderRadius: 3, display: 'block' }}
                    >
                      <MessageCard msg={msg} onOpen={setSelectedId} />
                    </ListItemButton>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Inline conversation panel – wider, fills the right side */}
        <Grid item xs={12} md={8} lg={8.5}>
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
                        Connected through {selectedMsg.context}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={clearSelected} sx={{ flexShrink: 0 }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Messages bubble area */}
                  <Stack spacing={1.5} sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
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
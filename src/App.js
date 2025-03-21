import { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography,
  Box,
  Checkbox,
  ListItemSecondaryAction
} from '@mui/material';
import { Delete, Add, Edit, Save } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), completed: false, id: Date.now() }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleEdit = (id) => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      ));
      setEditId(null);
      setEditText('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            Todo List
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 3 }}>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new todo"
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            />
            <IconButton type="submit" color="primary" aria-label="add">
              <Add />
            </IconButton>
          </Box>

          <List>
            {todos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  mb: 1,
                  backgroundColor: 'white',
                  borderRadius: 1,
                  '&:hover': { backgroundColor: '#f8f8f8' },
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  color="primary"
                />
                {editId === todo.id ? (
                  <TextField
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    size="small"
                    sx={{ mx: 1 }}
                    onKeyPress={(e) => e.key === 'Enter' && handleEdit(todo.id)}
                  />
                ) : (
                  <ListItemText
                    primary={todo.text}
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.secondary' : 'text.primary',
                    }}
                  />
                )}
                <ListItemSecondaryAction>
                  {editId === todo.id ? (
                    <IconButton
                      edge="end"
                      aria-label="save"
                      onClick={() => handleEdit(todo.id)}
                      color="primary"
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => startEdit(todo)}
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(todo.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          
          {todos.length === 0 && (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
              No todos yet. Add one above!
            </Typography>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

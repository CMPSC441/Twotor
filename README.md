# AI Study Assistant - Twotor

An AI-powered study assistant that provides answers from Claude AI and evaluations from ChatGPT side-by-side.

## Features

- **4 Independent Chat Pages**: Separate conversations with AI for different topics
- **Notes Page**:
  - Review and improve your study notes
  - Generate comprehensive notes on any topic
  - Character counter for tracking note length
- **Dual AI System**:
  - Claude provides detailed answers
  - ChatGPT evaluates and reviews Claude's responses
- **Two-Column Layout**: View both AI responses simultaneously
- **Dark Theme UI**: Clean, modern interface

## Prerequisites

- Python 3.7+
- Node.js 14+
- npm 6+
- Anthropic API Key (Claude)
- OpenAI API Key (ChatGPT)

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Twotor
```

### 2. Set Up Python Backend

```bash
# Install Python dependencies
pip install -r requirements.txt
```

### 3. Set Up React Frontend

```bash
# Navigate to React app
cd my-app

# Install dependencies
npm install

# Return to root directory
cd ..
```

### 4. Configure API Keys

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API keys
# ANTHROPIC_API_KEY=your_anthropic_key_here
# OPENAI_API_KEY=your_openai_key_here
```

**Get API Keys:**
- Claude (Anthropic): https://console.anthropic.com/
- ChatGPT (OpenAI): https://platform.openai.com/api-keys

## Running the Application

### Option 1: Automatic (Recommended)

Run everything with one command:

```bash
python run.py
```

This will:
- Start Flask backend on `http://localhost:5000`
- Start React frontend on `http://localhost:3000`
- Open your browser automatically

### Option 2: Manual (Two Terminals)

**Terminal 1 - Backend:**
```bash
python -c "from flaskapi.flask_api import app; app.run(port=5000)"
```

**Terminal 2 - Frontend:**
```bash
cd my-app
npm start
```

## Usage

1. Open your browser to `http://localhost:3000`
2. Choose a chat page (Chat 1-4) or Notes page from the sidebar
3. For Chat pages:
   - Type your question and press Send
   - View Claude's answer on the left
   - View ChatGPT's review on the right
4. For Notes page:
   - **Review My Notes**: Paste your notes and get AI feedback
   - **Generate Notes on Topic**: Enter a topic to generate study notes

## Project Structure

```
Twotor/
├── flaskapi/          # Flask backend
│   └── flask_api.py   # Main API endpoint
├── claude_ai/         # Claude AI integration
│   └── claude.py
├── chatgpt_ai/        # ChatGPT integration
│   └── openai.py
├── my-app/            # React frontend
│   ├── src/
│   │   ├── App.js     # Main React component
│   │   └── App.css    # Styles
│   └── public/
├── .env               # API keys (not in repo)
├── .env.example       # Template for API keys
├── requirements.txt   # Python dependencies
├── run.py             # Startup script
└── README.md          # This file
```

## Testing

See `TESTING_GUIDE.md` for comprehensive testing instructions.

**Quick Test:**
1. Send a message in any chat
2. Verify both columns show responses
3. Test Notes page features
4. Try clearing a chat

## Troubleshooting

### "Unable to connect to server"
- Ensure Flask is running on port 5000
- Check that API keys are set in `.env`
- Verify both servers are running

### "ChatGPT review unavailable"
- Check your OpenAI API key
- Verify you have API credits
- Check Flask terminal for errors

### Port already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

## Technologies Used

- **Backend**: Flask, Python
- **Frontend**: React, JavaScript
- **AI APIs**: Anthropic Claude, OpenAI GPT-4
- **Styling**: CSS (Custom)

## Security Notes

- Never commit `.env` file with API keys
- Keep API keys secure and private
- Use `.env.example` as a template for others
- The `.env` file is in `.gitignore` to prevent accidental commits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license here]

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with Claude Code** 🤖

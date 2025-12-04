import React, { useState } from 'react';
import './App.css';

const styles = {
  sidebarOptionHover: {
    backgroundColor: '#333333',
  }
};

function Sidebar({ setCurrentPage, setChatHistory, handleClearChat }) {
  const [hoveredOption, setHoveredOption] = useState(null);

  const options = ['Chat 1', 'Chat 2', 'Chat 3', 'Chat 4', 'Notes'];
  const clearChatOption = 'Clear Current Chat';

  return (
    <div className="sidebar">
      <h2 style={{ marginBottom: '30px' }}>Twotor</h2>
      <nav>
        {options.map((option, index) => (
          <div className="sidebarOption"
            key={index}
            style={{
              ...(hoveredOption === index ? styles.sidebarOptionHover : {})
            }}
            onMouseEnter={() => setHoveredOption(index)}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => setCurrentPage(option.toLowerCase().replace(' ', ''))}
          >
            {option}
          </div>
        ))}
      </nav>
	  <div className="hidden"></div>
      <div className="clearOption" onClick={handleClearChat}>
        {clearChatOption}
      </div>
    </div>
  );
}

function ChatInterface({ chatId, chatHistory, setChatHistory }) {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
	
    if (input.trim()) {
	let x = input;
	setInput('');
	
	setChatHistory(prev => ({
			...prev,
			[chatId]: [...(prev[chatId] || []), {
			  type: 'getting_input',
			  content: "You: "+x,
			  timestamp: new Date().toISOString(),
			}],
		  }));
	
    try {
      // Send input to the Flask server
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim()}),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();

        // Backend returns both Claude's answer and ChatGPT's evaluation
        const aiResponse = {
          type: 'ai_response',
          answer: data.answer,  // Claude's response
          evaluation: data.evaluation,  // ChatGPT's evaluation
          timestamp: new Date().toISOString(),
        };

        // Update chat history with Flask's response
        setChatHistory(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), aiResponse],
        }));
      } else {
		  const data = await response.json();
		  const failResponse = {
          type: 'fail_response',
          content: "Failure to retrieve data from AI. Please try again later.",
          timestamp: new Date().toISOString(),
        };
        setChatHistory(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), failResponse],
        }));
      }
    } catch (error) {
		  console.error('Error communicating with Flask server:', error);
		  setChatHistory(prev => ({
			...prev,
			[chatId]: [...(prev[chatId] || []), {
			  type: 'error',
			  content: 'Unable to connect to the server. Please try again later.',
			  timestamp: new Date().toISOString(),
			}],
		  }));
		}
	}

  // Clear input after sending
  setInput('');
  };

  return (
    <div className="content">
      <div className="topWarningBar">
        <p><b>Please double check information provided by AI Study Assistant. AI generated content may not always be accurate.</b></p>
      </div>
      <div className="chatArea">
        <div className="outputContainer">
          <div className="outputSection">
            <h3 className="outputHeader">Claude's Answer</h3>
            <div className="output">
              {chatHistory[chatId]?.map((msg, index) => (
                <div key={index}>
                  {msg.type === 'getting_input' && <p>{msg.content}</p>}
                  {msg.type === 'ai_response' && <p>{msg.answer}</p>}
                  {msg.type === 'fail_response' && <p>{msg.content}</p>}
                  {msg.type === 'error' && <p>{msg.content}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="outputSection">
            <h3 className="outputHeader">ChatGPT Review</h3>
            <div className="output">
              {chatHistory[chatId]?.map((msg, index) => (
                <div key={index}>
                  {msg.type === 'ai_response' && (
                    <p>{msg.evaluation || 'ChatGPT review unavailable'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bottomChatBar">
          <input className="chatInput"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chat with AI..."
          />
          <button type="submit" className="chatButton">Send</button>
        </form>
      </div>
    </div>
  );
}

function NotesInterface({ chatHistory, setChatHistory }) {
  const [notes, setNotes] = useState('');
  const [topic, setTopic] = useState('');
  const [showTopicInput, setShowTopicInput] = useState(false);

  const handleReviewNotes = async () => {
    if (!notes.trim()) {
      alert('Please enter some notes to review.');
      return;
    }

    const message = `Please review and fix these notes: ${notes}`;
    await sendToBackend(message);
  };

  const handleGenerateNotes = async () => {
    if (!topic.trim()) {
      setShowTopicInput(true);
      return;
    }

    const message = `Generate comprehensive study notes on: ${topic}`;
    await sendToBackend(message);
    setShowTopicInput(false);
    setTopic('');
  };

  const sendToBackend = async (message) => {
    setChatHistory(prev => ({
      ...prev,
      notes: [...(prev.notes || []), {
        type: 'getting_input',
        content: `Request: ${message.substring(0, 100)}...`,
        timestamp: new Date().toISOString(),
      }],
    }));

    try {
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (response.ok) {
        const data = await response.json();

        const aiResponse = {
          type: 'ai_response',
          answer: data.answer,
          evaluation: data.evaluation,
          timestamp: new Date().toISOString(),
        };

        setChatHistory(prev => ({
          ...prev,
          notes: [...(prev.notes || []), aiResponse],
        }));
      } else {
        const failResponse = {
          type: 'fail_response',
          content: 'Failure to retrieve data from AI. Please try again later.',
          timestamp: new Date().toISOString(),
        };
        setChatHistory(prev => ({
          ...prev,
          notes: [...(prev.notes || []), failResponse],
        }));
      }
    } catch (error) {
      console.error('Error communicating with Flask server:', error);
      setChatHistory(prev => ({
        ...prev,
        notes: [...(prev.notes || []), {
          type: 'error',
          content: 'Unable to connect to the server. Please try again later.',
          timestamp: new Date().toISOString(),
        }],
      }));
    }
  };

  return (
    <div className="content">
      <div className="topWarningBar">
        <p><b>Please double check information provided by AI Study Assistant. AI generated content may not always be accurate.</b></p>
      </div>
      <div className="chatArea">
        <div className="notesInputArea">
          <textarea
            className="notesTextarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter or paste your notes here..."
          />
          <div className="notesCharCounter">
            Character count: {notes.length}
          </div>
          <div className="notesButtonContainer">
            <button className="notesButton" onClick={handleReviewNotes}>
              Review My Notes
            </button>
            {!showTopicInput ? (
              <button className="notesButton" onClick={handleGenerateNotes}>
                Generate Notes on Topic
              </button>
            ) : (
              <div className="topicInputContainer">
                <input
                  className="topicInput"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter topic..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleGenerateNotes();
                    }
                  }}
                />
                <button className="notesButton" onClick={handleGenerateNotes}>
                  Generate
                </button>
                <button className="notesCancelButton" onClick={() => {
                  setShowTopicInput(false);
                  setTopic('');
                }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="outputContainer">
          <div className="outputSection">
            <h3 className="outputHeader">Claude's Response</h3>
            <div className="output">
              {chatHistory.notes?.map((msg, index) => (
                <div key={index}>
                  {msg.type === 'getting_input' && <p><i>{msg.content}</i></p>}
                  {msg.type === 'ai_response' && <p>{msg.answer}</p>}
                  {msg.type === 'fail_response' && <p>{msg.content}</p>}
                  {msg.type === 'error' && <p>{msg.content}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="outputSection">
            <h3 className="outputHeader">ChatGPT Review</h3>
            <div className="output">
              {chatHistory.notes?.map((msg, index) => (
                <div key={index}>
                  {msg.type === 'ai_response' && (
                    <p>{msg.evaluation || 'ChatGPT review unavailable'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [chatHistory, setChatHistory] = useState({});
  const [currentPage, setCurrentPage] = useState('chat1');
  
  const handleClearChat = () => {
    const confirmMessage = currentPage === 'notes'
      ? 'Are you sure you want to clear the notes and outputs?'
      : 'Are you sure you want to clear the current chat?';

    const confirmed = window.confirm(confirmMessage);
    if (confirmed) {
      setChatHistory(prev => ({
      ...prev,
      [currentPage]: [],
    }));
    }
  };

  return (
    <div className="app">
      <Sidebar
        setCurrentPage={setCurrentPage}
        setChatHistory={setChatHistory}
		handleClearChat={handleClearChat}
      />
      {currentPage === 'notes' ? (
        <NotesInterface
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      ) : (
        <ChatInterface
          chatId={currentPage}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
        />
      )}
    </div>
  );
}

export default App;

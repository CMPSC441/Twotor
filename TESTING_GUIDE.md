# TESTING GUIDE - AI Study Assistant

## Before You Start
1. Make sure both servers are running:
   - Flask: `http://localhost:5000`
   - React: `http://localhost:3000`
2. Open `http://localhost:3000` in your browser
3. Open browser console (F12) to check for errors

---

## TEST 1: Basic Chat Functionality (Chat 1-4)

### Test Case 1.1: Send a Simple Question
**Steps:**
1. Click "Chat 1" in the sidebar
2. Type in the input box: `What is 2+2?`
3. Click "Send" or press Enter

**Expected Result:**
- ✓ Your question appears in BOTH columns with "You: What is 2+2?"
- ✓ LEFT column (Claude's Answer): Shows Claude's response explaining the answer
- ✓ RIGHT column (ChatGPT Review): Shows ChatGPT's evaluation/review (JSON format with score, reasoning, etc.)
- ✓ No errors in browser console

**What It Tests:**
- Frontend-backend connection
- API keys working for both Claude and ChatGPT
- Two-column layout displaying correctly

---

### Test Case 1.2: Multiple Messages in Same Chat
**Steps:**
1. Stay in "Chat 1"
2. Send: `What is photosynthesis?`
3. Wait for response
4. Send: `Explain it simply`

**Expected Result:**
- ✓ All messages appear in order
- ✓ Each response shows in BOTH columns
- ✓ Chat history is preserved
- ✓ Scroll works if content is long

**What It Tests:**
- Chat history management
- State persistence in same chat

---

### Test Case 1.3: Switch Between Chat Pages
**Steps:**
1. In "Chat 1", send: `Hello from Chat 1`
2. Click "Chat 2", send: `Hello from Chat 2`
3. Click "Chat 3", send: `Hello from Chat 3`
4. Click back to "Chat 1"

**Expected Result:**
- ✓ Chat 1 still shows "Hello from Chat 1" and its response
- ✓ Each chat maintains its own separate history
- ✓ Switching is smooth without errors

**What It Tests:**
- State management across multiple chats
- Chat isolation

---

## TEST 2: ChatGPT Review Display

### Test Case 2.1: Verify Both Columns Show Content
**Steps:**
1. Click "Chat 2"
2. Send: `Explain quantum physics`

**Expected Result:**
- ✓ LEFT column shows Claude's detailed explanation
- ✓ RIGHT column shows ChatGPT's evaluation (should be JSON with score, reasoning_quality, concerns, summary)
- ✓ Both columns have content at the same time
- ✓ No "ChatGPT review unavailable" message (unless API actually fails)

**What It Tests:**
- Backend returning both `answer` and `evaluation` fields
- Frontend correctly parsing and displaying both fields

---

### Test Case 2.2: Handle Missing Evaluation Gracefully
**Steps:**
1. Check browser console while sending a message
2. Look at the response in Network tab (F12 → Network)

**Expected Result:**
- ✓ If evaluation is missing/null, RIGHT column shows "ChatGPT review unavailable"
- ✓ LEFT column still shows Claude's answer
- ✓ No JavaScript errors

**What It Tests:**
- Error handling for missing evaluation
- Graceful degradation

---

## TEST 3: Notes Page - Review My Notes

### Test Case 3.1: Review Notes Feature
**Steps:**
1. Click "Notes" in the sidebar
2. Type in the text area:
   ```
   Photosynthesis is when plants make food using sunlight.
   It happens in the leaves. Plants need water and CO2.
   They produce oxygen as a byproduct.
   ```
3. Click "Review My Notes"

**Expected Result:**
- ✓ Request appears: "Request: Please review and fix these notes..."
- ✓ LEFT column: Claude reviews your notes (grammar, accuracy, organization, suggestions)
- ✓ RIGHT column: ChatGPT evaluates Claude's review quality
- ✓ Character counter shows correct count (e.g., "Character count: 150")
- ✓ Text area remains filled with your notes

**What It Tests:**
- Notes text area functionality
- Review My Notes button
- Backend processes notes review request
- Character counter accuracy

---

### Test Case 3.2: Empty Notes Validation
**Steps:**
1. Stay on "Notes" page
2. Clear the text area (delete all text)
3. Click "Review My Notes"

**Expected Result:**
- ✓ Alert appears: "Please enter some notes to review."
- ✓ No request sent to backend
- ✓ Outputs remain unchanged

**What It Tests:**
- Input validation
- Error prevention

---

### Test Case 3.3: Long Notes Handling
**Steps:**
1. Paste a very long text (500+ characters) into the text area
2. Click "Review My Notes"

**Expected Result:**
- ✓ Character counter updates correctly
- ✓ Text area is scrollable
- ✓ Backend processes the full text
- ✓ Response appears in both columns
- ✓ Both output columns are scrollable if content is long

**What It Tests:**
- Large input handling
- Scrolling functionality
- Text area resizing

---

## TEST 4: Notes Page - Generate Notes on Topic

### Test Case 4.1: Generate Notes Feature
**Steps:**
1. Click "Notes" in the sidebar
2. Click "Generate Notes on Topic" button
3. Topic input field appears
4. Type: `Machine Learning`
5. Click "Generate" (or press Enter)

**Expected Result:**
- ✓ Topic input field appears when button is clicked
- ✓ LEFT column: Claude generates comprehensive study notes on Machine Learning
- ✓ RIGHT column: ChatGPT evaluates the completeness and accuracy of notes
- ✓ Topic input field disappears after generating
- ✓ "Generate Notes on Topic" button reappears

**What It Tests:**
- Generate Notes functionality
- Topic input show/hide toggle
- Backend generates notes from topic
- Enter key submits topic

---

### Test Case 4.2: Cancel Topic Input
**Steps:**
1. Click "Generate Notes on Topic"
2. Type: `Biology`
3. Click "Cancel" button

**Expected Result:**
- ✓ Topic input field disappears
- ✓ Typed text is cleared
- ✓ "Generate Notes on Topic" button reappears
- ✓ No request sent to backend

**What It Tests:**
- Cancel functionality
- Input clearing
- State reset

---

### Test Case 4.3: Empty Topic Validation
**Steps:**
1. Click "Generate Notes on Topic"
2. Leave topic field empty
3. Click "Generate"

**Expected Result:**
- ✓ Topic input remains visible (doesn't submit)
- ✓ No request sent to backend

**What It Tests:**
- Topic input validation

---

## TEST 5: Clear Chat Functionality

### Test Case 5.1: Clear Chat Page
**Steps:**
1. Go to "Chat 1"
2. Send a few messages
3. Click "Clear Current Chat" in sidebar
4. Confirm the dialog

**Expected Result:**
- ✓ Confirmation dialog appears: "Are you sure you want to clear the current chat?"
- ✓ After confirming, both columns are cleared
- ✓ Chat 1 history is empty
- ✓ Other chats (Chat 2, 3, 4) remain unchanged

**What It Tests:**
- Clear functionality for chat pages
- Confirmation dialog
- Data isolation

---

### Test Case 5.2: Clear Notes Page
**Steps:**
1. Go to "Notes"
2. Type some notes and generate a review
3. Click "Clear Current Chat" in sidebar
4. Confirm the dialog

**Expected Result:**
- ✓ Confirmation dialog appears: "Are you sure you want to clear the notes and outputs?"
- ✓ Both output columns are cleared
- ✓ Text area content remains (only history is cleared, not the input)
- ✓ Character counter still shows count of remaining text

**What It Tests:**
- Clear functionality for Notes page
- Custom confirmation message for Notes
- Proper state management

---

### Test Case 5.3: Cancel Clear Action
**Steps:**
1. Go to any chat with messages
2. Click "Clear Current Chat"
3. Click "Cancel" in the dialog

**Expected Result:**
- ✓ Nothing is cleared
- ✓ All messages remain intact

**What It Tests:**
- Cancel functionality
- Data preservation

---

## TEST 6: Error Handling

### Test Case 6.1: Backend Down
**Steps:**
1. Stop Flask server (Ctrl+C in Flask terminal)
2. In the browser, send a message in any chat

**Expected Result:**
- ✓ Error message appears: "Unable to connect to the server. Please try again later."
- ✓ Message appears in both columns or just left column
- ✓ No JavaScript errors crash the app

**What It Tests:**
- Connection error handling
- User-friendly error messages

---

### Test Case 6.2: Invalid API Keys (Optional)
**Steps:**
1. Stop both servers
2. Change one API key in .env to invalid value
3. Restart Flask
4. Send a message

**Expected Result:**
- ✓ Error message appears
- ✓ Check Flask terminal for specific error
- ✓ Frontend handles error gracefully

**What It Tests:**
- API error handling
- Backend error responses

---

## TEST 7: UI/UX Tests

### Test Case 7.1: Dark Theme Consistency
**Steps:**
1. Navigate through all pages
2. Check colors and styling

**Expected Result:**
- ✓ Sidebar is black with white text
- ✓ Buttons are blue (#007bff) and red (for Clear)
- ✓ Hover effects work (darker blue, underline for clear)
- ✓ Text areas and inputs have blue borders
- ✓ Output sections have light gray background

**What It Tests:**
- CSS consistency
- Theme application

---

### Test Case 7.2: Responsive Layout
**Steps:**
1. Resize browser window
2. Try different widths

**Expected Result:**
- ✓ Two columns remain side-by-side
- ✓ Content doesn't overflow
- ✓ Scrollbars appear when needed

**What It Tests:**
- Responsive design
- Layout integrity

---

### Test Case 7.3: Button Interactions
**Steps:**
1. Hover over all buttons
2. Click each button

**Expected Result:**
- ✓ Hover changes color/style
- ✓ Cursor changes to pointer
- ✓ Buttons are clickable and responsive

**What It Tests:**
- User interaction feedback
- CSS hover states

---

## COMPLETE TEST CHECKLIST

Copy this checklist and mark off as you test:

### Basic Functionality
- [ ] Chat 1 sends and receives messages
- [ ] Chat 2 sends and receives messages
- [ ] Chat 3 sends and receives messages
- [ ] Chat 4 sends and receives messages
- [ ] Claude's Answer column shows responses
- [ ] ChatGPT Review column shows evaluations
- [ ] Both columns appear simultaneously

### Notes Page
- [ ] Notes textarea works
- [ ] Character counter updates
- [ ] "Review My Notes" sends notes for review
- [ ] "Review My Notes" shows results in both columns
- [ ] Empty notes shows validation alert
- [ ] "Generate Notes on Topic" shows topic input
- [ ] Topic generation works correctly
- [ ] Cancel button clears and hides topic input
- [ ] Enter key submits topic

### Navigation & State
- [ ] Can switch between all 5 pages (4 chats + Notes)
- [ ] Each chat maintains separate history
- [ ] Notes maintains separate history
- [ ] Switching pages doesn't lose data

### Clear Functionality
- [ ] Clear works for Chat 1
- [ ] Clear works for Chat 2
- [ ] Clear works for Chat 3
- [ ] Clear works for Chat 4
- [ ] Clear works for Notes page
- [ ] Confirmation dialog appears
- [ ] Cancel preserves data
- [ ] Confirm clears data

### Error Handling
- [ ] Connection errors show user-friendly message
- [ ] Backend errors don't crash frontend
- [ ] Missing evaluations show "unavailable" message
- [ ] Invalid inputs show validation messages

### UI/UX
- [ ] Sidebar navigation works smoothly
- [ ] Buttons have hover effects
- [ ] Text areas are resizable
- [ ] Scroll works in output columns
- [ ] Dark theme is consistent
- [ ] No layout breaking or overflow issues

---

## COMMON ISSUES & SOLUTIONS

### Issue: "ChatGPT review unavailable" always shows
**Solution:**
- Check Flask terminal for ChatGPT API errors
- Verify OPENAI_API_KEY in .env
- Check if you have API credits

### Issue: "Unable to connect to server"
**Solution:**
- Verify Flask is running on port 5000
- Check browser console for CORS errors
- Make sure Flask shows "Running on http://127.0.0.1:5000"

### Issue: Both columns are empty
**Solution:**
- Check Flask terminal for errors
- Verify both API keys are valid
- Check browser console for JavaScript errors

### Issue: Notes buttons don't work
**Solution:**
- Check browser console for errors
- Verify React app compiled without errors
- Hard refresh browser (Ctrl+Shift+R)

---

## SUCCESS CRITERIA

Your project is working correctly if:
1. ✓ All 4 chat pages work independently
2. ✓ Notes page has both features working
3. ✓ Claude's responses appear in left column
4. ✓ ChatGPT reviews appear in right column
5. ✓ Clear button works for all pages
6. ✓ No console errors during normal operation
7. ✓ Character counter updates in Notes
8. ✓ Navigation between pages works smoothly
9. ✓ Input validation prevents empty submissions
10. ✓ Error messages appear when backend is down

---

## Quick Smoke Test (5 minutes)

If you want a quick test, do these 5 things:

1. **Test Chat**: Send "Hi" in Chat 1 → Both columns show content ✓
2. **Test Notes Review**: Type notes → Click "Review My Notes" → Both columns show ✓
3. **Test Notes Generate**: Click "Generate Notes on Topic" → Enter "Python" → Both columns show ✓
4. **Test Navigation**: Switch between Chat 1, Chat 2, Notes → Each maintains state ✓
5. **Test Clear**: Clear Chat 1 → Confirms and clears ✓

If all 5 pass, your app is working correctly!

---

**Start with the Quick Smoke Test, then do the full checklist if you want thorough testing!**

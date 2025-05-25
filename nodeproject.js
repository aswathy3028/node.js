const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Use middleware to parse JSON
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Test route working');
});

app.post('/createFile', (req, res) => {
  const filename = 'Nodeproject.txt';
  const text = req.body.text;
  
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  fs.writeFile(filename, text, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      res.status(500).json({ message: 'Internal Error' });
    } else {
      res.json({ message: 'File created successfully' });
    }
  });
});

// ✅ THIS is the PUT route you're testing
app.put('/modifyFile', (req, res) => {
  const filename = 'Nodeproject.txt';
  const newText = req.body.text;

  if (!newText) {
    return res.status(400).json({ message: 'Text is required' });
  }

  fs.appendFile(filename, `\n${newText}`, (err) => {
    if (err) {
      console.error('Error occurred', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Text added successfully to the file' });
    }
  });
});


// Delete content in file
app.delete('/deleteText', (req, res) => {
    const filename = 'Nodeproject.txt';
  
    fs.truncate(filename, 0, (err) => {
      if (err) {
        console.error('Error occurred', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.json({ message: 'Text deleted successfully from the file' });
      }
    });
  });



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

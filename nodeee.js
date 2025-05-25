app.put('/modifyFile', (req, res) => {
  const filename = 'Nodeproject.txt';
  const newText = req.body.text;
 
  fs.appendFile(filename,`\n${newText}`, (err) => {
  if (err) {
  console.error('Error occurred', err);
  res.status(500).json({ message: 'Internal Server Error' });
  } else {
  res.json({ message: 'Text added successfully to the file' });
  }
  });
 });
 
 app.get('/',(req,res) => {
  res.send('Server is working');
 });

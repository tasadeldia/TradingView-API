const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/examples', (req, res) => {
  const examplesDir = path.join(__dirname, 'examples');
  fs.readdir(examplesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan examples directory' });
    }
    res.json(files);
  });
});

app.get('/run-example', (req, res) => {
  const exampleName = req.query.name;
  if (!exampleName) {
    return res.status(400).json({ error: 'Example name is required' });
  }
  const examplePath = path.join(__dirname, 'examples', exampleName);
  try {
    const example = require(examplePath);
    const result = example.run(); // Assuming examples have a run() function
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
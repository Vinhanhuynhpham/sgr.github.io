const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/visit', (req, res) => {
  const data = JSON.parse(fs.readFileSync('dl.json'));
  data.visits += 1;
  fs.writeFileSync('dl.json', JSON.stringify(data));
  res.json({ visits: data.visits });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

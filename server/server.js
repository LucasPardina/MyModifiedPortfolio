const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('../public'));

// Endpoint to get all reviews
app.get('/api/reviews', (req, res) => {
  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const reviews = JSON.parse(data);
    res.json(reviews);
  });
});

// Endpoint to add a new review
app.post('/api/reviews', (req, res) => {
  const review = req.body;
  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const reviews = JSON.parse(data);
    reviews.push(review);
    fs.writeFile('reviews.json', JSON.stringify(reviews), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'Review submitted successfully' });
    });
  });
});

// Endpoint to get all reviews
app.get('/api/reviews', (req, res) => {
  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve reviews' });
    } else {
      const reviews = JSON.parse(data);
      res.json(reviews);
    }
  });
});

// Endpoint to delete a review
app.delete('/api/reviews/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read reviews data.' });
    } else {
      const reviews = JSON.parse(data);
      const filteredReviews = reviews.filter((review) => review.id !== id);

      fs.writeFile('reviews.json', JSON.stringify(filteredReviews), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to write reviews data.' });
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

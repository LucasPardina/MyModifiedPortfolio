// Function to navigate to the reviews page
function navigateToReviews() {
  window.location.href = 'reviews.html';
}

// Attach an event listener to the "Reseñas" navigation link
document.getElementById('reviews-list').addEventListener('click', navigateToReviews);

function displayReviews() {
  // Create a container for the reviews
  const reviewsContainer = document.createElement('div');
  reviewsContainer.classList.add('reviews-container');
  reviewsContainer.classList.add('myContainer');
  reviewsContainer.classList.add('shadow');

  // Fetch reviews from the server
  fetch('/api/reviews')
    .then(response => response.json())
    .then(reviews => {
      reviews.forEach(review => {
        // Create an individual review element
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        // Create an element for the name
        const nameElement = document.createElement('h3');
        nameElement.textContent = review.name;
        reviewElement.appendChild(nameElement);

        // Create an element for the review text
        const textElement = document.createElement('p');
        textElement.textContent = review.message;
        reviewElement.appendChild(textElement);

        // Create the button element
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('button');
        buttonElement.textContent = 'Eliminar Reseña';
        buttonElement.addEventListener('click', () => {
          // Handle button click event
          deleteReview(review.id); 
          console.log('Button clicked!');
        });
        reviewElement.appendChild(buttonElement);

        // Append the review element to the container
        reviewsContainer.appendChild(reviewElement);
      });

      // Append the reviews container to the body or another appropriate element
      document.body.appendChild(reviewsContainer);
    })
    .catch(error => {
      console.error('Error fetching reviews:', error);
    });
}

// Function to delete a review
function deleteReview(id) {
  fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  })
      .then((response) => {
          if (response.ok) {
              alert('Review deleted successfully!');
              location.reload(); // Reload the page after deleting
          } else {
              alert('Failed to delete review.');
          }
      })
      .catch((error) => {
          console.error(error);
          alert('An error occurred while deleting the review.');
      });
}

// Call the displayReviews function when the reviews.html page loads
document.addEventListener('DOMContentLoaded', displayReviews);

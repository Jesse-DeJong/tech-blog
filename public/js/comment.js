const commentFormHandler = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const articleId = event.target.id;
    // DOM targeting 
    const comment = document.querySelector('#commentField').value;
  
    // If user has entered a comment
    if (comment, articleId) {
      // Call the comment route with the userdata
       const loginFetch = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ comment, articleId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (loginFetch.status === 200) {
        window.location.replace('/');
      }
    }
  };
    
  // DOM targeting and listener for form submission
  document
    .querySelector('.commentField')
    .addEventListener('click', commentFormHandler);

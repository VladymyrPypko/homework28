const postContainer = document.getElementById('postContainer');
const commentsContainer = document.getElementById('commentsContainer');
const getPostBtn = document.getElementById('getPostBtn');

getPostBtn.addEventListener('click', () => {
    getPost();
    commentsContainer.innerHTML = '';
})

function getPost(){
    const postId = parseInt(document.getElementById('postNum').value);

    if(postId >= 1 && postId <= 100){
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(post => {
                postContainer.innerHTML = `
                    <h2 class="postContainer__title">${post.title}</h2>
                    <p class="postContainer__info">${post.body}</p>
                    <button class="postContainer__button">Get Comments</button>
                `;
                document.querySelector('.postContainer__button').addEventListener('click', () => {
                    getComments(post.id);
                });
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            });
    } else {
        postContainer.innerHTML = `
            <p class="postContainer__error">Invalid post ID!</p>
        `;
    }
}

function getComments(postId){
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(comments => {
            commentsContainer.innerHTML = `
                <h2 class="commentsContainer__title">Comments:</h2>
                <ul class="commentsContainer__list">
                    ${comments.map(comment => `
                        <li class="commentsContainer__item">${comment.body}</li>`)}
                </ul>
            `;
        })
        .catch(error => {
            console.error(error);
            commentsContainer.innerHTML = `
                <p class="commentsContainer__error">Error: ${error.message}</p>
            `;
        });
}
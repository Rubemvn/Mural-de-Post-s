
document.addEventListener("DOMContentLoaded", () => {
    updatePosts();
});

function updatePosts() {

    fetch("http://localhost:7000/api/all").then(res => {
        return res.json();
    }).then(json => {
        let postElements = '';

        let posts = JSON.parse(json);

        posts.forEach(post => {

            let postElement = `
            <div id=${post.id} class="card mb-1">
                <div class="card-header d-flex justify-content-between">
                    <span class="card-title text-capitalize fw-bolder fs-5">${post.title}</span>
                    <button id="btnDel${post.id}" class="btn btn-danger" onclick="deletePost('btnDel${post.id}')">Deletar</button>
                </div>
                <div class="card-body">
                    <div class="card-text">${post.description}</div>
                </div>
            </div>`;
            postElements += postElement;

        });

        document.getElementById("posts").innerHTML = postElements;

    });

}

function newPost() {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let post = { title, description }

    const options = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(post)
    }

    fetch("http://localhost:7000/api/new", options).then(res => {
        updatePosts();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

    })

}

function deletePost(idBtn) {
    let btn = document.getElementById(idBtn);
    let id = { id: ((btn.parentNode).parentNode).id };
    // console.log(id);

    const options = {
        method: "DELETE",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(id)
    }

    fetch("http://localhost:7000/api/delete", options).then(res => {
        updatePosts();
    })
}
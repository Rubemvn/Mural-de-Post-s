module.exports = {

    posts: [
    ],

    getAll() {
        return this.posts;
    },

    newPost(title, description) {
        this.posts.push({ id: generateID(), title, description })
    },

    deletePost(id) {
        // console.log(id)
        let i = 0
        while (i <= this.posts.length) {

            if (this.posts[i].id == id) {

                this.posts.splice(i,1);
                break
            }
            i += 1;
        }
    }
}

function generateID() {
    return Math.random().toString(36).substr(2, 9)
}
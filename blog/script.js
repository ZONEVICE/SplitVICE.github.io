// ====================================================================================
// Dom elements capture
// ====================================================================================

const container_blog = document.getElementById("container_blog");

// ====================================================================================
// Fetch function
// ====================================================================================

async function get_blogs() {
    try {
        const req = await fetch(serverHost + "/api/blog"),
            res = await req.json();
        res.status == "success" && res.description == "blogs retrieved" ?
            render_blogs(res.blogs) :
            render_error_500();
    } catch (error) { console.error(error); render_error_500(); }
}

// ====================================================================================
// Rendering functions
// ===================================================================================

function render_blogs(blogs) {
    if (blogs.length == 0) { render_noBlogs(); return; }
    blogs.reverse();
    let content = "";
    blogs.forEach(b => {
        content += /* html */`
        <div class="title">
            ${b.Title}
        </div>
        <span class="subtitle">${moment(b.Date).format('MMMM Do YYYY, h:mm:ss a')}</span> -
        <span class="subtitle">${b.Writer}</span>
        <div class="body">
            ${b.Body}
        </div>
        <hr>
        `;
    });
    container_blog.innerHTML = content;
}

function render_error_500() {
    container_blog.innerHTML = /* html */`
    <div class="alert alert-danger" role="alert">
        An server error has ocurred (ERROR 500). Please, report at <a href="/send-message">Send a message</a>
    </div>
    `;
}

function render_noBlogs() {
    container_blog.innerHTML = /* html */`
    <div class="alert alert-warning" role="alert">
        No blogs have been written yet
    </div>
    `;
}

// ====================================================================================
// Main
// ====================================================================================

get_blogs();

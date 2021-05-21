// =============================================================================================
// Variables
const comments = document.getElementById('comments'),
    settings =
    {
        ReadOnly: false,
        pic: '/public/libs/comments/pic.png'
    };

let comments__list = undefined;

async function comments__main(CommentsKeyName) {
    // =============================================================================================
    // Main start

    settings.CommentsKeyName = CommentsKeyName;

    if (settings.CommentsKeyName == undefined) {
        comments.innerHTML = /* html */`
            <div class="alert alert-warning" role="alert">
                CommentsKeyName value not set
            </div>`;
        return;
    }

    await get__commentsDocument();
    render__commentsStructure();
    render__listOfComments();

    // Main end
    // =============================================================================================

    async function get__commentsDocument() {
        try {
            let request = await fetch(SERVER_HOST + '/api/comments/' + settings.CommentsKeyName, {
                method: 'GET',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });

            let response = await request.json();

            if (response.status == 'failed') {

                if (response.description == 'comments currently deactivated') {

                    settings.CommentsActivated = false;

                }

            } else {
                settings.ReadOnly = response.Settings.ReadOnly;
                comments__list = response.Comments.reverse();
            }

        } catch (error) {
            comments.innerHTML = /* html */`
                <div class="alert alert-danger" role="alert">
                    Error 500 - Service unavailable. Please report at <a href='/send-message'>Send a Message section</a>
                </div>`;
        }
    };

    // Renders comments form, comments list, and comments reply modal.
    function render__commentsStructure() {
        if (settings.CommentsActivated == undefined) {
            comments.innerHTML = /* html */
                `
        <div id='html__comments_post__form'>

            ${settings.ReadOnly == false ? /* html */`

            <textarea class='form-control' id="html__comments__body" rows="5" placeholder='Your comment'></textarea>
            <input id='html__comments__ownerName' type='text' class='form-control' placeholder='Your name/nickname (optional)'>
            <button onClick='post__comment()' class='btn btn-primary'>Post new comment</button>`
                    : /* html */
                    `<div class="alert alert-warning" role="alert">
                    Comments have been set as read only
                </div>`
                }

        </div>

        <hr>

        <div id='html__comments__list'></div>

        ${settings.ReadOnly == false ? /* html */
                    `<div class='reply__modal__container invisible' id='reply__modal__container'>

                    <div class='reply__modal' id='reply__modal'>
                        <div class='container'>

                            <div class='h1'>Reply</div>

                            <hr>
                            <div id='reply__modal__commentToReplyToContainer'></div>
                            <hr>

                            <textarea class='form-control' id="html__comments__body__reply" rows="4" placeholder='Your reply'></textarea>
                            <input id='html__comments__ownerName__reply' type='text' class='form-control' placeholder='Your name/nickname (optional)'>
                            <br>
                            <button onClick='post__comment__reply()' class='btn btn-secondary'>Post reply</button>
                            <button class='btn btn-secondary' onClick="form__hide__reply()" >Cancel</button>
                        </div>
                    </div>

                </div>` : ``}`;
        } else {
            if (settings.CommentsActivated == false) {
                comments.innerHTML = /* html */`
                        <div class="alert alert-warning" role="alert">
                            Comments have been deactivated. Come back later.
                        </div>`;
            }
        }
    }

    function render__listOfComments() {
        if (settings.CommentsActivated != undefined)
            if (settings.CommentsActivated == false)
                return;

        const html__comments__list = document.getElementById('html__comments__list');

        if (comments__list.length == 0) {
            html__comments__list.innerHTML = 'No comments yet';
            return;
        }

        // Takes replies and stores them into a new variable inside comments document. Deletes
        // replies from comments__list array.
        for (let i = 0; i < comments__list.length; i++) {
            if (comments__list[i].Replies.length > 0) {
                comments__list[i].ReplyCommentDocument = [];
                for (let j = 0; j < comments__list[i].Replies.length; j++) {
                    for (let n = 0; n < comments__list.length; n++) {
                        if (comments__list[i].Replies[j] == comments__list[n]._id) {
                            comments__list[i].ReplyCommentDocument.push(comments__list[n]);
                            comments__list[n].isReply = true;
                        }
                    }
                }
            }
        }

        let temporal = '';

        comments__list.forEach(comment => {
            if (!comment.isReply) {

                temporal += render__comment(comment);

                const leftMargin__pattern = 25;

                render__reply(comment, leftMargin__pattern);

                /**
                 * Checks is the document element given has replies inside ReplyCommentDocument
                 * variable. Renders all replies inside other replies if so checking this function
                 * recursively.
                 * @param { Object } comment document object.
                 * @param { Number } leftMargin adds a margin to replies so they are translated to
                 * the right.
                 */
                function render__reply(comment, leftMargin) {
                    if (comment.ReplyCommentDocument != undefined) {
                        for (let i = 0; i < comment.ReplyCommentDocument.length; i++) {
                            temporal += render__comment(comment.ReplyCommentDocument[i], leftMargin);
                            render__reply(comment.ReplyCommentDocument[i], (leftMargin + leftMargin__pattern));
                        }
                    }
                }
            }
        });

        /**
         * Sends HTML syntax of a rendered document.
         * @param { Object } commentDocument comment document to render.
         * @param { String } leftMargin margin to put at the left if the comment
         * is a reply to another comment.
         */
        function render__comment(commentDocument, leftMargin) {

            const date = commentDocument.Date != undefined ?
                moment(commentDocument.Date).format('MMMM Do YYYY, h:mm:ss a') :
                'Unknown date';

            return /* html */ `
            <div class='html--comments--list--container' style="margin-left: ${leftMargin}px;">
            ${leftMargin != undefined ? `<div class='html--comments--list--replySign'></div>` : ''}

                <img src='${settings.pic}' width='50px' class='html--comments--list--img'/>

                <div class='html--comments--list--text-container'>

                    <div class='html--comments--list--dividerLine'></div>

                    <div class='html--comments--list--ownerName--date'>

                    ${commentDocument.VICEComment == true ? `<span class='vice-comment'>| SPLIT VICE |</span><br>` : ''}

                        <span class='html--comments--list--ownerName'>
                            ${commentDocument.OwnerName}
                        </span>

                        <span class='html--comments--list--date'>
                            ${date}
                        </span>
                        ${leftMargin == 160 || settings.ReadOnly == true ? '' : /* html */`
                        | <a class='html--comments--list--reply'
                            href='javascript:void(0)'
                            onClick="form__show__reply('${commentDocument._id}')">Reply
                            </a>`}

                    </div>

                    <div class='html--comments--list--body'>
                        ${linkify(commentDocument.Body)}
                    </div>

                </div>

            </div>`;
        }

        html__comments__list.innerHTML = temporal;
    }

    window.post__comment = async () => {
        const Body = document.getElementById('html__comments__body').value,
            OwnerName = document.getElementById('html__comments__ownerName').value;

        if (Body == '') {
            alert__contentNotWritten();
            return;
        }

        const request = await fetch(SERVER_HOST + '/api/comments/', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    CommentsKeyName: settings.CommentsKeyName,
                    Body: Body,
                    OwnerName: OwnerName == '' ? undefined : OwnerName
                })
        });
        const response = await request.json();
        if (response.status == 'success' && response.description == 'comment posted successfully') {
            comments__list = response.Comments.reverse();
            document.getElementById('html__comments__body').value = '';
            document.getElementById('html__comments__ownerName').value = '';
            render__listOfComments();
            alert__commentPosted();
        }
    }

    window.post__comment__reply = async () => {
        const Body = document.getElementById('html__comments__body__reply').value;

        if (Body == '') {
            alert__contentNotWritten();
            return;
        }

        const OwnerName = document.getElementById('html__comments__ownerName__reply').value;
        const PointedCommentId = document.getElementById('html__comments__commentReplyIsToId__reply').innerHTML;
        const reply_object = {
            CommentsKeyName: settings.CommentsKeyName,
            Body: Body,
            OwnerName: OwnerName == '' ? undefined : OwnerName,
            PointedCommentId: PointedCommentId
        }

        const request = await fetch(SERVER_HOST + '/api/comments/reply', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(reply_object)
        });
        const response = await request.json();
        if (response.status == 'success' && response.description == 'reply posted successfully') {
            await get__commentsDocument();
            form__hide__reply();
            render__listOfComments();
            document.getElementById('html__comments__body__reply').value = '';
            document.getElementById('html__comments__ownerName__reply').value = '';
            alert__commentPosted();
        }
    }

    window.form__show__reply = (id) => {
        MainContentChanges_ModalDisplaying();
        const reply__modal__container = document.getElementById('reply__modal__container');
        const reply__modal = document.getElementById('reply__modal');
        reply__modal__container.classList.remove('invisible');
        reply__modal.classList.add('modal-content--activate-animation');

        const reply__modal__commentToReplyToContainer =
            document.getElementById('reply__modal__commentToReplyToContainer');

        const commentReplyIsTo = comments__list.find(item => { return item._id == id });

        reply__modal__commentToReplyToContainer.innerHTML = /* html */`
        Nickname: ${commentReplyIsTo.OwnerName}
        <div id='html__comments__commentReplyIsToId__reply' class='invisible'>${id}</div>
        <br>
        ${linkify(commentReplyIsTo.Body)}
        `;
    }

    window.form__hide__reply = () => {
        MainContentChanges_ModalNotDisplaying();
        const reply__modal__container = document.getElementById('reply__modal__container');
        const reply__modal = document.getElementById('reply__modal');
        reply__modal.classList.add('modal-content--deactivate-animation');
        setTimeout(() => {
            reply__modal__container.classList.add('invisible');
            reply__modal.classList.remove('modal-content--activate-animation');
            reply__modal.classList.remove('modal-content--deactivate-animation');
            document.body.scroll = 'yes';
        }, 100);
    }

    function MainContentChanges_ModalDisplaying() {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
    }

    function MainContentChanges_ModalNotDisplaying() {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
    }
}

// Shows a message alert when a comment is successfully posted.
function alert__commentPosted() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Comment posted'
    })
}

// Shows a message when user tries to post a comment with no content.
function alert__contentNotWritten() {
    Swal.fire({
        icon: 'error', title: 'Invalid comment', text: 'You cannot post an empty comment.'
    })
}

// Reads plain-text string. Checks for links and images. Returns <a> and <img> tags arround 
// plain-text input if required.
function linkify(inputText) {
    // Source: https://stackoverflow.com/questions/49634850/javascript-convert-plain-text-links-to-clickable-links
    // Version 1.0
    var replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    //Change img addresses to <img> tag.
    replacePattern4 = /(?<=>)(https?:\/\/\S+(?:png|jpe?g|gif)[^<]*)/g;
    replacedText = replacedText.replace(replacePattern4, '<img src="$1" width="100px">');

    return replacedText;
}
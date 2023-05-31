const postFormHandler = async (event) => {
    event.preventDefault();

const title = document.querySelector('#post-title').value.trim();
const content = document.querySelector('#post-content').value.trim();

const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
});
};
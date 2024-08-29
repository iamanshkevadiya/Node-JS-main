document.getElementById('sbm').addEventListener('click',function(e) {
    e.preventDefault();
    items();
});

function items() {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

    fetch('http://localhost:8090/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, price, category })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('display').innerHTML = `
            <h2>Item Details</h2>
            <p>Title: ${data.title}</p>
            <p>Price: ${data.price}</p>
            <p>Category: ${data.category}</p>
        `;
        });
}
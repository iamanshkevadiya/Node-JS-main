const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

    const response = await fetch('http://localhost:8020/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, price, category })
    });

    if (response.ok) {
        form.reset();
        loadItems();
    }
});

async function loadItems() {
    const response = await fetch('http://localhost:8020/items');
    const items = await response.json();
    itemList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - $${item.price} - ${item.category}`;
        itemList.appendChild(li);
    });
}

loadItems();

const db = new Dexie('ShoppingApp');
// db.version(1).stores( e:{ items: '++id,name,price,isPurchased' })
db.version(1).stores( { items: '++id,name,price,isPurchased'})

const itemsForm = document.getElementById('formInput');
const itemsDiv = document.getElementById('itemsDiv');
const totalPriceDiv = document.getElementById('totalPrice');

itemsForm.onsubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const quantity = document.getElementById('qauntityInput').value;
    const price = document.getElementById('priceInput').value;

    await db.items.add({ name, quantity, price });
    await getData();

    itemsForm.reset();
}

const getData = async () => {
    allItems = await db.items.reverse().toArray();
 
    itemsDiv.innerHTML = allItems.map(item => `
    <div class="items ${item.isPurchased && 'purchased'}">
    <label for="checkbox">
    <input type="checkbox" 
    onchange="toggleItemStatus(event, ${item.id})"
    class="checkbox" 
    ${item.isPurchased && 'checked'}>
    </label>
    <div class="itemInfo">
        <p>${item.name}</p>
        <p>$ ${item.price} x ${item.quantity}</p>
    </div>
    <button class="delBtn" onclick="removeItem(${item.id})"> X </button>
</div>
    `).join('');

    const priceSum = allItems.map(item => item.price * item.quantity)
    const sumTotal = priceSum.reduce((a, b) => a + b);

    totalPriceDiv.innerText = 'Total price: $' + sumTotal;
}
window.onload = getData;

const toggleItemStatus = async (event, id) => {
await db.items.update(id, {isPurchased: !!event.target.checked});
await getData();
}

const removeItem = async (id) => {
    await db.items.delete(id);
    await getData()
} 
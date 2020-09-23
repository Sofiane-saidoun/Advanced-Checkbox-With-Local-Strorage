const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addingItem(e) {
  e.preventDefault(e);
  const text = this.querySelector("[name='item']").value;
  const item = {
    text: text,
    done: false,
  };
  this.reset();
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
            <input type="checkbox" data-index="${i}" id="item${i}" ${
        plate.done ? "checked" : ""
      } />
            <label for="item${i}"> ${plate.text} </label>
        </li>    
        `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addingItem);
populateList(items, itemsList);

itemsList.addEventListener("click", toggleDone);

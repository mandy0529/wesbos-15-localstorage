const form = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

const ITEMS = 'items';
const items = JSON.parse(localStorage.getItem(ITEMS)) || [];

const saveLocalStorage = () => {
  localStorage.setItem(ITEMS, JSON.stringify(items));
};

const showItems = (list = [], where) => {
  where.innerHTML = list
    .map(
      (item, index) =>
        `<li>
            <input type="checkbox" data-index=${index} id=${index} ${
          item.done ? 'checked' : ''
        } />
            <label for=${index}>${item.value}</label>
        </li>`
    )
    .join('');
};

const handleSubmit = (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input[name=item]');
  const value = input.value;
  const item = {value, done: false};
  items.push(item);
  showItems(items, itemsList);
  input.value = '';
  input.focus();
  saveLocalStorage();
};

const handleClick = (e) => {
  if (!e.target.matches('input')) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  saveLocalStorage();
};

showItems(items, itemsList);

form.addEventListener('submit', handleSubmit);
itemsList.addEventListener('click', handleClick);

const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
let myInputs = [];
const inputsFromLocalStorage = JSON.parse(localStorage.getItem('myInputs'));

if (inputsFromLocalStorage) {
  myInputs = inputsFromLocalStorage;
  render(myInputs);
}

tabBtn.addEventListener('click', () => {
  // Grab the URL of the current tab!
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    myInputs.push(tabs[0].url);
    localStorage.setItem('myInputs', JSON.stringify(myInputs));
    render(myInputs);
  });
});


function render(inputs) {
  let listInputs = '';
  for (let i = 0; i < inputs.length; i++) {
    listInputs += `
    <li>
      <a target="_blank" href="${inputs[i]}">
        ${inputs[i]}
      </a>
    </li>`;
  }
  ulEl.innerHTML = listInputs;
}

inputBtn.addEventListener('click', () => {
  myInputs.push(inputEl.value);
  // Clear out the input field
  inputEl.value = '';
  localStorage.setItem('myInputs', JSON.stringify(myInputs));
  render(myInputs);
});

deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myInputs = [];
  render(myInputs);
});
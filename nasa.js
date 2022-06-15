const API = 'https://api.nasa.gov/planetary/apod';
const API_KEY = '6xWNIUCBrFM24dDeYonD6AOzJRNFhHFpZfVOSXzG';
const TODAY = formatDate(new Date());

const consumeAPI = async () => {
  try {
    const dateSelector = document.getElementById('date');
    const date = formatDate(dateSelector?.value) ?? TODAY;
    const url = getURL(API, API_KEY, date)

    const response = await fetch(
      url,
      {method: 'GET' }
    );
    const data = await response.json();

    addTitle(`${data.title} - ${data.date}`);
    addImage(data.hdurl ?? data.url);
    addText(data.explanation);
    hideForm();

  } catch (error) {
    console.log(error);
  }
}

const addTitle = (title) => {
  const h1 = document.createElement('h1');
  const text = document.createTextNode(title);
  h1.appendChild(text);
  const content = document.getElementById('content');
  content.appendChild(h1);
}

const addImage = (url) => {
  const img = document.createElement('img');
  img.src = url;
  const content = document.getElementById('content');
  content.appendChild(img);
}

const addText = (explanation) => {
  const li = document.createElement('li');
  const text = document.createTextNode(explanation);
  li.appendChild(text);
  const content = document.getElementById('content');
  content.appendChild(li);
}

const hideForm = () => {
  const button = document.getElementById('btn');
  const dateSelector = document.getElementById('date');
  dateSelector.style.display = 'none'
  button.style.display = 'none';
}

function formatDate(date) {
  if (!date) return null;

  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const getURL = (url, key, date) => {
  return `${url}?api_key=${key}&date=${date}`
}









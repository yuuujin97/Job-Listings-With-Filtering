'use strict';

const ajax = new XMLHttpRequest();
const list = document.querySelector('.job__list');

function getData() {
  ajax.open('GET', './data.json', false);
  ajax.send();
  return JSON.parse(ajax.response);
}
function makeList() {
  const list_item = getData();
  const job_list = [];
  let template = '';

  for (let i = 0; i < list_item.length; i++) {
    template = `
      <li>
        <div class="job__info">
          <img src="${list_item[i].logo}" alt="" />
          <div>
            <div>
              <span class="job__name">${list_item[i].company}</span>
              ${list_item[i].new === 'true' ? '<span class="note note--new">New!</span>' : ''}
              ${list_item[i].new === 'true' ? '<span class="note note--featured">Featured</span>' : ''}                            
            </div>
            <p class="job__position">${list_item[i].position}</p>
            <ul>
              <li>${list_item[i].postedAt}</li>
              <li>${list_item[i].contract}</li>
              <li>${list_item[i].location}</li>
            </ul>
          </div>
        </div>
        <div class="job__tags">
          <ul>
            <li><button class="btn__tag">${list_item[i].role}</button></li>
            <li><button class="btn__tag">${list_item[i].level}</button></li>            
      `;
    if (list_item[i].languages.length !== 0) {
      for (let j = 0; j < list_item[i].languages.length; j++) {
        template += `<li><button class="btn__tag">${list_item[i].languages[j]}</button></li>`;
      }
    }

    if (list_item[i].tools.length !== 0) {
      for (let j = 0; j < list_item[i].tools.length; j++) {
        template += `<li><button class="btn__tag">${list_item[i].tools[j]}</button></li>`;
      }
    }

    template += `
          </ul>
        </div>
      </li>
      `;

    job_list.push(template);
  }

  list.innerHTML = job_list.join('');
}

makeList();

const btn_tags = document.querySelectorAll('.btn__tag');

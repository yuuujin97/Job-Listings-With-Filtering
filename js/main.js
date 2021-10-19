'use strict';

const ajax = new XMLHttpRequest();
const filter_box = document.querySelector('.filter__box');
const filter_list = document.querySelector('.filter__list');
const filter_clear = document.querySelector('.filter__clear');
const job_list = document.querySelector('.job__list');
let tags = [];
let job_list_item;

function getData() {
  ajax.open('GET', './data.json', false);
  ajax.send();
  return JSON.parse(ajax.response);
}

function makeFilterTemplate() {
  const list = [];
  let template = '';

  for (let i = 0; i < tags.length; i++) {
    template = `
       <li>
         <button class="btn__filter">${tags[i]}<i class="fas fa-times"></i></button>
       </li>
    `;
    list.push(template);
  }

  filter_box.classList.add('show');
  filter_list.innerHTML = list.join('');

  const btn_filters = document.querySelectorAll('.btn__filter');
  for (const btn_filter of btn_filters) {
    btn_filter.addEventListener('click', deleteFilter);
  }
}

function deleteFilter() {
  tags.splice(tags.indexOf(this.innerText), 1);
  if (tags.length === 0) {
    filter_box.classList.remove('show');
    makeListTemplate();
  } else {
    makeListTemplate();
    makeFilterTemplate();
  }
}

function addFilter() {
  tags.push(this.innerText);

  //중복 제거
  tags = tags.filter((element, index) => {
    return tags.indexOf(element) === index;
  });

  makeListTemplate();
  makeFilterTemplate();
}

function clearFilter() {
  tags = [];
  filter_box.classList.remove('show');
  makeListTemplate();
}

function makeListTemplate() {
  let list_item = getData();
  const list = [];
  let template = '';

  if (tags.length !== 0) {
    list_item = compareFilterList(list_item);
  }

  for (let i = 0; i < list_item.length; i++) {
    template = `
      <li>
        <div class="job__info">
          <img src="${list_item[i].logo}" alt="" />
          <div>
            <div>
              <span class="job__name">${list_item[i].company}</span>
              ${list_item[i].new === true ? '<span class="note note--new">New!</span>' : ''}
              ${list_item[i].featured === true ? '<span class="note note--featured">Featured</span>' : ''}                            
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

    list.push(template);
  }

  job_list.innerHTML = list.join('');

  const btn_tags = document.querySelectorAll('.btn__tag');
  for (const btn_tag of btn_tags) {
    btn_tag.addEventListener('click', addFilter);
  }
}

function compareFilterList(list_item) {
  let temp = [];

  for (let i = 0; i < tags.length; i++) {
    if (i === 0) {
      job_list_item = list_item;
    }
    for (let j = 0; j < job_list_item.length; j++) {
      if (JSON.stringify(job_list_item[j]).includes(`${tags[i]}`)) {
        temp.push(job_list_item[j]);
      }
    }
    job_list_item = temp;
    temp = [];
  }

  return job_list_item;
}

makeListTemplate();

filter_clear.addEventListener('click', clearFilter);

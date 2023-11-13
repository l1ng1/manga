const api = 'https://api.remanga.org/api';

function notify(message, time) {
  const element = document.createElement('span');
  element.innerHTML = message;

  let container = document.querySelector('.notify-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notify-container';
    document.body.appendChild(container);
  }

  container.appendChild(element);
  element.onclick = () => {
    element.className = '';
    setTimeout(() => element.remove(), 200);
  };

  setTimeout(() => {
    element.className = '';
    setTimeout(() => element.remove(), 200);
  }, time - 200);

  setTimeout(() => {
    element.className = 'show';
  }, 100);
}

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function progress(done, max) {
  let progress = document.querySelector('.progress-container');
  let block = document.querySelector('.progress-container > div');
  let text = document.querySelector('.progress-container span');
  let bar = document.querySelector('.progress-container .bar');

  if (!progress) {
    progress = document.createElement('div');
    progress.className = 'progress-container';
    block = document.createElement('div');
    text = document.createElement('span');
    bar = document.createElement('div');
    bar.className = 'bar';

    progress.appendChild(block);
    block.appendChild(text);
    block.appendChild(bar);

    document.body.appendChild(progress);
  }

  text.innerText = `${done} из ${max}`;
  bar.style.width = `${(done / max) * 100}%`;

  if (done >= max) {
    document.body.removeChild(progress);
  }
}

function getCookie(name) {
  name = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1');
  const regex = new RegExp('(?:^|; )' + name + '=([^;]*)');
  const matches = document.cookie.match(regex);
  return matches ? decodeURIComponent(matches[1]) : null;
}

function getUserID() {
  const user = JSON.parse(getCookie('user'));
  const url_id = window.location.pathname
    .match(/\/(user\/\d+)/)?.[0]
    .match(/\d+/g)?.[0];
  return url_id || user?.id || 0;
}

function saveJsonFile(content, name) {
  const anchor = document.createElement('a');
  const json = JSON.stringify(content, null, 2);
  const file = new Blob([json], { type: 'application/json' });
  anchor.href = URL.createObjectURL(file);
  anchor.download = name;
  anchor.click();
}

function openJsonFile() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.addEventListener('change', (event) => {
      const reader = new FileReader();
      reader.onload = function ({ target }) {
        const result = JSON.parse(target.result);
        resolve(result);
      };
      reader.readAsText(event.target.files[0]);
    });
    input.accept = 'application/json';
    input.type = 'file';
    input.click();
  });
}

async function getBookmarkGroups(id, token) {
  const url = `${api}/users/${id}/user_bookmarks/`;
  const { msg, content } = await fetch(url, {
    headers: { authorization: token ? 'bearer ' + token : undefined },
  }).then((response) => response.json());

  if (msg !== '') {
    return [];
  }

  return content;
}

async function getBookmarks(id, token, params) {
  const url = `${api}/users/${id}/bookmarks/?${params.toString()}`;
  const { msg, content } = await fetch(url, {
    headers: { authorization: token ? 'bearer ' + token : undefined },
  }).then((response) => response.json());

  if (msg !== '') {
    return [];
  }

  return content;
}

async function exportBookmarks() {
  const count = 500;
  const bookmarks = [];
  const [id, token] = [getUserID(), getCookie('token')];

  if (!id) {
    return notify('Ошибка авторизации', 7500);
  }

  const groups = await getBookmarkGroups(id, token);
  const max = groups.reduce((i, value) => i + value.count, 0);
  progress(0, max);

  for (let index in groups) {
    const titles = [];
    const group = groups[index];

    for (let page = 1; page <= Math.ceil(group.count / count); page++) {
      const params = new URLSearchParams({ type: group.id, count, page });
      const content = await getBookmarks(id, token, params);
      titles.push(
        ...content.map((manga) => ({
          id: manga.title.id,
          name: manga.title.rus_name,
          read: manga.read_progress,
          url: `https://remanga.org/manga/${manga.title.dir}`,
        })),
      );

      const done = bookmarks.reduce((i, { titles }) => i + titles.length, 0);
      progress(done + titles.length, max);
      await timeout(500);
    }

    bookmarks[index] = { tab_id: group.id, tab_name: group.name, titles };
  }

  saveJsonFile(bookmarks, 'bookmarks.json');
  notify('Закладки экспортированы', 7500);
}

async function importBookmark(token, body) {
  const url = `${api}/users/bookmarks/`;
  const data = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      authorization: token ? 'bearer ' + token : undefined,
    },
  }).then((response) => response.json());

  return data;
}

async function importBookmarks() {
  let done = 0;
  const count = 500;
  const [id, token] = [getUserID(), getCookie('token')];

  if (!id || !token) {
    return notify('Ошибка авторизации', 7500);
  }

  const bookmarks = await openJsonFile();
  const groups = await getBookmarkGroups(id, token);
  const max = bookmarks.reduce((i, { titles }) => i + titles.length, 0);
  progress(0, max);

  for (const { tab_id, titles } of bookmarks) {
    const groupTitles = [];
    const group = groups.find(({ id }) => id == tab_id);

    if (!group || !titles.length) {
      continue;
    }

    for (let page = 1; page <= Math.ceil(group.count / count); page++) {
      const params = new URLSearchParams({ type: group.id, count, page });
      const content = await getBookmarks(id, token, params);
      groupTitles.push(...content.map((manga) => manga.title.id));
      await timeout(500);
    }

    for (const title of titles) {
      if (groupTitles.includes(title.id)) {
        progress(++done, max);
        await timeout(10);
      } else {
        try {
          const body = { title: title.id, type: tab_id };
          await importBookmark(token, body);
        } catch (error) {
          console.log(title, error);
        }
        progress(++done, max);
        await timeout(500);
      }
    }
  }

  notify('Закладки импортированы', 7500);
}

async function getTitle(dir, token) {
  const url = `${api}/titles/${dir}`;
  const { content } = await fetch(url, {
    headers: { authorization: 'bearer ' + token },
  }).then((response) => response.json());

  return content;
}

async function getChapters(branch, page = 1, token) {
  const params = new URLSearchParams({
    branch_id: branch,
    ordering: 'index',
    user_data: 1,
    count: 1000,
    page,
  });
  const url = `${api}/titles/chapters?` + params.toString();
  const { content } = await fetch(url, {
    headers: { authorization: 'bearer ' + token },
  }).then((response) => response.json());

  return content;
}

async function updateActivity(chapter, token) {
  if (!token) {
    return null;
  }

  const url = `${api}/activity/views/`;
  const data = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ chapter }),
    headers: {
      'content-type': 'application/json',
      authorization: 'bearer ' + token,
    },
  }).then((response) => response.json());

  return data;
}

async function watchChapters(noview) {
  const { pathname } = window.location;
  const [, path, manga] = pathname.split('/');

  if (path != 'manga' || !manga) {
    return notify('Манга не выбрана', 7500);
  }

  const [id, token] = [getUserID(), getCookie('token')];

  if (!id || !token) {
    return notify('Ошибка авторизации', 7500);
  }

  const { active_branch, branches } = await getTitle(manga, token);

  if (!active_branch) {
    return notify('Ветка перевода не выбрана', 7500);
  }

  const branch = branches.find(({ id }) => id == active_branch);
  progress(0, branch.count_chapters);

  for (let page = 1; page <= Math.ceil(branch.count_chapters / 1000); page++) {
    const chapters = await getChapters(branch.id, page, token);

    for (const chapter of chapters) {
      if (chapter.viewed || (chapter.is_paid && noview)) {
        progress(chapter.index, branch.count_chapters);
        continue;
      }

      await updateActivity(chapter.id, token);
      progress(chapter.index, branch.count_chapters);
    }
  }

  notify('Главы отмечены прочитанными', 7500);
}

chrome.runtime.onMessage.addListener(({ action, data }, sender, callback) => {
  if (sender.id === chrome.runtime.id) {
    switch (action) {
      case 'notify':
        notify(...data);
        break;
      case 'export':
        exportBookmarks();
        break;
      case 'import':
        importBookmarks();
        break;
      case 'watch':
        watchChapters(data);
        break;
      case 'activity':
        updateActivity(data, getCookie('token'));
        break;
      default:
        break;
    }
    callback(true);
  }
});

document.documentElement.dataset.eid = chrome.runtime.id;
console.log('ExManga service loaded', Date.now());
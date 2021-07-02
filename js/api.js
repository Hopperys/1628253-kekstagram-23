const request = (url, options) => fetch(url, {
  credentials: 'same-origin',
  ...options,
});

const getData = (onSuccess, onError) => request('https://23.javascript.pages.academy/kekstagram/data', { method: 'GET' })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => {
    onSuccess(json);
  })
  .catch((err) => {
    onError(err);
  });

const sendData = (onSuccess, onFail, body) => request('https://23.javascript.pages.academy/kekstagram', { method: 'POST', body })
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
  .catch(() => {
    onFail();
  });

export {getData, sendData};

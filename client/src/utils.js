export const parseJsonResponse = (res) => {
  return res.json().then((data) => {
    if (res.ok) {
      return data;
    }
    return Promise.reject(data);
  });
};
export const fetchGet = (url) => {
  return fetch(url).then(parseJsonResponse);
};

export const fetchPost = (url, data) => {
  return fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(parseJsonResponse);
};

export const fetchPut = (url, data) => {
  return fetch(url, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(parseJsonResponse);
};

export const fetchDelete = (url, data) => {
  return fetch(url, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(parseJsonResponse);
};

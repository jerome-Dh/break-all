"use strict";

const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
}

class BRequest {

  baseUrl = null;

  constructor() {
    this.init();
  }

  init = () => {
    const savedBaseUrl = localStorage.getItem('baseUrl');
    this.baseUrl = savedBaseUrl ? savedBaseUrl : DEFAULT_BASE_URL;
  }

  setAPIBaseUrl = () => {
    const url = "https://raw.githubusercontent.com/jerome-Dh/break-all/master/custom.json"
    this.doQuery(url, HTTP_METHOD.GET, null)
      .then(data => localStorage.setItem('baseUrl', data.url))
      .catch(err => console.error(err));
  }

  get = async () => this.doQuery(`${this.baseUrl}/players`, HTTP_METHOD.GET, null);

  post = async (id, body) => this.doQuery(`${this.baseUrl}/players?id=${id}`, HTTP_METHOD.POST, body);

  doQuery = async (url, method, body) => {

    return new Promise((resolve, reject) => {

      if(window.fetch) {
        let headers = {};
        if(method === HTTP_METHOD.POST || method === HTTP_METHOD.PUT) {
          headers = { 'Content-Type': 'application/json' };
        }

        fetch(url, { method, body, headers })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
      }
      else {
        const myRequest = new XMLHttpRequest();
        myRequest.onreadystatechange = function() {
          if(myRequest.readyState == XMLHttpRequest.DONE && myRequest.status === 200) {
            resolve(JSON.parse(myRequest.responseText));
          }
        };
        myRequest.open(method, url);
        myRequest.onerror = reject;
        if(method === HTTP_METHOD.POST || method === HTTP_METHOD.PUT) {
          myRequest.setRequestHeader('Content-Type', 'application/json');
        }
        myRequest.send(body);
      }
    });
  }
}

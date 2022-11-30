import { expect } from 'chai';
import { before, describe } from 'mocha';
import { Http } from './Http';

describe('тест модуля запросов к API', () => {
  const baseUrl = 'http://localhost:1234';

  before(() => {
    require('../../../tests/server/server');
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        expect(xhr.response).to.equal('{\n  "message": "Server is running"\n}');
      }
    };

    xhr.open('get', `${baseUrl}/mock`);
    xhr.send();
  });

  it('GET - should return 200ok', async () => {
    const http = new Http();

    const response = await http.get(`${baseUrl}/api/test/get`);

    expect(response).to.have.property('status').and.equal(200);
  });
});

import http from 'k6/http';
import { check, group } from 'k6';

const baseUrl = 'http://localhost:8080/login';

export const options = {
  vus: 50,
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 40 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    checks: [
      { threshold: 'rate>0.9', abortOnFail: true, delayAbortEval: '10s' },
    ],
    http_req_duration: ['p(90) < 400'],
  },
};

export default function () {
  group('Login Performance Testing', function () {
    group('create login', function () {
      const res = http.post(`${baseUrl}/`, {
        username: 'username',
        password: 'password'
      });
      check(res, {
        'is status code 201': (r) => r.status === 201,
      });
    });
  });
}
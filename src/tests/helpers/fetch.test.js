import '@testing-library/jest-dom';
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Test en fetch.js', () => {
   let token = '';

   test('Fn fetchWithoutToken debe funcionar', async () => {
      const user = { email: 'correo@correo.com', password: '123456' };

      const res = await fetchWithoutToken('auth', user, 'POST');
      expect(res instanceof Response).toBe(true);

      const body = await res.json();
      expect(body.ok).toBe(true);
      token = body.token;
   });

   test('Fn fetchWithToken debe funcionar', async () => {
      localStorage.setItem('token', token);

      const res = await fetchWithToken('events');
      const body = await res.json();
      expect(body.ok).toBe(true);
      expect(typeof body.events).toBe('object');
   });
});

import { USER_ID } from '../constants';

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(USER_ID)) {
    window.location.hash = '#/welcome';
  }
});

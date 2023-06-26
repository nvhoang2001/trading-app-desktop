import { store } from '@/store';

export function isLoggedIn() {
    console.log('Store: ', store, store.getState().user);

    return true;
}

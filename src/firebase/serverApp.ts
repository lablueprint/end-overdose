import 'server-only';

import { initializeServerApp } from 'firebase/app';
import { getCookie } from './cookies';
import { firebaseConfig } from './config';
import { getAuth } from 'firebase/auth';

export async function getAuthenticatedAppForUser() {
    // get the user token from the cookie
    const token = await getCookie('user-token');

    if (!token) {
        throw new Error('No user token found');
    }

    // initialize the firebase app with the user token
    const firebaseServerApp = initializeServerApp(
        firebaseConfig,
        token
            ? {
                  authIdToken: token.value,
              }
            : {}
    );

    // get the auth object
    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();

    if (!auth.currentUser) {
        throw new Error('No user found');
    }

    return { firebaseServerApp, currentUser: auth.currentUser };
}

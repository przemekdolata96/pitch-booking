import auth0 from 'auth0-js';
import history from "../history";
import { AUTH_CONFIG } from "../config";
import axios from 'axios';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientID,
        redirectUri: AUTH_CONFIG.redirectUri,
        audience: AUTH_CONFIG.audience,
        responseType: AUTH_CONFIG.responseType,
        scope: AUTH_CONFIG.scope,
    });
    
    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }

    getProfile() {
        return this.profile;
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/home');
                console.log(authResult)
                //this.profile = authResult;
                localStorage.setItem('id', authResult.idTokenPayload.sub);
                localStorage.setItem('name', authResult.idTokenPayload.name);
                axios.post('http://localhost:3001/api/user', {
                    id: authResult.idTokenPayload.sub,
                    name: authResult.idTokenPayload.name,
                });
            } else if (err) {
                history.replace('/home');
                console.log(err);
            }
        });
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        history.replace('/home');
    }

    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        // navigate to the home route
        history.replace('/home');
    }

    isAuthenticated() {
        // Check whether the current time is past the 
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
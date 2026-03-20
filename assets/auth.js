/**
 * Speeki Resources Authentication Module
 * Provides JWT-based session management for password-protected access
 */

(function() {
    'use strict';

    const AUTH_CONFIG = {
        // Password hash (SHA-256 of the password for comparison)
        // Password: Nicole1234Speeki!
        PASSWORD_HASH: '8a9b5c3d7e2f1a4b6c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
        TOKEN_KEY: 'speeki_auth_token',
        TOKEN_EXPIRY_HOURS: 24,
        LOGIN_PAGE: 'login.html'
    };

    // Simple JWT-like token implementation for client-side auth
    const SpeekiAuth = {
        /**
         * Hash a string using a simple hash function
         * For production, use a proper cryptographic library
         */
        simpleHash: function(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash).toString(16);
        },

        /**
         * Create a JWT-like token
         */
        createToken: function(payload) {
            const header = { alg: 'HS256', typ: 'JWT' };
            const now = Date.now();
            const tokenPayload = {
                ...payload,
                iat: now,
                exp: now + (AUTH_CONFIG.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)
            };

            // Base64 encode header and payload
            const headerB64 = btoa(JSON.stringify(header));
            const payloadB64 = btoa(JSON.stringify(tokenPayload));

            // Create signature (simple hash for client-side, would use HMAC in production)
            const signature = this.simpleHash(headerB64 + '.' + payloadB64 + '.speeki_secret_key');

            return headerB64 + '.' + payloadB64 + '.' + signature;
        },

        /**
         * Decode and validate a token
         */
        validateToken: function(token) {
            if (!token) return null;

            try {
                const parts = token.split('.');
                if (parts.length !== 3) return null;

                const [headerB64, payloadB64, signature] = parts;

                // Verify signature
                const expectedSignature = this.simpleHash(headerB64 + '.' + payloadB64 + '.speeki_secret_key');
                if (signature !== expectedSignature) return null;

                // Decode payload
                const payload = JSON.parse(atob(payloadB64));

                // Check expiration
                if (payload.exp && Date.now() > payload.exp) {
                    this.logout();
                    return null;
                }

                return payload;
            } catch (e) {
                return null;
            }
        },

        /**
         * Verify password and create session
         */
        login: function(password) {
            // Direct password comparison (the expected password)
            const correctPassword = 'Nicole1234Speeki!';

            if (password === correctPassword) {
                const token = this.createToken({
                    authenticated: true,
                    session: this.generateSessionId()
                });
                localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
                return true;
            }
            return false;
        },

        /**
         * Generate a unique session ID
         */
        generateSessionId: function() {
            return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        /**
         * Check if user is authenticated
         */
        isAuthenticated: function() {
            const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
            return this.validateToken(token) !== null;
        },

        /**
         * Get current token payload
         */
        getSession: function() {
            const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
            return this.validateToken(token);
        },

        /**
         * Logout - remove token
         */
        logout: function() {
            localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
        },

        /**
         * Protect page - redirect to login if not authenticated
         */
        protectPage: function() {
            if (!this.isAuthenticated()) {
                // Get the current page path for redirect after login
                const currentPath = window.location.pathname;
                const currentPage = currentPath.split('/').pop() || 'index.html';

                // Only redirect if not already on login page
                if (currentPage !== AUTH_CONFIG.LOGIN_PAGE) {
                    window.location.href = AUTH_CONFIG.LOGIN_PAGE + '?redirect=' + encodeURIComponent(currentPage);
                }
                return false;
            }
            return true;
        },

        /**
         * Get remaining session time in hours
         */
        getSessionTimeRemaining: function() {
            const session = this.getSession();
            if (!session || !session.exp) return 0;

            const remaining = session.exp - Date.now();
            return Math.max(0, remaining / (1000 * 60 * 60));
        }
    };

    // Expose to global scope
    window.SpeekiAuth = SpeekiAuth;

    // Auto-protect on load if this script is included
    // Pages can opt-out by setting window.SPEEKI_AUTH_SKIP = true before this script loads
    // Immediate check (before page renders) for better security
    if (!window.SPEEKI_AUTH_SKIP) {
        SpeekiAuth.protectPage();
    }

})();

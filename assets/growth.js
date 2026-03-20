/**
 * Speeki Growth Engine
 * Lead capture, analytics tracking, social sharing, and engagement features
 */

(function() {
    'use strict';

    // Configuration
    const GROWTH_CONFIG = {
        storagePrefix: 'speeki_',
        leadCaptureDelay: 30000, // Show lead capture after 30 seconds (disabled - see initLeadCapture)
        progressMilestones: [25, 50, 75, 100], // Percentages to celebrate
        shareMessage: 'I\'m using this great compliance checklist from Speeki. Check it out!',
        exitIntentCooldown: 60000, // Minimum 60 seconds between exit intent triggers
        exitIntentThreshold: 50, // Mouse must go above 50px from top to trigger
    };

    // Growth Engine Module
    window.SpeekiGrowth = {

        // Initialize all growth features
        init: function() {
            this.initLeadCapture();
            this.initAnalytics();
            this.initSocialSharing();
            this.initProgressMilestones();
            this.initExitIntent();
            this.initScrollDepth();
        },

        // ==========================================
        // LEAD CAPTURE
        // ==========================================

        initLeadCapture: function() {
            // Don't show if already captured
            if (this.hasSubmittedEmail()) return;

            // Create lead capture modal
            this.createLeadCaptureModal();

            // DISABLED: Time-based popup was triggering too often and annoying users
            // Only show popup on genuine exit intent (leaving the page)
            // The exit intent handler in initExitIntent() will show the modal
        },

        createLeadCaptureModal: function() {
            if (document.getElementById('speeki-lead-modal')) return;

            const modal = document.createElement('div');
            modal.id = 'speeki-lead-modal';
            modal.className = 'speeki-modal';
            modal.innerHTML = `
                <div class="speeki-modal-overlay"></div>
                <div class="speeki-modal-content">
                    <button class="speeki-modal-close" aria-label="Close">&times;</button>
                    <div class="speeki-modal-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00FF7F" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                    </div>
                    <h3>Get This Compliance Checklist</h3>
                    <p>Enter your email to receive a copy of this checklist guide and related compliance resources.</p>
                    <form id="speeki-lead-form">
                        <input type="email" id="speeki-email" placeholder="your@email.com" required>
                        <button type="submit">Send Me the Checklist</button>
                    </form>
                    <p class="speeki-privacy">We respect your privacy. Unsubscribe anytime.</p>
                </div>
            `;
            document.body.appendChild(modal);

            // Event listeners
            modal.querySelector('.speeki-modal-close').addEventListener('click', () => this.hideLeadCaptureModal());
            modal.querySelector('.speeki-modal-overlay').addEventListener('click', () => this.hideLeadCaptureModal());
            modal.querySelector('#speeki-lead-form').addEventListener('submit', (e) => this.handleLeadSubmit(e));
        },

        showLeadCaptureModal: function(trigger) {
            if (this.hasSubmittedEmail()) return;

            const modal = document.getElementById('speeki-lead-modal');
            if (modal) {
                modal.classList.add('active');
                this.trackEvent('lead_modal_shown', { trigger });
            }
        },

        hideLeadCaptureModal: function() {
            const modal = document.getElementById('speeki-lead-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        },

        handleLeadSubmit: function(e) {
            e.preventDefault();
            const email = document.getElementById('speeki-email').value;

            // Store email (in production, this would POST to your backend)
            localStorage.setItem(GROWTH_CONFIG.storagePrefix + 'email', email);
            localStorage.setItem(GROWTH_CONFIG.storagePrefix + 'email_captured_at', new Date().toISOString());

            this.trackEvent('lead_captured', {
                email_domain: email.split('@')[1],
                page: window.location.pathname
            });

            // Show success state
            const modalContent = document.querySelector('.speeki-modal-content');
            modalContent.innerHTML = `
                <div class="speeki-modal-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00FF7F" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Check your inbox for the compliance checklist and resources.</p>
                <button class="speeki-modal-cta" onclick="SpeekiGrowth.hideLeadCaptureModal()">Continue Checklist</button>
            `;

            // Auto-hide after 3 seconds
            setTimeout(() => this.hideLeadCaptureModal(), 3000);
        },

        hasSubmittedEmail: function() {
            return !!localStorage.getItem(GROWTH_CONFIG.storagePrefix + 'email');
        },

        // ==========================================
        // ANALYTICS TRACKING
        // ==========================================

        initAnalytics: function() {
            // Track page view
            this.trackEvent('page_view', {
                page: window.location.pathname,
                title: document.title,
                referrer: document.referrer
            });

            // Track checklist interactions
            document.querySelectorAll('.checklist-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    this.trackEvent('checkbox_changed', {
                        item_id: e.target.id,
                        checked: e.target.checked,
                        page: window.location.pathname
                    });
                });
            });

            // Track CTA clicks
            document.querySelectorAll('.cta-button, .cta-section a').forEach(cta => {
                cta.addEventListener('click', (e) => {
                    this.trackEvent('cta_clicked', {
                        text: e.target.textContent,
                        href: e.target.href,
                        page: window.location.pathname
                    });
                });
            });

            // Track export button clicks
            const exportBtn = document.querySelector('.btn-export');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    this.trackEvent('export_clicked', {
                        page: window.location.pathname,
                        progress: this.getCurrentProgress()
                    });
                });
            }
        },

        trackEvent: function(eventName, properties) {
            // Console log for development
            console.log('[Speeki Analytics]', eventName, properties);

            // Store locally for debugging
            const events = JSON.parse(localStorage.getItem(GROWTH_CONFIG.storagePrefix + 'events') || '[]');
            events.push({
                event: eventName,
                properties: properties,
                timestamp: new Date().toISOString()
            });
            // Keep only last 100 events
            if (events.length > 100) events.shift();
            localStorage.setItem(GROWTH_CONFIG.storagePrefix + 'events', JSON.stringify(events));

            // In production, send to analytics service:
            // gtag('event', eventName, properties);
            // mixpanel.track(eventName, properties);
            // posthog.capture(eventName, properties);
        },

        getCurrentProgress: function() {
            const total = document.querySelectorAll('.checklist-checkbox').length;
            const checked = document.querySelectorAll('.checklist-checkbox:checked').length;
            return total > 0 ? Math.round((checked / total) * 100) : 0;
        },

        // ==========================================
        // SOCIAL SHARING
        // ==========================================

        initSocialSharing: function() {
            this.createShareBar();
        },

        createShareBar: function() {
            // Don't add if already exists
            if (document.getElementById('speeki-share-bar')) return;

            const shareBar = document.createElement('div');
            shareBar.id = 'speeki-share-bar';
            shareBar.innerHTML = `
                <span class="share-label">Share this checklist:</span>
                <div class="share-buttons">
                    <button class="share-btn share-linkedin" title="Share on LinkedIn" aria-label="Share on LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-twitter" title="Share on X" aria-label="Share on X">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-email" title="Share via Email" aria-label="Share via Email">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </button>
                    <button class="share-btn share-copy" title="Copy Link" aria-label="Copy Link">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                </div>
            `;

            // Insert after header
            const header = document.querySelector('header');
            if (header) {
                header.parentNode.insertBefore(shareBar, header.nextSibling);
            }

            // Add event listeners
            shareBar.querySelector('.share-linkedin').addEventListener('click', () => this.shareLinkedIn());
            shareBar.querySelector('.share-twitter').addEventListener('click', () => this.shareTwitter());
            shareBar.querySelector('.share-email').addEventListener('click', () => this.shareEmail());
            shareBar.querySelector('.share-copy').addEventListener('click', () => this.copyLink());
        },

        shareLinkedIn: function() {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
            this.trackEvent('share_clicked', { platform: 'linkedin' });
        },

        shareTwitter: function() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(GROWTH_CONFIG.shareMessage);
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
            this.trackEvent('share_clicked', { platform: 'twitter' });
        },

        shareEmail: function() {
            const subject = encodeURIComponent(document.title);
            const body = encodeURIComponent(`${GROWTH_CONFIG.shareMessage}\n\n${window.location.href}`);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
            this.trackEvent('share_clicked', { platform: 'email' });
        },

        copyLink: function() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const copyBtn = document.querySelector('.share-copy');
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FF7F" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
            });
            this.trackEvent('share_clicked', { platform: 'copy_link' });
        },

        // ==========================================
        // PROGRESS MILESTONES & GAMIFICATION
        // ==========================================

        initProgressMilestones: function() {
            this.lastMilestone = 0;

            // Monitor checkbox changes
            document.querySelectorAll('.checklist-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', () => this.checkMilestone());
            });
        },

        checkMilestone: function() {
            const progress = this.getCurrentProgress();

            for (const milestone of GROWTH_CONFIG.progressMilestones) {
                if (progress >= milestone && this.lastMilestone < milestone) {
                    this.celebrateMilestone(milestone);
                    this.lastMilestone = milestone;
                    break;
                }
            }
        },

        celebrateMilestone: function(milestone) {
            this.trackEvent('milestone_reached', { milestone });

            // Create celebration toast
            const toast = document.createElement('div');
            toast.className = 'speeki-toast';

            let message = '';
            if (milestone === 25) message = 'Great start! You\'re 25% through the checklist.';
            else if (milestone === 50) message = 'Halfway there! Keep up the momentum.';
            else if (milestone === 75) message = 'Almost done! Just a few more items to go.';
            else if (milestone === 100) message = 'Congratulations! You\'ve completed the entire checklist!';

            toast.innerHTML = `
                <div class="toast-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FF7F" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div class="toast-content">
                    <strong>${milestone}% Complete</strong>
                    <p>${message}</p>
                </div>
            `;

            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 4000);

            // At 100%, offer lead capture if not already captured
            // Only show if exit intent modal hasn't been shown (avoid double popups)
            if (milestone === 100 && !this.hasSubmittedEmail()) {
                if (!this.exitIntentState || !this.exitIntentState.hasShownOnce) {
                    setTimeout(() => {
                        this.showLeadCaptureModal('completion');
                        // Mark as shown to prevent exit intent from showing later
                        if (this.exitIntentState) {
                            this.exitIntentState.hasShownOnce = true;
                        }
                    }, 1500);
                }
            }
        },

        // ==========================================
        // EXIT INTENT
        // ==========================================

        initExitIntent: function() {
            if (this.hasSubmittedEmail()) return;

            // Track state for smarter exit intent detection
            this.exitIntentState = {
                lastTriggerTime: 0,
                hasShownOnce: false,
                isUserActive: true,
                lastActivityTime: Date.now()
            };

            // Track user activity - if user is actively working, don't show popup
            const activityEvents = ['click', 'keydown', 'scroll', 'touchstart'];
            activityEvents.forEach(event => {
                document.addEventListener(event, () => {
                    this.exitIntentState.isUserActive = true;
                    this.exitIntentState.lastActivityTime = Date.now();
                }, { passive: true });
            });

            // Only trigger exit intent when mouse leaves the document toward the top
            // This detects when user moves mouse toward browser chrome (close button, address bar, tabs)
            document.addEventListener('mouseleave', (e) => {
                // Only trigger if mouse is leaving toward the top of the viewport
                if (e.clientY > GROWTH_CONFIG.exitIntentThreshold) return;

                // Don't trigger if already shown once this session
                if (this.exitIntentState.hasShownOnce) return;

                // Don't trigger within cooldown period
                const now = Date.now();
                if (now - this.exitIntentState.lastTriggerTime < GROWTH_CONFIG.exitIntentCooldown) return;

                // Don't trigger if user was active in the last 2 seconds (likely just moving mouse naturally)
                if (now - this.exitIntentState.lastActivityTime < 2000) return;

                // Don't interrupt users who are actively filling the checklist
                // Only show exit intent if they have 0 progress (browsing/deciding)
                // or 100% progress (finished and might be leaving)
                const progress = this.getCurrentProgress();
                if (progress > 0 && progress < 100) {
                    // User is in the middle of working - don't interrupt them
                    return;
                }

                // All checks passed - user is likely leaving
                this.exitIntentState.lastTriggerTime = now;
                this.exitIntentState.hasShownOnce = true;
                this.showLeadCaptureModal('exit_intent');
            });

            // Also show on actual page leave if user hasn't seen modal yet
            window.addEventListener('beforeunload', () => {
                // Note: We can't show a modal on beforeunload, but we can log the intent
                // The modal should have been shown via mouseleave before this
                if (!this.exitIntentState.hasShownOnce && !this.hasSubmittedEmail()) {
                    this.trackEvent('exit_without_modal', { reason: 'fast_exit' });
                }
            });
        },

        // ==========================================
        // SCROLL DEPTH TRACKING
        // ==========================================

        initScrollDepth: function() {
            const depths = [25, 50, 75, 100];
            const tracked = new Set();

            window.addEventListener('scroll', () => {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );

                for (const depth of depths) {
                    if (scrollPercent >= depth && !tracked.has(depth)) {
                        tracked.add(depth);
                        this.trackEvent('scroll_depth', { depth });
                    }
                }
            });
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SpeekiGrowth.init());
    } else {
        SpeekiGrowth.init();
    }

})();

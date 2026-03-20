/**
 * Speeki Advanced Growth Engine
 * Viral loops, lead scoring, personalization, conversion funnels, and A/B testing
 *
 * This extends the base growth.js with advanced growth marketing features
 */

(function() {
    'use strict';

    // Advanced Configuration
    const ADVANCED_CONFIG = {
        // Viral Loop Settings
        viralReferralKey: 'speeki_referral_',
        referralReward: 'Get 3 months free when you refer a colleague',

        // Lead Scoring Weights
        leadScoring: {
            emailCapture: 20,
            checklistComplete: 25,
            shareAction: 15,
            exportAction: 20,
            timeOnSite: 10,      // 1 point per minute
            pageViews: 5,         // per page
            ctaClick: 10,
            returnVisit: 15
        },

        // A/B Testing
        abTests: {
            enabled: true,
            tests: {
                'cta_text': {
                    variants: ['Get Free Access', 'Download Now', 'Start Free Trial'],
                    metric: 'cta_conversion'
                },
                'modal_timing': {
                    variants: [20000, 30000, 45000], // milliseconds
                    metric: 'modal_conversion'
                },
                'value_proposition': {
                    variants: [
                        'Save 40+ hours on compliance',
                        'Join 500+ companies using Speeki',
                        'Get compliance-ready in 30 days'
                    ],
                    metric: 'hero_conversion'
                }
            }
        },

        // Retargeting Pixels
        pixels: {
            facebook: '', // Add your FB Pixel ID
            linkedin: '', // Add your LinkedIn Insight Tag
            google: ''    // Add your Google Analytics 4 ID
        }
    };

    // Advanced Growth Module
    window.SpeekiAdvancedGrowth = {

        // ==========================================
        // VIRAL LOOP & REFERRAL SYSTEM
        // ==========================================

        initViralLoop: function() {
            // Check for referral parameter in URL
            const urlParams = new URLSearchParams(window.location.search);
            const referralCode = urlParams.get('ref');

            if (referralCode) {
                this.trackReferral(referralCode);
            }

            // Generate unique referral code for this user
            this.generateReferralCode();

            // Add referral incentive to share messages
            this.enhanceShareButtons();
        },

        trackReferral: function(referralCode) {
            // Store referral source
            localStorage.setItem(ADVANCED_CONFIG.viralReferralKey + 'source', referralCode);
            localStorage.setItem(ADVANCED_CONFIG.viralReferralKey + 'timestamp', new Date().toISOString());

            // Track referral arrival
            this.trackEvent('referral_arrived', {
                referral_code: referralCode,
                page: window.location.pathname
            });

            // Show referral acknowledgment
            this.showReferralWelcome();
        },

        generateReferralCode: function() {
            let code = localStorage.getItem(ADVANCED_CONFIG.viralReferralKey + 'code');

            if (!code) {
                // Generate unique code (base64 of timestamp + random)
                code = btoa(Date.now() + Math.random().toString()).substring(0, 8).toUpperCase();
                localStorage.setItem(ADVANCED_CONFIG.viralReferralKey + 'code', code);
            }

            return code;
        },

        getReferralLink: function() {
            const code = this.generateReferralCode();
            const baseUrl = window.location.origin + window.location.pathname;
            return `${baseUrl}?ref=${code}`;
        },

        enhanceShareButtons: function() {
            // Add referral link to all share actions
            const referralLink = this.getReferralLink();

            // Update share functionality to use referral link
            if (window.SpeekiGrowth) {
                const originalShareLinkedIn = window.SpeekiGrowth.shareLinkedIn;
                window.SpeekiGrowth.shareLinkedIn = () => {
                    const url = encodeURIComponent(referralLink);
                    const title = encodeURIComponent(document.title);
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
                    this.trackEvent('referral_share', { platform: 'linkedin' });
                };

                const originalShareTwitter = window.SpeekiGrowth.shareTwitter;
                window.SpeekiGrowth.shareTwitter = () => {
                    const url = encodeURIComponent(referralLink);
                    const text = encodeURIComponent('Check out this compliance checklist from @Speeki');
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
                    this.trackEvent('referral_share', { platform: 'twitter' });
                };
            }
        },

        showReferralWelcome: function() {
            const toast = document.createElement('div');
            toast.className = 'speeki-toast';
            toast.innerHTML = `
                <div class="toast-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FF7F" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                </div>
                <div class="toast-content">
                    <strong>Welcome!</strong>
                    <p>A colleague recommended this checklist to you.</p>
                </div>
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 5000);
        },

        // ==========================================
        // LEAD SCORING SYSTEM
        // ==========================================

        initLeadScoring: function() {
            this.startSessionTracking();
            this.trackEngagementEvents();
        },

        calculateLeadScore: function() {
            const scoring = ADVANCED_CONFIG.leadScoring;
            let score = 0;

            // Email captured
            if (localStorage.getItem('speeki_email')) {
                score += scoring.emailCapture;
            }

            // Checklist completion
            const progress = this.getCurrentProgress();
            if (progress === 100) {
                score += scoring.checklistComplete;
            } else if (progress >= 75) {
                score += scoring.checklistComplete * 0.7;
            } else if (progress >= 50) {
                score += scoring.checklistComplete * 0.4;
            }

            // Share actions
            const shareCount = parseInt(localStorage.getItem('speeki_share_count') || '0');
            score += Math.min(shareCount * scoring.shareAction, scoring.shareAction * 3);

            // Export actions
            const exportCount = parseInt(localStorage.getItem('speeki_export_count') || '0');
            score += Math.min(exportCount * scoring.exportAction, scoring.exportAction * 2);

            // Time on site (stored in minutes)
            const timeOnSite = parseInt(localStorage.getItem('speeki_time_on_site') || '0');
            score += Math.min(timeOnSite * (scoring.timeOnSite / 60), scoring.timeOnSite * 10);

            // Page views
            const pageViews = parseInt(localStorage.getItem('speeki_page_views') || '0');
            score += Math.min(pageViews * scoring.pageViews, scoring.pageViews * 10);

            // CTA clicks
            const ctaClicks = parseInt(localStorage.getItem('speeki_cta_clicks') || '0');
            score += Math.min(ctaClicks * scoring.ctaClick, scoring.ctaClick * 3);

            // Return visits
            const returnVisits = parseInt(localStorage.getItem('speeki_return_visits') || '0');
            if (returnVisits > 0) {
                score += scoring.returnVisit;
            }

            return Math.round(score);
        },

        getLeadQuality: function(score) {
            if (score >= 80) return 'hot';
            if (score >= 50) return 'warm';
            if (score >= 25) return 'cold';
            return 'unqualified';
        },

        startSessionTracking: function() {
            // Track session start time
            const sessionStart = Date.now();

            // Update time on site every 30 seconds
            const timeTracker = setInterval(() => {
                const timeOnSite = Math.floor((Date.now() - sessionStart) / 1000); // seconds
                localStorage.setItem('speeki_time_on_site', timeOnSite.toString());
            }, 30000);

            // Track when user leaves
            window.addEventListener('beforeunload', () => {
                clearInterval(timeTracker);
                const finalTime = Math.floor((Date.now() - sessionStart) / 1000);
                localStorage.setItem('speeki_time_on_site', finalTime.toString());
            });

            // Track page views
            const pageViews = parseInt(localStorage.getItem('speeki_page_views') || '0');
            localStorage.setItem('speeki_page_views', (pageViews + 1).toString());

            // Track return visits
            const lastVisit = localStorage.getItem('speeki_last_visit');
            if (lastVisit) {
                const daysSince = (Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24);
                if (daysSince >= 1) {
                    const returnVisits = parseInt(localStorage.getItem('speeki_return_visits') || '0');
                    localStorage.setItem('speeki_return_visits', (returnVisits + 1).toString());
                }
            }
            localStorage.setItem('speeki_last_visit', new Date().toISOString());
        },

        trackEngagementEvents: function() {
            // Track share clicks
            document.addEventListener('click', (e) => {
                if (e.target.closest('.share-btn')) {
                    const shareCount = parseInt(localStorage.getItem('speeki_share_count') || '0');
                    localStorage.setItem('speeki_share_count', (shareCount + 1).toString());
                }

                if (e.target.closest('.btn-export')) {
                    const exportCount = parseInt(localStorage.getItem('speeki_export_count') || '0');
                    localStorage.setItem('speeki_export_count', (exportCount + 1).toString());
                }

                if (e.target.closest('.cta-button, .cta-section a')) {
                    const ctaClicks = parseInt(localStorage.getItem('speeki_cta_clicks') || '0');
                    localStorage.setItem('speeki_cta_clicks', (ctaClicks + 1).toString());
                }
            });
        },

        // ==========================================
        // PERSONALIZATION ENGINE
        // ==========================================

        initPersonalization: function() {
            const leadScore = this.calculateLeadScore();
            const leadQuality = this.getLeadQuality(leadScore);
            const behavior = this.getUserBehaviorProfile();

            // Personalize CTAs based on behavior
            this.personalizeCTAs(leadQuality, behavior);

            // Show personalized recommendations
            this.showPersonalizedContent(behavior);
        },

        getUserBehaviorProfile: function() {
            const pageViews = parseInt(localStorage.getItem('speeki_page_views') || '0');
            const shareCount = parseInt(localStorage.getItem('speeki_share_count') || '0');
            const exportCount = parseInt(localStorage.getItem('speeki_export_count') || '0');
            const progress = this.getCurrentProgress();

            // Classify user type
            if (progress > 75 && exportCount > 0) {
                return 'power_user';
            } else if (shareCount > 1) {
                return 'advocate';
            } else if (pageViews > 5) {
                return 'researcher';
            } else if (progress > 25) {
                return 'engaged';
            }
            return 'new_visitor';
        },

        personalizeCTAs: function(leadQuality, behavior) {
            const ctaElements = document.querySelectorAll('.cta-button');

            ctaElements.forEach(cta => {
                // Personalize CTA text based on user profile
                switch(behavior) {
                    case 'power_user':
                        cta.textContent = 'UPGRADE TO SPEEKI PLATFORM';
                        break;
                    case 'advocate':
                        cta.textContent = 'SHARE WITH YOUR TEAM';
                        break;
                    case 'researcher':
                        cta.textContent = 'BOOK A DEMO';
                        break;
                    case 'engaged':
                        cta.textContent = 'START FREE TRIAL';
                        break;
                    default:
                        cta.textContent = 'EXPLORE SPEEKI PLATFORM';
                }
            });
        },

        showPersonalizedContent: function(behavior) {
            // Add personalized messaging to hero section
            const heroSection = document.querySelector('header .subtitle');
            if (heroSection && behavior === 'power_user') {
                const powerUserMessage = document.createElement('div');
                powerUserMessage.className = 'personalized-message';
                powerUserMessage.style.cssText = 'margin-top: 24px; padding: 20px; background: #f0fdf4; border-left: 4px solid #00FF7F; border-radius: 8px;';
                powerUserMessage.innerHTML = `
                    <strong style="color: #166534; font-size: 16px;">📊 We noticed you're making great progress!</strong>
                    <p style="margin: 8px 0 0; color: #166534; font-size: 14px;">
                        Ready to automate your compliance workflow? Speeki Platform can help you scale this across your entire organization.
                    </p>
                `;
                heroSection.parentNode.insertBefore(powerUserMessage, heroSection.nextSibling);
            }
        },

        // ==========================================
        // CONVERSION FUNNEL TRACKING
        // ==========================================

        initFunnelTracking: function() {
            const funnel = {
                stages: ['landing', 'engagement', 'lead_capture', 'conversion'],
                currentStage: this.getCurrentFunnelStage()
            };

            this.trackFunnelProgress(funnel);
        },

        getCurrentFunnelStage: function() {
            if (localStorage.getItem('speeki_converted')) {
                return 'conversion';
            } else if (localStorage.getItem('speeki_email')) {
                return 'lead_capture';
            } else if (this.getCurrentProgress() > 0) {
                return 'engagement';
            }
            return 'landing';
        },

        trackFunnelProgress: function(funnel) {
            const funnelData = JSON.parse(localStorage.getItem('speeki_funnel') || '{}');

            if (!funnelData[funnel.currentStage]) {
                funnelData[funnel.currentStage] = {
                    reached_at: new Date().toISOString(),
                    page: window.location.pathname
                };
                localStorage.setItem('speeki_funnel', JSON.stringify(funnelData));

                this.trackEvent('funnel_stage_reached', {
                    stage: funnel.currentStage,
                    time_to_stage: this.calculateTimeToStage(funnelData)
                });
            }
        },

        calculateTimeToStage: function(funnelData) {
            const stages = Object.keys(funnelData).sort((a, b) =>
                new Date(funnelData[a].reached_at) - new Date(funnelData[b].reached_at)
            );

            if (stages.length < 2) return 0;

            const firstStage = new Date(funnelData[stages[0]].reached_at);
            const latestStage = new Date(funnelData[stages[stages.length - 1]].reached_at);

            return Math.floor((latestStage - firstStage) / 1000 / 60); // minutes
        },

        // ==========================================
        // A/B TESTING FRAMEWORK
        // ==========================================

        initABTesting: function() {
            if (!ADVANCED_CONFIG.abTests.enabled) return;

            const tests = ADVANCED_CONFIG.abTests.tests;

            Object.keys(tests).forEach(testName => {
                this.assignVariant(testName, tests[testName]);
            });
        },

        assignVariant: function(testName, test) {
            const storageKey = `speeki_ab_${testName}`;
            let variant = localStorage.getItem(storageKey);

            if (!variant) {
                // Randomly assign variant
                const variantIndex = Math.floor(Math.random() * test.variants.length);
                variant = test.variants[variantIndex];
                localStorage.setItem(storageKey, JSON.stringify({
                    variant,
                    assigned_at: new Date().toISOString()
                }));

                this.trackEvent('ab_test_assigned', {
                    test_name: testName,
                    variant
                });
            } else {
                variant = JSON.parse(variant).variant;
            }

            // Apply variant
            this.applyVariant(testName, variant);
        },

        applyVariant: function(testName, variant) {
            switch(testName) {
                case 'cta_text':
                    document.querySelectorAll('.cta-button').forEach(btn => {
                        btn.textContent = variant;
                    });
                    break;

                case 'modal_timing':
                    if (window.SpeekiGrowth) {
                        // Override modal timing
                        window.SpeekiGrowth.leadCaptureDelay = variant;
                    }
                    break;

                case 'value_proposition':
                    const heroForm = document.querySelector('.hero-cta-content h3');
                    if (heroForm) {
                        heroForm.textContent = variant;
                    }
                    break;
            }
        },

        trackConversion: function(testName, metric) {
            const storageKey = `speeki_ab_${testName}`;
            const variantData = JSON.parse(localStorage.getItem(storageKey) || '{}');

            if (variantData.variant) {
                this.trackEvent('ab_test_conversion', {
                    test_name: testName,
                    variant: variantData.variant,
                    metric
                });
            }
        },

        // ==========================================
        // RETARGETING PIXELS
        // ==========================================

        initRetargetingPixels: function() {
            // Facebook Pixel
            if (ADVANCED_CONFIG.pixels.facebook) {
                this.loadFacebookPixel(ADVANCED_CONFIG.pixels.facebook);
            }

            // LinkedIn Insight Tag
            if (ADVANCED_CONFIG.pixels.linkedin) {
                this.loadLinkedInPixel(ADVANCED_CONFIG.pixels.linkedin);
            }

            // Google Analytics 4
            if (ADVANCED_CONFIG.pixels.google) {
                this.loadGoogleAnalytics(ADVANCED_CONFIG.pixels.google);
            }
        },

        loadFacebookPixel: function(pixelId) {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', pixelId);
            fbq('track', 'PageView');
        },

        loadLinkedInPixel: function(partnerId) {
            _linkedin_partner_id = partnerId;
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);

            (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
            })(window.lintrk);
        },

        loadGoogleAnalytics: function(measurementId) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', measurementId);
            window.gtag = gtag;
        },

        // ==========================================
        // UTILITY FUNCTIONS
        // ==========================================

        getCurrentProgress: function() {
            if (window.SpeekiGrowth) {
                return window.SpeekiGrowth.getCurrentProgress();
            }
            const total = document.querySelectorAll('.checklist-checkbox').length;
            const checked = document.querySelectorAll('.checklist-checkbox:checked').length;
            return total > 0 ? Math.round((checked / total) * 100) : 0;
        },

        trackEvent: function(eventName, properties) {
            if (window.SpeekiGrowth) {
                window.SpeekiGrowth.trackEvent(eventName, properties);
            }

            // Also send to retargeting pixels if available
            if (window.fbq) {
                fbq('trackCustom', eventName, properties);
            }
            if (window.gtag) {
                gtag('event', eventName, properties);
            }
        },

        // ==========================================
        // ENGAGEMENT CALCULATOR
        // ==========================================

        createComplianceCalculator: function() {
            // Create an interactive calculator that provides immediate value
            const calculator = document.createElement('div');
            calculator.id = 'compliance-calculator';
            calculator.className = 'speeki-inline-cta';
            calculator.style.cssText = 'margin: 60px auto; max-width: 800px;';
            calculator.innerHTML = `
                <div style="width: 100%;">
                    <h4 style="color: #ffffff; font-size: 24px; margin-bottom: 24px; text-align: center;">
                        💰 Calculate Your Compliance Cost Savings
                    </h4>
                    <div style="background: rgba(255,255,255,0.1); padding: 24px; border-radius: 8px;">
                        <label style="color: rgba(255,255,255,0.9); font-size: 14px; display: block; margin-bottom: 8px;">
                            How many hours per month does your team spend on manual compliance tasks?
                        </label>
                        <input type="number" id="hours-input"
                            style="width: 100%; padding: 12px; border-radius: 6px; border: none; font-size: 16px; margin-bottom: 16px;"
                            placeholder="e.g., 40" min="1" max="1000">

                        <button id="calculate-btn"
                            style="width: 100%; padding: 16px; background: #00FF7F; color: #0a1f44; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                            Calculate Savings
                        </button>

                        <div id="calculator-result" style="margin-top: 24px; padding: 20px; background: rgba(0,255,127,0.1); border-radius: 6px; display: none;">
                            <div style="color: #00FF7F; font-size: 32px; font-weight: 700; margin-bottom: 8px;" id="savings-amount"></div>
                            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;" id="savings-description"></p>
                        </div>
                    </div>
                </div>
            `;

            // Insert after first checklist section
            const firstSection = document.querySelector('.checklist-section');
            if (firstSection) {
                firstSection.parentNode.insertBefore(calculator, firstSection.nextSibling);

                // Add calculator logic
                document.getElementById('calculate-btn').addEventListener('click', () => {
                    const hours = parseInt(document.getElementById('hours-input').value);
                    if (hours > 0) {
                        const monthlySavings = Math.round(hours * 75 * 0.6); // Assuming $75/hour, 60% time savings
                        const annualSavings = monthlySavings * 12;

                        document.getElementById('savings-amount').textContent = `$${annualSavings.toLocaleString()}/year`;
                        document.getElementById('savings-description').textContent =
                            `By automating ${hours} hours/month, you could save approximately $${monthlySavings.toLocaleString()} per month. That's ${Math.round(hours * 0.6)} hours back to focus on strategic work.`;

                        document.getElementById('calculator-result').style.display = 'block';

                        this.trackEvent('calculator_used', {
                            hours_input: hours,
                            savings_shown: annualSavings
                        });

                        // Increase lead score
                        const calculatorUses = parseInt(localStorage.getItem('speeki_calculator_uses') || '0');
                        localStorage.setItem('speeki_calculator_uses', (calculatorUses + 1).toString());
                    }
                });
            }
        },

        // ==========================================
        // INITIALIZE ALL ADVANCED FEATURES
        // ==========================================

        init: function() {
            this.initViralLoop();
            this.initLeadScoring();
            this.initPersonalization();
            this.initFunnelTracking();
            this.initABTesting();
            this.initRetargetingPixels();
            this.createComplianceCalculator();

            // Log lead score for debugging
            const score = this.calculateLeadScore();
            const quality = this.getLeadQuality(score);
            console.log('[Speeki Advanced Growth] Lead Score:', score, '| Quality:', quality);
        }
    };

    // Auto-initialize when DOM is ready (after base growth.js)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => SpeekiAdvancedGrowth.init(), 100);
        });
    } else {
        setTimeout(() => SpeekiAdvancedGrowth.init(), 100);
    }

})();

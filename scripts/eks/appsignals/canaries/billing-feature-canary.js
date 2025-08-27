// ALARMS/CANARIES USING FEATURE FLAG - BLOCKER #3
const synthetics = require('Synthetics');

const billingCanary = async function () {
    // Check if billing feature flag is enabled
    const featureEnabled = await checkFeatureFlag('ENABLE_BILLING_STATUS_FEATURE');
    
    if (featureEnabled) {
        // Test new billing status endpoint
        await synthetics.executeStep('test_new_billing', async function() {
            const response = await synthetics.getPage().goto('http://petclinic/api/billing/status');
            // Validate new billing response
        });
        
        // Monitor billing feature metrics
        await synthetics.addUserAgent('billing-feature-canary-new');
    } else {
        // Test legacy billing behavior  
        await synthetics.executeStep('test_legacy_billing', async function() {
            // Test that billing section shows "not available"
        });
        
        await synthetics.addUserAgent('billing-feature-canary-legacy');
    }
};

// This canary becomes obsolete when feature flag is removed
exports.handler = async () => {
    return await synthetics.executeStep('billing_feature_canary', billingCanary);
};

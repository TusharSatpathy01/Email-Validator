// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Validation started");
    
    const email = document.getElementById("username").value.trim();
    if (!email) {
        resultCont.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Please enter an email address to validate</p>
            </div>
        `;
        return;
    }

    // Show loading state
    resultCont.innerHTML = `
        <div class="loading-state">
            <i class="fas fa-spinner loading"></i>
            <p>Validating email address...</p>
        </div>
    `;

    try {
        let key = "ema_live_ITkV5Pqq40WNdMLdjqMZlNcb4AEBrNvWiSFd1MYE";
        let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
        let res = await fetch(url);
        let result = await res.json();
        
        let str = `<div class="result-header">
                      <h3>Validation Results for <span class="email-highlight">${email}</span></h3>
                      <div class="validation-summary ${result.format_valid && result.mx_found && result.smtp_check ? 'valid' : 'invalid'}">
                          ${result.format_valid && result.mx_found && result.smtp_check ? 
                            '<i class="fas fa-check-circle"></i> Valid Email' : 
                            '<i class="fas fa-times-circle"></i> Invalid Email'}
                      </div>
                  </div>`;
        
        for (let key of Object.keys(result)) {
            if(result[key] !== "" && result[key] !== " ") {
                // Format key for display
                const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                
                // Special formatting for certain fields
                let value = result[key];
                if (typeof value === 'boolean') {
                    value = value ? 
                        '<span class="valid-value"><i class="fas fa-check"></i> Yes</span>' : 
                        '<span class="invalid-value"><i class="fas fa-times"></i> No</span>';
                } else if (key === 'state') {
                    value = `<span class="state-${value}">${value}</span>`;
                }
                
                str += `<div class="result-item">
                           <span class="result-key">${formattedKey}:</span>
                           <span class="result-value">${value}</span>
                       </div>`;
            }
        }

        // Add did you mean suggestion if available
        if (result.did_you_mean) {
            str += `<div class="suggestion">
                       <i class="fas fa-lightbulb"></i> Did you mean: <strong>${result.did_you_mean}</strong>?
                   </div>`;
        }

        resultCont.innerHTML = str;
    } catch (error) {
        console.error("Validation error:", error);
        resultCont.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>An error occurred during validation. Please try again.</p>
            </div>
        `;
    }
});
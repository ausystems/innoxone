function render() {
  return `<div class="pga-request">
    <noscript><style>.pga-form {display:none}</style><div class="pga-email-fallback"><h3>Plan your PGA Show visit.</h3><p>Email your name, organization and preferred day and time. Our team will confirm the details with you.</p><a class="text-link" href="mailto:info@innoxone.com?subject=RoboCaddy%20PGA%20Show%20private%20tour%20request">Request a private tour</a><a class="text-link" href="mailto:info@innoxone.com?subject=RoboCaddy%20PGA%20Show%2030-minute%20business%20meeting">Request a business meeting</a></div></noscript>
    <form class="pga-form" id="pga-request-form" action="mailto:info@innoxone.com" method="post" enctype="text/plain">
      <fieldset class="pga-mode"><legend class="sr-only">Choose your visit</legend>
        <label><input type="radio" name="request_type" value="tour" checked><span>Private tour</span></label>
        <label><input type="radio" name="request_type" value="business"><span>Business meeting</span></label>
      </fieldset>
      <p class="pga-mode-description" id="pga-mode-description">Request a guided tour of the INNOXONE exclusive display zone.</p>
      <div class="pga-fields">
        <label>Full name<input name="name" autocomplete="name" required maxlength="80"></label>
        <label>Email address<input name="email" type="email" autocomplete="email" required maxlength="120"></label>
        <label><span>Phone <span class="pga-optional">(optional)</span></span><input name="phone" type="tel" autocomplete="tel" maxlength="40"></label>
        <label><span>Organization <span class="pga-optional" id="pga-org-optional">(optional)</span></span><input name="organization" autocomplete="organization" maxlength="100"></label>
        <label>Preferred day<select name="day" required><option value="">Choose a day</option><option value="2027-01-27">Wednesday, January 27</option><option value="2027-01-28">Thursday, January 28</option><option value="2027-01-29">Friday, January 29</option></select></label>
        <label><span>Preferred time <span class="pga-optional">(Eastern)</span></span><select name="time"><option value="">No preference</option><option>Morning</option><option>Afternoon</option></select></label>
        <label data-tour-field>Number of visitors<input name="visitors" type="number" min="1" step="1" value="1" inputmode="numeric" required></label>
        <label class="pga-field-wide" data-business-field hidden>What would you like to discuss?<textarea name="interest" rows="3" maxlength="500" disabled></textarea></label>
      </div>
      <label class="pga-news"><input type="checkbox" name="updates"><span>Keep me informed about RoboCaddy news and launch updates.</span></label>
      <p class="pga-form-note">Send your request to info@innoxone.com from your email app. Our team will confirm your visit or appointment.</p>
      <button class="pill pga-submit" type="submit">Continue to email<span aria-hidden="true">↗</span></button>
      <p class="pga-privacy">We use these details to respond to your request. <a href="https://www.innoxone.com/privacy-policy/">Privacy Policy</a></p>
      <div class="pga-email-ready" id="pga-email-ready" hidden>
        <h3 id="pga-email-title" tabindex="-1">Your request is ready to send.</h3>
        <p id="pga-email-instruction">Open your email app to finish sending it to our team.</p>
        <div class="pga-email-actions"><a class="pill" id="pga-compose" href="mailto:info@innoxone.com">Open email app<span aria-hidden="true">↗</span></a><button class="pga-copy text-link" type="button">Copy request</button></div>
        <textarea id="pga-copy-text" aria-label="Your request to copy" rows="8" readonly hidden></textarea>
        <p id="pga-copy-status" role="status"></p>
      </div>
      <p id="pga-form-status" class="sr-only" role="status"></p>
    </form>
  </div>`;
}
module.exports = {render};

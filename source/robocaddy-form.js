(() => {
  const form = document.getElementById('pga-request-form');
  const ready = document.getElementById('pga-email-ready');
  const compose = document.getElementById('pga-compose');
  const copyText = document.getElementById('pga-copy-text');
  const copyStatus = document.getElementById('pga-copy-status');
  const status = document.getElementById('pga-form-status');
  const fields = form.elements;
  let emailText = '';
  function resetDraft() {
    ready.hidden = true;
    copyText.hidden = true;
    copyStatus.textContent = '';
    emailText = '';
    compose.href = form.action;
  }
  function updateTimes() {
    const selected = fields.time.value;
    const options = [new Option('No preference','')];
    if (fields.request_type.value === 'business') {
      const end = fields.day.value === '2027-01-29' ? 14 * 60 : 18 * 60;
      for (let minute = 8 * 60 + 30; minute <= end - 30; minute += 30) {
        const hour = Math.floor(minute / 60);
        const label = (hour % 12 || 12) + ':' + String(minute % 60).padStart(2,'0') + (hour < 12 ? ' AM' : ' PM');
        options.push(new Option(label, label));
      }
    } else options.push(new Option('Morning','Morning'), new Option('Afternoon','Afternoon'));
    fields.time.replaceChildren(...options);
    if (options.some(option => option.value === selected)) fields.time.value = selected;
  }
  function setMode(mode) {
    const business = mode === 'business';
    fields.request_type.value = business ? 'business' : 'tour';
    fields.organization.required = business;
    document.getElementById('pga-org-optional').hidden = business;
    fields.organization.setCustomValidity('');
    form.querySelectorAll('[data-business-field]').forEach(label => {
      label.hidden = !business;
      label.querySelectorAll('input,textarea').forEach(input => {input.disabled = !business; input.required = business; input.setCustomValidity('');});
    });
    form.querySelectorAll('[data-tour-field]').forEach(label => {
      label.hidden = business;
      label.querySelectorAll('input').forEach(input => {input.disabled = business; input.required = !business;});
    });
    document.getElementById('pga-mode-description').textContent = business
      ? 'Request a private, 30-minute meeting and presentation about collaborative launch opportunities.'
      : 'Request a guided tour of the INNOXONE exclusive display zone.';
    updateTimes();
    resetDraft();
  }
  form.querySelectorAll('[name="request_type"]').forEach(radio => radio.addEventListener('change', () => setMode(radio.value)));
  fields.day.addEventListener('change', updateTimes);
  form.addEventListener('input', event => {
    event.target.setCustomValidity?.('');
    resetDraft();
  });
  form.addEventListener('change', resetDraft);
  document.querySelectorAll('[data-pga-mode]').forEach(link => link.addEventListener('click', () => setMode(link.dataset.pgaMode)));
  const query = new URLSearchParams(location.search);
  setMode(['business','meeting'].includes(query.get('request')) ? 'business' : 'tour');
  form.noValidate = true;
  form.addEventListener('submit', event => {
    event.preventDefault();
    [...fields].filter(field => field.matches('input:not([type="radio"],[type="checkbox"],[type="number"]),textarea')).forEach(field => {field.value = field.value.trim();});
    if (!form.reportValidity()) return;
    const business = fields.request_type.value === 'business';
    const request = business ? '30-minute business meeting / presentation' : 'Private display-zone tour';
    const day = fields.day.selectedOptions[0].text;
    const lines = [
      'RoboCaddy at the 2027 PGA Show',
      'INNOXONE Booth 3217, Orlando',
      '',
      'Request: ' + request,
      'Full name: ' + fields.name.value,
      'Email: ' + fields.email.value,
      'Phone: ' + (fields.phone.value || 'Not provided'),
      'Organization: ' + (fields.organization.value || 'Not provided'),
      'Preferred day: ' + day + ', 2027',
      'Preferred time: ' + (fields.time.value || 'No preference') + ' (Eastern Time)',
      business ? 'Meeting interest: ' + fields.interest.value : 'Number of visitors: ' + fields.visitors.value,
      'RoboCaddy news and launch updates: ' + (fields.updates.checked ? 'Yes, please' : 'No'),
      '',
      'Please confirm my request and the appointment details.'
    ];
    emailText = lines.join('\n');
    const subject = 'RoboCaddy PGA Show 2027 | ' + (business ? 'Business meeting request' : 'Private tour request');
    const prefix = form.action + '?subject=' + encodeURIComponent(subject);
    const full = prefix + '&body=' + encodeURIComponent(emailText);
    const longMessage = full.length > 1900;
    compose.href = longMessage ? prefix : full;
    copyText.value = emailText;
    ready.hidden = false;
    copyText.hidden = !longMessage;
    document.getElementById('pga-email-instruction').textContent = longMessage
      ? 'Copy your request, then open your email app and paste it into the message to our team.'
      : 'Open your email app to finish sending it to our team. Your visit is confirmed when our team replies.';
    status.textContent = 'Your request is ready. Finish sending it in your email app.';
    document.getElementById('pga-email-title').focus({preventScroll:true});
    ready.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    window.dispatchEvent(new CustomEvent('innoxone:conversion',{detail:{action:'email-prepared',section:'robocaddy',interest:business ? 'pga-business' : 'pga-tour'}}));
  });
  form.querySelector('.pga-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      copyStatus.textContent = 'Request copied. Paste it into your email.';
    } catch {
      copyText.hidden = false;
      copyText.focus();
      copyText.select();
      copyStatus.textContent = 'Select and copy the request below.';
    }
  });
})();

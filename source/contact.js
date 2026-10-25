(() => {
  document.documentElement.classList.add('has-js');
  const form = document.getElementById('inquiry-form');
  const fields = [...form.querySelectorAll('.form-field input,.form-field textarea')];
  const errors = document.getElementById('form-errors');
  const status = document.getElementById('form-status');
  const ready = document.getElementById('email-ready');
  const compose = document.getElementById('open-email');
  const copy = document.getElementById('copy-inquiry');
  const copyStatus = document.getElementById('copy-status');
  const copyDetails = document.getElementById('copy-details');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let lastPrefill = '', inquiryText = '', attempted = false;
  form.noValidate = true;
  function fillInterest(key, focus = false) {
    if (!Object.hasOwn(CONTACT.interests,key)) return;
    const interest = CONTACT.interests[key];
    const subject = form.elements.subject;
    if (!subject.value.trim() || subject.value === lastPrefill) {
      subject.value = interest.subject;
      lastPrefill = interest.subject;
      if (attempted) validateField(subject);
    }
    form.querySelector(`input[name="inquiry_type"][value="${interest.category}"]`).checked = true;
    resetHandoff();
    if (attempted) renderSummary();
    if (focus) {
      document.getElementById('contact-form').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
      form.elements.name.focus({preventScroll:true});
      status.textContent = 'Gallery visit selected. Add your contact details and message.';
    }
  }
  fillInterest(new URLSearchParams(location.search).get('interest'));
  document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();fillInterest(link.dataset.interest,true);
  }));
  function validationMessage(field) {
    const value = field.value.trim();
    if (!value) return {name:'Enter your full name.',email:'Enter your email address.',phone:'Enter your phone number.',subject:'Add a subject for your inquiry.',message:'Tell us how we can help.'}[field.name];
    if (field.name==='email' && field.validity.typeMismatch) return 'Enter a valid email address.';
    if (field.name==='phone' && value.replace(/\D/g,'').length < 7) return 'Enter a phone number with at least 7 digits.';
    if (value.length > field.maxLength) return `Please keep this to ${field.maxLength} characters or fewer.`;
    return '';
  }
  function validateField(field) {
    const message = validationMessage(field);
    const error = document.getElementById(field.name+'-error');
    error.textContent=message;error.hidden=!message;
    if(message) field.setAttribute('aria-invalid','true');else field.removeAttribute('aria-invalid');
    return message;
  }
  function renderSummary() {
    const invalid = fields.filter(field=>field.getAttribute('aria-invalid')==='true');
    errors.replaceChildren();errors.hidden=!invalid.length;
    if (!invalid.length) return;
    const lead = document.createElement('p');lead.textContent='Please check these details:';errors.append(lead);
    const list = document.createElement('ul');
    invalid.forEach(field=>{
      const item=document.createElement('li'),link=document.createElement('a');
      link.href='#'+field.id;link.textContent=document.getElementById(field.name+'-error').textContent;
      link.addEventListener('click',event=>{event.preventDefault();field.focus()});item.append(link);list.append(item);
    });errors.append(list);
  }
  function resetHandoff() {ready.hidden=true;copyStatus.textContent='';copyDetails.hidden=true;inquiryText='';compose.href='mailto:'+CONTACT.delivery.email;}
  fields.forEach(field=>{
    field.addEventListener('blur',()=>{if(field.value.trim()||attempted){validateField(field);if(attempted)renderSummary()}});
    field.addEventListener('input',()=>{resetHandoff();if(field.hasAttribute('aria-invalid')){validateField(field);if(attempted)renderSummary()}});
  });
  form.querySelectorAll('[name="inquiry_type"]').forEach(radio=>radio.addEventListener('change',resetHandoff));
  form.addEventListener('submit',event=>{
    event.preventDefault();attempted=true;
    fields.forEach(validateField);renderSummary();
    if (!errors.hidden) {errors.focus();return;}
    const category=CONTACT.categories.find(c=>c.value===form.elements.inquiry_type.value).label;
    const values=Object.fromEntries(fields.map(field=>[field.name,field.value.trim()]));
    const subject=`${category}: ${values.subject}`;
    inquiryText=`${category}\n\nFull Name: ${values.name}\nEmail Address: ${values.email}\nPhone Number: ${values.phone}\nSubject: ${values.subject}\n\nYour Message:\n${values.message}`;
    const prefix=`mailto:${CONTACT.delivery.email}?subject=${encodeURIComponent(subject)}`;
    const full=prefix+'&body='+encodeURIComponent(inquiryText);
    const longInquiry=full.length>1900;
    compose.href=longInquiry?prefix:full;
    copyDetails.value=inquiryText;
    ready.hidden=false;copyStatus.textContent='';copyDetails.hidden=true;
    document.getElementById('email-ready-description').textContent=longInquiry
      ? 'Copy your inquiry, then open your email app and paste it into the message. This keeps longer messages intact.'
      : 'Finish sending it in your email app. Your details are still here if you need to make a change.';
    status.textContent=longInquiry?'Your inquiry is ready to copy into an email.':'Your inquiry is ready. Finish sending it in your email app.';
    document.getElementById('email-ready-title').focus({preventScroll:true});
    if(!longInquiry) compose.click();
    ready.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'nearest'});
    window.dispatchEvent(new CustomEvent('innoxone:conversion',{detail:{action:'email-prepared',category:form.elements.inquiry_type.value,section:'contact'}}));
  });
  copy.addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText(inquiryText);copyStatus.textContent='Inquiry copied. Paste it into your email.';}
    catch {copyDetails.hidden=false;copyDetails.focus();copyDetails.select();copyStatus.textContent='Select and copy the inquiry below, then paste it into your email.';}
  });
  const menu=document.getElementById('site-menu'),menuButton=document.querySelector('[data-open="site-menu"]');
  if(typeof menu.showModal==='function'){
    menuButton.addEventListener('click',()=>{menu.showModal();document.body.classList.add('dialog-open');menuButton.setAttribute('aria-expanded','true');menu.querySelector('[data-close]').focus()});
    menu.querySelector('[data-close]').addEventListener('click',()=>menu.close());
    menu.addEventListener('close',()=>{document.body.classList.remove('dialog-open');menuButton.setAttribute('aria-expanded','false');menuButton.focus({preventScroll:true})});
    menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.close()));
    menu.addEventListener('keydown',event=>{
      if(event.key!=='Tab')return;
      const items=[...menu.querySelectorAll('a[href],button')],first=items[0],last=items.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    });
  }else document.documentElement.classList.add('dialog-fallback');
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[data-inquiry]');if(!link)return;
    window.dispatchEvent(new CustomEvent('innoxone:conversion',{detail:{action:link.protocol==='tel:'?'phone':link.protocol==='mailto:'?'email':'inquiry',section:'contact'}}));
  });
})();

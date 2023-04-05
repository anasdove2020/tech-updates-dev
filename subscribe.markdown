---
layout: default
title: Subscribe
description: "Stay ahead of the technology curve with Polyrific."
permalink: /subscribe/
buttonHighlighted: true
hideFooterBanner: true
---

<div class="subscription">
  <p class="subscription-title">{{ page.title | default: "Subscribe" }}</p>
  <h3 class="subscription-description">{{ page.description }}</h3>
  <div class="subscription-banner">
    <div class="subscription-banner-image">
      <img src="/assets/images/subscription.svg"  alt="banner">
    </div>
    <div class="subscription-banner-text">
      <p>
        Our expert team of technologists provides the latest insights and analysis on industry trends, tools, and best practices. By subscribing to our updates, you’ll receive a curated selection of news and insights, delivered right to your inbox.
      </p>
      <p>
        Whether you’re an entrepreneur, business leader, or technology enthusiast, our updates will help you make better decisions and unlock the full potential of your business. Join now to stay ahead of the competition.
      </p>
      <div class="subscription-box">
        <div class="subscription-box-control">
          <input id="email-id" type="text" class="subscription-box-input" placeholder="Email Address">
          <div id="button-box-id" class="subscription-box-button">
            <button id="subscribe-button-id" class="g-recaptcha" data-sitekey="{{ site.env.SITE_KEY }}"  data-callback='onSubmit' data-action='submit'>SUBSCRIBE</button>
          </div>
        </div>
        <div id="subscribe-error-id" class="subscription-box-validation"></div>
      </div>
    </div>
  </div>
  <div id="subscribe-result-id" class="subscription-box-result-success">Thank you, you have been subscribed to the weekly newsletter</div>
</div>

<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<script src="/js/subscribe.js"></script>
<link rel="stylesheet" href="/assets/css/subscription.css">

<script>
window.siteKey = "{{ site.env.SITE_KEY }}";
window.apiUrl = "{{ site.env.API_URL }}";
</script>
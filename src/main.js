import './style.css';
import { tours } from './toursData.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderTours();
  initTripBuilder();
  initTourFilters();
  initPartnerPortal();
  initCommissionCalculator();
  initCheckout();
  injectBaseSchema();
});

// --- SPA NAVIGATION ROUTING ---
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .footer-nav-link');
  const sections = document.querySelectorAll('.section-view');
  
  function navigateTo(sectionId) {
    // Hide all sections
    sections.forEach(sec => sec.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(`${sectionId}-view`);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo(0, 0);
    }
    
    // Update active class on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update URL hash without breaking behavior
    if (history.pushState) {
      history.pushState(null, null, `#${sectionId}`);
    } else {
      window.location.hash = sectionId;
    }
    
    // Inject corresponding schema markup
    updateSchemaForView(sectionId);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const sectionId = e.currentTarget.getAttribute('data-section');
      navigateTo(sectionId);
      
      // Close mobile menu if open
      const navMenu = document.getElementById('nav-menu');
      if (navMenu.classList.contains('mobile-active')) {
        navMenu.classList.remove('mobile-active');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-active');
  });

  // Handle CTA buttons linking to custom builder or tours
  document.getElementById('header-cta-btn').addEventListener('click', () => {
    navigateTo('home');
    setTimeout(() => {
      const builderElement = document.getElementById('trip-builder-anchor');
      builderElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  });

  document.getElementById('hero-cta-primary').addEventListener('click', () => {
    const builderElement = document.getElementById('trip-builder-anchor');
    builderElement.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('hero-cta-secondary').addEventListener('click', () => {
    navigateTo('expeditions');
  });

  // Footer tour links
  document.querySelectorAll('.footer-nav-tour').forEach(el => {
    el.addEventListener('click', (e) => {
      const tourId = e.currentTarget.getAttribute('data-id');
      navigateTo('expeditions');
      setTimeout(() => {
        openTourModal(tourId);
      }, 100);
    });
  });

  // Handle logo click
  document.getElementById('nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home');
  });

  // Listen to popstate for back button support
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash);
  });

  // Initial load navigation check
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateTo(initialHash);
}

// --- TOUR RENDER ENGINE ---
let activeFilters = {
  category: 'all',
  difficulty: 'all',
  duration: 'all'
};

function renderTours() {
  const container = document.getElementById('tours-grid-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const filteredTours = tours.filter(tour => {
    const matchCat = activeFilters.category === 'all' || tour.category === activeFilters.category;
    const matchDiff = activeFilters.difficulty === 'all' || tour.difficulty === activeFilters.difficulty;
    
    let matchDur = true;
    if (activeFilters.duration !== 'all') {
      if (activeFilters.duration === '4-5') {
        matchDur = tour.duration >= 4 && tour.duration <= 5;
      } else if (activeFilters.duration === '6-8') {
        matchDur = tour.duration >= 6 && tour.duration <= 8;
      } else if (activeFilters.duration === '9+') {
        matchDur = tour.duration >= 9;
      }
    }
    
    return matchCat && matchDiff && matchDur;
  });
  
  if (filteredTours.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <p style="font-size: 1.2rem; font-weight: 500; margin-bottom: 8px;">No matching expeditions found</p>
        <p style="font-size: 0.9rem;">Adjust your filters to see more custom travel packages.</p>
      </div>
    `;
    return;
  }
  
  filteredTours.forEach(tour => {
    const card = document.createElement('div');
    card.className = 'glass-panel tour-card animate-fade-in-up';
    card.innerHTML = `
      <div class="tour-card-header">
        <span class="tour-card-badge">${tour.categoryLabel}</span>
        <span class="tour-card-difficulty">${tour.difficulty}</span>
        <div class="tour-card-img-placeholder">
          <div class="tour-card-img-icon">${getTourCategoryIcon(tour.category)}</div>
          <div style="font-weight: 600; font-size: 0.95rem; color: var(--accent-sand);">${tour.subtitle}</div>
          <div style="font-size: 0.75rem;">${tour.destinations.join(' • ')}</div>
        </div>
      </div>
      
      <div class="tour-card-body">
        <h3 class="tour-card-title">${tour.title}</h3>
        <div class="tour-card-meta">
          <span>⏱ ${tour.duration} Days</span>
          <span>📍 ${tour.destinations[0]}</span>
        </div>
        
        <ul class="tour-card-highlights">
          ${tour.highlights.slice(0, 3).map(h => `<li>${h}</li>`).join('')}
        </ul>
        
        <div class="tour-card-footer">
          <div class="tour-card-price">
            From <span>$${tour.priceTotal}</span> per person
          </div>
          <button class="btn-gold select-tour-btn" data-id="${tour.id}" style="padding: 8px 16px; font-size: 0.85rem;">View Details</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach modal triggers
  container.querySelectorAll('.select-tour-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tourId = e.currentTarget.getAttribute('data-id');
      openTourModal(tourId);
    });
  });
}

function getTourCategoryIcon(category) {
  switch (category) {
    case 'trekking': return '⛰️';
    case 'safari': return '🦁';
    case 'culture': return '🎭';
    case 'leisure': return '🏖️';
    default: return '🌍';
  }
}

function initTourFilters() {
  const catFilter = document.getElementById('filter-category');
  const diffFilter = document.getElementById('filter-difficulty');
  const durFilter = document.getElementById('filter-duration');
  
  if (!catFilter) return;

  catFilter.addEventListener('change', (e) => {
    activeFilters.category = e.target.value;
    renderTours();
  });
  
  diffFilter.addEventListener('change', (e) => {
    activeFilters.difficulty = e.target.value;
    renderTours();
  });
  
  durFilter.addEventListener('change', (e) => {
    activeFilters.duration = e.target.value;
    renderTours();
  });
}

// --- DYNAMIC DAY-BY-DAY ITINERARY MODAL ---
function openTourModal(tourId) {
  const tour = tours.find(t => t.id === tourId);
  if (!tour) return;
  
  const modal = document.getElementById('itinerary-modal');
  const contentContainer = document.getElementById('modal-itinerary-data');
  
  contentContainer.innerHTML = `
    <div class="itinerary-header">
      <span class="section-tag">${tour.categoryLabel}</span>
      <h2 style="font-size: 2.2rem; margin-top: 8px;">${tour.title}</h2>
      <p style="color: var(--accent-sand); font-style: italic; margin-top: 4px;">${tour.subtitle}</p>
      
      <div class="itinerary-header-meta">
        <span class="itinerary-meta-pill">⏱ <strong>${tour.duration} Days</strong> Duration</span>
        <span class="itinerary-meta-pill">💪 Difficulty: <strong>${tour.difficulty}</strong></span>
        <span class="itinerary-meta-pill">💰 From <strong>$${tour.pricePerDay}/day</strong> ($${tour.priceTotal} total)</span>
      </div>
    </div>
    
    <div class="itinerary-tabs">
      <div class="itinerary-tab-btn active" data-tab="timeline">Day-by-Day Route</div>
      <div class="itinerary-tab-btn" data-tab="gear">Required Gear</div>
      <div class="itinerary-tab-btn" data-tab="logistics">Logistics & Access</div>
    </div>
    
    <!-- Tab 1: Day-by-Day Timeline -->
    <div class="itinerary-pane active" id="pane-timeline">
      <div class="timeline">
        ${tour.dayByDay.map(day => `
          <div class="timeline-item">
            <div class="timeline-node"></div>
            <div class="timeline-day">Day ${day.day}</div>
            <h4 class="timeline-title">${day.title}</h4>
            ${day.elevation ? `<span class="timeline-elev">${day.elevation}</span>` : ''}
            <p class="timeline-desc">${day.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Tab 2: Required Gear Checklist -->
    <div class="itinerary-pane" id="pane-gear">
      <h3 style="margin-bottom: 16px;">Recommended Expedition Gear Checklist</h3>
      <p style="color: var(--text-secondary); margin-bottom: 20px;">We recommend high-quality equipment for your comfort. Equipment rental can be arranged with our Kampala office.</p>
      <ul class="access-card" style="list-style: none; padding: 20px; background: var(--bg-primary); border-radius: 12px; border: 1px solid var(--card-border);">
        ${tour.gearChecklist.map(item => `
          <li style="margin-bottom: 12px; padding-left: 28px; position: relative; color: var(--text-secondary);">
            <span style="position: absolute; left: 0; color: var(--accent-gold); font-weight: bold;">[ ]</span>
            ${item}
          </li>
        `).join('')}
      </ul>
    </div>
    
    <!-- Tab 3: Logistics & Access -->
    <div class="itinerary-pane" id="pane-logistics">
      <h3 style="margin-bottom: 16px;">Expedition Logistics & Accessibility Details</h3>
      
      <div style="margin-bottom: 24px;">
        <h4 style="color: var(--accent-gold); margin-bottom: 6px;">Porter Support & Fair-Wage Coordination</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${tour.porterDetails}</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <h4 style="color: var(--accent-gold); margin-bottom: 6px;">Accessibility & Physical Considerations</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${tour.accessibilityNotes}</p>
      </div>

      <div style="margin-bottom: 32px;">
        <h4 style="color: var(--accent-gold); margin-bottom: 6px;">Accommodation Standards</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${tour.lodgeDetails}</p>
      </div>
      
      <div style="text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 24px;">
        <button class="btn-gold modal-book-trigger" data-id="${tour.id}">Secure Booking Request</button>
      </div>
    </div>
  `;
  
  // Set up tab handlers inside modal
  const tabs = contentContainer.querySelectorAll('.itinerary-tab-btn');
  const panes = contentContainer.querySelectorAll('.itinerary-pane');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      
      e.currentTarget.classList.add('active');
      const paneId = e.currentTarget.getAttribute('data-tab');
      contentContainer.querySelector(`#pane-${paneId}`).classList.add('active');
    });
  });

  // Trigger booking setup
  contentContainer.querySelector('.modal-book-trigger').addEventListener('click', (e) => {
    const tid = e.currentTarget.getAttribute('data-id');
    modal.classList.remove('active');
    openCheckoutModal(tid);
  });
  
  modal.classList.add('active');
  
  // Update tour-specific schema markup
  injectTourSchema(tour);
}

// Close Tour Modal
document.getElementById('close-itinerary-modal').addEventListener('click', () => {
  document.getElementById('itinerary-modal').classList.remove('active');
});

// --- CUSTOM TRIP BUILDER LOGIC ---
let builderData = {
  step: 1,
  style: '',
  month: '',
  duration: '',
  groupSize: 2,
  accessibility: '',
  name: '',
  email: '',
  notes: ''
};

function initTripBuilder() {
  const prevBtn = document.getElementById('builder-prev-btn');
  const nextBtn = document.getElementById('builder-next-btn');
  const stepContentPanes = document.querySelectorAll('.builder-step-content');
  const stepNodes = document.querySelectorAll('.builder-step-node');
  const progressBar = document.getElementById('step-progress-bar');
  
  // Handle options selections
  document.querySelectorAll('.builder-step-content[data-step="1"] .builder-opt-card').forEach(card => {
    card.addEventListener('click', (e) => {
      document.querySelectorAll('.builder-step-content[data-step="1"] .builder-opt-card').forEach(c => c.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      builderData.style = e.currentTarget.getAttribute('data-val');
    });
  });
  
  document.querySelectorAll('.builder-step-content[data-step="3"] .builder-opt-card').forEach(card => {
    card.addEventListener('click', (e) => {
      document.querySelectorAll('.builder-step-content[data-step="3"] .builder-opt-card').forEach(c => c.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      builderData.accessibility = e.currentTarget.getAttribute('data-val');
    });
  });

  nextBtn.addEventListener('click', () => {
    if (builderData.step === 1 && !builderData.style) {
      alert('Please select a travel style to proceed.');
      return;
    }
    if (builderData.step === 3 && !builderData.accessibility) {
      alert('Please select an accessibility preference to proceed.');
      return;
    }
    
    if (builderData.step < 4) {
      builderData.step++;
      updateBuilderUI();
    } else {
      // Step 4: Submission
      builderData.name = document.getElementById('builder-name').value.trim();
      builderData.email = document.getElementById('builder-email').value.trim();
      builderData.notes = document.getElementById('builder-notes').value.trim();
      
      if (!builderData.name || !builderData.email) {
        alert('Please fill out your Name and Email Address so we can send your custom plan.');
        return;
      }
      
      // Simulate booking inquiry submission
      alert(`Thank you, ${builderData.name}! Your customized trip request has been logged in our secure database. A travel designer will email your custom proposal.`);
      
      // Reset builder
      builderData = {
        step: 1,
        style: '',
        month: '',
        duration: '',
        groupSize: 2,
        accessibility: '',
        name: '',
        email: '',
        notes: ''
      };
      
      document.querySelectorAll('.builder-opt-card').forEach(c => c.classList.remove('selected'));
      document.getElementById('builder-name').value = '';
      document.getElementById('builder-email').value = '';
      document.getElementById('builder-notes').value = '';
      updateBuilderUI();
      window.scrollTo(0, 0);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (builderData.step > 1) {
      builderData.step--;
      updateBuilderUI();
    }
  });

  function updateBuilderUI() {
    // Show/hide step contents
    stepContentPanes.forEach(pane => {
      if (parseInt(pane.getAttribute('data-step')) === builderData.step) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update nodes active/completed styles
    stepNodes.forEach(node => {
      const s = parseInt(node.getAttribute('data-step'));
      if (s === builderData.step) {
        node.className = 'builder-step-node active';
      } else if (s < builderData.step) {
        node.className = 'builder-step-node completed';
      } else {
        node.className = 'builder-step-node';
      }
    });

    // Progress bar line width
    const percentage = ((builderData.step - 1) / 3) * 100;
    progressBar.style.width = `${percentage}%`;

    // Manage buttons visibility
    if (builderData.step === 1) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }

    if (builderData.step === 4) {
      nextBtn.textContent = 'Submit Custom Plan Request';
      nextBtn.classList.add('glow-pulse');
      generateRecommendations();
    } else {
      nextBtn.textContent = 'Next Step';
      nextBtn.classList.remove('glow-pulse');
    }
  }

  function generateRecommendations() {
    // Collect dropdown inputs
    builderData.month = document.getElementById('builder-month').value;
    builderData.duration = document.getElementById('builder-duration').value;
    builderData.groupSize = parseInt(document.getElementById('builder-group-size').value) || 2;

    const recBox = document.getElementById('builder-recommendation-box');
    
    // Find matching tours based on travel style
    let matchTours = tours.filter(t => t.category === builderData.style);
    
    // Fallback if no matching categories
    if (matchTours.length === 0) {
      matchTours = [tours[2]]; // default 6-Day safari
    }
    
    const recTour = matchTours[0];
    
    // Format customized advice based on accessibility selection
    let accessStatement = "";
    if (builderData.accessibility === "mobility") {
      accessStatement = "Includes specialized 4x4 vehicles with hydraulic ramps, pre-verified ground-level lodge layouts, and dedicated gorilla trekking sedan chair crew coordination.";
    } else if (builderData.accessibility === "sensory") {
      accessStatement = "Features tactile-oriented guiding, custom audio briefings, and descriptive guides covering scenic spots.";
    } else if (builderData.accessibility === "senior") {
      accessStatement = "Set at a relaxed pace with extra rest periods, ground-level accessibility suites, and local air flight transfer bookings.";
    } else {
      accessStatement = "Includes standard private safari transport and classic lodge itineraries.";
    }

    const estimatedTotal = recTour.pricePerDay * recTour.duration * builderData.groupSize;

    recBox.innerHTML = `
      <div style="font-weight: 700; color: var(--accent-gold); font-size: 1.1rem; margin-bottom: 6px;">Recommended Expedition:</div>
      <p style="font-weight: 600; font-size: 1rem; margin-bottom: 4px;">${recTour.title} (${recTour.duration} Days)</p>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">Primary Focus: <strong>${recTour.categoryLabel}</strong> | Route: ${recTour.subtitle}</p>
      <div style="border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 8px; margin-bottom: 12px;">
        <p style="font-size: 0.8rem; font-weight: 600; color: var(--accent-sand); margin-bottom: 2px;">Tailored Accessibility Support:</p>
        <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${accessStatement}</p>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size: 0.85rem; background: var(--bg-secondary); padding: 8px 12px; border-radius: 6px;">
        <span>Est. Cost (${builderData.groupSize} Pax): <strong>$${estimatedTotal}</strong></span>
        <button class="btn-gold builder-checkout-btn" data-id="${recTour.id}" style="padding: 6px 12px; font-size: 0.75rem;">Proceed to Booking</button>
      </div>
    `;

    // Hook booking button
    recBox.querySelector('.builder-checkout-btn').addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openCheckoutModal(id);
    });
  }
}

// --- TRADE & PARTNER TABS ---
function initPartnerPortal() {
  const guideTab = document.getElementById('partner-tab-guide');
  const affiliateTab = document.getElementById('partner-tab-affiliate');
  
  const guidePane = document.getElementById('guide-portal');
  const affiliatePane = document.getElementById('affiliate-portal');
  
  if (!guideTab) return;

  guideTab.addEventListener('click', () => {
    guideTab.className = 'btn-gold';
    affiliateTab.className = 'btn-outline';
    guidePane.style.display = 'block';
    affiliatePane.style.display = 'none';
  });

  affiliateTab.addEventListener('click', () => {
    affiliateTab.className = 'btn-gold';
    guideTab.className = 'btn-outline';
    affiliatePane.style.display = 'block';
    guidePane.style.display = 'none';
  });
}

// B2B Commission Calculator
function initCommissionCalculator() {
  const pkgSelect = document.getElementById('calc-package');
  const referralsInput = document.getElementById('calc-referrals');
  
  const commOutput = document.getElementById('calc-result-comm');
  const revOutput = document.getElementById('calc-result-rev');
  
  if (!pkgSelect) return;

  function calculate() {
    const pkgPrice = parseFloat(pkgSelect.value);
    const count = parseInt(referralsInput.value) || 0;
    
    const revenue = pkgPrice * count;
    const commission = revenue * 0.10; // 10% standard rate
    
    commOutput.textContent = `$${Math.round(commission).toLocaleString()}`;
    revOutput.textContent = `$${Math.round(revenue).toLocaleString()}`;
  }

  pkgSelect.addEventListener('change', calculate);
  referralsInput.addEventListener('input', calculate);
  calculate();
}

// --- PAYMENT CHECKOUT SIMULATOR ---
let activeCheckoutTour = null;
let selectedPaymentMethod = "bank";

function initCheckout() {
  const closeBtn = document.getElementById('close-checkout-modal');
  const methodCards = document.querySelectorAll('.payment-method-card');
  
  closeBtn.addEventListener('click', () => {
    document.getElementById('checkout-modal').classList.remove('active');
  });

  methodCards.forEach(card => {
    card.addEventListener('click', (e) => {
      methodCards.forEach(c => c.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      
      selectedPaymentMethod = e.currentTarget.getAttribute('data-method');
      renderPaymentDetails();
    });
  });
}

function openCheckoutModal(tourId) {
  const tour = tours.find(t => t.id === tourId);
  if (!tour) return;
  
  activeCheckoutTour = tour;
  selectedPaymentMethod = "bank";
  
  // Reset method card active states
  document.querySelectorAll('.payment-method-card').forEach(card => {
    if (card.getAttribute('data-method') === "bank") {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  renderPaymentDetails();
  document.getElementById('checkout-modal').classList.add('active');
}

function renderPaymentDetails() {
  const pane = document.getElementById('payment-details-pane');
  if (!pane || !activeCheckoutTour) return;

  if (selectedPaymentMethod === "bank") {
    pane.innerHTML = `
      <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin-bottom: 12px;">Direct Bank Transfer (Uganda Account)</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">Recommended for large deposits and final balances. Transfers go directly to the verified Maleng Travel LTD business account.</p>
      
      <div style="background: var(--bg-primary); padding: 14px; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border: 1px solid var(--card-border); margin-bottom: 20px; line-height: 1.5;">
        <strong>Bank Name:</strong> Stanbic Bank Uganda LTD<br>
        <strong>Account Name:</strong> Maleng Travel (U) Limited<br>
        <strong>Account Number:</strong> 9030017849033<br>
        <strong>SWIFT Code:</strong> SBICUGKAXxx<br>
        <strong>Branch Name:</strong> Forest Mall, Kampala<br>
        <strong>Currency:</strong> USD
      </div>
      
      <div style="border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-size: 0.85rem;">
          <span>Tour Price:</span>
          <span>$${activeCheckoutTour.priceTotal}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 12px; font-size: 0.85rem; color: var(--success);">
          <span>Processing Fees (0%):</span>
          <span>$0</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-weight: 700; font-size: 1.1rem; border-top: 1px dashed var(--card-border); padding-top: 8px; margin-bottom: 20px;">
          <span>Invoiced Total:</span>
          <span>$${activeCheckoutTour.priceTotal}</span>
        </div>
        
        <button class="btn-gold confirm-payment-btn" style="width: 100%;">Create Booking Invoice</button>
      </div>
    `;
  } else if (selectedPaymentMethod === "dpo") {
    const fee = Math.round(activeCheckoutTour.priceTotal * 0.038); // 3.8% avg
    const grandTotal = activeCheckoutTour.priceTotal + fee;

    pane.innerHTML = `
      <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin-bottom: 12px;">DPO Pay Gateway Checkout</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">PCI DSS Level 1 secure payment. Accepts international Visa, Mastercard, American Express, and Diners Club.</p>
      
      <form id="dpo-checkout-form" style="margin-bottom: 20px;">
        <div class="form-group" style="margin-bottom: 12px;">
          <input type="text" class="form-input" required placeholder="Cardholder Name" style="padding: 8px 12px; font-size: 0.85rem;" />
        </div>
        <div class="form-group" style="margin-bottom: 12px;">
          <input type="text" class="form-input" required placeholder="Card Number (Simulated)" style="padding: 8px 12px; font-size: 0.85rem;" />
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <input type="text" class="form-input" required placeholder="MM/YY" style="padding: 8px 12px; font-size: 0.85rem;" />
          <input type="password" class="form-input" required placeholder="CVV" style="padding: 8px 12px; font-size: 0.85rem;" />
        </div>
      </form>
      
      <div style="border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-size: 0.85rem;">
          <span>Tour Deposit:</span>
          <span>$${activeCheckoutTour.priceTotal}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 12px; font-size: 0.85rem; color: var(--text-muted);">
          <span>Processing Fees (3.8%):</span>
          <span>$${fee}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-weight: 700; font-size: 1.1rem; border-top: 1px dashed var(--card-border); padding-top: 8px; margin-bottom: 20px;">
          <span>Grand Total:</span>
          <span>$${grandTotal}</span>
        </div>
        
        <button class="btn-gold confirm-payment-btn" style="width: 100%;">Authorize Payment</button>
      </div>
    `;
  } else if (selectedPaymentMethod === "pesapal") {
    const fee = Math.round(activeCheckoutTour.priceTotal * 0.032); // 3.2% avg
    const grandTotal = activeCheckoutTour.priceTotal + fee;

    pane.innerHTML = `
      <h4 style="color: var(--accent-gold); font-size: 1.1rem; margin-bottom: 12px;">Pesapal Gateway Payment</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">Accepts East African Mobile Money (MTN MoMo, Airtel Money) and regional debit cards.</p>
      
      <form id="pesapal-checkout-form" style="margin-bottom: 20px;">
        <div class="form-group" style="margin-bottom: 12px;">
          <select class="form-input" style="padding: 8px 12px; font-size: 0.85rem;">
            <option>MTN Mobile Money Uganda (MoMo)</option>
            <option>Airtel Money Uganda</option>
            <option>M-Pesa Kenya</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 12px;">
          <input type="tel" class="form-input" required placeholder="Phone Number (e.g. +25677...)" style="padding: 8px 12px; font-size: 0.85rem;" />
        </div>
      </form>
      
      <div style="border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-size: 0.85rem;">
          <span>Tour Price:</span>
          <span>$${activeCheckoutTour.priceTotal}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 12px; font-size: 0.85rem; color: var(--text-muted);">
          <span>Processing Fees (3.2%):</span>
          <span>$${fee}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-weight: 700; font-size: 1.1rem; border-top: 1px dashed var(--card-border); padding-top: 8px; margin-bottom: 20px;">
          <span>Grand Total:</span>
          <span>$${grandTotal}</span>
        </div>
        
        <button class="btn-gold confirm-payment-btn" style="width: 100%;">Trigger Push OTP</button>
      </div>
    `;
  }

  // Hook simulated execution trigger
  pane.querySelector('.confirm-payment-btn').addEventListener('click', () => {
    executeSimulatedPayment();
  });
}

function executeSimulatedPayment() {
  const modal = document.getElementById('checkout-modal');
  const detailsPane = document.getElementById('payment-details-pane');
  
  detailsPane.innerHTML = `
    <div style="text-align: center; padding: 40px 0;">
      <div class="badge-pulse" style="width: 48px; height: 48px; background: var(--accent-gold); margin: 0 auto 20px auto; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#000; font-weight:bold; font-size: 1.5rem;">🔒</div>
      <p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 8px;">Processing Secure Transaction...</p>
      <p style="font-size: 0.8rem; color: var(--text-secondary);">Verifying gateway compliance tokens with SATIB passenger liability locks...</p>
    </div>
  `;

  setTimeout(() => {
    const invoiceNum = "MALENG-" + Math.floor(100000 + Math.random() * 900000);
    detailsPane.innerHTML = `
      <div style="text-align: center; padding: 30px 0;">
        <div style="width: 48px; height: 48px; background: var(--success); margin: 0 auto 20px auto; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#000; font-weight:bold; font-size: 1.5rem;">✓</div>
        <h4 style="font-size: 1.25rem; color: var(--success); margin-bottom: 8px;">Booking Confirmed!</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">Invoice generated successfully. Safe receipt and itinerary guidelines sent to your inbox.</p>
        
        <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border: 1px dashed var(--card-border); text-align: left; margin-bottom: 20px; line-height: 1.5;">
          <strong>Invoice ID:</strong> ${invoiceNum}<br>
          <strong>Package:</strong> ${activeCheckoutTour.title}<br>
          <strong>Status:</strong> Provisionally Confirmed<br>
          <strong>Assigned Operator:</strong> Maleng Travel Kampala Office
        </div>
        
        <button class="btn-gold close-checkout-success-btn" style="width: 100%;">Return to Portal</button>
      </div>
    `;

    detailsPane.querySelector('.close-checkout-success-btn').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }, 2200);
}

// --- STRUCTURED SCHEMA MARKUP INJECTION (SEO/AI Search) ---
function injectBaseSchema() {
  let schemaScript = document.getElementById('schema-base');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'schema-base';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://malengtravel.net/#organization",
        "name": "Maleng Travel",
        "url": "https://malengtravel.net",
        "logo": "https://malengtravel.net/src/assets/favicon.svg",
        "telephone": "+256-778-278-853",
        "email": "book@malengtravel.net",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot 1, Ofungi Rise, Kitintale",
          "addressLocality": "Kampala",
          "addressRegion": "Central",
          "addressCountry": "UG"
        },
        "areaServed": [
          {"@type": "AdministrativeArea", "name": "Uganda"},
          {"@type": "AdministrativeArea", "name": "Rwanda"},
          {"@type": "AdministrativeArea", "name": "Kenya"},
          {"@type": "AdministrativeArea", "name": "Tanzania"}
        ],
        "knowsLanguage": ["English"],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "Association of Uganda Tour Operators",
            "sameAs": "https://www.auto.or.ug"
          }
        ]
      }
    ]
  };

  schemaScript.textContent = JSON.stringify(baseSchema, null, 2);
}

function updateSchemaForView(viewId) {
  let viewSchemaScript = document.getElementById('schema-view');
  if (viewSchemaScript) {
    viewSchemaScript.remove();
  }

  let viewSchema = null;

  if (viewId === "explore") {
    viewSchema = {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Uganda Expeditions Attractions",
      "description": "Unique geography of Rwenzori Mountains, Bwindi Impenetrable Rainforest, and Mount Elgon volcanic features.",
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Uganda"
      }
    };
  } else if (viewId === "accessible") {
    viewSchema = {
      "@context": "https://schema.org",
      "@type": "SpecialAnnouncement",
      "name": "Accessible Safaris Infrastructure",
      "description": "Maleng Travel specialized accessibility logistics including custom hydraulic lift 4x4 cruiser conversions and gorilla trekking sedan chair porter crews."
    };
  }

  if (viewSchema) {
    viewSchemaScript = document.createElement('script');
    viewSchemaScript.id = 'schema-view';
    viewSchemaScript.type = 'application/ld+json';
    viewSchemaScript.textContent = JSON.stringify(viewSchema, null, 2);
    document.head.appendChild(viewSchemaScript);
  }
}

function injectTourSchema(tour) {
  let tourSchemaScript = document.getElementById('schema-tour');
  if (tourSchemaScript) {
    tourSchemaScript.remove();
  }

  const steps = tour.dayByDay.slice(0, 3).map((day, idx) => ({
    "@type": "HowToStep",
    "position": idx + 1,
    "name": day.title,
    "description": day.description
  }));

  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `https://malengtravel.net/tours/${tour.id}/#trip`,
    "name": `${tour.title} via ${tour.subtitle}`,
    "description": tour.highlights.join(' '),
    "touristType": [tour.categoryLabel, "Accessible Tourism"],
    "duration": `P${tour.duration}D`,
    "provider": {
      "@id": "https://malengtravel.net/#organization"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "eligibleRegion": "UG",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "description": `Price starting from $${tour.priceTotal} per person`
      },
      "availability": "https://schema.org/PreOrder"
    },
    "itinerary": steps
  };

  tourSchemaScript = document.createElement('script');
  tourSchemaScript.id = 'schema-tour';
  tourSchemaScript.type = 'application/ld+json';
  tourSchemaScript.textContent = JSON.stringify(tourSchema, null, 2);
  document.head.appendChild(tourSchemaScript);
}

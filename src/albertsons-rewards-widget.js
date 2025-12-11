const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: 'CiscoSans', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      --primary: #00529F;
      --primary-light: #009FE0;
      --primary-dark: #003d75;
      --success: #4CAF50;
      --warning: #FF9800;
      --error: #d32f2f;
      --bg: #ffffff;
      --bg-secondary: #f5f7fa;
      --text: #1a1a1a;
      --text-secondary: #666;
      --border: #e0e0e0;
    }
    :host([dark-mode="true"]) {
      --bg: #1a1a1a;
      --bg-secondary: #2d2d2d;
      --text: #f0f0f0;
      --text-secondary: #aaa;
      --border: #444;
    }
    * { box-sizing: border-box; }
    .container {
      background: var(--bg);
      color: var(--text);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .header {
      background: var(--primary);
      color: white;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-logo {
      height: 28px;
      width: auto;
    }
    .search-section {
      padding: 16px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border);
    }
    .search-row {
      display: flex;
      gap: 8px;
    }
    .search-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 14px;
      background: var(--bg);
      color: var(--text);
    }
    .search-input:focus {
      outline: none;
      border-color: var(--primary);
    }
    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }
    .btn-primary {
      background: var(--primary);
      color: white;
    }
    .btn-primary:hover { background: var(--primary-dark); }
    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .btn-secondary {
      background: transparent;
      color: var(--primary);
      border: 1px solid var(--primary);
    }
    .btn-secondary:hover { background: rgba(0,82,159,0.1); }
    .btn-sm { padding: 6px 12px; font-size: 12px; }

    /* Loading & States */
    .loading, .error, .empty {
      padding: 40px 20px;
      text-align: center;
      color: var(--text-secondary);
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--border);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 12px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .error { color: var(--primary); }

    /* Customer Profile */
    .profile-section { padding: 16px; }
    .customer-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    .customer-name {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 4px 0;
    }
    .customer-id {
      font-size: 12px;
      color: var(--text-secondary);
    }
    .member-badge {
      background: var(--success);
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
    }
    .member-badge.freshpass {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    /* Points Card */
    .points-card {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .points-main {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .points-label { font-size: 11px; opacity: 0.9; }
    .points-value {
      font-size: 28px;
      font-weight: 700;
      line-height: 1;
    }
    .points-expiry { font-size: 10px; opacity: 0.8; }
    .points-stats {
      display: flex;
      gap: 16px;
    }
    .points-stat { text-align: center; }
    .points-stat-value { font-size: 14px; font-weight: 600; }
    .points-stat-label { font-size: 9px; opacity: 0.8; }

    /* Info Grid */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    .info-card {
      background: var(--bg-secondary);
      padding: 12px;
      border-radius: 6px;
    }
    .info-card-label {
      font-size: 11px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }
    .info-card-value { font-weight: 500; }

    /* Tabs */
    .tabs {
      display: flex;
      border-bottom: 1px solid var(--border);
      background: var(--bg-secondary);
    }
    .tab {
      flex: 1;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-secondary);
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .tab:hover { color: var(--text); }
    .tab.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }
    .tab-content { display: none; padding: 16px; }
    .tab-content.active { display: block; }

    /* Offers Section */
    .offer-section-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 12px 0;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }
    .offer-section { margin-bottom: 20px; }
    .offer-section:last-child { margin-bottom: 0; }

    /* Rewards List */
    .rewards-list { max-height: 280px; overflow-y: auto; }
    .reward-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      margin-bottom: 8px;
      background: var(--bg-secondary);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .reward-item:last-child { margin-bottom: 0; }
    .reward-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      margin-right: 12px;
      flex-shrink: 0;
    }
    .reward-icon.grocery { background: rgba(0,82,159,0.1); }
    .reward-icon.gas { background: rgba(255,152,0,0.1); }
    .reward-icon.freeitem { background: rgba(76,175,80,0.1); }
    .reward-info { flex: 1; }
    .reward-name { font-weight: 600; margin-bottom: 2px; }
    .reward-meta { font-size: 12px; color: var(--text-secondary); }
    .reward-action {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }
    .reward-points {
      background: var(--primary);
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
    .reward-btn {
      padding: 6px 12px;
      font-size: 11px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      background: var(--primary);
      color: white;
      font-weight: 500;
    }
    .reward-btn:hover { background: var(--primary-dark); }
    .reward-btn.secondary {
      background: transparent;
      border: 1px solid var(--primary);
      color: var(--primary);
    }

    /* Clipped Offers */
    .clipped-offer {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      background: var(--bg-secondary);
      border-radius: 8px;
      margin-bottom: 8px;
      border: 1px solid var(--border);
    }
    .clipped-offer:last-child { margin-bottom: 0; }
    .clipped-check {
      width: 20px;
      height: 20px;
      background: var(--success);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .clipped-info { flex: 1; }
    .clipped-name { font-weight: 500; font-size: 13px; }
    .clipped-brand { font-size: 11px; color: var(--text-secondary); }
    .clipped-expires {
      font-size: 11px;
      color: var(--warning);
      background: rgba(255,152,0,0.1);
      padding: 2px 8px;
      border-radius: 4px;
    }

    /* Transaction List */
    .transaction-list { max-height: 280px; overflow-y: auto; }
    .transaction-item {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      margin-bottom: 8px;
      background: var(--bg-secondary);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .transaction-item:last-child { margin-bottom: 0; }
    .transaction-icon {
      width: 40px;
      height: 40px;
      background: rgba(0,82,159,0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      margin-right: 12px;
      flex-shrink: 0;
    }
    .transaction-info { flex: 1; }
    .transaction-store { font-weight: 600; margin-bottom: 2px; }
    .transaction-date { font-size: 12px; color: var(--text-secondary); }
    .transaction-details { text-align: right; }
    .transaction-amount { font-weight: 600; font-size: 15px; }
    .transaction-points { 
      font-size: 12px; 
      color: var(--success);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
    }
    .transaction-items { font-size: 11px; color: var(--text-secondary); }

    /* Actions */
    .actions {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--border);
      flex-wrap: wrap;
    }
    .actions .btn { flex: 1; min-width: 120px; }

    /* Quick Actions */
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    .quick-action {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .quick-action:hover {
      border-color: var(--primary);
      background: rgba(0,82,159,0.05);
      transform: translateY(-2px);
    }
    .quick-action-icon { 
      font-size: 24px; 
      margin-bottom: 8px;
      display: block;
    }
    .quick-action-label { 
      font-size: 11px; 
      font-weight: 500;
      color: var(--text);
    }

    /* Action History */
    .action-history { margin-top: 16px; }
    .action-history-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .action-log {
      background: var(--bg-secondary);
      border-radius: 8px;
      padding: 12px;
      max-height: 120px;
      overflow-y: auto;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .action-log-item {
      padding: 6px 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
    }
    .action-log-item:last-child { border-bottom: none; }
    .action-log-type { font-weight: 500; }
    .action-log-time { color: var(--text-secondary); }

    /* Toggle Switch */
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: var(--bg-secondary);
      border-radius: 8px;
      margin-bottom: 12px;
      border: 1px solid var(--border);
    }
    .toggle-label { font-weight: 500; }
    .toggle-desc { font-size: 11px; color: var(--text-secondary); }
    .toggle-switch {
      position: relative;
      width: 44px;
      height: 24px;
      flex-shrink: 0;
    }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: #ccc;
      border-radius: 24px;
      transition: 0.3s;
    }
    .toggle-slider:before {
      content: "";
      position: absolute;
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: 0.3s;
    }
    .toggle-switch input:checked + .toggle-slider { background: var(--primary); }
    .toggle-switch input:checked + .toggle-slider:before { transform: translateX(20px); }
  </style>
  
  <div class="container">
    <div class="header">
      <img src="https://storage.googleapis.com/gcp-wxcctoolkit-nprd-41927.appspot.com/assets/DwOVM0HYZPOjxemCLo1foEsxRmm1/for-u-logo.png" alt="Albertsons for U" class="header-logo">
      <button class="btn btn-sm" id="refreshBtn" style="background:rgba(255,255,255,0.2);color:white;border:none;">↻</button>
    </div>
    
    <div class="search-section">
      <div class="search-row">
        <input type="tel" class="search-input" id="phoneInput" placeholder="Enter phone number (ANI)" maxlength="14">
        <button class="btn btn-primary" id="searchBtn">Search</button>
      </div>
    </div>
    
    <div id="content">
      <div class="empty">
        <p>Enter a phone number to look up customer rewards</p>
      </div>
    </div>
  </div>
`;

class AlbertsonsRewardsWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    
    this._customer = null;
    this._loading = false;
    this._activeTab = 'overview';
    
    // Cache DOM refs
    this._phoneInput = this.shadowRoot.getElementById('phoneInput');
    this._searchBtn = this.shadowRoot.getElementById('searchBtn');
    this._refreshBtn = this.shadowRoot.getElementById('refreshBtn');
    this._content = this.shadowRoot.getElementById('content');
  }

  static get observedAttributes() {
    return ['ani', 'dark-mode', 'interaction-id'];
  }

  connectedCallback() {
    this._searchBtn.addEventListener('click', () => this._searchCustomer());
    this._refreshBtn.addEventListener('click', () => this._refresh());
    this._phoneInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this._searchCustomer();
    });
    this._phoneInput.addEventListener('input', (e) => this._formatPhone(e));
    
    this.dispatchEvent(new CustomEvent('widget-ready', { bubbles: true, composed: true }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if (name === 'ani' && newValue) {
      this._phoneInput.value = this._formatPhoneNumber(newValue);
      this._searchCustomer();
    }
  }

  // Public API for Agent Desktop
  setANI(ani) {
    if (ani) {
      this._phoneInput.value = this._formatPhoneNumber(ani);
      this._searchCustomer();
    }
  }

  getCustomerData() {
    return this._customer;
  }

  _formatPhone(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length >= 6) {
      value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0,3)}) ${value.slice(3)}`;
    }
    e.target.value = value;
  }

  _formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '').slice(-10);
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  async _searchCustomer() {
    const phone = this._phoneInput.value.replace(/\D/g, '');
    if (phone.length !== 10) {
      this._showError('Please enter a valid 10-digit phone number');
      return;
    }
    
    this._setLoading(true);
    
    try {
      // Simulate API call - replace with actual Albertsons API integration
      const customer = await this._fetchCustomerData(phone);
      this._customer = customer;
      this._renderCustomer();
      
      this.dispatchEvent(new CustomEvent('customer-loaded', {
        bubbles: true,
        composed: true,
        detail: { customer, phone }
      }));
    } catch (err) {
      this._showError(err.message || 'Failed to load customer data');
    } finally {
      this._setLoading(false);
    }
  }

  async _fetchCustomerData(phone) {
    // Simulated API response - replace with actual API call
    // In production: return fetch(`/api/albertsons/customer/${phone}`).then(r => r.json());
    await new Promise(r => setTimeout(r, 800));
    
    // Mock data based on phone
    const lastFour = phone.slice(-4);
    return {
      id: `ALB-${lastFour}${Date.now().toString().slice(-4)}`,
      phone: phone,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: `sjohnson${lastFour}@email.com`,
      memberSince: '2021-03-15',
      tier: Math.random() > 0.5 ? 'FreshPass' : 'Standard',
      points: {
        current: Math.floor(Math.random() * 2000) + 500,
        expiring: Math.floor(Math.random() * 300),
        expiryDate: this._getNextMonth(),
        lifetimeEarned: Math.floor(Math.random() * 15000) + 5000,
        lifetimeRedeemed: Math.floor(Math.random() * 10000) + 2000
      },
      rewards: {
        birthdayTreat: { available: true, expiresOn: '2025-12-31' },
        freeMonthlyItem: { available: true, item: 'O Organics® Milk', expiresOn: '2025-12-31' },
        gasRewards: { centsOff: 30, gallonsRemaining: 25 }
      },
      recentTransactions: [
        { date: '2025-12-08', store: 'Albertsons #1234', amount: 87.42, pointsEarned: 87, items: 12 },
        { date: '2025-12-05', store: 'Albertsons #1234', amount: 45.18, pointsEarned: 45, items: 6 },
        { date: '2025-12-01', store: 'Albertsons #5678', amount: 123.67, pointsEarned: 124, items: 18 },
        { date: '2025-11-28', store: 'Albertsons #1234', amount: 67.89, pointsEarned: 68, items: 9 },
        { date: '2025-11-24', store: 'Albertsons #5678', amount: 234.56, pointsEarned: 235, items: 32 }
      ],
      clippedOffers: [
        { id: 'off1', name: '$2 off Cheerios', brand: 'General Mills', expires: '2025-12-15', clipped: true },
        { id: 'off2', name: 'BOGO Lucerne Milk', brand: 'Lucerne', expires: '2025-12-20', clipped: true },
        { id: 'off3', name: '$5 off $25 Deli Purchase', brand: 'Store', expires: '2025-12-31', clipped: true }
      ],
      availableOffers: [
        { id: 'rwd1', name: '$4 off Purchase', points: 300, type: 'grocery', description: 'Any grocery purchase' },
        { id: 'rwd2', name: '$8 off Purchase', points: 600, type: 'grocery', description: 'Any grocery purchase' },
        { id: 'rwd3', name: '$15 off Purchase', points: 1000, type: 'grocery', description: 'Any grocery purchase' },
        { id: 'rwd4', name: '10¢ off/gallon', points: 100, type: 'gas', description: 'Up to 25 gallons' },
        { id: 'rwd5', name: '20¢ off/gallon', points: 200, type: 'gas', description: 'Up to 25 gallons' },
        { id: 'rwd6', name: 'Free O Organics Item', points: 400, type: 'freeitem', description: 'Select items up to $6' }
      ],
      preferences: {
        autoCashOff: false,
        smsOptIn: true,
        emailOptIn: true
      }
    };
  }

  _getNextMonth() {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split('T')[0];
  }

  _setLoading(loading) {
    this._loading = loading;
    this._searchBtn.disabled = loading;
    if (loading) {
      this._content.innerHTML = `
        <div class="loading">
          <div class="spinner"></div>
          <p>Looking up customer...</p>
        </div>
      `;
    }
  }

  _showError(message) {
    this._content.innerHTML = `
      <div class="error">
        <p>⚠️ ${message}</p>
        <button class="btn btn-secondary btn-sm" onclick="this.getRootNode().host._resetView()">Try Again</button>
      </div>
    `;
  }

  _resetView() {
    this._customer = null;
    this._content.innerHTML = `
      <div class="empty">
        <p>Enter a phone number to look up customer rewards</p>
      </div>
    `;
  }

  _refresh() {
    if (this._customer) {
      this._searchCustomer();
    }
  }

  _renderCustomer() {
    const c = this._customer;
    const isFreshPass = c.tier === 'FreshPass';
    
    this._content.innerHTML = `
      <div class="profile-section">
        <div class="customer-header">
          <div>
            <h2 class="customer-name">${c.firstName} ${c.lastName}</h2>
            <div class="customer-id">ID: ${c.id} • Member since ${new Date(c.memberSince).toLocaleDateString()}</div>
          </div>
          <span class="member-badge ${isFreshPass ? 'freshpass' : ''}">${c.tier}${isFreshPass ? ' ®' : ''}</span>
        </div>
        
        <div class="points-card">
          <div class="points-main">
            <div>
              <div class="points-label">Available Points</div>
              <div class="points-value">${c.points.current.toLocaleString()}</div>
              <div class="points-expiry">${c.points.expiring} expiring ${c.points.expiryDate}</div>
            </div>
          </div>
          <div class="points-stats">
            <div class="points-stat">
              <div class="points-stat-value">${(c.points.lifetimeEarned/1000).toFixed(1)}k</div>
              <div class="points-stat-label">Earned</div>
            </div>
            <div class="points-stat">
              <div class="points-stat-value">${c.rewards.gasRewards.centsOff}¢</div>
              <div class="points-stat-label">Gas</div>
            </div>
          </div>
        </div>
        
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-label">Phone</div>
            <div class="info-card-value">${this._formatPhoneNumber(c.phone)}</div>
          </div>
          <div class="info-card">
            <div class="info-card-label">Email</div>
            <div class="info-card-value">${c.email}</div>
          </div>
          <div class="info-card">
            <div class="info-card-label">Birthday Treat</div>
            <div class="info-card-value">${c.rewards.birthdayTreat.available ? '✓ Available' : 'Redeemed'}</div>
          </div>
          <div class="info-card">
            <div class="info-card-label">Free Monthly Item</div>
            <div class="info-card-value">${c.rewards.freeMonthlyItem.available ? '✓ Available' : 'Redeemed'}</div>
          </div>
        </div>
      </div>
      
      <div class="tabs">
        <div class="tab active" data-tab="offers">Offers</div>
        <div class="tab" data-tab="transactions">Transactions</div>
        <div class="tab" data-tab="actions">Actions</div>
      </div>
      
      <div class="tab-content active" data-tab="offers">
        <div class="offer-section">
          <div class="offer-section-title">🎁 Points Rewards (${c.points.current} pts available)</div>
          <div class="rewards-list">
            ${c.availableOffers.map(offer => `
              <div class="reward-item">
                <div class="reward-icon ${offer.type}">
                  ${offer.type === 'gas' ? '⛽' : offer.type === 'freeitem' ? '🎁' : '🛒'}
                </div>
                <div class="reward-info">
                  <div class="reward-name">${offer.name}</div>
                  <div class="reward-meta">${offer.description}</div>
                </div>
                <div class="reward-action">
                  <span class="reward-points">${offer.points} pts</span>
                  <button class="reward-btn ${c.points.current >= offer.points ? '' : 'secondary'}" 
                          data-reward-id="${offer.id}" 
                          ${c.points.current < offer.points ? 'disabled' : ''}>
                    ${c.points.current >= offer.points ? 'Redeem' : 'Need ' + (offer.points - c.points.current)}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="offer-section">
          <div class="offer-section-title">✂️ Clipped Digital Coupons (${c.clippedOffers.length})</div>
          ${c.clippedOffers.map(offer => `
            <div class="clipped-offer">
              <div class="clipped-check">✓</div>
              <div class="clipped-info">
                <div class="clipped-name">${offer.name}</div>
                <div class="clipped-brand">${offer.brand}</div>
              </div>
              <div class="clipped-expires">Exp ${new Date(offer.expires).toLocaleDateString()}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="tab-content" data-tab="transactions">
        <div class="offer-section-title">📋 Recent Purchases</div>
        <div class="transaction-list">
          ${c.recentTransactions.map(t => `
            <div class="transaction-item">
              <div class="transaction-icon">🧾</div>
              <div class="transaction-info">
                <div class="transaction-store">${t.store}</div>
                <div class="transaction-date">${new Date(t.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                <div class="transaction-items">${t.items} items</div>
              </div>
              <div class="transaction-details">
                <div class="transaction-amount">${t.amount.toFixed(2)}</div>
                <div class="transaction-points">
                  <span>+${t.pointsEarned}</span>
                  <span>pts</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="tab-content" data-tab="actions">
        <div class="offer-section-title">⚡ Quick Actions</div>
        <div class="quick-actions">
          <div class="quick-action" data-action="add-points">
            <span class="quick-action-icon">➕</span>
            <span class="quick-action-label">Add Points</span>
          </div>
          <div class="quick-action" data-action="adjust-points">
            <span class="quick-action-icon">✏️</span>
            <span class="quick-action-label">Adjust Points</span>
          </div>
          <div class="quick-action" data-action="manual-redeem">
            <span class="quick-action-icon">🎁</span>
            <span class="quick-action-label">Manual Redeem</span>
          </div>
          <div class="quick-action" data-action="link-accounts">
            <span class="quick-action-icon">🔗</span>
            <span class="quick-action-label">Link Accounts</span>
          </div>
          <div class="quick-action" data-action="update-profile">
            <span class="quick-action-icon">👤</span>
            <span class="quick-action-label">Edit Profile</span>
          </div>
          <div class="quick-action" data-action="send-offers">
            <span class="quick-action-icon">📧</span>
            <span class="quick-action-label">Email Offers</span>
          </div>
        </div>
        
        <div class="toggle-row">
          <div>
            <div class="toggle-label">Auto Cash Off</div>
            <div class="toggle-desc">Convert 100 pts to $1 at checkout</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="autoCashOffToggle" ${c.preferences.autoCashOff ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
        
        <div class="toggle-row">
          <div>
            <div class="toggle-label">SMS Notifications</div>
            <div class="toggle-desc">Receive deals via text message</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="smsToggle" ${c.preferences.smsOptIn ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
        
        <div class="action-history">
          <div class="action-history-title">📝 Session Activity</div>
          <div class="action-log" id="actionLog">
            <div class="action-log-item">
              <span class="action-log-type">Customer loaded</span>
              <span class="action-log-time">${new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button class="btn btn-primary" id="copyInfoBtn">Copy Info</button>
        <button class="btn btn-secondary" id="openPortalBtn">Open Portal</button>
      </div>
    `;
    
    this._attachEventListeners();
  }

  _attachEventListeners() {
    // Tab switching
    this.shadowRoot.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.shadowRoot.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        this.shadowRoot.querySelector(`.tab-content[data-tab="${tab.dataset.tab}"]`).classList.add('active');
      });
    });
    
    // Quick actions
    this.shadowRoot.querySelectorAll('.quick-action').forEach(action => {
      action.addEventListener('click', () => {
        this._logAction(action.dataset.action);
        this.dispatchEvent(new CustomEvent('widget-action', {
          bubbles: true,
          composed: true,
          detail: { action: action.dataset.action, customer: this._customer }
        }));
      });
    });
    
    // Reward redemption buttons
    this.shadowRoot.querySelectorAll('.reward-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const rewardId = btn.dataset.rewardId;
        const reward = this._customer.availableOffers.find(o => o.id === rewardId);
        if (reward) {
          this._logAction(`Redeem: ${reward.name}`);
          this.dispatchEvent(new CustomEvent('redeem-reward', {
            bubbles: true,
            composed: true,
            detail: { reward, customer: this._customer }
          }));
        }
      });
    });
    
    // Toggle switches
    this.shadowRoot.getElementById('autoCashOffToggle')?.addEventListener('change', (e) => {
      this._customer.preferences.autoCashOff = e.target.checked;
      this._logAction(`Auto Cash Off: ${e.target.checked ? 'ON' : 'OFF'}`);
      this.dispatchEvent(new CustomEvent('preference-changed', {
        bubbles: true,
        composed: true,
        detail: { preference: 'autoCashOff', value: e.target.checked, customer: this._customer }
      }));
    });
    
    this.shadowRoot.getElementById('smsToggle')?.addEventListener('change', (e) => {
      this._customer.preferences.smsOptIn = e.target.checked;
      this._logAction(`SMS Notifications: ${e.target.checked ? 'ON' : 'OFF'}`);
      this.dispatchEvent(new CustomEvent('preference-changed', {
        bubbles: true,
        composed: true,
        detail: { preference: 'smsOptIn', value: e.target.checked, customer: this._customer }
      }));
    });
    
    // Copy info
    this.shadowRoot.getElementById('copyInfoBtn')?.addEventListener('click', () => {
      const c = this._customer;
      const info = `Customer: ${c.firstName} ${c.lastName}\nID: ${c.id}\nPhone: ${c.phone}\nPoints: ${c.points.current}\nTier: ${c.tier}`;
      navigator.clipboard.writeText(info);
      this._logAction('Copied customer info');
      this.dispatchEvent(new CustomEvent('info-copied', { bubbles: true, composed: true }));
    });
    
    // Open portal
    this.shadowRoot.getElementById('openPortalBtn')?.addEventListener('click', () => {
      this._logAction('Opened portal');
      this.dispatchEvent(new CustomEvent('open-portal', {
        bubbles: true,
        composed: true,
        detail: { url: 'https://www.albertsons.com/customer-account/rewards', customer: this._customer }
      }));
    });
  }
  
  _logAction(action) {
    const log = this.shadowRoot.getElementById('actionLog');
    if (log) {
      const item = document.createElement('div');
      item.className = 'action-log-item';
      item.innerHTML = `
        <span class="action-log-type">${action}</span>
        <span class="action-log-time">${new Date().toLocaleTimeString()}</span>
      `;
      log.insertBefore(item, log.firstChild);
    }
  }
}

customElements.define('albertsons-rewards-widget', AlbertsonsRewardsWidget);
export default AlbertsonsRewardsWidget;
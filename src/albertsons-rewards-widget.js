// Albertsons for U™ Rewards Management Widget for Webex Contact Center
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
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-title {
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .header-logo {
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: var(--primary);
      font-size: 12px;
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
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .points-label { font-size: 12px; opacity: 0.9; }
    .points-value {
      font-size: 36px;
      font-weight: 700;
      margin: 4px 0;
    }
    .points-expiry { font-size: 11px; opacity: 0.8; }
    .points-row {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.2);
    }
    .points-stat { text-align: center; }
    .points-stat-value { font-size: 18px; font-weight: 600; }
    .points-stat-label { font-size: 10px; opacity: 0.8; }

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

    /* Rewards List */
    .rewards-list { max-height: 200px; overflow-y: auto; }
    .reward-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
    }
    .reward-item:last-child { border-bottom: none; }
    .reward-name { font-weight: 500; }
    .reward-meta { font-size: 12px; color: var(--text-secondary); }
    .reward-points {
      background: var(--bg-secondary);
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    /* Transaction List */
    .transaction-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
    }
    .transaction-item:last-child { border-bottom: none; }
    .transaction-date { font-size: 12px; color: var(--text-secondary); }
    .transaction-amount { font-weight: 600; }
    .transaction-points { font-size: 12px; color: var(--success); }

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
      gap: 8px;
    }
    .quick-action {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 12px 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .quick-action:hover {
      border-color: var(--primary);
      background: rgba(0,82,159,0.05);
    }
    .quick-action-icon { font-size: 20px; margin-bottom: 4px; }
    .quick-action-label { font-size: 11px; }
  </style>
  
  <div class="container">
    <div class="header">
      <div class="header-title">
        <div class="header-logo">A</div>
        <span>for U™ Rewards</span>
      </div>
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
        { date: '2025-12-08', store: 'Albertsons #1234', amount: 87.42, pointsEarned: 87 },
        { date: '2025-12-05', store: 'Albertsons #1234', amount: 45.18, pointsEarned: 45 },
        { date: '2025-12-01', store: 'Albertsons #5678', amount: 123.67, pointsEarned: 124 }
      ],
      availableOffers: [
        { name: '$4 off Purchase', points: 300, type: 'grocery' },
        { name: '$15 off Purchase', points: 1000, type: 'grocery' },
        { name: '20¢ off/gallon', points: 200, type: 'gas' }
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
          <div class="points-label">Available Points</div>
          <div class="points-value">${c.points.current.toLocaleString()}</div>
          <div class="points-expiry">${c.points.expiring} points expiring ${c.points.expiryDate}</div>
          <div class="points-row">
            <div class="points-stat">
              <div class="points-stat-value">${c.points.lifetimeEarned.toLocaleString()}</div>
              <div class="points-stat-label">Lifetime Earned</div>
            </div>
            <div class="points-stat">
              <div class="points-stat-value">${c.points.lifetimeRedeemed.toLocaleString()}</div>
              <div class="points-stat-label">Redeemed</div>
            </div>
            <div class="points-stat">
              <div class="points-stat-value">${c.rewards.gasRewards.centsOff}¢</div>
              <div class="points-stat-label">Gas Discount</div>
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
        <div class="rewards-list">
          ${c.availableOffers.map(offer => `
            <div class="reward-item">
              <div>
                <div class="reward-name">${offer.name}</div>
                <div class="reward-meta">${offer.type === 'gas' ? '⛽ Gas Reward' : '🛒 Grocery Reward'}</div>
              </div>
              <span class="reward-points">${offer.points} pts</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="tab-content" data-tab="transactions">
        <div class="rewards-list">
          ${c.recentTransactions.map(t => `
            <div class="transaction-item">
              <div>
                <div>${t.store}</div>
                <div class="transaction-date">${new Date(t.date).toLocaleDateString()}</div>
              </div>
              <div style="text-align:right">
                <div class="transaction-amount">$${t.amount.toFixed(2)}</div>
                <div class="transaction-points">+${t.pointsEarned} pts</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="tab-content" data-tab="actions">
        <div class="quick-actions">
          <div class="quick-action" data-action="add-points">
            <div class="quick-action-icon">➕</div>
            <div class="quick-action-label">Add Points</div>
          </div>
          <div class="quick-action" data-action="redeem">
            <div class="quick-action-icon">🎁</div>
            <div class="quick-action-label">Redeem</div>
          </div>
          <div class="quick-action" data-action="toggle-cashoff">
            <div class="quick-action-icon">💵</div>
            <div class="quick-action-label">Auto Cash Off</div>
          </div>
          <div class="quick-action" data-action="update-profile">
            <div class="quick-action-icon">✏️</div>
            <div class="quick-action-label">Edit Profile</div>
          </div>
          <div class="quick-action" data-action="link-accounts">
            <div class="quick-action-icon">🔗</div>
            <div class="quick-action-label">Link Accounts</div>
          </div>
          <div class="quick-action" data-action="send-offers">
            <div class="quick-action-icon">📧</div>
            <div class="quick-action-label">Send Offers</div>
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
        this.dispatchEvent(new CustomEvent('widget-action', {
          bubbles: true,
          composed: true,
          detail: { action: action.dataset.action, customer: this._customer }
        }));
      });
    });
    
    // Copy info
    this.shadowRoot.getElementById('copyInfoBtn')?.addEventListener('click', () => {
      const c = this._customer;
      const info = `Customer: ${c.firstName} ${c.lastName}\nID: ${c.id}\nPhone: ${c.phone}\nPoints: ${c.points.current}\nTier: ${c.tier}`;
      navigator.clipboard.writeText(info);
      this.dispatchEvent(new CustomEvent('info-copied', { bubbles: true, composed: true }));
    });
    
    // Open portal
    this.shadowRoot.getElementById('openPortalBtn')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('open-portal', {
        bubbles: true,
        composed: true,
        detail: { url: 'https://www.albertsons.com/customer-account/rewards', customer: this._customer }
      }));
    });
  }
}

customElements.define('albertsons-rewards-widget', AlbertsonsRewardsWidget);
export default AlbertsonsRewardsWidget;
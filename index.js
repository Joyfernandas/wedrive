// RideAssure Pro - JavaScript Implementation
// Converted from React JSX to vanilla JavaScript

class RideAssureApp {
  constructor() {
    this.currentTab = 'home';
    this.currentScreen = 'onboarding';
    this.onboardingSlide = 0;
    this.init();
  }

  init() {
    this.setupTabNavigation();
    this.loadOnboarding();
  }

  setupTabNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabId = tab.dataset.tab;
        this.switchTab(tabId);
      });
    });
  }

  switchTab(tabId) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-item').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    this.currentTab = tabId;
    this.loadTabContent(tabId);
  }

  loadTabContent(tabId) {
    const mainContent = document.getElementById('mainContent');
    
    switch(tabId) {
      case 'home':
        mainContent.innerHTML = this.getHomeContent();
        break;
      case 'history':
        mainContent.innerHTML = this.getHistoryContent();
        break;
      case 'safety':
        mainContent.innerHTML = this.getSafetyContent();
        break;
      case 'profile':
        mainContent.innerHTML = this.getProfileContent();
        break;
    }
  }

  loadOnboarding() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = this.getOnboardingContent();
    this.setupOnboardingNavigation();
  }

  getOnboardingContent() {
    const slides = [
      {
        svg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="#2E9496" stroke-width="1.5" stroke-dasharray="4 4"/>
          <circle cx="32" cy="32" r="20" stroke="#4DB8B9" stroke-width="1" opacity=".4"/>
          <path d="M32 18v28" stroke="#2E9496" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M24 26l8-8 8 8" stroke="#D1B87A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="32" cy="50" r="2.5" fill="#36B37E"/>
        </svg>`,
        title: "Guaranteed\nBooking",
        description: "Your ride is always confirmed. If a driver cancels, a backup is assigned within seconds."
      },
      {
        svg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="28" width="40" height="18" rx="5" stroke="#2E9496" stroke-width="1.5"/>
          <path d="M18 28l4-10h20l4 10" stroke="#2E9496" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="22" cy="42" r="3" fill="#36B37E"/>
          <circle cx="42" cy="42" r="3" fill="#36B37E"/>
        </svg>`,
        title: "Premium\nVehicles",
        description: "Travel in comfort with our fleet of luxury vehicles, all maintained to the highest standards."
      },
      {
        svg: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2E9496" stroke-width="1.5" transform="translate(0,16)"/>
          <circle cx="32" cy="32" r="20" stroke="#4DB8B9" stroke-width="1" opacity=".3"/>
          <path d="M28 32l4 4 8-8" stroke="#36B37E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        title: "Safety\nFirst",
        description: "Real-time tracking, verified drivers, and 24/7 support ensure your safety is our priority."
      }
    ];

    return `
      <div style="padding: 60px 0; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="margin-bottom: 40px;">
            ${slides[this.onboardingSlide].svg}
          </div>
          <h1 style="font-family: var(--font-head); font-size: 32px; font-weight: 600; color: var(--white); line-height: 1.2; margin-bottom: 16px; white-space: pre-line;">
            ${slides[this.onboardingSlide].title}
          </h1>
          <p style="font-family: var(--font-body); font-size: 16px; color: var(--gray-300); line-height: 1.5; margin-bottom: 40px;">
            ${slides[this.onboardingSlide].description}
          </p>
        </div>
        
        <div>
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 32px;">
            ${slides.map((_, i) => `
              <div style="width: ${i === this.onboardingSlide ? '24px' : '8px'}; height: 8px; border-radius: 4px; background: ${i === this.onboardingSlide ? 'var(--brass-500)' : 'var(--gray-500)'}; transition: all 0.3s ease;"></div>
            `).join('')}
          </div>
          
          <div style="display: flex; gap: 16px;">
            ${this.onboardingSlide > 0 ? `
              <button id="prevBtn" style="flex: 1; padding: 16px; border-radius: 16px; background: var(--surface2); border: 1px solid var(--border-light); color: var(--gray-300); font-family: var(--font-body); font-weight: 600; cursor: pointer;">
                Previous
              </button>
            ` : ''}
            <button id="nextBtn" style="flex: 1; padding: 16px; border-radius: 16px; background: var(--teal-500); border: none; color: var(--white); font-family: var(--font-body); font-weight: 600; cursor: pointer;">
              ${this.onboardingSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  setupOnboardingNavigation() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.onboardingSlide < 2) {
          this.onboardingSlide++;
          this.loadOnboarding();
        } else {
          this.currentScreen = 'home';
          this.loadTabContent('home');
        }
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.onboardingSlide > 0) {
          this.onboardingSlide--;
          this.loadOnboarding();
        }
      });
    }
  }

  getHomeContent() {
    return `
      <div style="padding: 20px 0;">
        <div style="margin-bottom: 32px;">
          <h1 style="font-family: var(--font-head); font-size: 28px; font-weight: 600; color: var(--white); margin-bottom: 8px;">
            Good evening, Alex
          </h1>
          <p style="color: var(--gray-300); font-size: 16px;">Where would you like to go?</p>
        </div>
        
        <div style="background: var(--surface2); border-radius: 20px; padding: 20px; margin-bottom: 24px; border: 1px solid var(--border-light);">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <div class="icon-circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-300)" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input type="text" placeholder="Where to?" style="flex: 1; background: none; border: none; color: var(--white); font-size: 16px; outline: none;" />
          </div>
          
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <div class="chip">🏠 Home</div>
            <div class="chip">🏢 Work</div>
            <div class="chip">✈️ Airport</div>
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="color: var(--white); font-size: 18px; font-weight: 600; margin-bottom: 16px;">Recent Trips</h3>
          
          <div style="background: var(--surface2); border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-circle" style="background: var(--malachite-bg); border-color: var(--malachite-border);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--malachite)" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="color: var(--white); font-weight: 600; margin-bottom: 4px;">Downtown Office</div>
                <div style="color: var(--gray-400); font-size: 14px;">123 Business Ave</div>
              </div>
              <div style="color: var(--gray-400); font-size: 12px;">2 days ago</div>
            </div>
          </div>
          
          <div style="background: var(--surface2); border-radius: 16px; padding: 16px; border: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-circle" style="background: var(--brass-glow); border-color: var(--brass-border);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brass-400)" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="color: var(--white); font-weight: 600; margin-bottom: 4px;">City Airport</div>
                <div style="color: var(--gray-400); font-size: 14px;">Terminal 2, Departure</div>
              </div>
              <div style="color: var(--gray-400); font-size: 12px;">1 week ago</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getHistoryContent() {
    return `
      <div style="padding: 20px 0;">
        <h1 style="font-family: var(--font-head); font-size: 28px; font-weight: 600; color: var(--white); margin-bottom: 24px;">
          Trip History
        </h1>
        
        <div style="display: flex; gap: 8px; margin-bottom: 24px; overflow-x: auto;">
          <div class="chip active">All Trips</div>
          <div class="chip">This Month</div>
          <div class="chip">Last Month</div>
        </div>
        
        <div style="space-y: 12px;">
          ${this.getTripHistoryItems()}
        </div>
      </div>
    `;
  }

  getTripHistoryItems() {
    const trips = [
      { date: "Today", time: "2:30 PM", from: "Home", to: "Downtown Office", price: "$24.50", status: "completed" },
      { date: "Yesterday", time: "6:45 PM", from: "Downtown Office", to: "Home", price: "$26.80", status: "completed" },
      { date: "Dec 15", time: "8:20 AM", from: "Home", to: "City Airport", price: "$45.20", status: "completed" },
      { date: "Dec 14", time: "11:15 AM", from: "Shopping Mall", to: "Restaurant", price: "$18.90", status: "completed" }
    ];

    return trips.map(trip => `
      <div style="background: var(--surface2); border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid var(--border-light);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <div style="color: var(--white); font-weight: 600; margin-bottom: 4px;">${trip.from} → ${trip.to}</div>
            <div style="color: var(--gray-400); font-size: 14px;">${trip.date} • ${trip.time}</div>
          </div>
          <div style="text-align: right;">
            <div style="color: var(--white); font-weight: 600;">${trip.price}</div>
            <div style="color: var(--malachite); font-size: 12px; text-transform: capitalize;">${trip.status}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  getSafetyContent() {
    return `
      <div style="padding: 20px 0;">
        <h1 style="font-family: var(--font-head); font-size: 28px; font-weight: 600; color: var(--white); margin-bottom: 24px;">
          Safety Center
        </h1>
        
        <div style="background: var(--malachite-bg); border: 1px solid var(--malachite-border); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div style="width: 40px; height: 40px; background: var(--malachite); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div style="color: var(--white); font-weight: 600;">Safety Status: Active</div>
              <div style="color: var(--malachite); font-size: 14px;">All systems operational</div>
            </div>
          </div>
        </div>
        
        <div style="space-y: 12px;">
          <div style="background: var(--surface2); border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-300)" stroke-width="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="color: var(--white); font-weight: 600; margin-bottom: 4px;">Emergency Contacts</div>
                <div style="color: var(--gray-400); font-size: 14px;">Manage your emergency contacts</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
          
          <div style="background: var(--surface2); border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-300)" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="color: var(--white); font-weight: 600; margin-bottom: 4px;">Share Trip</div>
                <div style="color: var(--gray-400); font-size: 14px;">Share your trip with trusted contacts</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
          
          <div style="background: var(--surface2); border-radius: 16px; padding: 16px; border: 1px solid var(--border-light);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-300)" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <div style="color: var(--white); font-weight: 600; margin-bottom: 4px;">24/7 Support</div>
                <div style="color: var(--gray-400); font-size: 14px;">Get help anytime, anywhere</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getProfileContent() {
    return `
      <div style="padding: 20px 0;">
        <h1 style="font-family: var(--font-head); font-size: 28px; font-weight: 600; color: var(--white); margin-bottom: 24px;">
          Account
        </h1>
        
        <div style="background: var(--surface2); border-radius: 20px; padding: 20px; margin-bottom: 24px; border: 1px solid var(--border-light);">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
            <div style="width: 60px; height: 60px; background: var(--brass-glow); border: 2px solid var(--brass-border); border-radius: 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: var(--brass-400); font-size: 24px; font-weight: 700;">A</span>
            </div>
            <div>
              <div style="color: var(--white); font-size: 20px; font-weight: 600; margin-bottom: 4px;">Alex Johnson</div>
              <div style="color: var(--gray-400); font-size: 14px;">alex.johnson@email.com</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--brass-glow); border: 1px solid var(--brass-border); border-radius: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brass-400)" stroke-width="2">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            <span style="color: var(--brass-400); font-size: 12px; font-weight: 600;">Gold Member</span>
          </div>
        </div>
        
        <div style="space-y: 12px;">
          ${this.getProfileMenuItems()}
        </div>
      </div>
    `;
  }

  getProfileMenuItems() {
    const menuItems = [
      { icon: "user", title: "Personal Information", subtitle: "Update your profile details" },
      { icon: "credit-card", title: "Payment Methods", subtitle: "Manage cards and payment options" },
      { icon: "bell", title: "Notifications", subtitle: "Customize your notification preferences" },
      { icon: "help-circle", title: "Help & Support", subtitle: "Get help and contact support" },
      { icon: "settings", title: "Settings", subtitle: "App preferences and privacy" }
    ];

    const iconPaths = {
      "user": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
      "credit-card": "M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z|M2 10h20",
      "bell": "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9|M13.73 21a2 2 0 0 1-3.46 0",
      "help-circle": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3|M12 17h.01",
      "settings": "M12.22 2h-.44a2 2 0 0 0-2 2.18l.2 1.81c-.26.06-.51.14-.75.23l-1.56-.9a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l1.56.9c-.09.24-.17.49-.23.75l-1.81.2a2 2 0 0 0-2.18 2v.44a2 2 0 0 0 2.18 2l1.81.2c.06.26.14.51.23.75l-.9 1.56a2 2 0 0 0 .73 2.73l.38.22a2 2 0 0 0 2.73-.73l.9-1.56c.24.09.49.17.75.23l.2 1.81a2 2 0 0 0 2 2.18h.44a2 2 0 0 0 2-2.18l.2-1.81c.26-.06.51-.14.75-.23l1.56.9a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-1.56-.9c.09-.24.17-.49.23-.75l1.81-.2a2 2 0 0 0 2.18-2v-.44a2 2 0 0 0-2.18-2l-1.81-.2c-.06-.26-.14-.51-.23-.75l.9-1.56a2 2 0 0 0-.73-2.73l-.38-.22a2 2 0 0 0-2.73.73l-.9 1.56c-.24-.09-.49-.17-.75-.23l-.2-1.81a2 2 0 0 0-2-2.18z|M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
    };

    return menuItems.map(item => `
      <div style="background: var(--surface2); border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 1px solid var(--border-light); cursor: pointer;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="icon-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal-300)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${iconPaths[item.icon].split('|').map(path => `<path d="${path}"/>`).join('')}
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="color: var(--white); font-weight: 600; margin-bottom: 4px;">${item.title}</div>
            <div style="color: var(--gray-400); font-size: 14px;">${item.subtitle}</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    `).join('');
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RideAssureApp();
});
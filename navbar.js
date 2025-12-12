class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background-color: #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                
                nav {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 1rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e40af;
                    display: flex;
                    align-items: center;
                }
                
                .logo-icon {
                    margin-right: 0.5rem;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                
                .nav-link {
                    color: #4b5563;
                    font-weight: 500;
                    transition: color 0.2s;
                    text-decoration: none;
                }
                
                .nav-link:hover {
                    color: #1e40af;
                }
                
                .cta-button {
                    background-color: #1e40af;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    font-weight: 500;
                    transition: background-color 0.2s;
                    text-decoration: none;
                }
                
                .cta-button:hover {
                    background-color: #1e3a8a;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                }
            </style>
            <nav>
                <a href="/" class="logo">
                    <i data-feather="zap" class="logo-icon"></i>
                    PlateGenius
                </a>
                
                <div class="nav-links">
                    <a href="/" class="nav-link">Home</a>
                    <a href="/about" class="nav-link">About</a>
                    <a href="/recipes" class="nav-link">Recipes</a>
                    <a href="/pricing" class="nav-link">Pricing</a>
                </div>
                
                <a href="/login" class="cta-button">Sign In</a>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);
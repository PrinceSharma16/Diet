class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background-color: #1f2937;
                    color: #f3f4f6;
                }
                
                footer {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                }
                
                .footer-column h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 1.25rem;
                    color: white;
                }
                
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .footer-link {
                    color: #9ca3af;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-link:hover {
                    color: white;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social-link {
                    color: #9ca3af;
                    transition: color 0.2s;
                }
                
                .social-link:hover {
                    color: white;
                }
                
                .copyright {
                    margin-top: 4rem;
                    padding-top: 2rem;
                    border-top: 1px solid #374151;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
            </style>
            <footer>
                <div class="footer-content">
                    <div class="footer-column">
                        <h3>PlateGenius</h3>
                        <p class="text-gray-400">AI-powered meal planning for optimal health and nutrition.</p>
                        <div class="social-links">
                            <a href="#" class="social-link"><i data-feather="twitter"></i></a>
                            <a href="#" class="social-link"><i data-feather="facebook"></i></a>
                            <a href="#" class="social-link"><i data-feather="instagram"></i></a>
                            <a href="#" class="social-link"><i data-feather="github"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Company</h3>
                        <div class="footer-links">
                            <a href="/about" class="footer-link">About Us</a>
                            <a href="/careers" class="footer-link">Careers</a>
                            <a href="/blog" class="footer-link">Blog</a>
                            <a href="/press" class="footer-link">Press</a>
                        </div>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Resources</h3>
                        <div class="footer-links">
                            <a href="/recipes" class="footer-link">Recipes</a>
                            <a href="/nutrition" class="footer-link">Nutrition Guide</a>
                            <a href="/faq" class="footer-link">FAQ</a>
                            <a href="/contact" class="footer-link">Contact</a>
                        </div>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Legal</h3>
                        <div class="footer-links">
                            <a href="/privacy" class="footer-link">Privacy Policy</a>
                            <a href="/terms" class="footer-link">Terms of Service</a>
                            <a href="/cookies" class="footer-link">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                
                <div class="copyright">
                    &copy; ${new Date().getFullYear()} PlateGenius. All rights reserved.
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
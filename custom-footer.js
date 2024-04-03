// Define a new custom element called 'custom-footer'
class CustomFooter extends HTMLElement {
    constructor() {
        super(); // Always call super() first in the constructor

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Create HTML structure for the custom footer
        this.shadowRoot.innerHTML = `
            <style>
                /* Define styles for the custom footer */
                :host {
                    display: block; /* Make it a block-level element */
                    background-color: #333;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }

                p {
                    margin: 0;
                    font-size: 16px;
                }
            </style>

            <!-- Custom footer content -->
            <p>&copy; 2024 My Website. All rights reserved.</p>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
class CustomHeader extends HTMLElement {
    constructor() {
        super(); 
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; 
                    background-color: #050505;
                    height: 65px;
                    color: #fff;
                    margin: 10px;
                    padding: 10px;
                    text-align: center;
                }

                h1 {
                    margin: 5px;
                    padding: 5px;
                    font-size: 24px;
                }

                p {
                    margin: 0;
                    font-size: 16px;
                }
            </style>

            <!-- Custom header content -->
            <h1>Notes App by Arsa</h1>
            <p>Welcome to my Notes App!</p>
        `;
    }
}

// Define the custom element 'custom-header'
customElements.define('custom-header', CustomHeader);

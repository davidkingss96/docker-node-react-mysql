import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <p>&copy; 2023 Your Company Name. All rights reserved.</p>
                <ul className="social-media-links">
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;

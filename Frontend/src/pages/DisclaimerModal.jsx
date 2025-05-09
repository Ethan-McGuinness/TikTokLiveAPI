import "./DisclaimerModal.css";

//Component to display the disclaimer modal

const DisclaimerModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Disclaimer</h2>
                <p>
                This tool is an independent, educational project developed without any affiliation, endorsement, or partnership with TikTok or its parent company, ByteDance.
                It is intended solely for research and demonstration purposes.
                The developers of this project do not condone or encourage the misuse of the tool in any way that would violate TikTok’s terms of service, platform guidelines, or relevant laws and regulations.
                Users are solely responsible for ensuring their use of the system complies with all applicable legal and ethical standards, including but not limited to TikTok’s policies, GDPR, and local data protection laws.
                The system has been designed to avoid data retention and discourage any form of misuse, and any actions taken beyond its intended use fall outside the responsibility of the developer.
                </p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default DisclaimerModal;

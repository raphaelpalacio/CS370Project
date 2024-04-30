/*eslint-env node*/

import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();
    
    return (
        <button className="logout-button" onClick={(e) => {e.preventDefault(); logout({ returnTo: window.location.origin });}}>
            Sign Out
        </button>
    );
};

export default LogoutButton;
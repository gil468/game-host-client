import { NavigateOptions, To, useLocation, useNavigate } from 'react-router-dom';

const useRelativeNavigate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const relativeNavigate = (to: To, options?: NavigateOptions) => {
        // Ensure the current path does not end with a slash
        const currentPath = location.pathname.replace(/\/$/, '');
        const relativePath = to.toString().replace(/^\/(?=\S)/, '');
            // Combine the current path with the new segment
        const newPath = `${currentPath}/${relativePath}`;
        // Navigate to the new path
        navigate(newPath, options);
    };

    return relativeNavigate;
};

export default useRelativeNavigate;

import { useEffect } from 'react';

export const Notification = ({ message, type, visible }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                // Notification will be removed by parent component
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <div className={`notification ${visible ? 'show' : ''} ${type}`}>
            {message}
        </div>
    );
};

export default Notification;

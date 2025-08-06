import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 4000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return AlertCircle;
      case 'warning':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  // Show welcome notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: 'success',
        message: 'Welcome to Investokid! Explore our financial tools and resources.',
        duration: 5000
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Expose addNotification globally for other components
  useEffect(() => {
    (window as any).showNotification = addNotification;
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const Icon = getIcon(notification.type);
        return (
          <div
            key={notification.id}
            className={`${getColors(notification.type)} px-6 py-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 animate-in slide-in-from-right`}
          >
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium flex-1">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationSystem;
import React from 'react';
import * as Icons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "w-5 h-5", size }: LucideIconProps) {
  // Safe mapping of icon names to components defined in lucide-react
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    // Return a default bulb/help icon to prevent visual breakage
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}

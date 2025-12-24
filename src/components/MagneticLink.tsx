"use client";

import { ReactNode } from 'react';
import Link from 'next/link';

interface MagneticLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    external?: boolean;
}

const MagneticLink = ({ href, children, className, external = false }: MagneticLinkProps) => {
    if (external) {
        return (
            <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                data-cursorvariant="hover"
            >
                {children}
            </a>
        );
    }

    return (
        <Link 
            href={href} 
            className={className}
            data-cursorvariant="hover"
        >
            {children}
        </Link>
    );
};

export default MagneticLink;

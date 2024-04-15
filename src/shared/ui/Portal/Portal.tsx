import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

export const Portal = ({
    children,
    element = document.body,
}: PortalProps): JSX.Element => createPortal(children, element);

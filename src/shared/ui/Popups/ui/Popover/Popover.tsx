import { type ReactNode, memo, type PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import { Popover as HPopover } from '@headlessui/react';
import { type DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps extends PropsWithChildren {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
}

const Popover = memo(
    ({
        className,
        trigger,
        direction = 'bottom right',
        children,
    }: PopoverProps): JSX.Element => {
        const menuClasses = [mapDirectionClass[direction]];
        return (
            <HPopover
                className={classNames(cls.Popover, {}, [
                    className,
                    popupCls.popup,
                ])}
            >
                <HPopover.Button as="div" className={popupCls.trigger}>
                    {trigger}
                </HPopover.Button>

                <HPopover.Panel
                    className={classNames(cls.panel, {}, menuClasses)}
                >
                    {children}
                </HPopover.Panel>
            </HPopover>
        );
    },
);

Popover.displayName = 'Popover';

export { Popover };

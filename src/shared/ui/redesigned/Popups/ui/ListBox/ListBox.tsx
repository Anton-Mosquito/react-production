import { Fragment, type ReactNode, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { Listbox as HListBox } from '@headlessui/react';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../../redesigned/Stack';
import { type DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: Array<ListBoxItem<T>>;
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange?: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

const ListBox = memo(
    <T extends string>({
        className,
        items,
        value,
        defaultValue,
        readonly,
        onChange,
        direction = 'top right',
        label,
    }: ListBoxProps<T>): JSX.Element => {
        const optionsClasses = [mapDirectionClass[direction], popupCls.menu];
        const selectedItem = useMemo(
            () => items?.find(item => item.value === value),
            [items, value],
        );
        return (
            <HStack gap="4">
                {label && <span>{`${label}>`}</span>}
                <HListBox
                    className={classNames(cls.ListBox, {}, [
                        className,
                        popupCls.popup,
                    ])}
                    as="div"
                    value={value}
                    onChange={onChange}
                    disabled={readonly}
                >
                    <HListBox.Button className={cls.trigger}>
                        <Button variant="filled" disabled={readonly}>
                            {selectedItem?.content ?? defaultValue}
                        </Button>
                    </HListBox.Button>
                    <HListBox.Options
                        className={classNames(cls.options, {}, optionsClasses)}
                    >
                        {items?.map(item => (
                            <HListBox.Option
                                key={item.value}
                                value={item.value}
                                disabled={item.disabled}
                                as={Fragment}
                            >
                                {({ active, selected }) => (
                                    <li
                                        className={classNames(
                                            cls.item,
                                            {
                                                [popupCls.active]: active,
                                                [popupCls.disabled]:
                                                    item.disabled,
                                                [popupCls.selected]: selected,
                                            },
                                            [],
                                        )}
                                    >
                                        {selected}
                                        {item.content}
                                    </li>
                                )}
                            </HListBox.Option>
                        ))}
                    </HListBox.Options>
                </HListBox>
            </HStack>
        );
    },
);

ListBox.displayName = 'ListBox';

export { ListBox };

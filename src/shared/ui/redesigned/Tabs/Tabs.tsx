import { type ReactNode, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, type FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

const Tabs = memo(
    ({
        className,
        tabs,
        value,
        onTabClick,
        direction = 'row',
    }: TabsProps): JSX.Element => {
        const clickHandle = useCallback(
            (tab: TabItem) => {
                return () => {
                    onTabClick(tab);
                };
            },
            [onTabClick],
        );
        return (
            <Flex
                direction={direction}
                gap="8"
                align="start"
                className={classNames(cls.Tabs, {}, [className])}
            >
                {tabs.map(tab => {
                    const isSelected = tab.value === value;
                    return (
                        <Card
                            className={classNames(
                                cls.tab,
                                { [cls.selected]: isSelected },
                                [],
                            )}
                            key={tab.value}
                            variant={isSelected ? 'light' : 'normal'}
                            onClick={clickHandle(tab)}
                            border="round"
                        >
                            {tab.content}
                        </Card>
                    );
                })}
            </Flex>
        );
    },
);

Tabs.displayName = 'Tabs';

export { Tabs };

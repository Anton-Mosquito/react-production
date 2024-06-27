import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import {
    Button as DeprecatedButton,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeature } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeature({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeature({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

const ArticleViewSelector = memo(
    ({
        className,
        view,
        onViewClick,
    }: ArticleViewSelectorProps): JSX.Element => {
        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        className={classNames(
                            cls.ArticleViewSelectorRedesigned,
                            {},
                            [className],
                        )}
                    >
                        <HStack gap="8">
                            {viewTypes.map(viewType => (
                                <Icon
                                    key={viewType.view}
                                    className={classNames(
                                        '',
                                        {
                                            [cls.notSelected]:
                                                viewType.view !== view,
                                        },
                                        [],
                                    )}
                                    Svg={viewType.icon}
                                    clickable
                                    onClick={onClick(viewType.view)}
                                />
                            ))}
                        </HStack>
                    </Card>
                }
                off={
                    <div
                        className={classNames(cls.ArticleViewSelector, {}, [
                            className,
                        ])}
                    >
                        {viewTypes.map(viewType => (
                            <DeprecatedButton
                                theme={ThemeButton.CLEAR}
                                key={viewType.view}
                                onClick={onClick(viewType.view)}
                            >
                                <DeprecatedIcon
                                    className={classNames(
                                        '',
                                        {
                                            [cls.notSelected]:
                                                viewType.view !== view,
                                        },
                                        [],
                                    )}
                                    Svg={viewType.icon}
                                    width={24}
                                    height={24}
                                />
                            </DeprecatedButton>
                        ))}
                    </div>
                }
            />
        );
    },
);

ArticleViewSelector.displayName = 'ArticleViewSelector';

export { ArticleViewSelector };

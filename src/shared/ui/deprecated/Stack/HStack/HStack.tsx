import { Flex, type FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Устарелб используем новие компоненти из папки redesigned
 * @deprecated
 */
export const HStack = (props: HStackProps): JSX.Element => {
    return <Flex direction={'row'} {...props} />;
};

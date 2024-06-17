import { Flex, type FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/**
 * Устарелб используем новие компоненти из папки redesigned
 * @deprecated
 */
export const VStack = (props: VStackProps): JSX.Element => {
    const { align = 'start' } = props;
    return <Flex {...props} direction={'column'} align={align} />;
};

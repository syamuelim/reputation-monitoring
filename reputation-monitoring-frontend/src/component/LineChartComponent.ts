import { Circle } from 'react-native-svg'

interface DecoratorProps {
    x: (arg: number) => number
    y: (arg: number) => number
    data: number[]
}

export const Dots = (props: Partial<DecoratorProps>) => {
    const { x, y, data } = props as DecoratorProps
    return (
        <>
            {data?.map((value, index) => (
                <Circle
                    key={index}
                    cx={x(index)}
                    cy={y(value)}
                    r={4}
                    stroke={'rgb(0, 0, 0)'}
                    fill={'white'}
                />
            ))}
        </>
    )
}
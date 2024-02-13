interface DecoratorProps {
    x: any
    y: any
    combinedData: {
        data: number[]
        svg: {
            stroke: string
            strokeWidth: number
        }
    }[]
}

const min = 1
const max = 10000000

const uniqueKey = (index: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min + index
}

export const MultipleLinesChartDecorator = (props: Partial<DecoratorProps>) => {
    const { x, y, combinedData } = props as DecoratorProps

    return (
        <>
            {combinedData &&
            combinedData.map((item, index) => {
                return (
                    <Svg key={uniqueKey(index)}>
                        {item.data.map((value, index) => (
                            <Circle
                                key={uniqueKey(index)}
                                cx={x(index)}
                                cy={y(value)}
                                r={2.5}
                                stroke={'rgb(0, 0, 0)'}
                                fill={'white'}
                            />
                        ))}
                    </Svg>
                )
            })}
        </>
    )
}
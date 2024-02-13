import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Grid, YAxis,XAxis } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import { View } from 'react-native'

class DecoratorExample extends React.PureComponent {

    render() {

        const data = [{
            data: [
                132, 147, 132, 137, 164,
            ],
            svg: { stroke: 'purple' },
        },
        {
            data: [
                122, 197, 232, 237, 264,
            ],
            svg: { stroke: 'green' },
        }]



        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                value.data.map((value, index) => <Circle
                    key={index}
                    cx={x(index)}
                    cy={y(value)}
                    r={4}
                    stroke={'rgb(134, 65, 244)'}
                    fill={'white'}
                />)
            ))
        }
    const verticalContentInset = { top: 40, bottom: 40 };


        const Line = ({ line }) => (
            <Path
                d={line}
                stroke={'rgba(134, 65, 244)'}
                fill={'none'}
            />
        )

        return (
            < View>
                <View>
                    <View>
                        <LineChart
                            style={{ height: 200 }}
                            data={data}
                            contentInset={{ top: 20, bottom: 30 }}
                        >
                            <Grid />
                            <Line />
                            <Decorator />
                        </LineChart>

                    </View>
                    <YAxis
                        style={{ width: 130 }}
                        data={data[0].data}
                        contentInset={verticalContentInset}
                        svg={{ fontSize: 20, fill: '#617485' }}
                    />
                </View>
            </View>
        )
    }

}

export default DecoratorExample
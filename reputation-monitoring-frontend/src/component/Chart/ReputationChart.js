import React, { useEffect, useRef, useState } from 'react';
// import * as React from 'react'
import {
    PanResponder,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import {
    Circle,
    Defs,
    G,
    Line,
    LinearGradient,
    Path,
    Rect,
    Stop,
    Svg,
    Text as SvgText,
} from 'react-native-svg';
import * as shape from 'd3-shape';

export default ReputationChart;

function ReputationChart() {
    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        if (width > 750) {
            return size;
        }
        return (width / 750) * size;
    };

    const [dateList, setDateList] = useState([
        '15:09',
        '15:10',
        '15:11',
        '15:12',
        '15:13',
    ]);

    const Line = ({ line }) => (
        <Path
            d={line}
            stroke={'rgba(134, 65, 244)'}
            fill={'none'}
        />
    )

    const [priceList, setPriceList] = useState([{
        data: [
            132,
            147,
            132,
            137,
            164,
        ],
        svg: { stroke: 'purple' },
    },
    {
        data: [
            122,
            197,
            232,
            237,
            264,
        ],
        svg: { stroke: 'green' },
    }]);

    const verticalContentInset = { top: apx(40), bottom: apx(40) };

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

    return (
        <View
            style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    width: apx(750),
                    height: apx(570),
                    alignSelf: 'center',
                }}>
                <View style={{ flex: 1 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={priceList}
                        // curve={shape.curveMonotoneX} curve line
                        contentInset={{ ...verticalContentInset }}
                        animate
                        svg={{ fill: 'url(#gradient)' }}>
                        <Grid />
                        <Decorator />
                    </LineChart>
                </View>

                <YAxis
                    style={{ width: apx(130) }}
                    data={priceList[0].data}
                    contentInset={verticalContentInset}
                    svg={{ fontSize: apx(20), fill: '#617485' }}
                />
            </View>
            <XAxis
                style={{
                    alignSelf: 'center',
                    // marginTop: apx(57),
                    width: apx(750),
                    height: apx(60),
                }}
                numberOfTicks={7}
                data={priceList[0].data}
                formatLabel={(value, index) => dateList[value]}
                contentInset={{
                    left: apx(36),
                    right: apx(130),
                }}
                svg={{
                    fontSize: apx(20),
                    fill: '#617485',
                    y: apx(20),
                }}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        display: "flex",
        backgroundColor: "white",
    },
});
import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { height, width } from 'react-native-dimension';
import { colors } from '../../services';

export default LineChartPrimary = ({ data, labels, chartHeight, chartWidth, ...props }) => {
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        //color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        color: (opacity = 1) => colors.appBgColor4,
        // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        propsForDots: {
            r: "4",
            fill: colors.appBgColor1,
            strokeWidth: "3",
            stroke: colors.appColor1
        }
    };
    const chartData = {
        labels: labels || ["1D", "4W", "3M", "5M", "8M", "1Y"],
        datasets: [
            {
                data: data || [5000, 7000, 6000, 8000, 9900, 4300],
                //color: (opacity = 1) => colors.appColor1+((opacity)*100), // optional
                color: (opacity = 1) => colors.appColor1, // optional
                //color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        //legend: ["Rainy Days"] // optional
    };
    return (
        <LineChart
            data={chartData}
            width={chartWidth || width(80)}
            height={chartHeight || height(25)}
            chartConfig={chartConfig}
            //yAxisLabel="$"
            //yAxisSuffix="k"
            //yAxisInterval={2}
            //withHorizontalLines={false}
            //bezier
            // style={{
            //     marginVertical: 10,
            //     borderRadius: 16,
            // }}
            {...props}
        />
    )
}
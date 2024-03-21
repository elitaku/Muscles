import { View, Dimensions } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 20 - 75;

const UserSalesChart = ({ inStock = 0, outOfStock = 0 }) => {
    const data = [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
    ];

    const chartConfig = {
        // backgroundGradientFrom: "#fb8c00",
        // backgroundGradientTo: "#ffa726",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };

    return (
        <View >
            {/* <PieChart
                data={data}
                width={screenWidth}
                height={150}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={colors.color3}
                absolute
            /> */}
            <BarChart
                data={{
                    labels: ["January", "February", "March", "April"],
                    datasets: [
                        {data}
                    ]
                }}
                width={screenWidth}
                height={180}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                absolute
                bezier
            />
        </View>
    );
};

export default UserSalesChart;
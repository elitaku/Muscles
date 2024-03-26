import { View, Dimensions, Text } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 20 - 75;

const getMonthName = (monthNumber) => {
    const date = new Date(0);
    date.setMonth(monthNumber);
    return date.toLocaleString('default', { month: 'long' });
  };

const MonthlySalesChart = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: "rgb(45,45,45)",
    backgroundGradientTo: "rgb(45,45,45)",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(208, 0, 141, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.primary
    }
  };

  // Check if data and data.ordersCountByProduct are defined and an array before trying to map over it
  const transformedData = data && Array.isArray(data.ordersSumByMonth) ? data.ordersSumByMonth.map(item => item.totalAmount) : [];
  const labels = data && Array.isArray(data.ordersSumByMonth)
    ? data.ordersSumByMonth.map(item => getMonthName(item._id - 1)) // Subtract 1 because month numbers start from 0 in JavaScript Date
    : [];
  
  // console.log(data)
  if (!transformedData.length) {
    return <Text>No orders to display</Text>;
  }
  
  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {data: transformedData}
          ]
        }}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        bezier
      />
    </View>
  );
};

export default MonthlySalesChart;
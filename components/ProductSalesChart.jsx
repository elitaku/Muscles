import { View, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 20 - 75;

const ProductSalesChart = ({ data }) => {
    
    if (!data || !data.productsCountByCategory || !Array.isArray(data.productsCountByCategory)) {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        );
      }
    
      function getRandomColorComplimentaryToRedAndBlack() {
        const red = Math.floor(Math.random() * (256 - 200) + 200); // High red value
        const green = Math.floor(Math.random() * 100); // Low green value
        const blue = Math.floor(Math.random() * 100); // Low blue value
        return `rgb(${red}, ${green}, ${blue})`;
      }
      
      const chartData = data.productsCountByCategory.map((item, index) => ({
        name: item._id,
        population: item.count,
        color: getRandomColorComplimentaryToRedAndBlack(),
        legendFontColor: colors.color2,
      }));

    // console.log(data);
    
    const chartConfig = {
        backgroundGradientFrom: colors.color1,
        backgroundGradientTo: colors.color2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        decimalPlaces: 0,
      };

    return (
        <View>
            <PieChart
                data={chartData}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                // backgroundColor={colors.color3}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
                
            />
        </View>
    );
};

export default ProductSalesChart;
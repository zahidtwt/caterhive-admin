import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";

// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

// project imports
import SkeletonTotalGrowthBarChart from "../../../ui-component/cards/Skeleton/TotalGrowthBarChart";
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";

// chart data
import chartData from "./chart-data/total-growth-bar-chart";
import { getOwnOrder } from "../../../services/order";

const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [yearOrderData, setyearOrderData] = useState(null);

  const [value, setValue] = useState("today");
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
    }

    // console.log("growthChartData", chartData);

    const fetchData = async () => {
      try {
        const data = await getOwnOrder();
        console.log(data);

        const currentYearOrderData = { ...chartData };
        console.log(currentYearOrderData);
        const deliveredOrders = Array(12).fill(0);
        const notDeliveredOrders = Array(12).fill(0);

        data.forEach((order) => {
          console.log(order);
          const orderDate = new Date(order.orderedAt);
          const monthIdx = orderDate.getMonth();
          if (order.orderStatus === "delivered") {
            deliveredOrders[monthIdx]++;
          } else {
            notDeliveredOrders[monthIdx]++;
          }
        });

        currentYearOrderData.series[0].data = deliveredOrders;
        currentYearOrderData.series[1].data = notDeliveredOrders;

        setyearOrderData(currentYearOrderData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [
    navType,
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500,
  ]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Growth</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">$2,324.00</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {yearOrderData && <Chart {...yearOrderData} />}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarChart;

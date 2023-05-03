import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Card, Grid, Typography } from "@mui/material";

// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

// project imports
import chartData from "./chart-data/bajaj-area-chart";
import { getOwnOrder } from "../../../services/order";
import { getAllMenus } from "../../../services/menu";

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
  const [menusData, setMenusData] = useState(_.cloneDeep(chartData));

  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  const orangeDark = theme.palette.secondary[800];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menus = await getAllMenus();
        const currentMenusData = _.cloneDeep(chartData);
        const count = {};
        menus.forEach((menu) => {
          if (count[menu.title]) count[menu.title] += 1;
          else count[menu.title] = 1;
        });
        const currentLabels = [];
        const currentSeries = [];
        for (let key of Object.keys(count)) {
          currentLabels.push(key);
          currentSeries.push(count[key]);
        }
        currentMenusData.options.labels = currentLabels;
        currentMenusData.series = currentSeries;
        const newSupportChart = {
          ...currentMenusData.options,
          colors: [orangeDark],
          tooltip: {
            theme: "light",
          },
        };
        ApexCharts.exec(`support-chart`, "updateOptions", newSupportChart);

        setMenusData(currentMenusData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navType, orangeDark]);

  return (
    <Card sx={{ bgcolor: "secondary.light" }}>
      {/* <Grid container sx={{ p: 2, pb: 0, color: "#fff" }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.secondary.dark }}
              >
                Bajaj Finery
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                $1839.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.grey[800] }}
          >
            10% Profit
          </Typography>
        </Grid>
      </Grid> */}
      {menusData && <Chart {...menusData} />}
    </Card>
  );
};

export default BajajAreaChartCard;

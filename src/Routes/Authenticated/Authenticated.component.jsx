import { lazy } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import DayMenuPage from "../../pages/DayMenu/DayMenu.page";
import EventMenuPage from "../../pages/EventMenu/EventMenu.page";
import EventServicePage from "../../pages/EventService/EventService.page";
import FoodItemsPage from "../../pages/FoodItems/FoodItems.page";
import MenuPage from "../../pages/Menu/Menu.page";
import OrderPage from "../../pages/Order/Order.page";
import RoutineMenuPage from "../../pages/RoutineMenu/RoutineMenu.page";
import CustomButton from "./../../components/common/CustomButton/CustomButton.component";
import Dashboard from "../../pages/Dashboard/Dashboard.page";
import Loadable from "../../ui-component/Loadable";

const DashboardDefault = Loadable(
  lazy(() => import("../../views/dashboard/Default"))
);

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Authenticated() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routes = [
    // {
    //   label: 'home',
    //   path: '/',
    //   element: <div>Auth</div>,
    // },
    { label: "Dashboard", path: "/", element: <DashboardDefault /> },
    // { label: "Dashboard", path: "/dashboard", element: <DashboardDefault /> },
    { label: "food items", path: "/foodItems", element: <FoodItemsPage /> },
    { label: "menus", path: "/menus", element: <MenuPage /> },
    {
      label: "event menus",
      path: "/eventMenus",
      element: <EventMenuPage />,
    },
    { label: "day menus", path: "/dayMenus", element: <DayMenuPage /> },
    { label: "orders", path: "/orders", element: <OrderPage /> },
    {
      label: "routine menus",
      path: "/routineMenus",
      element: <RoutineMenuPage />,
    },
    {
      label: "event service",
      path: "/eventService",
      element: <EventServicePage />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ color: "#fff", mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ color: "#fff" }}
            noWrap
            component="div"
          >
            CaterHive Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon color="#fff" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {routes.map((route, index) => (
            <Link key={route.path} to={route.path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={route.label}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem disablePadding>
            <CustomButton
              variant="contained"
              sx={{
                margin: "2rem",
              }}
              label={"logout"}
              handleClick={() => {
                localStorage.removeItem("token");
                document.location = "/";
              }}
            />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div className="container">
          <Routes>
            {routes.map((route) => {
              const { path, element } = route;
              return <Route key={path} path={path} element={element} />;
            })}
            <Route path="/*" element={<Navigate to={"/"} />} />
          </Routes>
        </div>
      </Main>
    </Box>
  );
}

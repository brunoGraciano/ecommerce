import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import NotFound from "../NotFound/NotFound";
import Products from "../Products/Products";
import { Route, Switch } from "react-router-dom";
import ProductPage from "../ProductPage/ProductPage";
import Users from "../Users/Users";
import EditUser from "../EditUser/EditUser";
import CreateProduct from "../CreateProduct/CreateProduct";
import Categorization from "../Categorization/Categorization";
import Orders from "../Orders/Orders";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Footer from "../Footer/Footer";
import EditProduct from "../EditProduct/EditProduct";
import Home from "../Home/Home";

export default function Layout() {
  return (
    <React.Fragment>
      <Route path="/" component={Toolbar} />
      <Switch>
        <Route path="/orders" component={Orders} />
        <PrivateRoute path="/user" component={EditUser} />
        <PrivateRoute path="/secure/users" component={Users} />
        <PrivateRoute
          path="/secure/categorization"
          component={Categorization}
        />
        <PrivateRoute path="/secure/products" component={CreateProduct} />
        <PrivateRoute path="/edit-product/:product" component={EditProduct} />
        <Route path="/:categories/:subcategories/:id" component={ProductPage} />
        <Route path="/:categories/:subcategories" component={Products} />
        <Route path="/" component={Home} exact />
        <Route component={NotFound} />
      </Switch>
      <Route path="/" component={Footer} />
    </React.Fragment>
  );
}

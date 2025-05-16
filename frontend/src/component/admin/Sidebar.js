import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.jpg";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link className="link-sidebar" to="/">
        <img src={logo} alt="HO" />
      </Link>
      <Link className="link-sidebar" to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      
        <TreeView className="link-sidebar"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem className="link-sidebar-main" nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
     
      <Link className="link-sidebar" to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link className="link-sidebar" to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link className="link-sidebar" to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      <Link className="link-sidebar" to="/admin/contact">
        <p>
          <LocalPhoneIcon />
          Contact
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;

import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

const About = () => {
  return (
    <Fragment>
      <Typography variant="h4" component="h2">
        About Currency Converter
      </Typography>
      <Typography variant="body2" component="p">
        Surprsingly... it converts currencies!
      </Typography>
    </Fragment>
  );
};

export default About;

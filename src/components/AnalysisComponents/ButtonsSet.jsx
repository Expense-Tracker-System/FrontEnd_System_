import React from "react";
import { Button } from "react-bootstrap";
import MulChartLine from "./MulChartLine";

function ButtonsSet() {
  return (
    <div className="col-12 col-md-7">
      <div className=" bg-info d-flex justify-content-around align-items-center p-4 bg-white border border-secoundary shadow-sm ">
        <div>
          <Button className="mx-2 bg-primary">Fillter</Button>
          <Button className="mx-2 bg-primary">Remmeber</Button>
          <Button className="mx-2 bg-primary">Details</Button>
          <Button className="bg-success">Save</Button>
        </div>
      </div>
      <MulChartLine />
    </div>
  );
}

export default ButtonsSet;

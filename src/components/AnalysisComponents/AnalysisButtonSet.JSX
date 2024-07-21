import React from "react";
import { Button } from "react-bootstrap";
function AnalysisButtonSet() {
  return (
    <div className="row">
      <div className="d-flex justify-content-end  align-items-center p-3 bg-white border border-secoundary shadow-sm ">
        <div className="">
          <Button className="mx-2 bg-primary">View Elicitation</Button>
          <Button className="mx-2 bg-success">View Limitation</Button>
          <Button className="mx-2 bg-success">View Comparision</Button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisButtonSet;

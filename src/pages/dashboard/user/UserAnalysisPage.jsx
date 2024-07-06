import React from "react";
import Linechart from "../../../components/AnalysisComponents/LineChart.jsx";
import PieChart from "../../../components/AnalysisComponents/PieChart";
import MultiColorProgressBar from "../../../components/AnalysisComponents/MultiColorProgressBar";
import LinechartE from "../../../components/AnalysisComponents/LinechartE";
import PieChartIncom from "../../../components/AnalysisComponents/PieChartIncom";
import PieChartExpense from "../../../components/AnalysisComponents/PieChartExpense";
import { Button } from "react-bootstrap";
import MulChartLine from "../../../components/AnalysisComponents/MulChartLine";
import ButtonsSet from "../../../components/AnalysisComponents/ButtonsSet";
import AnalysisButtonSet from "../../../components/AnalysisComponents/AnalysisButtonSet";

function Analysis() {
  return (
    <div className="pageTemplate2">
      <div className="container-fluid">
        <div className="w-100 ">
          <AnalysisButtonSet />
        </div>

        <div className="row">
          <div className="col-12 col-md-8 p-3">
            <Linechart />
          </div>

          <div className="col-12 col-md-4 p-3">
            <PieChartIncom />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-8 p-3">
            <LinechartE />
          </div>

          <div className="col-12 col-md-4 p-3">
            <PieChartExpense />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-5">
            <MultiColorProgressBar />
          </div>
          <ButtonsSet />
        </div>
      </div>
    </div>
  );
}

export default Analysis;

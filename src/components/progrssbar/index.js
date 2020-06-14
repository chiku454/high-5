import React from "react";
import "./style.css";

const Filler = props => (
    <div
        className="fillerBarFromCreateBudget"
        style={{
            width:
                parseFloat(props.width) === 100
                    ? `${parseFloat(props.width)}%`
                    : `${parseFloat(props.width) + 1}%`
        }}
    ></div>
);

const FillerForReports = props => (
    <div className="fillerBarReports">
        <div
            className={
                props.type === "fromReportHeader"
                    ? "approvedAmount"
                    : "approvedAmount isFromDialogViewBorder"
            }
            style={{
                width: `${props.approvedWidth}%`,
                borderRadius: props.approvedWidth >= 100 ? "10px" : "10px 0px 0px 10px"
            }}
        ></div>
        <div
            className="pendingAmount"
            style={{
                width: `${props.pendingWidth}%`,
                borderRadius:
                    props.pendingWidth <= 100 && props.pendingWidth >= 1
                        ? props.approvedWidth <= 100 && props.approvedWidth >= 1
                            ? "0px"
                            : "10px 0px 0px 10px"
                        : "10px 0px 0px 10px"
            }}
        ></div>
        <div
            className={
                props.type === "fromReportHeader"
                    ? "avilableAmount"
                    : "avilableAmount isFromDialogViewBorder"
            }
            style={{
                width: `${props.availableWidth}%`,
                borderRadius:
                    props.availableWidth >= 100
                        ? props.availableWidth == 100 && props.pendingWidth == 1
                            ? "0px 10px 10px 0px"
                            : "10px"
                        : "0px 10px 10px 0px"
            }}
        ></div>
    </div>
);

const FillerForOverAllStates = props => (
    <div className="fillerBarReports" style={{ height: "10px" }}>
        <div
            className={
                props.type === "fromReportHeader"
                    ? "approvedAmount"
                    : "approvedAmount isFromDialogViewBorder"
            }
            style={{
                width: `${props.approvedWidth}%`,
                borderRadius: props.approvedWidth >= 100 ? "10px" : "10px 0px 0px 10px"
            }}
        ></div>
        <div
            className="pendingAmount"
            style={{
                width: `${props.pendingWidth}%`,
                borderRadius:
                    props.pendingWidth <= 100 && props.pendingWidth >= 1
                        ? props.approvedWidth <= 100 && props.approvedWidth >= 1
                            ? "0px"
                            : "10px 0px 0px 10px"
                        : "10px 0px 0px 10px"
            }}
        ></div>
        <div
            className={
                props.type === "fromReportHeader"
                    ? "avilableAmount"
                    : "avilableAmount isFromDialogViewBorder"
            }
            style={{
                width: `${props.availableWidth}%`,
                borderRadius:
                    props.availableWidth >= 100
                        ? props.availableWidth == 100 && props.pendingWidth == 1
                            ? "0px 10px 10px 0px"
                            : "10px"
                        : "0px 10px 10px 0px"
            }}
        ></div>
    </div>
);
function CalculateFillerWidth(props) {
    const curr = props.allocatedLimit;
    const total = props.totalLimit;
    let percentCal = 0;
    let fillerLength = 0;
    let calculatedPixels = "0px";
    if (curr === 0) {
        percentCal = 0;
    } else {
        percentCal = curr / total;
    }
    fillerLength = percentCal * 100;
    if (fillerLength >= 100) {
        fillerLength = 100;
    }
    calculatedPixels = `${Math.ceil(fillerLength)}`;
    return calculatedPixels;
}

function CalculateFillerWidthForReports(props, tempAmt) {
    const curr = tempAmt;
    const total = props.availableAmt + props.pendingAmt + props.approvedAmt;
    let percentCal = 0;
    let fillerLength = 0;
    let calculatedPixels = "0px";
    if (curr === 0) {
        percentCal = 0;
    } else {
        percentCal = curr / total;
    }
    fillerLength = percentCal * 100;
    if (fillerLength >= 100) {
        fillerLength = 100;
    }
    calculatedPixels = `${Math.ceil(fillerLength)}`;
    return calculatedPixels;
}

const renderProgress = props => {
    const calulateWidth = CalculateFillerWidth(props);
            return (
                <div className="barParent">
                    <div className="barInfoDiv">
                        <div className="leftInfoDiv" style={{marginLeft: '8rem'}}>
                            <div className="variableLeftSide">
                                
                                {props.currencyCode} {parseFloat(props.allocatedLimit)}
                            </div>
                            <div className="fixLeftSide lable-color">Allocated Limit</div>

                        </div>
                        <div className="rightInfoDiv" style={{marginLeft: '29rem'}}>
                           
                            <div className="variablePerContent" style={{ color: "rgb(41, 124, 191)" }}>
                                {props.currencyCode} {parseFloat(props.totalLimit)}
                            </div>
                            <div className="fixPerContent lable-color">
                            Total Limit
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <div className="completionBar">
                            <Filler width={calulateWidth} />
                            <div
                                className="fillerBarFromCreateBudget nonFillerBarFromCreateBudget"
                                style={{
                                    // width: `${100 - parseFloat(calulateWidth)}%`,
                                    float: "right"
                                }}
                            ></div>
                        </div>
                        {/* <div className="complitionLeftBar">
                            <div className="lable-color">Total Budget:</div>
                            <div style={{ fontWeight: "bold" }}>
                                {props.currencyCode}{" "}
                                {parseFloat(props.allocatedAmount) +
                                    parseFloat(props.availableAmount)}{" "}
                            </div>
                        </div> */}
                    </div>
                </div>
            );
};

const ProgessBar = props => {
    return renderProgress(props);
};

export default ProgessBar;

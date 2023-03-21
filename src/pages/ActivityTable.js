import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  Search,
  PdfExport,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import baseURL from "../baseURL";
import { useStateContext } from "../contexts/ContextProvider";

const ActivityTable = () => {
  const [loader, setLoader] = useState(true);
  const { currentColor } = useStateContext();
  const [data, setData] = useState([]);

  useEffect(()=>{
   
    if(loader) { return }
 
    let grid =document.querySelector('.e-grid');

  
    grid.classList.add(`${currentColor==="#1A97F5"?"blue-theme":currentColor==="#03C9D7"?"green-theme":currentColor==="#7352FF"?"purple-theme":currentColor==="#FF5C8E"?"red-theme":currentColor==="#1E4DB7"?"indigo-theme":"orange-theme"}`)

  },[loader])

  async function fetchActivites() {
    try {
      let API = await fetch(`${baseURL}/all`, {
        headers: { Authorization: sessionStorage.getItem("token") },
      });
      API = await API.json();

      if (API.success) {
        setData(() => {
          return API.message.map((elm) => {
            return { ...elm, date: new Date(elm.date.substring(0, 16)) };
          });
        });
        setLoader(false);
      } else {
        toast.error(API.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchActivites();
  }, []);

  const toolbarClick = (args) => {
    if (grids && args.item.id === "grids_excelexport") {
      grids.excelExport();
    }

    if (grids && args.item.id === "grids_pdfexport") {
      const exportProperties = {
        pageOrientation: "Landscape",
        pageSize: "A1",
      };
      grids.pdfExport(exportProperties);
    }
  };

  const dateFormat = (props) => {
    let formatedDate = props.date.toString();
    formatedDate = formatedDate.substring(0, 15);
    return <p>{formatedDate}</p>;
  };

  const location = (props) => {
    return props.location.location
    
  }

  let grid = [
    {
      field: "date",
      textAlign: "Center",
      headerText: "Date",
      template: dateFormat,
      width: "150",
      FontAttributes: "Bold",
      TextColor: "Black",
      BackgroundColor: "Gray",
    },
    {
      field: "activity",
      textAlign: "Center",
      headerText: "Activity",
      width: "150",
      FontAttributes: "Bold",
      TextColor: "Black",
      BackgroundColor: "Gray",
    },
    {
      field: "time",
      textAlign: "Center",
      headerText: "Time",
      width: "150",
      FontAttributes: "Bold",
      TextColor: "Black",
      BackgroundColor: "Gray",
    },
    {
      field: "location",
      textAlign: "Center",
      headerText: "Location",
      width: "150",
      FontAttributes: "Bold",
      TextColor: "Black",
      BackgroundColor: "Gray",
    },
    {
      field:"status",
      textAlign: "Center",
      headerText: "Status",
      width: "150",
      FontAttributes: "Bold",
      TextColor: "Black",
      BackgroundColor: "Gray",
    },
  ];

  let grids;

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Activity Table" />
      {loader ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: currentColor }} />
        </div>
      ) : (
        <GridComponent
          toolbarClick={toolbarClick}
          className="dffdd"
          ref={(g) => (grids = g)}
          id="grids"
          filterSettings={{ ignoreAccent: true, type: "Excel" }}
          allowTextWrap={true}
          dataSource={data}
          allowExcelExport={true}
          allowPdfExport={true}
          pageSettings={{ pageSize: 10 }}
          toolbar={["Search", "ExcelExport", "PdfExport"]}
          width="auto"
          allowSorting
          allowFiltering
          allowPaging
        >
          <ColumnsDirective>
            {grid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Search,
              Toolbar,
              Selection,
              Filter,
              Edit,
              Sort,
              PdfExport,
              ExcelExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export default ActivityTable;

import React, { useEffect } from "react";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import baseURL from "../baseURL";
import { Header } from "../components";
import * as XLSX from "xlsx";
import { useStateContext } from "../contexts/ContextProvider";
import ChartPie from "../components/ChartPie";
import { getLocation } from "../controllers/apiController";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ActivityChart = () => {
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [view, setView] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [menuItem, setMenuItem] = useState([]);
  const [menuLoader, setMenuLoader] = useState(true);
  const [wasteIncinerated, setWasteIncinerated] = useState(0)
  const { currentColor } = useStateContext();

  React.useEffect(async () => {
    let resp = await getLocation(sessionStorage.getItem("token"));
    if (resp) {
      setMenuItem(resp);
      setMenuLoader(false);
    }
  }, []);

  async function fetchActivites() {
    setLoader(true);

    try {
      let API = await fetch(
        `${baseURL}/getActivity?date=${date}&status=${status}&location=${location}`,
        {
          headers: {
            Authorization: `${sessionStorage.getItem("token")}`,
          },
        }
      );

      API = await API.json();

      if (API?.success) {
        setData(API.message);
        setWasteIncinerated(API.wasteIncinerated)
      } else {
        toast.error(API.message);
      }

      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (date === "") {
      return;
    }

    fetchActivites();
  }, [date, location, status]);

  function handleLocation(e) {
    let singleLocation = menuItem.find(
      (item) => item.location === e.target.value
    );
    setView(singleLocation.location);
    setLocation(singleLocation._id);
  }

  function exportDataToExcle() {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LineChartData");

    XLSX.writeFile(wb, "pieChart.xlsx");
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Activity Chart" />
      <div className="flex justify-around flex-wrap items-center">
        <TextField
          className="date flex-[0.3]"
          style={{ margin: "20px 0" }}
          label="date"
          id="standard-basic date"
          onChange={(e) => setDate(e.target.value)}
          name="date"
          type="date"
          variant="standard"
        />
        <div className="flex-[0.3]">
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            className="w-full"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="location"
            required
            value={view}
            label="Location"
            onChange={handleLocation}
          >
            {!menuLoader
              ? menuItem.map((elm, ind) => (
                  <MenuItem key={ind} value={elm.location}>
                    {elm.location}
                  </MenuItem>
                ))
              : null}
          </Select>
        </div>
        <div className="flex-[0.3]">
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            className="w-full"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="location"
            required
            value={status}
            label="Location"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={"operational"}>operational</MenuItem>
            <MenuItem value={"non operational"}>non operational</MenuItem>
            <MenuItem value={"finished"}>Finished</MenuItem>
            <MenuItem value={"not finished"}>Not Finished</MenuItem>
          </Select>
        </div>
      </div>
        <div className="flex ml-6">
        <TextField type="number" label="Waste Incinerated KG" disable value={wasteIncinerated} />
      <Button
        onClick={() => {
          setLocation("");
          setStatus("");
          setView("");
        }}
        sx={{ marginLeft: "15px" }}
      >
        Clear Filters
      </Button>
      <Button onClick={exportDataToExcle} style={{ marginLeft: "20px" }}>
        Export Pie Chart Data
      </Button>
        </div>
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
      ) : date !== "" ? (
        <ChartPie data={data} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ActivityChart;

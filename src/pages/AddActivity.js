import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import baseURL from "../baseURL";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { getLocation } from "../controllers/apiController";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const AddActivity = () => {
  const [loader, setLoader] = useState(false);
  const { currentColor } = useStateContext();
  const [menuItem, setMenuItem] = useState([]);
  const [location, setLocation] = useState("");
  const [menuLoader, setMenuLoader] = useState(true);
  const [data, setData] = useState({
    date: undefined,
    activity: undefined,
    time: undefined,
    location: undefined,
    status: undefined,
  });

  function changeInput(e) {
    if (e.target.name === "location") {
      let location = menuItem.find((item) => item.location === e.target.value);
      setData({ ...data, [e.target.name]: location._id });
      setLocation(location.location);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    setLoader(true);
    e.preventDefault();

    if (!/^\d{2}:\d{2}$/.test(data.time)) {
      toast.error("Please add time in HH:MM format");
      return setLoader(false);
    }

    try {
      let API = await fetch(`${baseURL}/addActivity`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
        },
      });

      API = await API.json();

      if (API.success) {
        toast.success("Activity Added Successfully");
      } else {
        toast.error(API.message);
      }

      setLoader(false);
    } catch (error) {
      toast.error(error.message);
      setLoader(false);
    }
  }

  React.useEffect(async () => {
    let resp = await getLocation(sessionStorage.getItem("token"));
    if (resp) {
      setMenuItem(resp);
      setMenuLoader(false);
    }
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Add Activity" />

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
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            <TextField
              className="flex-[0.4] date"
              style={{ margin: "20px 0" }}
              label="date"
              id="standard-basic date"
              onChange={changeInput}
              value={data.date}
              name="date"
              required
              type="date"
              variant="standard"
            />
            <TextField
            value={data.activity}
              className="flex-[0.4]"
              id="standard-basic"
              style={{ marginTop: "20px" }}
              onChange={changeInput}
              name="activity"
              required
              label="Activity"
              variant="standard"
            />
          </div>
          <div className="flex justify-between flex-wrap items-center">
            <TextField
            value={data.time}
              placeholder="HH:MM"
              type={"text"}
              className="flex-[0.4]"
              id="standard-basic"
              onChange={changeInput}
              name="time"
              required
              label="Time HH:MM"
              variant="standard"
              inputProps={{ maxLength: 5 }}
            />
            <div className="flex-[0.4]">
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="location"
                required
                value={location}
                label="Location"
                onChange={changeInput}
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
          </div>
          <InputLabel className="mt-4" id="demo-simple-select-label">Status</InputLabel>
          <Select
            className="w-full"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="status"
            value={data.status}
            required
            label="Location"
            onChange={changeInput}
          >
            <MenuItem value={"operational"}>operational</MenuItem>
            <MenuItem value={"non operational"}>non operational</MenuItem>
          </Select>

          <div className="flex justify-center">
            <Button
              sx={{
                marginTop: "15px",
                marginLeft: "auto",
                marginRight: "auto",
                flex: 0.4,
              }}
              type="submit"
              variant="contained"
              style={{ backgroundColor: currentColor }}
            >
              Add
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddActivity;

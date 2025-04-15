import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../context/UserauthContext";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from "../../theme";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Define common styles for disabled inputs
const disabledInputStyle = {
  backgroundColor: "#f5f5f5",
  color: "#757575",
  border: "1px solid #e0e0e0",
  cursor: "not-allowed",
};

const PersonalInfo = () => {
  const { sendRequest, user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState("");

  // Lấy dữ liệu người dùng từ API khi component mount
  useEffect(() => {
    sendRequest(0, "info");
  }, []);

  // Load dữ liệu người dùng vào form khi component mount
  useEffect(() => {
    if (user) {
      setAvatar(user.Avatar); // Load avatar from the response data
      const fieldList = [
        { name: "Name", type: "text" },
        { name: "email", type: "text" },
        { name: "Gender", type: "select" },
        { name: "DateOfBirth", type: "date" },
        { name: "PhoneNumber", type: "text" },
        { name: "Address", type: "text" },
        { name: "avatar", type: "file" },
      ];

      fieldList.forEach(({ name, type }) => {
        const element = document.getElementsByName(name)[0];
        if (element) {
          if (type === "date") {
            element.setAttribute(
              "value",
              dayjs(user[name]).format("YYYY-MM-DD")
            );
          } else if (type === "select") {
            element.value = user[name];
          } else {
            element.setAttribute("value", user[name]);
          }
        }
      });
    }
  }, [user]);

  // Gửi dữ liệu cập nhật lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...e, avatar }; // Create a separate payload object
    const successful = await sendRequest(payload, "update_info_user");
    if (successful) {
      setIsEditing(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Upload image as base64 string
      reader.onload = () => {
        setAvatar(reader.result); // Temporarily set avatar in state
      };
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar(""); // Reset avatar to default (empty string or default image URL)
  };

  const handleCancel = () => {
    if (user) {
      setAvatar(user.Avatar); // Reset avatar to the original value
      const fieldList = [
        { name: "Name", type: "text" },
        { name: "email", type: "text" },
        { name: "Gender", type: "select" },
        { name: "DateOfBirth", type: "date" },
        { name: "PhoneNumber", type: "text" },
        { name: "Address", type: "text" },
      ];
  
      fieldList.forEach(({ name, type }) => {
        const element = document.getElementsByName(name)[0];
        if (element) {
          if (type === "date") {
            element.value = dayjs(user[name]).format("YYYY-MM-DD");
          } else if (type === "select") {
            element.value = user[name];
          } else {
            element.value = user[name];
          }
        }
      });
    }
    setIsEditing(false); // Exit editing mode
  };

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        backgroundColor: "background.main",
        width: "100%",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        {/* Ảnh đại diện */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Avatar
            alt="Profile"
            src={avatar}
            sx={{
              width: 220,
              height: 220,
            }}
          />
          {isEditing && (
            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center", gap: 2 }}>
              <Button
                sx={{
                  mt: 4,
                  backgroundColor: "primary.main",
                  color: "white",
                }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              <Button
                sx={{
                  mt: 4,
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
                onClick={handleDeleteAvatar}
                variant="contained"
                startIcon={<DeleteForeverIcon/>}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>

        {/* Thông tin cá nhân */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            p: 3,
            mt: 2,
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Name & Email */}
            <div className="row mt-2">
              <div className="col-md-6">
                <Typography variant="h6">Name</Typography>
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  disabled={!isEditing}
                  style={{
                    height: "50px",
                    ...(!isEditing && disabledInputStyle),
                  }}
                />
              </div>
              <div className="col-md-6">
                <Typography variant="h6">Email</Typography>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  disabled={true}
                  style={{
                    height: "50px",
                    ...disabledInputStyle,
                  }}
                />
              </div>
            </div>

            {/* Gender & Date of Birth */}
            <div className="row mt-3">
              <div className="col-md-6">
                <Typography variant="h6">Gender</Typography>
                <select
                  className="form-control"
                  name="Gender"
                  disabled={!isEditing}
                  style={{
                    height: "50px",
                    borderRadius: 5 + "px",
                    padding: 8 + "px",
                    backgroundColor: "white",
                    ...(!isEditing && disabledInputStyle),
                  }}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <Typography variant="h6">Date of Birth</Typography>
                <input
                  type="date"
                  className="form-control"
                  name="DateOfBirth"
                  disabled={!isEditing}
                  style={{
                    height: "50px",
                    ...(!isEditing && disabledInputStyle),
                  }}
                />
              </div>
            </div>

            {/* Phone & Address */}
            <div className="row mt-3">
              <div className="col-md-6">
                <Typography variant="h6">Phone Number</Typography>
                <input
                  type="text"
                  className="form-control"
                  name="PhoneNumber"
                  disabled={!isEditing}
                  style={{
                    height: "50px",
                    ...(!isEditing && disabledInputStyle),
                  }}
                />
              </div>
              <div className="col-md-6">
                <Typography variant="h6">Address</Typography>
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  disabled={!isEditing}
                  style={{
                    height: "50px",
                    ...(!isEditing && disabledInputStyle),
                  }}
                />
              </div>
            </div>

            {/* Nút thao tác */}
            <div className="text-end mt-4">
              {isEditing ? (
                <>
                  <Button
                    sx={{
                      marginRight: "10px",
                      backgroundColor: "red",
                      color: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#d32f2f",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px primary.dark",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                        boxShadow: "0 2px 4px primary.dark",
                      },
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px primary.dark",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                        boxShadow: "0 2px 4px primary.dark",
                      },
                    }}
                    type="submit"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  sx={{
                    marginTop: "25px",
                    backgroundColor: "primary.main",
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px primary.dark",
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: "0 2px 4px primary.dark",
                    },
                  }}
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Information
                </Button>
              )}
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import "./newPackage.scss";
import { useState } from "react";
import { packageInputs } from "../../formSource";
import axios from "axios";
import { toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";

const NewPackage = () => {
  const [files, setFiles] = useState([]);
  const [igFiles, setIgFiles] = useState([]);
  const [info, setInfo] = useState({
    daytitle: [],
    daydesc: [],
    igpost: [],
  });

  const handleChange = (e) =>{
    const {id, value} = e.target;
    if (id === "file"){
      setFiles(Array.from(e.target.files));
    } else if (id === "igfile"){
      setIgFiles(Array.from(e.target.files));  
    } else if (id === "mainPackage"){
      setInfo((prev) => ({...prev, [id]: value === 'true'}));
    }
    else if (info[id] && Array.isArray(info[id])){
      setInfo((prev) => ({ ...prev, [id]: [...prev[id], value] }));
    } else {
      setInfo((prev) => ({...prev, [id]: value}));
    }
  };

  const handleAddArrayItem = (field) => {
    setInfo((prev) => ({...prev, [field]: [...prev[field], ""]}));
  };

  const handleRemoveArrayItem = (field, index) => {
    setInfo((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    setInfo((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const photoUrls = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/yatritourism/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const igPhotoUrls = await Promise.all(
        Object.values(igFiles).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/yatritourism/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newPackage = {
        ...info,
        photos: photoUrls,
        igphotos: igPhotoUrls,
      };

      await axios.post("/packages", newPackage);
      toast.success("Package has been added!");
    } catch (err) {
      toast.error("Fill all fields!")
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Packages</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {files.length ? (
              files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Selected file ${index + 1}`}
                />
              ))
            ) : (
              <img
                src="https://cabexindia.com/wp-content/uploads/2023/02/no-image.jpg"
                alt="No image"
              />
            )}
            <h2>IG Photos</h2>
            {igFiles.length ? (
              igFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Selected IG file ${index + 1}`}
                />
              ))
            ) : (
              <img
                src="https://cabexindia.com/wp-content/uploads/2023/02/no-image.jpg"
                alt="No image"
              />
            )}
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file"> Image:<DriveFolderUploadOutlinedIcon className="icon"/> </label>
                <input 
                  type="file" id="file" multiple
                  onChange={(e) => handleChange(e)} 
                  style={{"display": "none"}}/>
              </div>

              <div className="formInput">
                <label htmlFor="igfile"> IG Photos:<DriveFolderUploadOutlinedIcon className="icon"/> </label>
                <input 
                  type="file" id="igfile" multiple
                  onChange={(e) => handleChange(e)} 
                  style={{"display": "none"}}/>
              </div>

              {packageInputs.map((input) =>(
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                {[ "daytitle", "daydesc", "igpost"].includes(
                    input.id
                  ) ? (
                    info[input.id].map((value, index) => (
                      <div key={index}>
                        <input
                          id={input.id}
                          onChange={(e) =>
                            handleArrayChange(e, input.id, index)
                          }
                          type={input.type}
                          placeholder={`${input.placeholder} ${index + 1}`}
                          value={value}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveArrayItem(input.id, index)
                            }
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <input
                      id={input.id}
                      onChange={(e) => handleChange(e)}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  )}
                  {[ "daytitle", "daydesc", "igpost"].includes(
                    input.id
                  ) && (
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem(input.id)}
                    >
                      Add {input.label}
                    </button>
                  )}
              </div>
              ))}

              <div className="formInput">
                <label>Main Package</label>
                <select className="mainPackageSelect" id="mainPackage" onChange={handleChange}>
                  <option className="mainPackageOption" value={false}>Select</option>
                  <option className="mainPackageOption" value={false}>No</option>
                  <option className="mainPackageOption" value={true}>Yes</option>
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPackage;

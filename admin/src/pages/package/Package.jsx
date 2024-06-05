import "./package.scss";
import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePackage = () => {
  const { id } = useParams();
  const [editableRecord, setEditableRecord] = useState(null);
  const [editingEnabled, setEditingEnabled] = useState(false);
  const [files, setFiles] = useState([]);
  const [igFiles, setIgFiles] = useState([]);

  const fetchPackageDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/packages/${id}`);
      setEditableRecord(response.data);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  }, [id]);
  
  useEffect(() => {
    fetchPackageDetails();
  }, [fetchPackageDetails]);

  const handleEdit = () => {
    setEditingEnabled(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/packages/${id}`, editableRecord);
      console.log("Package updated:", response.data);
      setEditingEnabled(false);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleAddField = (field) => {
    setEditableRecord((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveField = (index, field) => {
    setEditableRecord((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleRemovePhoto = (index, field) => {
    setEditableRecord((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    setEditableRecord((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleInputChange = (e, field) => {
    const { type, checked, value } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setEditableRecord((prev) => ({
      ...prev,
      [field]: inputValue,
    }));
  };

  const handleFileChange = (e, setFileFunc) => {
    setFileFunc(Array.from(e.target.files));
  };

  const handleAddImages = async () => {
    if (files.length === 0) {
      alert("Please select photos to upload.");
      return;
    }
  
    try {
      const list = await Promise.all(
        files.map(async (file) => {
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
  
      setEditableRecord((prev) => ({
        ...prev,
        photos: [...prev.photos, ...list],
      }));
  
      setFiles([]); 
      alert("Photos uploaded successfully.");
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleAddIgPhotos = async () => {
    if (igFiles.length === 0) {
      alert("Please select IG photos to upload.");
      return;
    }
  
    try {
      const list = await Promise.all(
        igFiles.map(async (file) => {
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
  
      setEditableRecord((prev) => ({
        ...prev,
        igphotos: [...prev.igphotos, ...list],
      }));
  
      setFiles([]); 
      alert("IG photos uploaded successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="singlePackage">
            {editableRecord ? (
              <>
                <div className="photos">
                  <h3>Photos :</h3>
                  <ul>
                    {editableRecord.photos.map((photoUrl, index) => (
                      <li key={index}>
                        <img src={photoUrl} alt={`${index}`} />
                       
                        {editingEnabled && (
                          <button className="Delete" onClick={() => handleRemovePhoto(index, "photos")}>
                            Delete
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {editingEnabled && (
                    <div className="addImages">
                      <label htmlFor="imageInput">Add Images:</label>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(e, setFiles)}
                      />
                      <button className="AddFields" onClick={() => handleAddImages()}>
                        Add Selected Photos
                      </button>
                    </div>
                  )}
                </div>
                <div className="title">
                  <label htmlFor="title">Title: </label>
                  <input
                    id="title"
                    type="text"
                    value={editableRecord.title}
                    onChange={(e) => handleInputChange(e, "title")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="titleDesc">
                  <label htmlFor="titleDesc">Title Description: </label>
                  <input
                    id="titleDesc"
                    type="text"
                    value={editableRecord.titleDesc}
                    onChange={(e) => handleInputChange(e, "titleDesc")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="packagedesc">
                  <label htmlFor="packagedesc">Description: </label>
                  <input
                    id="packagedesc"
                    type="text"
                    value={editableRecord.packagedesc}
                    onChange={(e) => handleInputChange(e, "packagedesc")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="duration">
                  <label htmlFor="duration">Duration: </label>
                  <input
                    id="duration"
                    type="text"
                    value={editableRecord.duration}
                    onChange={(e) => handleInputChange(e, "duration")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="catchphrase">
                  <label htmlFor="catchphrase">Catch Phrase: </label>
                  <input
                    id="catchphrase"
                    type="text"
                    value={editableRecord.catchphrase}
                    onChange={(e) => handleInputChange(e, "catchphrase")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="destinationName">
                  <label htmlFor="destinationName">Destination: </label>
                  <input
                    id="destinationName"
                    type="text"
                    value={editableRecord.destinationName}
                    onChange={(e) => handleInputChange(e, "destinationName")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="packageType">
                  <label htmlFor="packageType">Package Type: </label>
                  <input
                    id="packageType"
                    type="text"
                    value={editableRecord.packageType}
                    onChange={(e) => handleInputChange(e, "packageType")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="price">
                  <label htmlFor="price">Price: </label>
                  <input
                    id="price"
                    type="number"
                    value={editableRecord.price}
                    onChange={(e) => handleInputChange(e, "price")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="mainPackage">
                  <label htmlFor="mainPackage">Main Package: </label>
                  <input
                    id="mainPackage"
                    type="checkbox"
                    checked={editableRecord.mainPackage}
                    onChange={(e) => handleInputChange(e, "mainPackage")}
                    disabled={!editingEnabled}
                  />
                </div>
                <div className="photos">
                  <h3>Instagram Photos :</h3>
                  <ul>
                    {editableRecord.igphotos.map((photoUrl, index) => (
                      <li key={index}>
                        <img src={photoUrl} alt={`IG ${index}`} />
                        {editingEnabled && (
                          <button className="Delete" onClick={() => handleRemovePhoto(index, "igphotos")}>
                            Delete
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {editingEnabled && (
                    <div className="addImages">
                      <label htmlFor="igImageInput">Add IG Images:</label>
                      <input
                        type="file"
                        id="igImageInput"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(e, setIgFiles)}
                      />
                      <button className="AddFields" onClick={() => handleAddIgPhotos()}>
                        Add Selected IG Photos
                      </button>
                    </div>
                  )}
                </div>
                <h2>Day Titles:</h2>
                <ul>
                  {editableRecord.daytitle.map((title, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => handleChange(e, index, "daytitle")}
                        disabled={!editingEnabled}
                      />
                      {editingEnabled && (
                        <button className="RemoveButton" onClick={() => handleRemoveField(index, "daytitle")}>
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {editingEnabled && (
                  <>
                    <button className="AddFields" onClick={() => handleAddField("daytitle")}>
                      Add Day Title
                    </button>
                  </>
                )}
                <h2>Day Descriptions:</h2>
                <ul>
                  {editableRecord.daydesc.map((desc, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => handleChange(e, index, "daydesc")}
                        disabled={!editingEnabled}
                      />
                      {editingEnabled && (
                        <button className="RemoveButton" onClick={() => handleRemoveField(index, "daydesc")}>
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {editingEnabled && (
                  <>
                    <button className="AddFields" onClick={() => handleAddField("daydesc")}>
                      Add Day Description
                    </button>
                  </>
                )}
                <h2>IG Posts:</h2>
                <ul>
                  {editableRecord.igpost.map((post, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={post}
                        onChange={(e) => handleChange(e, index, "igpost")}
                        disabled={!editingEnabled}
                      />
                      {editingEnabled && (
                        <button className="RemoveButton" onClick={() => handleRemoveField(index, "igpost")}>
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {editingEnabled && (
                  <>
                    <button className="AddFields" onClick={() => handleAddField("igpost")}>
                      Add IG Posts
                    </button>
                  </>
                )}
                <div className="editbutton">
                  {editingEnabled ? (
                    <button onClick={handleSaveChanges}>Save Changes</button>
                  ) : (
                    <button onClick={handleEdit}>Edit Package</button>
                  )}
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePackage;

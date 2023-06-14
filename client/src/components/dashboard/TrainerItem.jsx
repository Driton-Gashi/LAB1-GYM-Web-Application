import { useState } from "react";

const TrainerItem = ({videoName,videoDifficulty,videoDescription,videoURL,videoImage,videoCategory, id }) => {
  const [nI,setNI] = useState(videoName);
  const[vDiff,setVDiff] = useState(videoDifficulty);
  const[vDes,setVDes] = useState(videoDescription);
  const[vU,setVU] = useState(videoURL);
  const[vI,setVI] = useState(videoImage);
  const[vC,setVC] = useState(videoCategory);
  

const [disabled,setDisabled] = useState(true);

const handleEdit = async (videoId) => {
  try {
    const response = await fetch(`http://localhost:5000/video/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            video_name:nI,
            video_difficulity:vDiff,
            vide_description:vDes,
            vide_url:vU,
            vide_image:vI, 
            video_category:vC
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error:', error.message);
  }
};

const handleDelete = async (video_id) => {
  try {
    const response = await fetch(`http://localhost:5000/videoDelete/${video_id}`, {
      method: 'Delete'
    });
    console.log(response);
  } catch (error) {
    console.log('Error:', error.message);
  }}

  const editMode = () => {
    setDisabled(!disabled);
  };


  return (
    
    <div className="report-body-video">
<form action="" onSubmit={()=>handleEdit(id)}>
    <div className="trainer-item">
      <div className="truncate">
        <input
          className={disabled ? "truncate-input" : "truncate-input2"}
          type="text"
          value={nI}
          disabled={disabled}
          onChange={(e) => {
            setNI(e.target.value);
          }}
        />
      </div>
      <div className="truncate">
        <input
          className={disabled ? "truncate-input" : "truncate-input2"}
          type="text"
          value={vDiff}
          disabled={disabled}
          onChange={(e) => {
            setVDiff(e.target.value);
          }}
        />
      </div>
      <div className="truncate">
        <input
          className={disabled ? "truncate-input" : "truncate-input2"}
          type="text"
          value={vDes}
          disabled={disabled}
          onChange={(e) => {
            setVDes(e.target.value);
          }}
        />
      </div>
      <div className="truncate">
        <input
          className={disabled ? "truncate-input" : "truncate-input2"}
          type="text"
          value={vU}
          disabled={disabled}
          onChange={(e) => {
            setVU(e.target.value);
          }}
        />
      </div>
      <div className="truncate">
        <input
          className={disabled ? "truncate-input" : "truncate-input2"}
          type="text"
          value={vI}
          disabled={disabled}
          onChange={(e) => {
            setVI(e.target.value);
          }}
        />
      </div>
      <div className="truncate">
        <input
          className={disabled ? "truncate-input" : "truncate-input2"}
          type="text"
          value={vC}
          disabled={disabled}
          onChange={(e) => {
            setVC(e.target.value);
          }}
        />
      </div>
      <div className="truncate2">
        <span
          className={`cancelBtnn ${disabled ? "hide" : ""}`}
          onClick={editMode}
        >
          Cancel
        </span>
        <span
          onClick={editMode}
          className={`editBtnn ${disabled ? "" : "hide"}`}
        >
          Edit
        </span>
        <span
          className={`deleteBtnn ${disabled ? "" : "hide"}`}
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </span>
        <button
          type="submit"
          className={`confirmBtnn ${disabled ? "hide" : ""}`}
        >
          Confirm
        </button>
      </div>
    </div>
  </form>
  </div>
  )
}

export default TrainerItem;
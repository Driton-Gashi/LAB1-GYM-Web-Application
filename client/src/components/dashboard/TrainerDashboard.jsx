import React,{useEffect, useState} from "react";
// import TrainerItem from "./TrainerItem"

const TrainerDashboard = () => {
  const [videoName, setVideoName] = useState('');
  const [videoDifficulty, setVideoDifficulty] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [videoImage, setVideoImage] = useState('');
  const [videoCategory, setVideoCategory] = useState('');
  const [video,setVideo] = useState('');


  const handleEdit = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:5000/video/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoName,
          videoDifficulty,
          videoDescription,
          videoURL,
          videoImage,
          videoCategory
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoName,
          videoDifficulty,
          videoDescription,
          videoURL,
          videoImage,
          videoCategory
        })
      });
  const video = Object.values(video);   
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Error:', error.message);
    }}

    const videoArray = Object.values(video);
    const getVideo = async () => {
      try {
        const response = await fetch("http://localhost:5000/getvideo");
        const jsonData = await response.json();
        setVideo(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

  

    useEffect(() => {
      getVideo();
    }, []);


  return (
    <div className="trainer">
      <div className="profile">
      <div className="profile_header">
        <h1>Upload Videos :D</h1>
      </div>
      <div className="profile_body">
        <form onSubmit={handleSubmit}>
        <div className="form_row">
            <h2>Video Title</h2>
            <input
              type="text"
              className="username"
              placeholder="Title"
              value={videoName}
              onChange={(event) => setVideoName(event.target.value)}
            />
          </div>
          
          <div className="form_row">
            <h2>Video Description</h2>
            <input
              type="text"
              className="email"
              placeholder="Description"
              value={videoDescription}
              onChange={(event) => setVideoDescription(event.target.value)}
            />
          </div>
          <div className="form_row">
            <h2>Video Url</h2>
            <input
              type="text"
              className="address"
              placeholder="Url"
              value={videoURL}
              onChange={(event) => setVideoURL(event.target.value)}
            />
          </div>

          <div className="form_row">
            <h2>Video Image</h2>
            <input
              type="text"
              className="address"
              placeholder="Image"
              value={videoImage}
              onChange={(event) => setVideoImage(event.target.value)}
            />
          </div>

          <div className="form_row">
            <h2>Video Difficulity</h2>
            <select
              className="city"
              onChange={(event) => setVideoDifficulty(event.target.value)}
            >
              {videoDifficulty == null ? (
                <option value="">Choose a Difficulity</option>
              ) : (
                <option value={videoDifficulty}>{videoDifficulty}</option>
              )}
              <option value="beginer">Beginer</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div className="form_row">
            <h2>Category</h2>
            <select
              className="city"
              onChange={(event) => setVideoCategory(event.target.value)}
            >
              {videoCategory == null ? (
                <option value="">Choose a Category</option>
              ) : (
                <option value={videoCategory}>{videoCategory}</option>
              )}
              <option value="Tutorial">Form Tutorial</option>
              <option value="Youtube">Youtube Tutorial</option>
              <option value="Program">Program</option>
              <option value="Library">Workout Library</option>
              <option value="Plans">Training Plans</option>
            </select>
          </div>
          <div className="form_row profile_footer">
            <div className="cancel">Cancel</div>
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>

    
    <table className="report-container">
  <thead>
    <tr className="report-header">
      <th className="recent-Articles" colSpan="2">All Videos</th>
    </tr>
    <tr className="repo-topic-heading">
      <th className="">Name</th>
      <th className="">Difficulty</th>
      <th className="">Description</th>
      <th className="">URL</th>
      <th className="">Image</th>

      <th className="">Category</th>
      <th className="">Manage</th>
    </tr>
  </thead>
  <tbody className="report-body-video">
    {videoArray.map((e) => (
      <tr key={e.video_id}>
        <td className="truncate">{e.video_name}</td>
        <td className="truncate">{e.video_difficulity}</td>
        <td className="truncate">{e.vide_description}</td>
        <td className="truncate">{e.vide_url}</td>
        <td className="truncate">{e.vide_image}</td>
        <td className="truncate">{e.video_category}</td>
        <td>
        <button onClick={() => handleEdit(e.video_id)}>Edit</button>
        <button>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>



      </div>
  );
};

export default TrainerDashboard;

import React,{useState} from "react";
// import TrainerItem from "./TrainerItem"

const TrainerDashboard = () => {

  const [videoName, setVideoName] = useState('');
  const [videoDifficulty, setVideoDifficulty] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [videoImage, setVideoImage] = useState('');
  const [videoCategory, setVideoCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setVideoImage("");

    try {
      const response = await fetch('http://localhost:5000/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({videoName: videoName,videoDifficulty:videoDifficulty,videoDescription:videoDescription,videoURL:videoURL,videoImage:videoImage,videoCategory:videoCategory}),
      });

      // Handle the response as needed
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Error:', error.message);
    }}


  return (
    <div className="trainer">
      <div className="profile">
      <div className="profile_header">
        <h1>Profile</h1> <img src="./video_thumbnail/B2.png" alt="" />
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
    <div className="report-body">
          <div className="report-topic-heading">
            <h3 className="t-op">Username</h3>
            <h3 className="t-op">Email</h3>
            <h3 className="t-op">Role</h3>
            <h3 className="t-op">Register Date</h3>
            <h3 className="t-op">Manage</h3>
          </div>

          
        </div>
      </div>
  );
};

export default TrainerDashboard;

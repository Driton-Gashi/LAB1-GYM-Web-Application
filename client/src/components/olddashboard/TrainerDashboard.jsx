import React, { useEffect, useState } from "react";
import TrainerItem from "./TrainerItem";
import swal from "sweetalert";
const TrainerDashboard = () => {
  const [videoName, setVideoName] = useState("");
  const [videoDifficulty, setVideoDifficulty] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [videoImage, setVideoImage] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  const [video, setVideo] = useState("");

  const getVideo = async () => {
    try {
      const response = await fetch("http://localhost:5000/getvideo");
      const jsonData = await response.json();
      setVideo(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (videoName.length < 4) {
      if (videoName.length == 0) {
        swal({
          title: "Error",
          text: "Video name is empty",
          icon: "error",
          timer: 3000,
          button: false,
        });
      } else {
        swal({
          title: "Error",
          text: "Video name is to short",
          icon: "error",
          timer: 3000,
          button: false,
        });
      }
      return;
    } else if (videoDifficulty.length == 0) {
      swal({
        title: "Error",
        text: "Please choose video difficulty",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    } else if (videoDescription.length < 5) {
      if (videoDescription == 0) {
        swal({
          title: "Error",
          text: "Video Description is empty",
          icon: "error",
          timer: 3000,
          button: false,
        });
        return;
      } else if (videoURL.length < 12) {
        if (videoURL == 0) {
          swal({
            title: "Error",
            text: "Video URL is empty",
            icon: "error",
            timer: 3000,
            button: false,
          });
          return;
        } else {
          swal({
            title: "Error",
            text: "Video URL is to short",
            icon: "error",
            timer: 3000,
            button: false,
          });
        }
        return;
      } else if (
        !(
          videoImage.endsWith(".jpg") ||
          videoImage.endsWith(".png") ||
          videoImage.endsWith(".webp") ||
          videoImage.endsWith(".jpeg") ||
          videoImage.endsWith(".gif")
        )
      ) {
        swal({
          title: "Error",
          text: "Your video Image url is not an image",
          icon: "error",
          timer: 3000,
          button: false,
        });

        return;
      } else if (videoCategory.length == 0) {
        swal({
          title: "Error",
          text: "Please choose video category",
          icon: "error",
          timer: 3000,
          button: false,
        });
        return;
      } else {
        try {
          const response = await fetch("http://localhost:5000/video", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              videoName,
              videoDifficulty,
              videoDescription,
              videoURL,
              videoImage,
              videoCategory,
            }),
          });
          const video = Object.values(video);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log("Error:", error.message);
        }
      }
    }
  };

  const videoo = Object.values(video);

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
                <option value="">Choose a Category</option>

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

      <div className="report-container">
        <div className="report-main">
          <div className="report-header">
            <h1 className="th" colSpan="2">
              All Videos
            </h1>
          </div>
          <div className="repo-topic-heading">
            <h1 className="truncate">Name</h1>
            <h1 className="truncate">Difficulty</h1>
            <h1 className="truncate">Description</h1>
            <h1 className="truncate">URL</h1>
            <h1 className="truncate">Image</h1>
            <h1 className="truncate">Category</h1>
            <h1 className="truncate">Manage</h1>
          </div>
        </div>

        {videoo.map((e) => (
          <TrainerItem
            key={e.video_id}
            videoName={e.video_name}
            videoDifficulty={e.video_difficulity}
            videoDescription={e.vide_description}
            videoURL={e.vide_url}
            videoImage={e.vide_image}
            videoCategory={e.video_category}
            id={e.video_id}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainerDashboard;

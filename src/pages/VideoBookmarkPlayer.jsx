import React, { useEffect, useRef, useState, useMemo } from "react";
import "./VideoBookmarkPlayer.css";

export default function VideoBookmarkPlayer() {
  const videoRef = useRef(null);

  const [videos] = useState([
    {
      id: "1",
      title: "Demo Video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ]);

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [bookmarks, setBookmarks] = useState([]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [tag, setTag] = useState("");
  const [note, setNote] = useState("");

  const [zoom, setZoom] = useState(1);
  const [draggingId, setDraggingId] = useState(null);

  const handleSeek = (e) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;

    goToBookmark(time);
  };

  const handleDrag = (e) => {
    if (!draggingId || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(duration, percent * duration));

    setBookmarks(prev =>
      prev.map(b =>
        b.id === draggingId ? { ...b, timestamp: newTime } : b
      )
    );
  };

  const getTagColor = (tag) => {
    const map = {
      important: "red",
      note: "yellow",
      warning: "orange",
      good: "green",
    };

    return map[tag?.toLowerCase()] || "cyan";
  };

  // 🎥 Track time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const loaded = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", loaded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", loaded);
    };
  }, [selectedVideo]);

  // 📌 Add bookmark
  const addBookmark = () => {
    if (!tag) return;

    const newBookmark = {
      id: Date.now().toString(),
      videoId: selectedVideo.id,
      timestamp: currentTime,
      tag,
      note,
    };

    setBookmarks(prev => [...prev, newBookmark]);
    setTag("");
    setNote("");
  };

  // ⏩ Jump to bookmark
  const goToBookmark = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
  };

  // 📊 Filter current video bookmarks
  const currentBookmarks = useMemo(() => {
    return bookmarks.filter(b => b.videoId === selectedVideo.id);
  }, [bookmarks, selectedVideo]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div style={{ position: "relative", width: "600px" }}>
        <video
          ref={videoRef}
          src={selectedVideo.url}
          controls
          width="600"
        />

        {/* 📊 TIMELINE */}
        <div
          onClick={handleSeek}
          onMouseMove={handleDrag}
          onMouseUp={() => setDraggingId(null)}
          style={{
            position: "absolute",
            bottom: 35,
            left: 0,
            width: `${100 * zoom}%`,
            height: 8,
            background: "rgba(255,0,0,0.5)",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          {/* ▶️ CURRENT PLAYHEAD */}
          {duration > 0 && (
            <div
              style={{
                position: "absolute",
                left: `${(currentTime / duration) * 100}%`,
                top: -6,
                width: 2,
                height: 20,
                background: "white",
                transform: "translateX(-50%)",
              }}
            />
          )}

          {/* 📌 MARKERS */}
          {duration > 0 &&
            currentBookmarks.map(b => (
              <div
                key={b.id}
                title={`${b.tag} (${formatTime(b.timestamp)})`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setDraggingId(b.id);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToBookmark(b.timestamp);
                }}
                style={{
                  position: "absolute",
                  left: `${(b.timestamp / duration) * 100}%`,
                  transform: "translateX(-50%)",
                  top: -6,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: getTagColor(b.tag),
                  border: "2px solid black",
                  cursor: "grab",
                }}
              />
            ))}
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        Zoom:
        <button onClick={() => setZoom(z => Math.max(1, z - 0.5))}>-</button>
        <span>{zoom.toFixed(1)}x</span>
        <button onClick={() => setZoom(z => z + 0.5)}>+</button>
      </div>
    
      {/* 📌 ADD BOOKMARK */}
      <div style={{ marginTop: 20 }}>
          <div>Current Time: {formatTime(currentTime)}</div>

          <input
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          />

          <input
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          />

          <button onClick={addBookmark}>Add Bookmark</button>
      </div>

      {/* 📋 BOOKMARK LIST */}
      <div style={{ marginTop: 20 }}>
          <h3>Bookmarks</h3>
          {currentBookmarks.map(b => (
          <div
              key={b.id}
              onClick={() => goToBookmark(b.timestamp)}
              style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 5,
              cursor: "pointer",
              }}
          >
              <b>{b.tag}</b> ({formatTime(b.timestamp)})
              <div>{b.note}</div>
          </div>
          ))}
      </div>
    </div>
  );
}
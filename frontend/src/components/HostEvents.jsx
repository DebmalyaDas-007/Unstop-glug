import React, { useState } from 'react';
import '../styles/HostEvents.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const HostEvents = () => {
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [maxRounds, setMaxRounds] = useState(0);
  const [maxTeams, setMaxTeams] = useState(0);
  const [prizePool, setPrizePool] = useState(0);
  const [category, setCategory] = useState('more');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('maxRounds', maxRounds);
    formData.append('maxTeams', maxTeams);
    formData.append('prizePool', prizePool);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/event/post',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(res.data);
      toast.success('Event hosted successfully!');
      
      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
      setMaxRounds(0);
      setMaxTeams(0);
      setPrizePool(0);
      setCategory('more');
      setImage(null);
      setPage(0); // Go back to instructions page
      
    } catch (err) {
      console.error("Error submitting event:", err);
      toast.error('Failed to host the event');
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  const renderFormStep = () => {
    switch (page) {
      case 0:
        return (
          <div className="instruction">
            <h1>Instructions</h1>
            <h2>Prerequisites</h2>
            <ul>
              <li>You are logged in to your account.</li>
              <li>You have the necessary permissions to host events.</li>
              <li>You have the basic details about your event ready (title, description, date, etc.).</li>
            </ul>
            <h2>Step-by-Step Instructions</h2>
            <h3>Step 1: Navigate to the Dashboard</h3>
            <ul>
              <li>Click your profile or dashboard button from the navigation bar.</li>
              <li>In the sidebar menu, click on "Host Event".</li>
            </ul>
            <h3>Step 2: Fill Out Basic Event Information</h3>
            <ul>
              <li>
                <strong>Title of the Event</strong>: Choose a clear and catchy title. E.g., "Code Battle 2025"
              </li>
              <li>
                <strong>Description</strong>: Describe your event, what participants can expect, who the speakers are, etc.
              </li>
              <li>
                <strong>Location</strong>: Specify the venue or write "Online".
              </li>
              <li>
                <strong>Date</strong>: Select a future date.
              </li>
            </ul>
            <h3>Step 3: Set Event Rules and Limits</h3>
            <ul>
              <li><strong>Max Rounds</strong>: For events with multiple elimination rounds.</li>
              <li><strong>Max Teams</strong>: Set registration cap.</li>
              <li><strong>Prize Pool</strong>: Optional reward description.</li>
              <li><strong>Category</strong>: Choose a relevant category (e.g., Coding, Movies, Sports).</li>
            </ul>
            <h3>Step 4: Confirmation</h3>
            <ul>
              <li>After clicking Submit, you will see a success message.</li>
              <li>You will be redirected to your dashboard to view, edit, or delete your event.</li>
            </ul>
            <h2>Tips for a Successful Event</h2>
            <ul>
              <li>Use a high-quality banner or thumbnail.</li>
              <li>Add teaser links or trailers if possible.</li>
              <li>Promote your event early through social media or email.</li>
              <li>Write clear rules and be responsive to queries.</li>
            </ul>
            <h2>Common Mistakes to Avoid</h2>
            <ul>
              <li>Leaving mandatory fields empty.</li>
              <li>Entering past dates.</li>
              <li>Unclear descriptions.</li>
              <li>Extremely low team/round limits.</li>
              <li>Forgetting to click "Submit".</li>
            </ul>
            <button className="continue" onClick={() => setPage(1)}>Continue</button>
          </div>
        );

      case 1:
        return (
          <form className="form-host-container">
            <h2 className="event-host-title">Event Title</h2>
            <p className="subheader-host">Choose a suitable title for your event</p>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter event title" 
              className="input-host" 
            />
            <h2 className="event-host-title">Description</h2>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter event description" 
              className="input-host" 
            />
            <h2 className="event-host-title">Location</h2>
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Location" 
              className="input-host" 
            />
            <h2 className="event-host-title">Date</h2>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="input-host" 
            />
            <div>
              <button type="button" className="host-button" onClick={() => setPage(0)}>Back</button>
              <button type="button" className="host-button" onClick={() => setPage(2)}>Next</button>
            </div>
          </form>
        );

      case 2:
        return (
          <form className="form-host-container">
            <h2 className="event-host-title">Max Rounds</h2>
            <input 
              type="number" 
              value={maxRounds} 
              onChange={(e) => setMaxRounds(e.target.value)} 
              className="input-host" 
            />
            <h2 className="event-host-title">Max Teams</h2>
            <input 
              type="number" 
              value={maxTeams} 
              onChange={(e) => setMaxTeams(e.target.value)} 
              className="input-host" 
            />
            <h2 className="event-host-title">Prize Pool</h2>
            <input 
              type="number" 
              value={prizePool} 
              onChange={(e) => setPrizePool(e.target.value)} 
              className="input-host" 
            />
            <h2 className="event-host-title">Category</h2>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="input-host"
            >
              <option value="coding">Coding</option>
              <option value="movies">Movies</option>
              <option value="sports">Sports</option>
              <option value="education">Education</option>
              <option value="science">Science</option>
              <option value="more">More</option>
            </select>
            <div>
              <button type="button" className="host-button" onClick={() => setPage(1)}>Back</button>
              <button type="button" className="host-button" onClick={() => setPage(3)}>Next</button>
            </div>
          </form>
        );

      case 3:
        return (
          <form className="form-host-container" onSubmit={handleSubmit}>
            <h2 className="event-host-title">Cover Image</h2>
            <p className="subheader-host">Upload a thumbnail to make your event visually appealing.</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])} 
              className="input-host" 
            />
            <div>
              <button 
                type="button" 
                className="host-button" 
                onClick={() => setPage(2)}
                disabled={isLoading}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-content-host">
                    <span className="spinner-host"></span>
                    Hosting Event...
                  </span>
                ) : (
                  'Submit Event'
                )}
              </button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="hoster-title">Host an Event</h1>
      {renderFormStep()}
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay-host">
          <div className="loading-modal-host">
            <div className="loading-spinner-host"></div>
            <h3>Creating Your Event...</h3>
            <p>Please wait while we process your event details.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostEvents;
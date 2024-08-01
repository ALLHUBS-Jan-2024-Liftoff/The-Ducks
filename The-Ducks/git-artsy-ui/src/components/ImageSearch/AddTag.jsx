import React, { useState } from 'react';

// AddTag component allows users to add a new tag to an image
const AddTag = ({ addTag }) => {
  // State variable for the tag name
  const [tagName, setTagName] = useState('');

  // Handles the form submission to add a tag
  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagName) {
      // Call the addTag function passed as a prop
      addTag(tagName);
      // Clear the input field
      setTagName('');
    }
  };

  return (
    <form onSubmit={handleAddTag} className="add-tag-form">
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder="Add a tag..."
      />
      <button type="submit">Add Tag</button>
    </form>
  );
};

export default AddTag;

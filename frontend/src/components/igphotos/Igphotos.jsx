import React from 'react';
import './igphotos.css';

const IgPhotos = ({ photos, igposts, type }) => {
  const handlePhotoClick = (index) => {
    const igPostLink = igposts[index];
    window.open(igPostLink, '_blank');
  };

  return (
    <div className={`igPhotosContainer ${type === 'footerIg' ? 'footerIgPhotosContainer' : ''}`}>
      <h3 className={type === 'footerIg' ? 'footerIgTitle' : ''}>Instagram Posts</h3>
      <div className={`igPhotosWrapper ${type === 'footerIg' ? 'footerIgPhotosWrapper' : ''}`}>
        {photos?.map((photo, index) => (
          <div className={`igPhotoWrapper ${type === 'footerIg' ? 'footerIgPhotoWrapper' : ''}`} key={index}>
            <img
              src={photo}
              alt="Instagram post"
              className={`igPhoto ${type === 'footerIg' ? 'footerIgPhoto' : ''}`}
              onClick={() => handlePhotoClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IgPhotos;

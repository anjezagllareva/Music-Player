import React from "react";
import PropTypes from "prop-types";
import "./TrendingSlider.scss";

class TrendingSlider extends React.Component {
  render() {
    const { songs } = this.props;

    return (
      <div className="trending-slider">
        <h2></h2>
        <div className="slider">
          {songs.map((song, index) => (
            <div key={index} className="slide">
              <img src={song.image} alt={song.name} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

TrendingSlider.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TrendingSlider;

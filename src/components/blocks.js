import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';

const generateBlocks = ({blocks}) => {
  if (blocks) {
    return blocks.map((block, index) => {
      return (
        <Reveal key={index} effect="animated fadeInUp" className={`item ${block.type}`}>
          <div className="veil"></div>
          <div
            className="image"
            style={{background:`url(/images/blocks/${block.image}) no-repeat`}}
            >
          </div>
          <div className="title">
            <Link to={block.link}>{ block.title }</Link>
          </div>
        </Reveal>
      );
    });
  }
}

const Blocks = (props) => {
  return (
    <div className="home-blocks">
      {generateBlocks(props)}
    </div>
  )
}

export default Blocks;
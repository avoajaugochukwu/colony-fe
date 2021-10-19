import React from 'react'

import Blockies from "ethereum-blockies"

import styles from './Avatar.module.css';


interface AvatarProps {
  address: string;
}

const Avatar: React.FC<AvatarProps> = ({ address }) => {
  
  const canvasElm = Blockies.create({
    size: 5,
    scale: 100 ? Math.floor(100 / 5) : 10,
    seed: address
  });
  const avatar = canvasElm && canvasElm?.toDataURL();
  
  return (
    <div>
      <img className={styles.Avatar} src={avatar} alt="avatar" />
    </div>
  )
}

export default Avatar

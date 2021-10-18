import React from 'react'

import blockies from '../../../blockies'

import styles from './Avatar.module.css';

interface AvatarProps {
  address: string;
}

const Avatar: React.FC<AvatarProps> = ({ address }) => {

  const canvasElm = blockies({
    size: 5,
    scale: 100 ? Math.floor(100 / 5) : 10,
    seed: address //? address : '0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c',
  });
  // console.log(canvasElm)
  // console.log(canvasElm?.toDataURL())
  const avatar = canvasElm && canvasElm?.toDataURL();
  
  return (
    <div>
      <img className={styles.Avatar} src={avatar} alt="avatar" />
    </div>
  )
}

export default Avatar

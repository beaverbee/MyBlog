import React from "react";
import style from './Minions.module.css';

const Minions = () => (
  <div className={style.loadingWrapper} style={{ height: 600 }}>
    {/* <!-- 小黄人 --> */}
    <div className={style.minions}>
      {/* <!-- 身体 --> */}
      <div className={style.body}>
        {/* <!-- 裤子 --> */}
        <div className={style.trousers}>
          {/* <!-- 吊带 --> */}
          <div className={style.condoleBelt}>
            <div className={style.left}></div>
            <div className={style.right}></div>
          </div>
          {/* <!-- 裤子突出的矩形部分 --> */}
          <div className={style.trousersTop}></div>
          {/* <!-- 裤袋 --> */}
          <div className={style.pocket}></div>
          {/* <!-- 三条线 --> */}
          <span className={style.lineLeft}></span>
          <span className={style.lineRight}></span>
          <span className={style.lineBottom}></span>
        </div>
      </div>
      {/* <!-- 头发 --> */}
      <div className={style.hair}>
        <span className={style.leftHairOne}></span>
        <span className={style.leftHairTwo}></span>
      </div>
      {/* <!-- 眼睛 --> */}
      <div className={style.eyes}>
        {/* <!-- 左眼 --> */}
        <div className={style.leftEye}>
          <div className={style.leftBlackEye}>
            <div className={style.leftWhite}></div>
          </div>
        </div>
        {/* <!-- 右眼 --> */}
        <div className={style.rightEye}>
          <div className={style.rightBlackEye}>
            <div className={style.rightWhite}></div>
          </div>
        </div>
      </div>
      {/* <!-- 嘴巴 --> */}
      <div className={style.mouse}>
        <div className={style.mouseShape}></div>
      </div>
      {/* <!-- 双手 --> */}
      <div className={style.hands}>
        <div className={style.leftHand}></div>
        <div className={style.rightHand}></div>
      </div>
      {/* <!-- 双脚 --> */}
      <div className={style.feet}>
        <div className={style.leftFoot}></div>
        <div className={style.rightFoot}></div>
      </div>
      {/* <!-- 脚底阴影 --> */}
      <div className={style.groundShadow}></div>
    </div>
  </div>
);

export default Minions;

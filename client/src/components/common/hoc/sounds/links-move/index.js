import { Button } from "antd";
import * as React from "react";
import { NavLink } from "react-router-dom";
import tapSound from '../../../../../assets/sound/ui/navigation_hover.wav'
import { Howl } from 'howler'

export const MoveSoundHOC = (Component) => (props) => {
    const audio = new Howl({
        src: [tapSound]
    })
    const handleClick = () => {
        //sound
        audio.play();
        //handle event
        if (props.onClick && typeof props.onClick == 'function') props?.onClick()

    }
    return (
        <Component {...props} onClick={handleClick} />
    );
};

const FillComponent = (props) => {
    return <div onClick={props.onClick}>{props.children}</div>
}
export const SoundNavLink = MoveSoundHOC(FillComponent)

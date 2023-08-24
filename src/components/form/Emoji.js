import React from 'react';



const Emoji = (props) => {
    return (
        <img src={process.env.PUBLIC_URL + '/images/emojis/emoji_' + props.name + '.svg'} alt={props.name + " emoji"} />
    );
};

export default Emoji;
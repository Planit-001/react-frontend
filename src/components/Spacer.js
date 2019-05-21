import React from 'react';

function Spacer({height}){

    const styles = {
        height: height ? height : 50
    }
    return <div style={styles}></div>
}

export default Spacer
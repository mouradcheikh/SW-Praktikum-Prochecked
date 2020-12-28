import React from 'react';
import {Link} from 'react-router-dom';

function StudentView(){
    return( 
        <div>
            <h1> StudentView </h1>
            <Link to = '/Semesterbericht'>
            <button>
                Test
            </button>
            </Link>
        </div>
    );
}
export default StudentView;
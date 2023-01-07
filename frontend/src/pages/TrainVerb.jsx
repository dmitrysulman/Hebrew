import {Link} from "react-router-dom";

function TrainVerb() {
    return <div>
        Main
        <br/>
        <Link to={'add-verb'}>Add Verb</Link>
        <Link to={'train-verb'}>Train</Link>
    </div>
}

export default TrainVerb
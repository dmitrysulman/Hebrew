import {Link} from "react-router-dom";

function RootPage() {
    return <div>
        Main
        <br/>
        <Link to={'add-verb'}>Add Verb</Link>
    </div>
}

export default RootPage
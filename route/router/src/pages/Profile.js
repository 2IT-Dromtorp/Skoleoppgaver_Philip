import { useNavigate, useParams } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const { name } = useParams();

    return (
        <div className="profile-main">
            <h1> Dette er profilen til {name}</h1>
            <button onClick={() => navigate(-1)}> Tilbake til hovedmeny </button>
        </div>
    )
}

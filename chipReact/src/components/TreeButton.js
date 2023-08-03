import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function TreeButton ({sbomId, sbomName, sbomDesc}) {
    // create navigate function
    const navigate = useNavigate();
    // routes user to tree page on button click
    const handleButtonClick = () => {
        navigate(`/sbom/${sbomId}`, {state: {sbomName, sbomDesc}});
    }
    
    return (
        <div>
            <Button variant="outline-primary" id='treeButton' type='submit' size="sm" onClick={handleButtonClick}>
                View SBOM
            </Button>
        </div>
    )
}
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function TreeButton ({sbomId}) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
      navigate(`/sbom/${sbomId}`);
    }
    
    return (
        <div>
            <Button variant="outline-primary" id='treeButton' type='submit' size="sm" onClick={handleButtonClick}>
                View SBOM
            </Button>
        </div>
    )
}


{/* <div id='sbomView' className={styles.section}>
          <button onClick={() => handleViewClick(1)}>View SBOM #1</button>
          <button onClick={() => handleViewClick(2)}>View SBOM #2</button>
        </div>
        {selectedSbomId && <SbomTree sbomId={selectedSbomId} />}
      </> */}
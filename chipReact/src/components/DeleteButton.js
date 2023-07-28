import { Button } from 'react-bootstrap';

export default function DeleteButton({ sbomId, trigger, setTrigger, setLoading }) {
    // hit archive endpoint
    const archiveUrl = `http://localhost:8080/sboms/${sbomId}/archive`
    const handleButtonClick = (e) => {
        e.stopPropagation()
        setLoading(true)

        if (window.confirm("Are you sure you want to delete this SBOM forever?")) {
            // if yes, hit the GET endpoint from the archiveUrl, which will change the archive parameter for this SBOM to true
            fetch(archiveUrl)
            .then(setTrigger(prevTrigger => !prevTrigger))
            .then(setLoading(false))
        } else {
            setLoading(false);
        }
    }

    return (
        <Button variant="outline-primary" id='deleteButton' type='submit' size="sm" onClick={handleButtonClick}>
            Delete SBOM
        </Button>
    )
}
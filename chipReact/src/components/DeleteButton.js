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
            // change trigger to make accordion reload
            .then(setTrigger(prevTrigger => !prevTrigger))
            // done, so stop loading
            .then(setLoading(false))
        } else {
            // not executed, so no load
            setLoading(false);
        }
    }

    return (
        <Button variant="outline-primary" id='deleteButton' type='submit' size="sm" onClick={handleButtonClick}>
            Delete SBOM
        </Button>
    )
}
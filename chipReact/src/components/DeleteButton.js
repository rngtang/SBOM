import { Button } from 'react-bootstrap';

export default function DeleteButton({ sbomId, trigger, setTrigger }) {
    // hit archive endpoint
    const archiveUrl = `http://localhost:8080/sboms/${sbomId}/archive`
    const handleButtonClick = (e) => {
        e.stopPropagation()
        // debugger lines below
        // console.log(trigger)
        // console.log({ sbomId })
        if (window.confirm("Are you sure you want to delete this SBOM forever?")) {
            fetch(archiveUrl)
            // debugger line below
            // .then(console.log({ sbomId }))
            .then(setTrigger(prevTrigger => !prevTrigger))
            // debugger line below
            // .then(console.log({ trigger }))
        }
    }

    return (
        <Button variant="outline-primary" id='deleteButton' type='submit' size="sm" onClick={handleButtonClick}>
            Delete SBOM
        </Button>
    )
}
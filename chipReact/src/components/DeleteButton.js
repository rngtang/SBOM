import { Button } from 'react-bootstrap';



export default function DeleteButton({sbomId, trigger, setTrigger}) {
    const archiveUrl = `http://localhost:8080/sboms/${sbomId}/archive`
    const handleButtonClick = (e) => {
        e.stopPropagation()
            // e.preventDefault()
        console.log(trigger)
        if(window.confirm("Are you sure you want to delete this SBOM forever?")){
            fetch(archiveUrl)
            .then(console.log({sbomId}))
            .then(setTrigger(prevTrigger => !prevTrigger))
            .then(console.log({trigger}))
        } 
      }

      
    
    return (
        <Button variant="outline-primary" id='deleteButton' type='submit' size="sm" onClick={handleButtonClick}>
            Delete SBOM
        </Button>
    )
}

// <Button variant="primary" id='uploadButton' type='submit' onClick={handleButtonClick}>Upload New SBOM +</Button>
//             <input 
//               type="file" 
//               style={{ display: 'none' }} 
//               ref={fileInput} 
//               onChange={handleFileUpload} 
//             />
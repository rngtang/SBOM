export default function UpdateButton() {
    const handleFileUpload = (event) => {
        event.preventDefault();
        fetchNames();
        setLoading(true); // Set loading state to true before fetch request
        const formData = new FormData();
        console.log("preparing to get names");
    
        setTimeout(() => {
          const file = event.target.files[0];
          formData.append('file', file);
    
          if (nameMatch) {
            alert("Your SBOM name must be unique.");
            setLoading(false);
            return;
          } else {
            formData.append('name', userName); // Continue with the file upload or further processing
          }
          formData.append('description', userDesc);
    
          fetch("http://localhost:8080/users/1/sboms", { //dummy user 1 for now
            method: 'POST',
            body: formData
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to upload the SBOM.');
            }
            console.log("it POSTED ????");
            setLoading(false);
            setTrigger(prevTrigger => !prevTrigger); // will toggle getSBOMs useEffect
            return response.json();
          })
          .then((data) => {
          });
          
        setFormSubmitted(false); //reset
        }, 500); // Adjust the delay if needed
      }
      return (
        <div>
            
        </div>
      )
}